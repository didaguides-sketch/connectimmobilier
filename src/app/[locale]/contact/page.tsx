import { Locale, getDictionary } from "@/i18n/config";
import { submitContactAction } from "./actions";
import MapEmbed from "@/components/property/MapEmbed";
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2, AlertTriangle } from "lucide-react";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: "Contact — Connect Immobilier",
    description: "Contactez l'agence Connect Immobilier à Alger : téléphone, WhatsApp, email ou formulaire de contact.",
    alternates: { canonical: `/${params.locale}/contact` },
  };
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { error?: string; success?: string };
}) {
  const dict = await getDictionary(params.locale);
  const boundAction = submitContactAction.bind(null, params.locale);

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-900 py-12 text-center text-white">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E7A9B2]">Connect Immobilier</div>
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">{dict.nav.contact}</h1>
          <p className="mt-2 text-sm text-slate-300">
            Une question, un projet d'achat, de vente ou de location ? Notre équipe vous répond rapidement.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-5 py-10 lg:grid-cols-[1fr_400px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-heading text-xl font-extrabold text-slate-900">Envoyez-nous un message</h2>

          {searchParams.success && (
            <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              <CheckCircle2 size={16} /> Merci ! Votre message a bien été envoyé, un conseiller Connect vous recontactera rapidement.
            </div>
          )}
          {searchParams.error && (
            <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              <AlertTriangle size={16} /> {searchParams.error}
            </div>
          )}

          <form action={boundAction} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Nom complet" className="rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />
              <input name="phone" required placeholder="Téléphone" className="rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />
            </div>
            <input type="email" name="email" placeholder="Email (optionnel)" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />
            <textarea name="message" required rows={5} placeholder="Votre message" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />
            <button className="rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-6 py-3 text-sm font-bold text-white">
              Envoyer le message
            </button>
          </form>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 font-heading text-base font-extrabold text-slate-900">Nos coordonnées</h3>
            <div className="space-y-3 text-sm">
              <a href="tel:+213551875179" className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3.5 py-2.5 font-semibold text-slate-700 hover:border-maroon-500">
                <Phone size={15} /> 0550 40 38 34
              </a>
              <a href="https://wa.me/213558207793" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-xl bg-[#25D366] px-3.5 py-2.5 font-bold text-white">
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a href="mailto:agence@connectimmobilier.com" className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3.5 py-2.5 font-semibold text-slate-700 hover:border-maroon-500">
                <Mail size={15} /> agence@connectimmobilier.com
              </a>
              <div className="flex items-start gap-2.5 px-1 text-slate-600">
                <MapPin size={15} className="mt-0.5 shrink-0" /> 02 Rue Duguet, Vieux Kouba, Alger 16000, Algérie
              </div>
            </div>
          </div>

          <MapEmbed lat={36.7139} lng={3.0631} address="02 Rue Duguet, Vieux Kouba, Alger 16000" />
        </div>
      </div>
    </div>
  );
}
