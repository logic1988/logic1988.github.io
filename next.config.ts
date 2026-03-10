import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // GitHub Pages 静态导出配置
  output: 'export',
  // 图片优化禁用（GitHub Pages 不支持）
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lf-coze-web-cdn.coze.cn',
        pathname: '/**',
      },
    ],
  },
  // 用户主页模式（username.github.io），无需 assetPrefix
  // 如果使用项目页面模式（username.github.io/repo），取消注释并修改
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  allowedDevOrigins: ['*.dev.coze.site'],
};

export default nextConfig;
