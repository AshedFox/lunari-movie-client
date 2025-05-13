import { DEFAULT_LOCALE } from './constants';

export const relativeDateTimeFormatter = new Intl.RelativeTimeFormat(
  DEFAULT_LOCALE,
  { numeric: 'auto' },
);

export type DateTimeFormat = 'short' | 'long';
export type DateTimeVariant = 'date' | 'time' | 'dateTime';

export const dateTimeFormatters: Record<
  DateTimeVariant,
  Record<DateTimeFormat, Intl.DateTimeFormat>
> = {
  date: {
    short: new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    long: new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  },
  time: {
    short: new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    long: new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  },
  dateTime: {
    short: new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    long: new Intl.DateTimeFormat(DEFAULT_LOCALE, {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }),
  },
};

export const currencyFormatters: Record<string, Intl.NumberFormat> = {};
