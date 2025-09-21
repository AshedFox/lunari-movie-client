'use client';

import { useQuery } from '@apollo/client/react';
import { MovieListItem } from '@components/movie/list-item';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { ScrollArea, ScrollBar } from '@components/ui/scroll-area';
import {
  FilmListItemFragment,
  GetMoviesDocument,
  SeriesListItemFragment,
} from '@lib/graphql/generated/graphql';
import { Plus, X } from 'lucide-react';
import { useMemo, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { addCollectionMovie, deleteCollectionMovie } from './actions';

type Movie = FilmListItemFragment | SeriesListItemFragment;

type Props = {
  collectionId: number;
  movies: Movie[];
};

export const MovieListEditor = ({
  movies: initMovies,
  collectionId,
}: Props) => {
  const [movies, setMovies] = useState<Movie[]>(initMovies);
  const [search, setSearch] = useState<string>('');
  const { data, refetch: getMovies } = useQuery(GetMoviesDocument, {
    variables: { limit: 20, offset: 0 },
  });
  const [isPending, startTransition] = useTransition();

  const searchMovies = useMemo(
    () =>
      data
        ? data.getMoviesOffset.nodes.reduce((result, movie) => {
            if (!movies.some((m) => m.id === movie.id)) {
              result.push(movie);
            }
            return result;
          }, [] as Movie[])
        : [],
    [data, movies],
  );

  const handleRemove = (id: string) => {
    startTransition(() => {
      toast.promise(
        async () => {
          const { data, error } = await deleteCollectionMovie(collectionId, id);

          if (!data || error) {
            throw new Error(error);
          }

          setMovies((prev) => prev.filter((m) => m.id !== id));
        },
        {
          loading: 'Loading...',
          error: (e) => e.message,
          success: 'Successfully removed movie from collection.',
        },
      );
    });
  };

  const handleAdd = (movie: Movie) => {
    if (!movies.some((m) => m.id === movie.id)) {
      startTransition(() => {
        toast.promise(
          async () => {
            const { data, error } = await addCollectionMovie(
              collectionId,
              movie.id,
            );

            if (!data || error) {
              throw new Error(error);
            }

            setMovies((prev) => [...prev, movie]);
          },
          {
            loading: 'Loading...',
            error: (e) => e.message,
            success: 'Successfully added movie to collection.',
          },
        );
      });
    }
  };

  const handleSearch = () => {
    getMovies({
      filter: { title: { ilike: search } },
      limit: 20,
      offset: 0,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Movies</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              Add
              <Plus size={16} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[80%]!">
            <DialogHeader>
              <DialogTitle>Add movies</DialogTitle>
              <DialogDescription>
                Search for movies to add them to the collection
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
              </div>
              {searchMovies.length === 0 ? (
                <div className="flex justify-center items-center text-muted-foreground p-10">
                  Nothing here...
                </div>
              ) : (
                <ScrollArea className="max-h-96">
                  <div className="space-y-2 px-4">
                    {searchMovies.map((movie) => (
                      <div
                        className="grid grid-cols-[1fr_auto] gap-1"
                        key={movie.id}
                      >
                        <MovieListItem movie={movie} />
                        <Button
                          size="icon"
                          className="h-full"
                          variant="secondary"
                          disabled={isPending}
                          onClick={() => handleAdd(movie)}
                        >
                          <Plus />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {movies.length === 0 ? (
        <div className="text-muted-foreground text-sm">Nothing here...</div>
      ) : (
        <div className="space-y-3">
          {movies.map((movie) => (
            <div className="grid grid-cols-[1fr_auto] gap-1" key={movie.id}>
              <MovieListItem movie={movie} />
              <Button
                size="icon"
                className="h-full"
                variant="destructive"
                disabled={isPending}
                onClick={() => handleRemove(movie.id)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
