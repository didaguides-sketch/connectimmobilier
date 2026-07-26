import { listFaqs } from "@/lib/data/faq";
import { deleteFaqAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import FaqTable from "./FaqTable";

export default async function FaqAdminPage() {
  const faqs = await listFaqs();

  return (
    <div>
      <PageHeader title="Foire aux questions" description="Gérez les questions fréquentes affichées sur le site." actionHref="/admin/faq/new" actionLabel="Nouvelle question" />
      {faqs.length === 0 && <NoDatabaseBanner />}
      <FaqTable faqs={faqs} onDelete={deleteFaqAction} />
    </div>
  );
}
