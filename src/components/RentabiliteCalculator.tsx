import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRentabiliteCalculator } from "@/hooks/useRentabiliteCalculator";
import { formatMontant } from "@/utils/financialCalculators";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { memo } from "react";

const RentabiliteCalculator = memo(() => {
  const {
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
    calculateRentabilite
  } = useRentabiliteCalculator();
  
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

      {result && (
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
                {formatMontant(result.montantEmprunte)} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mensualité de crédit</TableCell>
              <TableCell className="text-right font-semibold">
                {formatMontant(result.mensualiteCredit)} €/mois
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rentabilité brute</TableCell>
              <TableCell className="text-right font-semibold">
                {result.rentabilite}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rentabilité nette avant impôt</TableCell>
              <TableCell className="text-right font-semibold">
                {result.rentabiliteNette}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash-flow mensuel avant crédit et impôt</TableCell>
              <TableCell className="text-right font-semibold">
                {formatMontant(result.cashflowMensuel)} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash-flow mensuel après crédit</TableCell>
              <TableCell className="text-right font-semibold">
                {formatMontant(result.cashflowNetMensuel)} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rentabilité nette après impôt</TableCell>
              <TableCell className="text-right font-semibold">
                {result.rendementApresImpot}%
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
});

RentabiliteCalculator.displayName = "RentabiliteCalculator";

export default RentabiliteCalculator;
