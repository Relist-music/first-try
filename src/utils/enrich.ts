import { RelistGenre } from '@/types/myTypes';
import { EveryNoiseGenre2 } from '@/types/myTypes2';
// import SUBGENRES from '@/data/SUBGENRES.json';

export function enrichSubgenre({
  genreWithCount,
  genreObjectList,
}: {
  genreWithCount: Pick<RelistGenre, 'name' | 'count'>;
  genreObjectList: EveryNoiseGenre2[];
}): RelistGenre {
  // for of loop of genre
  const genre = genreWithCount.name;
  const match = genreObjectList.find((g) => g.genre === genre);
  if (!match) {
    return {
      ...genreWithCount,
      name: genre,
      color: 'black',
      size: 0,
      left: 0,
      top: 0,
    };
  } else {
    return {
      ...genreWithCount,
      name: match.genre,
      color: match.color,
      size: Number(match.size),
      left: Number(match.left),
      top: Number(match.top),
    };
  }
}
