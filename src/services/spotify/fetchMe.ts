import { UserObjectPrivate } from '@/types/spotify-node-api';
import { getSpotify } from './getSpotify';

export const fetchMe = async () => {
  const data = await getSpotify<UserObjectPrivate>({
    url: 'https://api.spotify.com/v1/me',
  });

  return data;
};

export default fetchMe;
