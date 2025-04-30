
import { memo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Book, BookOpen, FileText, Home, TrendingUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Faq = memo(() => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="space-y-6 p-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-medium mb-2 text-blue-800 flex items-center gap-2">
          <BookOpen size={18} />
          Foire aux questions sur l'investissement immobilier et financier
        </h3>
        <p className="text-sm text-blue-700 mb-2">
          Retrouvez les réponses aux questions les plus fréquentes sur l'investissement en France en 2025.
        </p>
      </div>

      <div className="mb-4">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid sm:grid-cols-4 grid-cols-2 gap-1 mb-4">
            <TabsTrigger value="all" className="flex items-center justify-center gap-1.5">
              <BookOpen size={16} />
              <span>Toutes</span>
            </TabsTrigger>
            <TabsTrigger value="immobilier" className="flex items-center justify-center gap-1.5">
              <Home size={16} />
              <span>Immobilier</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center justify-center gap-1.5">
              <TrendingUp size={16} />
              <span>Finance</span>
            </TabsTrigger>
            <TabsTrigger value="new" className="flex items-center justify-center gap-1.5">
              <Book size={16} />
              <span>Nouveautés</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <FaqQuestions showCategory="all" />
          </TabsContent>
          
          <TabsContent value="immobilier">
            <FaqQuestions showCategory="immobilier" />
          </TabsContent>
          
          <TabsContent value="finance">
            <FaqQuestions showCategory="finance" />
          </TabsContent>

          <TabsContent value="new">
            <div className="py-2">
              <p className="text-gray-600">Restez informé des dernières évolutions du marché et des opportunités d'investissement en 2025.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
});

const FaqQuestions = ({ showCategory }: { showCategory: "all" | "immobilier" | "finance" }) => {
  const questions = [
    {
      id: "item-1",
      category: "immobilier",
      title: "Quel est le meilleur investissement locatif en 2025 ?",
      content: (
        <>
          <p className="mb-2">En 2025, les meilleurs investissements locatifs en France varient selon plusieurs facteurs :</p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li>Les villes moyennes comme Angers, Nantes ou Lyon offrent un bon équilibre entre rendement et sécurité</li>
            <li>Les studios et T2 dans les villes universitaires génèrent généralement une meilleure rentabilité</li>
            <li>Les logements économes en énergie (DPE A ou B) sont privilégiés par les locataires et valorisés à la revente</li>
          </ul>
          <p>L'important reste d'analyser le marché local, la demande locative et les perspectives économiques de la zone avant d'investir.</p>
        </>
      )
    },
    {
      id: "item-2",
      category: "immobilier",
      title: "Comment calculer correctement la rentabilité d'un bien immobilier ?",
      content: (
        <>
          <p className="mb-2">Pour calculer précisément la rentabilité d'un investissement immobilier, tenez compte de :</p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li><strong>Rentabilité brute</strong> = (Loyer annuel ÷ Prix d'achat total) × 100</li>
            <li><strong>Rentabilité nette</strong> = (Loyer annuel - Charges annuelles) ÷ Prix d'achat total × 100</li>
            <li><strong>Rentabilité nette après impôt</strong> = (Revenu locatif après impôt) ÷ Prix d'achat total × 100</li>
          </ul>
          <p>N'oubliez pas d'inclure tous les frais : notaire, travaux, charges de copropriété, taxe foncière, assurances, gestion locative, et provision pour vacance locative (généralement 5% des loyers).</p>
        </>
      )
    },
    {
      id: "item-3",
      category: "immobilier",
      title: "LMNP, SCI, ou nu : quel statut fiscal choisir en 2025 ?",
      content: (
        <>
          <p className="mb-2">Le choix du statut fiscal dépend de votre situation personnelle :</p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li><strong>Location nue (régime foncier)</strong> : Simple mais imposé au barème progressif + prélèvements sociaux. Idéal pour les petits investissements avec peu de charges.</li>
            <li><strong>LMNP (réel ou micro-BIC)</strong> : Permet d'amortir le bien et de réduire la fiscalité. Adapté pour des biens meublés avec une bonne rentabilité.</li>
            <li><strong>SCI</strong> : Facilite la transmission et la gestion à plusieurs. Pertinent pour constituer un patrimoine familial ou entre associés.</li>
          </ul>
          <p>En 2025, le LMNP au réel reste souvent le plus avantageux fiscalement pour les investisseurs actifs, tandis que la SCI à l'IS peut être intéressante pour capitaliser des revenus sans les percevoir immédiatement.</p>
        </>
      )
    },
    {
      id: "item-4",
      category: "immobilier",
      title: "Quelles sont les erreurs à éviter en investissement locatif ?",
      content: (
        <>
          <p className="mb-2">Les erreurs courantes en investissement immobilier locatif :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Ne pas étudier suffisamment le marché local (offre/demande, évolution démographique)</li>
            <li>Sous-estimer les charges et le budget travaux</li>
            <li>Négliger la qualité de l'emplacement au profit du prix</li>
            <li>S'endetter au maximum de sa capacité sans garder de marge de sécurité</li>
            <li>Oublier les coûts de mise aux normes (électricité, gaz, performance énergétique)</li>
            <li>Ne pas anticiper les périodes de vacance locative</li>
            <li>Choisir un bien difficile à revendre (faible liquidité du marché)</li>
          </ul>
        </>
      )
    },
    {
      id: "item-5",
      category: "finance",
      title: "Immobilier vs bourse : que choisir en 2025 ?",
      content: (
        <>
          <p className="mb-2">La comparaison entre immobilier et investissement boursier :</p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li><strong>Immobilier</strong> : Rendement moyen de 3-7%, effet de levier via le crédit, fiscalité optimisable, mais faible liquidité et gestion active requise.</li>
            <li><strong>Bourse</strong> : Rendement historique de 6-8% sur le long terme, grande liquidité, diversification facile, mais volatilité importante et pas d'effet de levier par défaut.</li>
          </ul>
          <p>La stratégie optimale en 2025 consiste souvent à diversifier entre ces deux classes d'actifs : l'immobilier pour la stabilité et l'effet de levier, la bourse pour la liquidité et les opportunités de croissance. L'allocation dépendra de votre tolérance au risque et de votre horizon de placement.</p>
        </>
      )
    },
    {
      id: "item-6",
      category: "finance",
      title: "Comment optimiser son crédit immobilier en 2025 ?",
      content: (
        <>
          <p className="mb-2">Pour obtenir les meilleures conditions de crédit immobilier en 2025 :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Constituez un apport d'au moins 10-15% du prix d'achat</li>
            <li>Réduisez vos autres crédits en cours avant de faire une demande</li>
            <li>Maintenez un taux d'endettement sous 33% pour maximiser vos chances</li>
            <li>Consultez plusieurs banques et un courtier pour comparer les offres</li>
            <li>Négociez l'assurance emprunteur en cherchant une délégation d'assurance</li>
            <li>Présentez un dossier solide avec CDI et historique bancaire stable</li>
            <li>Envisagez un apport plus important ou un prêt sur 20 ans plutôt que 25 ans pour obtenir un meilleur taux</li>
          </ul>
        </>
      )
    },
    {
      id: "item-7",
      category: "finance",
      title: "Quels sont les meilleurs placements financiers en 2025 ?",
      content: (
        <>
          <p className="mb-2">Les placements financiers recommandés en 2025 pour les investisseurs français :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>PER (Plan Épargne Retraite)</strong> : Avantage fiscal à l'entrée et rendements intéressants pour la préparation de la retraite</li>
            <li><strong>ETF Monde</strong> : Diversification mondiale à faibles frais, idéal pour l'investissement passif à long terme</li>
            <li><strong>Actions à dividendes</strong> : Pour générer des revenus passifs réguliers tout en participant à la croissance des marchés</li>
            <li><strong>Obligations d'État</strong> : Solution de sécurisation pour une partie du patrimoine dans un contexte de taux stabilisés</li>
            <li><strong>SCPI</strong> : Pour s'exposer à l'immobilier professionnel sans les contraintes de gestion directe</li>
          </ul>
          <p>L'important est de diversifier ses placements et d'adapter sa stratégie à son horizon temporel et à sa tolérance au risque.</p>
        </>
      )
    },
    {
      id: "item-8",
      category: "finance",
      title: "Comment fonctionne l'imposition des plus-values financières ?",
      content: (
        <>
          <p className="mb-2">L'imposition des plus-values financières en France en 2025 :</p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li><strong>Prélèvement Forfaitaire Unique (PFU ou flat tax)</strong> : 30% au total, comprenant 12,8% d'impôt sur le revenu et 17,2% de prélèvements sociaux</li>
            <li><strong>Option pour le barème progressif</strong> : Possible lors de la déclaration de revenus si plus avantageux, avec application d'un abattement pour durée de détention sur certains titres acquis avant 2018</li>
            <li><strong>Enveloppes fiscales privilégiées</strong> : PEA (exonération après 5 ans de détention), Assurance-vie (abattements après 8 ans), PER (fiscalité avantageuse à l'entrée)</li>
          </ul>
          <p>Pour optimiser votre fiscalité, privilégiez les investissements de long terme et utilisez les enveloppes fiscales avantageuses comme le PEA pour les actions européennes ou l'assurance-vie pour une allocation diversifiée.</p>
        </>
      )
    },
  ];

  const filteredQuestions = showCategory === "all" 
    ? questions 
    : questions.filter(q => q.category === showCategory);

  return (
    <Accordion type="single" collapsible className="w-full">
      {filteredQuestions.map(question => (
        <AccordionItem key={question.id} value={question.id}>
          <AccordionTrigger className="text-primary font-medium">
            <span className="flex items-center gap-2">
              <FileText size={18} />
              {question.title}
            </span>
          </AccordionTrigger>
          <AccordionContent>
            {question.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

Faq.displayName = "Faq";

export default Faq;
