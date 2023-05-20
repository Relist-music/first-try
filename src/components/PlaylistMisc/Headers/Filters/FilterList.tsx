import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { faCircleXmark as faCircleXmarkOutline } from '@fortawesome/free-regular-svg-icons';
import ShowMoreButton from '@/components/design-system/buttons/ShowMore';
import { mapUmbrellaToSubgenres } from '@/utils/grouping';
import UMBRELLA_WITH_SUBGENRES from '@/data/UMBRELLA_WITH_SUBGENRES.json';
import { FilterContext } from '@/contexts/filteringContext';

const FilterList = () => {
  const { umbrellaGenres, setUmbrellaGenres, filters, setFilters } =
    useContext(FilterContext);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const [useUmbrellaGenres, setUseUmbrellaGenres] = useState(false);
  const hasLotOfFilters = filters.length > 10;
  return (
    <div>
      <label htmlFor="">
        group filters genre to umbrella{' '}
        <input
          onChange={() => setUseUmbrellaGenres(!useUmbrellaGenres)}
          type="checkbox"
        />
      </label>
      <br />
      {filters.length === 0 ? (
        <span>No filters</span>
      ) : (
        <div className="flex items-center flex-wrap gap-1">
          <span className="mr-1">Active filters are</span>
          {useUmbrellaGenres
            ? umbrellaGenres
                .filter((_, index) =>
                  hasLotOfFilters && !showAllFilters ? index < 10 : true,
                )
                .map((umbrellaGenre, index) => (
                  <div
                    key={`${index}-active-filter-${umbrellaGenre}`}
                    className="
            font-apfel 
            text-blue-500 
            px-2 
            py-1
            bg-blue-100
            rounded-md
            flex
            gap-x-1
            items-center
            w-max
          "
                  >
                    {umbrellaGenre}
                    <FontAwesomeIcon
                      icon={faCircleXmarkOutline}
                      className="cursor-pointer"
                      onClick={() => {
                        const mappedFilters =
                          mapUmbrellaToSubgenres({
                            umbrella: umbrellaGenre,
                            genresGrouping: UMBRELLA_WITH_SUBGENRES,
                          }) || [];
                        setFilters((filters) =>
                          filters.filter(
                            (activeFilter) =>
                              !mappedFilters.includes(activeFilter),
                          ),
                        );
                        setUmbrellaGenres((umbrellaGenres) =>
                          umbrellaGenres.filter(
                            (activeUmbrellaFilter) =>
                              activeUmbrellaFilter !== umbrellaGenre,
                          ),
                        );
                      }}
                    />
                  </div>
                ))
            : filters
                .filter((_, index) =>
                  hasLotOfFilters && !showAllFilters ? index < 10 : true,
                )
                .map((filter, index) => (
                  <div
                    key={`${index}-active-filter-${filter}`}
                    className="
                font-apfel 
                text-blue-500 
                px-2 
                py-1
                bg-blue-100
                rounded-md
                flex
                gap-x-1
                items-center
                w-max
              "
                  >
                    {filter}
                    <FontAwesomeIcon
                      icon={faCircleXmarkOutline}
                      className="cursor-pointer"
                      onClick={() => {
                        setFilters((filters) =>
                          filters.filter(
                            (activeFilter) => activeFilter !== filter,
                          ),
                        );
                      }}
                    />
                  </div>
                ))}
        </div>
      )}
      <ShowMoreButton
        hasLofOfItem={hasLotOfFilters}
        showAll={showAllFilters}
        setShowAll={setShowAllFilters}
        itemName="filters"
      />
    </div>
  );
};

export default FilterList;
