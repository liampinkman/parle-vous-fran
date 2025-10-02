import { Building2, TrendingUp, Calculator, Shield } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="header-professional border-b border-primary/10">
      <div className="container mx-auto px-4 py-4">
        {/* Top Bar avec logo et navigation */}
        <div className="flex items-center justify-between mb-4">
          {/* Logo et nom */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="relative">
              <Building2 size={isMobile ? 32 : 40} className="text-accent" />
              <TrendingUp size={16} className="absolute -top-1 -right-1 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-heading font-bold text-primary-foreground">
                InvestSmart
              </h1>
              <p className="text-xs md:text-sm text-primary-foreground/70 font-medium">
                Simulation Investissement
              </p>
            </div>
          </Link>

          {/* Navigation principale - Desktop */}
          {!isMobile && (
            <nav className="header-nav">
              <Link to="/calculateurs" className="flex items-center gap-2">
                <Calculator size={16} />
                Calculateurs
              </Link>
              <Link to="/conseils" className="flex items-center gap-2">
                <Shield size={16} />
                Conseils
              </Link>
              <Link to="/expertise" className="flex items-center gap-2">
                <TrendingUp size={16} />
                Expertise
              </Link>
            </nav>
          )}
        </div>

        {/* Slogan principal */}
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary-foreground mb-2">
            Calculateur d'Investissement Immobilier
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-accent">Optimisez vos investissements</span> avec nos outils professionnels. 
            Calculez votre capacité d'emprunt, analysez la rentabilité locative et prenez des décisions éclairées.
          </p>
          
          {/* Badges de confiance */}
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-1">
              <Shield size={16} className="text-accent" />
              <span>100% Gratuit</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp size={16} className="text-accent" />
              <span>Calculs Précis</span>
            </div>
            <div className="flex items-center gap-1">
              <Building2 size={16} className="text-accent" />
              <span>Données 2025</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;