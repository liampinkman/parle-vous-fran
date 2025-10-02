import { useIsMobile } from "@/hooks/use-mobile";
import { useAdRefresh } from "@/hooks/useAdRefresh";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useMobileOverlayAd } from "@/hooks/useMobileOverlayAd";
import { useTabState } from "@/hooks/useTabState";
import { ENV } from "@/config/environment";
import { lazy, Suspense, useEffect } from "react";

// Composants critiques importés directement (pas de lazy loading)
import Header from "@/components/Header";
import AdSpace from "@/components/AdSpace";
import AdColumn from "@/components/layout/AdColumn";
import BottomAds from "@/components/layout/BottomAds";

// Lazy loading uniquement pour les composants non-critiques
const PageHeader = lazy(() => import("@/components/PageHeader"));
const TabsContainer = lazy(() => import("@/components/TabsContainer"));
const InformationalContent = lazy(() => import("@/components/InformationalContent"));
const Footer = lazy(() => import("@/components/Footer"));
const CookieBanner = lazy(() => import("@/components/CookieBanner"));
const MobileOverlayAd = lazy(() => import("@/components/MobileOverlayAd"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);


const MainLayout = () => {
  const isMobile = useIsMobile();
  const { refreshKey, refreshAds, shouldDisplayAd } = useAdRefresh();
  const { showOverlay, closeOverlay, trackOverlayInteraction, triggerOverlayAfterCalculation, checkSessionStorage } = useMobileOverlayAd();
  const { activeTab, setActiveTab } = useTabState();
  const { trackCalculation } = useAnalytics(ENV.GA_MEASUREMENT_ID);

  useEffect(() => {
    checkSessionStorage();
  }, [checkSessionStorage]);


  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="p-3 pb-6 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 md:gap-6">
            <div>
              <Suspense fallback={<LoadingSpinner />}>
                <PageHeader onTabChange={setActiveTab} />
                <TabsContainer
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  refreshAds={refreshAds} 
                  trackCalculation={trackCalculation} 
                  triggerMobileOverlay={triggerOverlayAfterCalculation}
                />
              </Suspense>

              {(!isMobile || shouldDisplayAd("bottom")) && (
                <AdSpace position="bottom" refreshKey={refreshKey} />
              )}
            </div>


            {!isMobile && <AdColumn refreshKey={refreshKey} />}
          </div>


          <Suspense fallback={<LoadingSpinner />}>
            <InformationalContent />
          </Suspense>

          <BottomAds refreshKey={refreshKey} />
        </div>
      </div>


      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
        <CookieBanner />
      </Suspense>


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
