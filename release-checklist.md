# 上架清单

## 代码与包

- 确认 `manifest.json` 版本号正确
- 确认图标已存在：`assets/icons/icon-16.png`、`icon-32.png`、`icon-48.png`、`icon-128.png`
- 打包扩展目录为 zip，根目录直接包含 `manifest.json`
- 本地加载扩展，检查选项页、长按触发、松开关闭、Mac/Windows 切换

## Chrome Web Store 填写项

- 名称：Chrome 热键
- 简短描述：长按自定义键显示 Chrome 常用热键，自动识别 Mac / Windows，松开即关闭。
- 详细描述：使用 [chrome-web-store-listing.md](/Users/cain/Documents/code/chrome-keys/store/chrome-web-store-listing.md)
- 图标：`assets/icons/icon-128.png`
- 隐私政策 URL：发布后的 `privacy.html` 地址
- 类别：Productivity
- 语言：zh-CN

## 商店素材

- 至少 1 张截图，建议 1280x800
- 建议 3 张截图：
  1. 网页中显示热键面板
  2. 选项页里的触发键与长按设置
  3. Mac / Windows 布局切换效果

## 问卷与审核

- Single purpose：使用 [chrome-web-store-questionnaire.md](/Users/cain/Documents/code/chrome-keys/store/chrome-web-store-questionnaire.md)
- 权限说明：`storage` 和所有站点访问原因按文档填写
- 数据披露：当前版本填写 No data collected

## 发布前建议

- 把开发者联系邮箱写进隐私政策和商店详情
- 检查描述中避免直接使用 Chrome 官方品牌视觉元素
- 保留一个干净的 zip 包用于审核重传
