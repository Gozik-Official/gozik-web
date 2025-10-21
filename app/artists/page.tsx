// app/artists/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic"; // pour éviter le cache en dev

type Artist = {
  id: string;
  stage_name: string;
  slug: string;
  country_code?: string;
  genres?: string[];
  short_bio?: string | null;
};

export default async function ArtistsPage() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? ""; // ex: http://localhost:3001 (optionnel)
  const res = await fetch(`${base}/api/artists`, { cache: "no-store" });

  if (!res.ok) {
    // si l'API tombe/404, on montre une 404 propre
    return notFound();
  }

  const artists: Artist[] = await res.json();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900/90 to-black text-white py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Artistes</h1>

      {artists.length === 0 ? (
        <p className="text-gray-400">Aucun artiste pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {artists.map((a) => (
            <li key={a.id} className="rounded-lg border border-white/10 p-4">
              <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-semibold">{a.stage_name}</h2>
                <Link className="underline text-sm" href={`/artists/${a.slug}`}>
                  Voir la page
                </Link>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {a.country_code ? `${a.country_code} • ` : ""}
                {a.genres?.join(" • ") ?? ""}
              </p>
              {a.short_bio && <p className="mt-2 text-gray-300">{a.short_bio}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
