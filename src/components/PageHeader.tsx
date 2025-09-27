
import { Calculator, CircleDollarSign, TrendingUp, HelpCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageHeaderProps {
  onTabChange: (tabValue: string) => void;
}

const PageHeader = ({ onTabChange }: PageHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-gradient-subtle rounded-xl p-6 md:p-8 mb-6 shadow-card fade-in">
      {/* Section outils disponibles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div 
          className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 cursor-pointer border border-primary/20 hover:border-primary/40"
          onClick={() => onTabChange("emprunt")}
        >
          <Calculator className="mx-auto mb-3 text-primary drop-shadow-sm" size={isMobile ? 24 : 28} />
          <p className="text-xs md:text-sm font-semibold text-primary">Emprunt</p>
        </div>
        <div 
          className="text-center p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 cursor-pointer border border-accent/20 hover:border-accent/40"
          onClick={() => onTabChange("rentabilite")}
        >
          <CircleDollarSign className="mx-auto mb-3 text-accent drop-shadow-sm" size={isMobile ? 24 : 28} />
          <p className="text-xs md:text-sm font-semibold text-accent">Rentabilité locative</p>
        </div>
        <div 
          className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 cursor-pointer border border-primary/20 hover:border-primary/40"
          onClick={() => onTabChange("interets")}
        >
          <TrendingUp className="mx-auto mb-3 text-primary drop-shadow-sm" size={isMobile ? 24 : 28} />
          <p className="text-xs md:text-sm font-semibold text-primary">Intérêts composés</p>
        </div>
        <div 
          className="text-center p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 shadow-card hover:shadow-card-hover transition-all duration-300 hover:scale-105 cursor-pointer border border-accent/20 hover:border-accent/40"
          onClick={() => onTabChange("faq")}
        >
          <HelpCircle className="mx-auto mb-3 text-accent drop-shadow-sm" size={isMobile ? 24 : 28} />
          <p className="text-xs md:text-sm font-semibold text-accent">FAQ</p>
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
