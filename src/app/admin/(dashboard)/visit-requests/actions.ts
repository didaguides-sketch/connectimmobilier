"use server";

import { revalidatePath } from "next/cache";
import { requireRole, PERMISSIONS } from "@/lib/rbac";
import { logActivity } from "@/lib/data/activityLog";
import { updateVisitRequestStatus, deleteVisitRequest } from "@/lib/data/visitRequests";
import type { MessageStatus } from "@prisma/client";

export async function updateVisitRequestStatusAction(id: string, status: MessageStatus) {
  const session = await requireRole(PERMISSIONS.leads);
  await updateVisitRequestStatus(id, status);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "update-status", entityType: "VisitRequest", entityId: id, metadata: { status } });
  revalidatePath("/admin/visit-requests");
}

export async function deleteVisitRequestAction(id: string) {
  const session = await requireRole(PERMISSIONS.leads);
  await deleteVisitRequest(id);
  await logActivity({ userId: session.user.id, userName: session.user.name ?? "—", action: "delete", entityType: "VisitRequest", entityId: id });
  revalidatePath("/admin/visit-requests");
}
