import * as vscode from 'vscode';

export interface Settings {
    maxRingItems: number
    itemToClipboardOnPaste: boolean
    backupClipboard: boolean
    selectTextAfterPasteFromMenu: Boolean
}

export function getSettings(): Settings {
    let setting = vscode.workspace.getConfiguration("clipring");
    
    return {
      maxRingItems: setting.get<number>("maxRingItems")!,
      itemToClipboardOnPaste: setting.get<boolean>("itemToClipboardOnPaste")!,
      backupClipboard: setting.get<boolean>("backupClipboard")!,
      selectTextAfterPasteFromMenu: setting.get<boolean>("selectTextAfterPasteFromMenu")!,
    };
}