
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MobileOverlayAdProps {
  onClose: () => void;
  onTrackInteraction: (action: 'shown' | 'closed' | 'clicked') => void;
}

const MobileOverlayAd = ({ onClose, onTrackInteraction }: MobileOverlayAdProps) => {
  useEffect(() => {
    // Tracker l'affichage de l'overlay
    onTrackInteraction('shown');
    
    // Désactiver le scroll du body quand l'overlay est ouvert
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [onTrackInteraction]);

  const handleClose = () => {
    onTrackInteraction('closed');
    onClose();
  };

  const handleAdClick = () => {
    onTrackInteraction('clicked');
    // Ici vous pourriez rediriger vers l'annonceur
    console.log('Clic sur la publicité mobile');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="relative w-full max-w-sm bg-white rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Bouton de fermeture - optimisé pour le tactile */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-gray-800 text-white hover:bg-gray-900 z-10 shadow-lg touch-manipulation"
          aria-label="Fermer la publicité"
        >
          <X size={16} />
        </Button>

        {/* Contenu de la publicité */}
        <div 
          className="p-6 text-center cursor-pointer touch-manipulation"
          onClick={handleAdClick}
        >
          {/* Placeholder pour le contenu publicitaire */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-4">
            <h3 className="text-lg font-bold mb-2">🏠 Investissement Immobilier</h3>
            <p className="text-sm opacity-90">
              Découvrez les meilleures opportunités d'investissement près de chez vous
            </p>
          </div>
          
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg touch-manipulation"
            onClick={handleAdClick}
          >
            En savoir plus
          </Button>
          
          {/* Mention légale */}
          <p className="text-xs text-gray-500 mt-3">Publicité</p>
        </div>
      </Card>
    </div>
  );
};

export default MobileOverlayAd;
