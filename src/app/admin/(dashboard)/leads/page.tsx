import { listLeads } from "@/lib/data/leads";
import { updateLeadStatusAction, deleteLeadAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import LeadsTable from "./LeadsTable";

export default async function LeadsAdminPage() {
  const leads = await listLeads();

  return (
    <div>
      <PageHeader title="Clients & leads" description="Tous les prospects générés par le site (contact, estimation, chat)." />
      {leads.length === 0 && <NoDatabaseBanner />}
      <LeadsTable leads={leads} onDelete={deleteLeadAction} onStatusChange={updateLeadStatusAction} />
    </div>
  );
}
