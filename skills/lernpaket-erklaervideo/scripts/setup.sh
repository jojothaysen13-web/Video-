#!/usr/bin/env bash
# Richtet ein neues Lernpaket-Projekt ein.
# Nutzung: bash setup.sh <zielordner>
set -euo pipefail
SKILL_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DEST="${1:?Zielordner angeben}"
mkdir -p "$DEST"
cp -rn "$SKILL_DIR/assets/project/." "$DEST/"
cd "$DEST"
npm install --silent
python3 -c "import piper, numpy" 2>/dev/null || pip install -q piper-tts numpy
# Kostenlose deutsche Stimme (Piper "Thorsten", high). Hugging Face ist in manchen
# Umgebungen gesperrt, daher zuerst der GitHub-Spiegel (Git LFS), dann Hugging Face.
mkdir -p voices
V=voices/de_DE-thorsten-high.onnx
if [ ! -s "$V" ] || [ "$(stat -c%s "$V")" -lt 1000000 ]; then
  GH=https://media.githubusercontent.com/media/moonshine-ai/moonshine-g2p-training/252e7dbbaad9789de80d7c9464bf9ef4a269bb8c/data/de/piper-voices
  HF=https://huggingface.co/rhasspy/piper-voices/resolve/main/de/de_DE/thorsten/high
  for base in "$GH" "$HF"; do
    curl -fsSL -o "$V" "$base/de_DE-thorsten-high.onnx" && curl -fsSL -o "$V.json" "$base/de_DE-thorsten-high.onnx.json" && break || true
  done
fi
python3 -c "import json;json.load(open('$V.json'))" && echo "Stimme ok: $V" || echo "WARNUNG: Stimme konnte nicht geladen werden (siehe SKILL.md, Abschnitt Stimme)"
command -v ffmpeg >/dev/null || echo "WARNUNG: ffmpeg fehlt"
node -e "require('playwright')" 2>/dev/null || echo "WARNUNG: playwright fehlt (npm i playwright && npx playwright install chromium)"
echo "Projekt bereit in $DEST"
