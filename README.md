# Clipboard Ring
Extend your clipboard with the clipboard ring.
Every time you copy or cut to the clipboard the content will also be added to the clipboard ring.
Paste multiple times from the clipboard to cicle through the items.

## How it works
Use `ctrl+c` or `ctrl+x` to copy or cut as usual. The copied content will also be added to the clipboard ring.
Use `ctrl+shift+v` to paste from the clipboard ring. Press `ctrl+shift+v` multiple times to cicle through the clipboard ring.

## Settings
### Use ctrl+v to paste from the clipboard ring
By default `ctrl+c` or `ctrl+x` will overwrite the default copy and cut operations.
The paste operation is not overwritten, because the `Paste Ring Item` command has a slightly different behavior.
If you want to use `ctrl+v` to paste from clipboard add the following keyboard definition:

```````````````json
{
    "key":     "ctrl+v",
    "when":    "editorFocus",
    "command": "clipreg.pasteRingItem"
}
```````````````

### Maximal clipboard ring items
By default the clipboard ring will store up to 10 items.
The number of maximal items can be customized with the `"clipring.maxRingItems"` option. Default:

```````````````json
// Default
"clipring.maxRingItems": 10
```````````````

### Clipboard interaction behavior
Everytime a clipboard ring operation is invoked, the current clipboard content will be added to the clipboard ring.
Use `"clipring.backupClipboard"` to disable this behavior.

The same behavior applys to the paste operation.
When an item from the clipboard is pasted into the editor,
the pasted content is also transfered to the clipboard.
Use `"clipring.itemToClipboardOnPaste"` to disable this behavior.

```````````````json
// Defaults
"clipring.backupClipboard": true,
"clipring.itemToClipboardOnPaste": true,
```````````````