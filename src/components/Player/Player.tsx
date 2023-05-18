import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faForwardStep,
  faBackwardStep,
  faShuffle,
  faRepeat,
  faCirclePlay,
  faCirclePause,
} from '@fortawesome/free-solid-svg-icons';
import { PlayingContext } from '@/pages/relist';

const Player = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentAudio,
    setCurrentAudio,
    setCurrentPlaylist,
  } = useContext(PlayingContext);
  // idk what active means
  const [isActive, setIsActive] = useState<boolean>(false);
  // weird way to do this, i think a ref is better
  //const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [player, setPlayer] = useState<Spotify.Player | null>(null);

  let token = '';
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    token = localStorage.getItem('access_token') ?? '';
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(token ?? '');
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) {
          return;
        }

        setCurrentAudio(state.track_window.current_track);
        setIsActive(state.paused);

        player.getCurrentState().then((state) => {
          if (!state) {
            setIsActive(false);
          } else {
            setIsActive(true);
          }
        });
      });

      player.connect();
    };
  }, [token]);

  useEffect(() => {
    console.log('player', player);
  });

  function togglePlay() {
    setIsPlaying((playing) => !playing);
    player?.togglePlay();
  }
  if (!player) {
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
            <b>
              Instance not active. Transfer your playback using your Spotify app
            </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div
        id="player"
        className="p-2 flex gap-3 text-xl justify-center border-2 border-red-500"
      >
        {currentAudio && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={`${currentAudio.name} image`}
            src={currentAudio.album.images[0].url}
          />
        )}
        <FontAwesomeIcon icon={faShuffle} color={'#545454'} />
        <FontAwesomeIcon icon={faBackwardStep} />

        <FontAwesomeIcon
          onClick={togglePlay}
          icon={isPlaying ? faCirclePlay : faCirclePause}
        />

        <FontAwesomeIcon icon={faForwardStep} />
        <FontAwesomeIcon icon={faRepeat} color={'#545454'} />
      </div>
    );
  }
};

export default Player;
