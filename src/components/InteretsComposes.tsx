
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
  // Utiliser soit les props fournies, soit le hook local
  const hookValues = useInteretsComposes();
  
  // Optimisation : utiliser useMemo pour éviter les recalculs
  const componentProps = useMemo(() => {
    if (props.calculerInteretsComposes) {
      return props;
    }
    return hookValues;
  }, [props, hookValues]);

  const {
    montantInitial,
    setMontantInitial,
    versementsMensuels,
    setVersementsMensuels,
    tauxAnnuel,
    setTauxAnnuel,
    duree,
    setDuree,
    resultats,
    calculerInteretsComposes,
    getAnneesClesCalcul,
    formatMontantEuro
  } = componentProps;

  // Add defensive checks
  if (!formatMontantEuro || typeof formatMontantEuro !== 'function') {
    console.error("InteretsComposes: formatMontantEuro is not a function");
    return (
      <div className="space-y-6 p-4">
        <div className="text-red-500">Erreur de configuration du composant</div>
      </div>
    );
  }

  // Préparer les données pour le graphique - optimisé avec useMemo
  const chartData = useMemo(() => {
    try {
      if (!resultats || !Array.isArray(resultats) || resultats.length === 0) {
        return [];
      }
      
      return resultats
        .filter(resultat => {
          return resultat && 
            typeof resultat.annee === 'number' &&
            typeof resultat.capitalFinAnnee === 'number' &&
            typeof resultat.versementsCumules === 'number' &&
            typeof resultat.gainTotal === 'number' &&
            !isNaN(resultat.capitalFinAnnee) &&
            !isNaN(resultat.versementsCumules) &&
            !isNaN(resultat.gainTotal) &&
            isFinite(resultat.capitalFinAnnee) &&
            isFinite(resultat.versementsCumules) &&
            isFinite(resultat.gainTotal);
        })
        .map(resultat => ({
          name: `Année ${resultat.annee}`,
          annee: resultat.annee,
          capital: resultat.capitalFinAnnee,
          versements: resultat.versementsCumules,
          interets: resultat.gainTotal,
        }));
    } catch (error) {
      console.error("Error preparing chart data:", error);
      return [];
    }
  }, [resultats]);

  // Optimisation : mémoriser si on a des résultats
  const hasResults = useMemo(() => {
    return resultats && Array.isArray(resultats) && resultats.length > 0;
  }, [resultats]);

  // Optimisation : mémoriser les années clés
  const anneesCles = useMemo(() => {
    try {
      if (!hasResults || !getAnneesClesCalcul) return [];
      return getAnneesClesCalcul();
    } catch (error) {
      console.error("Error getting années clés:", error);
      return [];
    }
  }, [hasResults, getAnneesClesCalcul]);

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
            results={anneesCles}
            formatMontantEuro={formatMontantEuro}
          />

          <div className="my-8">
            <AdSpace position="bottom" />
          </div>

          {chartData.length > 0 && (
            <InteretsComposesChart 
              chartData={chartData}
              duree={duree}
              formatMontantEuro={formatMontantEuro}
            />
          )}

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
