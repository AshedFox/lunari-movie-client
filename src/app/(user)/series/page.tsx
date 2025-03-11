import { getClient } from '@lib/apollo/rsc-client';
import {
  GetAllGenresDocument,
  GetCountriesDocument,
  GetFilterInitStudiosDocument,
  GetSeriesListDocument,
  SeriesFilter,
  SeriesSort,
  SortDirectionEnum,
} from '@lib/graphql/generated/graphql';
import { pageSchema } from '@lib/validation/page-schema';
import { Paginator } from '@components/common/Paginator';
import {
  parseSearchToFilter,
  MoviesFilters,
  parseSearchToSort,
} from '@components/movie/filter';
import { sortSchema, MoviesSort } from '@components/movie/sort';
import { filterSchema } from '@components/movie/filter/validation';
import SeriesGrid from './_components/SeriesGrid';
import { PAGE_SIZE } from './_constants';

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const getSeriesList = async (
  filter: SeriesFilter,
  page: number,
  sort: SeriesSort,
) => {
  return getClient().query({
    query: GetSeriesListDocument,
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

  const moviesPromise = getSeriesList(
    parseSearchToFilter(filter, 'series'),
    page,
    parseSearchToSort(sort, 'series'),
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

  const pageInfo = moviesData.getManySeries.pageInfo;
  const movies = moviesData.getManySeries.nodes;

  return (
    <div className="grid grid-cols-[calc(var(--spacing)*72)_1fr] gap-6 container py-10">
      <aside className="p-3 rounded-lg border flex flex-col h-fit gap-4">
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
        <MoviesSort currentSort={sort} />
        <SeriesGrid movies={movies} />
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
