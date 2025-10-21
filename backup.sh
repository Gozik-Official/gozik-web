#!/bin/bash
# === Script de sauvegarde automatique ===

# Message par défaut
MESSAGE=${1:-"Sauvegarde automatique du jour"}

echo "🧩 Sauvegarde en cours..."
git add .
git commit -m "$MESSAGE"
git push

echo "✅ Sauvegarde terminée et envoyée sur GitHub !"

