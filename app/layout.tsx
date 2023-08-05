"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ReactQueryProvider, RecoilProvider } from "../src";

// 폰트 적용
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RecoilProvider>
        <ReactQueryProvider>
          <body className={inter.className}>{children}</body>
        </ReactQueryProvider>
      </RecoilProvider>
    </html>
  );
}
