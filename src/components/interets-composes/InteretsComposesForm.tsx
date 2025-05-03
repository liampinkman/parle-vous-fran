
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, ChartLine } from "lucide-react";
import { memo } from "react";

interface InteretsComposesFormProps {
  montantInitial: string;
  setMontantInitial: (value: string) => void;
  versementsMensuels: string;
  setVersementsMensuels: (value: string) => void;
  tauxAnnuel: string;
  setTauxAnnuel: (value: string) => void;
  duree: string;
  setDuree: (value: string) => void;
  calculerInteretsComposes: () => void;
}

const InteretsComposesForm = memo(({
  montantInitial,
  setMontantInitial,
  versementsMensuels,
  setVersementsMensuels,
  tauxAnnuel,
  setTauxAnnuel,
  duree,
  setDuree,
  calculerInteretsComposes
}: InteretsComposesFormProps) => {
  return (
    <>
      <div className="financial-info-box">
        <h3 className="text-sm font-medium mb-2 text-primary flex items-center gap-2">
          <ChartLine size={18} />
          Informations sur les intérêts composés (2025)
        </h3>
        <p className="text-sm text-gray-700 mb-2">
          Ce calculateur illustre la puissance des intérêts composés dans l'investissement boursier:
        </p>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Les rendements sont calculés avec réinvestissement automatique des gains</li>
          <li>Le taux moyen historique du CAC 40 est d'environ 7% par an sur le long terme</li>
          <li>Les versements réguliers amplifient considérablement l'effet des intérêts composés</li>
          <li>Les calculs ne tiennent pas compte de l'inflation ni de la fiscalité (PFU à 30% ou barème progressif)</li>
          <li>Diversification et temps sont les clés du succès en investissement boursier</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="montantInitial">Capital initial (€)</Label>
          <Input
            id="montantInitial"
            type="number"
            value={montantInitial}
            onChange={(e) => setMontantInitial(e.target.value)}
            placeholder="1000"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="versementsMensuels">Versements mensuels (€)</Label>
          <Input
            id="versementsMensuels"
            type="number"
            value={versementsMensuels}
            onChange={(e) => setVersementsMensuels(e.target.value)}
            placeholder="100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tauxAnnuel">Taux de rendement annuel (%)</Label>
          <Input
            id="tauxAnnuel"
            type="number"
            step="0.1"
            value={tauxAnnuel}
            onChange={(e) => setTauxAnnuel(e.target.value)}
            placeholder="7"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duree">Durée de l'investissement (années)</Label>
          <Input
            id="duree"
            type="number"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            placeholder="20"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={calculerInteretsComposes} 
          className="w-full md:w-auto flex items-center gap-2"
        >
          <Calculator size={18} />
          Calculer
        </Button>
      </div>
    </>
  );
});

InteretsComposesForm.displayName = "InteretsComposesForm";

export default InteretsComposesForm;
