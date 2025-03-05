export function ISODateToLocale(date?: string | null) {
  if (!date) {
    return null;
  }

  return new Date(date).toLocaleDateString();
}

export function ISOPeriodToLocale(
  startDate?: string | null,
  endDate?: string | null,
) {
  if (!startDate && !endDate) {
    return null;
  }

  const start = startDate ? new Date(startDate).toLocaleDateString() : '...';
  const end = endDate ? new Date(endDate).toLocaleDateString() : '...';

  return `${start}-${end}`;
}
