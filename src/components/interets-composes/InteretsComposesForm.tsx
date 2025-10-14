import { memo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, ChartLine } from "lucide-react";
import InformationalSection from "@/components/shared/InformationalSection";
import { INTERETS_COMPOSES_INFO } from "@/constants/informationalContent";

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
      <InformationalSection 
        title={INTERETS_COMPOSES_INFO.title}
        description={INTERETS_COMPOSES_INFO.description}
        items={INTERETS_COMPOSES_INFO.items}
        icon={ChartLine}
      />
      
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
