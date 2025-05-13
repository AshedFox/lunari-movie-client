export const SORT_VARIANTS = [
  'name_asc',
  'name_desc',
  'created_at_asc',
  'created_at_desc',
  'updated_at_asc',
  'updated_at_desc',
] as const;

export const SORT_OPTIONS: Record<(typeof SORT_VARIANTS)[number], string> = {
  name_asc: 'A-Z',
  name_desc: 'Z-A',
  created_at_asc: 'Old-New',
  created_at_desc: 'New-Old',
  updated_at_asc: 'Last Modified (Old-New)',
  updated_at_desc: 'Last Modified (New-Old)',
} as const;
