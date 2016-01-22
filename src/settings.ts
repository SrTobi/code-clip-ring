"use strict";
import * as clipboard from './utils';
import * as vscode from 'vscode';

export interface Settings {
    maxRingItems: number;
}

export function getSettings(): Settings {
    let setting = vscode.workspace.getConfiguration("clipring");
    
    return {
      maxRingItems: setting.get<number>("maxRingItems")  
    };
}