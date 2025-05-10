import { ApolloLink } from '@apollo/client';

const dateFields = [
  'createdAt',
  'updatedAt',
  'releaseDate',
  'startReleaseDate',
  'endReleaseDate',
];

export const dateParserLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseDates = (obj: any): any => {
      if (Array.isArray(obj)) return obj.map(parseDates);
      if (obj !== null && typeof obj === 'object') {
        for (const key in obj) {
          if (dateFields.includes(key) && typeof obj[key] === 'string') {
            obj[key] = new Date(obj[key]);
          } else {
            parseDates(obj[key]);
          }
        }
      }
      return obj;
    };
    return parseDates(response);
  });
});
