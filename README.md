# 周度运营分析看板案例

一个公开展示用的单页静态站，用匿名化方式呈现“周度运营分析看板”项目的结构、交互和叙事。

## 页面内容

- 首屏介绍与 16:9 视频预留位
- 项目背景
- 核心能力
- 六个看板模块
- 数据流与系统结构
- 成果与价值
- 独立视频演示区

## 技术方式

- 原生 `HTML`
- 原生 `CSS`
- 原生 `JavaScript`
- 单文件内容配置：`assets/content.js`
- 适配 `GitHub Pages` 的纯静态部署

## 目录结构

```text
.
├─ index.html
├─ README.md
└─ assets
   ├─ app.js
   ├─ content.js
   └─ styles.css
```

## 如何调整内容

- 修改 `assets/content.js` 中的标题、说明、标签、模块文案和流程节点。
- 修改 `assets/content.js` 中的 `model` 参数，可以整体改变示意图的走势和数值区间。
- 将 `assets/content.js` 里的 `meta.demoVideo.url` 从 `null` 改成公开视频地址后，页面会自动显示视频或外链入口。

## 本地预览

直接打开 `index.html` 即可查看。

如果你想用本地服务预览，也可以在当前目录运行一个静态服务器，例如：

```powershell
python -m http.server 4173
```

然后访问 `http://127.0.0.1:4173/`。

## GitHub Pages 部署

1. 创建一个新的公开仓库，例如 `ops-dashboard-case-study`。
2. 将本目录内容推送到该仓库默认分支。
3. 在 GitHub 仓库设置中开启 `Pages`，部署源选择默认分支根目录。
4. 等待部署完成后，页面即可通过公开链接访问。

## 公开展示说明

- 仓库不包含原始导出文件。
- 页面不包含真实品牌、内部账号、库表名、查询语句或字段命名。
- 所有图表均为本地生成的脱敏示意图，只用来展示看板结构和项目表达方式。
