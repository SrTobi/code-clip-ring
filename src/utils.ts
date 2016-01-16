import * as vscode from 'vscode';


export async function vscodeCopy(): Promise<void> {
    await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
}

export async function vscodeCut(): Promise<void> {
    await vscode.commands.executeCommand("editor.action.clipboardCutAction");
}

export async function vscodePaste(): Promise<void> {
    await vscode.commands.executeCommand("editor.action.clipboardPasteAction");
}