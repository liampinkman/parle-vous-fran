
import { memo, useMemo } from "react";
import { TrendingUp } from "lucide-react";

interface InteretsComposesSummaryProps {
  montantInitial: string;
  versementsMensuels: string;
  duree: string;
  resultats: Array<any>;
  formatMontantEuro: (montant: number) => string;
}

const InteretsComposesSummary = memo(({
  montantInitial,
  versementsMensuels,
  duree,
  resultats,
  formatMontantEuro
}: InteretsComposesSummaryProps) => {
  // Utilisation de useMemo pour éviter les recalculs inutiles
  const summaryData = useMemo(() => {
    if (resultats.length === 0) {
      return null;
    }

    const lastResult = resultats[resultats.length - 1];
    const montantInitialValue = parseFloat(montantInitial);
    const gainPercentage = (lastResult.gainTotal / (montantInitialValue + lastResult.versementsCumules) * 100).toFixed(2);
    
    return {
      lastResult,
      montantInitialValue,
      gainPercentage,
      versementsMensuelsValue: parseFloat(versementsMensuels)
    };
  }, [resultats, montantInitial, versementsMensuels]);

  if (!summaryData) {
    return null;
  }

  const { lastResult, montantInitialValue, gainPercentage, versementsMensuelsValue } = summaryData;

  return (
    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
      <h4 className="text-lg font-semibold flex items-center gap-2 text-green-800">
        <TrendingUp size={20} />
        Résultat après {duree} ans
      </h4>
      <p className="text-green-700 mt-2">
        Avec un investissement initial de {formatMontantEuro(montantInitialValue)} 
        {versementsMensuelsValue > 0 ? ` et ${formatMontantEuro(versementsMensuelsValue)} versés chaque mois` : ''}, 
        votre capital atteindra <strong>{formatMontantEuro(lastResult.capitalFinAnnee)}</strong>.
      </p>
      <p className="text-green-700 mt-1">
        Soit un gain total de <strong className="text-green-800">{formatMontantEuro(lastResult.gainTotal)}</strong> 
        ({gainPercentage}% de votre investissement).
      </p>
    </div>
  );
});

InteretsComposesSummary.displayName = "InteretsComposesSummary";

export default InteretsComposesSummary;
