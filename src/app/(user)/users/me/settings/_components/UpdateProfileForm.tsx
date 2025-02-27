'use client';

import React, { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserScheme } from '@app/(user)/users/me/settings/_validation';
import { useRouter } from 'next/navigation';
import { updateProfile } from '@app/(user)/users/me/settings/_actions';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import {
  BaseCountryFragment,
  UpdateUserInput,
  UserProfileFragment,
} from '@lib/graphql/generated/graphql';
import { toast } from 'sonner';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Camera, Check, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@movie-catalog/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { updateAvatar } from '@lib/actions/update-avatar';

type Props = {
  user: UserProfileFragment;
  countries: BaseCountryFragment[];
};

const UpdateProfileForm = ({ user, countries }: Props) => {
  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserScheme),
    defaultValues: {
      email: user.email,
      name: user.name,
      countryId: user.country?.id,
      avatarId: user.avatar?.id,
    },
  });
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const onSubmit = async (input: UpdateUserInput) => {
    toast.promise(
      async () => {
        const { data, errors } = await updateProfile(input);

        if (!data || errors) {
          throw new Error(errors[0].message);
        }

        return { data };
      },
      {
        loading: 'Loading...',
        success: () => {
          form.reset(input);
          router.refresh();
          return 'Successfully updated profile';
        },
        error: (e) => {
          form.setError('root', { type: 'validate', message: e.message });
          return e.message;
        },
      },
    );
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      setIsUploading(true);

      try {
        const { data, error } = await updateAvatar(e.target.files[0]);
        if (!data || error) {
          toast.error('Failed to upload');
        } else {
          router.refresh();
        }
      } catch {
        toast.error('Failed to upload');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-5 border rounded-xl p-3 md:p-5 xl:p-7"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-0.5">
          <h2 className="text-lg font-bold">
            Update profile
            {form.formState.isDirty && (
              <span className="text-yellow-500">*</span>
            )}
          </h2>
          <p className="text-sm text-muted-foreground">
            Share more information about yourself or make it more accurate
          </p>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="avatarId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="w-fit">
                  <Avatar
                    className={cn('aspect-square shrink size-28 relative', {
                      'pointer-events-none': isUploading,
                    })}
                  >
                    <Camera
                      className={cn(
                        'absolute top-[50%] left-[50%] size-10 translate-[-50%]',
                        { hidden: isUploading },
                      )}
                    />
                    <Loader2
                      className={cn(
                        'absolute left-[50%] top-[50%] translate-[-50%] size-full animate-spin',
                        { 'hidden animate-none': !isUploading },
                      )}
                    />
                    <AvatarImage
                      className="object-cover opacity-50 hover:opacity-25 transition-opacity"
                      src={user.avatar?.url}
                    />
                    <AvatarFallback className="opacity-50 hover:opacity-25 transition-opacity" />
                  </Avatar>
                </FormLabel>
                <FormControl>
                  <Input
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    disabled={field.disabled || isUploading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    disabled={field.disabled}
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
                  <Input
                    type="text"
                    placeholder="Name"
                    autoComplete="off"
                    value={field.value ?? undefined}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                    ref={field.ref}
                    disabled={field.disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="countryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value
                          ? countries.find(
                              (country) => country.id === field.value,
                            )?.name
                          : 'Select country'}
                        <ChevronDown />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search country..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {countries.map((country) => (
                            <CommandItem
                              value={country.id}
                              key={country.id}
                              onSelect={() => {
                                form.setValue('countryId', country.id, {
                                  shouldDirty: true,
                                });
                              }}
                            >
                              {country.name}
                              <Check
                                className={cn(
                                  'ml-auto',
                                  country.id === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0',
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        {form.formState.errors.root && (
          <FormMessage>{form.formState.errors.root?.message}</FormMessage>
        )}
        <Button size="lg" type="submit" disabled={!form.formState.isDirty}>
          Update
        </Button>
      </form>
    </Form>
  );
};

export default UpdateProfileForm;
