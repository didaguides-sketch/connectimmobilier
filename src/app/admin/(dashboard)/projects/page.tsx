import { listProjects } from "@/lib/data/projects";
import { deleteProjectAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import ProjectsTable from "./ProjectsTable";

export default async function ProjectsAdminPage() {
  const projects = await listProjects();

  return (
    <div>
      <PageHeader
        title="Nouveaux projets"
        description="Gérez les programmes immobiliers neufs."
        actionHref="/admin/projects/new"
        actionLabel="Nouveau programme"
      />
      {projects.length === 0 && <NoDatabaseBanner />}
      <ProjectsTable projects={projects} onDelete={deleteProjectAction} />
    </div>
  );
}
