import { AgeRestrictionEnum } from '@shared/api/graphql/graphql';

export const getAgeColor = (ageResrtiction: AgeRestrictionEnum) => {
  switch (ageResrtiction) {
    case AgeRestrictionEnum.G:
      return 'success';
    case AgeRestrictionEnum.NC17:
      return 'destructive';
    case AgeRestrictionEnum.PG:
      return 'warning';
    case AgeRestrictionEnum.PG13:
      return 'warning';
    case AgeRestrictionEnum.R:
      return 'destructive';
    default:
      return 'secondary';
  }
};
