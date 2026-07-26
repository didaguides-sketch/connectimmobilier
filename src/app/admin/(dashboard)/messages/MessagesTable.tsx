"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import StatusSelect from "@/components/admin/StatusSelect";
import type { Lead } from "@prisma/client";

export default function MessagesTable({
  messages,
  onDelete,
  onStatusChange,
}: {
  messages: Lead[];
  onDelete: (id: string) => Promise<void>;
  onStatusChange: (id: string, status: string) => Promise<void>;
}) {
  const columns: Column<Lead>[] = [
    { header: "Nom", render: (l) => <span className="font-semibold text-slate-900">{l.name}</span> },
    { header: "Téléphone", render: (l) => l.phone },
    { header: "Email", render: (l) => l.email ?? "—" },
    { header: "Message", render: (l) => <span className="line-clamp-2 max-w-sm text-slate-600">{l.message ?? "—"}</span> },
    { header: "Statut", render: (l) => <StatusSelect id={l.id} status={l.status} onChange={onStatusChange} /> },
    { header: "Reçu le", render: (l) => new Date(l.createdAt).toLocaleDateString("fr-FR") },
  ];

  return (
    <DataTable
      columns={columns}
      rows={messages}
      onDelete={onDelete}
      emptyMessage="Aucun message pour le moment."
    />
  );
}
