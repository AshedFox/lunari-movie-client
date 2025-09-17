import { getClient } from '@lib/apollo/rsc-client';
import {
  CollectionFilter,
  CollectionSort,
  GetCollectionsDocument,
} from '@lib/graphql/generated/graphql';
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

const getCollections = async (
  filter: CollectionFilter,
  page: number,
  sort: CollectionSort,
) => {
  const { data, error } = await getClient().query({
    query: GetCollectionsDocument,
    variables: {
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      sort,
      filter,
    },
    context: { skipAuth: true },
  });

  if (!data || error) {
    throw new Error(error?.message ?? 'Failed to fetch');
  }

  return data;
};

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
  const collections = collectionsData.getCollections.nodes;
  const pageInfo = collectionsData.getCollections.pageInfo;

  return (
    <div className="lg:grid lg:grid-cols-[calc(var(--spacing)*72)_1fr] gap-6 container py-10">
      <aside className="p-3 rounded-lg border lg:flex flex-col h-fit gap-4 hidden">
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
              <Button className="lg:hidden" variant="outline">
                Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent className="lg:hidden">
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
        <CollectionsGrid collections={collections} />
        <Paginator
          className="mt-auto"
          currentPage={page}
          totalPages={Math.ceil(pageInfo.totalCount / PAGE_SIZE)}
          showNextPrev
        />
      </div>
    </div>
  );
};

export default Page;
