import { listLeads } from "@/lib/data/leads";
import { updateLeadStatusAction, deleteLeadAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import LeadsTable from "./LeadsTable";
import type { MessageStatus } from "@prisma/client";

export default async function LeadsAdminPage() {
  const leads = await listLeads();

  async function handleStatusChange(id: string, status: string) {
    "use server";
    await updateLeadStatusAction(id, status as MessageStatus);
  }

  return (
    <div>
      <PageHeader title="Clients & leads" description="Tous les prospects générés par le site (contact, estimation, chat)." />
      {leads.length === 0 && <NoDatabaseBanner />}
      <LeadsTable leads={leads} onDelete={deleteLeadAction} onStatusChange={handleStatusChange} />
    </div>
  );
}
