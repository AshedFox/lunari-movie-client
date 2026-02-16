'use client';

import { Button } from '@shared/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@shared/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Textarea } from '@shared/ui/textarea';
import { Rating } from '@shared/ui/rating';
import { movieReviewSchema } from '../model/validation';
import { createMovieReviewAction } from '../api/actions';

type InputType = z.infer<typeof movieReviewSchema>;

export const CreateMovieReviewForm = ({ movieId }: { movieId: string }) => {
  const form = useForm<InputType>({
    resolver: zodResolver(movieReviewSchema),
    defaultValues: {
      text: '',
      mark: 1,
    },
  });
  const router = useRouter();

  const onSubmit = async (input: InputType) => {
    try {
      await createMovieReviewAction({
        ...input,
        movieId,
      });

      router.refresh();
    } catch {
      toast.error('Failed to create review');
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-64"
                  placeholder="Review text..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mark</FormLabel>
              <FormControl>
                <Rating
                  {...field}
                  onRatingChange={(value) => form.setValue(field.name, value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
