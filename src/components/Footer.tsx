
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Disclaimer visible en footer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded-r-lg">
          <div className="flex items-start">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-yellow-800 font-medium">
                ⚠️ Calculs indicatifs uniquement - Ne constituent pas des conseils financiers
              </p>
              <p className="text-yellow-700 text-xs mt-1">
                Consultez un professionnel pour tout projet d'investissement. Sources : BCE, HCSF, observatoires immobiliers 2025.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            © 2025 Calculateur d'Investissement Immobilier. Tous droits réservés.
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <Link 
              to="/mentions-legales" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Mentions légales
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <button 
              onClick={() => {
                // Réafficher la bannière de cookies
                localStorage.removeItem('cookieConsent');
                window.location.reload();
              }}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Gestion des cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
