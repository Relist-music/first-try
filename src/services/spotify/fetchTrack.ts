// https://api.spotify.com/v1/tracks/

import { SingleTrackResponse } from '@/types/spotify-node-api';
import { getSpotify } from './getSpotify';

export const fetchTrack = async ({ id }: { id: string }) => {
  const data = await getSpotify<SingleTrackResponse>({
    url: `https://api.spotify.com/v1/tracks/${id}`,
  });

  return data;
};

export default fetchTrack;
