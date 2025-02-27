export const publicLinks = [
  {
    selected: (pathname: string) => pathname === '/',
    href: '/',
    children: 'Home',
  },
  {
    selected: (pathname: string) => pathname === '/explore',
    href: '/explore',
    children: 'Explore',
  },
  {
    selected: (pathname: string) => pathname === '/films',
    href: '/films',
    children: 'Films',
  },
  {
    selected: (pathname: string) => pathname === '/series',
    href: '/series',
    children: 'Series',
  },
];
