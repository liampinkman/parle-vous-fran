
import { DollarSign } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface AdSpaceProps {
  position: "sidebar" | "bottom";
  refreshKey?: number;
}

const AdSpace = ({ position, refreshKey = 0 }: AdSpaceProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adId, setAdId] = useState(`ad-${Math.random().toString(36).substring(2, 9)}`);
  
  // Effet pour rafraîchir la publicité quand refreshKey change
  useEffect(() => {
    // Simuler un rafraîchissement de la publicité
    if (refreshKey > 0) {
      setAdId(`ad-${Math.random().toString(36).substring(2, 9)}`);
      
      // Ici vous pourriez appeler l'API de votre réseau publicitaire pour rafraîchir les annonces
      // Par exemple avec Google AdSense: window.adsbygoogle && window.adsbygoogle.push({});
      
      console.log(`Publicité rafraîchie: ${position} - ${adId}`);
    }
  }, [refreshKey, position]);

  const baseStyles = "bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-center";
  const styles = {
    sidebar: `${baseStyles} w-full h-[300px] mb-4`,
    bottom: `${baseStyles} w-full h-[120px] mt-8`
  };

  return (
    <div className={styles[position]} ref={adRef} key={adId}>
      <div className="text-gray-400 flex flex-col items-center">
        <DollarSign className="w-8 h-8 mb-2" />
        <span className="text-sm">Espace publicitaire</span>
        <span className="text-xs mt-1">{adId}</span>
      </div>
    </div>
  );
};

export default AdSpace;
