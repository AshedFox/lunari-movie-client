'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema } from '../_validation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { z } from 'zod';
import { toast } from 'sonner';
import { resetPassword } from '../_actions/reset-password';
import { useRouter } from 'next/navigation';

type Props = {
  token: string;
};

const ResetPasswordForm = ({ token }: Props) => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (input: z.infer<typeof resetPasswordSchema>) => {
    const result = await resetPassword({
      newPassword: input.newPassword,
      token,
    });

    if (result?.error) {
      form.setError('root', { type: 'validate', message: result.error });
      toast.error(result.error);
    } else {
      toast.success('Successfully reset password');
      router.push(`/login`);
    }
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

export default ResetPasswordForm;
