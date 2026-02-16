'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form';
import { updatePasswordAction } from '../api/actions';
import { useRouter } from 'next/navigation';
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';
import { toast } from 'sonner';
import { updatePasswordScheme } from '../model';

type UpdatePasswordInput = {
  oldPassword: string;
  newPassword: string;
};

export const UpdatePasswordForm = () => {
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
    toast.promise(updatePasswordAction(oldPassword, newPassword), {
      loading: 'Updating password...',
      success: () => {
        router.refresh();
        return 'Successfully updated password';
      },
      error: (e) => {
        const message = e instanceof Error ? e.message : 'Something went wrong';
        form.setError('root', { type: 'validate', message });
        return message;
      },
    });
  };

  return (
    <Form {...form}>
      <div className="@container">
        <form
          className="space-y-5 border rounded-xl p-3 @md:p-5 @xl:p-7"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-0.5">
            <h2 className="text-xl font-bold">Update password</h2>
            <p className="text-sm text-muted-foreground">
              Update your password if you think it is not secure enough or if
              you just want
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
          <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Update
          </Button>
        </form>
      </div>
    </Form>
  );
};
