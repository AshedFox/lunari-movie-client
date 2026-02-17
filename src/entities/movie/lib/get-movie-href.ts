export const getMovieHref = (id: string | number, type: 'Film' | 'Series') => {
  return `/${type === 'Film' ? 'films' : 'series'}/${id}`;
};
