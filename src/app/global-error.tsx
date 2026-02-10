'use client';

import { Button } from '@components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'antialiased overflow-x-hidden min-h-screen flex w-full flex-col items-center justify-center',
        )}
      >
        <div className="flex w-full flex-col items-center justify-center gap-4 text-center p-4">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Critical System Error
          </h2>
          <p className="text-muted-foreground max-w-xl">
            {error.message ||
              'A critical error occurred in the application root.'}
          </p>
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>
        </div>
      </body>
    </html>
  );
}
