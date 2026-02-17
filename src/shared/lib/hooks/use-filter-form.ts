'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type UseFilterFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  setParams: (params: URLSearchParams, input: T) => void;
  defaultValues: T;
};

export const useFilterForm = <T extends FieldValues>({
  form,
  setParams,
  defaultValues,
}: UseFilterFormProps<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const resetParams = (params: URLSearchParams) => {
    Object.keys(form.getValues()).forEach((key) => {
      params.delete(key);
    });
  };

  const onSubmit = (input: T) => {
    const params = new URLSearchParams(searchParams);

    resetParams(params);
    setParams(params, input);
    params.delete('page');

    router.replace(`${pathname}?${params}`);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);
    resetParams(params);
    router.replace(`${pathname}?${params}`);
    form.reset(defaultValues);
  };

  return {
    onSubmit,
    handleReset,
  };
};
