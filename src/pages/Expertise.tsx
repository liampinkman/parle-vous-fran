import { Building2, TrendingUp, Shield, Users, Award, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Expertise = () => {
  const services = [
    {
      title: "Analyse de Marché",
      description: "Étude approfondie des tendances immobilières locales",
      icon: TrendingUp,
      features: [
        "Analyse des prix au m² par quartier",
        "Prévisions d'évolution du marché",
        "Identification des zones porteuses",
        "Rapport détaillé avec recommandations"
      ]
    },
    {
      title: "Optimisation Fiscale",
      description: "Stratégies pour réduire votre fiscalité immobilière",
      icon: Shield,
      features: [
        "Choix du régime fiscal optimal",
        "Optimisation des charges déductibles",
        "Stratégies de défiscalisation",
        "Simulation d'impact fiscal"
      ]
    },
    {
      title: "Accompagnement Investisseur",
      description: "Conseil personnalisé pour vos projets d'investissement",
      icon: Users,
      features: [
        "Définition de votre stratégie",
        "Recherche et sélection de biens",
        "Négociation et financement",
        "Suivi post-acquisition"
      ]
    }
  ];

  const stats = [
    { value: "500+", label: "Projets accompagnés" },
    { value: "15M€", label: "Volume d'investissements" },
    { value: "98%", label: "Clients satisfaits" },
    { value: "12", label: "Années d'expérience" }
  ];

  const testimonials = [
    {
      name: "Marie D.",
      location: "Paris",
      text: "Grâce à InvestSmart, j'ai pu optimiser mon premier investissement locatif. Le rendement dépasse mes attentes !",
      rating: 5
    },
    {
      name: "Pierre L.",
      location: "Lyon",
      text: "L'accompagnement personnalisé m'a permis d'éviter de nombreux pièges. Une expertise qui vaut son pesant d'or.",
      rating: 5
    },
    {
      name: "Sophie M.",
      location: "Bordeaux",
      text: "Les outils de simulation sont très précis. J'ai pu constituer un patrimoine immobilier solide en 3 ans.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Notre Expertise à Votre Service
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Bénéficiez de plus de 12 ans d'expérience dans l'investissement immobilier. 
              Nos experts vous accompagnent pour maximiser vos rendements et sécuriser vos investissements.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
              Nos Services d'Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                          <Icon className="text-primary" size={24} />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start gap-3">
                            <CheckCircle className="text-accent mt-0.5 flex-shrink-0" size={16} />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Témoignages */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-12">
              Ce que disent nos clients
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <Card className="mb-16 bg-gradient-subtle">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4 flex items-center justify-center gap-2">
                <Award className="text-accent" size={28} />
                Certifications & Agréments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                <div className="flex items-center justify-center gap-3">
                  <Shield className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">Conseiller en Investissements Financiers</p>
                    <p className="text-sm text-muted-foreground">Agrément ORIAS n° 12345678</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Building2 className="text-accent" size={24} />
                  <div>
                    <p className="font-semibold">Expert Immobilier Certifié</p>
                    <p className="text-sm text-muted-foreground">Membre FNAIM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Contact */}
          <Card className="text-center bg-primary text-primary-foreground">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-semibold mb-4">
                Prêt à booster vos investissements ?
              </h3>
              <p className="mb-6 text-primary-foreground/90">
                Contactez nos experts pour une consultation personnalisée et gratuite
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/"
                  className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground rounded-lg font-semibold hover:bg-background/90 transition-colors"
                >
                  Utiliser nos calculateurs
                </Link>
                <button className="inline-flex items-center justify-center px-6 py-3 border border-primary-foreground text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
                  Demander un conseil
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Expertise;