# Chrome Web Store Submission — v1.1.0

## Package Info
- Title (软件包中的标题): Chrome Hotkeys
- Summary (软件包中的摘要): Hold a key to show a Chrome hotkey panel. Auto-detects Mac or Windows layout. Release to close.
- Description (说明):
  Chrome Hotkeys puts the hotkeys you need right into the page you're browsing.

  Hold your chosen trigger key for a moment and the extension shows a hotkey panel in the top-right corner. Release the key and the panel disappears. The whole interaction is lightweight — it never interrupts your browsing flow. Ideal if you're learning hotkeys, switching between Mac and Windows, or just tired of searching "Chrome hotkey" every time.

  Features:
  - Hold to reveal, release to dismiss — no clicks needed
  - Auto-detects Mac or Windows hotkey layout (or lock to one platform in options)
  - Customizable trigger key: Right Alt, Left Alt, Right Shift, Left Shift, or Right Ctrl
  - Adjustable hold duration (200–5000 ms)
  - Settings stored locally via chrome.storage.sync — no accounts, no servers
  - Available in English and Simplified Chinese

  Who's it for:
  - Anyone who wants to look up Chrome hotkeys without leaving the page
  - People switching between Mac and Windows who mix up modifier keys
  - Developers, designers, and power users who want faster keyboard navigation
  - Anyone tired of Googling "Chrome keyboard hotkeys" over and over

- Category (分类): 工具 (Tools)

## Single Purpose (单一用途)
0/1000
Show a Chrome keyboard hotkey panel inside the current web page when the user long-presses a customizable trigger key, with settings for key choice, hold duration, and platform layout.

## Permission Justifications (需请求权限的理由)
- `storage` (0/1000): Stores user preferences for trigger key, hold duration, and platform layout via chrome.storage.sync so settings sync across the user's signed-in Chrome browsers. No data is ever sent off-device.

- Host permissions (0/1000): The extension's content script runs on http://*/* and https://*/* to detect the trigger key press and render the hotkey panel directly inside the current page. It does not read, collect, store, or transmit any page content, browsing history, or form data.

## Remote Code (远程代码)
- Using remote code? No

## Data Usage (数据使用)

### Data Collection Categories
- [ ] Personally identifiable information
- [ ] Health information
- [ ] Financial and payment information
- [ ] Authentication information
- [ ] Personal communications
- [ ] Location
- [ ] Web history
- [ ] User activity
- [ ] Website content

### Data Use Certifications
- [x] I do not sell or transfer user data to third parties for uses outside of approved use cases
- [x] I do not use or transfer user data for purposes unrelated to my product's single purpose
- [x] I do not use or transfer user data to determine creditworthiness or for lending

## Official URLs
- Associated website: None
- Homepage URL (首页网址): https://github.com/cain/chrome-keys
- Support page URL (支持信息页面网址): https://github.com/cain/chrome-keys/issues

## Adult Content
- Contains adult content? No

## Privacy Policy (隐私权政策)
- URL (max 2048 chars): [REQUIRED — publish `store/privacy.html` to a public HTTPS URL, then paste here]

## Product Support
- Enable product support? Off

## Distribution
- Payment: Free
- Visibility: Public
