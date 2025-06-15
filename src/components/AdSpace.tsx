
import { DollarSign, ExternalLink } from "lucide-react";
import { useRef, useEffect, useState, memo } from "react";
import { useAdRefresh } from "@/hooks/useAdRefresh";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AdSpaceProps {
  position: "sidebar" | "bottom";
  refreshKey?: number;
}

interface AdContent {
  id: string;
  title: string;
  description: string;
  cta: string;
  image: string;
  category: string;
  sponsored: boolean;
}

const AdSpace = memo(({ position, refreshKey = 0 }: AdSpaceProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adId, setAdId] = useState(`ad-${Math.random().toString(36).substring(2, 9)}`);
  const [isVisible, setIsVisible] = useState(false);
  const [currentAd, setCurrentAd] = useState<AdContent | null>(null);
  const { shouldDisplayAd } = useAdRefresh();
  
  // Contenu publicitaire réaliste
  const adContents: AdContent[] = [
    {
      id: "invest-immo-1",
      title: "Investissement Immobilier",
      description: "Découvrez les meilleures opportunités d'investissement locatif. Rendement jusqu'à 8% brut.",
      cta: "Voir les offres",
      image: "🏠",
      category: "Immobilier",
      sponsored: true
    },
    {
      id: "credit-perso-1",
      title: "Crédit Personnel",
      description: "Obtenez votre crédit en 24h. Taux à partir de 2.9%. Simulation gratuite et sans engagement.",
      cta: "Simuler mon crédit",
      image: "💰",
      category: "Finance",
      sponsored: true
    },
    {
      id: "trading-1",
      title: "Trading en Ligne",
      description: "Commencez à trader avec 0€ de commission. Formation gratuite incluse.",
      cta: "Ouvrir un compte",
      image: "📈",
      category: "Bourse",
      sponsored: true
    },
    {
      id: "assurance-1",
      title: "Assurance Emprunteur",
      description: "Économisez jusqu'à 50% sur votre assurance emprunteur. Devis gratuit en 2 min.",
      cta: "Faire un devis",
      image: "🛡️",
      category: "Assurance",
      sponsored: true
    },
    {
      id: "epargne-1",
      title: "Livret Épargne 4%",
      description: "Nouveau compte épargne à 4% brut annuel. Ouverture en ligne en 5 minutes.",
      cta: "Ouvrir mon compte",
      image: "🏦",
      category: "Épargne",
      sponsored: true
    }
  ];

  // Ne pas afficher si shouldDisplayAd indique que non
  if (!shouldDisplayAd(position)) {
    return null;
  }
  
  // Observer pour le lazy loading des publicités
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Une fois visible, on n'a plus besoin d'observer
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
      // Sélectionner une nouvelle publicité aléatoirement
      const randomAd = adContents[Math.floor(Math.random() * adContents.length)];
      setCurrentAd(randomAd);
      
      console.log(`Publicité rafraîchie: ${position} - ${adId}`);
    }
  }, [refreshKey, position, isVisible, adId]);

  // Sélectionner une publicité initiale
  useEffect(() => {
    if (isVisible && !currentAd) {
      const randomAd = adContents[Math.floor(Math.random() * adContents.length)];
      setCurrentAd(randomAd);
    }
  }, [isVisible, currentAd]);

  const handleAdClick = () => {
    console.log(`Clic sur publicité: ${currentAd?.title} - Position: ${position}`);
    // Ici vous pourriez tracker le clic et rediriger vers l'annonceur
  };

  const baseStyles = "border border-gray-200 rounded-lg transition-opacity";
  const styles = {
    sidebar: `${baseStyles} w-full mb-4`,
    bottom: `${baseStyles} w-full`
  };

  if (!currentAd) {
    // Fallback pendant le chargement
    return (
      <div 
        className={`${styles[position]} ${isVisible ? 'opacity-100' : 'opacity-0'} bg-gray-50 p-4 flex items-center justify-center`} 
        ref={adRef}
        style={{
          height: position === 'sidebar' ? '250px' : '90px'
        }}
      >
        <div className="text-gray-400 flex flex-col items-center">
          <DollarSign className="w-6 h-6 md:w-8 md:h-8 mb-2" />
          <span className="text-xs md:text-sm">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <Card 
      className={`${styles[position]} ${isVisible ? 'opacity-100' : 'opacity-0'} cursor-pointer hover:shadow-md transition-shadow`} 
      ref={adRef} 
      key={adId}
      data-ad-position={position}
      onClick={handleAdClick}
    >
      <div className={`p-3 ${position === 'sidebar' ? 'h-[250px]' : 'h-[90px]'} flex flex-col justify-between`}>
        {/* En-tête avec badge sponsorisé */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {currentAd.sponsored ? 'Sponsorisé' : 'Publicité'}
          </span>
          <span className="text-lg">{currentAd.image}</span>
        </div>
        
        {/* Contenu principal */}
        <div className="flex-1">
          <h3 className={`font-semibold text-gray-900 mb-1 ${position === 'sidebar' ? 'text-base' : 'text-sm'}`}>
            {currentAd.title}
          </h3>
          <p className={`text-gray-600 leading-tight ${position === 'sidebar' ? 'text-sm mb-3' : 'text-xs'}`}>
            {currentAd.description}
          </p>
        </div>
        
        {/* Call to action */}
        <div className="flex items-center justify-between">
          <Button 
            size={position === 'sidebar' ? 'sm' : 'sm'} 
            className="bg-primary text-white hover:bg-primary/90"
          >
            {currentAd.cta}
            <ExternalLink size={14} className="ml-1" />
          </Button>
          <span className="text-xs text-gray-400">{currentAd.category}</span>
        </div>
      </div>
    </Card>
  );
});

AdSpace.displayName = "AdSpace";

export default AdSpace;
