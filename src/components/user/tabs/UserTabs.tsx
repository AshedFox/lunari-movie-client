'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';
import { UserBookmarksTab } from './UserBookmarksTab';
import { UserReviewsTab } from './UserReviewsTab';
import { UserCollectionsTab } from './UserCollectionsTab';
import { Film, MessageSquare, Library, Loader2 } from 'lucide-react';
import { Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface UserTabsProps {
  userId: string;
}

const TabLoader = () => (
  <div className="flex justify-center py-10">
    <Loader2 className="animate-spin" />
  </div>
);

export function UserTabs({ userId }: UserTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTab = searchParams.get('tab') || 'bookmarks';

  const onTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <TabsList variant="line" className="w-full justify-start border-b mb-6">
        <TabsTrigger value="bookmarks" className="flex items-center gap-2">
          <Film size={16} />
          Bookmarks
        </TabsTrigger>
        <TabsTrigger value="reviews" className="flex items-center gap-2">
          <MessageSquare size={16} />
          Reviews
        </TabsTrigger>
        <TabsTrigger value="collections" className="flex items-center gap-2">
          <Library size={16} />
          Collections
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bookmarks" className="mt-0">
        <Suspense fallback={<TabLoader />}>
          <UserBookmarksTab userId={userId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="reviews" className="mt-0">
        <Suspense fallback={<TabLoader />}>
          <UserReviewsTab userId={userId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="collections" className="mt-0">
        <Suspense fallback={<TabLoader />}>
          <UserCollectionsTab userId={userId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
