/* eslint-disable @typescript-eslint/no-empty-function */

import { RelistTrack, RelistGenre } from '@/types/myTypes';
import { createContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { RecommendationsSeedObject } from '@/types/spotify-node-api';
import { CountGenres } from '@/services/filtering/countGenres';
import { filterList } from '@/services/filtering/filterList';

export type FilteringContextType = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;

  umbrellaGenres: string[];
  setUmbrellaGenres: React.Dispatch<React.SetStateAction<string[]>>;

  filteredList: RelistTrack[];

  countedGenres: Pick<RelistGenre, 'name' | 'count'>[];

  seletedTracksIds: string[];
  setSelectedTracksIds: React.Dispatch<React.SetStateAction<string[]>>;

  useUmbrellaGenres: boolean;
  setUseUmbrellaGenres: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilteringContext = createContext<FilteringContextType>({
  filters: [],
  setFilters: () => {},

  umbrellaGenres: [],
  setUmbrellaGenres: () => {},

  filteredList: [],

  countedGenres: [] as Pick<RelistGenre, 'name' | 'count'>[],

  seletedTracksIds: [] as string[],
  setSelectedTracksIds: () => {},

  // TODO: see about that state necessity
  useUmbrellaGenres: false,
  setUseUmbrellaGenres: () => {},
});

const FilteringContextProvider = ({
  children,
  list,
}: {
  children: ReactNode;
  list: RelistTrack[];
}) => {
  const [filters, setFilters] = useState<string[]>([]);
  const [umbrellaGenres, setUmbrellaGenres] = useState<string[]>([]);
  const [seletedTracksIds, setSelectedTracksIds] = useState<string[]>([]);

  const filteredList = useMemo(
    () => filterList({ list, filters }),
    [list, filters],
  );

  const [useUmbrellaGenres, setUseUmbrellaGenres] = useState(false);

  const filterContextValue = {
    filters,
    setFilters,

    umbrellaGenres,
    setUmbrellaGenres,

    filteredList: filteredList,

    seletedTracksIds,
    setSelectedTracksIds,

    countedGenres: CountGenres({ list: filteredList }),

    useUmbrellaGenres,
    setUseUmbrellaGenres,
  };

  return (
    <FilteringContext.Provider value={filterContextValue}>
      {children}
    </FilteringContext.Provider>
  );
};

export default FilteringContextProvider;
