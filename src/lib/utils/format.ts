export function ISODateToLocale(date?: Date | null) {
  if (!date) {
    return null;
  }
  const formatter = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  return formatter.format(date);
}

export function ISOPeriodToLocale(
  startDate?: Date | null,
  endDate?: Date | null,
) {
  if (!startDate && !endDate) {
    return null;
  }

  const formatter = new Intl.DateTimeFormat('de', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  if (startDate && endDate) {
    return formatter.formatRange(startDate, endDate);
  } else if (startDate) {
    return `${formatter.format(startDate)} – …`;
  } else if (endDate) {
    return `… – ${formatter.format(endDate)}`;
  }
  return '… – …';
}

export function formatMoney(currencyId: string, amount: number) {
  return new Intl.NumberFormat(undefined, {
    currency: currencyId,
    style: 'currency',
  }).format(amount);
}
