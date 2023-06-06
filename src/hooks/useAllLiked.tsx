import { getSpotify } from '@/services/spotify/getSpotify';
import { PagingObject, SavedTrackObject } from '@/types/spotify-node-api';
import { useQuery } from '@tanstack/react-query';

const useAllLiked = () => {
  const { data: liked, isLoading } = useQuery<SavedTrackObject[]>(
    ['likedTracks'],
    async () => {
      let allSavedTracks = [] as SavedTrackObject[];
      let nextUrl = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50';
      while (nextUrl) {
        const { items, next } = await getSpotify<
          PagingObject<SavedTrackObject>
        >({
          url: nextUrl,
        });
        allSavedTracks = [...allSavedTracks, ...items];
        // nextUrl = savedTrackData.next ?? '';
        nextUrl = '';
      }
      return allSavedTracks;
    },
  );
  return { liked, isLoading };
};

export default useAllLiked;
