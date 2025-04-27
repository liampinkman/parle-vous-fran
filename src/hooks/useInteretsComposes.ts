
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { calculateInteretsComposes, getAnneesCles, formatMontant } from "@/utils/financialCalculators";

interface ResultatInteret {
  annee: number;
  capitalDebutAnnee: number;
  capitalFinAnnee: number;
  versementsCumules: number;
  interetsGeneres: number;
  gainTotal: number;
}

export const useInteretsComposes = () => {
  const [montantInitial, setMontantInitial] = useState<string>("10000");
  const [versementsMensuels, setVersementsMensuels] = useState<string>("200");
  const [tauxAnnuel, setTauxAnnuel] = useState<string>("7");
  const [duree, setDuree] = useState<string>("20");
  const [resultats, setResultats] = useState<ResultatInteret[]>([]);
  const { toast } = useToast();

  const calculerInteretsComposes = () => {
    if (!montantInitial || isNaN(parseFloat(montantInitial)) || parseFloat(montantInitial) < 0) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez saisir un montant initial valide.",
        variant: "destructive",
      });
      return;
    }

    if (!versementsMensuels) {
      setVersementsMensuels("0");
    } else if (isNaN(parseFloat(versementsMensuels)) || parseFloat(versementsMensuels) < 0) {
      toast({
        title: "Erreur de saisie",
        description: "Les versements mensuels doivent être positifs ou zéro.",
        variant: "destructive",
      });
      return;
    }

    if (!tauxAnnuel || isNaN(parseFloat(tauxAnnuel)) || parseFloat(tauxAnnuel) < 0) {
      toast({
        title: "Erreur de saisie", 
        description: "Veuillez saisir un taux annuel valide.",
        variant: "destructive",
      });
      return;
    }

    if (!duree || isNaN(parseInt(duree)) || parseInt(duree) <= 0) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez saisir une durée valide.",
        variant: "destructive",
      });
      return;
    }

    const capital = parseFloat(montantInitial);
    const versements = parseFloat(versementsMensuels || "0");
    const taux = parseFloat(tauxAnnuel);
    const annees = parseInt(duree);
    
    const resultatsCalculs = calculateInteretsComposes(capital, versements, taux, annees);
    
    setResultats(resultatsCalculs);
    
    toast({
      title: "Calcul effectué",
      description: "Vos intérêts composés ont été calculés avec succès.",
    });
  };

  const getAnneesClesCalcul = () => {
    return getAnneesCles(resultats, parseInt(duree));
  };

  const formatMontantEuro = (montant: number) => {
    return formatMontant(montant);
  };

  return {
    montantInitial,
    setMontantInitial,
    versementsMensuels,
    setVersementsMensuels,
    tauxAnnuel,
    setTauxAnnuel,
    duree,
    setDuree,
    resultats,
    calculerInteretsComposes,
    getAnneesClesCalcul,
    formatMontantEuro
  };
};
