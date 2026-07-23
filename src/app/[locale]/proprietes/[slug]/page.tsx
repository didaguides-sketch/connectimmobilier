import { notFound } from "next/navigation";
import { Locale, getDictionary } from "@/i18n/config";
import { DEMO_PROPERTIES, DEMO_AGENTS } from "@/data/demo";
import { parsePriceValue, formatNumberFr } from "@/lib/utils";
import { MapPin, Ruler, BedDouble } from "lucide-react";

import Gallery from "@/components/property/Gallery";
import SpecsGrid from "@/components/property/SpecsGrid";
import AmenitiesList from "@/components/property/AmenitiesList";
import MapEmbed from "@/components/property/MapEmbed";
import AgentCard from "@/components/property/AgentCard";
import ShareFavoriteButtons from "@/components/property/ShareFavoriteButtons";
import StickyMobileBar from "@/components/property/StickyMobileBar";
import VisitRequestForm from "@/components/property/VisitRequestForm";
import MortgageCalculator from "@/components/property/MortgageCalculator";
import SimilarProperties from "@/components/property/SimilarProperties";

export async function generateStaticParams() {
  return DEMO_PROPERTIES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }) {
  const property = DEMO_PROPERTIES.find((p) => p.slug === params.slug);
  if (!property) return { title: "Bien introuvable — Connect Immobilier" };

  const title = `${property.title} — ${property.city} | Connect Immobilier`;
  const description = property.description[0];

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    alternates: { canonical: `/${params.locale}/proprietes/${property.slug}` },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const property = DEMO_PROPERTIES.find((p) => p.slug === params.slug);
  if (!property) notFound();

  const dict = await getDictionary(params.locale);
  const agent = DEMO_AGENTS.find((a) => a.id === property.agentId) ?? DEMO_AGENTS[0];
  const priceValue = parsePriceValue(property.price);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description.join(" "),
    url: `https://connectimmobilier.com/${params.locale}/proprietes/${property.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.wilaya,
      addressCountry: "DZ",
    },
    geo: { "@type": "GeoCoordinates", latitude: property.lat, longitude: property.lng },
    floorSize: { "@type": "QuantitativeValue", value: property.surface, unitCode: "MTK" },
    numberOfRooms: property.rooms,
    offers: {
      "@type": "Offer",
      price: priceValue,
      priceCurrency: "DZD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-6xl px-5 py-6 pb-24 md:pb-8">
        {/* En-tête */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="mb-2 inline-block rounded-full bg-maroon-100 px-3 py-1 text-xs font-bold text-maroon-700">
              {property.listingType}
            </span>
            <h1 className="font-heading text-2xl font-extrabold text-slate-900 md:text-[28px]">{property.title}</h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {property.city}</span>
              <span className="flex items-center gap-1.5"><Ruler size={14} /> {property.surface} m²</span>
              {property.rooms > 0 && <span className="flex items-center gap-1.5"><BedDouble size={14} /> {property.rooms} pièces</span>}
            </div>
          </div>
          <div className="flex items-start justify-between gap-3 sm:flex-col sm:items-end">
            <div className="font-heading text-2xl font-extrabold text-maroon-700">{property.price}</div>
            <ShareFavoriteButtons title={property.title} />
          </div>
        </div>

        {/* Galerie */}
        <Gallery hues={property.gallery} type={property.type} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            <section>
              <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Description</h2>
              <div className="space-y-3 text-sm leading-relaxed text-slate-600">
                {property.description.map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </section>

            <section>
              <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Caractéristiques</h2>
              <SpecsGrid property={property} />
            </section>

            <section>
              <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Équipements & prestations</h2>
              <AmenitiesList amenities={property.amenities} />
            </section>

            <section>
              <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Localisation</h2>
              <MapEmbed lat={property.lat} lng={property.lng} address={property.address} />
            </section>

            {property.listingType === "Vente" && (
              <section>
                <h2 className="mb-3 font-heading text-xl font-extrabold text-slate-900">Simulation de financement</h2>
                <MortgageCalculator priceValue={priceValue} />
              </section>
            )}

            <SimilarProperties current={property} locale={params.locale} />
          </div>

          {/* Colonne latérale */}
          <div className="space-y-5 lg:sticky lg:top-24 lg:h-fit">
            <AgentCard agent={agent} />
            <VisitRequestForm propertyId={property.reference} />
          </div>
        </div>
      </div>

      <StickyMobileBar phone={agent.phone} whatsapp={agent.whatsapp} />
    </>
  );
}
