// https://api.spotify.com/v1/playlists/{playlist_id}

import { PlaylistObjectFull } from '@/types/spotify-node-api';
import { getSpotify } from './getSpotify';

export const fetchPlaylist = async ({ playlistId }: { playlistId: string }) => {
  const data = await getSpotify<PlaylistObjectFull>({
    url: `https://api.spotify.com/v1/playlists/${playlistId}`,
  });

  return data;
};

export default fetchPlaylist;
