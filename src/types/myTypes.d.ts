export type Stringify<T> = {
  [K in keyof T]: string;
}[keyof T];

export interface GenresGrouping {
  umbrella: string;
  subGenres: string[];
}

export interface RelistGenre {
  /**
   * The genre name
   */
  name: string;

  /**
   * genre are used in playlist, count are the number of occurence of this genre in the playlist
   */
  count: number;

  /**
   * The genre color, according to the everynoise.com color
   */
  color: string;

  /**
   * The genre size, according to the everynoise.com size
   */
  size: number;

  /**
   * The genre top, according to the everynoise.com top
   */
  top: number;

  /**
   * The genre left, according to the everynoise.com left
   */
  left: number;
}

export type EveryNoiseGenreWithCount = Omit<RelistGenre, 'name'> & {
  genre: RelistGenre['name'];
  size: string;
  top: string;
  left: string;
};

export type EveryNoiseGenre = Omit<
  EveryNoiseGenreWithCount,
  'count' | 'color'
> & {
  genre: RelistGenre['name'];
  color: number;
  size: number;
  top: number;
  left: number;
};

export interface UmbrellaGenre extends EveryNoiseGenre {
  size: string | null;
  top: string | null;
  left: string | null;
  alreadyInAllGenres: boolean;
}

type ISODateString = string;

interface usefullArtist {
  name: string;
  id: string;
  genres: ExtendedGenre | string[];
}

export interface GenreAggregateV1 {
  trackId: string;
  trackName: string;
  trackArtists: usefullArtist[];
  genres: string[];
  haveMultipleArtists: boolean;
  isrc: string;
  album: {
    name: string;
    images: {
      height: number;
      width: number;
      url: string;
    }[];
  };
  added_at: ISODateString;
  duration_ms: number;
}
