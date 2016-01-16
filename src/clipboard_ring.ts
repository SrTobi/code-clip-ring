"use strict";
import * as clipboard from './clipboard';

export interface ClipboardRing {
    
    getCurrent(): string;
    getAll(): string[];
    
    pushNew(content: string): void;
    popCurrent(): void;
    
    next(count: number): Promise<void>;
    prev(count: number): Promise<void>;
    
    size(): number;
    empty(): boolean;
}

var ClipboardRingContent: string[] = new Array<string>();

class ClipboardRingImpl implements ClipboardRing {
    
    public constructor(
                current: string,
        private _content: string[],
        private _maxSize?: number
    ) {
        this._maxSize = Math.max(2, this._maxSize);
        
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
        
        if (this._content.length > this._maxSize) {
            this._content.pop();
        }
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
}

export async function getClipboardRing(): Promise<ClipboardRing> {
    let current = await clipboard.getContent();
    return new ClipboardRingImpl(current, ClipboardRingContent, 10);
}