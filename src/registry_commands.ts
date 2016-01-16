"use strict";
import * as vscode from 'vscode';

const DefaultRegister = "default";

type RegistryType = { [key: string]: string };

var Registry: RegistryType = {};

export async function pasteFromRegister() {
    
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    
    let regs = new Array<vscode.QuickPickItem>();
    for(let reg in Registry) {
        regs.push({
            label: reg,
            description: Registry[reg]
        });
    }
    
    let reg = await vscode.window.showQuickPick(regs);
    
    if(reg) {
        await editor.edit((eb) => {
            for (let sel of editor.selections) {
                eb.replace(sel, reg.description);
            }
        });
    }
}

export async function copyToRegister() {
    
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    
    let opt: vscode.InputBoxOptions = {
        prompt: "Specify a register",
        placeHolder: "Registername",
        value: DefaultRegister
    };
    
    let reg = await vscode.window.showInputBox(opt);
    
    if(reg) {
        if(reg.length == 0) {
            reg = DefaultRegister;
        }
        
        let selection = editor.selection;
        let doc = editor.document;
        if (selection.isEmpty) {
            Registry[reg] = doc.lineAt(selection.active.line).text;
        } else {
            Registry[reg] = doc.getText(selection);
        }
    }
}