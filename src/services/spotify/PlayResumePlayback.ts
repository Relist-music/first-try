interface PlayOptions {
  context_uri?: string | undefined;
  uris?: ReadonlyArray<string> | undefined;
  offset?: { position: number } | { uri: string } | undefined;
  position_ms?: number | undefined;
  device_id?: string | undefined;
}

export const playOrResumeTrack = async (playResumeArgs: PlayOptions) => {
  const { context_uri, uris, offset, position_ms, device_id } = playResumeArgs;
  const body = {
    offset: offset,
    position_ms: position_ms || 0,
    device_id: device_id,
  } as PlayOptions;
  if (context_uri) {
    body['context_uri'] = context_uri;
  }
  if (uris) {
    body['uris'] = uris;
  }
  fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
    body: JSON.stringify(body),
  });
};
