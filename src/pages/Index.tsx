
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import EmpruntCalculator from "@/components/EmpruntCalculator";
import RentabiliteCalculator from "@/components/RentabiliteCalculator";
import InteretsComposes from "@/components/InteretsComposes";
import Faq from "@/components/Faq";
import AdSpace from "@/components/AdSpace";
import { Calculator, CircleDollarSign, TrendingUp, HelpCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAdRefresh } from "@/hooks/useAdRefresh";
// Import des hooks nécessaires
import { useEmpruntCalculator } from "@/hooks/useEmpruntCalculator";
import { useRentabiliteCalculator } from "@/hooks/useRentabiliteCalculator";
import { useInteretsComposes } from "@/hooks/useInteretsComposes";
import { useState, useCallback, memo, lazy, Suspense } from "react";

// Utilisation du lazy loading pour les contenus moins prioritaires
const SiteAdvice = lazy(() => import("@/components/SiteAdvice"));

const Index = () => {
  const isMobile = useIsMobile();
  const { refreshKey, refreshAds, shouldDisplayAd } = useAdRefresh();
  const [activeTab, setActiveTab] = useState("emprunt");
  
  // Fonction pour gérer les changements d'onglet
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
    // Ne pas rafraîchir les publicités lors des changements d'onglet pour éviter trop de requêtes
  }, []);
  
  return (
    <div className="min-h-screen bg-secondary p-3 pb-6 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-4 md:gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-primary flex items-center gap-2">
              <CircleDollarSign size={isMobile ? 24 : 28} />
              Calculateur d'Investissement Immobilier
            </h1>
            
            {!isMobile && (
              <div className="prose max-w-none mb-4 md:mb-6">
                <p className="text-base md:text-lg text-gray-700 mb-2">
                  Bienvenue sur notre calculateur d'investissement immobilier pour la France en 2025. Cet outil gratuit vous aide à planifier votre projet immobilier de A à Z, de l'emprunt initial jusqu'à l'analyse de la rentabilité locative.
                </p>
              </div>
            )}
            
            <Card className="card-financial">
              <CardContent className="p-3 pt-5 md:pt-6 md:p-6">
                <Tabs defaultValue="emprunt" value={activeTab} onValueChange={handleTabChange} className="w-full">
                  <TabsList className="w-full grid grid-cols-4 mb-2">
                    <TabsTrigger value="emprunt" className="flex items-center justify-center gap-1 text-xs sm:text-sm px-1 sm:px-2">
                      <Calculator size={14} className="shrink-0" />
                      <span className="truncate">Emprunt</span>
                    </TabsTrigger>
                    <TabsTrigger value="rentabilite" className="flex items-center justify-center gap-1 text-xs sm:text-sm px-1 sm:px-2">
                      <CircleDollarSign size={14} className="shrink-0" />
                      <span className="truncate">Rentabilité</span>
                    </TabsTrigger>
                    <TabsTrigger value="interets" className="flex items-center justify-center gap-1 text-xs sm:text-sm px-1 sm:px-2">
                      <TrendingUp size={14} className="shrink-0" />
                      <span className="truncate">Intérêts</span>
                    </TabsTrigger>
                    <TabsTrigger value="faq" className="flex items-center justify-center gap-1 text-xs sm:text-sm px-1 sm:px-2">
                      <HelpCircle size={14} className="shrink-0" />
                      <span className="truncate">FAQ</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Utiliser des memo pour éviter les re-rendus inutiles */}
                  <TabsContent value="emprunt">
                    {!isMobile && (
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Comment calculer votre capacité d'emprunt ?</h2>
                        <p className="text-gray-600">
                          Le calcul prend en compte vos revenus mensuels nets après impôt, vos charges actuelles (incluant les crédits en cours), 
                          et applique un taux d'endettement maximal de 35% conformément aux recommandations du Haut Conseil de Stabilité Financière (HCSF).
                          La durée du prêt et le taux d'intérêt moyen actuel sont également considérés pour estimer votre capacité d'emprunt maximale.
                        </p>
                      </div>
                    )}
                    <EmpruntCalculatorWithRefresh refreshAds={refreshAds} />
                  </TabsContent>
                  
                  <TabsContent value="rentabilite">
                    {!isMobile && (
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Évaluez la rentabilité de votre investissement</h2>
                        <p className="text-gray-600">
                          La rentabilité locative est calculée selon les critères fiscaux français actuels. Nous prenons en compte le prix d'achat, 
                          les frais de notaire, les loyers mensuels, toutes les charges annuelles (taxe foncière, charges de copropriété, assurances, entretien, vacance locative), 
                          ainsi que l'impact de la fiscalité (PFU à 30% ou régime réel). Vous obtiendrez des indicateurs complets : rentabilité brute, nette avant et après impôt, 
                          et cash-flow mensuel disponible.
                        </p>
                      </div>
                    )}
                    <RentabiliteCalculatorWithRefresh refreshAds={refreshAds} />
                  </TabsContent>
                  
                  <TabsContent value="interets">
                    {!isMobile && (
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">La puissance des intérêts composés</h2>
                        <p className="text-gray-600">
                          Le calculateur d'intérêts composés vous permet de projeter la croissance de votre capital investi en bourse sur le long terme. 
                          En combinant un investissement initial, des versements réguliers et le réinvestissement systématique des gains, 
                          vous pourrez visualiser l'effet spectaculaire des intérêts composés au fil des années et comparer cette stratégie 
                          avec votre investissement immobilier.
                        </p>
                      </div>
                    )}
                    <InteretsComposesWithRefresh refreshAds={refreshAds} />
                  </TabsContent>
                  
                  <TabsContent value="faq">
                    {!isMobile && (
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Questions fréquentes sur l'investissement</h2>
                        <p className="text-gray-600">
                          Consultez nos réponses aux questions les plus fréquemment posées sur l'investissement immobilier et financier en France.
                          Ces informations sont régulièrement mises à jour pour refléter les dernières tendances et réglementations du marché français.
                        </p>
                      </div>
                    )}
                    <Faq />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

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
        {!isMobile && (
          <Suspense fallback={<div className="mt-6 h-40 bg-gray-100 animate-pulse rounded-lg"></div>}>
            <div className="mt-6 md:mt-8 prose max-w-none">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-primary">Conseils pour votre investissement immobilier en France (2025)</h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">Avant d'emprunter</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Évaluez votre capacité d'épargne mensuelle</li>
                    <li>Constituez un apport personnel d'au moins 10-15%</li>
                    <li>Vérifiez votre taux d'endettement actuel (max 35%)</li>
                    <li>Comparez les offres de plusieurs banques et courtiers</li>
                    <li>Pensez à l'assurance emprunteur (délégation possible)</li>
                  </ul>
                </div>
                <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 text-primary">Pour la rentabilité locative</h3>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Étudiez le marché locatif local et sa dynamique</li>
                    <li>Anticipez les charges réelles (copropriété, taxe foncière)</li>
                    <li>Considérez le régime fiscal adapté (LMNP, SCI, etc.)</li>
                    <li>Évaluez le potentiel de plus-value à long terme</li>
                    <li>Prévoyez une réserve pour travaux et vacance locative</li>
                  </ul>
                </div>
              </div>
            </div>
          </Suspense>
        )}
      </div>
    </div>
  );
};

// Composants optimisés avec memo pour éviter les re-rendus inutiles
const EmpruntCalculatorWithRefresh = memo(({ refreshAds }: { refreshAds: () => void }) => {
  const { revenuMensuel, setRevenuMensuel, charges, setCharges, duree, setDuree, 
          tauxInteret, setTauxInteret, result, calculateEmprunt } = useEmpruntCalculator();

  const handleCalculate = useCallback(() => {
    calculateEmprunt();
    refreshAds();
  }, [calculateEmprunt, refreshAds]);

  return (
    <EmpruntCalculator
      revenuMensuel={revenuMensuel}
      setRevenuMensuel={setRevenuMensuel}
      charges={charges}
      setCharges={setCharges}
      duree={duree}
      setDuree={setDuree}
      tauxInteret={tauxInteret}
      setTauxInteret={setTauxInteret}
      result={result}
      calculateEmprunt={handleCalculate}
    />
  );
});

const RentabiliteCalculatorWithRefresh = memo(({ refreshAds }: { refreshAds: () => void }) => {
  const { prixAchat, setPrixAchat, fraisNotaire, setFraisNotaire, loyerMensuel, setLoyerMensuel,
          chargesAnnuelles, setChargesAnnuelles, tauxImpot, setTauxImpot, apport, setApport,
          tauxCredit, setTauxCredit, dureeCredit, setDureeCredit, result, calculateRentabilite } = useRentabiliteCalculator();

  const handleCalculate = useCallback(() => {
    calculateRentabilite();
    refreshAds();
  }, [calculateRentabilite, refreshAds]);

  return (
    <RentabiliteCalculator
      prixAchat={prixAchat}
      setPrixAchat={setPrixAchat}
      fraisNotaire={fraisNotaire}
      setFraisNotaire={setFraisNotaire}
      loyerMensuel={loyerMensuel}
      setLoyerMensuel={setLoyerMensuel}
      chargesAnnuelles={chargesAnnuelles}
      setChargesAnnuelles={setChargesAnnuelles}
      tauxImpot={tauxImpot}
      setTauxImpot={setTauxImpot}
      apport={apport}
      setApport={setApport}
      tauxCredit={tauxCredit}
      setTauxCredit={setTauxCredit}
      dureeCredit={dureeCredit}
      setDureeCredit={setDureeCredit}
      result={result}
      calculateRentabilite={handleCalculate}
    />
  );
});

const InteretsComposesWithRefresh = memo(({ refreshAds }: { refreshAds: () => void }) => {
  const { montantInitial, setMontantInitial, versementsMensuels, setVersementsMensuels,
          tauxAnnuel, setTauxAnnuel, duree, setDuree, resultats, calculerInteretsComposes,
          getAnneesClesCalcul, formatMontantEuro } = useInteretsComposes();

  const handleCalculate = useCallback(() => {
    calculerInteretsComposes();
    refreshAds();
  }, [calculerInteretsComposes, refreshAds]);

  return (
    <InteretsComposes
      montantInitial={montantInitial}
      setMontantInitial={setMontantInitial}
      versementsMensuels={versementsMensuels}
      setVersementsMensuels={setVersementsMensuels}
      tauxAnnuel={tauxAnnuel}
      setTauxAnnuel={setTauxAnnuel}
      duree={duree}
      setDuree={setDuree}
      resultats={resultats}
      calculerInteretsComposes={handleCalculate}
      getAnneesClesCalcul={getAnneesClesCalcul}
      formatMontantEuro={formatMontantEuro}
    />
  );
});

// Ajout des displayNames pour aider au debugging
EmpruntCalculatorWithRefresh.displayName = "EmpruntCalculatorWithRefresh";
RentabiliteCalculatorWithRefresh.displayName = "RentabiliteCalculatorWithRefresh";
InteretsComposesWithRefresh.displayName = "InteretsComposesWithRefresh";

export default Index;
