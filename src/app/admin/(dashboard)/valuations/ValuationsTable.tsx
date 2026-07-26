"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import StatusSelect from "@/components/admin/StatusSelect";
import type { ValuationRequest } from "@prisma/client";

export default function ValuationsTable({
  requests,
  onDelete,
  onStatusChange,
}: {
  requests: ValuationRequest[];
  onDelete: (id: string) => Promise<void>;
  onStatusChange: (id: string, status: string) => Promise<void>;
}) {
  const columns: Column<ValuationRequest>[] = [
    { header: "Nom", render: (r) => <span className="font-semibold text-slate-900">{r.name}</span> },
    { header: "Téléphone", render: (r) => r.phone },
    { header: "Type de bien", render: (r) => r.propertyType },
    { header: "Surface", render: (r) => r.surface ? `${r.surface} m²` : "—" },
    { header: "Estimation IA", render: (r) => r.aiEstimate ? `${Number(r.aiEstimate).toLocaleString("fr-FR")} DA` : "—" },
    { header: "Statut", render: (r) => <StatusSelect id={r.id} status={r.status} onChange={onStatusChange} /> },
  ];

  return (
    <DataTable
      columns={columns}
      rows={requests}
      onDelete={onDelete}
      emptyMessage="Aucune demande d'estimation pour le moment."
    />
  );
}
