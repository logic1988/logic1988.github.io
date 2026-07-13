# logic1988.github.io

这是 `https://logic1988.github.io/` 对应的个人主页，主要展示论文和开源项目。项目使用 Next.js 静态导出并部署到 GitHub Pages。

## 快速开始

```bash
pnpm install
pnpm run dev
```

默认本地地址是 `http://localhost:5000`。

如果本机没有全局 `pnpm`，可以直接用项目声明的 pnpm 版本：

```bash
npx -y pnpm@9.0.0 install
npx -y pnpm@9.0.0 run dev
```

## 更新内容

论文数据在 `src/data/papers.json`。

项目数据在 `src/data/projects.json`。

更新 GitHub star 数：

```bash
pnpm run update:stars
```

如果本机没有全局 `pnpm`：

```bash
npx -y pnpm@9.0.0 run update:stars
```

脚本会读取 `projects.json` 中的 GitHub 仓库地址，调用 GitHub API 获取当前 star 数，并写回 `stars` 和 `stars_updated_at` 字段。

脚本默认优先使用 GitHub API；如果本地遇到 API 限流，会自动退回解析 GitHub 仓库页面。需要更稳定的 API 调用时，可以带上个人 token：

```bash
GITHUB_TOKEN=your_token pnpm run update:stars
```

## 构建

```bash
pnpm run build
```

构建产物输出到 `out/`。

本地预览静态构建结果：

```bash
pnpm run start
```

## 发布

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

首次发布前建议使用 SSH 远端，避免 HTTPS token 失效导致推送失败：

```bash
git remote set-url origin git@github.com:logic1988/logic1988.github.io.git
ssh -T git@github.com
git push origin main
```

如果 `ssh -T git@github.com` 返回 `Permission denied (publickey)`，说明本机 SSH 公钥还没有绑定到 GitHub。复制本机公钥：

```bash
pbcopy < ~/.ssh/id_rsa.pub
```

然后打开 `https://github.com/settings/keys`，新增 SSH key。再次执行：

```bash
ssh -T git@github.com
git push origin main
```

push 成功后，在 `https://github.com/logic1988/logic1988.github.io/actions` 查看部署状态；成功后访问 `https://logic1988.github.io/`。

如果只想刷新 star 数，可以在 GitHub Actions 手动触发 `Deploy to GitHub Pages`，并打开 `Refresh GitHub stars before deploy`。
