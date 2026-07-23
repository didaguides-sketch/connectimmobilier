import { Locale } from "@/i18n/config";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return { title: "Politique de confidentialité — Connect Immobilier", alternates: { canonical: `/${params.locale}/confidentialite` } };
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Politique de confidentialité" updatedAt="8 juillet 2026">
      <p>
        Connect Immobilier (« nous », « notre agence ») accorde une grande importance à la protection des
        données personnelles de ses utilisateurs et clients. Cette politique explique quelles données nous
        collectons, pourquoi, et comment vous pouvez exercer vos droits.
      </p>

      <h2>1. Données collectées</h2>
      <p>Nous collectons les données que vous nous transmettez volontairement via nos formulaires : nom, téléphone, email, message, et le cas échéant des informations sur le bien qui vous intéresse (achat, location ou estimation).</p>

      <h2>2. Utilisation des données</h2>
      <ul>
        <li>Répondre à vos demandes de renseignements, de visite ou d'estimation ;</li>
        <li>Vous mettre en relation avec l'un de nos conseillers ;</li>
        <li>Améliorer nos services et notre communication.</li>
      </ul>

      <h2>3. Partage des données</h2>
      <p>Vos données ne sont jamais vendues à des tiers. Elles peuvent être partagées avec nos conseillers internes et, le cas échéant, un notaire dans le cadre strict d'une transaction que vous avez initiée.</p>

      <h2>4. Conservation</h2>
      <p>Vos données sont conservées le temps nécessaire au traitement de votre demande, puis archivées ou supprimées conformément à la réglementation algérienne en vigueur.</p>

      <h2>5. Vos droits</h2>
      <p>Vous pouvez à tout moment demander l'accès, la rectification ou la suppression de vos données personnelles en nous contactant à <a className="font-semibold text-maroon-700" href="mailto:agence@connectimmobilier.com">agence@connectimmobilier.com</a>.</p>

      <h2>6. Contact</h2>
      <p>Pour toute question relative à cette politique, contactez-nous au 0550 40 38 34 ou par email à agence@connectimmobilier.com.</p>
    </LegalPageLayout>
  );
}
