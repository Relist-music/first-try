import { RelistTrack } from '@/types/myTypes';

export function filterList({
  list,
  filters,
}: {
  list: RelistTrack[];
  filters: string[];
}) {
  const filteredList = list.filter((richGenreTrack: RelistTrack) => {
    if (filters.length === 0) {
      return true;
    } else {
      return filters.some((filter) => richGenreTrack.genres.includes(filter));
    }
  });
  return filteredList;
}
