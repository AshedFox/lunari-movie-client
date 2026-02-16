import { HomeHero } from '@widgets/home-hero';
import { Suspense } from 'react';
import { HomeGenres } from '@widgets/home-genres';
import { HomeLatest } from '@widgets/home-latest';
import { HomePopular } from '@widgets/home-popular';

export default async function Home() {
  return (
    <main className="min-h-screen bg-background pb-8 container overflow-hidden">
      <Suspense>
        <HomeHero />
      </Suspense>

      <div className="space-y-8">
        <Suspense>
          <HomeGenres />
        </Suspense>

        <Suspense>
          <HomePopular />
        </Suspense>

        <Suspense>
          <HomeLatest />
        </Suspense>
      </div>
    </main>
  );
}
