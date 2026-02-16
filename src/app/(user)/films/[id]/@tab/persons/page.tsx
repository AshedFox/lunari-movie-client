import { ScrollBar } from '@shared/ui/scroll-area';
import { PreloadQuery } from '@shared/api/apollo/server';
import { ScrollArea } from '@shared/ui/scroll-area';
import { MoviePersonsList } from '@widgets/movie-persons-list';
import { GetMoviePersonsDocument } from '@shared/api/graphql/graphql';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return (
    <div className="space-y-4">
      <PreloadQuery
        query={GetMoviePersonsDocument}
        variables={{ movieId: id, limit: 20, offset: 0 }}
      >
        {(queryRef) => (
          <ScrollArea>
            <MoviePersonsList queryRef={queryRef} movieId={id} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </PreloadQuery>
    </div>
  );
};

export default Page;
