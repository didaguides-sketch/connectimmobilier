import { Locale, getDictionary } from "@/i18n/config";
import { DEMO_ARTICLES } from "@/data/demo";
import { Newspaper, ArrowRight } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: "Blog — Connect Immobilier",
    description: "Conseils, actualités et tendances du marché immobilier en Algérie par Connect Immobilier.",
    alternates: { canonical: `/${params.locale}/blog` },
  };
}

export default async function BlogPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-900 py-12 text-center text-white">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E7A9B2]">Connect Immobilier</div>
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">{dict.nav.blog}</h1>
          <p className="mt-2 text-sm text-slate-300">Conseils et actualités du marché immobilier algérien.</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {DEMO_ARTICLES.map((a) => (
            <Link
              key={a.id}
              href={`/${params.locale}/blog/${a.slug}` as any}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mb-3 flex h-36 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <Newspaper size={30} />
              </div>
              <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-maroon-700">{a.category}</div>
              <h2 className="font-heading text-base font-extrabold text-slate-900">{a.title}</h2>
              <p className="mt-1.5 text-sm text-slate-500">{a.excerpt}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-maroon-700">
                Lire l'article <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
