export const fetchMe = async () => {
  const me = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  }).then((data) => data.json());

  return me;
};

export default fetchMe;
