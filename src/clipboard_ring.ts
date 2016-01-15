
export interface ClipboardRing {
    
    getCurrent(): string;
    getAll(): string[];
    
    pushNew(content: string): void;
    popCurrent(): void;
    
    next(): void;
    prev(): void;
}

class ClipboardRingImpl implements ClipboardRing {
    
    private _content: string[] = new Array<string>();
    private _maxSize: number;
    
    public constructor(maxSize?: number) {
        this._maxSize = maxSize;
    }
    
    public getCurrent(): string {
        if(this._content.length == 0)
            return "";
            
        return this._content[0];
    }
    
    public getAll(): string[] {
        return this._content.slice();
    }
    
    public pushNew(content: string): void {
        this._content.unshift(content);
    }
    
    public popCurrent(): void {
        this._content.shift();
    }
    
    public next(): void {
        let old = this._content.shift();
        this._content.push(old);
    }
    
    public prev(): void {
        let n = this._content.pop();
        this._content.unshift(n);
    }
}