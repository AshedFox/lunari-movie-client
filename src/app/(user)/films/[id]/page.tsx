import { FilmPage } from '@components/film/page';
import { getClient } from '@lib/apollo/rsc-client';
import { FilmFragment, GetFilmDocument } from '@lib/graphql/generated/graphql';
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
  const filmPromise = getFilm(id);

  const [film] = await Promise.all([filmPromise]);

  return <FilmPage film={film} />;
};

export default Page;
