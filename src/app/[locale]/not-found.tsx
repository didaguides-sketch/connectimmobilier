import Link from "next/link";
import { Home, Search, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 py-16 text-center">
      <div className="mb-6 font-heading text-7xl font-extrabold text-maroon-700">404</div>
      <h1 className="mb-2 font-heading text-xl font-extrabold text-slate-900">Cette page n'existe pas ou n'est plus disponible</h1>
      <p className="mb-8 max-w-md text-sm text-slate-500">
        Le bien ou la page que vous recherchez a peut-être été vendu, loué ou déplacé. Essayez de reprendre
        votre recherche depuis l'accueil.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/fr" className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-maroon-700 to-maroon-500 px-5 py-3 text-sm font-bold text-white">
          <Home size={16} /> Retour à l'accueil
        </Link>
        <Link href="/fr/proprietes" className="flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">
          <Search size={16} /> Voir les propriétés
        </Link>
        <a href="https://wa.me/213558207793" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white">
          <MessageCircle size={16} /> Nous contacter
        </a>
      </div>
    </div>
  );
}
