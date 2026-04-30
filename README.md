# Chrome 热键

[English → README-en.md](README-en.md)

在网页中**长按**你设定的键，弹出 Chrome 常用热键面板；松手即关闭。支持自动识别 **Mac** / **Windows** 键位说明，也可在选项中固定为某一种布局。

## 功能概览

- **热键面板**：在任意普通网页（`http` / `https`）上通过长按触发键显示浮层，列出分类热键。
- **可配置**：触发键（如左/右 Alt、左/右 Shift、右 Ctrl）、长按时长（200～5000 ms，默认 800 ms）、热键列表为「自动 / 始终 Mac / 始终 Windows」。
- **选项入口**：单击浏览器工具栏上的扩展图标打开选项；亦可从 `chrome://extensions` 中进入扩展选项。

## 本地安装（开发者模式）

1. 克隆或下载本仓库到本地。
2. 打开 Chrome，访问 `chrome://extensions`。
3. 打开右上角「**开发者模式**」。
4. 点击「**加载已解压的扩展程序**」，选择本仓库根目录（内含 `manifest.json` 的文件夹）。

## 使用说明

1. 打开任意 **http/https** 网页（本扩展不会注入 `chrome://`、`edge://` 等内部页）。
2. **按住**选项里设定的触发键，达到设定时长后面板出现。
3. **松开**触发键后面板关闭。
4. 需要改键位、时长或 Mac/Windows 布局时，**单击扩展图标**打开选项页修改（设置会同步保存在浏览器扩展存储中）。

## 权限说明

| 权限 | 用途 |
|------|------|
| `storage` | 保存你在选项页中的配置（`chrome.storage.sync`）。 |

内容脚本仅匹配 `http://*/*` 与 `https://*/*`，不向远程服务器发送你的浏览内容；本扩展不提供网络请求功能。

## 项目结构

```
├── manifest.json   # Manifest V3 配置
├── content.js      # 内容脚本：面板 DOM、键盘监听、Mac/Win 数据与存储读取
├── options.html    # 选项页 UI
├── options.js      # 选项逻辑与写入存储
├── README.md       # 中文说明
└── README-en.md    # English readme
```

## 版本

当前版本见 `manifest.json` 中的 `version` 字段。

## 许可证

若需开源许可证，请在仓库中自行添加 `LICENSE` 文件。
