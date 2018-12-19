# Clipboard Ring (Now using the VS Code clipboard api!)
Extend your clipboard with the clipboard ring.
Every time you copy or cut to the clipboard the content will also be added to the clipboard ring.
Paste multiple times from the clipboard to circle through the items.

## How it works
Use `ctrl+c` or `ctrl+x` to copy or cut as usual. But additionally, the copied content will also be added to the clipboard ring.
With `ctrl+shift+v` you can now paste from the clipboard ring. Press `ctrl+shift+v` multiple times to circle through the clipboard ring.
Use the `Select and paste Ring Item` command to paste a specific ring item.
Use `Remove Ring Item` and `Remove all Ring Items` to remove a specific or all ring items.

![Preview](/images/preview.gif?raw=true)

## Settings
### Use ctrl+v to paste from the clipboard ring
By default `ctrl+c` or `ctrl+x` will overwrite the default copy and cut operations.
The paste operation is not overwritten, because the `Paste Ring Item` command has a slightly different behavior.
If you want to use `ctrl+v` to paste from clipboard add the following keyboard definition:

```````````````json
{
    "key":     "ctrl+v",
    "when":    "editorFocus",
    "command": "clipring.pasteRingItem"
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

## Contributing

Feel free to contribute to this extension. Please read the [CONTRIBUTING.md](/CONTRIBUTING.md).