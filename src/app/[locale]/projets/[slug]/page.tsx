import { notFound } from "next/navigation";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { DEMO_PROJECTS, DEMO_PROPERTIES } from "@/data/demo";
import { MapPin, CalendarClock, Building2, Layers, Phone, MessageCircle, ChevronRight } from "lucide-react";

import Gallery from "@/components/property/Gallery";
import AmenitiesList from "@/components/property/AmenitiesList";
import MapEmbed from "@/components/property/MapEmbed";
import PropertyCard from "@/components/ui/PropertyCard";

export async function generateStaticParams() {
  return DEMO_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const project = DEMO_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) return { title: "Programme introuvable — Connect Immobilier" };

  const title = `${project.name} — ${project.city} | Connect Immobilier`;
  return {
    title,
    description: project.description[0],
    alternates: { canonical: `/${params.locale}/projets/${project.slug}` },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const project = DEMO_PROJECTS.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const relatedProperties = DEMO_PROPERTIES.filter((p) => p.wilaya === project.wilaya).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: project.name,
    description: project.description.join(" "),
    url: `https://connectimmobilier.com/${params.locale}/projets/${project.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: project.address,
      addressLocality: project.city,
      addressRegion: project.wilaya,
      addressCountry: "DZ",
    },
    geo: { "@type": "GeoCoordinates", latitude: project.lat, longitude: project.lng },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-5 py-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="mb-2 inline-block rounded-full bg-maroon-100 px-3 py-1 text-xs font-bold text-maroon-700">
              {project.status}
            </span>
            <h1 className="font-heading text-2xl font-extrabold text-slate-900 md:text-[28px]">{project.name}</h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {project.city}</span>
              <span className="flex items-center gap-1.5"><CalendarClock size={14} /> Livraison {project.delivery}</span>
              <span className="flex items-center gap-1.5"><Building2 size={14} /> {project.developer}</span>
            </div>
          </div>
          <div className="text-start sm:text-end">
            <div className="text-xs text-slate-500">À partir de</div>
            <div className="font-heading text-2xl font-extrabold text-maroon-700">{project.priceFrom}</div>
          </div>
        </div>

        <Gallery hues={project.gallery} type={project.type} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <section>
              <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Présentation du programme</h2>
              <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                {project.description.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Caractéristiques</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <Layers size={18} className="mb-2 text-maroon-700" />
                  <div className="text-xs text-slate-500">Composition</div>
                  <div className="font-heading text-sm font-extrabold text-slate-900">{project.units}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <Building2 size={18} className="mb-2 text-maroon-700" />
                  <div className="text-xs text-slate-500">Surface à partir de</div>
                  <div className="font-heading text-sm font-extrabold text-slate-900">{project.surfaceFrom} m²</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <CalendarClock size={18} className="mb-2 text-maroon-700" />
                  <div className="text-xs text-slate-500">Livraison prévue</div>
                  <div className="font-heading text-sm font-extrabold text-slate-900">{project.delivery}</div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Équipements & prestations</h2>
              <AmenitiesList amenities={project.amenities} />
            </section>

            <section>
              <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Localisation</h2>
              <MapEmbed lat={project.lat} lng={project.lng} address={project.address} />
            </section>

            {relatedProperties.length > 0 && (
              <section>
                <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Biens disponibles dans cette wilaya</h2>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {relatedProperties.map((p) => <PropertyCard key={p.id} property={p} locale={params.locale} />)}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-1 font-heading text-base font-extrabold text-slate-900">Intéressé par ce programme ?</h3>
              <p className="mb-4 text-sm text-slate-500">
                Un conseiller Connect vous transmet la grille des prix et les disponibilités.
              </p>
              <div className="space-y-2">
                <a href="tel:+213551875179" className="flex items-center gap-2.5 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-maroon-500">
                  <Phone size={15} /> +213 551 87 51 79
                </a>
                <a href="https://wa.me/213558207793" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-xl bg-[#25D366] px-3.5 py-2.5 text-sm font-bold text-white">
                  <MessageCircle size={15} /> Contacter sur WhatsApp
                </a>
              </div>
            </div>
            <Link
              href={`/${params.locale}/projets` as any}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700"
            >
              <ChevronRight size={16} className="rotate-180" /> Tous les programmes
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
