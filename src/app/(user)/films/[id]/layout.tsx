import { ReactNode } from 'react';
import { getFilmTabsInfo } from '@entities/film/server';
import { FilmTabsNav } from '@widgets/film-tabs';
import { MovieVisitTracker } from '@features/track-visit';

type Props = {
  children: ReactNode;
  tab: ReactNode;
  params: Promise<{
    id: string;
  }>;
};

const Layout = async ({ children, tab, params }: Props) => {
  const { id } = await params;
  const filmTabsInfo = await getFilmTabsInfo(id);

  return (
    <div className="space-y-10">
      {children}
      <div className="flex flex-col gap-2 container">
        <FilmTabsNav id={id} tabsInfo={filmTabsInfo} />
        <div className="py-4">{tab}</div>
      </div>
      <MovieVisitTracker movieId={id} />
    </div>
  );
};

export default Layout;
