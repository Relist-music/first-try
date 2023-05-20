import { useContext } from 'react';
import { GenreAggregateV1 } from '@/types/myTypes';
import UMBRELLA_WITH_SUBGENRES from '@/data/UMBRELLA_WITH_SUBGENRES.json';
import { FilterContext } from '@/contexts/filteringContext';

export const GenreCell = ({
  richGenreTrack,
}: {
  richGenreTrack: GenreAggregateV1;
}) => {
  const { useUmbrellaGenres, umbrellaGenres, setFilters, setUmbrellaGenres } =
    useContext(FilterContext);

  if (richGenreTrack.genres.length === 0) {
    return (
      <span className="text-switzer italic font-medium">No genres 😱</span>
    );
  } else if (useUmbrellaGenres) {
    return (
      <>
        {richGenreTrack.genres
          .map((genre: string) => {
            let value = genre;
            UMBRELLA_WITH_SUBGENRES.forEach((umbrella) => {
              const foundSubGenre = umbrella.subGenres.find(
                (subgenre) => subgenre === genre,
              );

              if (foundSubGenre) {
                value = umbrella.umbrella;
              }
            });
            return value;
          })
          .reduce((accumulator: string[], currentValue) => {
            //filter
            if (!accumulator.includes(currentValue)) {
              accumulator.push(currentValue);
            }
            return accumulator;
          }, [])
          .map((groupedGenre, index) => (
            <span
              className="underline font-apfel text-gray-600 cursor-pointer hover:text-gray-900"
              key={`${richGenreTrack.trackId}-${groupedGenre}-${index}`}
              onClick={() => {
                debugger;
                console.log('clicked');
                const match = UMBRELLA_WITH_SUBGENRES.find(
                  (g) => g.umbrella === groupedGenre,
                );

                if (match) {
                  const inUmbrellaList = umbrellaGenres.includes(
                    match.umbrella,
                  );
                  if (!inUmbrellaList) {
                    setFilters((filters) => [...match.subGenres, ...filters]);
                    setUmbrellaGenres((umbrellas) => [
                      match.umbrella,
                      ...umbrellas,
                    ]);
                  } else {
                    debugger;
                    setUmbrellaGenres((umbrellas) => {
                      debugger;
                      const a = umbrellas.filter(
                        (umbrella) => umbrella !== match.umbrella,
                      );
                      return a;
                    });
                    setFilters((filters) =>
                      filters.filter((f) => !match.subGenres.includes(f)),
                    );
                  }
                }
              }}
            >
              {groupedGenre}
            </span>
          ))}
      </>
    );
  } else {
    return (
      <>
        {richGenreTrack.genres.map((genre, index) => (
          <span
            className="underline font-apfel text-gray-600 cursor-pointer hover:text-gray-900"
            key={`${richGenreTrack.trackId}-${genre}-${index}`}
            onClick={() => {
              setFilters((filters) =>
                filters.includes(genre)
                  ? filters.filter((filter) => filter !== genre)
                  : [...filters, genre],
              );
            }}
          >
            {genre}
          </span>
        ))}
      </>
    );
  }
};

export default GenreCell;
