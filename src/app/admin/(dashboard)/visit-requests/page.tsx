import { listVisitRequests } from "@/lib/data/visitRequests";
import { updateVisitRequestStatusAction, deleteVisitRequestAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import VisitRequestsTable from "./VisitRequestsTable";

export default async function VisitRequestsAdminPage() {
  const requests = await listVisitRequests();

  return (
    <div>
      <PageHeader title="Demandes de visite" description="Demandes de visite envoyées depuis les pages de biens." />
      {requests.length === 0 && <NoDatabaseBanner />}
      <VisitRequestsTable requests={requests} onDelete={deleteVisitRequestAction} onStatusChange={updateVisitRequestStatusAction} />
    </div>
  );
}
