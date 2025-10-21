import { notFound } from "next/navigation";

type Params = { slug: string };

export default async function ArtistPage({ params }: { params: Params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/artists/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const a = await res.json() as {
    stage_name: string;
    slug: string;
    country_code?: string;
    genres?: string[] | string;
    short_bio?: string;
  };

  const genres =
    Array.isArray(a.genres) ? a.genres.join(" • ") :
    typeof a.genres === "string" ? a.genres.replace(/[\[\]"]/g, "").split(",").map(s => s.trim()).join(" • ") :
    "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-10 px-6">
      <h1 className="text-3xl font-bold">{a.stage_name}</h1>
      <p className="mt-2 text-sm opacity-70">Slug: {a.slug}</p>
      {a.country_code && <p className="mt-2">Pays: {a.country_code}</p>}
      {genres && <p className="mt-2">Genres: {genres}</p>}
      {a.short_bio && <p className="mt-4">{a.short_bio}</p>}
    </main>
  );
}
