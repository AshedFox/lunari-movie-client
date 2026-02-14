import { FilmPage } from '@components/film/page';
import { getFilm } from '@services/film.service';
import { fetchMovieUser } from '@services/movie-user.service';
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
