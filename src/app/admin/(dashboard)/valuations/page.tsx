import { listValuationRequests } from "@/lib/data/valuations";
import { updateValuationStatusAction, deleteValuationRequestAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import ValuationsTable from "./ValuationsTable";
import type { MessageStatus } from "@prisma/client";

export default async function ValuationsAdminPage() {
  const requests = await listValuationRequests();

  async function handleStatusChange(id: string, status: string) {
    "use server";
    await updateValuationStatusAction(id, status as MessageStatus);
  }

  return (
    <div>
      <PageHeader title="Demandes d'estimation" description="Demandes envoyées depuis la page « Estimer mon bien »." />
      {requests.length === 0 && <NoDatabaseBanner />}
      <ValuationsTable requests={requests} onDelete={deleteValuationRequestAction} onStatusChange={handleStatusChange} />
    </div>
  );
}
