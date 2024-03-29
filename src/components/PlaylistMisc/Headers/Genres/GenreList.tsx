import { useContext } from 'react';
import { GenreButton } from './GenreButton';
import { useState } from 'react';
import { Switch } from '@headlessui/react';

import { useGroupUmbrellaGenres } from '@/hooks/grouping';
import { enrichSubgenre } from '@/utils/enrich';

import SUBGENRES from '@/data/SUBGENRES.json';
import ShowMoreButton from '@/components/design-system/buttons/ShowMore';
import { FilteringContext } from '@/contexts/FilteringContext';
import { mapUmbrellaToSubgenres } from '@/utils/grouping';

import UMBRELLA_WITH_SUBGENRES from '@/data/UMBRELLA_WITH_SUBGENRES.json';

const GenreList = () => {
  const { countedGenres, useUmbrellaGenres, setUseUmbrellaGenres } =
    useContext(FilteringContext);

  const [showAllGenres, setShowAllGenres] = useState(false);
  const hasLotOfGenres = countedGenres.length > 10;
  const { umbrellaGenres } = useGroupUmbrellaGenres();

  return (
    <div>
      <div>
        <div>
          <span>Use umbrella genres</span>
          <Switch
            checked={useUmbrellaGenres}
            onChange={setUseUmbrellaGenres}
            className={`${
              useUmbrellaGenres ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                useUmbrellaGenres ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <hr />
        <br />
      </div>
      <div className="flex items-center flex-wrap gap-1">
        {useUmbrellaGenres && umbrellaGenres
          ? umbrellaGenres
              .sort((a, b) => {
                return a.count < b.count ? 1 : -1;
              })
              .filter((_, index) =>
                hasLotOfGenres ? (showAllGenres ? true : index < 10) : true,
              )
              .map((genre, index) => (
                <GenreButton
                  key={`${index}-orevall-${genre}`}
                  genre={genre.name}
                  count={genre.count}
                  index={index}
                  color={genre.color}
                  is={'umbrella'}
                />
              ))
          : countedGenres
              .map((countedGenres) =>
                enrichSubgenre({
                  genreWithCount: countedGenres,
                  genreObjectList: SUBGENRES,
                }),
              )
              .sort((a, b) => {
                return a.count < b.count ? 1 : -1;
              })
              .filter((_, index) =>
                hasLotOfGenres ? (showAllGenres ? true : index < 10) : true,
              )
              .map((genre, index) => (
                <GenreButton
                  key={`${index}-orevall-${genre}`}
                  genre={genre.name}
                  count={genre.count}
                  index={index}
                  color={genre.color}
                  is={'subgenre'}
                />
              ))}
      </div>
      <ShowMoreButton
        hasLofOfItem={hasLotOfGenres}
        showAll={showAllGenres}
        setShowAll={setShowAllGenres}
        itemName="genres"
      />
    </div>
  );
};

export default GenreList;
