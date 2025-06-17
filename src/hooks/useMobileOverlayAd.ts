
import { useState, useCallback } from 'react';
import { useIsMobile } from './use-mobile';

export const useMobileOverlayAd = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);
  const isMobile = useIsMobile();

  // Vérifier si l'overlay a déjà été montré dans cette session au montage
  const checkSessionStorage = useCallback(() => {
    const overlayShown = sessionStorage.getItem('mobileOverlayShown');
    if (overlayShown === 'true') {
      setHasShownThisSession(true);
    }
  }, []);

  // Fonction pour déclencher l'affichage de l'overlay après un calcul
  const triggerOverlayAfterCalculation = useCallback(() => {
    // Vérifier si on est sur mobile et si l'overlay n'a pas déjà été montré
    if (!isMobile || hasShownThisSession) {
      return;
    }

    // Vérifier le sessionStorage au cas où il aurait été mis à jour dans un autre onglet
    const overlayShown = sessionStorage.getItem('mobileOverlayShown');
    if (overlayShown === 'true') {
      setHasShownThisSession(true);
      return;
    }

    // Afficher l'overlay
    setShowOverlay(true);
    setHasShownThisSession(true);
    sessionStorage.setItem('mobileOverlayShown', 'true');
  }, [isMobile, hasShownThisSession]);

  const closeOverlay = useCallback(() => {
    setShowOverlay(false);
  }, []);

  const trackOverlayInteraction = useCallback((action: 'shown' | 'closed' | 'clicked') => {
    console.log(`📱 Mobile Overlay Ad: ${action}`);
    // Ici vous pourriez intégrer avec votre système d'analytics
  }, []);

  return {
    showOverlay: showOverlay && isMobile,
    closeOverlay,
    trackOverlayInteraction,
    triggerOverlayAfterCalculation,
    checkSessionStorage
  };
};
