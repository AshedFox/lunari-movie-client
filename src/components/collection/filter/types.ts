import { DateRange } from 'react-day-picker';

export type FilterSearchParams = {
  name: string;
  createdAtFrom: string;
  createdAtTo: string;
  updatedAtFrom: string;
  updatedAtTo: string;
  isSystem?: boolean;
};

export type FilterFormInput = {
  name: string;
  createdAt?: DateRange;
  updatedAt?: DateRange;
  isSystem?: boolean;
};
