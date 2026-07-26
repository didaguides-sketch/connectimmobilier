import { listLeads } from "@/lib/data/leads";
import { updateLeadStatusAction, deleteLeadAction } from "../leads/actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import MessagesTable from "./MessagesTable";

export default async function MessagesAdminPage() {
  const messages = await listLeads("contact");

  return (
    <div>
      <PageHeader title="Messages de contact" description="Messages envoyés depuis le formulaire de contact du site." />
      {messages.length === 0 && <NoDatabaseBanner />}
      <MessagesTable messages={messages} onDelete={deleteLeadAction} onStatusChange={updateLeadStatusAction} />
    </div>
  );
}
