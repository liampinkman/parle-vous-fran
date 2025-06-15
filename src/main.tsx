
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
