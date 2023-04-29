import { FilterContext } from '@/components/Playlist';
import { useContext } from 'react';
import { GenreButton } from './GenreButton';
import { useState, useEffect } from 'react';
import savedGenresAggregate from '@/data/GENRES_GROUPING_EXTENDED_COLORIZED.json';
import initialSpotifyGenres from '@/data/initial-spotify-genres-4600-with-color.json';
import { GENRES_OBJECT_WITH_COUNT } from '@/types/myTypes';
import { Switch } from '@headlessui/react';

function groupGenres(
  data: Record<string, number>,
  subGenreData: SubGenreData,
): Record<string, Genre> {
  const groupedData: Record<string, Genre> = {};

  for (const genre in data) {
    const count = data[genre];
    let umbrellaGenre = genre;

    for (const subGenreKey in subGenreData) {
      const subGenres = subGenreData[subGenreKey].subGenres;
      const foundSubGenre = subGenres.find((sub) => sub.genre === genre);
      if (foundSubGenre) {
        umbrellaGenre = subGenreKey;
        break;
      }
    }

    if (!groupedData[umbrellaGenre]) {
      groupedData[umbrellaGenre] = {
        genre: umbrellaGenre,
        count: 0,
        color: subGenreData[umbrellaGenre]?.color || '',
        size: subGenreData[umbrellaGenre]?.size || 0,
        top: subGenreData[umbrellaGenre]?.top || 0,
        left: subGenreData[umbrellaGenre]?.left || 0,
      };
    }

    groupedData[umbrellaGenre].count += count;
  }

  return groupedData;
}

export default GenreList;

const GenreList = () => {
  // eslint-disable-next-line prettier/prettier
  const [umbrellaGenres, setUmbrellaGenres] = useState<GENRES_OBJECT_WITH_COUNT[]>([]);
  const [enrichedOverall, setEnrichedOverall] = useState<
    GENRES_OBJECT_WITH_COUNT[]
  >([]);
  const { overall, useUmbrellaGenres, setUseUmbrellaGenres } =
    useContext(FilterContext);
  const [showAllGenres, setShowAllGenres] = useState(false);
  const hasLotOfGenres = Object.keys(overall).length > 10;
  useEffect(() => {
    setEnrichedOverall(
      Object.entries(overall).map((subGenre) => {
        const match = initialSpotifyGenres.find(
          (genreObj) => genreObj.genre === subGenre[0],
        );
        return {
          genre: match?.genre || subGenre[0],
          count: subGenre[1],
          // eslint-disable-next-line prettier/prettier
          color:
            match?.color ||
            `rgb(${Math.random() * 255},${Math.random() * 255},${
              Math.random() * 255
            })`,
          size: Number(match?.size) || NaN,
          left: Number(match?.left) || NaN,
          top: Number(match?.top) || NaN,
        };
      }),
    );
  }, [overall]);

  useEffect(() => {
    if (useUmbrellaGenres) {
      const groupedGenres = groupGenres(overall, savedGenresAggregate);
      console.log('groupedGenres', groupedGenres);
      setUmbrellaGenres(Object.values(groupedGenres));
    }
  }, [overall, useUmbrellaGenres]);

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
                  genre={genre.genre}
                  count={genre.count}
                  index={index}
                  color={genre.color}
                />
              ))
          : enrichedOverall
          ? enrichedOverall
              .sort((a, b) => {
                return a.count < b.count ? 1 : -1;
              })
              .filter((_, index) =>
                hasLotOfGenres ? (showAllGenres ? true : index < 10) : true,
              )
              .map((genre, index) => (
                <GenreButton
                  key={`${index}-orevall-${genre}`}
                  genre={genre.genre}
                  count={genre.count}
                  index={index}
                  color={genre.color}
                />
              ))
          : Object.entries(overall)
              .sort((a, b) => b[1] - a[1])
              .filter((_, index) =>
                hasLotOfGenres ? (showAllGenres ? true : index < 10) : true,
              )
              .map(([genre, count], index) => (
                <GenreButton
                  key={`${index}-orevall-${genre}`}
                  genre={genre}
                  count={count}
                  index={index}
                />
              ))}
      </div>
      {hasLotOfGenres && (
        <div
          className="my-1 border-2 border-black w-max rounded-md px-2 py-1 cursor-pointer"
          onClick={() => setShowAllGenres(!showAllGenres)}
        >
          {showAllGenres ? (
            <span className="font-apfel text-red-500 ">Hide low genres</span>
          ) : (
            <span className="font-apfel text-red-500">Show all genres</span>
          )}
        </div>
      )}
    </div>
  );
};
interface Genre {
  genre: string;
  count: number;
  color: string;
  size: number;
  top: number;
  left: number;
}

interface SubGenre {
  genre: string;
  color: string;
  size: number;
  top: number;
  left: number | null;
  subGenres: Array<{ genre: string }>;
}

type SubGenreData = Record<string, SubGenre>;
