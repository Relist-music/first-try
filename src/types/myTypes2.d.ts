export type Stringify<T> = {
  [K in keyof T]: string;
}[keyof T];

export interface GenresGrouping {
  umbrella: string;
  subGenres: string[];
}

export interface RelistGenreCount {
  count: number;
  color: string;
  size: number;
  top: number;
  left: number;
}

export interface RelistGenre {
  count: number;
  color: string;
  size: number;
  top: number;
  left: number;
  name: string;
}

export interface EveryNoiseGenreWithCount {
  genre: string;
  size: string;
  top: string;
  left: string;
  count: number;
  color: string;
}

export interface EveryNoiseGenre2 {
  genre: string;
  color: string;
  size: string;
  top: string;
  left: string;
}

export interface UmbrellaGenre2 {
  genre: string;
  color: string;
  size: string | null;
  top: string | null;
  left: string | null;
  alreadyInAllGenres: boolean;
}

type ISODateString = string;

interface UsefullArtist {
  name: string;
  id: string;
  genres: string[] | ExtendedGenre[];
}

export interface GenreAggregateV1 {
  trackId: string;
  trackName: string;
  trackArtists: UsefullArtist[];
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
