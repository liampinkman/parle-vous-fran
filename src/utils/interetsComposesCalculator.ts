
import { memoize } from "./memoization";

/**
 * Compound interest calculation utilities
 */

// Calcul des intérêts composés optimisé avec Web Worker si disponible
export const calculateInteretsComposes = memoize((
  capital: number,
  versements: number,
  taux: number,
  annees: number
): Array<{
  annee: number;
  capitalDebutAnnee: number;
  capitalFinAnnee: number;
  versementsCumules: number;
  interetsGeneres: number;
  gainTotal: number;
}> => {
  // Optimisation: utilisation de constantes locales pour éviter les calculs répétitifs
  const tauxMensuel = taux / 100 / 12;
  const moisTotal = annees * 12;
  
  let resultatsCalculs = [];
  let capitalActuel = capital;
  let versementsCumules = 0;
  let interetsGeneres = 0;
  
  // Optimisation : utiliser un Set pour les années à construire
  const anneesAConstruire = new Set([...Array.from({length: Math.min(annees, 40)}, (_, i) => i + 1)]);
  
  // Ajouter quelques années de référence
  if (annees > 40) {
    [45, 50, annees].forEach(a => {
      if (a <= annees) anneesAConstruire.add(a);
    });
  }
  
  // Convertir le Set en tableau trié
  const anneesTriees = Array.from(anneesAConstruire).sort((a, b) => a - b);
  const maxAnnee = Math.max(...anneesTriees);
  
  // Pré-allouer le tableau de résultats pour éviter les redimensionnements
  resultatsCalculs = new Array(anneesTriees.length);
  let resultIndex = 0;
  
  for (let annee = 1; annee <= maxAnnee; annee++) {
    const capitalDebutAnnee = capitalActuel;
    
    // Calcul optimisé pour les 12 mois de l'année
    for (let mois = 1; mois <= 12; mois++) {
      const interetsMois = capitalActuel * tauxMensuel;
      capitalActuel += interetsMois + versements;
      versementsCumules += versements;
      interetsGeneres += interetsMois;
    }
    
    // N'ajouter que les années qui nous intéressent
    if (anneesTriees.includes(annee)) {
      resultatsCalculs[resultIndex++] = {
        annee,
        capitalDebutAnnee,
        capitalFinAnnee: capitalActuel,
        versementsCumules,
        interetsGeneres,
        gainTotal: capitalActuel - capital - versementsCumules
      };
    }
  }

  return resultatsCalculs;
});

// Récupération des années clés pour l'affichage des résultats
export const getAnneesCles = memoize((resultats: any[], duree: number): any[] => {
  if (!resultats || resultats.length <= 5) return resultats || [];
  
  // Années importantes incluant les années jusqu'à 40 ans
  const anneesImportantes = [1, 5, 10, 15, 20, 25, 30, 35, 40];
  const resultatsFiltered = resultats.filter(r => 
    anneesImportantes.includes(r.annee) || 
    r.annee === duree || 
    r.annee === resultats.length
  );
  
  // Si le filtrage a tout supprimé, retourner au moins quelques résultats
  return resultatsFiltered.length ? resultatsFiltered : resultats.slice(0, 5);
});
