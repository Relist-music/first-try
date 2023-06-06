import { refreshAccessToken } from './refreshAccessToken';

export async function getWithBackoffRetry<T>({
  url,
  maxRetries,
  retryDelay,
}: {
  url: string;
  maxRetries: number;
  retryDelay: number;
}): Promise<T> {
  let retries = 0;
  let response: Response | undefined;

  // TODO: here check if the token is expired and refresh it
  // TODO::then swap

  while (retries <= maxRetries) {
    try {
      response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });

      const body = await response.json();

      if (
        response.status === 401 &&
        (body.error.message === 'The access token expired' ||
          body.error.message === 'Invalid access token')
      ) {
        const { access_token, expires_in, scope, token_type } =
          await refreshAccessToken();
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('expires_in', expires_in);
        localStorage.setItem('scopes', scope.split(' ').join(','));
        localStorage.setItem('token_type', token_type);
        localStorage.setItem('now', new Date().toString());
      }
      if (response.status !== 429) {
        // If the response is not a 429 error, return the response
        return body;
      }
    } catch (error) {
      console.error('Request failed:', error);
    }

    // If the response is a 429 error, wait for the specified retry delay or the value from the "Retry-After" header, if available
    const retryAfter = response?.headers.get('Retry-After');
    const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : retryDelay;

    console.log(`Waiting for ${waitTime} ms before retrying...`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));

    retries++;
    retryDelay *= 2; // Exponential backoff
  }

  throw new Error('Max retries reached. Request failed.');
}
