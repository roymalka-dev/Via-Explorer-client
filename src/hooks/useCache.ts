import { useState } from "react";

// Define a generic type for the cache
type Cache<T> = {
  [key: string]: T;
};

function useCache<T>() {
  const [cache, setCache] = useState<Cache<T>>({});

  const getCachedData = (key: string): T | undefined => {
    return cache[key];
  };

  const setCachedData = (key: string, data: T): void => {
    setCache((prevCache) => ({
      ...prevCache,
      [key]: data,
    }));
  };

  return { getCachedData, setCachedData };
}

export default useCache;
