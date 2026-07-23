import { Locale, getDictionary } from "@/i18n/config";
import { submitValuationAction } from "./actions";
import { WILAYAS } from "@/data/wilayas";
import { formatNumberFr } from "@/lib/utils";
import { Calculator, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  return {
    title: "Estimer mon bien — Connect Immobilier",
    description: "Obtenez une estimation gratuite du prix de votre bien immobilier en Algérie.",
    alternates: { canonical: `/${params.locale}/estimation` },
  };
}

export default async function EstimationPage({
  params,
  searchParams,
}: {
  params: { locale: Locale };
  searchParams: { error?: string; success?: string; estimate?: string };
}) {
  const dict = await getDictionary(params.locale);
  const boundAction = submitValuationAction.bind(null, params.locale);
  const estimate = searchParams.estimate ? Number(searchParams.estimate) : null;

  return (
    <div>
      <section className="border-b border-slate-200 bg-slate-900 py-12 text-center text-white">
        <div className="mx-auto max-w-2xl px-5">
          <div className="mb-2 text-xs font-bold uppercase tracking-widest text-[#E7A9B2]">Connect Immobilier</div>
          <h1 className="font-heading text-2xl font-extrabold md:text-[32px]">{dict.nav.estimate}</h1>
          <p className="mt-2 text-sm text-slate-300">
            Recevez une estimation gratuite et sans engagement de la valeur de votre bien.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-5 py-12">
        {searchParams.success && (
          <div className="mb-5 space-y-3">
            <div className="flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
              <CheckCircle2 size={16} /> Merci ! Votre demande d'estimation a bien été enregistrée.
            </div>
            {estimate ? (
              <div className="flex items-center gap-3 rounded-xl border border-maroon-100 bg-maroon-100 px-4 py-4">
                <Sparkles size={20} className="shrink-0 text-maroon-700" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-maroon-700">Estimation indicative par IA</div>
                  <div className="font-heading text-xl font-extrabold text-maroon-700">{formatNumberFr(estimate)} DA</div>
                  <p className="mt-1 text-xs text-slate-600">
                    Cette estimation est automatique et indicative. Un conseiller Connect vous contactera pour l'affiner.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">
                Un conseiller Connect vous recontactera sous 48h avec une estimation détaillée.
              </p>
            )}
          </div>
        )}
        {searchParams.error && (
          <div className="mb-5 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            <AlertTriangle size={16} /> {searchParams.error}
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center gap-2">
            <Calculator size={18} className="text-maroon-700" />
            <h2 className="font-heading text-lg font-extrabold text-slate-900">Décrivez votre bien</h2>
          </div>

          <form action={boundAction} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Nom complet" className="rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />
              <input name="phone" required placeholder="Téléphone" className="rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />
            </div>
            <input type="email" name="email" placeholder="Email (optionnel)" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <select name="propertyType" className="rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-maroon-500">
                <option value="VILLA">Villa</option>
                <option value="APPARTEMENT">Appartement</option>
                <option value="MAISON">Maison</option>
                <option value="TERRAIN">Terrain</option>
                <option value="LOCAL_COMMERCIAL">Local commercial</option>
                <option value="BUREAU">Bureau</option>
              </select>
              <select name="wilaya" className="rounded-xl border border-slate-200 px-3.5 py-3 text-sm text-slate-700 outline-none focus:border-maroon-500">
                <option value="">Wilaya</option>
                {WILAYAS.map((w) => <option key={w.code} value={w.fr}>{w.fr}</option>)}
              </select>
              <input type="number" name="surface" min={0} placeholder="Surface (m²)" className="rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />
            </div>

            <input type="number" name="rooms" min={0} placeholder="Nombre de pièces" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />
            <textarea name="notes" rows={4} placeholder="Informations complémentaires (état du bien, année de construction…)" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-maroon-500" />

            <button className="w-full rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 py-3 text-sm font-bold text-white">
              Obtenir mon estimation
            </button>
            <p className="text-center text-xs text-slate-400">
              Estimation gratuite et sans engagement. Vos données restent confidentielles.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
