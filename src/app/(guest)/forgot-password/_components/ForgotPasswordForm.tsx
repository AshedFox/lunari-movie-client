'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../_validation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { z } from 'zod';
import { forgotPassword } from '../_actions/forgot-password';
import { toast } from 'sonner';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';

const ForgotPasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async ({ email }: z.infer<typeof forgotPasswordSchema>) => {
    const result = await forgotPassword(email);

    if (result?.error) {
      form.setError('root', { type: 'validate', message: result.error });
      toast.error(result.error);
    } else {
      toast.success('Successfully sent reset link', {
        description:
          'We sent reset link for password reset to your email. Please check your mail.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-bold">Forgot password</h2>
          <FormDescription>
            Enter your email address and we will send you mail with password
            reset link
          </FormDescription>
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.message && (
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        )}
        <Button size="lg" type="submit" disabled={form.formState.isSubmitting}>
          Send
        </Button>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
