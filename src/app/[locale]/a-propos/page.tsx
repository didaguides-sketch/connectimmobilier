import { Locale, getDictionary } from "@/i18n/config";
import Stats from "@/components/home/Stats";
import WhyUs from "@/components/home/WhyUs";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: "À propos — Connect Immobilier",
    description: "Connect Immobilier, agence immobilière de confiance à Alger, accompagne particuliers et investisseurs partout en Algérie.",
    alternates: { canonical: `/${params.locale}/a-propos` },
  };
}

export default async function AboutPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-900 py-12 text-center text-white">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E7A9B2]">Connect Immobilier</div>
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">{dict.nav.about}</h1>
          <p className="mt-2 text-sm text-slate-300">
            Une agence algérienne, un accompagnement humain, un réseau qui grandit chaque année.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-12">
        <h2 className="mb-4 font-heading text-xl font-extrabold text-slate-900">Notre histoire</h2>
        <div className="space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Fondée à Alger, Connect Immobilier est née d'une conviction simple : trouver un bien immobilier en
            Algérie ne devrait pas être un parcours du combattant. Nous avons construit une agence qui vérifie
            chaque annonce sur le terrain, accompagne chaque client personnellement, et parle le même langage que
            ses clients — celui de la confiance.
          </p>
          <p>
            Aujourd'hui, notre équipe intervient à Alger et dans plusieurs grandes wilayas d'Algérie : Oran, Béjaïa,
            Tlemcen, Boumerdès, Tipaza et Sétif. Nous accompagnons aussi bien les particuliers qui achètent leur
            première résidence que les investisseurs qui construisent un patrimoine, ou les promoteurs qui
            commercialisent leurs nouveaux programmes.
          </p>
          <p>
            Notre mission reste la même depuis le premier jour : simplifier l'immobilier en Algérie, avec
            rigueur, transparence et proximité.
          </p>
        </div>
      </div>

      <Stats dict={dict} />
      <WhyUs dict={dict} />

      <div className="mx-auto max-w-3xl px-5 py-12 text-center">
        <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Envie de rencontrer l'équipe ?</h2>
        <p className="mb-5 text-sm text-slate-600">Découvrez nos conseillers et trouvez celui qui accompagnera votre projet.</p>
        <Link
          href={`/${params.locale}/agents` as any}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-6 py-3 text-sm font-bold text-white"
        >
          {dict.nav.agents} <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
