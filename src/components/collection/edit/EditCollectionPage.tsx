'use client';

import { Button, buttonVariants } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { ImageInput } from '@components/common/image-input';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { CollectionFragment } from '@lib/graphql/generated/graphql';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateCollection } from './actions';
import { ArrowLeft, ArrowRight, Pencil } from 'lucide-react';
import Link from 'next/link';
import { DeleteCollectionDialog } from '../delete';
import { MovieListEditor } from '@components/collection-movie/editor';
import { editCollectionSchema } from './validation';

type Props = {
  collection: CollectionFragment;
};

type Input = {
  name: string;
  description?: string;
  cover?: {
    id: string;
    url: string;
  };
};

export const EditCollectionPage = ({ collection }: Props) => {
  const form = useForm<Input>({
    resolver: zodResolver(editCollectionSchema),
    defaultValues: {
      name: collection.name,
      description: collection.description || undefined,
      cover: collection.cover || undefined,
    },
  });
  const router = useRouter();

  const onSubmit = (input: Input) => {
    toast.promise(
      async () => {
        const { data, error } = await updateCollection(Number(collection.id), {
          coverId: input.cover?.id,
          description: input.description,
          name: input.name,
        });

        if (!data || error) {
          throw new Error(error);
        }

        return { data };
      },
      {
        loading: 'Loading...',
        success: () => {
          form.reset(input);
          router.refresh();
          return 'Successfully updated collection';
        },
        error: (e) => {
          form.setError('root', { type: 'validate', message: e.message });
          return e.message;
        },
      },
    );
  };

  return (
    <div className="container py-10 space-y-8">
      <div className="flex items-center gap-2 justify-between">
        <Link
          href={`/collections/${collection.id}`}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ArrowLeft />
          Back to Collection
        </Link>
        <h1 className="text-3xl font-bold">
          Edit Collection
          {form.formState.isDirty && <span className="text-yellow-500">*</span>}
        </h1>
        <Link
          href={`/users/me/collections`}
          className={buttonVariants({ variant: 'outline' })}
        >
          All My Collections
          <ArrowRight />
        </Link>
      </div>
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
          <div className="flex gap-4 items-center">
            <Button
              variant="secondary"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
              type="submit"
            >
              <Pencil />
              Save changes
            </Button>
            <DeleteCollectionDialog
              collectionId={Number(collection.id)}
              redirect="/users/me/collections"
            />
          </div>
        </form>
      </Form>
      <div className="space-y-4">
        <MovieListEditor
          collectionId={Number(collection.id)}
          movies={collection.movies}
        />
      </div>
    </div>
  );
};
