
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import PolitiqueCookies from "./pages/PolitiqueCookies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Utiliser la variable d'environnement BASE_URL pour le basename du router
const basename = import.meta.env.BASE_URL || '/';

console.log('🎭 App.tsx: Initializing with basename:', basename);

const App = () => {
  console.log('🎬 App component rendering...');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={basename}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
            <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
            <Route path="/politique-cookies" element={<PolitiqueCookies />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
};

export default App;
