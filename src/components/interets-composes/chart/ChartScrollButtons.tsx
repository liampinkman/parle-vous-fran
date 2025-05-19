
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ChartScrollButtonsProps {
  showLeftScroll: boolean;
  showRightScroll: boolean;
  onScroll: (direction: 'left' | 'right') => void;
}

const ChartScrollButtons = ({ showLeftScroll, showRightScroll, onScroll }: ChartScrollButtonsProps) => {
  return (
    <>
      {showLeftScroll && (
        <button 
          onClick={() => onScroll('left')} 
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md border border-gray-200"
          aria-label="Défiler à gauche"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
      )}
      {showRightScroll && (
        <button 
          onClick={() => onScroll('right')} 
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md border border-gray-200"
          aria-label="Défiler à droite"
        >
          <ArrowRight size={16} className="text-gray-600" />
        </button>
      )}
    </>
  );
};

export default ChartScrollButtons;
