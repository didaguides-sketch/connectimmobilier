import { Locale } from "@/i18n/config";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return { title: "Politique des cookies — Connect Immobilier", alternates: { canonical: `/${params.locale}/cookies` } };
}

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Politique des cookies" updatedAt="8 juillet 2026">
      <p>
        Cette politique explique ce que sont les cookies, comment le site connectimmobilier.com les utilise, et comment
        vous pouvez en contrôler l'usage.
      </p>

      <h2>1. Qu'est-ce qu'un cookie ?</h2>
      <p>Un cookie est un petit fichier texte déposé sur votre appareil lors de votre navigation, permettant de mémoriser certaines informations d'une visite à l'autre.</p>

      <h2>2. Cookies utilisés sur ce site</h2>
      <ul>
        <li><b>Cookies essentiels</b> : nécessaires au bon fonctionnement du site (préférence de langue, session de connexion à l'espace d'administration) ;</li>
        <li><b>Cookies de mesure d'audience</b> : nous aident à comprendre l'utilisation du site afin de l'améliorer (le cas échéant, de manière anonymisée) ;</li>
        <li>Le site n'utilise pas de cookies publicitaires tiers.</li>
      </ul>

      <h2>3. Gérer vos préférences</h2>
      <p>Vous pouvez configurer votre navigateur pour refuser les cookies ou être averti avant leur dépôt. Notez que la désactivation de certains cookies essentiels peut affecter le bon fonctionnement du site (par exemple la mémorisation de la langue choisie).</p>

      <h2>4. Contact</h2>
      <p>Pour toute question relative à cette politique, contactez-nous à agence@connectimmobilier.com.</p>
    </LegalPageLayout>
  );
}
