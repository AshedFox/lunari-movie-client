import { AgeRestrictionEnum } from '@lib/graphql/generated/graphql';

export type FilterSearchParams = {
  title: string;
  ageRestriction: AgeRestrictionEnum[];
  releaseDateFrom: string;
  releaseDateTo: string;
  countries: string[];
  genres: string[];
  studios: string[];
};

export type FilterFormInput = {
  title: string;
  ageRestriction: AgeRestrictionEnum[];
  releaseDateFrom: string;
  releaseDateTo: string;
  countries: string[];
  genres: string[];
  studios: { value: string; label: string }[];
};
