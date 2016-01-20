"use strict";
import * as vscode from 'vscode';
import * as ringcmd from './ring_commands';


export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "code-clip-registry" is now active!'); 

    // Ring commands
	var disposable = vscode.commands.registerCommand('clipreg.copyToRing', ringcmd.copyToRing);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.cutToRing', ringcmd.cutToRing);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.pasteRingItem', ringcmd.pasteRingItem);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.selectAndPasteRingItem', ringcmd.selectAndPasteRingItem);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.removeAllRingItems', ringcmd.removeAllRingItem);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.removeRingItem', ringcmd.removeRingItems);
	context.subscriptions.push(disposable);
}