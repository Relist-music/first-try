import fetchArtists from '@/services/spotify/fetchArtists';
import { getSpotify } from '@/services/spotify/getSpotify';
import { RelistTrack } from '@/types/myTypes';
import { PagingObject, SavedTrackObject } from '@/types/spotify-node-api';
import { useQuery } from '@tanstack/react-query';

const useAllLiked = () => {
  const { data: liked, isLoading } = useQuery<RelistTrack[]>(
    ['likedTracks'],
    async () => {
      let allLikedTracks = [] as any;
      let nextUrl = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50';
      while (nextUrl) {
        const savedTrackData = await getSpotify<PagingObject<SavedTrackObject>>(
          {
            url: nextUrl,
          },
        );
        const newData = (await Promise.all(
          savedTrackData.items.map(async (item, index) => {
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
        allLikedTracks = [...allLikedTracks, ...newData];
        nextUrl = savedTrackData.next ?? '';
        // nextUrl = '';
      }
      return allLikedTracks;
    },
  );
  return { liked, isLoading };
};

export default useAllLiked;
