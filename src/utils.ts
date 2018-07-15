import * as vscode from 'vscode';
import * as clipboard from 'clipboardy';

export function getContent(): Promise<string> {
    return clipboard.read()
}

export function setContent(content: string): Promise<void> {
    return clipboard.write(content)
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