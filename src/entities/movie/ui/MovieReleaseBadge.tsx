import { Badge, BadgeProps } from '@shared/ui/badge';
import { DateBadge } from '@shared/ui/date-badge';
import { DateTimeFormat } from '@shared/lib/format/formatters';

type MovieDateSource = {
  __typename?: string;
  releaseDate?: string | null;
  startReleaseDate?: string | null;
  endReleaseDate?: string | null;
};

type Props = {
  movie: MovieDateSource;
  className?: string;
  format?: DateTimeFormat | ({} & string);
  size?: BadgeProps['size'];
};

export const MovieReleaseBadge = ({
  movie,
  className,
  format = 'short',
  size = 'sm',
}: Props) => {
  const isSeries = movie.__typename === 'Series';

  const date = isSeries ? undefined : movie.releaseDate;
  const fromDate = isSeries ? movie.startReleaseDate : undefined;
  const toDate = isSeries ? movie.endReleaseDate : undefined;

  if (!date && !fromDate) {
    return (
      <Badge variant="secondary" className={className} size={size}>
        Soon
      </Badge>
    );
  }

  return (
    <DateBadge
      date={date!}
      fromDate={fromDate!}
      toDate={toDate}
      className={className}
      format={format}
      size={size}
    />
  );
};
