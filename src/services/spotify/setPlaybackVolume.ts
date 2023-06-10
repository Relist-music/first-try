// endpoint doesn't work

// export const setPlaybackVolume = async ({
//   volume,
//   deviceId,
// }: {
//   volume: number;
//   deviceId: string;
// }) => {
//   fetch(
//     `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
//     {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
//       },
//       body: JSON.stringify({
//         device_id: deviceId,
//       }),
//     },
//   );
// };
