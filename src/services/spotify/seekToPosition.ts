export const seekToPosition = async ({
  position,
  deviceId,
}: {
  position: number;
  deviceId: string;
}) => {
  fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${position}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify({
      device_id: deviceId,
    }),
  });
};
