import { RelistGenre } from '@/types/myTypes';
import { useContext, useEffect, useState } from 'react';
import { groupGenre } from '@/utils/grouping';

import UMBRELLA_GENRES from '@/data/UMBRELLA_GENRES.json';
import UMBRELLA_WITH_SUBGENRES from '@/data/UMBRELLA_WITH_SUBGENRES.json';
import { FilteringContext } from '@/contexts/FilteringContext';

export const useGroupUmbrellaGenres = () => {
  const { countedGenres, useUmbrellaGenres } = useContext(FilteringContext);
  const [umbrellaGenres, setUmbrellaGenres] = useState<RelistGenre[]>([]);

  useEffect(() => {
    if (useUmbrellaGenres) {
      const groupedGenres = groupGenre(
        countedGenres,
        UMBRELLA_WITH_SUBGENRES,
        UMBRELLA_GENRES,
      );
      setUmbrellaGenres(Object.values(groupedGenres));
    }
  }, [countedGenres, useUmbrellaGenres]);

  return { umbrellaGenres, setUmbrellaGenres };
};
