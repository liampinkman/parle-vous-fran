
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    const consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
    
    // Activer Google Analytics si accepté
    if (consent.analytics) {
      enableAnalytics();
    }
  };

  const acceptNecessary = () => {
    const consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setIsVisible(false);
  };

  const enableAnalytics = () => {
    // Cette fonction sera appelée quand l'utilisateur accepte les cookies analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/50 backdrop-blur-sm">
      <Card className="max-w-4xl mx-auto p-4 border-2 border-primary/20 bg-white shadow-xl">
        <div className="flex items-start gap-3">
          <Cookie className="text-primary mt-1 shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">Gestion des cookies</h3>
            <p className="text-gray-700 mb-4 text-sm">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
              Les cookies nécessaires permettent le bon fonctionnement du site, tandis que les cookies 
              d'analyse nous aident à comprendre comment vous utilisez notre calculateur.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={acceptAll} className="bg-primary hover:bg-primary/90">
                Accepter tous les cookies
              </Button>
              <Button onClick={acceptNecessary} variant="outline">
                Accepter uniquement les nécessaires
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsVisible(false)}
                className="sm:ml-auto"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieBanner;
