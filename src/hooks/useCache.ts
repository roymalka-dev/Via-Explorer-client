import { useState } from "react";

type Cache<T> = {
  [key: string]: T;
};

/**
 * Custom React hook for caching data within a component.
 *
 * @template T - The type of data to be cached.
 * @returns {object} An object containing functions to interact with the cache.
 */
function useCache<T>() {
  /**
   * Define a generic type for the cache.
   * @typedef {Object.<string, T>} Cache
   */
  const [cache, setCache] = useState<Cache<T>>({});

  /**
   * Retrieves cached data associated with the provided key.
   *
   * @param {string} key - The key associated with the cached data.
   * @returns {T | undefined} The cached data or undefined if not found.
   */
  const getCachedData = (key: string): T | undefined => {
    return cache[key];
  };

  /**
   * Sets the provided data in the cache associated with the provided key.
   *
   * @param {string} key - The key associated with the cached data.
   * @param {T} data - The data to be cached.
   * @returns {void}
   */
  const setCachedData = (key: string, data: T): void => {
    setCache((prevCache) => ({
      ...prevCache,
      [key]: data,
    }));
  };

  return { getCachedData, setCachedData };
}

export default useCache;
