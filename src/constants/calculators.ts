
/**
 * Constantes et configurations pour les calculateurs financiers
 * Centralise toutes les valeurs par défaut et limites
 */

// Valeurs par défaut pour le calculateur d'emprunt
export const EMPRUNT_DEFAULTS = {
  REVENU_MENSUEL: "3000",
  CHARGES: "500",
  DUREE: "20",
  TAUX_INTERET: "3.5",
} as const;

// Valeurs par défaut pour le calculateur de rentabilité
export const RENTABILITE_DEFAULTS = {
  PRIX_ACHAT: "200000",
  FRAIS_NOTAIRE: "8",
  LOYER_MENSUEL: "1000",
  CHARGES_ANNUELLES: "2000",
  TAUX_IMPOT: "30",
  APPORT: "40000",
  TAUX_CREDIT: "3.5",
  DUREE_CREDIT: "20",
} as const;

// Valeurs par défaut pour le calculateur d'intérêts composés
export const INTERETS_COMPOSES_DEFAULTS = {
  MONTANT_INITIAL: "10000",
  VERSEMENTS_MENSUELS: "200",
  TAUX_ANNUEL: "7",
  DUREE: "20",
} as const;

// Limites et contraintes
export const CALCULATOR_LIMITS = {
  EMPRUNT: {
    MIN_REVENU: 100,
    MAX_REVENU: 100000,
    MIN_DUREE: 5,
    MAX_DUREE: 25,
    MIN_TAUX: 0.1,
    MAX_TAUX: 15,
    TAUX_ENDETTEMENT_MAX: 35,
  },
  RENTABILITE: {
    MIN_PRIX: 10000,
    MAX_PRIX: 10000000,
    MIN_LOYER: 100,
    MAX_LOYER: 50000,
    MIN_FRAIS_NOTAIRE: 5,
    MAX_FRAIS_NOTAIRE: 15,
  },
  INTERETS_COMPOSES: {
    MIN_MONTANT: 100,
    MAX_MONTANT: 10000000,
    MIN_VERSEMENT: 0,
    MAX_VERSEMENT: 100000,
    MIN_TAUX: 0,
    MAX_TAUX: 30,
    MIN_DUREE: 1,
    MAX_DUREE: 50,
  },
} as const;

// Messages d'erreur standardisés
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: "Ce champ est obligatoire",
  INVALID_NUMBER: "Veuillez saisir un nombre valide",
  VALUE_TOO_LOW: "La valeur est trop faible",
  VALUE_TOO_HIGH: "La valeur est trop élevée",
  INVALID_PERCENTAGE: "Veuillez saisir un pourcentage valide",
} as const;

// Types pour TypeScript
export type EmpruntDefaults = typeof EMPRUNT_DEFAULTS;
export type RentabiliteDefaults = typeof RENTABILITE_DEFAULTS;
export type InteretsComposesDefaults = typeof INTERETS_COMPOSES_DEFAULTS;
