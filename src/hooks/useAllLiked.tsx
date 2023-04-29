import fetchArtists from '@/services/spotify/fetchArtists';
import { getWaitedSpotify } from '@/services/spotify/fetchSpotify';
import { GenreAggregateV1 } from '@/types/myTypes';
import { PagingObject, SavedTrackObject } from '@/types/spotify-node-api';
import { useState, useEffect } from 'react';

const useAllLiked = () => {
  const [liked, setLiked] = useState<GenreAggregateV1[]>([]);

  useEffect(() => {
    const fetchAllLikedTracks = async () => {
      let allLikedTracks = [] as any;
      let nextUrl = 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50';
      while (nextUrl) {
        const savedTrackData = await getWaitedSpotify<
          PagingObject<SavedTrackObject>
        >({
          url: nextUrl,
        });
        console.log('savedTrackData', savedTrackData);
        const newData = (await Promise.all(
          savedTrackData.items.map(async (item) => {
            const { artists: fetchedArtists } = await fetchArtists({
              artistIds: item.track.artists.map((artist) => artist.id),
            });
            return {
              trackId: item.track.id,
              trackName: item.track.name,
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
            };
          }),
        )) as GenreAggregateV1[];
        allLikedTracks = [...allLikedTracks, ...newData];
        nextUrl = savedTrackData.next ? savedTrackData.next : '';
        //nextUrl = '';
      }

      setLiked(allLikedTracks);
    };

    fetchAllLikedTracks();
  }, []);

  // useEffect(() => {
  //   console.log(liked);
  // }, [liked]);

  return [liked];
};

export default useAllLiked;
