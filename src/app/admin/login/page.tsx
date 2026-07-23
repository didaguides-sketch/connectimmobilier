"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, LogIn } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);

    if (res?.error) {
      setError("Email ou mot de passe incorrect, ou base de données non connectée.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-5">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-2.5">
          <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
            <path d="M8 100V38L38 18V100H8Z" fill="#7A2331" />
            <path d="M62 100V8L92 28V100H62Z" fill="#454C56" />
            <path d="M38 100V58L50 48L62 58V100H38Z" fill="#fff" stroke="#E4E6E9" strokeWidth="2" />
          </svg>
          <div>
            <b className="block font-heading text-lg font-extrabold text-slate-900">Connect</b>
            <span className="text-[10px] uppercase tracking-wider text-slate-500">Espace d'administration</span>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Email</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5">
              <Mail size={16} className="text-slate-400" />
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full text-sm outline-none" placeholder="admin@connectimmobilier.com"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">Mot de passe</label>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5">
              <Lock size={16} className="text-slate-400" />
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm outline-none" placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 py-3 text-sm font-bold text-white disabled:opacity-60"
          >
            <LogIn size={16} /> {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          Accès réservé à l'équipe Connect Immobilier.
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
