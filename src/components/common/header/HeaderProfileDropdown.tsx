import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import Link from 'next/link';
import { House, Settings, User } from 'lucide-react';
import ThemeToggle from '@components/common/ThemeToggle';
import LogoutButton from '@components/common/LogoutButton';

type Props = {
  avatarUrl?: string;
  name: string;
  pathname: string;
};

export const HeaderProfileDropdown = ({ avatarUrl, name, pathname }: Props) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="ml-auto cursor-pointer">
        <Avatar>
          <AvatarImage className="object-cover" src={avatarUrl} />
          <AvatarFallback>
            {name
              .split(' ')
              .map((word) => word[0].toUpperCase())
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled={pathname === '/users/me'} asChild>
          <Link href="/users/me">
            <User /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={pathname === '/users/me/settings'} asChild>
          <Link href="/users/me/settings">
            <Settings /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled={pathname === '/users/me/rooms'} asChild>
          <Link href="/users/me/rooms">
            <House /> Rooms
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton className="w-full font-medium" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
