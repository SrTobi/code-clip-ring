import * as vscode from 'vscode'; 

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	console.log('Extension "code-clip-registry" is now active!'); 

	var disposable = vscode.commands.registerCommand('clipreg.copyToRing', () => {
		
	});
	context.subscriptions.push(disposable);
    
    
	disposable = vscode.commands.registerCommand('clipreg.pasteNextRingItem', () => {
		
	});
	context.subscriptions.push(disposable);
    
	disposable = vscode.commands.registerCommand('clipreg.pasteRingItem', () => {
		
	});
	context.subscriptions.push(disposable);
}