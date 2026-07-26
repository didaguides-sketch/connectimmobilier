import { listProperties } from "@/lib/data/properties";
import { deletePropertyAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import PropertiesTable from "./PropertiesTable";

export default async function PropertiesAdminPage() {
  const properties = await listProperties();

  return (
    <div>
      <PageHeader
        title="Propriétés"
        description="Gérez l'ensemble des biens publiés sur le site."
        actionHref="/admin/properties/new"
        actionLabel="Nouvelle propriété"
      />
      {properties.length === 0 && <NoDatabaseBanner />}
      <PropertiesTable properties={properties} onDelete={deletePropertyAction} />
    </div>
  );
}
