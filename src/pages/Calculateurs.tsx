import { Calculator, TrendingUp, Target, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";

const Calculateurs = () => {
  const isMobile = useIsMobile();

  const calculators = [
    {
      title: "Capacité d'Emprunt",
      description: "Calculez votre capacité d'emprunt maximale selon vos revenus et charges",
      icon: Calculator,
      link: "/?tab=emprunt",
      color: "primary"
    },
    {
      title: "Rentabilité Locative",
      description: "Évaluez la rentabilité de votre investissement immobilier",
      icon: TrendingUp,
      link: "/?tab=rentabilite",
      color: "accent"
    },
    {
      title: "Simulation Investissement",
      description: "Simulez différents scénarios d'investissement",
      icon: Target,
      link: "/?tab=emprunt",
      color: "primary"
    },
    {
      title: "Intérêts Composés",
      description: "Découvrez la puissance des intérêts composés sur vos placements",
      icon: BarChart3,
      link: "/?tab=interets",
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Nos Calculateurs Financiers
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre gamme complète d'outils de simulation financière pour optimiser vos investissements immobiliers et financiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {calculators.map((calculator, index) => {
              const Icon = calculator.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-3 rounded-lg bg-${calculator.color}/10`}>
                        <Icon className={`text-${calculator.color}`} size={24} />
                      </div>
                      <CardTitle className="text-xl">{calculator.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {calculator.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link 
                      to={calculator.link}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Utiliser ce calculateur
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="bg-gradient-subtle rounded-xl p-8 text-center">
            <h2 className="text-2xl font-heading font-bold text-primary mb-4">
              Pourquoi utiliser nos calculateurs ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calculator className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Calculs Précis</h3>
                <p className="text-sm text-muted-foreground">
                  Algorithmes basés sur les dernières réglementations françaises
                </p>
              </div>
              <div>
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="text-accent" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Données Actualisées</h3>
                <p className="text-sm text-muted-foreground">
                  Taux et barèmes mis à jour régulièrement pour 2025
                </p>
              </div>
              <div>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="text-primary" size={24} />
                </div>
                <h3 className="font-semibold mb-2">Aide à la Décision</h3>
                <p className="text-sm text-muted-foreground">
                  Visualisations claires pour prendre les bonnes décisions
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calculateurs;