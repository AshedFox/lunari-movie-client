import { currencyFormatters } from './formatters';

export function formatMoney(currencyId: string, amount: number) {
  let formatter = currencyFormatters[currencyId];

  if (!formatter) {
    formatter = new Intl.NumberFormat(undefined, {
      currency: currencyId,
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    });
    currencyFormatters[currencyId] = formatter;
  }

  return formatter.format(amount);
}
