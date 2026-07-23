import { Locale, getDictionary } from "@/i18n/config";
import Hero from "@/components/home/Hero";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import LatestProperties from "@/components/home/LatestProperties";
import NewProjects from "@/components/home/NewProjects";
import PropertiesByWilaya from "@/components/home/PropertiesByWilaya";
import PropertiesByType from "@/components/home/PropertiesByType";
import Services from "@/components/home/Services";
import WhyUs from "@/components/home/WhyUs";
import Stats from "@/components/home/Stats";
import Agents from "@/components/home/Agents";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import ValuationCTA from "@/components/home/ValuationCTA";
import Newsletter from "@/components/home/Newsletter";

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <Hero dict={dict} />
      <FeaturedProperties dict={dict} locale={params.locale} />
      <LatestProperties dict={dict} locale={params.locale} />
      <NewProjects dict={dict} locale={params.locale} />
      <PropertiesByWilaya dict={dict} locale={params.locale} />
      <PropertiesByType dict={dict} locale={params.locale} />
      <Services dict={dict} />
      <WhyUs dict={dict} />
      <Stats dict={dict} />
      <Agents dict={dict} />
      <Testimonials dict={dict} />
      <BlogPreview dict={dict} locale={params.locale} />
      <ValuationCTA dict={dict} locale={params.locale} />
      <Newsletter dict={dict} />
    </>
  );
}
