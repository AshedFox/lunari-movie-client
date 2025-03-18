'use client';

import { cn } from '@lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@components/ui/dropdown-menu';
import { useVideoQualityOptions } from '@vidstack/react';

const QualitySubmenu = () => {
  const options = useVideoQualityOptions({ auto: true, sort: 'ascending' });

  const currentQualityHeight = options.selectedQuality?.height;
  const hint =
    options.selectedValue !== 'auto' && currentQualityHeight
      ? `${currentQualityHeight}p`
      : currentQualityHeight
        ? `${currentQualityHeight}p (auto)`
        : 'auto';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="p-2 rounded-lg hover:bg-media-button-hover-bg">
        {hint}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={options.selectedValue}>
          {options.map(({ label, value, select }) => (
            <DropdownMenuRadioItem
              value={value}
              onSelect={select}
              className={cn({
                'pointer-events-none text-primary font-semibold':
                  value === options.selectedValue,
              })}
              key={value}
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QualitySubmenu;
