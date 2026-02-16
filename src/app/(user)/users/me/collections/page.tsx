import {
  CollectionsFilters,
  collectionFilterSchema,
  parseSearchToFilter,
} from '@features/filter-collections';
import { Paginator } from '@features/pagination/ui/Paginator';
import { Button } from '@shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shared/ui/dialog';
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from '@shared/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { pageSchema } from '@shared/lib/zod/page-schema';
import { ArrowRight, Menu, Plus } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DEFAULT_PAGE_SIZE } from '@entities/collection';
import { CollectionsManageList } from '@widgets/collections-manage-list/ui/CollectionsManageList';
import { getUserCollections } from '@entities/collection/server';
import { getCurrentUser } from '@entities/user/server';
import {
  collectionSortSchema,
  CollectionsSort,
  parseSearchToSort,
} from '@features/sort-collections';
import { CreateCollectionForm } from '@features/create-collection';

export const metadata: Metadata = {
  title: 'My Collections',
};

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const search = await searchParams;
  const page = pageSchema.parse(search.page);
  const filter = collectionFilterSchema.parse(search);
  const sort = collectionSortSchema.parse(search.sort);

  const user = await getCurrentUser();

  if (!user) {
    redirect('/login?from=/users/me/collections');
  }

  const { nodes, pageInfo } = await getUserCollections(
    user.id,
    parseSearchToFilter(filter),
    page,
    parseSearchToSort(sort),
  );

  return (
    <div className="@container">
      <div className="flex flex-col gap-6 container py-10">
        <div className="flex gap-3">
          <h1 className="text-3xl font-bold">My Collections</h1>
          <Dialog>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="ml-auto" asChild>
                <Button variant="secondary">
                  Menu
                  <Menu size={12} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    Create
                    <Plus size={12} />
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem asChild>
                  <Link href="/collections">
                    Go To All Collections
                    <ArrowRight size={12} />
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="max-h-[80%] overflow-auto">
              <DialogHeader>
                <DialogTitle>Create collection</DialogTitle>
                <DialogDescription>
                  Create your own collection of movies!
                </DialogDescription>
              </DialogHeader>
              <CreateCollectionForm />
            </DialogContent>
          </Dialog>
        </div>
        <div className="@xl:grid @xl:grid-cols-[calc(var(--spacing)*72)_1fr] gap-6">
          <aside className="p-3 rounded-lg border @xl:flex flex-col h-fit gap-4 hidden">
            <h2 className="text-xl font-semibold">
              Filters
              <span className="text-xs text-muted-foreground">
                ({pageInfo.totalCount})
              </span>
            </h2>
            <CollectionsFilters formInit={filter} />
          </aside>
          <div className="flex flex-col gap-2 h-full">
            <div className="flex justify-between">
              <Drawer direction="left">
                <DrawerTrigger asChild>
                  <Button className="@xl:hidden" variant="outline">
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="@xl:hidden">
                  <DrawerHeader>
                    <DrawerTitle asChild>
                      <h2 className="text-xl font-semibold">
                        Filters
                        <span className="text-xs text-muted-foreground">
                          ({pageInfo.totalCount})
                        </span>
                      </h2>
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4">
                    <CollectionsFilters formInit={filter} />
                  </div>
                </DrawerContent>
              </Drawer>
              <CollectionsSort currentSort={sort} />
            </div>
            <CollectionsManageList collections={nodes} />
          </div>
        </div>
        <Paginator
          className="mt-auto"
          currentPage={page}
          totalPages={Math.ceil(pageInfo.totalCount / DEFAULT_PAGE_SIZE)}
          showNextPrev
        />
      </div>
    </div>
  );
};

export default Page;
