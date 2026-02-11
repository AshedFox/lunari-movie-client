export type DateTimeFormat = 'short' | 'long';
export type DateTimeVariant = 'date' | 'time' | 'dateTime';

export const DATE_FORMATS: Record<
  DateTimeVariant,
  Record<DateTimeFormat, string>
> = {
  date: {
    short: 'dd.MM.yyyy',
    long: 'd MMMM yyyy',
  },
  time: {
    short: 'HH:mm',
    long: 'HH:mm:ss',
  },
  dateTime: {
    short: 'dd.MM.yyyy HH:mm',
    long: 'd MMMM yyyy HH:mm:ss',
  },
};

export const currencyFormatters: Record<string, Intl.NumberFormat> = {};
