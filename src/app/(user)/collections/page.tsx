import { PAGE_SIZE } from './_constants';
import { pageSchema } from '@lib/validation/page-schema';
import CollectionsGrid from './_components/CollectionsGrid';
import { Paginator } from '@components/common/Paginator';
import {
  CollectionsFilters,
  filterSchema,
  parseSearchToFilter,
} from '@components/collection/filter';
import { Button } from '@components/ui/button';
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from '@components/ui/drawer';
import {
  CollectionsSort,
  parseSearchToSort,
  sortSchema,
} from '@components/collection/sort';
import { getCollections } from '@services/collection.service';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const search = await searchParams;
  const page = pageSchema.parse(search.page);
  const filter = filterSchema.parse(search);
  const sort = sortSchema.parse(search.sort);

  const collectionsData = await getCollections(
    parseSearchToFilter(filter),
    page,
    parseSearchToSort(sort),
  );

  return (
    <div className="@container">
      <div className="@xl:grid @xl:grid-cols-[calc(var(--spacing)*72)_1fr] gap-6 container py-10">
        <aside className="p-3 rounded-lg border @xl:flex flex-col h-fit gap-4 hidden">
          <h2 className="text-xl font-semibold">
            Filters
            <span className="text-xs text-muted-foreground">
              ({collectionsData.pageInfo.totalCount})
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
                        ({collectionsData.pageInfo.totalCount})
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
          <CollectionsGrid collections={collectionsData.nodes} />
          <Paginator
            className="mt-auto"
            currentPage={page}
            totalPages={Math.ceil(
              collectionsData.pageInfo.totalCount / PAGE_SIZE,
            )}
            showNextPrev
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
