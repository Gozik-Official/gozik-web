#!/bin/bash
set -e

# ==============================
#  Sauvegarde code + base Postgres
# ==============================

# Message de commit (personnalisable : ./backup.sh "Mon message")
MESSAGE=${1:-"Sauvegarde automatique du jour"}

# Charge les variables d'environnement (DATABASE_URL)
if [ -f .env ]; then
  # exporte les KEY=VALUE du .env dans l'environnement du script
  export $(grep -v '^#' .env | xargs) || true
fi

echo "🧩 Sauvegarde en cours…"

# --- 1) Sauvegarde de la base Postgres (si DATABASE_URL dispo) ---
if [ -n "$DATABASE_URL" ]; then
  # Dossier + nom de fichier horodaté
  TS=$(date +"%Y-%m-%d_%H-%M-%S")
  BKP_DIR="db_backups"
  mkdir -p "$BKP_DIR"

  # Fichier .dump au format custom (recommandé)
  OUT="$BKP_DIR/pg_$TS.dump"

  # Vérifie pg_dump
  if ! command -v pg_dump >/dev/null 2>&1; then
    echo "⚠️  pg_dump introuvable. Installe-le avec 'brew install libpq && brew link --force libpq'."
  else
    echo "💾 Dump Postgres → $OUT"
    # --dbname supporte une URI Postgres (ta DATABASE_URL)
    pg_dump --dbname="$DATABASE_URL" \
            --format=custom \
            --no-owner \
            --file="$OUT"
    echo "✅ Base sauvegardée."
  fi
else
  echo "ℹ️  Pas de DATABASE_URL dans .env → je saute la sauvegarde base."
fi

# --- 2) Sauvegarde du code (git) ---
echo "🗂️  Commit & push du code…"
git add .
git commit -m "$MESSAGE" || echo "ℹ️  Rien à committer."
git push || echo "⚠️  Push GitHub non effectué (réseau/identifiants ?)."

echo "✅ Sauvegarde terminée !"

