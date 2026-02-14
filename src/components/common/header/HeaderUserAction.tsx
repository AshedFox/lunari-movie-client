import { getUser } from '@lib/auth/user-dal';
import { HeaderUserActionClient } from './HeaderUserActionClient';
import { HeaderUserActionGuest } from './HeaderUserActionGuest';

export const HeaderUserAction = async () => {
  const user = await getUser();

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
