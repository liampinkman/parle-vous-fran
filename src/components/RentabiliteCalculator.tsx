
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RentabiliteCalculator = () => {
  const [prixAchat, setPrixAchat] = useState<string>("");
  const [fraisNotaire, setFraisNotaire] = useState<string>("8");
  const [loyerMensuel, setLoyerMensuel] = useState<string>("");
  const [chargesAnnuelles, setChargesAnnuelles] = useState<string>("");
  const [resultat, setResultat] = useState<{
    rentabilite: number;
    rentabiliteNette: number;
    cashflowMensuel: number;
  } | null>(null);
  const { toast } = useToast();

  const calculateRentabilite = () => {
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

    if (!chargesAnnuelles) {
      // Si charges est vide, on considère que c'est 0
      setChargesAnnuelles("0");
    } else if (isNaN(parseFloat(chargesAnnuelles)) || parseFloat(chargesAnnuelles) < 0) {
      toast({
        title: "Erreur de saisie",
        description: "Les charges annuelles doivent être un nombre positif ou zéro.",
        variant: "destructive",
      });
      return;
    }

    const prix = parseFloat(prixAchat);
    const frais = (prix * parseFloat(fraisNotaire)) / 100;
    const investissementTotal = prix + frais;
    const revenusAnnuels = parseFloat(loyerMensuel) * 12;
    const charges = chargesAnnuelles ? parseFloat(chargesAnnuelles) : 0;
    
    const rentabilite = (revenusAnnuels / prix) * 100;
    const rentabiliteNette = ((revenusAnnuels - charges) / investissementTotal) * 100;
    const cashflowMensuel = (revenusAnnuels - charges) / 12;

    setResultat({
      rentabilite: parseFloat(rentabilite.toFixed(2)),
      rentabiliteNette: parseFloat(rentabiliteNette.toFixed(2)),
      cashflowMensuel: parseFloat(cashflowMensuel.toFixed(2)),
    });
    
    toast({
      title: "Calcul effectué",
      description: "La rentabilité a été calculée avec succès.",
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="prixAchat">Prix d'achat (€)</Label>
          <Input
            id="prixAchat"
            type="number"
            value={prixAchat}
            onChange={(e) => setPrixAchat(e.target.value)}
            placeholder="200000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fraisNotaire">Frais de notaire (%)</Label>
          <Input
            id="fraisNotaire"
            type="number"
            step="0.1"
            value={fraisNotaire}
            onChange={(e) => setFraisNotaire(e.target.value)}
            placeholder="8"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="loyerMensuel">Loyer mensuel estimé (€)</Label>
          <Input
            id="loyerMensuel"
            type="number"
            value={loyerMensuel}
            onChange={(e) => setLoyerMensuel(e.target.value)}
            placeholder="800"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="charges">Charges annuelles (€)</Label>
          <Input
            id="charges"
            type="number"
            value={chargesAnnuelles}
            onChange={(e) => setChargesAnnuelles(e.target.value)}
            placeholder="2000"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={calculateRentabilite} className="w-full md:w-auto">
          Calculer la rentabilité
        </Button>
      </div>

      {resultat && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indicateur</TableHead>
              <TableHead className="text-right">Valeur</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Rentabilité brute</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.rentabilite}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rentabilité nette</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.rentabiliteNette}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash-flow mensuel</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.cashflowMensuel.toLocaleString()} €
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RentabiliteCalculator;
