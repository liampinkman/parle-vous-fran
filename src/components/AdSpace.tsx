
import { DollarSign } from "lucide-react";
import { useRef, useEffect, useState, memo } from "react";

interface AdSpaceProps {
  position: "sidebar" | "bottom";
  refreshKey?: number;
}

const AdSpace = memo(({ position, refreshKey = 0 }: AdSpaceProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adId, setAdId] = useState(`ad-${Math.random().toString(36).substring(2, 9)}`);
  const [isVisible, setIsVisible] = useState(false);
  
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
      
      // Ici vous pourriez appeler l'API de votre réseau publicitaire pour rafraîchir les annonces
      console.log(`Publicité rafraîchie: ${position} - ${adId}`);
    }
  }, [refreshKey, position, isVisible]);

  const baseStyles = "bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center transition-opacity";
  const styles = {
    sidebar: `${baseStyles} w-full h-[250px] mb-4 md:h-[300px]`,
    bottom: `${baseStyles} w-full h-[90px] mt-6 md:h-[120px] md:mt-8`
  };

  return (
    <div 
      className={`${styles[position]} ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      ref={adRef} 
      key={adId}
    >
      <div className="text-gray-400 flex flex-col items-center">
        <DollarSign className="w-6 h-6 md:w-8 md:h-8 mb-2" />
        <span className="text-xs md:text-sm">Espace publicitaire</span>
        <span className="text-xs mt-1 hidden md:block">{adId}</span>
      </div>
    </div>
  );
});

AdSpace.displayName = "AdSpace";

export default AdSpace;
