import { getWithBackoffRetry } from './getFetcher';

export const getSpotify = async <T>({ url }: { url: string }): Promise<T> => {
  return getWithBackoffRetry({ url, maxRetries: 4, retryDelay: 1000 }).then(
    (response) => {
      return response.json();
    },
  );
};
