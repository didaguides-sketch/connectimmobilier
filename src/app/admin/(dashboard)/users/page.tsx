import { listUsers } from "@/lib/data/users";
import { deleteUserAction } from "./actions";
import PageHeader from "@/components/admin/PageHeader";
import NoDatabaseBanner from "@/components/admin/NoDatabaseBanner";
import UsersTable from "./UsersTable";

export default async function UsersAdminPage() {
  const users = await listUsers();

  return (
    <div>
      <PageHeader title="Utilisateurs & rôles" description="Gérez les comptes ayant accès à l'espace d'administration." actionHref="/admin/users/new" actionLabel="Nouvel utilisateur" />
      {users.length === 0 && <NoDatabaseBanner />}
      <UsersTable users={users} onDelete={deleteUserAction} />
    </div>
  );
}
