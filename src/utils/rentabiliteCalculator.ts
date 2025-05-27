
import { memoize } from "./memoization";

/**
 * Rental profitability calculation utilities
 */

// Calcul de la rentabilité locative optimisé
export const calculateRentabilite = memoize((
  prixAchat: number,
  fraisNotaire: number,
  loyerMensuel: number,
  chargesAnnuelles: number,
  tauxImposition: number,
  apportInitial: number,
  tauxCredit: number,
  dureeCredit: number
): {
  rentabilite: number;
  rentabiliteNette: number;
  cashflowMensuel: number;
  cashflowApresImpot: number;
  rendementApresImpot: number;
  mensualiteCredit: number;
  montantEmprunte: number;
  cashflowNetMensuel: number;
} => {
  const fraisMontant = (prixAchat * fraisNotaire) / 100;
  const investissementTotal = prixAchat + fraisMontant;
  const revenusAnnuels = loyerMensuel * 12;
  
  // Calculs liés au crédit
  const montantEmprunte = prixAchat - apportInitial;
  const tauxMensuel = tauxCredit / 100 / 12;
  const nombreMensualites = dureeCredit * 12;
  
  // Calcul de la mensualité de crédit (formule de crédit)
  let mensualiteCredit: number;
  
  if (montantEmprunte <= 0) {
    // Pas d'emprunt
    mensualiteCredit = 0;
  } else if (tauxMensuel <= 0) {
    // Taux à 0%
    mensualiteCredit = montantEmprunte / nombreMensualites;
  } else {
    mensualiteCredit = montantEmprunte * (tauxMensuel * Math.pow(1 + tauxMensuel, nombreMensualites)) / (Math.pow(1 + tauxMensuel, nombreMensualites) - 1);
  }
  
  // Rentabilité brute (hors frais de notaire)
  const rentabilite = (revenusAnnuels / prixAchat) * 100;
  
  // Rentabilité nette (avec frais de notaire et charges)
  const rentabiliteNette = ((revenusAnnuels - chargesAnnuelles) / investissementTotal) * 100;
  
  // Cash-flow mensuel avant impôt
  const cashflowMensuel = (revenusAnnuels - chargesAnnuelles) / 12;
  
  // Calcul de l'impôt (PFU ou régime réel simplifié)
  const revenuImposable = revenusAnnuels - chargesAnnuelles;
  const impotAnnuel = Math.max(0, revenuImposable * tauxImposition);
  
  // Cash-flow mensuel après impôt
  const cashflowApresImpot = (revenuImposable - impotAnnuel) / 12;
  
  // Cash-flow net mensuel (après crédit et impôts)
  const cashflowNetMensuel = cashflowApresImpot - mensualiteCredit;
  
  // Rendement après impôt
  const rendementApresImpot = ((revenuImposable - impotAnnuel) / investissementTotal) * 100;

  return {
    rentabilite: parseFloat(rentabilite.toFixed(2)),
    rentabiliteNette: parseFloat(rentabiliteNette.toFixed(2)),
    cashflowMensuel: parseFloat(cashflowMensuel.toFixed(2)),
    cashflowApresImpot: parseFloat(cashflowApresImpot.toFixed(2)),
    rendementApresImpot: parseFloat(rendementApresImpot.toFixed(2)),
    mensualiteCredit: parseFloat(mensualiteCredit.toFixed(2)),
    montantEmprunte: parseFloat(montantEmprunte.toFixed(2)),
    cashflowNetMensuel: parseFloat(cashflowNetMensuel.toFixed(2))
  };
});
