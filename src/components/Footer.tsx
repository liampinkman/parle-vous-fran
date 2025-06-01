
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-6">
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
            <Separator orientation="vertical" className="h-4" />
            <span className="text-gray-600">
              Données indicatives - Consultez un professionnel
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
