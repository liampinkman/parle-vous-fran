
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

  // Filter chart data to show key years - optimisé avec useMemo
  const filteredChartData = useMemo(() => {
    if (!chartData || !Array.isArray(chartData)) {
      return [];
    }
    return filterChartData(chartData, duree);
  }, [chartData, duree]);

  // Optimisation de la fonction de vérification des indicateurs de scroll
  const checkScrollIndicators = useCallback(() => {
    const element = chartScrollRef.current;
    if (!element) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = element;
    setShowLeftScroll(scrollLeft > 0);
    setShowRightScroll(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
  }, []);

  // Check scroll indicators on load and when data changes - optimisé
  useEffect(() => {
    if (filteredChartData.length === 0) return;
    
    const timeoutId = setTimeout(checkScrollIndicators, 100);
    return () => clearTimeout(timeoutId);
  }, [filteredChartData.length, checkScrollIndicators]);

  // Function to scroll the chart horizontally - optimisé avec useCallback
  const scrollChart = useCallback((direction: 'left' | 'right') => {
    const element = chartScrollRef.current;
    if (!element) return;
    
    const scrollAmount = element.clientWidth / 2;
    element.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }, []);

  // Early return if no data
  if (!filteredChartData?.length) {
    return null;
  }

  // Validate formatMontantEuro function
  if (typeof formatMontantEuro !== 'function') {
    console.error("formatMontantEuro is not a function");
    return null;
  }

  // Determine chart width based on data points and platform - mis en cache
  const chartWidth = useMemo(() => 
    getChartWidth(filteredChartData.length, isMobile), 
    [filteredChartData.length, isMobile]
  );

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
