import { getClient } from '@lib/apollo/rsc-client';
import { FilmFragment, GetFilmDocument } from '@lib/graphql/generated/graphql';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const getFilm = async (id: string): Promise<FilmFragment> => {
  const { data } = await getClient().query({
    query: GetFilmDocument,
    variables: {
      id,
    },
  });

  return data.getFilm;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const film = await getFilm(id);

  return (
    <div className="space-y-4">
      {/* Description */}
      {film.description && (
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-muted-foreground text-sm">{film.description}</p>
        </div>
      )}

      {/* Extra info */}
      <div className="grid grid-cols-2 gap-3">
        {/* Studios */}
        {film.studios.length > 0 && (
          <div>
            <span className="font-semibold">Studios: </span>
            <span className="text-muted-foreground text-sm">
              {film.studios.map((studio) => studio.name).join(', ')}
            </span>
          </div>
        )}

        {/* Countries */}
        {film.countries.length > 0 && (
          <div>
            <span className="font-semibold">Countries: </span>
            <span className="text-muted-foreground text-sm">
              {film.countries.map((country) => country.name).join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
