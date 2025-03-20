import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';
import { ApolloWrapper } from '@lib/apollo/ApolloWrapper';
import { Toaster } from '@components/ui/sonner';
import { cn } from '@lib/utils';
import { Header } from '@components/common/header';
import { getUser } from '@lib/auth/user-dal';
import { ThemeProvider } from 'next-themes';

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
    template: '%s - MovieView',
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

export default async function RootLayout({
  children,
  auth,
}: Readonly<{
  children: ReactNode;
  auth: ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased overflow-x-hidden min-h-screen grid grid-rows-[calc(var(--spacing)*16)_1fr]',
        )}
      >
        <ThemeProvider
          enableSystem
          defaultTheme="system"
          attribute="class"
          disableTransitionOnChange
        >
          <ApolloWrapper>
            <Header user={user} />
            {children}
            {auth}
          </ApolloWrapper>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
