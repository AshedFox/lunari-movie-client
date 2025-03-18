'use client';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import {
  isDASHProvider,
  MediaPlayer,
  MediaProvider,
  MediaProviderAdapter,
  Poster,
  Track,
} from '@vidstack/react';
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';
import QualitySubmenu from './QualitySubmenu';

type Props = {
  className?: string;
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  subtitles?: {
    lang: string;
    label: string;
    src: string;
  }[];
};

function onProviderChange(provider: MediaProviderAdapter | null) {
  if (isDASHProvider(provider)) {
    provider.library = () => import('dashjs');
  }
}

const VideoPlayer = ({
  className,
  videoUrl = '',
  title,
  posterUrl = '',
  subtitles = [],
}: Props) => {
  return (
    <MediaPlayer
      className={className}
      onProviderChange={onProviderChange}
      src={videoUrl}
      title={title}
    >
      <MediaProvider>
        {posterUrl && <Poster className="vds-poster" src={posterUrl} />}
        {subtitles.map((track) => (
          <Track kind="subtitles" key={track.src} {...track} />
        ))}
      </MediaProvider>
      <DefaultVideoLayout
        icons={defaultLayoutIcons}
        slots={{
          beforeSettingsMenu: <QualitySubmenu />,
        }}
      />
    </MediaPlayer>
  );
};

export { VideoPlayer };
