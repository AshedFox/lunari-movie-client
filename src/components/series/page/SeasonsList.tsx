import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion';
import { SeriesFragment } from '@lib/graphql/generated/graphql';
import { formatDateTime, formatDateTimeRange } from '@lib/utils/format';
import { Calendar, List, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@lib/utils';
import { Badge } from '@components/ui/badge';
import { ScrollArea } from '@components/ui/scroll-area';

type Props = {
  seasons: SeriesFragment['paginatedSeasons']['nodes'];
  episodes: SeriesFragment['paginatedEpisodes']['nodes'];
};

const SeasonsList = ({ seasons, episodes }: Props) => {
  const episodesBySeason = episodes.reduce(
    (acc, episode) => {
      const seasonId = episode.seasonId;
      if (!seasonId) {
        return acc;
      }
      if (!acc[seasonId]) {
        acc[seasonId] = [];
      }
      acc[seasonId].push(episode);
      return acc;
    },
    {} as Record<string, SeriesFragment['paginatedEpisodes']['nodes']>,
  );

  return (
    <div className="border rounded-lg p-6 space-y-4 bg-card/40 backdrop-blur-sm">
      <h2 className="flex items-center gap-2 font-bold text-xl">
        <List className="h-5 w-5" />
        <span>Seasons ({seasons.length})</span>
      </h2>

      {seasons.length === 0 ? (
        <div className="text-center text-muted-foreground text-sm italic">
          No seasons available for this series yet.
        </div>
      ) : (
        <Accordion type="single" collapsible>
          {seasons.map((season) => (
            <AccordionItem key={season.id} value={season.id}>
              <AccordionTrigger className="hover:bg-secondary/30 px-6 py-4 hover:no-underline transition-colors data-[state=open]:bg-secondary/20 data-[state=open]:hover:bg-secondary/30">
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center justify-center h-12 w-12 rounded-full bg-secondary text-secondary-foreground font-bold text-lg shrink-0">
                    {season.numberInSeries}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">
                      {season.title || `Season ${season.numberInSeries}`}
                    </h3>
                    <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-3">
                      <Badge variant="secondary">
                        <List />
                        {season.episodesCount} episodes
                      </Badge>
                      {season.startReleaseDate && (
                        <Badge variant="secondary">
                          <Calendar />
                          {formatDateTimeRange(
                            season.startReleaseDate,
                            season.endReleaseDate,
                          )}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 pb-0">
                <div className="px-6 py-4 border-b">
                  {season.description ? (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {season.description}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No description available for this season.
                    </p>
                  )}
                </div>
                {(episodesBySeason[season.id] ?? []).length === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-sm italic">
                    No episodes available for this season yet.
                  </div>
                ) : (
                  <ScrollArea className="px-1 max-h-[400px] flex flex-col">
                    <div className="divide-y py-1 space-y-1">
                      {episodesBySeason[season.id].map((episode) => {
                        const Comp = episode.videoId ? Link : 'div';
                        const hasVideo = !!episode.videoId;

                        return (
                          <Comp
                            key={episode.id}
                            href={
                              hasVideo ? `/series/watch/${episode.id}` : '#'
                            }
                            className={cn(
                              'flex items-start gap-4 p-4 transition-all',
                              {
                                'hover:bg-secondary/20 cursor-pointer group':
                                  hasVideo,
                                'opacity-70': !hasVideo,
                              },
                            )}
                          >
                            {/* Episode cover */}
                            <div className="shrink-0 relative h-24 aspect-video rounded-md overflow-hidden bg-secondary/40">
                              {episode.cover ? (
                                <Image
                                  src={episode.cover.url}
                                  alt={
                                    episode.title ||
                                    `Episode ${episode.numberInSeason}`
                                  }
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100px, 150px"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground bg-secondary">
                                  <span className="text-xs">No Cover</span>
                                </div>
                              )}
                            </div>

                            <div className="flex-1 space-y-1.5 min-w-0 py-1">
                              {/* Heading */}
                              <div className="flex gap-3 items-center">
                                <Badge variant="outline">
                                  EP {episode.numberInSeason}
                                </Badge>
                                <h4
                                  className={cn(
                                    'font-medium truncate text-base',
                                    hasVideo &&
                                      'group-hover:text-primary transition-colors',
                                  )}
                                >
                                  {episode.title ||
                                    `Episode ${episode.numberInSeason}`}
                                </h4>
                              </div>

                              {/* Description */}
                              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                {episode.description ||
                                  'No description available.'}
                              </p>

                              {/* Release date */}
                              {episode.releaseDate && (
                                <Badge variant="secondary">
                                  <Calendar />
                                  {formatDateTime(episode.releaseDate)}
                                </Badge>
                              )}
                            </div>

                            <div className="self-center text-muted-foreground group-hover:text-primary transition-colors duration-300">
                              <Play className="w-6 h-6" />
                            </div>
                          </Comp>
                        );
                      })}
                    </div>
                  </ScrollArea>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export { SeasonsList };
