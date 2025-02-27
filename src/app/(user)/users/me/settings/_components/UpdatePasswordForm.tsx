'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { updatePasswordScheme } from '../_validation';
import { updatePassword } from '../_actions';
import { useRouter } from 'next/navigation';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { toast } from 'sonner';

type UpdatePasswordInput = {
  oldPassword: string;
  newPassword: string;
};

const UpdatePasswordForm = () => {
  const form = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordScheme),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });
  const router = useRouter();

  const onSubmit = async ({
    oldPassword,
    newPassword,
  }: UpdatePasswordInput) => {
    toast.promise(
      async () => {
        const { data, errors } = await updatePassword(oldPassword, newPassword);

        if (!data || errors) {
          throw new Error(errors[0].message);
        }

        return { data };
      },
      {
        loading: 'Loading...',
        success: () => {
          router.refresh();
          return 'Successfully updated password';
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
      <form
        className="space-y-5 border rounded-xl p-3 md:p-5 xl:p-7"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-0.5">
          <h2 className="text-xl font-bold">Update password</h2>
          <p className="text-sm text-muted-foreground">
            Update your password if you think it is not secure enough or if you
            just want
          </p>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Old password"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New password"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        )}
        <Button size="lg" type="submit">
          Update
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
