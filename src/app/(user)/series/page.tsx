import { pageSchema } from '@lib/validation/page-schema';
import { Paginator } from '@components/common/Paginator';
import { parseSearchToFilter, MoviesFilters } from '@components/movie/filter';
import {
  sortSchema,
  MoviesSort,
  parseSearchToSort,
} from '@components/movie/sort';
import { filterSchema } from '@components/movie/filter/validation';
import { PAGE_SIZE } from './_constants';
import { Button } from '@components/ui/button';
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from '@components/ui/drawer';
import { MoviesGrid } from '@components/movie/grid';
import { getSeriesList } from '@services/series.service';
import { getCountries } from '@services/country.service';
import { getGenres } from '@services/genre.service';
import { getStudiosByIds } from '@services/studio.service';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const Page = async ({ searchParams }: Props) => {
  const search = await searchParams;
  const filter = filterSchema.parse(search);
  const page = pageSchema.parse(search.page);
  const sort = sortSchema.parse(search.sort);

  const [moviesData, countries, genres, initStudios] = await Promise.all([
    getSeriesList(
      parseSearchToFilter(filter, 'series'),
      page,
      parseSearchToSort(sort, 'series'),
    ),
    getCountries(),
    getGenres(),
    filter.studios.length > 0 ? getStudiosByIds(filter.studios) : undefined,
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
            totalPages={Math.ceil(moviesData.pageInfo.totalCount / PAGE_SIZE)}
            showNextPrev
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
