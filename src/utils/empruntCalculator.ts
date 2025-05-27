
import { memoize } from "./memoization";

/**
 * Loan capacity calculation utilities
 */

// Calcul de la capacité d'emprunt optimisé
export const calculateEmpruntCapacity = memoize((
  revenuMensuel: number,
  charges: number,
  tauxInteret: number,
  duree: number
): {
  capaciteEmprunt: number;
  mensualite: number;
  tauxEndettement: number;
} => {
  // Capacité d'endettement maximum (35% des revenus)
  const capaciteMensuelle = (revenuMensuel - charges) * 0.35;
  
  // Calcul de la capacité d'emprunt (formule de crédit)
  const tauxMensuel = tauxInteret / 100 / 12;
  const nbMois = duree * 12;
  
  // Optimisation de la formule pour éviter les erreurs de précision flottante
  let capacite: number;
  
  if (tauxMensuel <= 0) {
    // Si le taux est de 0%, c'est un simple calcul linéaire
    capacite = capaciteMensuelle * nbMois;
  } else {
    capacite = capaciteMensuelle * (1 - Math.pow(1 + tauxMensuel, -nbMois)) / tauxMensuel;
  }
  
  // Calcul du taux d'endettement
  const tauxEndettementValue = (capaciteMensuelle / revenuMensuel) * 100;
  
  return {
    capaciteEmprunt: Math.round(capacite),
    mensualite: Math.round(capaciteMensuelle),
    tauxEndettement: Math.round(tauxEndettementValue * 100) / 100
  };
});
