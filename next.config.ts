import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // GitHub Pages 静态导出配置
  output: 'export',
  // 图片优化禁用（GitHub Pages 不支持）
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
