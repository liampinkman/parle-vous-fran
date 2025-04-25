
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import EmpruntCalculator from "@/components/EmpruntCalculator";
import RentabiliteCalculator from "@/components/RentabiliteCalculator";
import AdSpace from "@/components/AdSpace";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Calculateur d'Investissement Immobilier
            </h1>
            
            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-600 mb-4">
                Bienvenue sur notre calculateur d'investissement immobilier pour la France en 2025. Cet outil gratuit vous aide à planifier votre projet immobilier de A à Z, de l'emprunt initial jusqu'à l'analyse de la rentabilité locative.
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li className="mb-2">
                  <strong>Capacité d'emprunt</strong> : Estimez le montant maximal que vous pouvez emprunter en respectant les normes françaises actuelles (taux d'endettement de 35%).
                </li>
                <li className="mb-2">
                  <strong>Rentabilité locative</strong> : Évaluez la performance financière de votre investissement en prenant en compte tous les frais, charges, et la fiscalité française applicable.
                </li>
              </ul>
            </div>
            
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="emprunt" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="emprunt" className="w-full">Capacité d'Emprunt</TabsTrigger>
                    <TabsTrigger value="rentabilite" className="w-full">Rentabilité Locative</TabsTrigger>
                  </TabsList>
                  <TabsContent value="emprunt">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2">Comment calculer votre capacité d'emprunt ?</h2>
                      <p className="text-gray-600">
                        Le calcul prend en compte vos revenus mensuels nets après impôt, vos charges actuelles (incluant les crédits en cours), 
                        et applique un taux d'endettement maximal de 35% conformément aux recommandations du Haut Conseil de Stabilité Financière (HCSF).
                        La durée du prêt et le taux d'intérêt moyen actuel sont également considérés pour estimer votre capacité d'emprunt maximale.
                      </p>
                    </div>
                    <EmpruntCalculator />
                  </TabsContent>
                  <TabsContent value="rentabilite">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2">Évaluez la rentabilité de votre investissement</h2>
                      <p className="text-gray-600">
                        La rentabilité locative est calculée selon les critères fiscaux français actuels. Nous prenons en compte le prix d'achat, 
                        les frais de notaire, les loyers mensuels, toutes les charges annuelles (taxe foncière, charges de copropriété, assurances, entretien, vacance locative), 
                        ainsi que l'impact de la fiscalité (PFU à 30% ou régime réel). Vous obtiendrez des indicateurs complets : rentabilité brute, nette avant et après impôt, 
                        et cash-flow mensuel disponible.
                      </p>
                    </div>
                    <RentabiliteCalculator />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <AdSpace position="bottom" />
          </div>

          <div className="space-y-6">
            <AdSpace position="sidebar" />
            <AdSpace position="sidebar" />
          </div>
        </div>

        <div className="mt-8 prose max-w-none">
          <h2 className="text-2xl font-semibold mb-4">Conseils pour votre investissement immobilier en France (2025)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Avant d'emprunter</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Évaluez votre capacité d'épargne mensuelle</li>
                <li>Constituez un apport personnel d'au moins 10-15%</li>
                <li>Vérifiez votre taux d'endettement actuel (max 35%)</li>
                <li>Comparez les offres de plusieurs banques et courtiers</li>
                <li>Pensez à l'assurance emprunteur (délégation possible)</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Pour la rentabilité locative</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Étudiez le marché locatif local et sa dynamique</li>
                <li>Anticipez les charges réelles (copropriété, taxe foncière)</li>
                <li>Considérez le régime fiscal adapté (LMNP, SCI, etc.)</li>
                <li>Évaluez le potentiel de plus-value à long terme</li>
                <li>Prévoyez une réserve pour travaux et vacance locative</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
