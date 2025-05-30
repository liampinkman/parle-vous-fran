
import { memo, useRef, useState, useEffect, useMemo } from "react";
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
  
  // Ref for the chart container
  const chartScrollRef = useRef<HTMLDivElement>(null);
  
  // States to control scroll indicator visualization
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  // Debug logging
  console.log("InteretsComposesChart render:", {
    chartDataLength: chartData?.length || 0,
    duree,
    isMobile,
    chartDataSample: chartData?.slice(0, 2)
  });

  // Filter chart data to show key years
  const filteredChartData = useMemo(() => {
    if (!chartData || !Array.isArray(chartData)) {
      console.log("Invalid chartData:", chartData);
      return [];
    }
    
    const filtered = filterChartData(chartData, duree);
    console.log("Filtered chart data:", {
      original: chartData.length,
      filtered: filtered.length,
      sample: filtered.slice(0, 2)
    });
    
    return filtered;
  }, [chartData, duree]);

  // Function to check and update scroll indicators
  const checkScrollIndicators = () => {
    if (chartScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = chartScrollRef.current;
      
      // Show left indicator if not scrolled all the way to the left
      setShowLeftScroll(scrollLeft > 0);
      
      // Show right indicator if not scrolled all the way to the right
      setShowRightScroll(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  // Check scroll indicators on load and when data changes
  useEffect(() => {
    checkScrollIndicators();
    // Add a slight delay to ensure dimensions are calculated
    const timer = setTimeout(checkScrollIndicators, 100);
    return () => clearTimeout(timer);
  }, [filteredChartData.length]);

  // Function to scroll the chart horizontally
  const scrollChart = (direction: 'left' | 'right') => {
    if (chartScrollRef.current) {
      const scrollAmount = chartScrollRef.current.clientWidth / 2;
      chartScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Early return with debug info if no data
  if (!filteredChartData || filteredChartData.length === 0) {
    console.log("No chart data to render");
    return null;
  }

  // Determine chart width based on data points and platform
  const chartWidth = getChartWidth(filteredChartData.length, isMobile);
  
  console.log("Chart width calculated:", chartWidth);

  // Validate formatMontantEuro function
  if (typeof formatMontantEuro !== 'function') {
    console.error("formatMontantEuro is not a function:", formatMontantEuro);
    return null;
  }

  return (
    <div className="bg-white rounded-lg border p-4 h-auto relative">
      <h4 className="text-sm font-medium mb-4 text-primary flex items-center gap-2">
        <ChartLine size={18} />
        Évolution de votre capital par tranches de 5 ans
      </h4>

      {/* Scroll indicators */}
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
      
      {/* Mobile instructions */}
      <div className="md:hidden text-xs text-center text-muted-foreground mt-1">
        Glissez horizontalement pour voir toutes les données
      </div>
    </div>
  );
});

InteretsComposesChart.displayName = "InteretsComposesChart";

export default InteretsComposesChart;
