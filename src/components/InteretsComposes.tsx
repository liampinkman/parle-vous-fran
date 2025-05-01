
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import AdSpace from "@/components/AdSpace";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
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

  // Configuration des couleurs pour le graphique
  const chartConfig = {
    capital: {
      label: "Capital total",
      theme: {
        light: "#2563eb",
        dark: "#3b82f6",
      },
    },
    versements: {
      label: "Versements cumulés",
      theme: {
        light: "#9333ea",
        dark: "#a855f7",
      },
    },
    interets: {
      label: "Intérêts générés",
      theme: {
        light: "#16a34a",
        dark: "#22c55e",
      },
    },
  };

  // Fonction pour déterminer quelles années afficher dans le tableau pour mobile
  const getTableData = () => {
    if (!resultats.length) return [];
    
    const anneesCles = getAnneesClesCalcul();
    
    if (isMobile) {
      // Sur mobile, n'afficher que l'année de début et de fin
      const debut = anneesCles[0];
      const fin = anneesCles[anneesCles.length - 1];
      return [debut, fin];
    }
    
    return anneesCles;
  };

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
          {/* Tableau de résultats optimisé pour mobile */}
          <div className="w-full">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="results-header">Année</TableHead>
                  <TableHead className="results-header text-right">Capital</TableHead>
                  {!isMobile && (
                    <TableHead className="results-header text-right">Versements</TableHead>
                  )}
                  <TableHead className="results-header text-right">Plus-value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getTableData().map((resultat) => (
                  <TableRow key={resultat.annee}>
                    <TableCell className="font-medium">{resultat.annee}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatMontantEuro(resultat.capitalFinAnnee)}
                    </TableCell>
                    {!isMobile && (
                      <TableCell className="text-right">
                        {formatMontantEuro(resultat.versementsCumules)}
                      </TableCell>
                    )}
                    <TableCell className="text-right result-positive">
                      {formatMontantEuro(resultat.gainTotal)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Publicité entre le tableau et le graphique */}
          <AdSpace position="bottom" />

          {/* Graphique d'évolution du capital avec meilleure responsivité */}
          <div className="bg-white rounded-lg border p-4 h-auto">
            <h4 className="text-sm font-medium mb-4 text-primary flex items-center gap-2">
              <ChartLine size={18} />
              Évolution de votre capital sur {duree} ans
            </h4>
            <ChartContainer
              className="h-[280px] md:h-80 overflow-visible"
              config={chartConfig}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={chartData} 
                  margin={{ 
                    top: 5, 
                    right: isMobile ? 5 : 10, 
                    left: isMobile ? -20 : 0, 
                    bottom: 5 
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis 
                    dataKey="annee" 
                    name="Année"
                    tickFormatter={(value) => isMobile ? `${value}` : `A${value}`}
                    interval={isMobile ? "preserveStartEnd" : undefined}
                    tick={{ fontSize: isMobile ? 9 : 10 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => 
                      value >= 1000000 
                        ? `${(value / 1000000).toFixed(0)}M` 
                        : value >= 1000 
                          ? `${(value / 1000).toFixed(0)}k` 
                          : `${value}`
                    }
                    tick={{ fontSize: 9 }}
                    width={isMobile ? 30 : 40}
                  />
                  <Tooltip content={<CustomTooltip formatMontant={formatMontantEuro} />} />
                  <Legend 
                    wrapperStyle={{ fontSize: isMobile ? '8px' : '10px' }}
                    iconSize={isMobile ? 6 : 8}
                    verticalAlign="bottom"
                  />
                  <Line
                    name="Capital total"
                    type="monotone"
                    dataKey="capital"
                    stroke="var(--color-capital)"
                    strokeWidth={2}
                    dot={{ r: isMobile ? 1 : 2 }}
                    activeDot={{ r: isMobile ? 3 : 4 }}
                  />
                  <Line
                    name="Versements"
                    type="monotone"
                    dataKey="versements"
                    stroke="var(--color-versements)"
                    strokeWidth={1.5}
                    dot={{ r: 0 }}
                  />
                  <Line
                    name="Intérêts"
                    type="monotone"
                    dataKey="interets"
                    stroke="var(--color-interets)"
                    strokeWidth={1.5}
                    dot={{ r: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
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

// Composant personnalisé pour le tooltip du graphique
const CustomTooltip = ({ active, payload, label, formatMontant }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded-md shadow-md text-xs">
        <p className="font-semibold mb-1">Année {payload[0].payload.annee}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex justify-between gap-3 items-center">
            <span style={{ color: entry.color }}>{entry.name} :</span>
            <span className="font-medium">{formatMontant(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

InteretsComposes.displayName = "InteretsComposes";

export default InteretsComposes;
