
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const GeneralDisclaimer = () => {
  return (
    <Alert variant="warning" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Avertissement Important</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          <strong>Les calculs fournis sont purement indicatifs</strong> et ne constituent pas des conseils financiers personnalisés.
        </p>
        <p className="text-xs">
          <strong>Sources :</strong> Taux moyens BCE, HCSF, observatoires immobiliers nationaux, barèmes fiscaux français 2025. 
          <strong> Consultez un professionnel pour tout projet d'investissement.</strong>
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default GeneralDisclaimer;
