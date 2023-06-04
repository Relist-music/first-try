export const TransferPlayback = async ({
  deviceId,
  play,
}: {
  deviceId: string;
  play: boolean;
}) => {
  fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify({
      device_ids: [deviceId],
      play,
    }),
  });
};

export default TransferPlayback;
