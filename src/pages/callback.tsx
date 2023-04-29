import Head from 'next/head';
import { useEffect } from 'react';
import { fetchSpotifyTokens } from '@/services';
import { GenreAggregateV1 } from '@/types/myTypes';

const Callback = () => {
  useEffect(() => {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');
      console.log('tokens', accessToken, refreshToken);

      if (accessToken && refreshToken) {
        window.location.href = '/relist';
      } else {
        try {
          await fetchSpotifyTokens(code!).then(
            () => (window.location.href = '/relist'),
          );
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Callback</title>
        <meta name="description" content="Relist is a music client" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Callback</h1>
      </main>
    </>
  );
};

export default Callback;
