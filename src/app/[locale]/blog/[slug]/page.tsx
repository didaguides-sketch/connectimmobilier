import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { DEMO_ARTICLES } from "@/data/demo";
import { Newspaper, ChevronRight } from "lucide-react";

export async function generateStaticParams() {
  return DEMO_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const article = DEMO_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return { title: "Article introuvable — Connect Immobilier" };

  return {
    title: `${article.title} — Connect Immobilier`,
    description: article.excerpt,
    alternates: { canonical: `/${params.locale}/blog/${article.slug}` },
  };
}

export default async function ArticleDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const article = DEMO_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    articleSection: article.category,
    url: `https://connectimmobilier.com/${params.locale}/blog/${article.slug}`,
  };

  const related = DEMO_ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-3xl px-5 py-10">
        <div className="mb-4 text-xs font-bold uppercase tracking-wide text-maroon-700">{article.category}</div>
        <h1 className="mb-5 font-heading text-2xl font-extrabold text-slate-900 md:text-[32px]">{article.title}</h1>
        <div className="mb-8 flex h-56 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Newspaper size={40} />
        </div>

        <div className="space-y-4 text-[15px] leading-relaxed text-slate-700">
          {article.content.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        <Link
          href={`/${params.locale}/blog` as any}
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-maroon-700"
        >
          <ChevronRight size={15} className="rotate-180" /> Retour au blog
        </Link>

        {related.length > 0 && (
          <div className="mt-10 border-t border-slate-200 pt-8">
            <h2 className="mb-4 font-heading text-lg font-extrabold text-slate-900">À lire aussi</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((a) => (
                <Link
                  key={a.id}
                  href={`/${params.locale}/blog/${a.slug}` as any}
                  className="rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  <div className="text-xs font-bold uppercase tracking-wide text-maroon-700">{a.category}</div>
                  <div className="mt-1 font-heading text-sm font-extrabold text-slate-900">{a.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
