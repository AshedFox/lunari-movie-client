'use client';

import { loginSchema } from '../model/validation';
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
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { LoginInput } from '@shared/api/graphql/graphql';
import { loginAction } from '../api/actions';

export const LoginForm = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const searchParams = useSearchParams();
  const from = useMemo(
    () => searchParams.get('from') ?? undefined,
    [searchParams],
  );

  const onSubmit = async (input: LoginInput) => {
    try {
      await loginAction(input, from);
    } catch (error) {
      form.setError('root', {
        type: 'validate',
        message:
          error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <h2 className="text-4xl font-bold">Login</h2>
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
              <div className="flex justify-between">
                <FormLabel>Password</FormLabel>
                <Link
                  className="border-b border-b-current text-xs"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
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
        <div className="space-x-3">
          <Button
            size="lg"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Login
          </Button>
          <span className="text-xs">
            Don&apos;t have an account?{' '}
            <Link
              className="border-b border-b-current"
              href={from ? `/sign-up?from=${from}` : '/sign-up'}
            >
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};
