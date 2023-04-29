import { createContext, useEffect, useState, useMemo } from 'react';
import { GenreAggregateV1 } from '@/types/myTypes';
import {
  GenreList,
  FilterList,
  PlaylistHeader,
  PlaylistListTable,
  PlaylistActions,
} from '@/components/PlaylistMisc';

export type FilterContextType = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  filteredList: GenreAggregateV1[];
  setFilteredList: React.Dispatch<React.SetStateAction<GenreAggregateV1[]>>;
  overall: { [key: string]: number };
  setOverall: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  useUmbrellaGenres: boolean;
  setUseUmbrellaGenres: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterContext = createContext<FilterContextType>({
  filters: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilters: () => {},
  filteredList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilteredList: () => {},
  overall: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOverall: () => {},
  useUmbrellaGenres: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUseUmbrellaGenres: () => {},
});

const Playlist = ({ list }: { list: GenreAggregateV1[] }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [overall, setOverall] = useState<{ [key: string]: number }>({});
  const [filteredList, setFilteredList] = useState<GenreAggregateV1[]>(list);
  const [useUmbrellaGenres, setUseUmbrellaGenres] = useState(false);

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

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

    setOverall(genresOverall);
  }, [filteredList]);

  useEffect(() => {
    setFilteredList([
      ...list.filter((richGenreTrack: GenreAggregateV1) => {
        if (filters.length === 0) return true;
        return filters.some((filter) => richGenreTrack.genres.includes(filter));
      }),
    ]);
  }, [filters, list]);

  const contextValue = useMemo(
    () => ({
      filters,
      setFilters,
      filteredList,
      setFilteredList,
      overall,
      setOverall,
      useUmbrellaGenres,
      setUseUmbrellaGenres,
    }),
    [filters, filteredList, overall, useUmbrellaGenres],
  );

  return (
    <>
      <FilterContext.Provider value={contextValue}>
        <PlaylistHeader
          title="Liked Songs"
          imageUrl="/images/spotify-liked-image.png"
        />
        <br />
        <GenreList />
        <br />
        <FilterList />
        <br />
        <PlaylistActions />
        <br />
        <PlaylistListTable />
      </FilterContext.Provider>
    </>
  );
};

export default Playlist;
