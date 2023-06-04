/* eslint-disable @typescript-eslint/no-empty-function */
import { Recording } from '@/types/myTypes';
import { ReactNode, createContext, useState } from 'react';

export type PlayingContextType = {
  currentPlaybackState: Spotify.PlaybackState | null;
  setCurrentPlaybackState: React.Dispatch<
    React.SetStateAction<Spotify.PlaybackState | null>
  >;

  currentPlaylist: Recording[] | null;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Recording[] | null>>;

  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;

  deviceId: string | null;
  setDeviceId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const PlayingContext = createContext<PlayingContextType>({
  currentPlaybackState: null,
  setCurrentPlaybackState: () => {},

  currentPlaylist: null,
  setCurrentPlaylist: () => {},

  isPlaying: false,
  setIsPlaying: () => {},

  deviceId: null,
  setDeviceId: () => {},
});

const PlayingContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentPlaybackState, setCurrentPlaybackState] =
    useState<Spotify.PlaybackState | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Recording[] | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [deviceId, setDeviceId] = useState<string | null>(null);

  const PlayingContextValue = {
    currentPlaybackState,
    setCurrentPlaybackState,
    currentPlaylist,
    setCurrentPlaylist,
    isPlaying,
    setIsPlaying,
    deviceId,
    setDeviceId,
  };

  return (
    <PlayingContext.Provider value={PlayingContextValue}>
      {children}
    </PlayingContext.Provider>
  );
};

export default PlayingContextProvider;
