"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import { listArticles } from "@/lib/data/blog";

type Article = Awaited<ReturnType<typeof listArticles>>[number];

export default function BlogTable({
  articles,
  onDelete,
}: {
  articles: Article[];
  onDelete: (id: string) => Promise<void>;
}) {
  const columns: Column<Article>[] = [
    { header: "Titre", render: (a) => <span className="font-semibold text-slate-900">{a.titleFr}</span> },
    { header: "Catégorie", render: (a) => a.category?.nameFr ?? "—" },
    {
      header: "Statut",
      render: (a) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${a.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {a.published ? "Publié" : "Brouillon"}
        </span>
      ),
    },
    { header: "Créé le", render: (a) => new Date(a.createdAt).toLocaleDateString("fr-FR") },
  ];

  return (
    <DataTable
      columns={columns}
      rows={articles}
      editHrefBase="/admin/blog"
      onDelete={onDelete}
      emptyMessage="Aucun article pour le moment."
    />
  );
}
