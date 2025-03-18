import { SeriesPage } from '@components/series/page';
import { getClient } from '@lib/apollo/rsc-client';
import { getUser } from '@lib/auth/user-dal';
import {
  GetMovieUserDocument,
  GetOneSeriesDocument,
  MovieUserFragment,
  SeriesFragment,
} from '@lib/graphql/generated/graphql';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const getOneSeries = async (id: string): Promise<SeriesFragment> => {
  const { data } = await getClient().query({
    query: GetOneSeriesDocument,
    variables: {
      id,
    },
  });

  return data.getOneSeries;
};

const getMovieUser = async (
  userId: string,
  movieId: string,
): Promise<MovieUserFragment | null> => {
  const { data } = await getClient().query({
    query: GetMovieUserDocument,
    variables: {
      movieId,
      userId,
    },
    errorPolicy: 'all',
  });

  return data?.getMovieUser ?? null;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const series = await getOneSeries(id);

  return {
    title: series.title,
    description: series.description,
  };
};

const Default = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getUser();
  const seriesPromise = getOneSeries(id);
  const movieUserPromise = user ? getMovieUser(user.id, id) : null;

  const [series, movieUser] = await Promise.all([
    seriesPromise,
    movieUserPromise,
  ]);

  return <SeriesPage series={series} movieUser={movieUser} user={user} />;
};

export default Default;
