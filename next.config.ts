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
  // 项目页面模式（username.github.io/repo），需要 assetPrefix
  assetPrefix: process.env.NODE_ENV === 'production' ? '/github.io' : '',
  allowedDevOrigins: ['*.dev.coze.site'],
};

export default nextConfig;
