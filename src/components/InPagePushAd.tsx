
import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface PushAdData {
  id: string;
  title: string;
  message: string;
  icon: string;
  url: string;
  timestamp: number;
}

interface InPagePushAdProps {
  ad: PushAdData;
  onClose: () => void;
  onTrackInteraction: (action: 'shown' | 'clicked' | 'closed', adId: string) => void;
}

const InPagePushAd = ({ ad, onClose, onTrackInteraction }: InPagePushAdProps) => {
  useEffect(() => {
    onTrackInteraction('shown', ad.id);
    
    // Auto-fermeture après 8 secondes
    const timer = setTimeout(() => {
      onClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, [ad.id, onClose, onTrackInteraction]);

  const handleClose = () => {
    onTrackInteraction('closed', ad.id);
    onClose();
  };

  const handleClick = () => {
    onTrackInteraction('clicked', ad.id);
    // Ici vous pourriez rediriger vers l'URL de l'annonceur
    console.log('Clic sur push ad:', ad.url);
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-40 animate-in slide-in-from-top-2 duration-300">
      <Card className="bg-white shadow-lg border border-gray-200 max-w-sm mx-auto">
        <div className="p-3 flex items-start space-x-3">
          {/* Icône */}
          <div className="text-2xl flex-shrink-0 mt-0.5">
            {ad.icon}
          </div>
          
          {/* Contenu */}
          <div 
            className="flex-1 cursor-pointer"
            onClick={handleClick}
          >
            <h4 className="font-semibold text-sm text-gray-900 mb-1">
              {ad.title}
            </h4>
            <p className="text-xs text-gray-600 leading-tight">
              {ad.message}
            </p>
            <div className="flex items-center mt-2 text-blue-600">
              <ExternalLink size={12} className="mr-1" />
              <span className="text-xs">En savoir plus</span>
            </div>
          </div>
          
          {/* Bouton fermer */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X size={12} />
          </Button>
        </div>
        
        {/* Barre de progression */}
        <div className="h-1 bg-gray-100">
          <div className="h-full bg-blue-500 animate-pulse" style={{
            animation: 'progress 8s linear forwards'
          }} />
        </div>
      </Card>
      
      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default InPagePushAd;
