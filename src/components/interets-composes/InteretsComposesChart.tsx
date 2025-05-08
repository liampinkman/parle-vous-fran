
import { memo, useRef, useState, useEffect, useMemo } from "react";
import { ChartLine, ArrowLeft, ArrowRight } from "lucide-react";
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
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";

// Tooltip component moved inside the file
interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatMontant: (montant: number) => string;
}

const CustomTooltip = ({ active, payload, formatMontant }: CustomTooltipProps) => {
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

interface ChartDataItem {
  name: string;
  annee: number;
  capital: number;
  versements: number;
  interets: number;
}

interface InteretsComposesChartProps {
  chartData: ChartDataItem[];
  duree: string;
  formatMontantEuro: (montant: number) => string;
}

const InteretsComposesChart = memo(({
  chartData,
  duree,
  formatMontantEuro
}: InteretsComposesChartProps) => {
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

  const isMobile = useIsMobile();
  
  // Ref pour le chart container
  const chartScrollRef = useRef<HTMLDivElement>(null);
  
  // States pour contrôler la visualisation des indicateurs de scroll
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  // Générer les données du graphique par tranches de 5 ans
  const filteredChartData = useMemo(() => {
    if (!chartData.length) return [];
    
    // Filtrer les données pour conserver les années 1, multiples de 5, et l'année finale
    const dureeTotale = parseInt(duree, 10);
    
    // Années clés que nous voulons afficher (1, 5, 10, 15, 20, 25, 30, 35)
    const annesCles = [1, 5, 10, 15, 20, 25, 30, 35];
    
    return chartData.filter(item => 
      annesCles.includes(item.annee) || // Années clés
      item.annee % 5 === 0 || // Autres années multiples de 5 (pour la complétude)
      item.annee === dureeTotale // Année finale
    ).sort((a, b) => a.annee - b.annee); // S'assurer que les données sont triées par année
    
  }, [chartData, duree]);

  // Fonction pour vérifier et mettre à jour les indicateurs de scroll
  const checkScrollIndicators = () => {
    if (chartScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = chartScrollRef.current;
      
      // Afficher l'indicateur gauche si le scroll n'est pas tout à gauche
      setShowLeftScroll(scrollLeft > 0);
      
      // Afficher l'indicateur droit si le scroll n'est pas tout à droite
      setShowRightScroll(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  // Vérifier les indicateurs de scroll au chargement et quand les données changent
  useEffect(() => {
    checkScrollIndicators();
    // Ajout d'un léger délai pour garantir que les dimensions sont calculées
    const timer = setTimeout(checkScrollIndicators, 100);
    return () => clearTimeout(timer);
  }, [filteredChartData.length]);

  // Fonction pour faire défiler le graphique horizontalement
  const scrollChart = (direction: 'left' | 'right') => {
    if (chartScrollRef.current) {
      const scrollAmount = chartScrollRef.current.clientWidth / 2;
      chartScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (filteredChartData.length === 0) {
    return null;
  }

  // Amélioration: ajuster la largeur du graphique pour mobile
  // - Sur mobile: plus d'espace entre les points (90px au lieu de 70px)
  // - Définir une largeur minimale plus grande pour éviter les problèmes d'affichage
  const chartWidth = isMobile 
    ? Math.max(filteredChartData.length * 90, 480) // Augmenté pour mobile
    : Math.max(filteredChartData.length * 100, 100);

  return (
    <div className="bg-white rounded-lg border p-4 h-auto relative">
      <h4 className="text-sm font-medium mb-4 text-primary flex items-center gap-2">
        <ChartLine size={18} />
        Évolution de votre capital par tranches de 5 ans
      </h4>

      {/* Indicateurs de défilement */}
      {showLeftScroll && (
        <button 
          onClick={() => scrollChart('left')} 
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md border border-gray-200"
          aria-label="Défiler à gauche"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
      )}
      {showRightScroll && (
        <button 
          onClick={() => scrollChart('right')} 
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md border border-gray-200"
          aria-label="Défiler à droite"
        >
          <ArrowRight size={16} className="text-gray-600" />
        </button>
      )}

      <ScrollArea className="w-full">
        <div 
          ref={chartScrollRef}
          className="overflow-x-auto scrollbar-thin pb-2 pt-1"
          onScroll={checkScrollIndicators}
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          <div style={{ width: `${chartWidth}px`, minWidth: '100%', height: '100%' }}>
            <ChartContainer
              className="h-[280px] md:h-80 overflow-visible"
              config={chartConfig}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredChartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis 
                    dataKey="annee" 
                    name="Année"
                    tickFormatter={(value) => `A${value}`}
                    interval={0}
                    tick={{ fontSize: isMobile ? 8 : 10 }}
                  />
                  <YAxis 
                    tickFormatter={(value) => 
                      value >= 1000000 
                        ? `${(value / 1000000).toFixed(0)}M€` 
                        : value >= 1000 
                          ? `${(value / 1000).toFixed(0)}k€` 
                          : `${value}€`
                    }
                    tick={{ fontSize: isMobile ? 8 : 10 }}
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
                    dot={{ r: isMobile ? 2 : 3 }}
                    activeDot={{ r: isMobile ? 4 : 5 }}
                  />
                  <Line
                    name="Versements cumulés"
                    type="monotone"
                    dataKey="versements"
                    stroke="var(--color-versements)"
                    strokeWidth={2}
                    dot={{ r: isMobile ? 1.5 : 2 }}
                  />
                  <Line
                    name="Intérêts générés"
                    type="monotone"
                    dataKey="interets"
                    stroke="var(--color-interets)"
                    strokeWidth={2}
                    dot={{ r: isMobile ? 1.5 : 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </ScrollArea>
      
      {/* Instructions mobiles */}
      <div className="md:hidden text-xs text-center text-muted-foreground mt-1">
        Glissez horizontalement pour voir toutes les données
      </div>
    </div>
  );
});

InteretsComposesChart.displayName = "InteretsComposesChart";

export default InteretsComposesChart;
