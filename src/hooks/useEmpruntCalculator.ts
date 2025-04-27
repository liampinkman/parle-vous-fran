
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { calculateEmpruntCapacity } from "@/utils/financialCalculators";

interface EmpruntResult {
  capaciteEmprunt: number | null;
  mensualite: number | null;
  tauxEndettement: number | null;
}

export const useEmpruntCalculator = () => {
  const [revenuMensuel, setRevenuMensuel] = useState<string>("3000");
  const [charges, setCharges] = useState<string>("500");
  const [duree, setDuree] = useState<string>("20");
  const [tauxInteret, setTauxInteret] = useState<string>("3.5");
  const [result, setResult] = useState<EmpruntResult>({
    capaciteEmprunt: null,
    mensualite: null,
    tauxEndettement: null
  });
  const { toast } = useToast();

  const calculateEmprunt = () => {
    // Validation des entrées
    if (!revenuMensuel || isNaN(parseFloat(revenuMensuel)) || parseFloat(revenuMensuel) <= 0) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez saisir un revenu mensuel valide.",
        variant: "destructive",
      });
      return;
    }

    if (!charges) {
      // Si charges est vide, on considère que c'est 0
      setCharges("0");
    } else if (isNaN(parseFloat(charges)) || parseFloat(charges) < 0) {
      toast({
        title: "Erreur de saisie",
        description: "Les charges doivent être un nombre positif ou zéro.",
        variant: "destructive",
      });
      return;
    }

    const revenu = parseFloat(revenuMensuel);
    const chargesValue = charges ? parseFloat(charges) : 0;
    const tauxValue = parseFloat(tauxInteret);
    const dureeValue = parseInt(duree);
    
    const { capaciteEmprunt, mensualite, tauxEndettement } = calculateEmpruntCapacity(
      revenu,
      chargesValue,
      tauxValue,
      dureeValue
    );
    
    setResult({
      capaciteEmprunt,
      mensualite,
      tauxEndettement
    });
    
    toast({
      title: "Calcul effectué",
      description: "Votre capacité d'emprunt a été calculée avec succès.",
    });
  };

  return {
    revenuMensuel,
    setRevenuMensuel,
    charges,
    setCharges,
    duree,
    setDuree,
    tauxInteret,
    setTauxInteret,
    result,
    calculateEmprunt
  };
};
