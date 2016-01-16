"use strict";
import * as vscode from 'vscode';
import * as cring from './clipboard_ring';
import * as utils from './utils';

async function copyToRing():  Promise<void> {
    await utils.vscodeCopy();
    await cring.getClipboardRing();
}

async function pasteNextRingItem(): Promise<void> {
    let ring = await cring.getClipboardRing();
    await ring.next();
    await utils.vscodePaste();
}

async function pasteRingItem(): Promise<void> {
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
        
        await ring.next(selectedItem.index);
        await utils.vscodePaste();
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "code-clip-registry" is now active!'); 

	var disposable = vscode.commands.registerCommand('clipreg.copyToRing', copyToRing);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.pasteNextRingItem', pasteNextRingItem);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.pasteRingItem', pasteRingItem);
	context.subscriptions.push(disposable);
}