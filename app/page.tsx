export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Go-Zik — Accueil</h1>
        <p className="mt-3 opacity-80">
          Tailwind fonctionne 🎉 (fond sombre + texte clair).
        </p>
        <div className="mt-8">
          <a
            href="/artists"
            className="inline-block rounded-lg border border-white/20 bg-white/5 px-4 py-2 hover:bg-white/10"
          >
            Voir la liste des artistes →
          </a>
        </div>
      </div>
    </main>
  );
}
