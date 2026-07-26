import { listLeads } from "@/lib/data/leads";
import { updateLeadStatusAction, deleteLeadAction } from "../leads/actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import MessagesTable from "./MessagesTable";
import type { MessageStatus } from "@prisma/client";

export default async function MessagesAdminPage() {
  const messages = await listLeads("contact");

  async function handleStatusChange(id: string, status: string) {
    "use server";
    await updateLeadStatusAction(id, status as MessageStatus);
  }

  return (
    <div>
      <PageHeader title="Messages de contact" description="Messages envoyés depuis le formulaire de contact du site." />
      {messages.length === 0 && <NoDatabaseBanner />}
      <MessagesTable messages={messages} onDelete={deleteLeadAction} onStatusChange={handleStatusChange} />
    </div>
  );
}
