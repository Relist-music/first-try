import useAllLiked from '@/hooks/useAllLiked';
import Playlist from '@/components/Playlist';
import Player from '@/components/Player/Player';
import { Recording } from '@/types/myTypes';
import { createContext, useState } from 'react';

export type PlayingContextType = {
  currentAudio: Spotify.Track | null;
  setCurrentAudio: React.Dispatch<React.SetStateAction<Spotify.Track | null>>;
  currentPlaylist: Recording[] | null;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Recording[] | null>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlayingContext = createContext<PlayingContextType>({
  currentAudio: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentAudio: () => {},
  currentPlaylist: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCurrentPlaylist: () => {},
  isPlaying: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsPlaying: () => {},
});

const Relist = () => {
  const { liked, isLoading } = useAllLiked();
  const [currentAudio, setCurrentAudio] = useState<Spotify.Track | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Recording[] | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const PlayingContextValue = {
    currentAudio,
    setCurrentAudio,
    currentPlaylist,
    setCurrentPlaylist,
    isPlaying,
    setIsPlaying,
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
