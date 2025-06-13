
/**
 * Configuration SEO et métadonnées pour l'application
 */

export const SEO_CONFIG = {
  // Métadonnées principales
  title: "Calculateur d'Investissement Immobilier - Simulateur Gratuit 2025",
  description: "Calculez votre capacité d'emprunt, rentabilité locative et intérêts composés. Simulateur gratuit pour l'investissement immobilier en France avec données 2025.",
  keywords: [
    "calculateur emprunt immobilier",
    "rentabilité locative",
    "capacité d'emprunt",
    "investissement immobilier",
    "simulation prêt immobilier",
    "calcul rentabilité",
    "intérêts composés",
    "investissement 2025",
    "France"
  ].join(", "),
  
  // Open Graph (Facebook, LinkedIn)
  ogTitle: "Calculateur d'Investissement Immobilier Gratuit",
  ogDescription: "Simulez vos investissements immobiliers : capacité d'emprunt, rentabilité locative et intérêts composés. Outil gratuit et conforme aux normes françaises 2025.",
  ogImage: "/assets/og-image.jpg", // À créer
  ogUrl: "https://votre-domaine.com",
  
  // Twitter Card
  twitterCard: "summary_large_image" as const,
  twitterTitle: "Calculateur d'Investissement Immobilier",
  twitterDescription: "Simulateur gratuit pour calculer votre capacité d'emprunt et rentabilité locative en France",
  
  // Informations du site
  siteName: "Calculateur Investissement Immobilier",
  locale: "fr_FR",
  type: "website" as const,
  
  // Schema.org structured data
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculateur d'Investissement Immobilier",
    "description": "Application web gratuite pour calculer la capacité d'emprunt, rentabilité locative et intérêts composés pour l'investissement immobilier en France",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "provider": {
      "@type": "Organization",
      "name": "Calculateur Investissement Immobilier"
    }
  }
} as const;

// Fonction pour générer les métadonnées dynamiques
export const generatePageMetadata = (pageType?: string) => {
  const baseTitle = SEO_CONFIG.title;
  const baseDescription = SEO_CONFIG.description;
  
  switch (pageType) {
    case 'mentions-legales':
      return {
        title: `Mentions Légales - ${SEO_CONFIG.siteName}`,
        description: "Mentions légales et informations juridiques du calculateur d'investissement immobilier."
      };
    default:
      return {
        title: baseTitle,
        description: baseDescription
      };
  }
};
