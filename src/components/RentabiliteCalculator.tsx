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
  const [prixAchat, setPrixAchat] = useState<string>("200000");
  const [fraisNotaire, setFraisNotaire] = useState<string>("8");
  const [loyerMensuel, setLoyerMensuel] = useState<string>("1000");
  const [chargesAnnuelles, setChargesAnnuelles] = useState<string>("2000");
  const [tauxImpot, setTauxImpot] = useState<string>("30");
  
  // Nouveaux champs pour le crédit
  const [apport, setApport] = useState<string>("40000");
  const [tauxCredit, setTauxCredit] = useState<string>("3.5");
  const [dureeCredit, setDureeCredit] = useState<string>("20");
  
  const [resultat, setResultat] = useState<{
    rentabilite: number;
    rentabiliteNette: number;
    cashflowMensuel: number;
    cashflowApresImpot: number;
    rendementApresImpot: number;
    mensualiteCredit: number;
    montantEmprunte: number;
    cashflowNetMensuel: number;
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

    // Calculs de base
    const prix = parseFloat(prixAchat);
    const frais = (prix * parseFloat(fraisNotaire)) / 100;
    const investissementTotal = prix + frais;
    const revenusAnnuels = parseFloat(loyerMensuel) * 12;
    const charges = chargesAnnuelles ? parseFloat(chargesAnnuelles) : 0;
    const tauxImposition = parseFloat(tauxImpot) / 100;
    
    // Calculs liés au crédit
    const apportInitial = apport ? parseFloat(apport) : 0;
    const montantEmprunte = prix - apportInitial;
    const tauxMensuel = parseFloat(tauxCredit) / 100 / 12;
    const nombreMensualites = parseInt(dureeCredit) * 12;
    
    // Calcul de la mensualité de crédit (formule de crédit)
    const mensualiteCredit = montantEmprunte * (tauxMensuel * Math.pow(1 + tauxMensuel, nombreMensualites)) / (Math.pow(1 + tauxMensuel, nombreMensualites) - 1);
    
    // Calcul de la rentabilité brute (hors frais de notaire)
    const rentabilite = (revenusAnnuels / prix) * 100;
    
    // Calcul de la rentabilité nette (avec frais de notaire et charges)
    const rentabiliteNette = ((revenusAnnuels - charges) / investissementTotal) * 100;
    
    // Cash-flow mensuel avant impôt
    const cashflowMensuel = (revenusAnnuels - charges) / 12;
    
    // Calcul de l'impôt (PFU ou régime réel simplifié)
    const revenuImposable = revenusAnnuels - charges;
    const impotAnnuel = revenuImposable * tauxImposition;
    
    // Cash-flow mensuel après impôt
    const cashflowApresImpot = (revenuImposable - impotAnnuel) / 12;
    
    // Cash-flow net mensuel (après crédit et impôts)
    const cashflowNetMensuel = cashflowApresImpot - mensualiteCredit;
    
    // Rendement après impôt
    const rendementApresImpot = ((revenuImposable - impotAnnuel) / investissementTotal) * 100;

    setResultat({
      rentabilite: parseFloat(rentabilite.toFixed(2)),
      rentabiliteNette: parseFloat(rentabiliteNette.toFixed(2)),
      cashflowMensuel: parseFloat(cashflowMensuel.toFixed(2)),
      cashflowApresImpot: parseFloat(cashflowApresImpot.toFixed(2)),
      rendementApresImpot: parseFloat(rendementApresImpot.toFixed(2)),
      mensualiteCredit: parseFloat(mensualiteCredit.toFixed(2)),
      montantEmprunte: parseFloat(montantEmprunte.toFixed(2)),
      cashflowNetMensuel: parseFloat(cashflowNetMensuel.toFixed(2))
    });
    
    toast({
      title: "Calcul effectué",
      description: "La rentabilité a été calculée avec succès.",
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-medium mb-2 text-blue-800">Informations sur le calcul de rentabilité en France (2025)</h3>
        <p className="text-sm text-blue-700 mb-2">
          Ce calculateur prend en compte tous les aspects de votre investissement :
        </p>
        <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
          <li>Frais de notaire entre 7% et 8% pour l'ancien, environ 3% pour le neuf</li>
          <li>Mensualités de crédit selon votre apport et les conditions d'emprunt</li>
          <li>Charges annuelles : taxe foncière, charges de copropriété, assurances, etc.</li>
          <li>Fiscalité : PFU à 30% ou régime réel d'imposition</li>
          <li>Cash-flow mensuel réel après crédit et impôts</li>
        </ul>
      </div>

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
          <Label htmlFor="apport">Apport personnel (€)</Label>
          <Input
            id="apport"
            type="number"
            value={apport}
            onChange={(e) => setApport(e.target.value)}
            placeholder="40000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tauxCredit">Taux du crédit (%)</Label>
          <Input
            id="tauxCredit"
            type="number"
            step="0.1"
            value={tauxCredit}
            onChange={(e) => setTauxCredit(e.target.value)}
            placeholder="3.5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dureeCredit">Durée du crédit (années)</Label>
          <Input
            id="dureeCredit"
            type="number"
            value={dureeCredit}
            onChange={(e) => setDureeCredit(e.target.value)}
            placeholder="20"
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
          <Label htmlFor="loyerMensuel">Loyer mensuel hors charges (€)</Label>
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
          <p className="text-xs text-gray-500">Taxe foncière, charges de copropriété, assurances, entretien estimé, vacance locative...</p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tauxImpot">Taux d'imposition (%)</Label>
          <Input
            id="tauxImpot"
            type="number"
            step="0.1"
            value={tauxImpot}
            onChange={(e) => setTauxImpot(e.target.value)}
            placeholder="30"
          />
          <p className="text-xs text-gray-500">PFU à 30% ou taux marginal d'imposition pour le régime réel</p>
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
              <TableCell>Montant emprunté</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.montantEmprunte.toLocaleString()} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mensualité de crédit</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.mensualiteCredit.toLocaleString()} €/mois
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rentabilité brute</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.rentabilite}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rentabilité nette avant impôt</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.rentabiliteNette}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash-flow mensuel avant crédit et impôt</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.cashflowMensuel.toLocaleString()} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash-flow mensuel après impôt</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.cashflowApresImpot.toLocaleString()} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash-flow net mensuel (après crédit et impôts)</TableCell>
              <TableCell className={`text-right font-semibold ${resultat.cashflowNetMensuel >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {resultat.cashflowNetMensuel.toLocaleString()} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rentabilité nette après impôt</TableCell>
              <TableCell className="text-right font-semibold">
                {resultat.rendementApresImpot}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default RentabiliteCalculator;
