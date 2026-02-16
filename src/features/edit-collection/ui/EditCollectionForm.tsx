'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import z from 'zod';
import { editCollectionSchema } from '../model';
import { ImageInput } from '@features/upload-image';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@shared/ui/form';
import { Input } from '@shared/ui/input';
import { Textarea } from '@shared/ui/textarea';
import { Pencil } from 'lucide-react';
import { updateCollectionAction } from '../api/actions';
import { CollectionFragment } from '@shared/api/graphql/graphql';
import { Form } from '@shared/ui/form';
import { Button } from '@shared/ui/button';
import { useForm } from 'react-hook-form';

type InputType = z.infer<typeof editCollectionSchema>;

export const EditCollectionForm = ({
  collection,
}: {
  collection: CollectionFragment;
}) => {
  const form = useForm<InputType>({
    resolver: zodResolver(editCollectionSchema),
    defaultValues: {
      name: collection.name,
      description: collection.description || undefined,
      cover: collection.cover || undefined,
    },
  });
  const router = useRouter();

  const onSubmit = (input: InputType) => {
    toast.promise(
      updateCollectionAction(Number(collection.id), {
        coverId: input.cover?.id,
        description: input.description,
        name: input.name,
      }),
      {
        loading: 'Loading...',
        success: () => {
          form.reset(input);
          router.refresh();
          return 'Successfully updated collection';
        },
        error: (e) => {
          const message =
            e instanceof Error ? e.message : 'Something went wrong';
          form.setError('root', { type: 'validate', message });
          return message;
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
        <Button
          variant="secondary"
          disabled={!form.formState.isDirty || form.formState.isSubmitting}
          type="submit"
        >
          <Pencil />
          Save changes
        </Button>
      </form>
    </Form>
  );
};
