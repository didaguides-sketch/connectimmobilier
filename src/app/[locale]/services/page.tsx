import { Locale, getDictionary } from "@/i18n/config";
import { DEMO_SERVICES } from "@/data/demo";
import { Home, Key, Calculator, FileSearch, Users2, Building, ChevronRight } from "lucide-react";
import Link from "next/link";

const ICONS: Record<string, any> = { Home, Key, Calculator, FileSearch, Users2, Building };

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: "Nos services — Connect Immobilier",
    description: "Achat, location, estimation, conseil juridique, gestion de projets et immobilier d'entreprise en Algérie.",
    alternates: { canonical: `/${params.locale}/services` },
  };
}

export default async function ServicesPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-900 py-12 text-center text-white">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E7A9B2]">Connect Immobilier</div>
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">{dict.nav.services}</h1>
          <p className="mt-2 text-sm text-slate-300">
            Un accompagnement complet pour chaque projet immobilier, à Alger et partout en Algérie.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DEMO_SERVICES.map(({ icon, title, desc, detail }) => {
            const Icon = ICONS[icon];
            return (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-100 text-maroon-700">
                  <Icon size={22} />
                </div>
                <h3 className="font-heading text-lg font-extrabold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm font-semibold text-maroon-700">{desc}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">{detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl bg-slate-100 p-8 text-center">
          <h2 className="font-heading text-xl font-extrabold text-slate-900">Un projet en tête ?</h2>
          <p className="max-w-md text-sm text-slate-600">
            Parlons-en avec un conseiller Connect — premier échange gratuit et sans engagement.
          </p>
          <Link
            href={`/${params.locale}/contact` as any}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-6 py-3 text-sm font-bold text-white"
          >
            Nous contacter <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
