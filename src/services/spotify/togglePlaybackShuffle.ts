const togglePlaybackShuffle = async ({
  state,
  deviceId,
}: {
  state: boolean;
  deviceId: string;
}) => {
  fetch(`https://api.spotify.com/v1/me/player/shuffle?state=${state}`, {
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

export default togglePlaybackShuffle;
