import useAllLiked from '@/hooks/useAllLiked';
import Playlist from '@/components/Playlist';
import Player from '@/components/Player/Player';
import { Recording } from '@/types/myTypes';
import { useState } from 'react';
import { PlayingContext } from '@/contexts/PlayingContext';

const Relist = () => {
  const { liked, isLoading } = useAllLiked();
  const [currentAudio, setCurrentAudio] = useState<Spotify.Track | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Recording[] | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const PlayingContextValue = {
    currentAudio,
    setCurrentAudio,
    currentPlaylist,
    setCurrentPlaylist,
    isPlaying,
    setIsPlaying,
    deviceId,
    setDeviceId,
  };

  return (
    <>
      <PlayingContext.Provider value={PlayingContextValue}>
        <Player />
        <h1>You are currently connected to relist</h1>
        <h2>you should be happy 😀</h2>
        {isLoading ? <h1>Loading...</h1> : <h1>Success</h1>}
        {!isLoading && liked && <Playlist list={liked} />}
      </PlayingContext.Provider>
    </>
  );
};

export default Relist;
