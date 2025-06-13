
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Configuration pour GitHub Pages - remplacez [VOTRE-REPO-NAME] par le nom de votre repo
  base: mode === 'production' ? '/calculateur-investissement-immobilier/' : '/',
  
  server: {
    host: "::",
    port: 8080,
  },
  
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Optimisations pour la production
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Désactiver les sourcemaps en production pour réduire la taille
    minify: 'esbuild',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-tabs', '@radix-ui/react-card'],
          'chart-vendor': ['recharts'],
          'router-vendor': ['react-router-dom'],
        },
      },
    },
    // Optimiser les assets
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },
  
  // Optimisations pour le développement
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'recharts',
    ],
  },
}));
