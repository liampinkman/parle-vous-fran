
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

// Cache pour éviter les recalculs
const filterCache = new Map<string, ChartDataItem[]>();

// Filter chart data to show key years (1, 5, 10, 15, etc.) for better readability
export const filterChartData = (chartData: ChartDataItem[], duree: string): ChartDataItem[] => {
  if (!chartData?.length) return [];
  
  // Créer une clé de cache unique
  const cacheKey = `${chartData.length}-${duree}-${chartData[0]?.annee}-${chartData[chartData.length - 1]?.annee}`;
  
  // Vérifier le cache d'abord
  if (filterCache.has(cacheKey)) {
    return filterCache.get(cacheKey)!;
  }
  
  const dureeTotale = parseInt(duree, 10);
  if (isNaN(dureeTotale)) return chartData;
  
  // Optimisation : créer un Set pour une recherche O(1)
  const annesClesSet = new Set([1, 5, 10, 15, 20, 25, 30, 35, dureeTotale]);
  
  const filtered = chartData.filter(item => 
    annesClesSet.has(item.annee) || 
    item.annee % 5 === 0
  ).sort((a, b) => a.annee - b.annee);
  
  // Mettre en cache le résultat (limiter la taille du cache)
  if (filterCache.size > 50) {
    const firstKey = filterCache.keys().next().value;
    filterCache.delete(firstKey);
  }
  filterCache.set(cacheKey, filtered);
  
  return filtered;
};

// Determine chart width based on data points and mobile status
export const getChartWidth = (dataLength: number, isMobile: boolean): number => {
  // Utiliser des calculs plus simples et mis en cache
  const baseWidth = isMobile ? 70 : 100;
  const minWidth = isMobile ? 320 : 400;
  
  return Math.max(dataLength * baseWidth, minWidth);
};
