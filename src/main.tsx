
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('🚀 Main.tsx: Starting application');
console.log('🌍 Environment:', {
  NODE_ENV: import.meta.env.NODE_ENV,
  BASE_URL: import.meta.env.BASE_URL,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD
});

// Auto-reload une seule fois en cas d'erreur de chargement des chunks (déploiements fréquents)
(function setupChunkErrorAutoReload() {
  const key = 'chunk-reload';
  const shouldHandle = (msg: any) => {
    const text = typeof msg === 'string' ? msg : String(msg?.message || '');
    return /ChunkLoadError|Loading chunk [0-9]+ failed|failed to fetch dynamically imported module|Importing a module script failed/i.test(text);
  };

  const reloadOnce = () => {
    try {
      const done = sessionStorage.getItem(key);
      if (!done) {
        sessionStorage.setItem(key, '1');
        console.warn('🔁 Chunk error détecté. Rechargement pour rafraîchir les assets…');
        window.location.reload();
      } else {
        sessionStorage.removeItem(key);
        console.error('❌ Erreur de chunk persistante après rechargement.');
      }
    } catch {
      window.location.reload();
    }
  };

  window.addEventListener('error', (e: ErrorEvent) => {
    if (shouldHandle(e.message)) reloadOnce();
  });
  window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
    const reason: any = (e && (e as any).reason) || {};
    if (shouldHandle(reason)) reloadOnce();
  });
})();

const rootElement = document.getElementById("root");
console.log('📍 Root element found:', !!rootElement);

if (!rootElement) {
  console.error('❌ Root element not found');
} else {
  try {
    console.log('⚛️ Creating React root...');
    const root = createRoot(rootElement);
    console.log('🎯 Rendering App component...');
    root.render(<App />);
    console.log('✅ App rendered successfully');
  } catch (error) {
    console.error('❌ Error rendering App:', error);
  }
}
