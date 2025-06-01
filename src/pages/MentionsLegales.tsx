
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const MentionsLegales = () => {
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
            <CardTitle className="text-2xl">Mentions Légales</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Éditeur du site</h2>
              <p>
                <strong>Nom :</strong> [Votre nom ou raison sociale]<br />
                <strong>Statut :</strong> Auto-entrepreneur<br />
                <strong>SIRET :</strong> [À compléter]<br />
                <strong>Adresse :</strong> [Votre adresse]<br />
                <strong>Email :</strong> [Votre email de contact]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Hébergement</h2>
              <p>
                Ce site est hébergé par :<br />
                <strong>Vercel Inc.</strong><br />
                340 S Lemon Ave #4133, Walnut, CA 91789, USA
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit d'auteur. 
                Toute reproduction, même partielle, est interdite sans autorisation préalable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Données personnelles</h2>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression 
                de vos données personnelles. Pour exercer ces droits, contactez-nous à l'adresse email indiquée ci-dessus.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Cookies</h2>
              <p>
                Ce site utilise des cookies pour améliorer votre expérience utilisateur et analyser le trafic. 
                Vous pouvez gérer vos préférences via la bannière de cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Limitation de responsabilité</h2>
              <p>
                Les informations fournies par ce calculateur sont données à titre indicatif et ne constituent 
                pas des conseils financiers personnalisés. Nous vous recommandons de consulter un professionnel 
                pour tout projet d'investissement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Droit applicable</h2>
              <p>
                Le présent site est soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MentionsLegales;
