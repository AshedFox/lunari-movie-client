import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'MovieView',
    template: '%s | MovieView',
  },
  description:
    'View multiple films and series in good quality and surround sound with minimal load on your network!',
  keywords: [
    'movie',
    'series',
    'film',
    'watch',
    'online',
    'room',
    'collection',
    'together',
    'quality',
  ],
  openGraph: {
    type: 'website',
    title: 'MovieView',
    description:
      'View multiple films and series in good quality and surround sound with minimal load on your network!',
    siteName: 'MovieView',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
