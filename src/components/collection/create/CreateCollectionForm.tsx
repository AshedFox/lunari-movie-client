'use client';

import { ImageInput } from '@components/common/image-input';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { useForm } from 'react-hook-form';
import { createCollection } from './actions';
import { toast } from 'sonner';
import { AsyncMultiSelect } from '@components/ui/multi-select';
import { GetMoviesDocument } from '@lib/graphql/generated/graphql';
import { useLazyQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { createCollectionSchema } from './validation';

type Input = {
  name: string;
  description?: string;
  cover?: {
    id: string;
    url: string;
  };
  movies: { label: string; value: string }[];
};

export const CreateCollectionForm = () => {
  const form = useForm<Input>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      name: '',
      movies: [],
    },
  });
  const router = useRouter();
  const [getMovies, { data: moviesData }] = useLazyQuery(GetMoviesDocument, {
    errorPolicy: 'all',
    context: {
      skipAuth: true,
    },
  });
  const moviesOptions = useMemo(
    () =>
      (moviesData?.getMoviesOffset?.nodes ?? []).map((movie) => ({
        value: movie.id,
        label: movie.title,
      })),
    [moviesData],
  );

  const onSubmit = (input: Input) => {
    toast.promise(
      async () => {
        const { data, error } = await createCollection({
          coverId: input.cover?.id,
          description: input.description,
          name: input.name,
          moviesIds: input.movies.map((m) => m.value),
        });

        if (!data || error) {
          throw new Error(error);
        }

        return { data };
      },
      {
        loading: 'Loading...',
        success: ({ data }) => {
          form.reset({ movies: [], name: '' });
          router.push(`/collections/${data.createCollection.id}`);
          return 'Successfully created collection';
        },
        error: (e) => {
          form.setError('root', { type: 'validate', message: e.message });
          return e.message;
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover</FormLabel>
              <FormControl>
                <ImageInput
                  onChange={(v) => {
                    form.setValue('cover', v ?? undefined, {
                      shouldDirty: true,
                    });
                  }}
                  variant="cover"
                  disabled={field.disabled}
                  value={field.value}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="movies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <AsyncMultiSelect
                  value={field.value}
                  placeholder={'Search movies...'}
                  noFoundMessage={'No movies found.'}
                  noSelectMessage={'No movies selected.'}
                  options={moviesOptions}
                  onChange={field.onChange}
                  onSearch={async (search) => {
                    await getMovies({
                      variables: {
                        limit: 20,
                        offset: 0,
                        filter: { title: { ilike: search } },
                      },
                    });
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};
