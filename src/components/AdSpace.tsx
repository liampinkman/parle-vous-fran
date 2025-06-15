
import { DollarSign, ExternalLink, Star, TrendingUp } from "lucide-react";
import { useRef, useEffect, useState, memo } from "react";
import { useAdRefresh } from "@/hooks/useAdRefresh";

interface AdSpaceProps {
  position: "sidebar" | "bottom";
  refreshKey?: number;
}

const AdSpace = memo(({ position, refreshKey = 0 }: AdSpaceProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adId, setAdId] = useState(`ad-${Math.random().toString(36).substring(2, 9)}`);
  const [isVisible, setIsVisible] = useState(false);
  const [adContent, setAdContent] = useState<any>(null);
  const { shouldDisplayAd } = useAdRefresh();
  
  // Ne pas afficher si shouldDisplayAd indique que non
  if (!shouldDisplayAd(position)) {
    return null;
  }

  // Contenu publicitaire simulé
  const adContents = [
    {
      type: "investment",
      title: "Investissement Immobilier",
      description: "Découvrez les meilleures opportunités d'investissement",
      cta: "Investir maintenant",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-600"
    },
    {
      type: "credit",
      title: "Prêt Immobilier",
      description: "Taux exceptionnels dès 3.2% TAEG*",
      cta: "Simuler mon prêt",
      icon: DollarSign,
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      type: "trading",
      title: "Trading en Ligne",
      description: "Plateforme de trading avec 0% de commission",
      cta: "Commencer à trader",
      icon: Star,
      gradient: "from-purple-500 to-pink-600"
    }
  ];
  
  // Observer pour le lazy loading des publicités
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Sélectionner un contenu publicitaire aléatoire
          const randomAd = adContents[Math.floor(Math.random() * adContents.length)];
          setAdContent(randomAd);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );
    
    if (adRef.current) {
      observer.observe(adRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Effet pour rafraîchir la publicité quand refreshKey change
  useEffect(() => {
    if (refreshKey > 0 && isVisible) {
      setAdId(`ad-${Math.random().toString(36).substring(2, 9)}`);
      const randomAd = adContents[Math.floor(Math.random() * adContents.length)];
      setAdContent(randomAd);
      console.log(`Publicité rafraîchie: ${position} - ${adId}`);
    }
  }, [refreshKey, position, isVisible, adId]);

  const baseStyles = "bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer";
  const styles = {
    sidebar: `${baseStyles} w-full h-[250px] mb-4 md:h-[300px]`,
    bottom: `${baseStyles} w-full h-[90px] md:h-[120px]`
  };

  const handleAdClick = () => {
    console.log(`🎯 Ad clicked: ${adContent?.type} - ${position}`);
    // Ici vous pourriez intégrer le tracking avec Propeller Ads
  };

  if (!isVisible || !adContent) {
    return (
      <div 
        className={`${styles[position]} flex items-center justify-center opacity-0`} 
        ref={adRef}
      >
        <div className="text-gray-300">
          <DollarSign className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2" />
          <span className="text-xs">Chargement...</span>
        </div>
      </div>
    );
  }

  const Icon = adContent.icon;

  return (
    <div 
      className={`${styles[position]} animate-fade-in`} 
      ref={adRef} 
      key={adId}
      data-ad-position={position}
      onClick={handleAdClick}
    >
      {position === "sidebar" ? (
        // Format vertical pour la sidebar
        <div className="p-4 h-full flex flex-col">
          <div className={`bg-gradient-to-br ${adContent.gradient} rounded-lg p-4 flex-1 flex flex-col justify-center items-center text-white text-center mb-3`}>
            <Icon className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-sm mb-2">{adContent.title}</h3>
            <p className="text-xs opacity-90 leading-relaxed">{adContent.description}</p>
          </div>
          <button className="w-full bg-primary text-white py-2 rounded-md text-xs font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-1">
            {adContent.cta}
            <ExternalLink size={12} />
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">Publicité</p>
        </div>
      ) : (
        // Format horizontal pour le bottom
        <div className="p-3 md:p-4 h-full flex items-center gap-3 md:gap-4">
          <div className={`bg-gradient-to-br ${adContent.gradient} rounded-lg p-3 md:p-4 flex items-center justify-center text-white flex-shrink-0`}>
            <Icon className="w-4 h-4 md:w-6 md:h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xs md:text-sm text-gray-900 mb-1">{adContent.title}</h3>
            <p className="text-xs text-gray-600 line-clamp-2">{adContent.description}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <button className="bg-primary text-white px-3 py-1.5 md:px-4 md:py-2 rounded text-xs font-medium hover:bg-primary/90 transition-colors flex items-center gap-1">
              {position === "bottom" ? "Voir" : adContent.cta}
              <ExternalLink size={10} />
            </button>
            <span className="text-xs text-gray-400">Pub</span>
          </div>
        </div>
      )}
    </div>
  );
});

AdSpace.displayName = "AdSpace";

export default AdSpace;
