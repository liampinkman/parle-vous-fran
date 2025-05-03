
import { memo } from "react";
import { ChartLine } from "lucide-react";
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

  if (chartData.length === 0) {
    return null;
  }

  return (
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
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="annee" 
              name="Année"
              tickFormatter={(value) => `A${value}`}
              interval={"preserveStartEnd"}
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              tickFormatter={(value) => 
                value >= 1000000 
                  ? `${(value / 1000000).toFixed(0)}M€` 
                  : value >= 1000 
                    ? `${(value / 1000).toFixed(0)}k€` 
                    : `${value}€`
              }
              tick={{ fontSize: 10 }}
              width={40}
            />
            <Tooltip content={<CustomTooltip formatMontant={formatMontantEuro} />} />
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
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
            <Line
              name="Versements cumulés"
              type="monotone"
              dataKey="versements"
              stroke="var(--color-versements)"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
            <Line
              name="Intérêts générés"
              type="monotone"
              dataKey="interets"
              stroke="var(--color-interets)"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
});

InteretsComposesChart.displayName = "InteretsComposesChart";

export default InteretsComposesChart;
