
import { useState, useCallback } from "react";

export const useAdRefresh = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshAds = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, []);

  return { refreshKey, refreshAds };
};
