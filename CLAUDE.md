# CLAUDE.md

## 项目定位

这是 `logic1988.github.io` 的 GitHub Pages 个人主页，采用 Next.js 静态导出。站点面向外部访问者展示个人简介、论文和开源项目。

## 硬约束

- 保持静态导出：`next.config.ts` 必须保留 `output: 'export'`。
- 不使用运行时 API 路由：GitHub Pages 不提供服务端运行时，`src/app/api/**` 不应新增。
- 内容数据与页面组件分离：论文和项目维护在 `src/data/`，页面组件只负责展示和排序。
- 不引入 Coze 运行依赖：开发、构建、部署使用 `pnpm` 和标准 Next.js 命令。
- 不提交密钥、token、图像二进制、模型文件和临时文件。

## 目录约定

- `src/app/`：Next.js 页面、布局和样式。
- `src/data/`：人工维护的站点内容数据。
  - `papers.json`：论文列表。
  - `projects.json`：开源项目列表和构建时记录的 star 数。
- `scripts/`：可复用维护脚本。
  - `update_stars.mjs`：手动从 GitHub API 刷新 `projects.json` 中的 star 数。

## 维护流程

- 更新论文：编辑 `src/data/papers.json`。
- 更新项目：编辑 `src/data/projects.json`。
- 更新 star 数：本地运行 `pnpm run update:stars`，或在 GitHub Actions 手动触发部署时选择刷新 star。
- 发布：推送到 `main` 后 GitHub Actions 自动构建部署。

## 验证要求

- 代码变更后运行 `pnpm run ts-check`。
- 发布相关变更后运行 `pnpm run build`。
