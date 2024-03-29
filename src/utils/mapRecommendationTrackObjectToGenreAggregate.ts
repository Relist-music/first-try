import fetchArtists from '@/services/spotify/fetchArtists';
import { RelistTrack } from '@/types/myTypes';
import { RecommendationTrackObject } from '@/types/spotify-node-api';

export function mapRecommendationTrackObjectToGenreAggregate(
  data: RecommendationTrackObject,
  index: number,
): RelistTrack {
  return {
    indexInList: index,
    trackId: data.id,
    trackName: data.name,
    trackUri: data.uri,
    trackArtists: data.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      genres: '',
      externalUrls: artist.external_urls,
    })),
    genres: [], // Fill this array with the appropriate genre data
    haveMultipleArtists: data.artists.length > 1,
    isrc: data.external_ids.isrc ?? '',
    album: {
      name: data.album.name,
      images: data.album.images,
    },
    added_at: '', // Fill this with the appropriate added_at value
    duration_ms: data.duration_ms,
    list: 'recommandation',
  };
}

export async function asyncMapRecommendationTrackObjectToGenreAggregate(
  data: RecommendationTrackObject,
  index: number,
): Promise<RelistTrack> {
  const fetchedArtists = await fetchArtists({
    artistIds: data.artists.map((artist) => artist.id),
  });
  return {
    indexInList: index,
    trackId: data.id,
    trackName: data.name,
    trackUri: data.uri,
    trackArtists: data.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      genres: '',
      externalUrls: artist.external_urls,
    })),
    genres: fetchedArtists.artists.map((artist) => artist.genres).flat(),
    haveMultipleArtists: data.artists.length > 1,
    isrc: data.external_ids.isrc ?? '',
    album: {
      name: data.album.name,
      images: data.album.images,
    },
    added_at: '', // Fill this with the appropriate added_at value
    duration_ms: data.duration_ms,
    list: 'recommandation',
  };
}
