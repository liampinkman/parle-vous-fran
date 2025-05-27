
import { memoize } from "./memoization";

/**
 * Formatting utilities for financial calculations
 */

// Formattage des montants en euros - memoization pour éviter les reformatages inutiles
export const formatMontant = memoize((montant: number): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(montant);
});
