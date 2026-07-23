"use server";

import { redirect } from "next/navigation";
import { createLead } from "@/lib/data/leads";

export async function submitContactAction(locale: string, formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !phone || !message) {
    redirect(`/${locale}/contact?error=${encodeURIComponent("Merci de renseigner votre nom, votre téléphone et votre message.")}`);
  }

  await createLead({ name, phone, email, message, source: "contact" });
  redirect(`/${locale}/contact?success=1`);
}
