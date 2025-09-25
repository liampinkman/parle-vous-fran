
import { Calculator, TrendingUp, Target, BarChart3 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const PageHeader = () => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-gradient-subtle rounded-xl p-6 md:p-8 mb-6 shadow-card fade-in">
      {/* Section outils disponibles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-card shadow-card">
          <Calculator className="mx-auto mb-2 text-primary" size={isMobile ? 20 : 24} />
          <p className="text-xs md:text-sm font-medium text-foreground">Capacité Emprunt</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-card shadow-card">
          <TrendingUp className="mx-auto mb-2 text-accent" size={isMobile ? 20 : 24} />
          <p className="text-xs md:text-sm font-medium text-foreground">Rentabilité</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-card shadow-card">
          <Target className="mx-auto mb-2 text-primary" size={isMobile ? 20 : 24} />
          <p className="text-xs md:text-sm font-medium text-foreground">Simulation</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-card shadow-card">
          <BarChart3 className="mx-auto mb-2 text-accent" size={isMobile ? 20 : 24} />
          <p className="text-xs md:text-sm font-medium text-foreground">Intérêts Composés</p>
        </div>
      </div>

      {/* Titre principal */}
      <div className="text-center">
        <h1 className="text-xl md:text-2xl font-heading font-bold mb-3 text-primary">
          Outils de Simulation Financière
        </h1>
        
        {!isMobile && (
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Prenez des décisions d'investissement éclairées grâce à nos calculateurs professionnels. 
            Analysez votre capacité d'emprunt, évaluez la rentabilité de vos projets et optimisez vos investissements.
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
