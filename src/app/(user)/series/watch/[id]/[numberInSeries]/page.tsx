import { VideoPlayer } from '@components/common/video-player';
import { buttonVariants } from '@components/ui/button';
import { getClient } from '@lib/apollo/rsc-client';
import { getUser } from '@lib/auth/user-dal';
import {
  GetWatchEpisodeDocument,
  HasActiveSubscriptionDocument,
  HasPurchaseDocument,
  WatchEpisodeFragment,
} from '@lib/graphql/generated/graphql';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

const getEpisode = async (
  id: string,
  numberInSeries: number,
): Promise<WatchEpisodeFragment> => {
  const { data } = await getClient().query({
    query: GetWatchEpisodeDocument,
    variables: {
      seriesId: id,
      numberInSeries,
    },
    errorPolicy: 'all',
  });

  if (!data) {
    notFound();
  }

  return data.getEpisodeBySeriesAndNum;
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
    numberInSeries: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id, numberInSeries } = await params;
  const episode = await getEpisode(id, Number(numberInSeries));

  const title = `"${episode.series.title}" - ${episode.title ?? `Episode #${episode.numberInSeries}`}`;

  return {
    title: `Watch ${title}`,
  };
};

const Page = async ({ params }: Props) => {
  const { id, numberInSeries } = await params;
  const episode = await getEpisode(id, Number(numberInSeries));
  const user = await getUser();

  if (!user) {
    redirect(`/login?from=/series/watch/${id}/${numberInSeries}`);
  }

  if (!episode.video) {
    notFound();
  }

  const hasSubscriptionPromise = userHasSubscription();
  const hasPurchasePromise = userHasPurchase(episode.series.id);

  const [hasPurchase, hasSubscription] = await Promise.all([
    hasPurchasePromise,
    hasSubscriptionPromise,
  ]);

  if (!hasPurchase && !hasSubscription) {
    redirect(`/subsribe?from=/series/watch/${id}/${numberInSeries}`);
  }

  const title = `"${episode.series.title}" - ${episode.title ?? `Episode #${episode.numberInSeries}`}`;

  return (
    <div className="container py-10 overflow-hidden flex flex-col items-center justify-center gap-2">
      <VideoPlayer
        className="max-w-200"
        videoUrl={episode.video?.dashManifestMedia?.url}
        posterUrl={episode.cover?.url ?? episode.series.cover?.url}
        title={title}
        subtitles={episode.video?.subtitles.map((s) => ({
          src: s.file.url,
          label: s.language.name,
          lang: s.language.id,
        }))}
      />
      <div className="space-y-3 self-start">
        <div className="font-semibold">Episodes:</div>
        <div className="flex flex-wrap gap-3 self-start">
          {Array(episode.series.episodesCount)
            .fill(0)
            .map((_, i) => (
              <Link
                key={i}
                className={buttonVariants({
                  variant:
                    i + 1 === episode.numberInSeries ? 'secondary' : 'outline',
                  className: {
                    'pointer-events-none opacity-50':
                      i + 1 === episode.numberInSeries,
                  },
                })}
                href={`/series/watch/${id}/${i + 1}`}
              >
                #{i + 1}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
