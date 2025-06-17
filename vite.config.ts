
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  // Pour un domaine personnalisé, on utilise '/' comme base
  const base = '/';
  
  console.log('Vite config - Mode:', mode, 'Base:', base);
  
  return {
    base,
    
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
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true, // Activons les sourcemaps pour debug
      minify: 'esbuild',
      target: 'es2015',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@radix-ui/react-tabs'],
            'chart-vendor': ['recharts'],
            'router-vendor': ['react-router-dom'],
          },
        },
      },
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1000,
    },
    
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'recharts',
      ],
    },
  };
});
