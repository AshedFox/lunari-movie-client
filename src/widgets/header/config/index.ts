export const getHeaderPublicLinks = (pathname: string) => [
  {
    selected: pathname === '/',
    href: '/',
    children: 'Home',
  },
  {
    selected: pathname.startsWith('/explore'),
    href: '/explore',
    children: 'Explore',
  },
  {
    selected: pathname.startsWith('/films'),
    href: '/films',
    children: 'Films',
  },
  {
    selected: pathname.startsWith('/series'),
    href: '/series',
    children: 'Series',
  },
  {
    selected: pathname.startsWith('/collections'),
    href: '/collections',
    children: 'Collections',
  },
];
