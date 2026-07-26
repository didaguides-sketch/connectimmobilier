"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import { listUsers } from "@/lib/data/users";

type UserRow = Awaited<ReturnType<typeof listUsers>>[number];

const ROLE_LABEL: Record<string, string> = { ADMIN: "Administrateur", EDITOR: "Éditeur", AGENT: "Agent" };

export default function UsersTable({
  users,
  onDelete,
}: {
  users: UserRow[];
  onDelete: (id: string) => Promise<void>;
}) {
  const columns: Column<UserRow>[] = [
    { header: "Nom", render: (u) => <span className="font-semibold text-slate-900">{u.name}</span> },
    { header: "Email", render: (u) => u.email },
    { header: "Rôle", render: (u) => <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">{ROLE_LABEL[u.role] ?? u.role}</span> },
    {
      header: "Statut",
      render: (u) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${u.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {u.active ? "Actif" : "Désactivé"}
        </span>
      ),
    },
    { header: "Dernière connexion", render: (u) => u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString("fr-FR") : "—" },
  ];

  return (
    <DataTable
      columns={columns}
      rows={users}
      editHrefBase="/admin/users"
      onDelete={onDelete}
      emptyMessage="Aucun utilisateur enregistré."
    />
  );
}
