/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faForwardStep,
  faBackwardStep,
  faShuffle,
  faRepeat,
  faCirclePlay,
  faCirclePause,
} from '@fortawesome/free-solid-svg-icons';

import { PlayingContext } from '@/contexts/PlayingContext';
import TransferPlayback from '@/services/spotify/transferPlayback';
import setRepeatMode from '@/services/spotify/setRepeatMode';
import togglePlaybackShuffle from '@/services/spotify/togglePlaybackShuffle';
import Volume from './PlayerMisc/Volume';
import ProgressBar from './PlayerMisc/ProgressBar';

const Player = () => {
  const {
    deviceId,
    setDeviceId,
    currentPlaybackState,
    setCurrentPlaybackState,
  } = useContext(PlayingContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  // weird way to do this, i think a ref is better
  //const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  const tokenRef = React.useRef<string>('');

  // const flagRef = useRef<boolean>(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    tokenRef.current = localStorage.getItem('access_token') ?? '';

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Relist Player',
        getOAuthToken: (cb) => {
          cb(tokenRef.current ?? '');
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', async ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);

        // (async () => {
        //   await TransferPlayback({ deviceId: device_id, play: false });
        // })();
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        setIsActive(false);
      });

      player.addListener(
        'player_state_changed',
        (state: Spotify.PlaybackState) => {
          if (!state) {
            return;
          }
          console.log('state_changed', { state });
          setCurrentPlaybackState(state);

          player.getCurrentState().then((state) => {
            console.log('getCurrentState', state);
            if (!state) {
              setIsActive(false);
            } else {
              setIsActive(true);
            }
          });
        },
      );

      player.connect();
    };

    return () => {
      if (player) {
        player.disconnect();
        player.removeListener('player_state_changed');
      }
    };
  }, [setCurrentPlaybackState, setDeviceId]);

  if (!player || !deviceId) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>Spotify Player is null</b>
          </div>
        </div>
      </>
    );
  } else if (!isActive) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            Instance not active. Transfer your playback using your Spotify app
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              TransferPlayback({ deviceId: deviceId, play: false });
            }}
          >
            click here to activate
          </button>
        </div>
      </>
    );
  }
  if (!currentPlaybackState) {
    return (
      <div>
        <h1>something is wrong with the player</h1>
      </div>
    );
  } else if (
    !currentPlaybackState.track_window ||
    !currentPlaybackState.track_window.current_track
  ) {
    return (
      <div>
        <h1>something is wrong with the player</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            TransferPlayback({ deviceId: deviceId, play: false });
          }}
        >
          click here to activate
        </button>
      </div>
    );
  } else {
    // const { context, track_window } = currentPlaybackState;
    // const { current_track } = track_window;

    const { paused, shuffle, repeat_mode } = currentPlaybackState;
    const { current_track } = currentPlaybackState.track_window;

    // The repeat mode. No repeat mode is 0, repeat context is 1 and repeat track is 2.

    return (
      <div id="player" className="flex flex-col  border-2 border-red-500">
        <img
          src={current_track?.album?.images[0]?.url ?? ''}
          alt={`${current_track?.name ?? 'no '} image`}
        />

        <ProgressBar
          currentPosition={currentPlaybackState.position}
          fullDuration={current_track.duration_ms}
          isPlaying={!paused}
          player={player}
        />

        <div className="flex flex-col gap-2 flex-wrap">
          <span>{current_track.name}</span>
          <span>{current_track.album.name}</span>
          <div className="artists flex gap-2 flex-wrap">
            {current_track.artists.map((artist, index) => {
              if (index === current_track.artists.length - 1) {
                return <span key={`player-${artist.uri}`}>{artist.name}</span>;
              } else {
                return <span key={`player-${artist.uri}`}>{artist.name},</span>;
              }
            })}
          </div>
        </div>
        <div className="controls flex  p-2 gap-3 text-xl justify-center">
          <div
            className="shuffle"
            onClick={async () => {
              await togglePlaybackShuffle({
                deviceId: deviceId,
                state: !shuffle,
              });
            }}
          >
            <FontAwesomeIcon
              icon={faShuffle}
              className={shuffle ? 'text-gray-900' : 'text-gray-400'}
              onClick={() => {
                console.log('fetch shuffle');
              }}
            />
          </div>
          <FontAwesomeIcon
            onClick={() => {
              player.previousTrack();
            }}
            icon={faBackwardStep}
          />

          <FontAwesomeIcon
            onClick={() => {
              player.togglePlay();
            }}
            icon={!paused ? faCirclePause : faCirclePlay}
          />

          <FontAwesomeIcon
            onClick={() => {
              player.nextTrack();
            }}
            icon={faForwardStep}
          />
          <div
            onClick={async () => {
              if (repeat_mode === 0) {
                await setRepeatMode({
                  deviceId: deviceId,
                  repeatMode: 'context',
                });
              } else if (repeat_mode === 1) {
                await setRepeatMode({
                  deviceId: deviceId,
                  repeatMode: 'track',
                });
              } else {
                setRepeatMode({ deviceId: deviceId, repeatMode: 'off' });
              }
            }}
          >
            {
              // The repeat mode. No repeat mode is 0, repeat context is 1 and repeat track is 2.
              repeat_mode == 0 ? (
                <FontAwesomeIcon icon={faRepeat} className="text-gray-400" />
              ) : repeat_mode == 1 ? (
                <FontAwesomeIcon icon={faRepeat} className="text-gray-600" />
              ) : (
                <div>
                  <FontAwesomeIcon icon={faRepeat} className="text-gray-900" />
                  <span>1</span>
                </div>
              )
            }
          </div>
        </div>
        <div>
          <Volume player={player} />
        </div>
      </div>
    );
  }
};

export default Player;
