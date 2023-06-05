import Sidebar from '@/components/design-system/navigations/Sidebar/Sidebar';
import PlaylistEntry from '@/components/sidebar/PlaylistEntry';
import fetchMe from '@/services/spotify/fetchMe';
import fetchUserPlaylists from '@/services/spotify/fetchUserPlaylists';
import { PlaylistObjectSimplified } from '@/types/spotify-node-api';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
// import styles from './layout.module.css';
import Player from '@/components/Player/Player';
import PlayingContextProvider from '@/contexts/PlayingContext';

export default function Layout({ children }: { children: ReactNode }) {
  const [playlists, setPlaylists] = useState<PlaylistObjectSimplified[]>([]);

  useEffect(() => {
    (async () => {
      const me = await fetchMe();
      const fetchPlaylists = await fetchUserPlaylists({ userId: me.id });
      setPlaylists(fetchPlaylists.items);
    })();
  }, []);

  return (
    <PlayingContextProvider>
      <div className="flex w-screen h-screen">
        <Sidebar>
          <div className="player">
            <h1>Player</h1>
            <Player />
          </div>
          <br />
          <hr />
          <div className="flex flex-col gap-2 p-1">
            <div className="font-medium hover:cursor-pointer hover:text-blue-700">
              <Link href={`/relist/likes`}>
                <h1>Liked songs</h1>
              </Link>
            </div>
            <div>
              {playlists.length &&
                playlists.map((item) => {
                  return <PlaylistEntry key={item.id} entry={item} />;
                })}
            </div>
          </div>
        </Sidebar>
        <div>{children}</div>
      </div>
    </PlayingContextProvider>
  );
}
