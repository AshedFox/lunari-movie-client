export const getInitials = (name?: string | null) => {
  if (!name) {
    return '';
  }

  return name
    .split(' ')
    .map((word) => word[0].toUpperCase())
    .join('')
    .slice(0, 2);
};
