import { useState, useCallback } from "react";
import { useIsMobile } from "./use-mobile";

const AD_REFRESH_INTERVAL = 30000; // 30 secondes

export const useAdRefresh = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastRefreshTime, setLastRefreshTime] = useState(0);
  const isMobile = useIsMobile();
  
  const refreshAds = useCallback(() => {
    const currentTime = Date.now();
    if (currentTime - lastRefreshTime > AD_REFRESH_INTERVAL) {
      setRefreshKey(prevKey => prevKey + 1);
      setLastRefreshTime(currentTime);
    }
  }, [lastRefreshTime]);
  
  const shouldDisplayAd = useCallback((position: string) => {
    return !isMobile || position === "bottom";
  }, [isMobile]);

  return { refreshKey, refreshAds, shouldDisplayAd };
};
