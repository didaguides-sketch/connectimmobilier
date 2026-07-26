"use client";

import DataTable, { Column } from "@/components/admin/DataTable";

type CategoryRow = { id: string; nameFr: string; slug: string; _count: { articles: number } };

export default function CategoriesTable({
  categories,
  onDelete,
}: {
  categories: CategoryRow[];
  onDelete: (id: string) => Promise<void>;
}) {
  const columns: Column<CategoryRow>[] = [
    { header: "Nom", render: (c) => <span className="font-semibold text-slate-900">{c.nameFr}</span> },
    { header: "Slug", render: (c) => <span className="font-mono text-xs">{c.slug}</span> },
    { header: "Articles", render: (c) => c._count.articles },
  ];

  return (
    <DataTable
      columns={columns}
      rows={categories}
      onDelete={onDelete}
      emptyMessage="Aucune catégorie pour le moment."
    />
  );
}
