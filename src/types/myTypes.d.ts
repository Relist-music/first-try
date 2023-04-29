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

export interface GENRES_OBJECT {
  genre: string;
  color: string;
  size: number;
  top: number;
  left: number;
}

export interface GENRES_OBJECT_WITH_COUNT extends GENRES_OBJECT {
  count: number;
}
