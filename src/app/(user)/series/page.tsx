import { pageSchema } from '@shared/lib/zod/page-schema';
import { Paginator } from '@features/pagination/ui/Paginator';
import { parseSearchToFilter, MoviesFilters } from '@features/filter-movies';
import {
  movieSortSchema,
  MoviesSort,
  parseSearchToSort,
} from '@features/sort-movies';
import { filterSchema } from '@features/filter-movies/model/validation';
import { Button } from '@shared/ui/button';
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from '@shared/ui/drawer';
import { getSeriesList } from '@entities/series/api/server';
import { getCountries } from '@entities/country/api/server';
import { getGenres } from '@entities/genre/api/server';
import { getAllStudios } from '@entities/studio/server';
import { MoviesGrid } from '@entities/movie';
import { DEFAULT_PAGE_SIZE } from '@entities/series';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const search = await searchParams;
  const filter = filterSchema.parse(search);
  const page = pageSchema.parse(search.page);
  const sort = movieSortSchema.parse(search.sort);

  const [moviesData, countries, genres, initStudios] = await Promise.all([
    getSeriesList(
      parseSearchToFilter(filter, 'series'),
      page,
      parseSearchToSort(sort, 'series'),
    ),
    getCountries(),
    getGenres(),
    filter.studios.length > 0
      ? getAllStudios({ id: { in: filter.studios } })
      : undefined,
  ]);

  return (
    <div className="@container">
      <div className="@xl:grid @xl:grid-cols-[calc(var(--spacing)*72)_1fr] gap-6 container py-10">
        <aside className="p-3 rounded-lg border @xl:flex flex-col h-fit gap-4 hidden">
          <h2 className="text-xl font-semibold">
            Filters
            <span className="text-xs text-muted-foreground">
              ({moviesData.pageInfo.totalCount})
            </span>
          </h2>
          <MoviesFilters
            countries={countries}
            genres={genres}
            formInit={{
              ...filter,
              studios: (initStudios ?? []).map((v) => ({
                value: v.id,
                label: v.name,
              })),
            }}
          />
        </aside>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button className="@xl:hidden" variant="outline">
                  Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle asChild>
                    <h2 className="text-xl font-semibold">
                      Filters
                      <span className="text-xs text-muted-foreground">
                        ({moviesData.pageInfo.totalCount})
                      </span>
                    </h2>
                  </DrawerTitle>
                </DrawerHeader>
                <div className="px-4">
                  <MoviesFilters
                    countries={countries}
                    genres={genres}
                    formInit={{
                      ...filter,
                      studios: (initStudios ?? []).map((v) => ({
                        value: v.id,
                        label: v.name,
                      })),
                    }}
                  />
                </div>
              </DrawerContent>
            </Drawer>
            <MoviesSort currentSort={sort} />
          </div>
          <MoviesGrid movies={moviesData.nodes} />
          <Paginator
            className="mt-auto"
            currentPage={page}
            totalPages={Math.ceil(
              moviesData.pageInfo.totalCount / DEFAULT_PAGE_SIZE,
            )}
            showNextPrev
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
