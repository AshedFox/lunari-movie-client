'use client';

import { signUpSchema } from '../model';
import { Input } from '@shared/ui/input';
import { Button } from '@shared/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@shared/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpAction } from '../api/actions';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { SignUpInput } from '@shared/api/graphql/graphql';
import { toast } from 'sonner';

export const SignUpForm = () => {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      passwordRepeat: '',
    },
  });
  const searchParams = useSearchParams();
  const from = useMemo(
    () => searchParams.get('from') ?? undefined,
    [searchParams],
  );
  const router = useRouter();

  const onSubmit = async (input: SignUpInput) => {
    toast.promise(signUpAction(input, from), {
      loading: 'Signing up...',
      error: (e) => {
        const message = e instanceof Error ? e.message : 'Something went wrong';
        form.setError('root', { type: 'validate', message });
        return { message: 'Failed to sign up', description: message };
      },
      success: () => {
        router.push(`/login`);
        return 'Sign up successfully';
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-4xl font-bold">Sign Up</h2>
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
        <FormField
          control={form.control}
          name="password"
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
        <FormField
          control={form.control}
          name="passwordRepeat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password (repeat)</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password (repeat)..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
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
                <Input placeholder="Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        )}
        <div className="space-x-3">
          <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Sign Up
          </Button>
          <span className="text-xs">
            Already have an account?{' '}
            <Link
              className="border-b border-b-current"
              href={from ? `/login?from=${from}` : '/login'}
            >
              Login
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};
