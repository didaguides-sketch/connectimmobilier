"use server";

import { redirect } from "next/navigation";
import { createValuationRequest } from "@/lib/data/valuations";
import { aiEstimatePrice } from "@/lib/ai/client";
import type { PropertyType } from "@prisma/client";

export async function submitValuationAction(locale: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const propertyType = String(formData.get("propertyType") || "APPARTEMENT") as PropertyType;
  const wilaya = String(formData.get("wilaya") || "").trim();
  const surface = Number(formData.get("surface") || 0);
  const rooms = Number(formData.get("rooms") || 0);
  const notes = String(formData.get("notes") || "").trim();

  if (!name || !phone) {
    redirect(`/${locale}/estimation?error=${encodeURIComponent("Merci de renseigner votre nom et votre téléphone.")}`);
  }

  const aiEstimate = await aiEstimatePrice({ propertyType, wilaya, surface, rooms });

  await createValuationRequest({
    name, phone, email, propertyType, surface: surface || undefined, rooms: rooms || undefined,
    notes: wilaya ? `Wilaya : ${wilaya}. ${notes}` : notes,
    aiEstimate,
  });

  const params = new URLSearchParams({ success: "1" });
  if (aiEstimate) params.set("estimate", String(aiEstimate));
  redirect(`/${locale}/estimation?${params.toString()}`);
}
