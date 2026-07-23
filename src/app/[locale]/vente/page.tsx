import { Locale, getDictionary } from "@/i18n/config";
import PropertiesResults from "@/components/properties/PropertiesResults";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  return {
    title: `${dict.nav.sale} en Algérie — Connect Immobilier`,
    description: "Villas, appartements, maisons et terrains à vendre partout en Algérie. Annonces vérifiées par Connect Immobilier.",
    alternates: { canonical: `/${params.locale}/vente` },
  };
}

export default async function SalePage({
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
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">Biens à vendre en Algérie</h1>
          <p className="mt-2 text-sm text-slate-300">
            Villas, appartements, maisons et terrains sélectionnés par nos conseillers, partout en Algérie.
          </p>
        </div>
      </section>

      <PropertiesResults
        dict={dict}
        locale={params.locale}
        searchParams={searchParams}
        fixedTransaction="Vente"
        basePath={`/${params.locale}/vente`}
      />
    </>
  );
}
