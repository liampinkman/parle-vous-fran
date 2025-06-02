
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
import { ChartContainer } from "@/components/ui/chart";
import { ChartDataItem } from "./chartConfig";
import CustomTooltip from "./CustomTooltip";
import { memo, useMemo } from "react";

interface ChartContentProps {
  data: ChartDataItem[];
  formatMontantEuro: (montant: number) => string;
}

const ChartContent = memo(({ data, formatMontantEuro }: ChartContentProps) => {
  // Add defensive checks
  if (!data || !Array.isArray(data) || typeof formatMontantEuro !== 'function') {
    console.error("ChartContent: Invalid props", { data, formatMontantEuro });
    return (
      <div className="h-[280px] md:h-80 flex items-center justify-center text-gray-500">
        Erreur de configuration du graphique
      </div>
    );
  }

  // Validation des données optimisée avec useMemo
  const validData = useMemo(() => {
    try {
      if (!data || !Array.isArray(data) || data.length === 0) {
        return [];
      }

      return data.filter(item => {
        if (!item || typeof item !== 'object') return false;
        
        const hasValidNumbers = typeof item.annee === 'number' && 
          typeof item.capital === 'number' && 
          typeof item.versements === 'number' && 
          typeof item.interets === 'number' &&
          !isNaN(item.capital) &&
          !isNaN(item.versements) &&
          !isNaN(item.interets) &&
          !isNaN(item.annee) &&
          isFinite(item.capital) &&
          isFinite(item.versements) &&
          isFinite(item.interets) &&
          isFinite(item.annee);

        return hasValidNumbers;
      });
    } catch (error) {
      console.error("Error validating chart data:", error);
      return [];
    }
  }, [data]);

  // Formatage de l'axe Y optimisé avec useMemo
  const yAxisFormatter = useMemo(() => {
    return (value: number) => {
      try {
        if (!isFinite(value) || isNaN(value)) return "0€";
        
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(0)}M€`;
        }
        if (value >= 1000) {
          return `${(value / 1000).toFixed(0)}k€`;
        }
        return `${Math.round(value)}€`;
      } catch (error) {
        console.error("Error formatting Y axis:", error);
        return "0€";
      }
    };
  }, []);

  // Configuration du chart mise en cache
  const chartContainerConfig = useMemo(() => ({
    capital: {
      label: "Capital total",
      theme: { light: "#2563eb", dark: "#3b82f6" },
    },
    versements: {
      label: "Versements cumulés",
      theme: { light: "#9333ea", dark: "#a855f7" },
    },
    interets: {
      label: "Intérêts générés",
      theme: { light: "#16a34a", dark: "#22c55e" },
    },
  }), []);

  if (!validData.length) {
    return (
      <div className="h-[280px] md:h-80 flex items-center justify-center text-gray-500">
        Aucune donnée à afficher
      </div>
    );
  }

  try {
    return (
      <ChartContainer
        className="h-[280px] md:h-80 overflow-visible"
        config={chartContainerConfig}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
            data={validData} 
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            syncId="interetsComposesChart"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="annee" 
              name="Année"
              tickFormatter={(value) => {
                try {
                  return `A${Math.round(value)}`;
                } catch {
                  return "A0";
                }
              }}
              interval={0}
              tick={{ fontSize: 10 }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tickFormatter={yAxisFormatter}
              tick={{ fontSize: 10 }}
              width={40}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              content={<CustomTooltip formatMontant={formatMontantEuro} />} 
              animationDuration={150}
            />
            <Legend 
              wrapperStyle={{ fontSize: '10px' }}
              iconSize={8}
              verticalAlign="bottom"
            />
            <Line
              name="Capital total"
              type="monotone"
              dataKey="capital"
              stroke="var(--color-capital)"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              connectNulls={false}
              animationDuration={300}
            />
            <Line
              name="Versements cumulés"
              type="monotone"
              dataKey="versements"
              stroke="var(--color-versements)"
              strokeWidth={2}
              dot={{ r: 2 }}
              connectNulls={false}
              animationDuration={300}
            />
            <Line
              name="Intérêts générés"
              type="monotone"
              dataKey="interets"
              stroke="var(--color-interets)"
              strokeWidth={2}
              dot={{ r: 2 }}
              connectNulls={false}
              animationDuration={300}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  } catch (error) {
    console.error("Error rendering chart:", error);
    return (
      <div className="h-[280px] md:h-80 flex items-center justify-center text-gray-500">
        Erreur lors du rendu du graphique
      </div>
    );
  }
});

ChartContent.displayName = "ChartContent";

export default ChartContent;
