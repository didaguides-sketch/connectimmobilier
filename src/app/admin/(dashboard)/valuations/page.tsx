import { listValuationRequests } from "@/lib/data/valuations";
import { updateValuationStatusAction, deleteValuationRequestAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import ValuationsTable from "./ValuationsTable";

export default async function ValuationsAdminPage() {
  const requests = await listValuationRequests();

  return (
    <div>
      <PageHeader title="Demandes d'estimation" description="Demandes envoyées depuis la page « Estimer mon bien »." />
      {requests.length === 0 && <NoDatabaseBanner />}
      <ValuationsTable requests={requests} onDelete={deleteValuationRequestAction} onStatusChange={updateValuationStatusAction} />
    </div>
  );
}
