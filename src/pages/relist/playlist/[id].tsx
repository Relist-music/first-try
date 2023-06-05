import Layout from '@/layouts/layout';
import fetchPlaylist from '@/services/spotify/fetchPlaylist';
import { PlaylistTrackObject } from '@/types/spotify-node-api';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

const PlaylistId = () => {
  const [tracks, setTracks] = useState<PlaylistTrackObject[]>([]);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    if (typeof id !== 'string') return;
    (async () => {
      const something = await fetchPlaylist({ playlistId: id });
      setTracks(something.tracks.items);
    })();
  });
  if (tracks.length === 0) return <div>loading</div>;
  return (
    <div>
      {tracks.map((track) => {
        return <div key={track?.track?.id}>{track?.track?.name}</div>;
      })}
    </div>
  );
};

PlaylistId.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlaylistId;
