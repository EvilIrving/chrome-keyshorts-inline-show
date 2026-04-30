# Chrome Keyboard Hotkeys

**Press and hold** a key you choose to show a floating hotkey panel of common Chrome hotkeys; release to dismiss. The extension can **auto-detect Mac vs. Windows** hotkey labels, or you can lock the sheet to one layout in the options.

[中文说明 → README.md](README.md)

## Features

- **Hotkey panel**: On normal web pages (`http` / `https`), hold the trigger key for the configured duration to show categorized hotkeys.
- **Configurable**: Trigger key (e.g. left/right Alt, left/right Shift, right Ctrl), hold duration (200–5000 ms, default 800 ms), and sheet mode: **Auto / Always Mac / Always Windows**.
- **Options**: Click the extension icon in the toolbar to open options; or use **Extension options** from `chrome://extensions`.

## Install (developer / unpacked)

1. Clone or download this repository.
2. In Chrome, open `chrome://extensions`.
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select this folder (the one that contains `manifest.json`).

## Usage

1. Open any **http/https** page (this extension does not inject into internal pages like `chrome://` or `edge://`).
2. **Hold** the trigger key until the panel appears.
3. **Release** the trigger key to close the panel.
4. To change the key, duration, or Mac/Windows layout, **click the extension icon** to open the options page (settings are saved with `chrome.storage.sync`).

## Permissions

| Permission | Purpose |
|------------|---------|
| `storage` | Persist your options (`chrome.storage.sync`). |

Content scripts only run on `http://*/*` and `https://*/*`. The extension does not send your page content to remote servers and does not declare networking features beyond what the browser provides for sync storage.

## Project layout

```
├── manifest.json   # Manifest V3
├── content.js      # Content script: panel DOM, key listeners, Mac/Win data, storage
├── options.html    # Options UI
├── options.js      # Options logic and saving to storage
├── README.md       # Chinese readme
└── README-en.md    # This file (English)
```

## Version

See the `version` field in `manifest.json`.

## License

Add a `LICENSE` file in the repository if you publish this project under an open-source license.
