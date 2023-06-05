import queryString from 'query-string';
import { getSpotify } from './getSpotify';
import { ListOfUsersPlaylistsResponse } from '@/types/spotify-node-api';

export const fetchTracks = async ({ userId }: { userId: string }) => {
  const data = await getSpotify<ListOfUsersPlaylistsResponse>({
    url: queryString.stringifyUrl({
      url: `https://api.spotify.com/v1/users/${userId}/playlists`,
    }),
  });

  return data;
};

export default fetchTracks;
