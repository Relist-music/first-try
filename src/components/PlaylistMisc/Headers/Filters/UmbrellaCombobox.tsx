import { Fragment, useContext, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { FilteringContext } from '@/contexts/FilteringContext';
import UMBRELLA_GENRES from '@/data/UMBRELLA_GENRES.json';
import UMBRELLA_WITH_SUBGENRES from '@/data/UMBRELLA_WITH_SUBGENRES.json';
import { mapUmbrellaToSubgenres } from '@/utils/grouping';
import { EveryNoiseGenre } from '@/types/myTypes';

const UmbrellaCombobox = () => {
  const { setUseUmbrellaGenres, setFilters, setUmbrellaGenres } =
    useContext(FilteringContext);
  const [selected, setSelected] = useState<EveryNoiseGenre>(
    {} as EveryNoiseGenre,
  );
  const [query, setQuery] = useState('');

  const filteredUmbrellaGenres =
    query === ''
      ? UMBRELLA_GENRES
      : UMBRELLA_GENRES.filter((umbrella) =>
          umbrella.genre
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        );

  return (
    <div className="top-16 w-72">
      <Combobox
        value={selected}
        onChange={(value) => {
          console.log(value);
          const selectedFilters = mapUmbrellaToSubgenres({
            umbrella: value.genre,
            genresGrouping: UMBRELLA_WITH_SUBGENRES,
          });
          if (selectedFilters) {
            setFilters((filters) => [...filters, ...selectedFilters]);
          }
          setUmbrellaGenres((umbrellaGenres) => {
            if (!umbrellaGenres.includes(value.genre)) {
              return [...umbrellaGenres, value.genre];
            } else {
              return umbrellaGenres;
            }
          });
          setUseUmbrellaGenres(true);
          setSelected(value);
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(umbrella) => umbrella.genre}
              onChange={(event) => setQuery(event.target.value)}
              placeholder='Search for an umbrella (e.g. "pop")'
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredUmbrellaGenres.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredUmbrellaGenres.map((umbrella, index) => (
                  <Combobox.Option
                    key={`${index}-umbrella-genre-${umbrella.genre}`}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-teal-600 text-white' : 'text-gray-900'
                      }`
                    }
                    value={umbrella}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {umbrella.genre}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default UmbrellaCombobox;
