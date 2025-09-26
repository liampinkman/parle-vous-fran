import { Shield, TrendingUp, Building2, DollarSign, Calculator, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Conseils = () => {
  const conseils = [
    {
      title: "Optimiser sa Capacité d'Emprunt",
      description: "Stratégies pour maximiser votre pouvoir d'achat immobilier",
      icon: Calculator,
      tips: [
        "Réduisez vos crédits en cours avant de faire votre demande",
        "Optimisez vos revenus (13ème mois, primes, revenus fonciers)",
        "Négociez le taux d'endettement avec votre banquier",
        "Considérez l'achat à deux pour doubler la capacité"
      ]
    },
    {
      title: "Maximiser la Rentabilité Locative",
      description: "Comment améliorer le rendement de vos investissements",
      icon: TrendingUp,
      tips: [
        "Choisissez des zones à forte demande locative",
        "Optimisez les charges déductibles (travaux, intérêts)",
        "Négociez les frais de notaire et d'agence",
        "Considérez la location meublée pour un meilleur rendement"
      ]
    },
    {
      title: "Sécuriser son Investissement",
      description: "Réduire les risques et protéger son capital",
      icon: Shield,
      tips: [
        "Diversifiez vos investissements géographiquement",
        "Souscrivez une assurance loyers impayés",
        "Constituez une réserve de trésorerie (6 mois de charges)",
        "Vérifiez la solvabilité des locataires"
      ]
    }
  ];

  const faqItems = [
    {
      question: "Quel est le taux d'endettement maximum en 2025 ?",
      answer: "Le Haut Conseil de Stabilité Financière (HCSF) recommande un taux d'endettement maximum de 35% des revenus nets. Cependant, certaines banques peuvent accepter jusqu'à 40% selon le profil de l'emprunteur."
    },
    {
      question: "Comment calculer la rentabilité locative nette ?",
      answer: "La rentabilité nette = (Loyers annuels - Charges - Impôts) / Prix d'achat total × 100. Il faut déduire toutes les charges : taxe foncière, assurances, entretien, vacance locative et fiscalité."
    },
    {
      question: "Quels sont les frais à prévoir lors d'un achat immobilier ?",
      answer: "Comptez 7-8% du prix d'achat dans l'ancien (frais de notaire, garanties) et 2-3% dans le neuf. Ajoutez les frais d'agence (3-10%), de dossier bancaire (1000€) et éventuellement les travaux."
    },
    {
      question: "Faut-il investir avec ou sans apport ?",
      answer: "Un apport de 10-20% est recommandé pour obtenir de meilleures conditions. Sans apport, les taux sont plus élevés et l'obtention du crédit plus difficile, mais cela préserve votre trésorerie pour d'autres investissements."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Conseils d'Investissement
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez nos conseils d'experts pour optimiser vos investissements immobiliers et financiers en 2025.
            </p>
          </div>

          {/* Conseils principaux */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {conseils.map((conseil, index) => {
              const Icon = conseil.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon className="text-primary" size={24} />
                      </div>
                    </div>
                    <CardTitle className="text-lg">{conseil.title}</CardTitle>
                    <CardDescription>
                      {conseil.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {conseil.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Alerte réglementaire */}
          <Card className="mb-12 border-orange-200 bg-orange-50/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-orange-600" size={24} />
                <CardTitle className="text-orange-800">Réglementation 2025</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700">
                <strong>Nouvelles règles HCSF :</strong> Le taux d'endettement reste plafonné à 35% avec possibilité de dérogation de 20% des dossiers. 
                La durée maximale des prêts immobiliers est limitée à 25 ans (27 ans pour l'achat d'un logement neuf ou en VEFA).
              </p>
            </CardContent>
          </Card>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-primary mb-6 text-center">
              Questions Fréquentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* CTA vers calculateurs */}
          <Card className="bg-gradient-subtle text-center">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Prêt à calculer votre projet ?</h3>
              <p className="text-muted-foreground mb-6">
                Utilisez nos calculateurs pour appliquer ces conseils à votre situation
              </p>
              <Link 
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Accéder aux calculateurs
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Conseils;