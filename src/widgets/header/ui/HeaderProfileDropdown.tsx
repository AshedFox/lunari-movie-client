import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@shared/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar';
import Link from 'next/link';
import { House, ListVideo, Settings, User } from 'lucide-react';
import { Button } from '@shared/ui/button';
import { ThemeToggle } from '@features/toggle-theme';
import { LogoutButton } from '@features/logout';

type Props = {
  avatarUrl?: string;
  name: string;
  pathname: string;
};

export const HeaderProfileDropdown = ({ avatarUrl, name, pathname }: Props) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="ml-auto cursor-pointer" asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage className="object-cover" src={avatarUrl} />
            <AvatarFallback>
              {name
                .split(' ')
                .map((word) => word[0].toUpperCase())
                .join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
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
        <DropdownMenuItem
          disabled={pathname === '/users/me/collections'}
          asChild
        >
          <Link href="/users/me/collections">
            <ListVideo /> My Collections
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
          <LogoutButton className="w-full justify-start font-normal" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
