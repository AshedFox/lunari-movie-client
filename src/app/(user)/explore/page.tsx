import { getClient } from '@lib/apollo/rsc-client';
import {
  GetAllGenresDocument,
  GetCountriesDocument,
  GetFilterInitStudiosDocument,
  GetMoviesDocument,
  MovieFilter,
  MovieSort,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';
import { Paginator } from '@components/common/Paginator';
import { parseSearchToFilter, MoviesFilters } from '@components/movie/filter';
import {
  sortSchema,
  MoviesSort,
  parseSearchToSort,
} from '@components/movie/sort';
import { filterSchema } from '@components/movie/filter/validation';
import MoviesGrid from './_components/MoviesGrid';
import { PAGE_SIZE } from './_constants';
import { pageSchema } from '@lib/validation/page-schema';
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  Drawer,
} from '@components/ui/drawer';
import { Button } from '@components/ui/button';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const getMovies = async (
  filter: MovieFilter,
  page: number,
  sort: MovieSort,
) => {
  return getClient().query({
    query: GetMoviesDocument,
    variables: {
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      sort,
      filter,
    },
    context: { skipAuth: true },
  });
};

const getCountries = async () => {
  return getClient().query({
    query: GetCountriesDocument,
    variables: {
      sort: {
        name: {
          direction: SortDirectionEnum.ASC,
        },
      },
    },
    context: { skipAuth: true },
  });
};

const getGenres = async () => {
  return getClient().query({
    query: GetAllGenresDocument,
    variables: {
      sort: {
        name: {
          direction: SortDirectionEnum.ASC,
        },
      },
    },
    context: { skipAuth: true },
  });
};

const getInitStudios = async (ids: string[]) => {
  return getClient().query({
    query: GetFilterInitStudiosDocument,
    variables: {
      in: ids,
    },
    context: {
      skipAuth: true,
    },
  });
};

const Page = async ({ searchParams }: Props) => {
  const search = await searchParams;
  const filter = filterSchema.parse(search);
  const page = pageSchema.parse(search.page);
  const sort = sortSchema.parse(search.sort);

  const moviesPromise = getMovies(
    parseSearchToFilter(filter),
    page,
    parseSearchToSort(sort),
  );
  const countriesPromise = getCountries();
  const genresPromise = getGenres();
  const initStudiosPromise =
    filter.studios.length > 0
      ? getInitStudios(filter.studios)
      : { data: undefined };

  const [
    { data: moviesData },
    { data: countriesData },
    { data: genresData },
    { data: initStudiosData },
  ] = await Promise.all([
    moviesPromise,
    countriesPromise,
    genresPromise,
    initStudiosPromise,
  ]);

  const pageInfo = moviesData.getMoviesOffset.pageInfo;
  const movies = moviesData.getMoviesOffset.nodes;

  return (
    <div className="lg:grid lg:grid-cols-[calc(var(--spacing)*72)_1fr] gap-6 container py-10">
      <aside className="p-3 rounded-lg border lg:flex flex-col h-fit gap-4 hidden">
        <h2 className="text-xl font-semibold">
          Filters
          <span className="text-xs text-muted-foreground">
            ({pageInfo.totalCount})
          </span>
        </h2>
        <MoviesFilters
          countries={countriesData.getAllCountries}
          genres={genresData.getAllGenres}
          formInit={{
            ...filter,
            studios: (initStudiosData?.getAllStudios ?? []).map((v) => ({
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
              <Button className="lg:hidden" variant="outline">
                Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent>
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
                <MoviesFilters
                  countries={countriesData.getAllCountries}
                  genres={genresData.getAllGenres}
                  formInit={{
                    ...filter,
                    studios: (initStudiosData?.getAllStudios ?? []).map(
                      (v) => ({
                        value: v.id,
                        label: v.name,
                      }),
                    ),
                  }}
                />
              </div>
            </DrawerContent>
          </Drawer>
          <MoviesSort currentSort={sort} />
        </div>
        <MoviesGrid movies={movies} />
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
