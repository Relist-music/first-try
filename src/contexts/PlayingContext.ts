/* eslint-disable @typescript-eslint/no-empty-function */
import { Recording } from '@/types/myTypes';
import { createContext } from 'react';

export type PlayingContextType = {
  currentAudio: Spotify.Track | null;
  setCurrentAudio: React.Dispatch<React.SetStateAction<Spotify.Track | null>>;

  currentPlaylist: Recording[] | null;
  setCurrentPlaylist: React.Dispatch<React.SetStateAction<Recording[] | null>>;

  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;

  deviceId: string | null;
  setDeviceId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const PlayingContext = createContext<PlayingContextType>({
  currentAudio: null,
  setCurrentAudio: () => {},

  currentPlaylist: null,
  setCurrentPlaylist: () => {},

  isPlaying: false,
  setIsPlaying: () => {},

  deviceId: null,
  setDeviceId: () => {},
});
