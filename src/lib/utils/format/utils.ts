import { DEFAULT_LOCALE } from './constants';
import {
  currencyFormatters,
  DateTimeFormat,
  dateTimeFormatters,
  DateTimeVariant,
  relativeDateTimeFormatter,
} from './formatters';

export function formatRelative(date: Date, from: Date = new Date()) {
  const secDiff = Math.floor((date.getTime() - from.getTime()) / 1000);
  const absDiff = Math.abs(secDiff);
  const round = secDiff >= 0 ? Math.floor : Math.ceil;

  if (absDiff < 60) {
    return relativeDateTimeFormatter.format(secDiff, 'second');
  } else if (absDiff < 3600) {
    return relativeDateTimeFormatter.format(round(secDiff / 60), 'minute');
  } else if (absDiff < 86400) {
    return relativeDateTimeFormatter.format(round(secDiff / 3600), 'hour');
  } else if (absDiff < 2592000) {
    return relativeDateTimeFormatter.format(round(secDiff / 86400), 'day');
  } else if (absDiff < 31536000) {
    return relativeDateTimeFormatter.format(round(secDiff / 2592000), 'month');
  }

  return relativeDateTimeFormatter.format(round(secDiff / 31536000), 'year');
}

export function formatDateTime(
  date: Date,
  variant: DateTimeVariant = 'date',
  format: DateTimeFormat = 'short',
) {
  return dateTimeFormatters[variant][format].format(date);
}

export function formatDateTimeRange(
  startDate?: Date | null,
  endDate?: Date | null,
  variant: DateTimeVariant = 'date',
  format: DateTimeFormat = 'short',
) {
  if (!startDate && !endDate) {
    return null;
  }

  const formatter = dateTimeFormatters[variant][format];

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
  let formatter = currencyFormatters[currencyId];

  if (!formatter) {
    formatter = new Intl.NumberFormat(DEFAULT_LOCALE, {
      currency: currencyId,
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 3,
    });
    currencyFormatters[currencyId] = formatter;
  }

  return formatter.format(amount);
}
