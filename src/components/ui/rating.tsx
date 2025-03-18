import { cn } from '@lib/utils';
import { Input } from './input';
import { Star } from 'lucide-react';
import React, { useState } from 'react';

type Props = Omit<React.ComponentProps<'input'>, 'value'> & {
  onRatingChange: (value: number) => void;
  value: number;
};

const Rating = ({ className, value, onRatingChange, ...props }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>();

  return (
    <div className="flex gap-2" onMouseLeave={() => setHoveredIndex(undefined)}>
      <Input {...props} className={cn(className, 'hidden')} value={value} />
      {Array(10)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            onMouseEnter={() => setHoveredIndex(i + 1)}
            data-star-index={i}
            className={cn('size-6 transition-colors', {
              'text-yellow-500 fill-current': hoveredIndex
                ? hoveredIndex > i
                : value > i,
            })}
            onClick={() => onRatingChange(i + 1)}
          />
        ))}
      <span className="font-semibold">{value}</span>
    </div>
  );
};

export { Rating };
