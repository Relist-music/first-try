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

// {
//   uri: "",
//   metadata: {
//     name: "",
//     uri: "",
//     url: "",
//     current_item: {
//       name: "Egérie",
//       uri: "spotify:track:6UeG6DogntZ1s89ejurXhT",
//       url: "https://api.spotify.com/v1/tracks/6UeG6DogntZ1s89ejurXhT",
//       uid: "c1579b883d70a42f76cd",
//       content_type: "TRACK",
//       artists: [
//         {
//           name: "Nekfeu",
//           uri: "spotify:artist:4LXBc13z5EWsc5N32bLxfH",
//           url: "https://api.spotify.com/v1/artists/4LXBc13z5EWsc5N32bLxfH",
//         },
//       ],
//       images: [
//         {
//           url: "https://i.scdn.co/image/ab67616d00001e02ff6a615bde464f6f9ee3dcce",
//           height: 300,
//           width: 300,
//           size: "UNKNOWN",
//         },
//         {
//           url: "https://i.scdn.co/image/ab67616d00004851ff6a615bde464f6f9ee3dcce",
//           height: 64,
//           width: 64,
//           size: "SMALL",
//         },
//         {
//           url: "https://i.scdn.co/image/ab67616d0000b273ff6a615bde464f6f9ee3dcce",
//           height: 640,
//           width: 640,
//           size: "LARGE",
//         },
//       ],
//       estimated_duration: 210453,
//       group: {
//         name: "Feu",
//         uri: "spotify:album:7BgeK3jtk8GDlEwouUY3AG",
//         url: "https://api.spotify.com/v1/albums/7BgeK3jtk8GDlEwouUY3AG",
//       },
//     },
//     previous_items: [
//     ],
//     next_items: [
//       {
//         name: "Troubled Times",
//         uri: "spotify:track:1WwDFD23XjqAAtRTky5UwK",
//         url: "https://api.spotify.com/v1/tracks/1WwDFD23XjqAAtRTky5UwK",
//         uid: "136ed2d55e010344b7ce",
//         content_type: "TRACK",
//         artists: [
//           {
//             name: "Screaming Trees",
//             uri: "spotify:artist:3Ukr3Ufjg8ygRJv7Ww887f",
//             url: "https://api.spotify.com/v1/artists/3Ukr3Ufjg8ygRJv7Ww887f",
//           },
//         ],
//         images: [
//           {
//             url: "https://i.scdn.co/image/ab67616d00001e020dfb2d8dd185b3d008a2106e",
//             height: 300,
//             width: 300,
//             size: "UNKNOWN",
//           },
//           {
//             url: "https://i.scdn.co/image/ab67616d000048510dfb2d8dd185b3d008a2106e",
//             height: 64,
//             width: 64,
//             size: "SMALL",
//           },
//           {
//             url: "https://i.scdn.co/image/ab67616d0000b2730dfb2d8dd185b3d008a2106e",
//             height: 640,
//             width: 640,
//             size: "LARGE",
//           },
//         ],
//         estimated_duration: 320906,
//         group: {
//           name: "Sweet Oblivion",
//           uri: "spotify:album:3SOcm48I0DOX1KEHF2IEVY",
//           url: "https://api.spotify.com/v1/albums/3SOcm48I0DOX1KEHF2IEVY",
//         },
//       },
//       {
//         name: "I Just Wanna Live",
//         uri: "spotify:track:3FDKhR3vedB1MIsP2cvKcA",
//         url: "https://api.spotify.com/v1/tracks/3FDKhR3vedB1MIsP2cvKcA",
//         uid: "63404f184adaf6928796",
//         content_type: "TRACK",
//         artists: [
//           {
//             name: "Good Charlotte",
//             uri: "spotify:artist:5aYyPjAsLj7UzANzdupwnS",
//             url: "https://api.spotify.com/v1/artists/5aYyPjAsLj7UzANzdupwnS",
//           },
//         ],
//         images: [
//           {
//             url: "https://i.scdn.co/image/ab67616d00001e02636e57cad24da225d0c70e55",
//             height: 300,
//             width: 300,
//             size: "UNKNOWN",
//           },
//           {
//             url: "https://i.scdn.co/image/ab67616d00004851636e57cad24da225d0c70e55",
//             height: 64,
//             width: 64,
//             size: "SMALL",
//           },
//           {
//             url: "https://i.scdn.co/image/ab67616d0000b273636e57cad24da225d0c70e55",
//             height: 640,
//             width: 640,
//             size: "LARGE",
//           },
//         ],
//         estimated_duration: 166053,
//         group: {
//           name: "The Chronicles of Life and Death (\"LIFE\" version)",
//           uri: "spotify:album:1mHbT9H5hDR284u0GCBgJv",
//           url: "https://api.spotify.com/v1/albums/1mHbT9H5hDR284u0GCBgJv",
//         },
//       },
//     ],
//     options: {
//       shuffled: true,
//       repeat_mode: "OFF",
//     },
//     restrictions: {
//       pause: [
//       ],
//       resume: [
//       ],
//       seek: [
//       ],
//       skip_next: [
//       ],
//       skip_prev: [
//         "no_prev_track",
//       ],
//       toggle_repeat_context: [
//       ],
//       toggle_repeat_track: [
//       ],
//       toggle_shuffle: [
//       ],
//       peek_next: [
//       ],
//       peek_prev: [
//       ],
//     },
//   },
// }

// state.duration
// state loading
// state paused
// state position

// state.shuffle
//

// {
//   current_track: {
//     id: "6UeG6DogntZ1s89ejurXhT",
//     uri: "spotify:track:6UeG6DogntZ1s89ejurXhT",
//     type: "track",
//     uid: "c1579b883d70a42f76cd",
//     linked_from: {
//       uri: null,
//       id: null,
//     },
//     media_type: "audio",
//     track_type: "audio",
//     name: "Egérie",
//     duration_ms: 210453,
//     artists: [
//       {
//         name: "Nekfeu",
//         uri: "spotify:artist:4LXBc13z5EWsc5N32bLxfH",
//         url: "https://api.spotify.com/v1/artists/4LXBc13z5EWsc5N32bLxfH",
//       },
//     ],
//     album: {
//       name: "Feu",
//       uri: "spotify:album:7BgeK3jtk8GDlEwouUY3AG",
//       images: [
//         {
//           url: "https://i.scdn.co/image/ab67616d00001e02ff6a615bde464f6f9ee3dcce",
//           height: 300,
//           width: 300,
//           size: "UNKNOWN",
//         },
//         {
//           url: "https://i.scdn.co/image/ab67616d00004851ff6a615bde464f6f9ee3dcce",
//           height: 64,
//           width: 64,
//           size: "SMALL",
//         },
//         {
//           url: "https://i.scdn.co/image/ab67616d0000b273ff6a615bde464f6f9ee3dcce",
//           height: 640,
//           width: 640,
//           size: "LARGE",
//         },
//       ],
//     },
//     is_playable: true,
//   },
//   next_tracks: [
//     {
//       id: "1WwDFD23XjqAAtRTky5UwK",
//       uri: "spotify:track:1WwDFD23XjqAAtRTky5UwK",
//       type: "track",
//       uid: "136ed2d55e010344b7ce",
//       linked_from: {
//         uri: null,
//         id: null,
//       },
//       media_type: "video",
//       track_type: "video",
//       name: "Troubled Times",
//       duration_ms: 320906,
//       artists: [
//         {
//           name: "Screaming Trees",
//           uri: "spotify:artist:3Ukr3Ufjg8ygRJv7Ww887f",
//           url: "https://api.spotify.com/v1/artists/3Ukr3Ufjg8ygRJv7Ww887f",
//         },
//       ],
//       album: {
//         name: "Sweet Oblivion",
//         uri: "spotify:album:3SOcm48I0DOX1KEHF2IEVY",
//         images: [
//           {
//             url: "https://i.scdn.co/image/ab67616d00001e020dfb2d8dd185b3d008a2106e",
//             height: 300,
//             width: 300,
//             size: "UNKNOWN",
//           },
//           {
//             url: "https://i.scdn.co/image/ab67616d000048510dfb2d8dd185b3d008a2106e",
//             height: 64,
//             width: 64,
//             size: "SMALL",
//           },
//           {
//             url: "https://i.scdn.co/image/ab67616d0000b2730dfb2d8dd185b3d008a2106e",
//             height: 640,
//             width: 640,
//             size: "LARGE",
//           },
//         ],
//       },
//       is_playable: true,
//     },
//     {
//       id: "3FDKhR3vedB1MIsP2cvKcA",
//       uri: "spotify:track:3FDKhR3vedB1MIsP2cvKcA",
//       type: "track",
//       uid: "63404f184adaf6928796",
//       linked_from: {
//         uri: null,
//         id: null,
//       },
//       media_type: "video",
//       track_type: "video",
//       name: "I Just Wanna Live",
//       duration_ms: 166053,
//       artists: [
//         {
//           name: "Good Charlotte",
//           uri: "spotify:artist:5aYyPjAsLj7UzANzdupwnS",
//           url: "https://api.spotify.com/v1/artists/5aYyPjAsLj7UzANzdupwnS",
//         },
//       ],
//       album: {
//         name: "The Chronicles of Life and Death (\"LIFE\" version)",
//         uri: "spotify:album:1mHbT9H5hDR284u0GCBgJv",
//         images: [
//           {
//             url: "https://i.scdn.co/image/ab67616d00001e02636e57cad24da225d0c70e55",
//             height: 300,
//             width: 300,
//             size: "UNKNOWN",
//           },
//           {
//             url: "https://i.scdn.co/image/ab67616d00004851636e57cad24da225d0c70e55",
//             height: 64,
//             width: 64,
//             size: "SMALL",
//           },
//           {
//             url: "https://i.scdn.co/image/ab67616d0000b273636e57cad24da225d0c70e55",
//             height: 640,
//             width: 640,
//             size: "LARGE",
//           },
//         ],
//       },
//       is_playable: true,
//     },
//   ],
//   previous_tracks: [
//   ],
// }

const Player = () => {
  const {
    deviceId,
    setDeviceId,
    currentPlaybackState,
    setCurrentPlaybackState,
  } = useContext(PlayingContext);
  // idk what active means
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
        <div className="time">
          <span className="current-time">0:00</span>
        </div>
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
      </div>
    );
  }
};

export default Player;
