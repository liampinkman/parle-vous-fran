
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, ChartLine, TrendingUp } from "lucide-react";
import { useInteretsComposes } from "@/hooks/useInteretsComposes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { memo } from "react";

const InteretsComposes = memo(() => {
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
  } = useInteretsComposes();

  return (
    <div className="space-y-6 p-4">
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

      {resultats.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="results-header">Année</TableHead>
                  <TableHead className="results-header text-right">Capital</TableHead>
                  <TableHead className="results-header text-right">Versements cumulés</TableHead>
                  <TableHead className="results-header text-right">Plus-value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getAnneesClesCalcul().map((resultat) => (
                  <TableRow key={resultat.annee}>
                    <TableCell>{resultat.annee}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatMontantEuro(resultat.capitalFinAnnee)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatMontantEuro(resultat.versementsCumules)}
                    </TableCell>
                    <TableCell className="text-right result-positive">
                      {formatMontantEuro(resultat.gainTotal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h4 className="text-lg font-semibold flex items-center gap-2 text-green-800">
              <TrendingUp size={20} />
              Résultat après {duree} ans
            </h4>
            <p className="text-green-700 mt-2">
              Avec un investissement initial de {formatMontantEuro(parseFloat(montantInitial))} 
              {parseFloat(versementsMensuels) > 0 ? ` et ${formatMontantEuro(parseFloat(versementsMensuels))} versés chaque mois` : ''}, 
              votre capital atteindra <strong>{formatMontantEuro(resultats[resultats.length - 1].capitalFinAnnee)}</strong>.
            </p>
            <p className="text-green-700 mt-1">
              Soit un gain total de <strong className="text-green-800">{formatMontantEuro(resultats[resultats.length - 1].gainTotal)}</strong> 
              ({(resultats[resultats.length - 1].gainTotal / (parseFloat(montantInitial) + resultats[resultats.length - 1].versementsCumules) * 100).toFixed(2)}% de votre investissement).
            </p>
          </div>
        </>
      )}
    </div>
  );
});

InteretsComposes.displayName = "InteretsComposes";

export default InteretsComposes;
