export interface ChartDataItem {
  name: string;
  annee: number;
  capital: number;
  versements: number;
  interets: number;
}

export const chartConfig = {
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

// Filter chart data to show key years (1, 5, 10, 15, etc.) for better readability
export const filterChartData = (chartData: ChartDataItem[], duree: string): ChartDataItem[] => {
  if (!chartData.length) return [];
  
  // Filter the data to keep years 1, multiples of 5, and the final year
  const dureeTotale = parseInt(duree, 10);
  
  // Key years we want to display (1, 5, 10, 15, 20, 25, 30, 35)
  const annesCles = [1, 5, 10, 15, 20, 25, 30, 35];
  
  return chartData.filter(item => 
    annesCles.includes(item.annee) || // Key years
    item.annee % 5 === 0 || // Other multiples of 5 (for completeness)
    item.annee === dureeTotale // Final year
  ).sort((a, b) => a.annee - b.annee); // Make sure data is sorted by year
};

// Determine chart width based on data points and mobile status
export const getChartWidth = (dataLength: number, isMobile: boolean): number => {
  return isMobile 
    ? Math.max(dataLength * 70, 320) // On mobile, at least 320px or 70px per data point
    : Math.max(dataLength * 100, 100); // On desktop, at least 100px per point or 100%
};
