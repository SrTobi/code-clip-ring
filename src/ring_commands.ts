import * as vscode from 'vscode';
import * as cring from './clipboard_ring';
import * as utils from './utils';
import {getSettings} from './settings';

export async function copyToRing():  Promise<void> {
    await cring.getClipboardRing(false);
    await utils.vscodeCopy();
    await cring.getClipboardRing(true);
}

export async function cutToRing():  Promise<void> {
    await cring.getClipboardRing(false);
    await utils.vscodeCut();
    await cring.getClipboardRing(true);
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

var LastSelection: SelectionSaver | null = null;

export async function pasteRingItem(ring: cring.ClipboardRing | null): Promise<void> {  
    if (ring == null) {
        ring = await cring.getClipboardRing(false);
    }
    let editor = vscode.window.activeTextEditor;
    
    if (!editor || ring.empty())
        return;
    
    let selections = editor.selections;
    
    if (LastSelection && !LastSelection.isNewSelecton(selections)) {
        await ring.next(1);
    }
    
    await editor.edit((eb) => {
        for (let sel of selections) {
            eb.replace(sel, ring!.getCurrent());
        }
    });
    
    if(getSettings().itemToClipboardOnPaste) {
        await utils.setContent(ring.getCurrent());
    }
    
    LastSelection = new SelectionSaver(editor.selections);
}

async function selectRingItem(ring: cring.ClipboardRing, placeHolder: string): Promise<number> {
    
    if (ring.empty()) {
        await vscode.window.showErrorMessage("No current clipboard item");
        return -1;
    } else {
        interface RingItemPick extends vscode.QuickPickItem {
            index: number;
        }
        
        let idx = 0;
        let items = ring.getAll().map((item): RingItemPick => {
            return {
                label: item,
                index: idx++,
                description: ""
            }
        });
        
        let opt: vscode.QuickPickOptions = {
            placeHolder: placeHolder
        };
        
        let selectedItem = await vscode.window.showQuickPick(items, opt);
        if (!selectedItem)
            return -1;
        
        return selectedItem.index;
    }
}

export async function selectAndPasteRingItem(): Promise<void> {
    
    let ring = await cring.getClipboardRing(false);
    let itemIdx = await selectRingItem(ring, "Item to paste");
    
    if (itemIdx >= 0) {
        
        LastSelection = null;
        await ring.next(itemIdx);
        await pasteRingItem(ring);
    }
}

export async function removeRingItems() {
   
    let ring = await cring.getClipboardRing(false);
    let itemIdx = await selectRingItem(ring, "Item to remove");
    
    if (itemIdx >= 0) {
        ring.remove(itemIdx);
    }
}

export async function removeAllRingItem() {
   let ring = await cring.getClipboardRing(false);
   ring.clear();
}