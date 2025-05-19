
import { ReactNode } from "react";

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

export default CustomTooltip;
