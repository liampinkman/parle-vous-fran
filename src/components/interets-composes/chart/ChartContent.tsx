
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

interface ChartContentProps {
  data: ChartDataItem[];
  formatMontantEuro: (montant: number) => string;
}

const ChartContent = ({ data, formatMontantEuro }: ChartContentProps) => {
  console.log("ChartContent render:", {
    dataLength: data?.length || 0,
    dataSample: data?.slice(0, 2),
    formatFunction: typeof formatMontantEuro
  });

  // Validate data before rendering
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error("ChartContent: Invalid or empty data:", data);
    return (
      <div className="h-[280px] md:h-80 flex items-center justify-center text-gray-500">
        Aucune donnée à afficher
      </div>
    );
  }

  // Validate each data item
  const validData = data.filter(item => {
    const isValid = item && 
      typeof item.annee === 'number' && 
      typeof item.capital === 'number' && 
      typeof item.versements === 'number' && 
      typeof item.interets === 'number' &&
      !isNaN(item.capital) &&
      !isNaN(item.versements) &&
      !isNaN(item.interets);
    
    if (!isValid) {
      console.error("Invalid data item:", item);
    }
    
    return isValid;
  });

  if (validData.length === 0) {
    console.error("No valid data items found");
    return (
      <div className="h-[280px] md:h-80 flex items-center justify-center text-gray-500">
        Données invalides
      </div>
    );
  }

  console.log("Valid data for chart:", validData.length, "items");

  return (
    <ChartContainer
      className="h-[280px] md:h-80 overflow-visible"
      config={{
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
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={validData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis 
            dataKey="annee" 
            name="Année"
            tickFormatter={(value) => `A${value}`}
            interval={0}
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
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            name="Versements cumulés"
            type="monotone"
            dataKey="versements"
            stroke="var(--color-versements)"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
          <Line
            name="Intérêts générés"
            type="monotone"
            dataKey="interets"
            stroke="var(--color-interets)"
            strokeWidth={2}
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ChartContent;
