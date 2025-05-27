
/**
 * Memoization utility for optimizing frequent calculations
 */

export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    // Limiter la taille du cache pour éviter les fuites mémoire
    if (cache.size > 100) {
      // Supprimer la première entrée (la plus ancienne)
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    return result;
  }) as T;
};
