
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { calculateRentabilite } from "@/utils/financialCalculators";

interface RentabiliteResult {
  rentabilite: number;
  rentabiliteNette: number;
  cashflowMensuel: number;
  cashflowApresImpot: number;
  rendementApresImpot: number;
  mensualiteCredit: number;
  montantEmprunte: number;
  cashflowNetMensuel: number;
}

export const useRentabiliteCalculator = () => {
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [fraisNotaire, setFraisNotaire] = useState<string>("8");
  const [loyerMensuel, setLoyerMensuel] = useState<string>("1000");
  const [chargesAnnuelles, setChargesAnnuelles] = useState<string>("2000");
  const [tauxImpot, setTauxImpot] = useState<string>("30");
  const [apport, setApport] = useState<string>("40000");
  const [tauxCredit, setTauxCredit] = useState<string>("3.5");
  const [dureeCredit, setDureeCredit] = useState<string>("20");
  const [result, setResult] = useState<RentabiliteResult | null>(null);
  const { toast } = useToast();

  const calculateRentabiliteHandler = () => {
    // Validation des entrées
    if (!prixAchat || isNaN(parseFloat(prixAchat)) || parseFloat(prixAchat) <= 0) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez saisir un prix d'achat valide.",
        variant: "destructive",
      });
      return;
    }

    if (!loyerMensuel || isNaN(parseFloat(loyerMensuel)) || parseFloat(loyerMensuel) <= 0) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez saisir un loyer mensuel valide.",
        variant: "destructive",
      });
      return;
    }

    const prix = parseFloat(prixAchat);
    const frais = parseFloat(fraisNotaire);
    const loyer = parseFloat(loyerMensuel);
    const charges = chargesAnnuelles ? parseFloat(chargesAnnuelles) : 0;
    const tauxImposition = parseFloat(tauxImpot) / 100;
    const apportInitial = apport ? parseFloat(apport) : 0;
    const taux = parseFloat(tauxCredit);
    const duree = parseInt(dureeCredit);
    
    const results = calculateRentabilite(
      prix,
      frais,
      loyer,
      charges,
      tauxImposition,
      apportInitial,
      taux,
      duree
    );
    
    setResult(results);
    
    toast({
      title: "Calcul effectué",
      description: "La rentabilité a été calculée avec succès.",
    });
  };

  return {
    prixAchat,
    setPrixAchat,
    fraisNotaire,
    setFraisNotaire,
    loyerMensuel,
    setLoyerMensuel,
    chargesAnnuelles,
    setChargesAnnuelles,
    tauxImpot,
    setTauxImpot,
    apport,
    setApport,
    tauxCredit,
    setTauxCredit,
    dureeCredit,
    setDureeCredit,
    result,
    calculateRentabilite: calculateRentabiliteHandler
  };
};
