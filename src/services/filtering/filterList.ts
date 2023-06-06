import { RelistTrack } from '@/types/myTypes';
import { SavedTrackObject } from '@/types/spotify-node-api';

export function filterList({
  list,
  filters,
}: {
  list: SavedTrackObject[];
  filters: string[];
}) {
  const filteredList = list.filter((richGenreTrack: SavedTrackObject) => {
    if (filters.length === 0) {
      return true;
    } else {
      return filters.some((filter) => richGenreTrack.genres.includes(filter));
    }
  });
  return filteredList;
}
