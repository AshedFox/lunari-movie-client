import { Avatar, AvatarFallback } from '@shared/ui/avatar';

export const HeaderUserFallback = () => {
  return (
    <div className="ml-auto flex items-center">
      <Avatar className="animate-pulse">
        <AvatarFallback className="bg-muted" />
      </Avatar>
    </div>
  );
};
