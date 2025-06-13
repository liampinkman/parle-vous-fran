
/**
 * Configuration des variables d'environnement
 * Centralise toutes les configurations de l'application
 */

export const ENV = {
  // Mode de développement
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // Configuration Google Analytics
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || "GA_MEASUREMENT_ID",
  
  // Configuration de l'application
  APP_NAME: "Calculateur d'Investissement Immobilier",
  APP_VERSION: "1.0.0",
  
  // URLs de base
  BASE_URL: import.meta.env.BASE_URL || '/',
  
  // Configuration des calculateurs (limites et valeurs par défaut)
  CALCULATORS: {
    EMPRUNT: {
      MAX_DUREE: 25,
      TAUX_ENDETTEMENT_MAX: 35,
      TAUX_INTERET_DEFAULT: 3.5,
    },
    RENTABILITE: {
      FRAIS_NOTAIRE_DEFAULT: 8,
      TAUX_IMPOT_DEFAULT: 30,
    },
    INTERETS_COMPOSES: {
      TAUX_RENDEMENT_DEFAULT: 7,
      DUREE_MAX: 50,
    },
  },
} as const;

// Types pour TypeScript
export type CalculatorType = 'emprunt' | 'rentabilite' | 'interets_composes';

// Validation des variables d'environnement en développement
if (ENV.isDevelopment) {
  console.log('🔧 Mode développement activé');
  console.log('📊 Configuration des calculateurs:', ENV.CALCULATORS);
}
