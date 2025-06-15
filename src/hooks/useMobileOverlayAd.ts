
import { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from './use-mobile';

export const useMobileOverlayAd = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Vérifier si l'overlay a déjà été montré dans cette session
    const overlayShown = sessionStorage.getItem('mobileOverlayShown');
    if (overlayShown === 'true') {
      setHasShownThisSession(true);
      return;
    }

    // Ne montrer que sur mobile et si pas encore montré
    if (!isMobile || hasShownThisSession) {
      return;
    }

    // Timer pour afficher l'overlay après 30 secondes
    const timer = setTimeout(() => {
      setShowOverlay(true);
      setHasShownThisSession(true);
      sessionStorage.setItem('mobileOverlayShown', 'true');
    }, 30000); // 30 secondes

    return () => clearTimeout(timer);
  }, [isMobile, hasShownThisSession]);

  const closeOverlay = useCallback(() => {
    setShowOverlay(false);
  }, []);

  const trackOverlayInteraction = useCallback((action: 'shown' | 'closed' | 'clicked') => {
    console.log(`📱 Mobile Overlay Ad: ${action}`);
    // Ici vous pourriez intégrer avec votre système d'analytics
  }, []);

  return {
    showOverlay: showOverlay && isMobile && !hasShownThisSession,
    closeOverlay,
    trackOverlayInteraction
  };
};
