import { RelistGenre, GenresGrouping } from '@/types/myTypes';
import { UmbrellaGenre2 } from '@/types/myTypes2';

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
  countedGenre: Pick<RelistGenre, 'name' | 'count'>,
  genresGrouping: GenresGrouping[],
) {
  const [key, count] = [countedGenre['name'], countedGenre['count']];

  const umbrellaGenre = mapSubgenresToUmbrella({
    subGenre: key,
    genresGrouping,
  });

  if (umbrellaGenre) {
    return {
      name: umbrellaGenre,
      count,
    };
  }
}

export function groupGenre(
  countedGenres: Pick<RelistGenre, 'name' | 'count'>[],
  umbrellaWithSubGenreList: GenresGrouping[],
  umbrellaGenreList: UmbrellaGenre2[],
) {
  const umbrellaGroupedData: RelistGenre[] = [];

  countedGenres.forEach((countedGenre) => {
    const umbrella = groupSubGenreToUmbrella(
      countedGenre,
      umbrellaWithSubGenreList,
    );

    if (umbrella) {
      const match = umbrellaGenreList.find((g) => g.genre === umbrella.name);

      if (match) {
        const convertedMatch = {
          ...match,
          size: Number(match.size),
          top: Number(match.top),
          left: Number(match.left),
        };

        const existingUmbrella = umbrellaGroupedData.find(
          (g) => g.name === umbrella.name,
        );

        if (existingUmbrella) {
          existingUmbrella.count += countedGenre.count;
        } else {
          umbrellaGroupedData.push({
            ...convertedMatch,
            name: umbrella.name,
            count: countedGenre.count,
          });
        }
      }
    }
  });

  return umbrellaGroupedData;
}
