/* eslint-disable @typescript-eslint/no-empty-function */

import { RelistTrack, RelistGenre } from '@/types/myTypes';
import {
  RecommendationTrackObject,
  RecommendationsSeedObject,
} from '@/types/spotify-node-api';
import { createContext } from 'react';

export type FilteringContextType = {
  filters: string[];
  setFilters: React.Dispatch<React.SetStateAction<string[]>>;

  umbrellaGenres: string[];
  setUmbrellaGenres: React.Dispatch<React.SetStateAction<string[]>>;

  filteredList: RelistTrack[];
  setFilteredList: React.Dispatch<React.SetStateAction<RelistTrack[]>>;

  recommandationList: RelistTrack[];
  setRecommandationList: React.Dispatch<React.SetStateAction<RelistTrack[]>>;

  recommandationSeeds: RecommendationsSeedObject[];
  setRecommandationSeeds: React.Dispatch<
    React.SetStateAction<RecommendationsSeedObject[]>
  >;

  countedGenres: Pick<RelistGenre, 'name' | 'count'>[];
  setCountedGenres: React.Dispatch<
    React.SetStateAction<Pick<RelistGenre, 'name' | 'count'>[]>
  >;

  useUmbrellaGenres: boolean;
  setUseUmbrellaGenres: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilteringContext = createContext<FilteringContextType>({
  filters: [],
  setFilters: () => {},

  umbrellaGenres: [],
  setUmbrellaGenres: () => {},

  filteredList: [],
  setFilteredList: () => {},

  recommandationList: [],
  setRecommandationList: () => {},

  recommandationSeeds: [],
  setRecommandationSeeds: () => {},

  countedGenres: [] as Pick<RelistGenre, 'name' | 'count'>[],
  setCountedGenres: () => {},

  useUmbrellaGenres: false,
  setUseUmbrellaGenres: () => {},
});
