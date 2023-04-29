import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    console.log('💽', accessToken, refreshToken);
  }, []);
  return <Component {...pageProps} />;
}
