
import { useCallback, useState, useRef, useEffect } from "react";

type CalculationFunction<T, R> = (params: T) => R;
type ResultCallback<R> = (result: R) => void;

export function useOptimizedCalculator<T, R>(
  calculationFn: CalculationFunction<T, R>,
  dependencies: any[]
) {
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<R | null>(null);
  const previousParams = useRef<T | null>(null);
  const calculationTimeout = useRef<number | null>(null);
  const abortController = useRef<AbortController | null>(null);
  
  // Fonction optimisée qui utilise la memoization et les web workers si disponibles
  const calculate = useCallback((params: T, callback?: ResultCallback<R>) => {
    // Vérifier si les paramètres sont les mêmes que la dernière fois
    if (previousParams.current && 
        JSON.stringify(previousParams.current) === JSON.stringify(params)) {
      if (result && callback) {
        callback(result);
      }
      return;
    }
    
    // Enregistrer les nouveaux paramètres
    previousParams.current = params;
    
    // Nettoyer tout calcul en attente
    if (calculationTimeout.current !== null) {
      window.clearTimeout(calculationTimeout.current);
    }
    
    // Annuler toute opération précédente
    if (abortController.current) {
      abortController.current.abort();
    }
    abortController.current = new AbortController();
    
    setIsCalculating(true);
    
    // Utiliser requestAnimationFrame pour mieux synchroniser avec le cycle de rendu
    requestAnimationFrame(() => {
      // Puis setTimeout pour éviter de bloquer l'UI
      calculationTimeout.current = window.setTimeout(() => {
        try {
          if (abortController.current?.signal.aborted) return;
          
          const newResult = calculationFn(params);
          
          // Utiliser requestAnimationFrame pour mettre à jour l'état au bon moment
          requestAnimationFrame(() => {
            if (!abortController.current?.signal.aborted) {
              setResult(newResult);
              setIsCalculating(false);
              
              // Appeler le callback avec le résultat si fourni
              if (callback) {
                callback(newResult);
              }
            }
          });
        } catch (error) {
          console.error("Erreur de calcul:", error);
          setIsCalculating(false);
        } finally {
          calculationTimeout.current = null;
        }
      }, 0);
    });
  }, [calculationFn, result, ...dependencies]);
  
  // Nettoyer à la destruction du composant
  useEffect(() => {
    return () => {
      if (calculationTimeout.current !== null) {
        window.clearTimeout(calculationTimeout.current);
      }
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  return {
    calculate,
    result,
    isCalculating
  };
}
