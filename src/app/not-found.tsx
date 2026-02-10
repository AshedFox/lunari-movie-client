import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { cn } from '@lib/utils';
import { buttonVariants } from '@components/ui/button';

export default function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 text-center">
      <div className="rounded-full bg-muted p-6">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
      <p className="text-muted-foreground max-w-xl">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might
        have been removed, renamed, or doesn&apos;t exist.
      </p>
      <Link className={cn(buttonVariants())} href="/">
        Return Home
      </Link>
    </div>
  );
}
