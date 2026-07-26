"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import StatusSelect from "@/components/admin/StatusSelect";
import { listVisitRequests } from "@/lib/data/visitRequests";

type VisitRequest = Awaited<ReturnType<typeof listVisitRequests>>[number];

export default function VisitRequestsTable({
  requests,
  onDelete,
  onStatusChange,
}: {
  requests: VisitRequest[];
  onDelete: (id: string) => Promise<void>;
  onStatusChange: (id: string, status: string) => Promise<void>;
}) {
  const columns: Column<VisitRequest>[] = [
    { header: "Nom", render: (r) => <span className="font-semibold text-slate-900">{r.name}</span> },
    { header: "Téléphone", render: (r) => r.phone },
    { header: "Bien concerné", render: (r) => r.property?.titleFr ?? "—" },
    { header: "Date souhaitée", render: (r) => r.preferredDate ? new Date(r.preferredDate).toLocaleDateString("fr-FR") : "—" },
    { header: "Statut", render: (r) => <StatusSelect id={r.id} status={r.status} onChange={onStatusChange} /> },
    { header: "Reçu le", render: (r) => new Date(r.createdAt).toLocaleDateString("fr-FR") },
  ];

  return (
    <DataTable
      columns={columns}
      rows={requests}
      onDelete={onDelete}
      emptyMessage="Aucune demande de visite pour le moment."
    />
  );
}
