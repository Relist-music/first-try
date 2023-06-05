import { printLocalStorage } from '@/services';

export const fetchTokens = async (code: string) => {
  try {
    const data = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://127.0.0.1:3000/callback',
      }).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          btoa(
            `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`,
          ),
      },
    }).then((data) => data.json());

    const { access_token, expires_in, refresh_token, scope, token_type } = data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('expires_in', expires_in);
    localStorage.setItem('refresh_token', refresh_token);
    localStorage.setItem('scope', scope);
    localStorage.setItem('token_type', token_type);
    localStorage.setItem('now', new Date().toString());
    printLocalStorage();
  } catch (err) {
    console.log(err);
  }
};

export default fetchTokens;
