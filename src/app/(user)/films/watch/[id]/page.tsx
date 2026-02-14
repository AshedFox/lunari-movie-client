import { VideoPlayer } from '@components/common/video-player';
import { getCurrentUser } from '@services/user.service';
import { getFilm, getWatchFilm } from '@services/film.service';
import { hasPurchase } from '@services/purchase.service';
import { hasActiveSubscription } from '@services/subscription.service';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

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
  const { id } = await params;

  const [film, user] = await Promise.all([getWatchFilm(id), getCurrentUser()]);

  if (!film.video) {
    notFound();
  }

  if (!user) {
    redirect(`/login?from=/films/watch/${id}`);
  }

  const [userHasPurchase, userHasSubscription] = await Promise.all([
    hasPurchase(id),
    hasActiveSubscription(),
  ]);

  if (!userHasPurchase && !userHasSubscription) {
    redirect(`/subscribe?from=/films/watch/${id}`);
  }

  return (
    <div className="container py-10 overflow-hidden flex items-center justify-center">
      <VideoPlayer
        className="max-w-220"
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
