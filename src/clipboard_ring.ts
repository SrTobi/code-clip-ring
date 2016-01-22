"use strict";
import * as clipboard from './utils';
import {getSettings} from './settings';

export interface ClipboardRing {
    
    getCurrent(): string;
    getAll(): string[];
    
    pushNew(content: string): void;
    popCurrent(): void;
    
    next(count: number): Promise<void>;
    prev(count: number): Promise<void>;
    
    size(): number;
    empty(): boolean;
    
    clear(): void;
    remove(idx: number): void;
}

var ClipboardRingContent: string[] = new Array<string>();

class ClipboardRingImpl implements ClipboardRing {
    
    public constructor(
                current: string,
        private _content: string[],
        private _maxSize?: number
    ) {
        this._maxSize = Math.max(2, this._maxSize);
        
        this.popToMaxSize();
        
        if (current && (this.empty() || this.getCurrent() != current)) {
            this.pushNew(current);
        }
    }
    
    public getCurrent(): string {    
        if (this.empty()) {
            throw new Error("No current item!");
        }        
        return this._content[0];
    }
    
    public getAll(): string[] {
        return this._content.slice();
    }
    
    public pushNew(content: string): void {
        this._content.unshift(content);
        
        this.popToMaxSize();
    }
    
    public popCurrent(): void {
        if (!this.empty()) {
            this._content.shift();
        }
    }
    
    public async next(count: number): Promise<void> {
        if (this.empty() || count % this.size() == 0)
            return;
            
        while (count--) {
            let old = this._content.shift();
            this._content.push(old);
        }
        
        await clipboard.setContent(this.getCurrent());
    }
    
    public async prev(count: number): Promise<void> {
        if (this.empty() || count % this.size() == 0)
            return;
            
        while (count--) {
            let n = this._content.pop();
            this._content.unshift(n);
        }
        
        await clipboard.setContent(this.getCurrent());
    }
    
    public size(): number {
        return this._content.length;
    }
    
    public empty(): boolean {
        return this.size() == 0;
    }
    
    public clear(): void {
        this._content.splice(0);
    }
    
    public remove(idx: number): void {
        this._content.splice(idx, 1);
    }
    
    private popToMaxSize(): void {        
        while (this._content.length > this._maxSize) {
            this._content.pop();
        }
    }
}

export async function getClipboardRing(): Promise<ClipboardRing> {
    let current = await clipboard.getContent();
    return new ClipboardRingImpl(current, ClipboardRingContent, getSettings().maxRingItems);
}