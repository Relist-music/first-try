import Layout from '@/layouts/layout';
import fetchPlaylist from '@/services/spotify/fetchPlaylist';
import { PlaylistTrackObject } from '@/types/spotify-node-api';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

const PlaylistId = () => {
  const [playlistTrackObjects, setPlaylistTrackObjects] = useState<
    PlaylistTrackObject[]
  >([]);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    if (typeof id !== 'string') return;
    (async () => {
      const { tracks } = await fetchPlaylist({ playlistId: id });
      setPlaylistTrackObjects(tracks.items);
    })();
  }, [id]);

  if (playlistTrackObjects.length === 0) return <div>loading</div>;
  return (
    <div>
      {playlistTrackObjects.map(({ track }, index) => {
        if (track) {
          const { artists, id, name, album } = track;
          return (
            <div key={`${id}-${index}`} className="flex gap-2 mb-4">
              <img
                src={album.images.at(0)?.url}
                style={{ width: '80px', height: '80px' }}
                alt=""
              />
              <div className="">
                <div className="name">song: {name}</div>
                <div className="album">album: {album.name}</div>
                <div className="flex">
                  artist:
                  <div className="artists flex gap-2">
                    {artists.map(({ name }) => {
                      console.log(name);
                      return <div key={name}>{name}</div>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

PlaylistId.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PlaylistId;
