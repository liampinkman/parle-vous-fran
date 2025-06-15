
import { useState, useCallback, useEffect } from 'react';
import { useIsMobile } from './use-mobile';

interface PushAdData {
  id: string;
  title: string;
  message: string;
  icon: string;
  url: string;
  timestamp: number;
}

export const useInPagePushAds = () => {
  const [pushAds, setPushAds] = useState<PushAdData[]>([]);
  const [showPushAd, setShowPushAd] = useState(false);
  const [currentAd, setCurrentAd] = useState<PushAdData | null>(null);
  const isMobile = useIsMobile();

  // Exemples de publicités push
  const pushAdTemplates: Omit<PushAdData, 'id' | 'timestamp'>[] = [
    {
      title: "🏠 Investissement Immobilier",
      message: "Découvrez les meilleures opportunités d'investissement près de chez vous",
      icon: "🏠",
      url: "#"
    },
    {
      title: "📈 Trading en Ligne",
      message: "Commencez à trader avec 0€ de commission sur les actions",
      icon: "📈",
      url: "#"
    },
    {
      title: "💰 Crédit Personnel",
      message: "Obtenez votre crédit personnel en 24h avec un taux à partir de 2.9%",
      icon: "💰",
      url: "#"
    },
    {
      title: "🏦 Compte Épargne",
      message: "Nouveau compte épargne à 4% brut annuel - Offre limitée",
      icon: "🏦",
      url: "#"
    }
  ];

  const generatePushAd = useCallback(() => {
    const template = pushAdTemplates[Math.floor(Math.random() * pushAdTemplates.length)];
    const newAd: PushAdData = {
      ...template,
      id: `push-ad-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: Date.now()
    };
    return newAd;
  }, []);

  const triggerPushAd = useCallback(() => {
    if (!isMobile) return;

    const newAd = generatePushAd();
    setCurrentAd(newAd);
    setShowPushAd(true);
    setPushAds(prev => [newAd, ...prev.slice(0, 9)]); // Garder max 10 publicités

    console.log('📢 In-Page Push Ad triggered:', newAd.title);
  }, [isMobile, generatePushAd]);

  const closePushAd = useCallback(() => {
    setShowPushAd(false);
    setTimeout(() => setCurrentAd(null), 300); // Attendre l'animation de fermeture
  }, []);

  const trackPushAdInteraction = useCallback((action: 'shown' | 'clicked' | 'closed', adId?: string) => {
    console.log(`📢 In-Page Push Ad: ${action}`, adId);
    // Ici vous pourriez intégrer avec votre système d'analytics
  }, []);

  // Auto-trigger des push ads de manière aléatoire
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      // 20% de chance de déclencher une pub push toutes les 2 minutes
      if (Math.random() < 0.2) {
        triggerPushAd();
      }
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, [isMobile, triggerPushAd]);

  return {
    pushAds,
    showPushAd,
    currentAd,
    triggerPushAd,
    closePushAd,
    trackPushAdInteraction
  };
};
