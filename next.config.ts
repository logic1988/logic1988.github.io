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
  // 如果仓库名不是 username.github.io，取消注释并修改
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  allowedDevOrigins: ['*.dev.coze.site'],
};

export default nextConfig;
