interface RepeatModeProps {
  repeatMode: 'track' | 'context' | 'off';
  deviceId: string;
}

const setRepeatMode = async ({ repeatMode, deviceId }: RepeatModeProps) => {
  fetch(`https://api.spotify.com/v1/me/player/repeat?state=${repeatMode}`, {
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

export default setRepeatMode;
