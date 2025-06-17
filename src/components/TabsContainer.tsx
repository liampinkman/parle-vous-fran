
import { useState, useCallback, memo, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import EmpruntCalculator from "@/components/EmpruntCalculator";
import RentabiliteCalculator from "@/components/RentabiliteCalculator";
import InteretsComposes from "@/components/InteretsComposes";
import Faq from "@/components/Faq";
import { Calculator, CircleDollarSign, TrendingUp, HelpCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useEmpruntCalculator } from "@/hooks/useEmpruntCalculator";
import { useRentabiliteCalculator } from "@/hooks/useRentabiliteCalculator";
import { useInteretsComposes } from "@/hooks/useInteretsComposes";

interface TabsContainerProps {
  refreshAds: () => void;
  trackCalculation: (type: string) => void;
  triggerMobileOverlay?: () => void;
}

const TabsContainer = ({ refreshAds, trackCalculation, triggerMobileOverlay }: TabsContainerProps) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("emprunt");
  
  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <Card className="card-financial">
      <CardContent className="p-3 pt-5 md:pt-6 md:p-6">
        <Tabs defaultValue="emprunt" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full grid sm:grid-cols-4 grid-cols-2 gap-1 mb-2">
            <TabsTrigger value="emprunt" className="flex items-center justify-center gap-1.5">
              <Calculator size={16} className="shrink-0" />
              <span>Emprunt</span>
            </TabsTrigger>
            <TabsTrigger value="rentabilite" className="flex items-center justify-center gap-1.5">
              <CircleDollarSign size={16} className="shrink-0" />
              <span>Rentabilité locative</span>
            </TabsTrigger>
            <TabsTrigger value="interets" className="flex items-center justify-center gap-1.5">
              <TrendingUp size={16} className="shrink-0" />
              <span>Intérêts composés</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center justify-center gap-1.5">
              <HelpCircle size={16} className="shrink-0" />
              <span>FAQ</span>
            </TabsTrigger>
          </TabsList>
          
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
            <EmpruntCalculatorWithRefresh refreshAds={refreshAds} trackCalculation={trackCalculation} triggerMobileOverlay={triggerMobileOverlay} />
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
            <RentabiliteCalculatorWithRefresh refreshAds={refreshAds} trackCalculation={trackCalculation} triggerMobileOverlay={triggerMobileOverlay} />
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
            <InteretsComposesWithRefresh refreshAds={refreshAds} trackCalculation={trackCalculation} triggerMobileOverlay={triggerMobileOverlay} />
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
  );
};

// Composants optimisés avec memo pour éviter les re-rendus inutiles
const EmpruntCalculatorWithRefresh = memo(({ refreshAds, trackCalculation, triggerMobileOverlay }: { refreshAds: () => void; trackCalculation: (type: string) => void; triggerMobileOverlay?: () => void }) => {
  const { revenuMensuel, setRevenuMensuel, charges, setCharges, duree, setDuree, 
          tauxInteret, setTauxInteret, result, calculateEmprunt } = useEmpruntCalculator();

  const handleCalculate = useCallback(() => {
    calculateEmprunt();
    refreshAds();
    trackCalculation('emprunt');
    triggerMobileOverlay?.();
  }, [calculateEmprunt, refreshAds, trackCalculation, triggerMobileOverlay]);

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

const RentabiliteCalculatorWithRefresh = memo(({ refreshAds, trackCalculation, triggerMobileOverlay }: { refreshAds: () => void; trackCalculation: (type: string) => void; triggerMobileOverlay?: () => void }) => {
  const { prixAchat, setPrixAchat, fraisNotaire, setFraisNotaire, loyerMensuel, setLoyerMensuel,
          chargesAnnuelles, setChargesAnnuelles, tauxImpot, setTauxImpot, apport, setApport,
          tauxCredit, setTauxCredit, dureeCredit, setDureeCredit, result, calculateRentabilite } = useRentabiliteCalculator();

  const handleCalculate = useCallback(() => {
    calculateRentabilite();
    refreshAds();
    trackCalculation('rentabilite');
    triggerMobileOverlay?.();
  }, [calculateRentabilite, refreshAds, trackCalculation, triggerMobileOverlay]);

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

const InteretsComposesWithRefresh = memo(({ refreshAds, trackCalculation, triggerMobileOverlay }: { refreshAds: () => void; trackCalculation: (type: string) => void; triggerMobileOverlay?: () => void }) => {
  const { montantInitial, setMontantInitial, versementsMensuels, setVersementsMensuels,
          tauxAnnuel, setTauxAnnuel, duree, setDuree, resultats, calculerInteretsComposes,
          getAnneesClesCalcul, formatMontantEuro } = useInteretsComposes();

  const handleCalculate = useCallback(() => {
    calculerInteretsComposes();
    refreshAds();
    trackCalculation('interets_composes');
    triggerMobileOverlay?.();
  }, [calculerInteretsComposes, refreshAds, trackCalculation, triggerMobileOverlay]);

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

EmpruntCalculatorWithRefresh.displayName = "EmpruntCalculatorWithRefresh";
RentabiliteCalculatorWithRefresh.displayName = "RentabiliteCalculatorWithRefresh";
InteretsComposesWithRefresh.displayName = "InteretsComposesWithRefresh";

export default TabsContainer;
