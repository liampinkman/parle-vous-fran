
import { CircleDollarSign } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PageHeader = () => {
  const isMobile = useIsMobile();

  return (
    <div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-primary flex items-center gap-3">
        <CircleDollarSign size={isMobile ? 32 : 40} />
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
