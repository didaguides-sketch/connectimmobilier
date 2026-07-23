import { Locale } from "@/i18n/config";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return { title: "Conditions d'utilisation — Connect Immobilier", alternates: { canonical: `/${params.locale}/conditions` } };
}

export default function TermsPage() {
  return (
    <LegalPageLayout title="Conditions d'utilisation" updatedAt="8 juillet 2026">
      <p>
        L'utilisation du site connectimmobilier.com implique l'acceptation pleine et entière des présentes conditions
        d'utilisation, décrites ci-après.
      </p>

      <h2>1. Objet du site</h2>
      <p>Le site présente les biens immobiliers proposés à la vente ou à la location par Connect Immobilier, ainsi que ses services (estimation, conseil, gestion de projets).</p>

      <h2>2. Exactitude des annonces</h2>
      <p>Nous mettons tout en œuvre pour garantir l'exactitude des informations publiées (prix, surface, localisation). Ces informations peuvent néanmoins évoluer ; elles ne constituent pas une offre contractuelle et seront confirmées lors de tout échange avec un conseiller.</p>

      <h2>3. Propriété intellectuelle</h2>
      <p>L'ensemble des contenus du site (textes, logo, mise en page) est la propriété de Connect Immobilier et ne peut être reproduit sans autorisation écrite préalable.</p>

      <h2>4. Formulaires et demandes</h2>
      <p>En soumettant un formulaire (contact, estimation, demande de visite), vous acceptez d'être recontacté par un conseiller Connect concernant votre demande.</p>

      <h2>5. Responsabilité</h2>
      <p>Connect Immobilier ne saurait être tenu responsable d'une indisponibilité temporaire du site ou d'une erreur ponctuelle d'affichage.</p>

      <h2>6. Droit applicable</h2>
      <p>Les présentes conditions sont soumises au droit algérien. Tout litige relève de la compétence des tribunaux d'Alger.</p>
    </LegalPageLayout>
  );
}
