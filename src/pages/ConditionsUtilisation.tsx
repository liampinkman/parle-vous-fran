
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ConditionsUtilisation = () => {
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
            <CardTitle className="text-2xl">Conditions d'Utilisation</CardTitle>
            <p className="text-gray-600">Dernière mise à jour : Janvier 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Objet et champ d'application</h2>
              <p>
                Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation du site web 
                "Calculateur d'Investissement Immobilier" accessible à l'adresse [votre-domaine.com].
              </p>
              <p>
                L'utilisation du site implique l'acceptation pleine et entière des présentes CGU. 
                Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description du service</h2>
              <p>Le site propose gratuitement :</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Un calculateur de capacité d'emprunt immobilier</li>
                <li>Un calculateur de rentabilité locative</li>
                <li>Un simulateur d'intérêts composés</li>
                <li>Des contenus informatifs sur l'investissement immobilier</li>
              </ul>
              <div className="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400 mt-4">
                <p className="text-sm font-medium">
                  ⚠️ <strong>Important :</strong> Ces outils fournissent des estimations indicatives uniquement. 
                  Ils ne constituent pas des conseils financiers personnalisés et ne sauraient se substituer 
                  à l'expertise d'un professionnel qualifié.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Accès au service</h2>
              <p>
                Le service est accessible gratuitement 24h/24, 7j/7, sous réserve des opérations de maintenance. 
                L'accès se fait via tout terminal connecté à Internet.
              </p>
              <p>
                Nous nous réservons le droit de suspendre temporairement l'accès au site pour des raisons 
                de maintenance, de mise à jour ou d'amélioration.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Utilisation autorisée</h2>
              <p>Vous vous engagez à utiliser le site uniquement pour :</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Effectuer des simulations financières à des fins personnelles</li>
                <li>Consulter les contenus informatifs</li>
                <li>Tout usage conforme à la destination du service</li>
              </ul>
              
              <h3 className="text-lg font-medium mt-4 mb-2">Il est strictement interdit de :</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Utiliser le site à des fins commerciales sans autorisation</li>
                <li>Tenter de pirater, altérer ou compromettre la sécurité du site</li>
                <li>Diffuser des contenus illégaux, diffamatoires ou nuisant à l'image du site</li>
                <li>Utiliser des robots ou scripts automatisés pour collecter des données</li>
                <li>Reproduire ou distribuer le contenu sans autorisation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Propriété intellectuelle</h2>
              <p>
                Le site et tous ses éléments (design, textes, images, logos, algorithmes de calcul) 
                sont protégés par le droit de la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification ou distribution, même partielle, 
                est interdite sans autorisation préalable écrite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitation de responsabilité</h2>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="font-semibold mb-2">Avertissement important</h4>
                <p className="text-sm space-y-2">
                  <strong>Les calculs sont purement indicatifs.</strong> Nous ne saurions être tenus responsables :
                </p>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Des décisions d'investissement prises sur la base de nos calculs</li>
                  <li>De l'exactitude des résultats par rapport à votre situation réelle</li>
                  <li>Des pertes financières consécutives à l'utilisation du site</li>
                  <li>Des interruptions de service ou bugs éventuels</li>
                </ul>
              </div>
              <p className="mt-3">
                <strong>Recommandation :</strong> Consultez systématiquement un conseiller financier, 
                un courtier ou un notaire avant tout projet d'investissement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Données et vie privée</h2>
              <p>
                Le traitement de vos données personnelles est détaillé dans notre 
                <Link to="/politique-confidentialite" className="text-primary underline">
                  Politique de Confidentialité
                </Link>.
              </p>
              <p>
                Les données de calcul sont stockées localement dans votre navigateur et ne sont pas transmises à nos serveurs.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Publicité</h2>
              <p>
                Le site peut afficher des publicités pour financer le service gratuit. 
                Ces publicités sont fournies par des régies publicitaires tierces et peuvent utiliser des cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Modification des CGU</h2>
              <p>
                Nous nous réservons le droit de modifier les présentes CGU à tout moment. 
                La date de dernière mise à jour est indiquée en haut de cette page.
              </p>
              <p>
                Il vous appartient de consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Droit applicable et juridiction</h2>
              <p>
                Les présentes CGU sont soumises au droit français. 
                En cas de litige, les tribunaux de Paris seront seuls compétents, 
                après tentative de résolution amiable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Contact</h2>
              <p>
                Pour toute question relative aux présentes CGU :<br/>
                <strong>Email :</strong> shahmat@mailo.com<br/>
                <strong>Éditeur :</strong> SHAHMAT (SIRET : 88216038500010)
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConditionsUtilisation;
