
import { useState, useCallback, useEffect } from "react";
import { useIsMobile } from "./use-mobile";

export const useAdRefresh = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [lastRefreshTime, setLastRefreshTime] = useState(0);
  const isMobile = useIsMobile();
  
  // Éviter de rafraîchir les publicités trop fréquemment (minimum 30 secondes)
  const refreshAds = useCallback(() => {
    const currentTime = Date.now();
    // Limiter la fréquence de rafraîchissement à 30s
    if (currentTime - lastRefreshTime > 30000) {
      setRefreshKey(prevKey => prevKey + 1);
      setLastRefreshTime(currentTime);
    }
  }, [lastRefreshTime]);
  
  // Fonction pour déterminer si une publicité doit être affichée basée sur le contexte
  const shouldDisplayAd = useCallback((position: string) => {
    if (isMobile) {
      // Sur mobile, on limite les publicités pour améliorer l'expérience utilisateur
      return position === "bottom"; // N'afficher que les pubs en bas sur mobile
    }
    return true;
  }, [isMobile]);

  return { refreshKey, refreshAds, shouldDisplayAd };
};
