export const ROUTES = {
  guest: ['/login', '/sign-up'],
  private: ['/users/me'],
} as const;

export const isGuestRoute = (path: string) => {
  return ROUTES.guest.some((route) => path.startsWith(route));
};

export const isPrivateRoute = (path: string) => {
  return ROUTES.private.some((route) => path.startsWith(route));
};
