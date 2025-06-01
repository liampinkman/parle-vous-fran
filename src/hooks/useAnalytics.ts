
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const useAnalytics = (measurementId: string) => {
  const location = useLocation();

  useEffect(() => {
    // Vérifier le consentement cookies
    const cookieConsent = localStorage.getItem('cookieConsent');
    let analyticsEnabled = false;
    
    if (cookieConsent) {
      try {
        const consent = JSON.parse(cookieConsent);
        analyticsEnabled = consent.analytics;
      } catch (e) {
        console.error('Erreur parsing cookie consent:', e);
      }
    }

    if (!analyticsEnabled) return;

    // Initialiser Google Analytics seulement si accepté
    if (!window.gtag) {
      // Charger le script Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      // Initialiser gtag
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };

      window.gtag('js', new Date());
      window.gtag('config', measurementId, {
        // Respecter le consentement RGPD
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
    }
  }, [measurementId]);

  // Tracker les changements de page
  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    let analyticsEnabled = false;
    
    if (cookieConsent) {
      try {
        const consent = JSON.parse(cookieConsent);
        analyticsEnabled = consent.analytics;
      } catch (e) {
        return;
      }
    }

    if (analyticsEnabled && window.gtag) {
      window.gtag('config', measurementId, {
        page_path: location.pathname,
      });
    }
  }, [location, measurementId]);

  // Fonctions utilitaires pour tracker des événements
  const trackEvent = (eventName: string, parameters?: any) => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) return;
    
    try {
      const consent = JSON.parse(cookieConsent);
      if (consent.analytics && window.gtag) {
        window.gtag('event', eventName, parameters);
      }
    } catch (e) {
      console.error('Erreur tracking event:', e);
    }
  };

  const trackCalculation = (calculatorType: string) => {
    trackEvent('calculation_performed', {
      calculator_type: calculatorType,
      event_category: 'engagement',
    });
  };

  return { trackEvent, trackCalculation };
};
