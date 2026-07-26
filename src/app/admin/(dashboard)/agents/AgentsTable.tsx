"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import type { Agent } from "@prisma/client";

export default function AgentsTable({
  agents,
  onDelete,
}: {
  agents: Agent[];
  onDelete: (id: string) => Promise<void>;
}) {
  const columns: Column<Agent>[] = [
    { header: "Nom", render: (a) => <span className="font-semibold text-slate-900">{a.fullName}</span> },
    { header: "Fonction", render: (a) => a.role ?? "—" },
    { header: "Téléphone", render: (a) => a.phone },
    {
      header: "Statut",
      render: (a) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${a.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {a.active ? "Actif" : "Inactif"}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={agents}
      editHrefBase="/admin/agents"
      onDelete={onDelete}
      emptyMessage="Aucun agent enregistré."
    />
  );
}
