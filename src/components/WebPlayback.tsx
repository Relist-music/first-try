import React, { useState, useEffect, useContext } from 'react';
import { FilterContext } from './Playlist';
import fetchTrack from '@/services/spotify/fetchTrack';
import { ImageObject } from '@/types/spotify-node-api';

interface PlayableTrack {
  id: string;
  name: string;
  album: {
    images: ImageObject[];
  };
  artists: [
    {
      name: string;
      id: string;
    },
  ];
}

function WebPlayback({ token }: { token: string | null }) {
  const { tracksToPlayIds } = useContext(FilterContext);
  const [is_paused, setPaused] = useState<boolean>(false);
  const [is_active, setActive] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [current_track, setTrack] = useState<PlayableTrack | undefined>(
    undefined,
  );

  useEffect(() => {
    // here
    (async () => {
      if (tracksToPlayIds.length) {
        // TODO: make a hook for this
        // TODO: fecth album
        const track = await fetchTrack({ id: tracksToPlayIds[0] });
        setTrack(track);
      }
    })();
  }, [tracksToPlayIds]);

  useEffect(() => {
    console.log('current_track', current_track);
    // TODO: function de check de current_track, voir si on a toutes les infos voulu
    if (player === undefined) {
      console.log('there is no player defined');
    } else {
      if (current_track && current_track.id) {
        player._options.getOAuthToken((accessToken: string) => {
          fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${player._options.id}`,
            {
              method: 'PUT',
              body: JSON.stringify({ uris: [current_track.id] }),
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
            },
          );
        });
      }
    }
  }, [current_track]);

  useEffect(() => {
    console.log('here', token);
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb: (token: string) => void) => {
          cb(token ?? '');
        },
        volume: 0.5,
      });
      console.log('player', player);
      setPlayer(player);

      player.addListener('ready', ({ device_id }: { device_id: string }) => {
        console.log('Ready with Device ID', device_id);
      });

      player.addListener(
        'not_ready',
        ({ device_id }: { device_id: string }) => {
          console.log('Device ID has gone offline', device_id);
        },
      );

      player.addListener('player_state_changed', (state: any) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((state: any) => {
          !state ? setActive(false) : setActive(true);
        });
      });

      player.connect().then((success) => {
        if (success) {
          console.log(
            'The Web Playback SDK successfully connected to Spotify!',
          );
        }
      });
    };
  }, [token]);
  if (current_track.name !== '') {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.previousTrack();
                }}
              >
                &lt;&lt;
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? 'PLAY' : 'PAUSE'}
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.nextTrack();
                }}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else if (!is_active) {
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
  } else if (!player) {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <b>
              Instance not active. Transfer your playback using your Spotify app
              - 22
            </b>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container">
          <div className="main-wrapper">
            <img
              src={current_track.album.images[0].url}
              className="now-playing__cover"
              alt=""
            />

            <div className="now-playing__side">
              <div className="now-playing__name">{current_track.name}</div>
              <div className="now-playing__artist">
                {current_track.artists[0].name}
              </div>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.previousTrack();
                }}
              >
                &lt;&lt;
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.togglePlay();
                }}
              >
                {is_paused ? 'PLAY' : 'PAUSE'}
              </button>

              <button
                className="btn-spotify"
                onClick={() => {
                  player.nextTrack();
                }}
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default WebPlayback;
