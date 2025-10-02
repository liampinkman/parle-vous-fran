import { useState, useCallback } from 'react';
import { useIsMobile } from './use-mobile';

const STORAGE_KEY = 'mobileOverlayShown';

export const useMobileOverlayAd = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);
  const isMobile = useIsMobile();

  const checkSessionStorage = useCallback(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
      setHasShownThisSession(true);
    }
  }, []);

  const triggerOverlayAfterCalculation = useCallback(() => {
    if (!isMobile || hasShownThisSession || sessionStorage.getItem(STORAGE_KEY) === 'true') {
      return;
    }

    setShowOverlay(true);
    setHasShownThisSession(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  }, [isMobile, hasShownThisSession]);

  const closeOverlay = useCallback(() => {
    setShowOverlay(false);
  }, []);

  const trackOverlayInteraction = useCallback((action: 'shown' | 'closed' | 'clicked') => {
    console.log(`📱 Mobile Overlay Ad: ${action}`);
  }, []);

  return {
    showOverlay: showOverlay && isMobile,
    closeOverlay,
    trackOverlayInteraction,
    triggerOverlayAfterCalculation,
    checkSessionStorage
  };
};
