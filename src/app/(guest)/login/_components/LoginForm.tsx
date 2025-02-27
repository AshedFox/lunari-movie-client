'use client';

import React from 'react';
import { login } from '../_actions';
import { loginSchema } from '../_validation';
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
import { LoginInput } from '@lib/graphql/generated/graphql';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

const LoginForm = () => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (input: LoginInput) => {
    const { errors } = await login(input);
    if (errors) {
      form.setError('root', {
        type: 'validate',
        message: errors[0].message,
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
        <div className="space-x-3">
          <Button size="lg" type="submit">
            Login
          </Button>
          <span className="text-xs">
            Don&apos;t have an account?{' '}
            <Link className="border-b border-b-current" href="/sign-up">
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
