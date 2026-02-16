import { FilmPage } from '@/views/film';
import { getFilm } from '@entities/film/server';
import { fetchMovieUser } from '@entities/movie-user/server';
import { getCurrentUser } from '@entities/user/server';
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
  const film = await getFilm(id);

  return {
    title: film.title,
    description: film.description,
  };
};

const Default = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const [film, movieUser] = await Promise.all([
    getFilm(id),
    user ? fetchMovieUser(user.id, id) : null,
  ]);

  return <FilmPage film={film} movieUser={movieUser} user={user} />;
};

export default Default;
