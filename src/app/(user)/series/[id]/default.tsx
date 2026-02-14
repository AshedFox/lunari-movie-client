import { SeriesPage } from '@components/series/page';
import { fetchMovieUser } from '@services/movie-user.service';
import { getOneSeries } from '@services/series.service';
import { getCurrentUser } from '@services/user.service';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    id: string;
  }>;
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
  const user = await getCurrentUser();

  const [series, movieUser] = await Promise.all([
    getOneSeries(id),
    user ? fetchMovieUser(user.id, id) : null,
  ]);

  return <SeriesPage series={series} movieUser={movieUser} user={user} />;
};

export default Default;
