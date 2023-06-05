import { PlaylistObjectSimplified } from '@/types/spotify-node-api';
import Link from 'next/link';

const PlaylistEntry = ({ entry }: { entry: PlaylistObjectSimplified }) => {
  return (
    <div className="font-medium hover:cursor-pointer hover:text-blue-700">
      <Link href={`/relist/playlist/${entry.id}`}>{entry.name}</Link>;
    </div>
  );
};

export default PlaylistEntry;
