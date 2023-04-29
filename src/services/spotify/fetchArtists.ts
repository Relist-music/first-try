import queryString from 'query-string';
import { getSpotify } from './getSpotify';
import { MultipleArtistsResponse } from '@/types/spotify-node-api';

export const fetchArtists = async ({ artistIds }: { artistIds: string[] }) => {
  const data = await getSpotify<MultipleArtistsResponse>({
    url: queryString.stringifyUrl({
      url: 'https://api.spotify.com/v1/artists',
      query: {
        ids: artistIds.join(','),
      },
    }),
  });

  return data;
};

export default fetchArtists;
