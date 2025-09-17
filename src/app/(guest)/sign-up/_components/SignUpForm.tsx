'use client';

import { signUpSchema } from '../_validation';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { useForm } from 'react-hook-form';
import { SignUpInput } from '@lib/graphql/generated/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp } from '@app/(guest)/sign-up/_actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

const SignUpForm = () => {
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

  const onSubmit = async (input: SignUpInput) => {
    const { error } = await signUp(input, from);

    if (error) {
      form.setError('root', {
        type: 'validate',
        message: error.message,
      });
    }
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

export default SignUpForm;
