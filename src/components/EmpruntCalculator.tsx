import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEmpruntCalculator } from "@/hooks/useEmpruntCalculator";
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

interface EmpruntCalculatorProps {
  revenuMensuel?: string;
  setRevenuMensuel?: (value: string) => void;
  charges?: string;
  setCharges?: (value: string) => void;
  duree?: string;
  setDuree?: (value: string) => void;
  tauxInteret?: string;
  setTauxInteret?: (value: string) => void;
  result?: {
    capaciteEmprunt: number | null;
    mensualite: number | null;
    tauxEndettement: number | null;
  };
  calculateEmprunt?: () => void;
}

const EmpruntCalculator = memo((props: EmpruntCalculatorProps) => {
  // Utiliser soit les props fournies, soit le hook local
  const hookValues = useEmpruntCalculator();
  
  const {
    revenuMensuel = props.revenuMensuel || hookValues.revenuMensuel,
    setRevenuMensuel = props.setRevenuMensuel || hookValues.setRevenuMensuel,
    charges = props.charges || hookValues.charges,
    setCharges = props.setCharges || hookValues.setCharges,
    duree = props.duree || hookValues.duree,
    setDuree = props.setDuree || hookValues.setDuree,
    tauxInteret = props.tauxInteret || hookValues.tauxInteret,
    setTauxInteret = props.setTauxInteret || hookValues.setTauxInteret,
    result = props.result || hookValues.result,
    calculateEmprunt = props.calculateEmprunt || hookValues.calculateEmprunt
  } = props.calculateEmprunt ? props : hookValues;

  return (
    <div className="space-y-6 p-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-medium mb-2 text-blue-800">Informations sur le calcul de capacité d'emprunt en France (2025)</h3>
        <p className="text-sm text-blue-700 mb-2">
          Ce calculateur prend en compte les critères suivants selon les normes françaises actuelles :
        </p>
        <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
          <li>Taux d'endettement maximal de 35% des revenus nets (norme HCSF 2021)</li>
          <li>Durée maximale d'emprunt généralement limitée à 25 ans</li>
          <li>Revenus nets mensuels après impôt</li>
          <li>Charges mensuelles incluant les crédits en cours</li>
          <li>Taux d'intérêt moyen en 2025 (à ajuster selon les offres bancaires actuelles)</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="revenu">Revenu mensuel net après impôt (€)</Label>
          <Input
            id="revenu"
            type="number"
            value={revenuMensuel}
            onChange={(e) => setRevenuMensuel(e.target.value)}
            placeholder="3000"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="charges">Charges mensuelles (crédits en cours) (€)</Label>
          <Input
            id="charges"
            type="number"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
            placeholder="500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duree">Durée du prêt (années)</Label>
          <Input
            id="duree"
            type="number"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            placeholder="20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="taux">Taux d'intérêt (% annuel)</Label>
          <Input
            id="taux"
            type="number"
            step="0.1"
            value={tauxInteret}
            onChange={(e) => setTauxInteret(e.target.value)}
            placeholder="3.5"
          />
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button onClick={calculateEmprunt} className="w-full md:w-auto">
          Calculer
        </Button>
      </div>

      {result.capaciteEmprunt !== null && result.mensualite !== null && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Résultats</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Capacité d'emprunt maximale</TableCell>
              <TableCell className="text-right font-semibold">
                {formatMontant(result.capaciteEmprunt)} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mensualité maximale</TableCell>
              <TableCell className="text-right font-semibold">
                {formatMontant(result.mensualite)} €
              </TableCell>
            </TableRow>
            {result.tauxEndettement !== null && (
              <TableRow>
                <TableCell>Taux d'endettement</TableCell>
                <TableCell className="text-right font-semibold">
                  {result.tauxEndettement}%
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
});

EmpruntCalculator.displayName = "EmpruntCalculator";

export default EmpruntCalculator;
