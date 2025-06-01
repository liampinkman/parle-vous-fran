
import { CircleDollarSign } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PageHeader = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-primary flex items-center gap-2">
        <CircleDollarSign size={isMobile ? 24 : 28} />
        Calculateur d'Investissement Immobilier
      </h1>
      
      {!isMobile && (
        <div className="prose max-w-none mb-4 md:mb-6">
          <p className="text-base md:text-lg text-gray-700 mb-2">
            Bienvenue sur notre calculateur d'investissement immobilier pour la France en 2025. Cet outil gratuit vous aide à planifier votre projet immobilier de A à Z, de l'emprunt initial jusqu'à l'analyse de la rentabilité locative.
          </p>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
