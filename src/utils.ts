"use strict";
import * as vscode from 'vscode';
import * as clipboard from 'copy-paste';

export async function getContent(): Promise<string> {
    return await clipboard.paste();
}

export async function setContent<T>(content: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        clipboard.copy(content, (err) => {
            if (err) 
                reject(err);
            else
                resolve(content);
        });
    });
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