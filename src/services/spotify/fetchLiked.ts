import queryString from 'query-string';
import { getWaitedSpotify } from './getSpotify';
import { SavedTrackObject } from '@/types/spotify-node-api';

export const fetchLiked = async () => {
  const data = await getWaitedSpotify<SavedTrackObject>({
    url: queryString.stringifyUrl({
      url: 'https://api.spotify.com/v1/me/tracks',
    }),
  });

  console.log(data);

  return data;
};

export default fetchLiked;
