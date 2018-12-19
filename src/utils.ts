import * as vscode from 'vscode';

const clipboard = vscode.env.clipboard

export function getContent(): Thenable<string> {
    return clipboard.readText()
}

export function setContent(content: string): Thenable<void> {
    return clipboard.writeText(content)
}

export async function vscodeCopy(): Promise<void> {
    await vscode.commands.executeCommand("editor.action.clipboardCopyAction");
}

export async function vscodeCut(): Promise<void> {
    await vscode.commands.executeCommand("editor.action.clipboardCutAction");
}

export async function vscodePaste(): Promise<void> {
    await vscode.commands.executeCommand("editor.action.clipboardPasteAction");
}