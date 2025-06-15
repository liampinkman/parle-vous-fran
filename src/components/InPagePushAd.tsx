
import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface InPagePushAdProps {
  onClose: () => void;
}

const InPagePushAd = ({ onClose }: InPagePushAdProps) => {
  useEffect(() => {
    // Désactiver le scroll du body
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAdClick = () => {
    console.log('📱 In-Page Push Ad clicked');
    // Ici vous pourriez intégrer le tracking Propeller Ads
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:items-center justify-center p-4 animate-fade-in">
      <Card className="relative w-full max-w-sm bg-white rounded-t-2xl md:rounded-2xl shadow-2xl animate-slide-in-bottom md:animate-scale-in">
        {/* Header avec bouton de fermeture */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Notification</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 rounded-full hover:bg-gray-100"
          >
            <X size={16} />
          </Button>
        </div>

        {/* Contenu de l'annonce */}
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              🎯 Offre Spéciale Limitée !
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Découvrez cette opportunité exclusive sélectionnée pour vous. 
              Ne laissez pas passer cette chance !
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleAdClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Voir l'offre maintenant
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Peut-être plus tard
            </Button>
          </div>

          {/* Mention légale */}
          <p className="text-xs text-gray-400 text-center mt-4">
            Publicité • Propeller Ads
          </p>
        </div>
      </Card>
    </div>
  );
};

export default InPagePushAd;
