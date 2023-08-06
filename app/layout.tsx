'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { ReactQueryProvider, RecoilProvider } from '../src';

// 폰트 적용
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RecoilProvider>
        <ReactQueryProvider>
          <body className={inter.className}>
            <div style={{ backgroundColor: 'gray', padding: '1rem' }}>
              Match the Arrow
            </div>
            <div style={{ display: 'flex', flex: 1 }}>{children}</div>
            <div style={{ backgroundColor: 'gray', padding: '1rem' }}>
              Footer
            </div>
          </body>
        </ReactQueryProvider>
      </RecoilProvider>
    </html>
  );
}
