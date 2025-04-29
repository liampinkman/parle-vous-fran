
import { memo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Book, BookOpen, FileText } from "lucide-react";

const Faq = memo(() => {
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

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-primary font-medium">
            <span className="flex items-center gap-2">
              <FileText size={18} />
              Quel est le meilleur investissement locatif en 2025 ?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">En 2025, les meilleurs investissements locatifs en France varient selon plusieurs facteurs :</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Les villes moyennes comme Angers, Nantes ou Lyon offrent un bon équilibre entre rendement et sécurité</li>
              <li>Les studios et T2 dans les villes universitaires génèrent généralement une meilleure rentabilité</li>
              <li>Les logements économes en énergie (DPE A ou B) sont privilégiés par les locataires et valorisés à la revente</li>
            </ul>
            <p>L'important reste d'analyser le marché local, la demande locative et les perspectives économiques de la zone avant d'investir.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-primary font-medium">
            <span className="flex items-center gap-2">
              <FileText size={18} />
              Comment calculer correctement la rentabilité d'un bien immobilier ?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">Pour calculer précisément la rentabilité d'un investissement immobilier, tenez compte de :</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li><strong>Rentabilité brute</strong> = (Loyer annuel ÷ Prix d'achat total) × 100</li>
              <li><strong>Rentabilité nette</strong> = (Loyer annuel - Charges annuelles) ÷ Prix d'achat total × 100</li>
              <li><strong>Rentabilité nette après impôt</strong> = (Revenu locatif après impôt) ÷ Prix d'achat total × 100</li>
            </ul>
            <p>N'oubliez pas d'inclure tous les frais : notaire, travaux, charges de copropriété, taxe foncière, assurances, gestion locative, et provision pour vacance locative (généralement 5% des loyers).</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-primary font-medium">
            <span className="flex items-center gap-2">
              <FileText size={18} />
              LMNP, SCI, ou nu : quel statut fiscal choisir en 2025 ?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">Le choix du statut fiscal dépend de votre situation personnelle :</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li><strong>Location nue (régime foncier)</strong> : Simple mais imposé au barème progressif + prélèvements sociaux. Idéal pour les petits investissements avec peu de charges.</li>
              <li><strong>LMNP (réel ou micro-BIC)</strong> : Permet d'amortir le bien et de réduire la fiscalité. Adapté pour des biens meublés avec une bonne rentabilité.</li>
              <li><strong>SCI</strong> : Facilite la transmission et la gestion à plusieurs. Pertinent pour constituer un patrimoine familial ou entre associés.</li>
            </ul>
            <p>En 2025, le LMNP au réel reste souvent le plus avantageux fiscalement pour les investisseurs actifs, tandis que la SCI à l'IS peut être intéressante pour capitaliser des revenus sans les percevoir immédiatement.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-primary font-medium">
            <span className="flex items-center gap-2">
              <FileText size={18} />
              Quelles sont les erreurs à éviter en investissement locatif ?
            </span>
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-primary font-medium">
            <span className="flex items-center gap-2">
              <FileText size={18} />
              Immobilier vs bourse : que choisir en 2025 ?
            </span>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">La comparaison entre immobilier et investissement boursier :</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li><strong>Immobilier</strong> : Rendement moyen de 3-7%, effet de levier via le crédit, fiscalité optimisable, mais faible liquidité et gestion active requise.</li>
              <li><strong>Bourse</strong> : Rendement historique de 6-8% sur le long terme, grande liquidité, diversification facile, mais volatilité importante et pas d'effet de levier par défaut.</li>
            </ul>
            <p>La stratégie optimale en 2025 consiste souvent à diversifier entre ces deux classes d'actifs : l'immobilier pour la stabilité et l'effet de levier, la bourse pour la liquidité et les opportunités de croissance. L'allocation dépendra de votre tolérance au risque et de votre horizon de placement.</p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-6">
          <AccordionTrigger className="text-primary font-medium">
            <span className="flex items-center gap-2">
              <FileText size={18} />
              Comment optimiser son crédit immobilier en 2025 ?
            </span>
          </AccordionTrigger>
          <AccordionContent>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
});

Faq.displayName = "Faq";

export default Faq;
