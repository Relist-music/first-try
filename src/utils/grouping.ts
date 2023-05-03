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

// function groupGenres(
//   data: Record<string, number>,
//   subGenreData: SubGenreData,
// ): Record<string, Genre> {
//   const groupedData: Record<string, Genre> = {};

//   for (const genre in data) {
//     const count = data[genre];
//     let umbrellaGenre = genre;

//     for (const subGenreKey in subGenreData) {
//       const subGenres = subGenreData[subGenreKey].subGenres;
//       const foundSubGenre = subGenres.find((sub) => sub.genre === genre);
//       if (foundSubGenre) {
//         umbrellaGenre = subGenreKey;
//         break;
//       }
//     }

//     if (!groupedData[umbrellaGenre]) {
//       groupedData[umbrellaGenre] = {
//         genre: umbrellaGenre,
//         count: 0,
//         color: subGenreData[umbrellaGenre]?.color || '',
//         size: subGenreData[umbrellaGenre]?.size || 0,
//         top: subGenreData[umbrellaGenre]?.top || 0,
//         left: subGenreData[umbrellaGenre]?.left || 0,
//       };
//     }

//     groupedData[umbrellaGenre].count += count;
//   }

//   return groupedData;
// }
