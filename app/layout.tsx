'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider, ReactQueryProvider, RecoilProvider } from '../src';
import { Timer } from '../src/screens/GameScreen/start/components';

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
          <AuthProvider>
            <body className={inter.className}>
              <div
                style={{
                  backgroundColor: 'gray',
                  padding: '1rem',
                  display: 'flex',
                }}
              >
                Match the Arrow
                <div>
                  <Timer
                    showIntro={false}
                    initialTime={60}
                    onTimeUp={() => {}}
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {children}
              </div>
              <div style={{ backgroundColor: 'gray', padding: '1rem' }}>
                Footer
              </div>
            </body>
          </AuthProvider>
        </ReactQueryProvider>
      </RecoilProvider>
    </html>
  );
}
