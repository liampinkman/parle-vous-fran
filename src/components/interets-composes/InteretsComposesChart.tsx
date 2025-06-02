
import { memo, useRef, useState, useEffect, useMemo, useCallback } from "react";
import { ChartLine } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import ChartContent from "./chart/ChartContent";
import ChartScrollButtons from "./chart/ChartScrollButtons";
import { filterChartData, getChartWidth, ChartDataItem } from "./chart/chartConfig";

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
  const isMobile = useIsMobile();
  const chartScrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  // Add defensive checks for props
  if (!chartData || !Array.isArray(chartData) || typeof formatMontantEuro !== 'function') {
    console.error("InteretsComposesChart: Invalid props", { chartData, formatMontantEuro });
    return null;
  }

  // Filter chart data to show key years - optimisé avec useMemo
  const filteredChartData = useMemo(() => {
    try {
      if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
        return [];
      }
      
      // Validate each data item before filtering
      const validData = chartData.filter(item => {
        return item && 
          typeof item.annee === 'number' && 
          typeof item.capital === 'number' && 
          typeof item.versements === 'number' && 
          typeof item.interets === 'number' &&
          !isNaN(item.capital) &&
          !isNaN(item.versements) &&
          !isNaN(item.interets) &&
          isFinite(item.capital) &&
          isFinite(item.versements) &&
          isFinite(item.interets);
      });

      return filterChartData(validData, duree);
    } catch (error) {
      console.error("Error filtering chart data:", error);
      return [];
    }
  }, [chartData, duree]);

  // Optimisation de la fonction de vérification des indicateurs de scroll
  const checkScrollIndicators = useCallback(() => {
    try {
      const element = chartScrollRef.current;
      if (!element) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = element;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    } catch (error) {
      console.error("Error checking scroll indicators:", error);
    }
  }, []);

  // Check scroll indicators on load and when data changes - optimisé
  useEffect(() => {
    if (filteredChartData.length === 0) return;
    
    const timeoutId = setTimeout(checkScrollIndicators, 100);
    return () => clearTimeout(timeoutId);
  }, [filteredChartData.length, checkScrollIndicators]);

  // Function to scroll the chart horizontally - optimisé avec useCallback
  const scrollChart = useCallback((direction: 'left' | 'right') => {
    try {
      const element = chartScrollRef.current;
      if (!element) return;
      
      const scrollAmount = element.clientWidth / 2;
      element.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    } catch (error) {
      console.error("Error scrolling chart:", error);
    }
  }, []);

  // Early return if no valid data
  if (!filteredChartData || !Array.isArray(filteredChartData) || filteredChartData.length === 0) {
    return null;
  }

  // Determine chart width based on data points and platform - mis en cache
  const chartWidth = useMemo(() => {
    try {
      return getChartWidth(filteredChartData.length, isMobile);
    } catch (error) {
      console.error("Error calculating chart width:", error);
      return isMobile ? '100%' : '800px';
    }
  }, [filteredChartData.length, isMobile]);

  return (
    <div className="bg-white rounded-lg border p-4 h-auto relative">
      <h4 className="text-sm font-medium mb-4 text-primary flex items-center gap-2">
        <ChartLine size={18} />
        Évolution de votre capital par tranches de 5 ans
      </h4>

      <ChartScrollButtons 
        showLeftScroll={showLeftScroll}
        showRightScroll={showRightScroll}
        onScroll={scrollChart}
      />

      <ScrollArea className="w-full">
        <div 
          ref={chartScrollRef}
          className="overflow-x-auto scrollbar-thin pb-2 pt-1"
          onScroll={checkScrollIndicators}
          style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
        >
          <div style={{ width: chartWidth, minWidth: '100%' }}>
            <ChartContent 
              data={filteredChartData}
              formatMontantEuro={formatMontantEuro}
            />
          </div>
        </div>
      </ScrollArea>
      
      {isMobile && (
        <div className="text-xs text-center text-muted-foreground mt-1">
          Glissez horizontalement pour voir toutes les données
        </div>
      )}
    </div>
  );
});

InteretsComposesChart.displayName = "InteretsComposesChart";

export default InteretsComposesChart;
