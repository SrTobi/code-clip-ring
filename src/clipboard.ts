"use strict";

import * as clipboard from 'copy-paste';

export async function getContent(): Promise<string> {
    return await clipboard.paste();
}

export async function setContent<T>(content: T): Promise<T> {
    return await clipboard.copy(content);
}