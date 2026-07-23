import { Locale, getDictionary } from "@/i18n/config";
import { DEMO_FAQS } from "@/data/demo";
import FaqAccordion from "@/components/faq/FaqAccordion";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: "Questions fréquentes — Connect Immobilier",
    description: "Réponses aux questions les plus fréquentes sur l'achat, la location et l'estimation immobilière en Algérie.",
    alternates: { canonical: `/${params.locale}/faq` },
  };
}

export default async function FaqPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);
  const categories = Array.from(new Set(DEMO_FAQS.map((f) => f.category)));

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-900 py-12 text-center text-white">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E7A9B2]">Connect Immobilier</div>
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">{dict.nav.faq}</h1>
          <p className="mt-2 text-sm text-slate-300">Les réponses aux questions les plus posées par nos clients.</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-5 py-12 space-y-10">
        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="mb-4 font-heading text-lg font-extrabold text-slate-900">{cat}</h2>
            <FaqAccordion faqs={DEMO_FAQS.filter((f) => f.category === cat)} />
          </div>
        ))}
      </div>
    </div>
  );
}
