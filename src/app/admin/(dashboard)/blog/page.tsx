import { listArticles } from "@/lib/data/blog";
import { deleteArticleAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import BlogTable from "./BlogTable";

export default async function BlogAdminPage() {
  const articles = await listArticles();

  return (
    <div>
      <PageHeader title="Blog" description="Rédigez et publiez les articles du blog Connect." actionHref="/admin/blog/new" actionLabel="Nouvel article" />
      {articles.length === 0 && <NoDatabaseBanner />}
      <BlogTable articles={articles} onDelete={deleteArticleAction} />
    </div>
  );
}
