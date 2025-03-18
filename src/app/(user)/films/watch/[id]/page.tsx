import { VideoPlayer } from '@components/common/video-player';
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
  const { data } = await getClient().query({
    query: GetWatchFilmDocument,
    variables: {
      id,
    },
  });

  return data.getFilm;
};

const userHasSubscription = async (): Promise<boolean> => {
  const { data } = await getClient().query({
    query: HasActiveSubscriptionDocument,
    errorPolicy: 'all',
  });

  return data.hasActiveSubscription;
};

const userHasPurchase = async (id: string): Promise<boolean> => {
  const { data } = await getClient().query({
    query: HasPurchaseDocument,
    variables: {
      movieId: id,
    },
    errorPolicy: 'all',
  });

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
    <div className="container py-10 overflow-hidden flex items-center justify-center">
      <VideoPlayer
        className="lg:max-w-220"
        videoUrl={film.video?.dashManifestMedia?.url}
        posterUrl={film.cover?.url}
        title={film.title}
        subtitles={film.video?.subtitles.map((s) => ({
          src: s.file.url,
          label: s.language.name,
          lang: s.language.id,
        }))}
      />
    </div>
  );
};

export default Page;
