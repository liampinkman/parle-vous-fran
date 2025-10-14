import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEmpruntCalculator } from "@/hooks/useEmpruntCalculator";
import { formatMontant } from "@/utils/financialCalculators";
import InformationalSection from "@/components/shared/InformationalSection";
import { EMPRUNT_INFO } from "@/constants/informationalContent";

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
  // Always call the hook to maintain consistent hook order
  const hookValues = useEmpruntCalculator();
  
  // Use props if provided, otherwise fall back to hook values
  const revenuMensuel = props.revenuMensuel ?? hookValues.revenuMensuel;
  const setRevenuMensuel = props.setRevenuMensuel ?? hookValues.setRevenuMensuel;
  const charges = props.charges ?? hookValues.charges;
  const setCharges = props.setCharges ?? hookValues.setCharges;
  const duree = props.duree ?? hookValues.duree;
  const setDuree = props.setDuree ?? hookValues.setDuree;
  const tauxInteret = props.tauxInteret ?? hookValues.tauxInteret;
  const setTauxInteret = props.setTauxInteret ?? hookValues.setTauxInteret;
  const result = props.result ?? hookValues.result;
  const calculateEmprunt = props.calculateEmprunt ?? hookValues.calculateEmprunt;

  return (
    <div className="space-y-6 p-4">
      <InformationalSection 
        title={EMPRUNT_INFO.title}
        description={EMPRUNT_INFO.description}
        items={EMPRUNT_INFO.items}
      />
      
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
