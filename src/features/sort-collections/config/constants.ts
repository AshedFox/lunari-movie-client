export const SORT_VARIANTS = [
  'name_asc',
  'name_desc',
  'created_at_asc',
  'created_at_desc',
  'updated_at_asc',
  'updated_at_desc',
] as const;

export const SORT_OPTIONS: Record<(typeof SORT_VARIANTS)[number], string> = {
  name_asc: 'Name (A-Z)',
  name_desc: 'Name (Z-A)',
  created_at_asc: 'Oldest',
  created_at_desc: 'Newest',
  updated_at_asc: 'Recently updated (asc)',
  updated_at_desc: 'Recently updated (desc)',
};
