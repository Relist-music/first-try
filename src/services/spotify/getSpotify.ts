import { getWithBackoffRetry } from './getFetcher';

export const getSpotify = async <T>({ url }: { url: string }): Promise<T> => {
  return getWithBackoffRetry<T>({ url, maxRetries: 4, retryDelay: 1000 });
};
