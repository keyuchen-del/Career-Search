# 截图 / 录屏说明

README 顶部的首页截图是涨 star 的头号转化点。建议放两张：

| 文件名 | 内容 | 建议尺寸 |
|--------|------|---------|
| `screenshot-home.png` | 首页（统计 + 筛选 + 岗位列表） | 宽 ≥ 1280px |
| `screenshot-prefs.png` | 「设置我的方向」个性化弹窗 | 宽 ≥ 1280px |

## 怎么截

```bash
npm run dev          # http://localhost:3000
```

- macOS：`Cmd + Shift + 4` 框选；或用浏览器 DevTools 的设备模式截整页。
- 想要操作 GIF：用 [Kap](https://getkap.co/) 或 [LICEcap](https://www.cockos.com/licecap/) 录一段「筛选 → 设置方向 → 列表重排」的 8~12 秒动图，命名 `demo.gif`。

## 放进去后

把图片拖到本目录，然后在根 `README.md` 顶部取消对应注释行：

```markdown
![Career-Search 首页](docs/images/screenshot-home.png)
```
