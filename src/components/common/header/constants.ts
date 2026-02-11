export const publicLinks = [
  {
    selected: (pathname: string) => pathname === '/',
    href: '/',
    children: 'Home',
  },
  {
    selected: (pathname: string) => pathname.startsWith('/explore'),
    href: '/explore',
    children: 'Explore',
  },
  {
    selected: (pathname: string) => pathname.startsWith('/films'),
    href: '/films',
    children: 'Films',
  },
  {
    selected: (pathname: string) => pathname.startsWith('/series'),
    href: '/series',
    children: 'Series',
  },
  {
    selected: (pathname: string) => pathname.startsWith('/collections'),
    href: '/collections',
    children: 'Collections',
  },
];
