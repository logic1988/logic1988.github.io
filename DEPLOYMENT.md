# GitHub Pages 部署到用户主页指南

## 目标地址
使用短地址：https://your-username.github.io

## 步骤

### 1. 创建仓库
- 仓库名：`your-username.github.io`（替换成你的实际用户名）
- 访问：https://github.com/new

### 2. 初始化 Git 并推送
```bash
cd /workspace/projects

# 如果之前已经初始化过，跳过 init
git init

# 添加远程仓库（替换为你的仓库地址）
git remote set-url origin https://github.com/your-username/your-username.github.io.git

# 添加所有文件
git add .

# 提交
git commit -m "部署到 GitHub 用户主页"

# 推送到 main 分支
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages
1. 访问仓库 → Settings → Pages
2. Source 选择 **GitHub Actions**
3. 保存后等待自动部署

### 4. 访问网站
- 地址：https://your-username.github.io

## 重要提示

### 替换用户名
在执行前，请将所有 `your-username` 替换成你的 GitHub 实际用户名。

### CNAME 配置
- `public/CNAME` 文件内容应该是：`your-username.github.io`
- 如果使用自己的域名，修改为：`yourname.com`

### 配置文件
- `next.config.ts` 中的 `assetPrefix` 已注释（用户主页模式）
- 不需要子路径配置

## 故障排查

### 部署失败
- 检查 Actions 日志：仓库 → Actions 标签页
- 常见问题：Node.js 版本、依赖安装失败

### 404 错误
- 确认仓库名是 `username.github.io` 格式
- 等待 1-3 分钟部署完成
- 检查 Pages 设置是否启用

### 样式丢失
- 检查 `assetPrefix` 配置（应该为空）
- 清除浏览器缓存重试
