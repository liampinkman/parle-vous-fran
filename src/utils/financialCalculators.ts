
/**
 * Utilitaires pour les calculs financiers
 */

// Calcul de la capacité d'emprunt
export const calculateEmpruntCapacity = (
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
  const capacite = capaciteMensuelle * (1 - Math.pow(1 + tauxMensuel, -nbMois)) / tauxMensuel;
  
  // Calcul du taux d'endettement
  const tauxEndettementValue = (capaciteMensuelle / revenuMensuel) * 100;
  
  return {
    capaciteEmprunt: Math.round(capacite),
    mensualite: Math.round(capaciteMensuelle),
    tauxEndettement: Math.round(tauxEndettementValue * 100) / 100
  };
};

// Calcul de la rentabilité locative
export const calculateRentabilite = (
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
  const mensualiteCredit = montantEmprunte * (tauxMensuel * Math.pow(1 + tauxMensuel, nombreMensualites)) / (Math.pow(1 + tauxMensuel, nombreMensualites) - 1);
  
  // Rentabilité brute (hors frais de notaire)
  const rentabilite = (revenusAnnuels / prixAchat) * 100;
  
  // Rentabilité nette (avec frais de notaire et charges)
  const rentabiliteNette = ((revenusAnnuels - chargesAnnuelles) / investissementTotal) * 100;
  
  // Cash-flow mensuel avant impôt
  const cashflowMensuel = (revenusAnnuels - chargesAnnuelles) / 12;
  
  // Calcul de l'impôt (PFU ou régime réel simplifié)
  const revenuImposable = revenusAnnuels - chargesAnnuelles;
  const impotAnnuel = revenuImposable * tauxImposition;
  
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
};

// Calcul des intérêts composés
export const calculateInteretsComposes = (
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
  const tauxMensuel = taux / 100 / 12;
  let resultatsCalculs = [];
  let capitalActuel = capital;
  let versementsCumules = 0;
  let interetsGeneres = 0;

  for (let annee = 1; annee <= Math.max(annees, 30); annee++) {
    const capitalDebutAnnee = capitalActuel;
    
    for (let mois = 1; mois <= 12; mois++) {
      const interetsMois = capitalActuel * tauxMensuel;
      capitalActuel += interetsMois + versements;
      versementsCumules += versements;
      interetsGeneres += interetsMois;
    }
    
    if (annee <= annees || annee === 25 || annee === 30) {
      resultatsCalculs.push({
        annee,
        capitalDebutAnnee,
        capitalFinAnnee: capitalActuel,
        versementsCumules,
        interetsGeneres,
        gainTotal: capitalActuel - capital - versementsCumules
      });
    }
  }

  return resultatsCalculs;
};

// Formattage des montants en euros
export const formatMontant = (montant: number): string => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR', 
    minimumFractionDigits: 0,
    maximumFractionDigits: 0 
  }).format(montant);
};

// Récupération des années clés pour l'affichage des résultats
export const getAnneesCles = (resultats: any[], duree: number): any[] => {
  if (resultats.length <= 5) return resultats;
  
  // Années importantes incluant les années 25 et 30
  const anneesImportantes = [1, 5, 10, 15, 20, 25, 30, 35, 40];
  return resultats.filter(r => 
    anneesImportantes.includes(r.annee) || 
    r.annee === duree || 
    r.annee === resultats.length
  );
};
