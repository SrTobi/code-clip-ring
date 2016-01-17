"use strict";
import * as vscode from 'vscode';
import * as ringcmd from './ring_commands';
import * as regcmd from './registry_commands';


function addRegisterCmd(count: number, context: vscode.ExtensionContext) {
    
    for (let i = 0; i < count; ++i) {
        var disposable = vscode.commands.registerCommand('clipreg.copyToShortRegister' + (i+1), async () => { await regcmd.copyToShortRegister(i, false);});
        context.subscriptions.push(disposable);
        
        disposable = vscode.commands.registerCommand('clipreg.cutToShortRegister' + (i+1), async () => { await regcmd.copyToShortRegister(i, true);});
        context.subscriptions.push(disposable);
        
        disposable = vscode.commands.registerCommand('clipreg.pasteFromShortRegister' + (i+1), async () => { await regcmd.pasteFromShortRegister(i);});
        context.subscriptions.push(disposable);
    }
}

export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "code-clip-registry" is now active!'); 

	var disposable = vscode.commands.registerCommand('clipreg.copyToRing', ringcmd.copyToRing);
	context.subscriptions.push(disposable);
    
	var disposable = vscode.commands.registerCommand('clipreg.cutToRing', ringcmd.cutToRing);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.pasteRingItem', ringcmd.pasteRingItem);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.selectAndPasteRingItem', ringcmd.selectAndPasteRingItem);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.copyToRegister', regcmd.copyToRegister);
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.cutToRegister', () => regcmd.copyToRegister(true));
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.pasteFromRegister', regcmd.pasteFromRegister);
	context.subscriptions.push(disposable);
    
    addRegisterCmd(5, context);
}