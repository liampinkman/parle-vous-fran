
import { ChartLine } from "lucide-react";
import { useInteretsComposes } from "@/hooks/useInteretsComposes";
import { memo, useState, useMemo } from "react";
import AdSpace from "@/components/AdSpace";
import InteretsComposesForm from "@/components/interets-composes/InteretsComposesForm";
import InteretsComposesTable from "@/components/interets-composes/InteretsComposesTable";
import InteretsComposesChart from "@/components/interets-composes/InteretsComposesChart";
import InteretsComposesSummary from "@/components/interets-composes/InteretsComposesSummary";

interface InteretsComposesProps {
  montantInitial?: string;
  setMontantInitial?: (value: string) => void;
  versementsMensuels?: string;
  setVersementsMensuels?: (value: string) => void;
  tauxAnnuel?: string;
  setTauxAnnuel?: (value: string) => void;
  duree?: string;
  setDuree?: (value: string) => void;
  resultats?: Array<any>;
  calculerInteretsComposes?: () => void;
  getAnneesClesCalcul?: () => Array<any>;
  formatMontantEuro?: (montant: number) => string;
}

const InteretsComposes = memo((props: InteretsComposesProps) => {
  // Always call the hook to maintain consistent hook order
  const hookValues = useInteretsComposes();
  
  // Use props if provided, otherwise fall back to hook values
  const montantInitial = props.montantInitial ?? hookValues.montantInitial;
  const setMontantInitial = props.setMontantInitial ?? hookValues.setMontantInitial;
  const versementsMensuels = props.versementsMensuels ?? hookValues.versementsMensuels;
  const setVersementsMensuels = props.setVersementsMensuels ?? hookValues.setVersementsMensuels;
  const tauxAnnuel = props.tauxAnnuel ?? hookValues.tauxAnnuel;
  const setTauxAnnuel = props.setTauxAnnuel ?? hookValues.setTauxAnnuel;
  const duree = props.duree ?? hookValues.duree;
  const setDuree = props.setDuree ?? hookValues.setDuree;
  const resultats = props.resultats ?? hookValues.resultats;
  const calculerInteretsComposes = props.calculerInteretsComposes ?? hookValues.calculerInteretsComposes;
  const getAnneesClesCalcul = props.getAnneesClesCalcul ?? hookValues.getAnneesClesCalcul;
  const formatMontantEuro = props.formatMontantEuro ?? hookValues.formatMontantEuro;

  // Préparer les données pour le graphique - optimisé avec useMemo
  const chartData = useMemo(() => {
    if (!resultats?.length) return [];
    
    return resultats.map(resultat => ({
      name: `Année ${resultat.annee}`,
      annee: resultat.annee,
      capital: resultat.capitalFinAnnee,
      versements: resultat.versementsCumules,
      interets: resultat.gainTotal,
    }));
  }, [resultats]);

  // Optimisation : mémoriser si on a des résultats
  const hasResults = useMemo(() => resultats?.length > 0, [resultats?.length]);

  return (
    <div className="space-y-6 p-4">
      <InteretsComposesForm 
        montantInitial={montantInitial}
        setMontantInitial={setMontantInitial}
        versementsMensuels={versementsMensuels}
        setVersementsMensuels={setVersementsMensuels}
        tauxAnnuel={tauxAnnuel}
        setTauxAnnuel={setTauxAnnuel}
        duree={duree}
        setDuree={setDuree}
        calculerInteretsComposes={calculerInteretsComposes}
      />

      {hasResults && (
        <>
          <InteretsComposesTable 
            results={getAnneesClesCalcul()}
            formatMontantEuro={formatMontantEuro}
          />

          <div className="my-8">
            <AdSpace position="bottom" />
          </div>

          <InteretsComposesChart 
            chartData={chartData}
            duree={duree}
            formatMontantEuro={formatMontantEuro}
          />

          <InteretsComposesSummary
            montantInitial={montantInitial}
            versementsMensuels={versementsMensuels}
            duree={duree}
            resultats={resultats}
            formatMontantEuro={formatMontantEuro}
          />
        </>
      )}
    </div>
  );
});

InteretsComposes.displayName = "InteretsComposes";

export default InteretsComposes;
