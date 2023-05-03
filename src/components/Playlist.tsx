import { createContext, useState, useMemo } from 'react';
import { GenreAggregateV1 } from '@/types/myTypes';
import {
  GenreList,
  FilterList,
  PlaylistHeader,
  PlaylistListTable,
  PlaylistActions,
} from '@/components/PlaylistMisc';

import { UseCountedGenres, UseFilterList } from '@/hooks/filters';

export type FilterContextType = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  //
  filteredList: GenreAggregateV1[];
  setFilteredList: React.Dispatch<React.SetStateAction<GenreAggregateV1[]>>;
  //
  countedGenres: { [key: string]: number };
  setCountedGenres: React.Dispatch<
    React.SetStateAction<{ [key: string]: number }>
  >;
  //
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

  countedGenres: {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCountedGenres: () => {},

  useUmbrellaGenres: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUseUmbrellaGenres: () => {},
});

const Playlist = ({ list }: { list: GenreAggregateV1[] }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const { countedGenres, setCountedGenres } = UseCountedGenres(list);
  const { filteredList, setFilteredList } = UseFilterList({ list, filters });
  const [useUmbrellaGenres, setUseUmbrellaGenres] = useState(false);

  const contextValue = useMemo(
    () => ({
      filters,
      setFilters,
      filteredList,
      setFilteredList,
      countedGenres,
      setCountedGenres,
      useUmbrellaGenres,
      setUseUmbrellaGenres,
    }),
    [
      countedGenres,
      filteredList,
      filters,
      setCountedGenres,
      setFilteredList,
      useUmbrellaGenres,
    ],
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
