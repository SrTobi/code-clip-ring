"use strict";
import * as vscode from 'vscode';
import * as ringcmd from './ring_commands';


export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "code-clip-ring" is now active!'); 

    // Ring commands
	var disposable = vscode.commands.registerCommand('clipring.copyToRing', ringcmd.copyToRing);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipring.cutToRing', ringcmd.cutToRing);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipring.pasteRingItem', ringcmd.pasteRingItem);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipring.selectAndPasteRingItem', ringcmd.selectAndPasteRingItem);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipring.removeAllRingItems', ringcmd.removeAllRingItem);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipring.removeRingItem', ringcmd.removeRingItems);
	context.subscriptions.push(disposable);
}