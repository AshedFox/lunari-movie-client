'use client';

import { Button } from '@components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Form,
  FormDescription,
} from '@components/ui/form';
import { PlanFragment } from '@lib/graphql/generated/graphql';
import { subscribe } from '../_actions';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/select';
import { formatMoney } from '@lib/utils/format';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

type Props = {
  plan: PlanFragment;
};

type Input = {
  priceId: string;
};

const SubscribeForm = ({ plan }: Props) => {
  const form = useForm<Input>({
    resolver: zodResolver(
      z.object({
        priceId: z.string().nonempty(),
      }),
    ),
    defaultValues: {
      priceId: plan.prices.at(0)?.id,
    },
  });

  const onSubmit = async ({ priceId }: Input) => {
    const { error } = await subscribe(priceId);

    if (error) {
      toast.error('Error', {
        description: error,
      });
    }
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

export default SubscribeForm;
