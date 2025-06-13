
/**
 * Utilitaires de validation pour les calculateurs
 */

import { CALCULATOR_LIMITS, ERROR_MESSAGES } from "@/constants/calculators";

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Valide un nombre dans une plage donnée
 */
export const validateNumber = (
  value: string | number,
  min: number,
  max: number,
  required = true
): ValidationResult => {
  const stringValue = String(value).trim();
  
  if (!stringValue && required) {
    return { isValid: false, error: ERROR_MESSAGES.REQUIRED_FIELD };
  }
  
  if (!stringValue && !required) {
    return { isValid: true };
  }
  
  const numValue = parseFloat(stringValue);
  
  if (isNaN(numValue)) {
    return { isValid: false, error: ERROR_MESSAGES.INVALID_NUMBER };
  }
  
  if (numValue < min) {
    return { isValid: false, error: `${ERROR_MESSAGES.VALUE_TOO_LOW} (minimum: ${min})` };
  }
  
  if (numValue > max) {
    return { isValid: false, error: `${ERROR_MESSAGES.VALUE_TOO_HIGH} (maximum: ${max})` };
  }
  
  return { isValid: true };
};

/**
 * Validation spécifique pour le calculateur d'emprunt
 */
export const validateEmpruntInputs = (
  revenu: string,
  charges: string,
  duree: string,
  taux: string
) => {
  const revenuValidation = validateNumber(
    revenu,
    CALCULATOR_LIMITS.EMPRUNT.MIN_REVENU,
    CALCULATOR_LIMITS.EMPRUNT.MAX_REVENU
  );
  
  const chargesValidation = validateNumber(
    charges,
    0,
    parseFloat(revenu) || 0,
    false
  );
  
  const dureeValidation = validateNumber(
    duree,
    CALCULATOR_LIMITS.EMPRUNT.MIN_DUREE,
    CALCULATOR_LIMITS.EMPRUNT.MAX_DUREE
  );
  
  const tauxValidation = validateNumber(
    taux,
    CALCULATOR_LIMITS.EMPRUNT.MIN_TAUX,
    CALCULATOR_LIMITS.EMPRUNT.MAX_TAUX
  );
  
  return {
    revenu: revenuValidation,
    charges: chargesValidation,
    duree: dureeValidation,
    taux: tauxValidation,
    isAllValid: [revenuValidation, chargesValidation, dureeValidation, tauxValidation]
      .every(v => v.isValid)
  };
};

/**
 * Validation spécifique pour le calculateur de rentabilité
 */
export const validateRentabiliteInputs = (
  prixAchat: string,
  loyerMensuel: string,
  fraisNotaire: string
) => {
  const prixValidation = validateNumber(
    prixAchat,
    CALCULATOR_LIMITS.RENTABILITE.MIN_PRIX,
    CALCULATOR_LIMITS.RENTABILITE.MAX_PRIX
  );
  
  const loyerValidation = validateNumber(
    loyerMensuel,
    CALCULATOR_LIMITS.RENTABILITE.MIN_LOYER,
    CALCULATOR_LIMITS.RENTABILITE.MAX_LOYER
  );
  
  const fraisValidation = validateNumber(
    fraisNotaire,
    CALCULATOR_LIMITS.RENTABILITE.MIN_FRAIS_NOTAIRE,
    CALCULATOR_LIMITS.RENTABILITE.MAX_FRAIS_NOTAIRE
  );
  
  return {
    prix: prixValidation,
    loyer: loyerValidation,
    frais: fraisValidation,
    isAllValid: [prixValidation, loyerValidation, fraisValidation]
      .every(v => v.isValid)
  };
};

/**
 * Validation spécifique pour le calculateur d'intérêts composés
 */
export const validateInteretsComposesInputs = (
  montantInitial: string,
  versementsMensuels: string,
  tauxAnnuel: string,
  duree: string
) => {
  const montantValidation = validateNumber(
    montantInitial,
    CALCULATOR_LIMITS.INTERETS_COMPOSES.MIN_MONTANT,
    CALCULATOR_LIMITS.INTERETS_COMPOSES.MAX_MONTANT
  );
  
  const versementsValidation = validateNumber(
    versementsMensuels,
    CALCULATOR_LIMITS.INTERETS_COMPOSES.MIN_VERSEMENT,
    CALCULATOR_LIMITS.INTERETS_COMPOSES.MAX_VERSEMENT,
    false
  );
  
  const tauxValidation = validateNumber(
    tauxAnnuel,
    CALCULATOR_LIMITS.INTERETS_COMPOSES.MIN_TAUX,
    CALCULATOR_LIMITS.INTERETS_COMPOSES.MAX_TAUX
  );
  
  const dureeValidation = validateNumber(
    duree,
    CALCULATOR_LIMITS.INTERETS_COMPOSES.MIN_DUREE,
    CALCULATOR_LIMITS.INTERETS_COMPOSES.MAX_DUREE
  );
  
  return {
    montant: montantValidation,
    versements: versementsValidation,
    taux: tauxValidation,
    duree: dureeValidation,
    isAllValid: [montantValidation, versementsValidation, tauxValidation, dureeValidation]
      .every(v => v.isValid)
  };
};
