'use client';

import { Button } from '@shared/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormDescription,
} from '@shared/ui/form';
import { subscribeAction } from '../api/actions';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@shared/ui/select';
import { formatMoney } from '@shared/lib/format';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PlanFragment } from '@shared/api/graphql/graphql';

type Props = {
  plan: PlanFragment;
};

type InputType = {
  priceId: string;
};

export const SubscribeForm = ({ plan }: Props) => {
  const form = useForm<InputType>({
    resolver: zodResolver(
      z.object({
        priceId: z.string().nonempty(),
      }),
    ),
    defaultValues: {
      priceId: plan.prices.at(0)?.id,
    },
  });

  const onSubmit = async ({ priceId }: InputType) => {
    toast.promise(subscribeAction(priceId), {
      loading: 'Subscribing...',
      success: 'Redirecting to payment page...',
      error: (e) => ({
        message: 'Failed to subscribe',
        description: e instanceof Error ? e.message : 'Something went wrong',
      }),
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 px-8 py-6 border rounded-xl aspect-[1/1]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="mb-auto">
          <h2 className="text-xl font-semibold">{plan.name} plan</h2>
          <FormDescription>Choose price you want</FormDescription>
        </div>
        <FormField
          control={form.control}
          name={'priceId'}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Price</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select price.." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {plan.prices.map((price) => (
                    <SelectItem key={price.id} value={price.id}>
                      {formatMoney(price.currency.id, price.amount / 100)}/
                      {price.interval}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button className="w-full" loading={form.formState.isSubmitting}>
          Choose
        </Button>
      </form>
    </Form>
  );
};
