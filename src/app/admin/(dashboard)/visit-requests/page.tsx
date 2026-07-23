import { listVisitRequests } from "@/lib/data/visitRequests";
import { updateVisitRequestStatusAction, deleteVisitRequestAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import DataTable, { Column } from "@/components/admin/DataTable";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import StatusSelect from "@/components/admin/StatusSelect";

export default async function VisitRequestsAdminPage() {
  const requests = await listVisitRequests();

  const columns: Column<(typeof requests)[number]>[] = [
    { header: "Nom", render: (r) => <span className="font-semibold text-slate-900">{r.name}</span> },
    { header: "Téléphone", render: (r) => r.phone },
    { header: "Bien concerné", render: (r) => r.property?.titleFr ?? "—" },
    { header: "Date souhaitée", render: (r) => r.preferredDate ? new Date(r.preferredDate).toLocaleDateString("fr-FR") : "—" },
    { header: "Statut", render: (r) => <StatusSelect id={r.id} status={r.status} onChange={updateVisitRequestStatusAction} /> },
    { header: "Reçu le", render: (r) => new Date(r.createdAt).toLocaleDateString("fr-FR") },
  ];

  return (
    <div>
      <PageHeader title="Demandes de visite" description="Demandes de visite envoyées depuis les pages de biens." />
      {requests.length === 0 && <NoDatabaseBanner />}
      <DataTable columns={columns} rows={requests} onDelete={deleteVisitRequestAction} emptyMessage="Aucune demande de visite pour le moment." />
    </div>
  );
}
