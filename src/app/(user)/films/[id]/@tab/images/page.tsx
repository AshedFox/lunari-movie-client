import { ScrollBar } from '@shared/ui/scroll-area';
import { PreloadQuery } from '@shared/api/apollo/server';
import { ScrollArea } from '@shared/ui/scroll-area';
import { GetMovieImagesDocument } from '@shared/api/graphql/graphql';
import { MovieImagesList } from '@widgets/movie-image-list';

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
        query={GetMovieImagesDocument}
        variables={{ movieId: id, limit: 30, offset: 0 }}
      >
        {(queryRef) => (
          <ScrollArea>
            <MovieImagesList queryRef={queryRef} movieId={id} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </PreloadQuery>
    </div>
  );
};

export default Page;
