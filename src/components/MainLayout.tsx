
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdRefresh } from "@/hooks/useAdRefresh";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useMobileOverlayAd } from "@/hooks/useMobileOverlayAd";
import { ENV } from "@/config/environment";
import { lazy, Suspense, useEffect, useState, useCallback } from "react";

// Lazy loading des composants pour optimiser les performances
const AdSpace = lazy(() => import("@/components/AdSpace"));
const Header = lazy(() => import("@/components/Header"));
const PageHeader = lazy(() => import("@/components/PageHeader"));
const TabsContainer = lazy(() => import("@/components/TabsContainer"));
const InformationalContent = lazy(() => import("@/components/InformationalContent"));
const Footer = lazy(() => import("@/components/Footer"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));
const MobileOverlayAd = lazy(() => import("@/components/MobileOverlayAd"));

// Composant de chargement simple
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const MainLayout = () => {
  const isMobile = useIsMobile();
  const { refreshKey, refreshAds, shouldDisplayAd } = useAdRefresh();
  const { showOverlay, closeOverlay, trackOverlayInteraction, triggerOverlayAfterCalculation, checkSessionStorage } = useMobileOverlayAd();
  
  // État pour gérer l'onglet actif
  const [activeTab, setActiveTab] = useState("emprunt");
  
  // Fonction pour changer l'onglet depuis PageHeader
  const handleTabChange = useCallback((tabValue: string) => {
    setActiveTab(tabValue);
  }, []);
  
  // Utiliser la configuration centralisée pour Google Analytics
  const { trackCalculation } = useAnalytics(ENV.GA_MEASUREMENT_ID);

  // Vérifier le sessionStorage au montage du composant
  useEffect(() => {
    checkSessionStorage();
  }, [checkSessionStorage]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header principal professionnel */}
      <Suspense fallback={<LoadingSpinner />}>
        <Header />
      </Suspense>

      <div className="p-3 pb-6 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 md:gap-6">
            <div>
              <Suspense fallback={<LoadingSpinner />}>
                <PageHeader onTabChange={handleTabChange} />
                <TabsContainer
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  refreshAds={refreshAds} 
                  trackCalculation={trackCalculation} 
                  triggerMobileOverlay={triggerOverlayAfterCalculation}
                />

                {/* Publicité en bas uniquement si l'utilisateur n'est pas sur mobile ou si shouldDisplayAd retourne true */}
                {(!isMobile || shouldDisplayAd("bottom")) && (
                  <AdSpace position="bottom" refreshKey={refreshKey} />
                )}
              </Suspense>
            </div>

            {/* Sidebar avec publicités uniquement si l'utilisateur n'est pas sur mobile */}
            {!isMobile && (
              <div className="space-y-4 md:space-y-6">
                <Suspense fallback={<LoadingSpinner />}>
                  <AdSpace position="sidebar" refreshKey={refreshKey} />
                  {shouldDisplayAd("sidebar") && (
                    <AdSpace position="sidebar" refreshKey={refreshKey} />
                  )}
                </Suspense>
              </div>
            )}
          </div>

          {/* Contenu informatif en bas de page - chargé paresseusement */}
          <Suspense fallback={<LoadingSpinner />}>
            <InformationalContent />
          </Suspense>
        </div>
      </div>

      {/* Footer et bannière cookies */}
      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
        <CookieBanner />
      </Suspense>

      {/* Overlay Ad Mobile - affiché conditionnellement */}
      {showOverlay && (
        <Suspense fallback={null}>
          <MobileOverlayAd 
            onClose={closeOverlay} 
            onTrackInteraction={trackOverlayInteraction}
          />
        </Suspense>
      )}
    </div>
  );
};

export default MainLayout;
