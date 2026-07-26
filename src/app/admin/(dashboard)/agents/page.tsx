import { listAgents } from "@/lib/data/agents";
import { deleteAgentAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import AgentsTable from "./AgentsTable";

export default async function AgentsAdminPage() {
  const agents = await listAgents();

  return (
    <div>
      <PageHeader title="Agents" description="Gérez l'équipe commerciale visible sur le site." actionHref="/admin/agents/new" actionLabel="Nouvel agent" />
      {agents.length === 0 && <NoDatabaseBanner />}
      <AgentsTable agents={agents} onDelete={deleteAgentAction} />
    </div>
  );
}
