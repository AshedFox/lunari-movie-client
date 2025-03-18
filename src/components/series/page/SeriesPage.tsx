import { Star, Play, Calendar, List, ArrowRight } from 'lucide-react';
import {
  MovieUserFragment,
  SeriesFragment,
  UserProfileFragment,
} from '@lib/graphql/generated/graphql';
import { ISODateToLocale, ISOPeriodToLocale } from '@lib/utils/format';
import Image from 'next/image';
import { MovieListsButtons } from '@components/movie-user/lists-buttons';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@components/ui/accordion';
import Link from 'next/link';
import { cn } from '@lib/utils';

type Props = {
  series: SeriesFragment;
  movieUser: MovieUserFragment | null;
  user: UserProfileFragment | null;
};

const SeriesPage = ({ series, movieUser, user }: Props) => {
  return (
    <div className="space-y-8">
      {/* Cover */}
      {series.cover && (
        <div className="relative w-full aspect-[3/1]">
          <Image
            src={series.cover.url}
            alt="cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b via-transparent via-60% to-background/50" />
        </div>
      )}

      {/* Content */}
      <div className="relative container space-y-6">
        {/* Title */}
        <h1 className="text-5xl font-bold leading-tight">{series.title}</h1>
        <div className="flex flex-wrap items-center gap-6">
          {/* Rating */}
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" fill="currentColor" size={24} />
            <span className="text-2xl font-bold">
              {series.rating === 0 ? '-' : series.rating.toFixed(1)}
            </span>
          </div>

          {/* Release date */}
          {series.startReleaseDate && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm font-semibold">
              <Calendar size={20} />
              <span>
                {ISOPeriodToLocale(
                  series.startReleaseDate,
                  series.endReleaseDate,
                )}
              </span>
            </div>
          )}

          {series.ageRestriction && (
            <span className="px-3 py-1 bg-red-600 text-primary-foreground font-semibold rounded-md text-sm">
              {series.ageRestriction}
            </span>
          )}
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-6">
          {series.genres.map((genre) => (
            <span
              key={genre.id}
              className="bg-secondary text-xs px-3 py-1 rounded-xl"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Buttons */}
        {user && (
          <MovieListsButtons movieUser={movieUser} movieId={series.id} />
        )}

        {/* Seasons */}
        <div className="border rounded-lg p-4 space-y-2">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <List size={20} />
            <span>Seasons ({series.paginatedSeasons.nodes.length})</span>
          </h2>
          <Accordion type="single" collapsible>
            {series.paginatedSeasons.nodes.map((season) => (
              <AccordionItem key={season.id} value={season.id}>
                <AccordionTrigger className="hover:bg-secondary/30 px-4 hover:no-underline">
                  <div className="flex items-center gap-6">
                    <div>{season.numberInSeries}</div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">
                        {season.title || `Season ${season.numberInSeries}`}
                      </h3>
                      <div className="text-xs text-muted-foreground flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <List size={14} />
                          {season.episodesCount} episodes
                        </span>
                        {season.startReleaseDate && (
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {ISOPeriodToLocale(
                              season.startReleaseDate,
                              season.endReleaseDate,
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 py-2">
                  {season.description && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {season.description}
                    </p>
                  )}

                  <div className="space-y-1">
                    {series.paginatedEpisodes.nodes
                      .filter((episode) => episode.seasonId === season.id)
                      .map((episode) => {
                        const Comp = episode.videoId ? Link : 'div';

                        return (
                          <Comp
                            key={episode.id}
                            href={`/series/watch/${episode.id}`}
                            className={cn(
                              'border rounded-md p-3 flex items-center gap-4',
                              {
                                'hover:bg-secondary/20 transition-colors ':
                                  !!episode.videoId,
                              },
                            )}
                          >
                            {/* Episode cover */}
                            <div className="shrink-0 relative h-16 w-28 rounded-md overflow-hidden bg-secondary/40">
                              {episode.cover && (
                                <Image
                                  src={episode.cover.url}
                                  alt={
                                    episode.title ||
                                    `Episode ${episode.numberInSeason}`
                                  }
                                  fill
                                  className="object-cover"
                                />
                              )}
                              <div className="absolute flex h-full w-full items-center justify-center">
                                <Play
                                  size={24}
                                  className="text-muted-foreground"
                                />
                              </div>
                            </div>

                            <div className="flex-1 space-y-1">
                              {/* Heading */}
                              <div className="flex gap-2 items-center">
                                <div>{episode.numberInSeason}</div>
                                <h4 className="font-medium truncate">
                                  {episode.title ||
                                    `Episode ${episode.numberInSeason}`}
                                </h4>
                              </div>

                              {/* Description */}
                              {episode.description && (
                                <div className="text-xs text-muted-foreground">
                                  {episode.description}
                                </div>
                              )}

                              {/* Release date */}
                              {episode.releaseDate && (
                                <div className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                                  <Calendar size={12} />
                                  {ISODateToLocale(episode.releaseDate)}
                                </div>
                              )}
                            </div>

                            {episode.videoId && (
                              <div className="mr-4">
                                <ArrowRight size={20} />
                              </div>
                            )}
                          </Comp>
                        );
                      })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export { SeriesPage };
