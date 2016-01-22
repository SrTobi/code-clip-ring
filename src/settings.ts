"use strict";
import * as clipboard from './utils';
import * as vscode from 'vscode';

export interface Settings {
    maxRingItems: number;
    itemToClipboardOnPaste: boolean;
    backupClipboard: boolean;
}

export function getSettings(): Settings {
    let setting = vscode.workspace.getConfiguration("clipring");
    
    return {
      maxRingItems: setting.get<number>("maxRingItems"),
      itemToClipboardOnPaste: setting.get<boolean>("itemToClipboardOnPaste"),
      backupClipboard: setting.get<boolean>("backupClipboard")
    };
}