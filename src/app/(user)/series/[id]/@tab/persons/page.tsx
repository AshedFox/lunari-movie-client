import { ScrollBar } from '@components/ui/scroll-area';
import { PreloadQuery } from '@lib/apollo/rsc-client';
import { GetMoviePersonsDocument } from '@lib/graphql/generated/graphql';
import { ScrollArea } from '@components/ui/scroll-area';
import { MoviePersonsLoadableList } from '@components/movie-person/list';

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
        variables={{ id, limit: 20, offset: 0 }}
      >
        {(queryRef) => (
          <ScrollArea>
            <MoviePersonsLoadableList queryRef={queryRef} movieId={id} />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </PreloadQuery>
    </div>
  );
};

export default Page;
