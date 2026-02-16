import { getCurrentUser } from '@entities/user/server';
import { fetchMovieUser } from '@entities/movie-user/server';
import { getOneSeries, getSeriesList } from '@entities/series/server';
import { Metadata } from 'next';
import { SeriesPage } from '@/views/series';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const generateStaticParams = async () => {
  const data = await getSeriesList();

  return data.nodes.map((series) => ({
    id: series.id,
  }));
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

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const [series, movieUser] = await Promise.all([
    getOneSeries(id),
    user ? fetchMovieUser(user.id, id) : null,
  ]);

  return <SeriesPage series={series} movieUser={movieUser} user={user} />;
};

export default Page;
