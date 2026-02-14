import { getOneSeries } from '@services/series.service';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const series = await getOneSeries(id);

  return (
    <div className="space-y-4">
      {/* Description */}
      {series.description && (
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Description</h2>
          <p className="text-muted-foreground text-sm">{series.description}</p>
        </div>
      )}

      {/* Extra info */}
      <div className="grid grid-cols-2 gap-3">
        {/* Studios */}
        {series.studios.length > 0 && (
          <div>
            <span className="font-semibold">Studios: </span>
            <span className="text-muted-foreground text-sm">
              {series.studios.map((studio) => studio.name).join(', ')}
            </span>
          </div>
        )}

        {/* Countries */}
        {series.countries.length > 0 && (
          <div>
            <span className="font-semibold">Countries: </span>
            <span className="text-muted-foreground text-sm">
              {series.countries.map((country) => country.name).join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
