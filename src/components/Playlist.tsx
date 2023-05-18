import { createContext, useState } from 'react';
import { GenreAggregateV1, RelistGenre } from '@/types/myTypes';
import {
  GenreList,
  FilterList,
  PlaylistHeader,
  PlaylistListTable,
  PlaylistActions,
} from '@/components/PlaylistMisc';

import { useCountedGenres, useFilterList } from '@/hooks/filters';

export type FilterContextType = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;
  //
  umbrellaGenres: string[];
  setUmbrellaGenres: React.Dispatch<React.SetStateAction<string[]>>;
  //
  filteredList: GenreAggregateV1[];
  setFilteredList: React.Dispatch<React.SetStateAction<GenreAggregateV1[]>>;
  //
  countedGenres: Pick<RelistGenre, 'name' | 'count'>[];
  setCountedGenres: React.Dispatch<
    React.SetStateAction<Pick<RelistGenre, 'name' | 'count'>[]>
  >;
  //
  useUmbrellaGenres: boolean;
  setUseUmbrellaGenres: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterContext = createContext<FilterContextType>({
  filters: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilters: () => {},

  umbrellaGenres: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUmbrellaGenres: () => {},

  filteredList: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFilteredList: () => {},

  countedGenres: [] as Pick<RelistGenre, 'name' | 'count'>[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCountedGenres: () => {},

  useUmbrellaGenres: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUseUmbrellaGenres: () => {},
});

const Playlist = ({ list }: { list: GenreAggregateV1[] }) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [umbrellaGenres, setUmbrellaGenres] = useState<string[]>([]);
  const { countedGenres, setCountedGenres } = useCountedGenres(list);
  const { filteredList, setFilteredList } = useFilterList({ list, filters });
  const [useUmbrellaGenres, setUseUmbrellaGenres] = useState(false);

  const filterContextValue = {
    filters,
    setFilters,
    umbrellaGenres,
    setUmbrellaGenres,
    filteredList,
    setFilteredList,
    countedGenres,
    setCountedGenres,
    useUmbrellaGenres,
    setUseUmbrellaGenres,
  };

  return (
    <>
      <FilterContext.Provider value={filterContextValue}>
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
