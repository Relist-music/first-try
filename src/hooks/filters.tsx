import { FilterContext } from '@/components/Playlist';
import { GenreAggregateV1 } from '@/types/myTypes';
import { useContext, useEffect, useState } from 'react';

export const ToggleSubgenreFilter = (subgenre: GenreAggregateV1) => {
  const { setFilteredList } = useContext(FilterContext);
  setFilteredList((filters) =>
    filters.includes(subgenre)
      ? filters.filter((filter) => filter !== subgenre)
      : [...filters, subgenre],
  );
};

export const ToggleUmbrellaGenreFilter = (umbrella: GenreAggregateV1) => {
  const { setFilteredList } = useContext(FilterContext);
  setFilteredList((filters) =>
    filters.includes(umbrella)
      ? filters.filter((filter) => filter !== umbrella)
      : [...filters, umbrella],
  );
};

export const UseFilterList = ({
  list,
  filters,
}: {
  list: GenreAggregateV1[];
  filters: string[];
}) => {
  const [filteredList, setFilteredList] = useState<GenreAggregateV1[]>(list);

  useEffect(() => {
    setFilteredList([
      ...list.filter((richGenreTrack: GenreAggregateV1) => {
        if (filters.length === 0) return true;
        return filters.some((filter) => richGenreTrack.genres.includes(filter));
      }),
    ]);
  }, [filters, list]);

  return { filteredList, setFilteredList };
};

export const UseCountedGenres = (filteredList: GenreAggregateV1[]) => {
  const [countedGenres, setCountedGenres] = useState<{ [key: string]: number }>(
    {},
  );

  useEffect(() => {
    const genresOverall = filteredList.reduce(
      (accumulator: { [key: string]: number }, richGenreTrack) => {
        richGenreTrack.genres.forEach((genre) => {
          accumulator[genre] = accumulator[genre] ? accumulator[genre] + 1 : 1;
        });
        return accumulator;
      },
      {},
    );

    setCountedGenres(genresOverall);
  }, [filteredList]);

  return { countedGenres, setCountedGenres };
};
