
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import EmpruntCalculator from "@/components/EmpruntCalculator";
import RentabiliteCalculator from "@/components/RentabiliteCalculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Calculateur d'Investissement Immobilier
        </h1>
        
        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="emprunt" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="emprunt" className="w-full">Capacité d'Emprunt</TabsTrigger>
                <TabsTrigger value="rentabilite" className="w-full">Rentabilité Locative</TabsTrigger>
              </TabsList>
              <TabsContent value="emprunt">
                <EmpruntCalculator />
              </TabsContent>
              <TabsContent value="rentabilite">
                <RentabiliteCalculator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
