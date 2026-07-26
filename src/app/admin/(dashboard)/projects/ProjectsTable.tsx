"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import type { Project } from "@prisma/client";

export default function ProjectsTable({
  projects,
  onDelete,
}: {
  projects: Project[];
  onDelete: (id: string) => Promise<void>;
}) {
  const columns: Column<Project>[] = [
    { header: "Nom", render: (p) => <span className="font-semibold text-slate-900">{p.nameFr}</span> },
    { header: "Slug", render: (p) => <span className="font-mono text-xs">{p.slug}</span> },
    { header: "Créé le", render: (p) => new Date(p.createdAt).toLocaleDateString("fr-FR") },
  ];

  return (
    <DataTable
      columns={columns}
      rows={projects}
      editHrefBase="/admin/projects"
      onDelete={onDelete}
      emptyMessage="Aucun programme enregistré."
    />
  );
}
