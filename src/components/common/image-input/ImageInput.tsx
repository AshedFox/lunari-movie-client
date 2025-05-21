'use client';

import { cn } from '@lib/utils';
import { ChangeEvent, useRef, useTransition } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@components/ui/input';
import { uploadImage } from './actions';

type ImageData = {
  id: string;
  url: string;
};

type Props = {
  value?: ImageData | null;
  onChange: (value: ImageData | null) => void;
  variant: 'avatar' | 'cover';
  className?: string;
  disabled?: boolean;
};

export const ImageInput = ({
  variant,
  onChange,
  disabled,
  className,
  value,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      const file = e.target.files[0];

      startTransition(async () => {
        try {
          const { data, error } = await uploadImage(file);
          if (!data || error) {
            toast.error('Failed to upload');
          } else {
            toast.success('Successfully uploaded image');
            onChange(data.uploadImage);
          }
        } catch {
          toast.error('Failed to upload');
        }
      });
    }
  };

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className={cn('overflow-hidden', className)}>
      <Input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        disabled={disabled}
        onChange={handleFileChange}
      />

      <div
        onClick={handleClick}
        className={cn(
          'cursor-pointer relative overflow-hidden border border-muted max-h-full max-w-full',
          {
            'aspect-square rounded-full': variant === 'avatar',
            'aspect-[3/1] rounded-lg': variant === 'cover',
          },
        )}
      >
        {value?.url && (
          <Image
            src={value.url}
            alt="Selected image"
            fill
            className={cn(
              'object-cover transition-opacity',
              isPending && 'opacity-50',
            )}
          />
        )}

        <div
          className={cn(
            'absolute flex size-full items-center justify-center bg-muted text-muted-foreground transition-opacity hover:opacity-75',
            { 'opacity-0': value?.url },
          )}
        >
          {isPending ? (
            <Loader2 className="size-[50%] animate-spin" />
          ) : (
            'Press to select image'
          )}
        </div>
      </div>
    </div>
  );
};
