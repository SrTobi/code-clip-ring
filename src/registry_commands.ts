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
        await pasteFromNamedRegister(reg.description);
    }
}

export async function pasteFromNamedRegister(name: string) {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    
    await editor.edit((eb) => {
        for (let sel of editor.selections) {
            eb.replace(sel, name);
        }
    });
}

export async function copyToRegister(cut: boolean) {
    
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
        
        await copyToNamedRegister(reg, cut);
    }
}

export async function copyToNamedRegister(name: string, cut: boolean): Promise<void> {
    
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    
    let selection = editor.selection;
    let delRange: vscode.Range = selection;
    let doc = editor.document;
    if (selection.isEmpty) {
        Registry[name] = doc.lineAt(selection.active.line).text;
        delRange = doc.lineAt(selection.active.line).rangeIncludingLineBreak;
    } else {
        Registry[name] = doc.getText(selection);
    }
    
    if(cut) {
        editor.edit(e => {
            e.delete(delRange);
        });
    }
}

let ShortRegNames = ["a", "b", "c", "d", "e"];

export async function copyToShortRegister(idx: number, cut: boolean): Promise<void> {
    copyToNamedRegister(ShortRegNames[idx], cut);
}

export async function pasteFromShortRegister(idx: number): Promise<void> {
    pasteFromNamedRegister(ShortRegNames[idx]);
}

export async function removeAllRegisters() {
    Registry = {};
}

export async function removeRegister() {
    let regs = new Array<vscode.QuickPickItem>();
    for(let reg in Registry) {
        regs.push({
            label: reg,
            description: Registry[reg]
        });
    }
    
    let reg = await vscode.window.showQuickPick(regs);
    if(reg) {
        let name = reg.label;
        if(name.length == 0) {
            name = DefaultRegister;
        }
        
        delete Registry[name];
    }
}