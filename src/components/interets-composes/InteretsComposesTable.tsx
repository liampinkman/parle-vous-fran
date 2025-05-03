
import { memo, useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableResult {
  annee: number;
  capitalFinAnnee: number;
  versementsCumules: number;
  gainTotal: number;
}

interface InteretsComposesTableProps {
  results: TableResult[];
  formatMontantEuro: (montant: number) => string;
}

const InteretsComposesTable = memo(({ results, formatMontantEuro }: InteretsComposesTableProps) => {
  // Ref pour la table de résultats scrollable
  const tableScrollRef = useRef<HTMLDivElement>(null);
  
  // State pour contrôler la visualisation des indicateurs de scroll
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  // Fonction pour vérifier et mettre à jour les indicateurs de scroll
  const checkScrollIndicators = () => {
    if (tableScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tableScrollRef.current;
      
      // Afficher l'indicateur gauche si le scroll n'est pas tout à gauche
      setShowLeftScroll(scrollLeft > 0);
      
      // Afficher l'indicateur droit si le scroll n'est pas tout à droite
      // -1 pour éviter des problèmes d'arrondi potentiels
      setShowRightScroll(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  };

  // Vérifier les indicateurs de scroll au chargement et quand les résultats changent
  useEffect(() => {
    checkScrollIndicators();
    // Ajout d'un léger délai pour garantir que les dimensions sont calculées
    const timer = setTimeout(checkScrollIndicators, 100);
    return () => clearTimeout(timer);
  }, [results.length]);

  // Fonction pour faire défiler la table horizontalement
  const scrollTable = (direction: 'left' | 'right') => {
    if (tableScrollRef.current) {
      const scrollAmount = tableScrollRef.current.clientWidth / 2;
      tableScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Indicateurs de défilement */}
      {showLeftScroll && (
        <button 
          onClick={() => scrollTable('left')} 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md border border-gray-200"
          aria-label="Défiler à gauche"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
      )}
      {showRightScroll && (
        <button 
          onClick={() => scrollTable('right')} 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md border border-gray-200"
          aria-label="Défiler à droite"
        >
          <ArrowRight size={16} className="text-gray-600" />
        </button>
      )}
      
      {/* Tableau avec scroll horizontal amélioré */}
      <div 
        ref={tableScrollRef} 
        className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pb-2 pt-1 px-1 -mx-1"
        onScroll={checkScrollIndicators}
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        <Table className="w-full table-fixed min-w-[500px]">
          <TableHeader>
            <TableRow>
              <TableHead className="results-header w-[60px]">Année</TableHead>
              <TableHead className="results-header text-right">Capital</TableHead>
              <TableHead className="results-header text-right">Versements</TableHead>
              <TableHead className="results-header text-right">Plus-value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((resultat) => (
              <TableRow key={resultat.annee}>
                <TableCell className="whitespace-nowrap">{resultat.annee}</TableCell>
                <TableCell className="text-right font-semibold whitespace-nowrap">
                  {formatMontantEuro(resultat.capitalFinAnnee)}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  {formatMontantEuro(resultat.versementsCumules)}
                </TableCell>
                <TableCell className="text-right result-positive whitespace-nowrap">
                  {formatMontantEuro(resultat.gainTotal)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Instructions mobiles */}
      <div className="md:hidden text-xs text-center text-muted-foreground mt-1">
        Glissez horizontalement pour voir toutes les données
      </div>
    </div>
  );
});

InteretsComposesTable.displayName = "InteretsComposesTable";

export default InteretsComposesTable;
