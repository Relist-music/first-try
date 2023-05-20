import { useState } from 'react';
import { GenreAggregateV1 } from '@/types/myTypes';
import {
  GenreList,
  FilterList,
  PlaylistHeader,
  PlaylistListTable,
  PlaylistActions,
} from '@/components/PlaylistMisc';

import { useCountedGenres, useFilterList } from '@/hooks/filters';
import { FilterContext } from '@/contexts/filteringContext';

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
