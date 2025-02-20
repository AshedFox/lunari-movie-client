'use client';

import React from 'react';
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

  const onSubmit = async (input: SignUpInput) => {
    const { errors } = await signUp(input);

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
        <Button size="lg" type="submit">
          Sign Up
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
