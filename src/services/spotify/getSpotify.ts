import wait from 'waait';

export const getSpotify = async <T>({ url }: { url: string }): Promise<T> => {
  return fetch(url, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    },
  }).then((response) => response.json());
};

export const getWaitedSpotify = async <T>({ url }: { url: string }) => {
  const data = await getSpotify<T>({ url });
  await wait(1000);
  return data;
};
