'use client';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/audio.css';
import '@vidstack/react/player/styles/default/layouts/video.css';

import {
  isDASHProvider,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderAdapter,
  Poster,
  Track,
  useMediaStore,
} from '@vidstack/react';
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';
import { useRef } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { cn } from '@lib/utils';

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
  const player = useRef<MediaPlayerInstance>(null);
  const { qualities, quality } = useMediaStore(player);

  return (
    <MediaPlayer
      className={className}
      ref={player}
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
          beforeSettingsMenu: (
            <DropdownMenu>
              <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-media-button-hover-bg">
                {quality?.height}p
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {qualities.map((quality) => (
                  <DropdownMenuItem
                    onClick={() => {
                      quality.selected = true;
                    }}
                    className={cn({
                      'pointer-events-none text-primary font-semibold':
                        quality.selected,
                    })}
                    key={quality.id}
                  >
                    {quality.height}p
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        }}
      />
    </MediaPlayer>
  );
};

export default VideoPlayer;
