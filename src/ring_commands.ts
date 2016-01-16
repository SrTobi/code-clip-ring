import * as vscode from 'vscode';
import * as cring from './clipboard_ring';
import * as utils from './utils';

export async function copyToRing():  Promise<void> {
    await cring.getClipboardRing();
    await utils.vscodeCopy();
    await cring.getClipboardRing();
}

class SelectionSaver {
    constructor(private _selections: vscode.Selection[]) {
        SelectionSaver.sortSelections(this._selections);
    }
    
    /**
     * Checke if the argument is a new selection.
     * A new selection must contain at least one selection that is different from the previous.
     */
    public isNewSelecton(selections: vscode.Selection[]) {
        SelectionSaver.sortSelections(selections);
        
        let idx = 0;
        for(let sel of selections) {
            while (true) {
                if (idx >= this._selections.length)
                    return true;
                
                let cur = this._selections[idx];
                ++idx;
                
                // TODO: Check if strings are equal or reset selectionsaver
                if (cur.isEqual(sel))
                    break;
                    
                let cmp = SelectionSaver.compareSelections(cur, sel);
                if(cmp > 0)
                    return true;
            }
        }
        
        return false;
    }
    
    static sortSelections(selections: vscode.Selection[]) {
        selections.sort(SelectionSaver.compareSelections);
    }
    
    static compareSelections(a: vscode.Selection, b: vscode.Selection) {
        return a.start.line == b.start.line?
                a.start.character - b.start.character
                : a.start.line - b.start.line;
    }
}

var LastSelection: SelectionSaver = null;

export async function pasteRingItem(): Promise<void> {  
    let ring = await cring.getClipboardRing();
    let editor = vscode.window.activeTextEditor;
    
    if (!editor || ring.empty())
        return;
    
    let document = editor.document;
    let selections = editor.selections;
    
    if (LastSelection && !LastSelection.isNewSelecton(selections)) {
        await ring.next(1);
    }
    
    await editor.edit((eb) => {
        for (let sel of selections) {
            eb.replace(sel, ring.getCurrent());
        }
    });
    
    LastSelection = new SelectionSaver(editor.selections);
}

export async function selectAndPasteRingItem(): Promise<void> {
    let ring = await cring.getClipboardRing();
    
    if (ring.empty()) {
        await vscode.window.showErrorMessage("No current clipboard item");
    } else {
        interface RingItemPick extends vscode.QuickPickItem {
            index: number;
        }
        
        let idx = 0;
        let items = ring.getAll().map((item): RingItemPick => {
            return {
                label: item,
                index: idx++,
                description: null
            }
        });
        let selectedItem = await vscode.window.showQuickPick(items);
        if (!selectedItem)
            return;
        
        LastSelection = null;
        await ring.next(selectedItem.index);
        await pasteRingItem();
    }
}