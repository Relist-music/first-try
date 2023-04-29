import queryString from 'query-string';
import fetchSpotify from './fetchSpotify';
import { SavedTrackObject } from '@/types/spotify-node-api';

export const fetchLiked = async () => {
  const data = await fetchSpotify<SavedTrackObject>({
    url: queryString.stringifyUrl({
      url: 'https://api.spotify.com/v1/me/tracks',
    }),
  });

  console.log(data);

  return data;
};

export default fetchLiked;
