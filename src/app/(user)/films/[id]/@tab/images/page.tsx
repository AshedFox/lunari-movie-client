import { ScrollBar } from '@components/ui/scroll-area';
import { PreloadQuery } from '@lib/apollo/rsc-client';
import { GetMovieImagesDocument } from '@lib/graphql/generated/graphql';
import { ScrollArea } from '@components/ui/scroll-area';
import { MovieImagesLoadableList } from '@components/movie-image/list';

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
            <MovieImagesLoadableList queryRef={queryRef} movieId={id} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </PreloadQuery>
    </div>
  );
};

export default Page;
