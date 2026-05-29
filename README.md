<div align="center">

# 🎯 Career-Search

**每天自动聚合互联网 / 金融 / 外企 / 快消的暑期实习 + 秋招岗位 —— 纯静态、零成本、Fork 一份就有你自己的同款求职信息站。**

[![在线访问](https://img.shields.io/badge/🌐_在线访问-Live_Demo-2ea44f?style=for-the-badge)](https://keyuchen-del.github.io/Career-Search/)

[![Stars](https://img.shields.io/github/stars/keyuchen-del/Career-Search?style=flat&logo=github)](https://github.com/keyuchen-del/Career-Search/stargazers)
[![Forks](https://img.shields.io/github/forks/keyuchen-del/Career-Search?style=flat&logo=github)](https://github.com/keyuchen-del/Career-Search/network/members)
[![Deploy](https://img.shields.io/github/actions/workflow/status/keyuchen-del/Career-Search/deploy.yml?logo=githubactions&logoColor=white&label=daily%20deploy)](https://github.com/keyuchen-del/Career-Search/actions)
[![Last Commit](https://img.shields.io/github/last-commit/keyuchen-del/Career-Search?logo=git&logoColor=white)](https://github.com/keyuchen-del/Career-Search/commits)
[![License](https://img.shields.io/github/license/keyuchen-del/Career-Search)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)

<br/>

<!-- 👉 把首页截图放到 docs/images/screenshot-home.png（建议宽 1280px）后取消下一行注释 -->
<!-- ![Career-Search 首页](docs/images/screenshot-home.png) -->

> ⚠️ **README 顶部还缺一张首页截图 / 操作 GIF** —— 这是涨 star 的头号转化点。
> 录制方法见 [`docs/images/README.md`](docs/images/README.md)，拖进去后取消上面那行注释即可。

</div>

---

## ✨ 这是什么

每天，GitHub Actions 自动从 **多个公开来源**（各公司 Greenhouse / Lever / Ashby 公开招聘 API + 社区维护的校招仓库 + 精选种子清单）抓取最新的**暑期实习、秋招、校招**岗位，自动去重、归一、按「重点」排序，重新构建并发布到 GitHub Pages。

整站是**纯静态站点**：

- 🆓 **零成本** —— 没有后端、没有数据库、不需要任何 API Key，全部跑在 GitHub Pages 免费额度内
- 🔄 **永远新鲜** —— 每天自动抓取 + 重新部署，无需人工维护
- ⚡ **零延迟** —— 筛选 / 搜索 / 排序 / 分页全在浏览器本地完成，数据内嵌进页面
- 🎯 **懂你想要** —— 设置你的方向（行业 / 岗位 / 城市），匹配的岗位自动优先靠前（偏好只存在你自己的浏览器）
- 🍴 **可复制** —— Fork 一份，开启 Pages，5 分钟拥有你自己的同款求职信息站

## 🍴 一键拥有你自己的站点

> GitHub 用户最爱「Fork 即用」的模板 —— 这是本项目的核心卖点。

1. 点击右上角 **Fork** 本仓库
2. 打开你 Fork 仓库的 **Settings → Pages**，将 **Source** 选为 **GitHub Actions**
3. 打开 **Actions** 标签页，运行一次 **Build & Deploy to GitHub Pages**（或随意推送一次代码）
4. 等待绿色对勾，访问 `https://<你的用户名>.github.io/Career-Search/`

之后每天工作流会自动重新抓取数据并发布，站点始终保持新鲜。

想加自己关注的公司？只需在 [`config/companies.config.ts`](config/companies.config.ts) 里加一行 —— 详见 [CONTRIBUTING](CONTRIBUTING.md)。

## 📸 界面预览

<!-- 把以下截图放进 docs/images/ 后取消注释。说明见 docs/images/README.md -->
<!--
| 首页（筛选 + 列表） | 个性化方向设置 |
| :---: | :---: |
| ![首页](docs/images/screenshot-home.png) | ![个性化](docs/images/screenshot-prefs.png) |
-->

_截图占位中 —— 见 [`docs/images/README.md`](docs/images/README.md)。_

## 🚀 功能一览

| 功能 | 说明 |
|------|------|
| 多维筛选 | 行业（互联网 / 金融 / 外企 / 快消 / 实体 / 管培）、城市、类型（暑期 / 秋招 / 日常实习 / 校招）、地区（大陆 / 香港 / 海外） |
| 关键词搜索 | 公司 + 岗位 + 城市 + 标签即时匹配（纯前端，零延迟） |
| 重点排序 | 综合分 = 截止紧迫度 + 新鲜度 + 公司层级，三档加权（见下） |
| 个性化匹配 | 设置意向行业 / 岗位 / 城市后，匹配岗位在「综合推荐」里加权靠前 |
| 临近截止 | 15 天内截止的岗位自动高亮，可一键「仅看临近截止」 |
| 一键直达 | 每个岗位直链官方投递 / 详情页 |
| 数据透明 | 底部展示数据更新时间、各来源条数与失败来源 |
| 自动刷新 | GitHub Actions 每日抓取 + 重新构建 + 部署 |
| 响应式 | 适配桌面端与移动端 |

## 📊 「重点」是怎么算的

每个岗位在构建时预计算一个**综合分 `base`**（与用户无关）：

```
base = 0.4 · 截止紧迫度  +  0.3 · 新鲜度  +  0.3 · 公司层级
```

- **截止紧迫度**：越接近截止越高；无截止日期取中性值，已过期自动剔除
- **新鲜度**：按「本站首次发现该岗位」的时间衰减（靠快照 diff 得出）
- **公司层级**：头部 / 知名 / 其他三档

打开「设置我的方向」后，再叠加一个**个性化匹配分**（在你的浏览器本地计算）：

```
最终分 = base  +  0.6 · 与你方向的匹配度
```

所有权重都在 [`config/ranking.config.ts`](config/ranking.config.ts)，Fork 后可自由调整。

## 📡 数据来源（分层）

- **可靠打底**
  - **ATS 公开 API**：各公司 Greenhouse / Lever / Ashby 招聘看板（清洁 JSON、合法、CI 友好），自动只保留实习 / 校招 / new-grad 岗位
  - **开源校招仓库**：社区维护的实习 / 校招清单（在 [`config/sources.config.ts`](config/sources.config.ts) 配置）
  - **精选种子清单**：手工维护的国内大厂 / 金融 / 快消岗位，保证站点永远有内容
- **尽力而为**
  - **国内大厂官网接口**：能直接打的先适配（如字节），失效自动跳过并在元数据中标记

> 每条岗位均保留官方投递链接，点击可追溯到源站。

## 🛠 技术栈

- **框架**：Next.js 14（App Router，`output: 'export'` 全静态导出）+ TypeScript
- **样式**：Tailwind CSS 3.4
- **抓取**：`scripts/crawl.ts`，各来源并行、互不影响（一个失败不影响整体）
- **管线**：归一 → 去重 → firstSeen 快照 diff → 打分 → 排序，纯函数、可单测
- **部署**：GitHub Actions → GitHub Pages（零服务器、零成本）

## 🏗 架构

```
GitHub Actions（每日 cron / push / 手动）
        │
        ▼
  npm run crawl ── 并行抓取多来源 ──▶ 去重 + firstSeen diff + 打分 ──▶ data/jobs.json
        │
        ▼
  next build (output: export, DATA_SOURCE=local, NEXT_PUBLIC_BASE_PATH=/Career-Search)
        │  读取 data/jobs.json，内嵌进静态页面
        ▼
       out/  ──▶ upload-pages-artifact ──▶ deploy-pages ──▶ GitHub Pages
```

浏览器加载后，全部筛选 / 搜索 / 排序 / 个性化匹配 / 分页都在本地对内嵌数据集即时计算，交互零延迟、不依赖任何运行时服务。

## 💻 本地开发

```bash
git clone https://github.com/keyuchen-del/Career-Search.git
cd Career-Search
npm install

# 1) 抓取真实数据到 data/jobs.json（可选，仓库已自带一份快照）
npm run crawl

# 2) 开发服务器
npm run dev            # http://localhost:3000

# 3) 生产静态构建（产物在 out/）
DATA_SOURCE=local npm run build
```

> 注意：`npm run dev` 下 `basePath` 为空（根路径）；只有 CI 构建会注入 `NEXT_PUBLIC_BASE_PATH=/Career-Search` 以适配 Pages 子路径。

<details>
<summary>📖 配置 / 环境变量 / 脚本 / 项目结构（点击展开）</summary>

### 三个配置文件（Fork 后改这里即可）

| 文件 | 作用 |
|------|------|
| `config/companies.config.ts` | 要追踪的 ATS 公司列表（加一行 = 加一家公司） |
| `config/sources.config.ts` | 开关各来源、配置开源仓库 |
| `config/ranking.config.ts` | 排序权重、紧迫度 / 新鲜度窗口、公司层级分 |

### 环境变量

| 变量 | 默认 | 说明 |
|------|------|------|
| `NEXT_PUBLIC_BASE_PATH` | 空 | Pages 子路径前缀（CI 设为 `/Career-Search`） |
| `DATA_SOURCE` | `auto` | `auto` / `local` / `mock`；构建静态站点用 `local` |
| `GITHUB_TOKEN` | — | 抓取开源仓库时提升 GitHub API 限额（CI 自带） |
| `CRAWL_TIMEOUT_MS` | `15000` | 单次抓取超时（毫秒） |

### 脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（热重载） |
| `npm run build` | 生产静态构建（输出到 `out/`） |
| `npm run crawl` | 抓取所有来源到 `data/jobs.json` |
| `npm run crawl -- --only=greenhouse,seed` | 仅抓取指定来源 |
| `npm run lint` | ESLint 检查 |

### 项目结构

```
Career-Search/
├── app/                       # Next.js（layout / page / globals.css）
├── components/                # UI：HomeClient / JobCard / FilterBar / PrefsPanel ...
├── lib/                       # 纯逻辑：types / scoring / ranking / filter / prefs / snapshot
├── config/                    # 可配置：companies / sources / ranking
├── scripts/
│   ├── crawl.ts               # 抓取编排（并行 + 失败隔离）
│   ├── lib/                   # fetch 工具 / 快照持久化（firstSeen diff）
│   └── sources/               # greenhouse / lever / ashby / opensourceRepo / official / seed
├── data/                      # 抓取快照（CI 每日刷新）jobs.json / meta.json
├── docs/                      # 设计文档 + 截图说明
└── .github/workflows/deploy.yml
```

</details>

## ⚠️ 说明与边界

- 本站只**整理公开招聘信息**并提供官方链接跳转，不抓取登录态 / 强反爬站点，**最终投递与信息以官方页面为准**。
- CI 的数据中心 IP 可能被部分站点限流，「尽力而为」来源会有缺口，由 ATS API + 开源仓库 + 种子清单兜底，「市面上所有信息」无法保证 100% 抓全。
- 招聘信息时效性强，请以岗位官方页面的最新状态为准。

## 🤝 贡献

欢迎 PR！最常见的贡献是**新增一家公司或一个数据源**。详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## ⭐ Star History

如果这个项目对你的求职有帮助，点个 Star 支持一下 —— 这是对开源最好的鼓励。

[![Star History Chart](https://api.star-history.com/svg?repos=keyuchen-del/Career-Search&type=Date)](https://star-history.com/#keyuchen-del/Career-Search&Date)

## 📄 License

[MIT](LICENSE) © [keyuchen-del](https://github.com/keyuchen-del)
