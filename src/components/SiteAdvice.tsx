
import { memo } from "react";

const SiteAdvice = memo(() => {
  return (
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
  );
});

SiteAdvice.displayName = "SiteAdvice";

export default SiteAdvice;
