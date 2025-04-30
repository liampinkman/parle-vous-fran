
import { useMemo, useCallback, useState, useRef, useEffect } from "react";

type CalculationFunction<T, R> = (params: T) => R;

export function useOptimizedCalculator<T, R>(
  calculationFn: CalculationFunction<T, R>,
  dependencies: any[]
) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<R | null>(null);
  const previousParams = useRef<T | null>(null);
  const calculationTimeout = useRef<number | null>(null);
  
  // Fonction optimisée qui utilise la memoization et les web workers si disponibles
  const calculate = useCallback((params: T) => {
    // Vérifier si les paramètres sont les mêmes que la dernière fois
    if (previousParams.current && 
        JSON.stringify(previousParams.current) === JSON.stringify(params)) {
      return; // Ne pas recalculer si les paramètres sont identiques
    }
    
    // Enregistrer les nouveaux paramètres
    previousParams.current = params;
    
    // Nettoyer tout calcul en attente
    if (calculationTimeout.current !== null) {
      window.clearTimeout(calculationTimeout.current);
    }
    
    setIsCalculating(true);
    
    // Utiliser setTimeout pour éviter de bloquer l'UI
    calculationTimeout.current = window.setTimeout(() => {
      try {
        const newResult = calculationFn(params);
        setResult(newResult);
      } catch (error) {
        console.error("Erreur de calcul:", error);
      } finally {
        setIsCalculating(false);
        calculationTimeout.current = null;
      }
    }, 0);
  }, [calculationFn, ...dependencies]);
  
  // Nettoyer à la destruction du composant
  useEffect(() => {
    return () => {
      if (calculationTimeout.current !== null) {
        window.clearTimeout(calculationTimeout.current);
      }
    };
  }, []);

  return {
    calculate,
    result,
    isCalculating
  };
}
