import { Locale, getDictionary } from "@/i18n/config";
import ProjectsResults from "@/components/projects/ProjectsResults";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: "Nouveaux projets immobiliers en Algérie — Connect Immobilier",
    description: "Découvrez les programmes immobiliers neufs de Connect partout en Algérie : résidences, villas et bureaux, du lancement à la livraison.",
    alternates: { canonical: `/${params.locale}/projets` },
  };
}

export default async function ProjectsPage({
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
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">{dict.nav.projects}</h1>
          <p className="mt-2 text-sm text-slate-300">
            Résidences, villas et complexes de bureaux en cours de construction ou récemment livrés, partout en Algérie.
          </p>
        </div>
      </section>

      <ProjectsResults locale={params.locale} searchParams={searchParams} basePath={`/${params.locale}/projets`} />
    </>
  );
}
