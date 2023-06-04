import { RelistTrack } from '@/types/myTypes';
import { pickRandomEntries } from '@/utils/pickRandomEntries';

export function pickRecommandations({ list }: { list: RelistTrack[] }) {
  // debugger;
  if (list.length === 0) {
    return [];
  } else if (list.length < 5) {
    return pickRandomEntries(list, list.length);
  } else {
    return pickRandomEntries(list, 5);
  }
}
