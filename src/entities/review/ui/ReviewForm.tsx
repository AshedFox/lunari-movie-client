'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReviewSchema, CreateReviewInput } from '../model/validation';
import { Button } from '@shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form';
import { Textarea } from '@shared/ui/textarea';
import { RatingInput } from '@shared/ui/rating-input';
import { Loader2 } from 'lucide-react';

type Props = {
  onSubmit: (data: CreateReviewInput) => Promise<void> | void;
  isSubmitting?: boolean;
};

export const ReviewForm = ({
  onSubmit,
  isSubmitting: externalIsSubmitting,
}: Props) => {
  const form = useForm<CreateReviewInput>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      text: '',
      mark: 0,
    },
  });

  const isSubmitting = externalIsSubmitting || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="mark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <RatingInput
                  value={field.value}
                  onRatingChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts..."
                  className="min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Review
        </Button>
      </form>
    </Form>
  );
};
