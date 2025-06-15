
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cookie, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const PolitiqueCookies = () => {
  const handleCookieSettings = () => {
    localStorage.removeItem('cookieConsent');
    window.location.reload();
  };

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
            <CardTitle className="text-2xl flex items-center gap-2">
              <Cookie className="text-primary" />
              Politique des Cookies
            </CardTitle>
            <p className="text-gray-600">Dernière mise à jour : Janvier 2025</p>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) 
                lors de la visite d'un site web. Il permet de mémoriser des informations relatives à votre navigation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Les cookies que nous utilisons</h2>
              
              <div className="grid gap-4">
                <div className="border rounded-lg p-4 bg-green-50">
                  <h3 className="font-semibold text-green-800 mb-2">🟢 Cookies strictement nécessaires</h3>
                  <p className="text-sm text-green-700">
                    <strong>Finalité :</strong> Fonctionnement essentiel du site<br/>
                    <strong>Exemples :</strong> Stockage local de vos calculs, préférences d'affichage<br/>
                    <strong>Durée :</strong> Session ou jusqu'à suppression manuelle<br/>
                    <strong>Base légale :</strong> Intérêt légitime (article 82 de la loi Informatique et Libertés)
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    ✅ Ces cookies ne nécessitent pas votre consentement car ils sont indispensables au service.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50">
                  <h3 className="font-semibold text-blue-800 mb-2">🔵 Cookies analytiques</h3>
                  <p className="text-sm text-blue-700">
                    <strong>Finalité :</strong> Mesure d'audience et amélioration du site<br/>
                    <strong>Service :</strong> Google Analytics<br/>
                    <strong>Données :</strong> Pages visitées, durée de visite, source de trafic (anonymisées)<br/>
                    <strong>Durée :</strong> 26 mois maximum<br/>
                    <strong>Base légale :</strong> Consentement
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    ⚙️ Vous pouvez refuser ces cookies sans impact sur l'utilisation du site.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-orange-50">
                  <h3 className="font-semibold text-orange-800 mb-2">🟠 Cookies publicitaires</h3>
                  <p className="text-sm text-orange-700">
                    <strong>Finalité :</strong> Affichage de publicités pertinentes<br/>
                    <strong>Services :</strong> Google AdSense, autres régies publicitaires<br/>
                    <strong>Données :</strong> Centres d'intérêt, historique de navigation<br/>
                    <strong>Durée :</strong> Jusqu'à 13 mois selon le fournisseur<br/>
                    <strong>Base légale :</strong> Consentement
                  </p>
                  <p className="text-xs text-orange-600 mt-2">
                    💰 Ces cookies financent la gratuité du service.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Vos choix concernant les cookies</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3">Gestion via notre bannière</h3>
                <Button onClick={handleCookieSettings} className="mb-3">
                  <Settings size={16} className="mr-2" />
                  Modifier mes préférences cookies
                </Button>
                <p className="text-sm text-gray-600">
                  Vous pouvez à tout moment accepter ou refuser les cookies non-essentiels.
                </p>
              </div>

              <div className="mt-4">
                <h3 className="font-medium mb-2">Gestion via votre navigateur</h3>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white p-3 rounded border">
                    <strong>Chrome :</strong> Menu → Paramètres → Confidentialité et sécurité → Cookies
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Firefox :</strong> Menu → Paramètres → Vie privée et sécurité
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Safari :</strong> Préférences → Confidentialité → Cookies
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <strong>Edge :</strong> Menu → Paramètres → Cookies et autorisations de site
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Cookies tiers</h2>
              <p>Notre site peut contenir des liens vers des sites tiers qui déposent leurs propres cookies :</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Google Analytics :</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="text-primary underline">Politique de confidentialité Google</a></li>
                <li><strong>Google AdSense :</strong> <a href="https://www.google.com/adsense/localized-terms" target="_blank" rel="noopener" className="text-primary underline">Conditions AdSense</a></li>
              </ul>
              <p className="text-sm text-gray-600 mt-2">
                Nous n'avons aucun contrôle sur ces cookies tiers. Consultez leurs politiques respectives.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Impact du refus des cookies</h2>
              <div className="space-y-2">
                <p><strong>Cookies nécessaires :</strong> Le refus peut altérer le fonctionnement du site.</p>
                <p><strong>Cookies analytiques :</strong> Aucun impact sur l'utilisation du site.</p>
                <p><strong>Cookies publicitaires :</strong> Vous verrez toujours des publicités, mais moins pertinentes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Stockage local des données</h2>
              <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                <p className="text-sm">
                  <strong>Important :</strong> Vos calculs (capacité d'emprunt, rentabilité, etc.) sont stockés 
                  uniquement dans votre navigateur via le localStorage. Ces données ne quittent jamais votre terminal 
                  et ne sont pas transmises à nos serveurs.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Mise à jour de cette politique</h2>
              <p>
                Cette politique peut être mise à jour pour refléter les évolutions technologiques ou réglementaires. 
                La date de dernière modification est indiquée en haut de cette page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
              <p>
                Pour toute question sur notre utilisation des cookies :<br/>
                <strong>Email :</strong> shahmat@mailo.com<br/>
                <strong>Objet :</strong> Question cookies - Calculateur Immobilier
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PolitiqueCookies;
