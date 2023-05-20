import queryString from 'query-string';
import { getSpotify } from './getSpotify';
import { MultipleTracksResponse } from '@/types/spotify-node-api';

export const fetchTracks = async ({ tracksIds }: { tracksIds: string[] }) => {
  const data = await getSpotify<MultipleTracksResponse>({
    url: queryString.stringifyUrl({
      url: 'https://api.spotify.com/v1/artists',
      query: {
        ids: tracksIds.join(','),
      },
    }),
  });

  return data;
};

export default fetchTracks;
