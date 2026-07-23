import { Locale, getDictionary } from "@/i18n/config";
import PropertiesResults from "@/components/properties/PropertiesResults";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  return {
    title: `${dict.nav.rent} en Algérie — Connect Immobilier`,
    description: "Appartements, maisons, villas et bureaux à louer partout en Algérie. Annonces vérifiées par Connect Immobilier.",
    alternates: { canonical: `/${params.locale}/location` },
  };
}

export default async function RentPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: Record<string, string | undefined>;
}) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-900 py-10 text-center text-white">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E7A9B2]">
            Connect Immobilier
          </div>
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">Biens à louer en Algérie</h1>
          <p className="mt-2 text-sm text-slate-300">
            Appartements, maisons, villas et bureaux disponibles à la location, partout en Algérie.
          </p>
        </div>
      </section>

      <PropertiesResults
        dict={dict}
        locale={params.locale}
        searchParams={searchParams}
        fixedTransaction="Location"
        basePath={`/${params.locale}/location`}
      />
    </>
  );
}
