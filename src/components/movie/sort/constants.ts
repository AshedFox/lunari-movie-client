export const SORT_VARIANTS = [
  'title_asc',
  'title_desc',
  'release_date_asc',
  'release_date_desc',
] as const;

export const SORT_OPTIONS: { [key in (typeof SORT_VARIANTS)[number]]: string } =
  {
    title_asc: 'A-Z',
    title_desc: 'Z-A',
    release_date_asc: 'Old-New',
    release_date_desc: 'New-Old',
  } as const;
