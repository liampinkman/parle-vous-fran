
import { useState, useCallback, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

declare global {
  interface Window {
    propellerads_render?: () => void;
  }
}

export const useInPagePushAds = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);
  const [showInPagePush, setShowInPagePush] = useState(false);
  const [hasShownThisSession, setHasShownThisSession] = useState(false);
  const isMobile = useIsMobile();

  // Vérifier si l'ad a déjà été montrée dans cette session
  useEffect(() => {
    const pushShown = sessionStorage.getItem('inPagePushShown');
    if (pushShown === 'true') {
      setHasShownThisSession(true);
    }
  }, []);

  // Charger le script Propeller Ads
  const loadPropellerScript = useCallback(() => {
    if (typeof window === 'undefined' || !isMobile) return;

    // Vérifier si le script est déjà chargé
    if (document.querySelector('script[src*="propellerads"]')) {
      setIsAdLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.propellerads.com/propeller.js';
    script.async = true;
    script.onload = () => {
      setIsAdLoaded(true);
      console.log('📱 Propeller Ads script loaded');
    };
    script.onerror = () => {
      console.error('❌ Failed to load Propeller Ads script');
    };
    
    document.head.appendChild(script);
  }, [isMobile]);

  // Déclencher l'In-Page Push Ad
  const triggerInPagePush = useCallback(() => {
    if (!isMobile || hasShownThisSession || !isAdLoaded) {
      return;
    }

    // Vérifier le sessionStorage une dernière fois
    const pushShown = sessionStorage.getItem('inPagePushShown');
    if (pushShown === 'true') {
      setHasShownThisSession(true);
      return;
    }

    // Afficher l'In-Page Push Ad après un délai
    setTimeout(() => {
      setShowInPagePush(true);
      setHasShownThisSession(true);
      sessionStorage.setItem('inPagePushShown', 'true');
      console.log('📱 In-Page Push Ad triggered');
    }, 2000);
  }, [isMobile, hasShownThisSession, isAdLoaded]);

  const closeInPagePush = useCallback(() => {
    setShowInPagePush(false);
  }, []);

  return {
    isAdLoaded,
    showInPagePush,
    loadPropellerScript,
    triggerInPagePush,
    closeInPagePush,
    hasShownThisSession
  };
};
