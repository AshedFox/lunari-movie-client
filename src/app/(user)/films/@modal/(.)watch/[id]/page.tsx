import NextModal from '@components/common/NextModal';
import { VideoPlayer } from '@components/common/video-player';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';
import { getCurrentUser } from '@services/user.service';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getFilm, getWatchFilm } from '@services/film.service';
import { hasActiveSubscription } from '@services/subscription.service';
import { hasPurchase } from '@services/purchase.service';

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
