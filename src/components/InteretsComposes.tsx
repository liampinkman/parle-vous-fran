
import { ChartLine } from "lucide-react";
import { useInteretsComposes } from "@/hooks/useInteretsComposes";
import { memo, useState } from "react";
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
  // Utiliser soit les props fournies, soit le hook local
  const hookValues = useInteretsComposes();
  
  const {
    montantInitial = props.montantInitial || hookValues.montantInitial,
    setMontantInitial = props.setMontantInitial || hookValues.setMontantInitial,
    versementsMensuels = props.versementsMensuels || hookValues.versementsMensuels,
    setVersementsMensuels = props.setVersementsMensuels || hookValues.setVersementsMensuels,
    tauxAnnuel = props.tauxAnnuel || hookValues.tauxAnnuel,
    setTauxAnnuel = props.setTauxAnnuel || hookValues.setTauxAnnuel,
    duree = props.duree || hookValues.duree,
    setDuree = props.setDuree || hookValues.setDuree,
    resultats = props.resultats || hookValues.resultats,
    calculerInteretsComposes = props.calculerInteretsComposes || hookValues.calculerInteretsComposes,
    getAnneesClesCalcul = props.getAnneesClesCalcul || hookValues.getAnneesClesCalcul,
    formatMontantEuro = props.formatMontantEuro || hookValues.formatMontantEuro
  } = props.calculerInteretsComposes ? props : hookValues;

  // Préparer les données pour le graphique
  const chartData = resultats.map(resultat => ({
    name: `Année ${resultat.annee}`,
    annee: resultat.annee,
    capital: resultat.capitalFinAnnee,
    versements: resultat.versementsCumules,
    interets: resultat.gainTotal,
  }));

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

      {resultats.length > 0 && (
        <>
          <InteretsComposesTable 
            results={getAnneesClesCalcul()}
            formatMontantEuro={formatMontantEuro}
          />

          {/* Publicité entre le tableau et le graphique - avec une marge plus importante */}
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
