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
                Bienvenue sur notre calculateur d'investissement immobilier. Cet outil gratuit vous aide à prendre des décisions éclairées pour vos projets immobiliers en analysant deux aspects cruciaux :
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li className="mb-2">
                  <strong>Capacité d'emprunt</strong> : Estimez le montant maximal que vous pouvez emprunter en fonction de vos revenus et charges.
                </li>
                <li className="mb-2">
                  <strong>Rentabilité locative</strong> : Évaluez la performance financière de votre investissement locatif en calculant les rendements bruts et nets.
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
                        Le calcul prend en compte vos revenus mensuels nets, vos charges actuelles, et applique un taux d'endettement maximal de 35%. 
                        Nous considérons également la durée du prêt et le taux d'intérêt pour estimer votre capacité d'emprunt maximale.
                      </p>
                    </div>
                    <EmpruntCalculator />
                  </TabsContent>
                  <TabsContent value="rentabilite">
                    <div className="mb-4">
                      <h2 className="text-xl font-semibold mb-2">Évaluez la rentabilité de votre investissement</h2>
                      <p className="text-gray-600">
                        La rentabilité locative est calculée en prenant en compte le prix d'achat, les frais de notaire, 
                        les loyers attendus et les charges annuelles. Nous vous fournissons la rentabilité brute, nette, 
                        et le cash-flow mensuel estimé.
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
          <h2 className="text-2xl font-semibold mb-4">Conseils pour votre investissement immobilier</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Avant d'emprunter</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Évaluez votre capacité d'épargne mensuelle</li>
                <li>Constituez un apport personnel solide</li>
                <li>Vérifiez votre taux d'endettement actuel</li>
                <li>Comparez les offres de plusieurs banques</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Pour la rentabilité locative</h3>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Étudiez le marché locatif local</li>
                <li>Anticipez les charges et travaux potentiels</li>
                <li>Considérez la fiscalité applicable</li>
                <li>Évaluez le potentiel de plus-value</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
