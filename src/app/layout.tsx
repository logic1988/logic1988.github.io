import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'HE Qian\'s Profile',
    template: '%s | HE Qian\'s Profile',
  },
  description:
    'HE Qian - Focus on Visual and Multimodal Generation and AI Applications.',
  keywords: [
    'HE Qian',
    'Computer Vision',
    'Video Generation',
    'Image Generation',
    'Multimodal',
    'AI Applications',
  ],
  authors: [{ name: 'HE Qian' }],
  generator: 'Next.js',
  // icons: {
  //   icon: '',
  // },
  openGraph: {
    title: 'HE Qian\'s Profile',
    description:
      'HE Qian - Focus on Visual and Multimodal Generation and AI Applications.',
    url: 'https://logic1988.github.io',
    siteName: 'HE Qian\'s Profile',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
