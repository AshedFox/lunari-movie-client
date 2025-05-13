export const SORT_VARIANTS = [
  'title_asc',
  'title_desc',
  'release_date_asc',
  'release_date_desc',
  'most_popular',
  'most_reviewed',
] as const;

export const SORT_OPTIONS: { [key in (typeof SORT_VARIANTS)[number]]: string } =
  {
    title_asc: 'A-Z',
    title_desc: 'Z-A',
    release_date_asc: 'Old-New',
    release_date_desc: 'New-Old',
    most_popular: 'Most Popular',
    most_reviewed: 'Most Reviewed',
  } as const;
