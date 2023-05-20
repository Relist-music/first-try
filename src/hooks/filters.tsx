import { RelistTrack, RelistGenre } from '@/types/myTypes';
import { useEffect, useState } from 'react';

export const useFilterList = ({
  list,
  filters,
}: {
  list: RelistTrack[];
  filters: string[];
}) => {
  const [filteredList, setFilteredList] = useState<RelistTrack[]>(list);

  // this is a loose filter
  useEffect(() => {
    setFilteredList([
      ...list.filter((richGenreTrack: RelistTrack) => {
        if (filters.length === 0) return true;
        return filters.some((filter) => richGenreTrack.genres.includes(filter));
      }),
    ]);
  }, [filters, list]);

  return { filteredList, setFilteredList };
};

export const useCountedGenres = (filteredList: RelistTrack[]) => {
  const [countedGenres, setCountedGenres] = useState<
    Pick<RelistGenre, 'name' | 'count'>[]
  >([] as Pick<RelistGenre, 'name' | 'count'>[]);

  useEffect(() => {
    const genresOverall = filteredList.reduce(
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

    setCountedGenres(genresOverall);
  }, [filteredList]);

  return { countedGenres, setCountedGenres };
};
