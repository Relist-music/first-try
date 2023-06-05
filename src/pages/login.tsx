'use client';
import Head from 'next/head';
import { scopes } from '@/constants/scopes';
import queryString from 'query-string';
// TODO:  WARN  deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
// import { printLocalStorage } from '@/services/localStorage';

function RedirectToAuthorizeUrl() {
  // printLocalStorage();
  localStorage.clear();
  const url = queryString.stringifyUrl({
    url: 'https://accounts.spotify.com/authorize',
    query: {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      redirect_uri: 'http://127.0.0.1:3000/callback',
      scope: scopes.join(' '),
      response_type: 'code',
      show_dialog: true,
    },
  });
  window.location.href = url;
}

const Login = () => {
  return (
    <>
      <Head>
        <title>Login Relist</title>
        <meta name="description" content="Relist is a music client" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="test">Login</h1>
        <button
          className="px-4 py-2 bg-gray-400 rounded"
          onClick={RedirectToAuthorizeUrl}
        >
          Connect
        </button>
      </main>
    </>
  );
};

export default Login;
