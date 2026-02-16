import { FilmPage } from '@/views/film';
import { getCurrentUser } from '@entities/user/server';
import { getFilm, getFilms } from '@entities/film/server';
import { fetchMovieUser } from '@entities/movie-user/server';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const generateStaticParams = async () => {
  const data = await getFilms();

  return data.nodes.map((film) => ({
    id: film.id,
  }));
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

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const [film, movieUser] = await Promise.all([
    getFilm(id),
    user ? fetchMovieUser(user.id, id) : null,
  ]);

  return <FilmPage film={film} movieUser={movieUser} user={user} />;
};

export default Page;
