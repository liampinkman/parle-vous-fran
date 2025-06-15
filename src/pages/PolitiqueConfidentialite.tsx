
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft size={16} className="mr-2" />
              Retour au calculateur
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Politique de Confidentialité</CardTitle>
            <p className="text-gray-600">Dernière mise à jour : Janvier 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Collecte des données</h2>
              <p>
                Notre calculateur d'investissement immobilier collecte et traite les types de données suivantes :
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Données de calcul :</strong> Les montants et paramètres que vous saisissez dans nos calculateurs (revenus, épargne, prix d'achat, etc.)</li>
                <li><strong>Données de navigation :</strong> Adresse IP, type de navigateur, pages visitées, durée de visite</li>
                <li><strong>Cookies :</strong> Cookies techniques nécessaires au fonctionnement et cookies analytiques (avec votre consentement)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Finalités du traitement</h2>
              <p>Nous utilisons vos données pour :</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Fournir les services de calcul demandés</li>
                <li>Améliorer l'expérience utilisateur de notre site</li>
                <li>Analyser l'utilisation de nos outils (anonymisé)</li>
                <li>Assurer la sécurité et le bon fonctionnement du site</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Base légale</h2>
              <p>
                Le traitement de vos données repose sur :
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Intérêt légitime :</strong> Pour les fonctionnalités essentielles du calculateur</li>
                <li><strong>Consentement :</strong> Pour les cookies analytiques et publicitaires</li>
                <li><strong>Obligation légale :</strong> Pour certaines données requises par la réglementation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Conservation des données</h2>
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                <p>
                  <strong>Données de calcul :</strong> Stockées localement dans votre navigateur uniquement, non transmises à nos serveurs<br/>
                  <strong>Données analytiques :</strong> 26 mois maximum<br/>
                  <strong>Logs de sécurité :</strong> 12 mois maximum
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Vos droits (RGPD)</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> Corriger des données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
                <li><strong>Droit à la portabilité :</strong> Récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
                <li><strong>Droit de limitation :</strong> Demander la limitation du traitement</li>
              </ul>
              <p className="mt-3">
                <strong>Pour exercer ces droits :</strong> Contactez-nous à shahmat@mailo.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Cookies et technologies similaires</h2>
              <p>Notre site utilise :</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Cookies nécessaires :</strong> Indispensables au fonctionnement (stockage local des calculs)</li>
                <li><strong>Cookies analytiques :</strong> Google Analytics (avec votre consentement)</li>
                <li><strong>Cookies publicitaires :</strong> Pour afficher des publicités pertinentes (avec votre consentement)</li>
              </ul>
              <p className="mt-3">Vous pouvez gérer vos préférences via la bannière de cookies.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Transferts de données</h2>
              <p>
                Certaines données peuvent être transférées vers des pays tiers (Google Analytics - États-Unis) 
                dans le cadre de décisions d'adéquation de la Commission européenne ou avec des garanties appropriées.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Sécurité des données</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger 
                vos données contre l'accès non autorisé, la perte ou la destruction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Contact et réclamation</h2>
              <p>
                <strong>Délégué à la protection des données :</strong> shahmat@mailo.com<br/>
                <strong>Autorité de contrôle :</strong> CNIL (Commission Nationale de l'Informatique et des Libertés) - www.cnil.fr
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PolitiqueConfidentialite;
