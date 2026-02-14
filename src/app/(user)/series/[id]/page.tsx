import { SeriesPage } from '@components/series/page';
import { getCurrentUser } from '@services/user.service';
import { fetchMovieUser } from '@services/movie-user.service';
import { getOneSeries, getSeriesList } from '@services/series.service';
import { Metadata } from 'next';

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
