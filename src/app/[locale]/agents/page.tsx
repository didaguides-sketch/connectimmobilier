import { Locale, getDictionary } from "@/i18n/config";
import { DEMO_AGENTS } from "@/data/demo";
import { Phone, MessageCircle, Mail, User } from "lucide-react";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: "Nos agents — Connect Immobilier",
    description: "Rencontrez l'équipe de conseillers Connect Immobilier à Alger.",
    alternates: { canonical: `/${params.locale}/agents` },
  };
}

export default async function AgentsPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-900 py-12 text-center text-white">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E7A9B2]">Connect Immobilier</div>
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">{dict.nav.agents}</h1>
          <p className="mt-2 text-sm text-slate-300">
            Une équipe de conseillers dédiés pour vous accompagner à chaque étape de votre projet immobilier.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEMO_AGENTS.map((a) => {
            const waHref = `https://wa.me/${a.whatsapp.replace(/[^\d]/g, "")}`;
            return (
              <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:-translate-y-1 hover:shadow-card">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-maroon-100 text-maroon-700">
                  <User size={32} />
                </div>
                <h3 className="font-heading text-lg font-extrabold text-slate-900">{a.name}</h3>
                <div className="text-sm text-slate-500">{a.role}</div>
                <div className="mt-1.5 text-xs text-slate-400">{a.lang}</div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{a.bio}</p>

                <div className="mt-5 space-y-2">
                  <a href={`tel:${a.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-maroon-500">
                    <Phone size={15} /> {a.phone}
                  </a>
                  <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-3.5 py-2.5 text-sm font-bold text-white">
                    <MessageCircle size={15} /> WhatsApp
                  </a>
                  <a href={`mailto:${a.email}`} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-maroon-500">
                    <Mail size={15} /> Email
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
