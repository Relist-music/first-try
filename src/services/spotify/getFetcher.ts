export async function getWithBackoffRetry({
  url,
  maxRetries,
  retryDelay,
}: {
  url: string;
  maxRetries: number;
  retryDelay: number;
}): Promise<Response> {
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

      if (response.status !== 429) {
        // If the response is not a 429 error, return the response
        return response;
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
