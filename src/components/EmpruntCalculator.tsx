
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EmpruntCalculator = () => {
  const [revenuMensuel, setRevenuMensuel] = useState<string>("");
  const [charges, setCharges] = useState<string>("");
  const [duree, setDuree] = useState<string>("20");
  const [tauxInteret, setTauxInteret] = useState<string>("3.5");
  const [capaciteEmprunt, setCapaciteEmprunt] = useState<number | null>(null);
  const [mensualite, setMensualite] = useState<number | null>(null);
  const [tauxEndettement, setTauxEndettement] = useState<number | null>(null);
  const { toast } = useToast();

  const calculateEmprunt = () => {
    // Validation des entrées
    if (!revenuMensuel || isNaN(parseFloat(revenuMensuel)) || parseFloat(revenuMensuel) <= 0) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez saisir un revenu mensuel valide.",
        variant: "destructive",
      });
      return;
    }

    if (!charges) {
      // Si charges est vide, on considère que c'est 0
      setCharges("0");
    } else if (isNaN(parseFloat(charges)) || parseFloat(charges) < 0) {
      toast({
        title: "Erreur de saisie",
        description: "Les charges doivent être un nombre positif ou zéro.",
        variant: "destructive",
      });
      return;
    }

    const revenu = parseFloat(revenuMensuel);
    const chargesValue = charges ? parseFloat(charges) : 0;
    const tauxMensuel = parseFloat(tauxInteret) / 100 / 12;
    const nbMois = parseInt(duree) * 12;
    
    // Capacité d'endettement maximum (35% des revenus)
    const capaciteMensuelle = (revenu - chargesValue) * 0.35;
    
    // Calcul de la capacité d'emprunt (formule de crédit)
    const capacite = capaciteMensuelle * (1 - Math.pow(1 + tauxMensuel, -nbMois)) / tauxMensuel;
    
    // Calcul du taux d'endettement
    const tauxEndettementValue = (capaciteMensuelle / revenu) * 100;
    
    setCapaciteEmprunt(Math.round(capacite));
    setMensualite(Math.round(capaciteMensuelle));
    setTauxEndettement(Math.round(tauxEndettementValue * 100) / 100);
    
    toast({
      title: "Calcul effectué",
      description: "Votre capacité d'emprunt a été calculée avec succès.",
    });
  };

  return (
    <div className="space-y-6 p-4">
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-medium mb-2 text-blue-800">Informations sur le calcul de capacité d'emprunt en France (2025)</h3>
        <p className="text-sm text-blue-700 mb-2">
          Ce calculateur prend en compte les critères suivants selon les normes françaises actuelles :
        </p>
        <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
          <li>Taux d'endettement maximal de 35% des revenus nets (norme HCSF 2021)</li>
          <li>Durée maximale d'emprunt généralement limitée à 25 ans</li>
          <li>Revenus nets mensuels après impôt</li>
          <li>Charges mensuelles incluant les crédits en cours</li>
          <li>Taux d'intérêt moyen en 2025 (à ajuster selon les offres bancaires actuelles)</li>
        </ul>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="revenu">Revenu mensuel net après impôt (€)</Label>
          <Input
            id="revenu"
            type="number"
            value={revenuMensuel}
            onChange={(e) => setRevenuMensuel(e.target.value)}
            placeholder="3000"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="charges">Charges mensuelles (crédits en cours) (€)</Label>
          <Input
            id="charges"
            type="number"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
            placeholder="500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duree">Durée du prêt (années)</Label>
          <Input
            id="duree"
            type="number"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            placeholder="20"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="taux">Taux d'intérêt (% annuel)</Label>
          <Input
            id="taux"
            type="number"
            step="0.1"
            value={tauxInteret}
            onChange={(e) => setTauxInteret(e.target.value)}
            placeholder="3.5"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={calculateEmprunt} className="w-full md:w-auto">
          Calculer
        </Button>
      </div>

      {capaciteEmprunt !== null && mensualite !== null && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Résultats</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Capacité d'emprunt maximale</TableCell>
              <TableCell className="text-right font-semibold">
                {capaciteEmprunt.toLocaleString()} €
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mensualité maximale</TableCell>
              <TableCell className="text-right font-semibold">
                {mensualite.toLocaleString()} €
              </TableCell>
            </TableRow>
            {tauxEndettement !== null && (
              <TableRow>
                <TableCell>Taux d'endettement</TableCell>
                <TableCell className="text-right font-semibold">
                  {tauxEndettement}%
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default EmpruntCalculator;
