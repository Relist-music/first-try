import { RelistTrack, RelistGenre } from '@/types/myTypes';

export function CountGenres({ list }: { list: RelistTrack[] }) {
  const genresOverall = list.reduce(
    (
      acc: Pick<RelistGenre, 'name' | 'count'>[],
      item: RelistTrack,
    ): Pick<RelistGenre, 'name' | 'count'>[] => {
      item.genres.forEach((genreName) => {
        const entry = acc.find((entry) => entry.name === genreName);
        if (entry) {
          entry.count += 1;
        } else {
          acc.push({ name: genreName, count: 1 });
        }
      });
      return acc;
    },
    [],
  );

  return genresOverall;
}
