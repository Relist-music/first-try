import { CountedGenre } from '@/types/myTypes';

interface GenresGrouping {
  umbrella: string;
  subGenres: string[];
}

export function mapSubgenresToUmbrella({
  subGenre,
  genresGrouping,
}: {
  subGenre: string;
  genresGrouping: GenresGrouping[];
}) {
  return genresGrouping.find(({ subGenres }) => subGenres.includes(subGenre))
    ?.umbrella;
}

export function mapUmbrellaToSubgenres({
  umbrella,
  genresGrouping,
}: {
  umbrella: string;
  genresGrouping: GenresGrouping[];
}) {
  return genresGrouping.find(({ umbrella: u }) => u === umbrella)?.subGenres;
}

export function groupSubGenreToUmbrella(
  countedGenre: CountedGenre,
  genresGrouping: GenresGrouping[],
) {
  const umbrellaGroupedData: CountedGenre = {};

  for (const countedGenreKey in countedGenre) {
    const [key, count] = [countedGenreKey, countedGenre[countedGenreKey]];

    const umbrellaGenre = mapSubgenresToUmbrella({
      subGenre: key,
      genresGrouping,
    });

    if (umbrellaGenre) {
      if (umbrellaGroupedData[umbrellaGenre]) {
        umbrellaGroupedData[umbrellaGenre] += count;
      } else {
        umbrellaGroupedData[umbrellaGenre] = count;
      }
    }
  }
  return umbrellaGroupedData;
}
