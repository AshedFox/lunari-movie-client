'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../model';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form';
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';
import { z } from 'zod';
import { toast } from 'sonner';
import { resetPasswordAction } from '../api/actions';
import { useRouter } from 'next/navigation';

type Props = {
  token: string;
};

export const ResetPasswordForm = ({ token }: Props) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (input: z.infer<typeof resetPasswordSchema>) => {
    toast.promise(
      resetPasswordAction({
        newPassword: input.newPassword,
        token,
      }),
      {
        loading: 'Resetting password...',
        error: (e) => {
          const message =
            e instanceof Error ? e.message : 'Something went wrong';
          form.setError('root', { type: 'validate', message });
          return { message: 'Failed to reset password', description: message };
        },
        success: () => {
          router.push(`/login`);
          return 'Password reset successfully';
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-bold">Reset password</h2>
          <FormDescription>
            Now you can set new account password
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.message && (
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        )}
        <Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
