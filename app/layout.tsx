import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';

import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Swastik IT Club',
  description: 'Official website of Swastik IT Club at Swastik College',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
