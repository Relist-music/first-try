/* eslint-disable @typescript-eslint/no-empty-function */

import { GenreAggregateV1, RelistGenre } from '@/types/myTypes';
import { createContext } from 'react';

export type FilterContextType = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;

  umbrellaGenres: string[];
  setUmbrellaGenres: React.Dispatch<React.SetStateAction<string[]>>;

  filteredList: GenreAggregateV1[];
  setFilteredList: React.Dispatch<React.SetStateAction<GenreAggregateV1[]>>;

  countedGenres: Pick<RelistGenre, 'name' | 'count'>[];
  setCountedGenres: React.Dispatch<
    React.SetStateAction<Pick<RelistGenre, 'name' | 'count'>[]>
  >;

  useUmbrellaGenres: boolean;
  setUseUmbrellaGenres: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterContext = createContext<FilterContextType>({
  filters: [],
  setFilters: () => {},

  umbrellaGenres: [],
  setUmbrellaGenres: () => {},

  filteredList: [],
  setFilteredList: () => {},

  countedGenres: [] as Pick<RelistGenre, 'name' | 'count'>[],
  setCountedGenres: () => {},

  useUmbrellaGenres: false,
  setUseUmbrellaGenres: () => {},
});
