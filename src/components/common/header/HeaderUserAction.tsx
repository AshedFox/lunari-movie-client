import { getCurrentUser } from '@services/user.service';
import { HeaderUserActionClient } from './HeaderUserActionClient';
import { HeaderUserActionGuest } from './HeaderUserActionGuest';

export const HeaderUserAction = async () => {
  const user = await getCurrentUser();

  return (
    <div className="ml-auto flex items-center gap-2">
      {user ? (
        <HeaderUserActionClient user={user} />
      ) : (
        <HeaderUserActionGuest />
      )}
    </div>
  );
};
