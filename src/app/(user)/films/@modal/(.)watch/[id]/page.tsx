import NextModal from '@components/common/NextModal';
import { VideoPlayer } from '@components/common/video-player';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { getClient } from '@lib/apollo/rsc-client';
import { getUser } from '@lib/auth/user-dal';
import {
  GetWatchFilmDocument,
  HasActiveSubscriptionDocument,
  HasPurchaseDocument,
  WatchFilmFragment,
} from '@lib/graphql/generated/graphql';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

const getFilm = async (id: string): Promise<WatchFilmFragment> => {
  const { data, error } = await getClient().query({
    query: GetWatchFilmDocument,
    variables: {
      id,
    },
  });

  if (!data || error) {
    throw new Error(error?.message ?? 'Failed to fetch');
  }

  return data.getFilm;
};

const userHasSubscription = async (): Promise<boolean> => {
  const { data, error } = await getClient().query({
    query: HasActiveSubscriptionDocument,
    errorPolicy: 'all',
  });

  if (!data || error) {
    throw new Error(error?.message ?? 'Failed to fetch');
  }

  return data.hasActiveSubscription;
};

const userHasPurchase = async (id: string): Promise<boolean> => {
  const { data, error } = await getClient().query({
    query: HasPurchaseDocument,
    variables: {
      movieId: id,
    },
    errorPolicy: 'all',
  });

  if (!data || error) {
    throw new Error(error?.message ?? 'Failed to fetch');
  }

  return data.hasPurchase;
};

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
    title: `Watch "${film.title}"`,
  };
};

const Page = async ({ params }: Props) => {
  const { id: id } = await params;
  const film = await getFilm(id);
  const user = await getUser();

  if (!film.video) {
    notFound();
  }

  if (!user) {
    redirect(`/login?from=/films/watch/${id}`);
  }

  const hasSubscriptionPromise = userHasSubscription();
  const hasPurchasePromise = userHasPurchase(id);

  const [hasPurchase, hasSubscription] = await Promise.all([
    hasPurchasePromise,
    hasSubscriptionPromise,
  ]);

  if (!hasPurchase && !hasSubscription) {
    redirect(`/subscribe?from=/films/watch/${id}`);
  }

  return (
    <NextModal>
      <DialogContent className="lg:max-w-240 overflow-hidden">
        <DialogHeader>
          <DialogTitle>Watch</DialogTitle>
          <DialogDescription className="sr-only">
            Watch film {film.title}
          </DialogDescription>
        </DialogHeader>
        <VideoPlayer
          videoUrl={film.video?.dashManifestMedia?.url}
          posterUrl={film.cover?.url}
          title={film.title}
          subtitles={film.video?.subtitles.map((s) => ({
            src: s.file.url,
            label: s.language.name,
            lang: s.language.id,
          }))}
        />
      </DialogContent>
    </NextModal>
  );
};

export default Page;
