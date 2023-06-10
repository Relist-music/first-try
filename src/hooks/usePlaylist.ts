import fetchArtists from '@/services/spotify/fetchArtists';
import { getSpotify } from '@/services/spotify/getSpotify';
import { RelistTrack } from '@/types/myTypes';
import { PlaylistObjectFull } from '@/types/spotify-node-api';
import { useQuery } from '@tanstack/react-query';

const usePlaylist = ({ playlistId }: { playlistId: string }) => {
  console.log('here', playlistId);
  const { data: RelistPlaylistTracks, isLoading } = useQuery<RelistTrack[]>(
    ['playlist', playlistId],
    async () => {
      let allPlaylistTracks = [] as any;
      let nextUrl = `https://api.spotify.com/v1/playlists/${playlistId}?offset=0&limit=50`;
      console.log('nextUrl', nextUrl);
      while (nextUrl) {
        const { tracks } = await getSpotify<PlaylistObjectFull>({
          url: nextUrl,
        });
        const newData = (await Promise.all(
          tracks.items.map(async (item, index) => {
            if (!item.track) return null;
            const { artists: fetchedArtists } = await fetchArtists({
              artistIds: item.track.artists.map((artist) => artist.id),
            });
            return {
              indexInList: index,
              trackId: item.track.id,
              trackName: item.track.name,
              trackUri: item.track.uri,
              trackArtists: fetchedArtists.map((artist) => ({
                id: artist.id,
                name: artist.name,
                genres: artist.genres,
              })),
              genres: fetchedArtists.map((artist) => artist.genres).flat(),
              haveMultipleArtists: item.track.artists.length > 1,
              isrc: item.track.external_ids.isrc,
              album: {
                name: item.track.album.name,
                images: item.track.album.images,
              },
              added_at: item.added_at,
              duration_ms: item.track.duration_ms,
              list: 'liked',
            };
          }),
        )) as RelistTrack[];
        allPlaylistTracks = [...allPlaylistTracks, ...newData];
        // nextUrl = savedTrackData.next ?? '';
        nextUrl = '';
      }
      return allPlaylistTracks;
    },
  );
  return { RelistPlaylistTracks, isLoading };
};

export default usePlaylist;
