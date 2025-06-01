
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdRefresh } from "@/hooks/useAdRefresh";
import AdSpace from "@/components/AdSpace";
import PageHeader from "@/components/PageHeader";
import TabsContainer from "@/components/TabsContainer";
import InformationalContent from "@/components/InformationalContent";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import { useAnalytics } from "@/hooks/useAnalytics";

const MainLayout = () => {
  const isMobile = useIsMobile();
  const { refreshKey, refreshAds, shouldDisplayAd } = useAdRefresh();
  
  // Initialiser Google Analytics (remplacez par votre ID)
  const { trackCalculation } = useAnalytics("GA_MEASUREMENT_ID"); // À remplacer par votre vrai ID

  return (
    <div className="min-h-screen bg-secondary">
      <div className="p-3 pb-6 md:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 md:gap-6">
            <div>
              <PageHeader />
              <TabsContainer refreshAds={refreshAds} trackCalculation={trackCalculation} />

              {/* Publicité en bas uniquement si l'utilisateur n'est pas sur mobile ou si shouldDisplayAd retourne true */}
              {(!isMobile || shouldDisplayAd("bottom")) && <AdSpace position="bottom" refreshKey={refreshKey} />}
            </div>

            {/* Sidebar avec publicités uniquement si l'utilisateur n'est pas sur mobile ou si shouldDisplayAd retourne true */}
            {!isMobile && (
              <div className="space-y-4 md:space-y-6">
                <AdSpace position="sidebar" refreshKey={refreshKey} />
                {shouldDisplayAd("sidebar") && <AdSpace position="sidebar" refreshKey={refreshKey} />}
              </div>
            )}
          </div>

          {/* Contenu informatif en bas de page - chargé paresseusement */}
          <InformationalContent />
        </div>
      </div>

      {/* Footer et bannière cookies */}
      <Footer />
      <CookieBanner />
    </div>
  );
};

export default MainLayout;
