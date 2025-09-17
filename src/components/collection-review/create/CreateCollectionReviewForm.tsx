'use client';

import { Button } from '@components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createMovieReview } from './actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Textarea } from '@components/ui/textarea';
import { Rating } from '@components/ui/rating';
import { collectionReviewSchema } from './validation';

type Input = z.infer<typeof collectionReviewSchema>;

const CreateCollectionReviewForm = ({
  collectionId,
}: {
  collectionId: number;
}) => {
  const form = useForm<Input>({
    resolver: zodResolver(collectionReviewSchema),
    defaultValues: {
      text: '',
      mark: 1,
    },
  });
  const router = useRouter();

  const onSubmit = async (input: Input) => {
    const { error } = await createMovieReview({
      ...input,
      collectionId,
    });

    if (error) {
      toast.error('Failed to create review');
    } else {
      router.refresh();
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

export { CreateCollectionReviewForm };
