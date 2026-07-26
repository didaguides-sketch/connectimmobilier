"use client";

import DataTable, { Column } from "@/components/admin/DataTable";
import type { Faq } from "@prisma/client";

export default function FaqTable({
  faqs,
  onDelete,
}: {
  faqs: Faq[];
  onDelete: (id: string) => Promise<void>;
}) {
  const columns: Column<Faq>[] = [
    { header: "Question", render: (f) => <span className="font-semibold text-slate-900">{f.questionFr}</span> },
    { header: "Catégorie", render: (f) => f.category },
    { header: "Ordre", render: (f) => f.order },
    {
      header: "Statut",
      render: (f) => (
        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${f.published ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
          {f.published ? "Publié" : "Masqué"}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={faqs}
      editHrefBase="/admin/faq"
      onDelete={onDelete}
      emptyMessage="Aucune question pour le moment."
    />
  );
}
