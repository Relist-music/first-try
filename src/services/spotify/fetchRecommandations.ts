import { RecommendationsFromSeedsResponse } from '@/types/spotify-node-api';
import { getSpotify } from './getSpotify';
import queryString from 'query-string';

interface RecommandationCoreValue {
  seed_artists: string;
  seed_genres: string;
  seed_tracks: string;
}

export function validateRecommandationsCoreValues({
  artistList,
  genreList,
  trackList,
}: {
  artistList: string[];
  genreList: string[];
  trackList: string[];
}) {
  const [artistListLength, genreListLength, trackListLength] = [
    artistList.length,
    genreList.length,
    trackList.length,
  ];

  const sum = artistListLength + genreListLength + trackListLength;

  if (sum < 1) {
    throw new Error('At least one seed is required');
  } else if (sum > 5) {
    throw new Error('A maximum of 5 seeds is allowed');
  } else {
    return {
      seed_artists: artistList.join(','),
      seed_genres: genreList.join(','),
      seed_tracks: trackList.join(','),
    };
  }
}

export const fetchRecommandations = async ({
  seed_artists,
  seed_genres,
  seed_tracks,
}: RecommandationCoreValue & {
  limit?: number;
}) => {
  const data = await getSpotify<RecommendationsFromSeedsResponse>({
    url: queryString.stringifyUrl({
      url: 'https://api.spotify.com/v1/recommendations',
      query: {
        seed_artists,
        seed_genres,
        seed_tracks,
        limit: 20,
      },
    }),
  });

  return data;
};

export default fetchRecommandations;
