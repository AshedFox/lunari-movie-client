import { FilmPage } from '@components/film/page';
import { getClient } from '@lib/apollo/rsc-client';
import { getUser } from '@lib/auth/user-dal';
import {
  FilmFragment,
  GetFilmDocument,
  GetMovieUserDocument,
  MovieUserFragment,
} from '@lib/graphql/generated/graphql';
import { Metadata } from 'next';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 60;

const getFilm = async (id: string): Promise<FilmFragment> => {
  const { data } = await getClient().query({
    query: GetFilmDocument,
    variables: {
      id,
    },
  });

  return data.getFilm;
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
  const film = await getFilm(id);

  return {
    title: film.title,
    description: film.description,
  };
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const user = await getUser();
  const filmPromise = getFilm(id);
  const movieUserPromise = user ? getMovieUser(user.id, id) : null;

  const [film, movieUser] = await Promise.all([filmPromise, movieUserPromise]);

  return <FilmPage film={film} movieUser={movieUser} user={user} />;
};

export default Page;
