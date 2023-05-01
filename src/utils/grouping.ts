interface GenresGrouping {
  umbrella: string;
  subGenres: string[];
}

interface SpotifyGenres {
  genre: string;
  color: string;
  top: string;
  left: string;
}

declare function mapSubgenresToUmbrella({
  subGenres,
  genresGrouping,
}: {
  subGenres: string;
  genresGrouping: GenresGrouping[];
}) {};

declare function mapUmbrellaToSubgenres({
  umbrella,
  spotifyGenres,
}: {
  umbrella: string;
  spotifyGenres: SpotifyGenres[];
}) {};
