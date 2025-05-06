/**
 * Utilitaires pour les calculs financiers optimisés
 */

// Memoization pour les calculs fréquents
const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    // Limiter la taille du cache pour éviter les fuites mémoire
    if (cache.size > 100) {
      // Supprimer la première entrée (la plus ancienne)
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  }) as T;
};

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
  const anneesAConstruire = new Set([...Array.from({length: Math.min(annees, 10)}, (_, i) => i + 1)]);
  
  // Ajouter quelques années de référence
  if (annees > 10) {
    [15, 20, 25, 30, annees].forEach(a => {
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

// Formattage des montants en euros - memoization pour éviter les reformatages inutiles
export const formatMontant = memoize((montant: number): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(montant);
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
