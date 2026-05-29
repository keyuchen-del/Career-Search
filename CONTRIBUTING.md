# 贡献指南

欢迎贡献！最常见、最有价值的两种贡献是 **加一家公司** 和 **加一个数据源**。

## 加一家公司（最简单）

很多公司用 Greenhouse / Lever / Ashby 托管招聘，有公开 JSON API。只需在
[`config/companies.config.ts`](config/companies.config.ts) 的 `ATS_COMPANIES` 数组里加一行：

```ts
{ name: "公司名", ats: "greenhouse", token: "板块 token", tier: 1, category: "外企", region: "海外" },
```

- `token` 是招聘看板 URL 里的 slug：
  - Greenhouse：`boards.greenhouse.io/<token>`
  - Lever：`jobs.lever.co/<token>`
  - Ashby：`jobs.ashbyhq.com/<token>`
- 抓取时会自动只保留实习 / 校招 / new-grad 岗位。

本地验证：`npm run crawl -- --only=greenhouse`，看该公司是否出现在 `data/jobs.json`。

## 加一个开源校招仓库

如果有社区维护的、用 Markdown 表格记录校招/实习的仓库，在
[`config/sources.config.ts`](config/sources.config.ts) 的 `OPENSOURCE_REPOS` 加一项：

```ts
{ id: "repo:xxx", owner: "用户名", repo: "仓库名", path: "README.md", parser: "md-table", category: "互联网" },
```

解析器会按表头自动识别「公司 / 岗位 / 地点 / 链接」列。**请先确认 raw 文件存在、表格列能被识别**再启用。

## 加一个新的数据源 adapter

1. 在 `scripts/sources/` 新建文件，导出一个 `SourceAdapter`（`{ id, label, fetch() }`）。
2. `fetch()` 返回 `RawJob[]`，抛错只会让这一个源失败，不影响整体。
3. 在 `scripts/crawl.ts` 的 `selectAdapters` 里注册。
4. 建议在 `scripts/fixtures/` 放一份样例响应，写归一逻辑的单测。

## 调整排序权重

改 [`config/ranking.config.ts`](config/ranking.config.ts) 即可，无需动代码。

## 开发约定

- 数据源失败必须隔离（用 `Promise.allSettled` 或 try/catch），单源故障不能影响整体。
- `lib/` 与 `scripts/` 内部用相对路径 import（`tsx` 需要）；`app/` 与 `components/` 用 `@/` 别名。
- 提交前跑 `npm run crawl` + `DATA_SOURCE=local npm run build` 确认通过。
