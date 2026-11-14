---
name: lernpaket-erklaervideo
description: Erstellt aus Unterrichtsmaterial (PDFs, Arbeitsblätter, Folien, Fotos von Themenlisten) ein komplettes Lernpaket zur Klausurvorbereitung, bestehend aus einem animierten Erklärvideo (MP4, 1080p, deutsche Gratis-Stimme, Untertitel, Quiz) im modernen Dark-Design und einem passenden Lernzettel als PDF mit Merksätzen, Klausurfallen und Selbsttest. Nutze diesen Skill immer, wenn jemand ein Erklärvideo, Lernvideo, Lehrvideo, Klausurvorbereitung, einen Lernzettel, Spickzettel, eine Zusammenfassung zum Lernen oder Lernmaterial für eine Klasse/Ausbildung/Schule/Uni zu einem Thema haben möchte, auch wenn nur eins von beidem verlangt wird oder das Wort „Video“ nicht fällt (z. B. „erklär der Klasse das Thema X für die Prüfung“).
---

# Lernpaket: Erklärvideo + Lernzettel

Aus Unterrichtsmaterial entstehen zwei Dinge, die zusammenpassen:

1. **Erklärvideo** (≤ 10 min, 16:9, 1920×1080): dunkles, minimalistisches Design im Stil von ChatGPT- und Grok-Werbung, 2D-Animationen, Lucide-Piktogramme, schnelle Schnitte, leichter Gen-Z-Humor, deutsche Gratis-Stimme (Piper „Thorsten“), eingebrannte Untertitel, Lo-Fi-Beat, Quiz am Ende.
2. **Lernzettel** (4 Seiten A4, PDF): gleiches Design, Merksätze, Diagramme, Tabellen, Klausurfallen, Selbsttest mit Lösungen und Checkliste.

Die Technik steckt fertig in `assets/project/`. Für ein neues Thema schreibst du im Kern **zwei Inhaltsdateien** neu: `video/script.js` (Skript + Szenen) und `lernzettel/lernzettel.html` (Lernzettel-Inhalt). Engine, Audio-Mix, Rendering und PDF-Druck bleiben unverändert.

## Ablauf

### 1. Material und Rahmen klären

- Lies alle PDFs bzw. Folien vollständig (`pdftotext -layout`). Achte auf Definitionen, Merksätze, Beispiele mit Zahlen und Prüfungsaufgaben: Aus den Aufgaben erkennst du, was abgefragt wird und wo die Fallen liegen.
- **Themenumfang:** Gibt es eine Liste „Das kommt dran“ (Foto, Folie), dann behandelst du **genau diese Themen**, nicht mehr und nicht weniger. Steht ein Thema auf der Liste, aber nicht im Material, ergänzt du es aus Standard-Lehrbuchwissen und **sagst das der Person ausdrücklich**, damit sie es mit ihren Unterlagen abgleicht.
- Übernimm Zahlenbeispiele aus dem Material (die Klasse kennt sie) und rechne jedes nach, besonders Schnittpunkte und Prozentwerte.
- Frag nur, was nicht klar ist: Länge (Standard ≤ 10 min), Format (Standard 16:9), Stimme (Standard Thorsten). Wenn die Person „warte auf mein Go“ sagt, bereite vor, rendere aber erst nach dem Go.

### 2. Projekt einrichten

```bash
bash <skill-dir>/scripts/setup.sh <projektordner>
```

Das Skript kopiert die Vorlage, installiert `gsap`, `geist` und `lucide-static`, installiert `piper-tts` und `numpy` und lädt die Stimme nach `voices/`. Voraussetzungen: `node`, `python3`, `ffmpeg` und `playwright` mit Chromium.

### 3. Videoskript schreiben (`video/script.js`)

Die Vorlage enthält ein vollständiges Beispiel (Thema Markt und Preisbildung, 9 min). Ersetze den Inhalt und behalte die Struktur bei. Die Szenentypen und alle Felder stehen in **`references/script-format.md`**. Lies die Datei, bevor du schreibst.

So wird das Video verständlich, auch für Leute, die nicht im Unterricht waren:

- **Aufbau:** Hook (3–4 kurze Sätze: Klausurdatum, „in X Minuten hast du alles drauf“, Themenliste als Chips), dann ein Kapitel pro Thema (jeweils mit `chapter`-Karte), am Ende ein Quiz mit 4–5 Fragen und ein Outro.
- **Ein Satz = eine Zeile = ein visueller Moment.** Die Zeitsteuerung hängt an den Zeilen. Wenn ein Satz zwei Dinge einblendet, teil ihn in zwei Zeilen.
- **Fachbegriff, Erklärung, Beispiel:** in dieser Reihenfolge. Jedes Kapitel endet mit einem „Merke:“-Satz.
- **Klausurfallen** benennst du ausdrücklich, als Satz plus `sticker: 'Klausurfalle ⚠'`.
- **Humor dosieren:** etwa ein Sticker pro Szene, kurze Einwürfe („Plot Twist“, „Screenshot machen!“). Der Humor darf nie die Fachaussage verwässern.
- **Wechsle die Szenentypen ab:** `big` bringt schnelle Vollbild-Schnitte, `list` Karten-Raster, `chart` Diagramme, `matrix` Tabellen/Schemata, `quiz` das Quiz. Diagramme lohnen sich überall, wo es Kurven, Achsen oder Schwellenwerte gibt.
- **Länge:** Der Sprecher schafft rund 140 Wörter pro Minute. 10 Minuten entsprechen also etwa 1.300 Wörtern Erzähltext. `build_audio.py` gibt die echte Länge aus. Kürze, wenn sie über dem Ziel liegt.
- **Schreib für die Stimme:** Beträge in Worten („eins fünfzig“, „zwei Euro fünfundzwanzig“), Abkürzungen ausschreiben. Englische Wörter spricht die deutsche Stimme schlecht aus, deshalb ergänzt du sie in der Liste `PRON` in `build_audio.py` (z. B. `('Callcenter', 'Kollsenter')`). Die Bildschirmtexte (`v`) dürfen normale Schreibweise und Zahlen nutzen.
- Lege `META.title` (oben links im Video) und `CHAPTERS` fest. Pro Kapitel gibt es eine Akzentfarbe in `C`.

### 4. Ton erzeugen, Vorschau prüfen, rendern

```bash
cd <projekt>/video
python3 -I build_audio.py      # TTS pro Satz (gecacht) + Timeline + Mix → build/audio.wav, gibt die Länge aus
node prep.js                   # Timeline + Icons → build/data.js
node render.js --stills 5,30,60,120   # Standbilder (Sekunden) → build/stills/
```

**Prüf immer zuerst die Standbilder**, bevor du das ganze Video renderst. Leg sie als Kontaktbogen zusammen (`ffmpeg … tile=5x6`) und sieh sie dir an. Typische Fehler sind überlappende Titel und Raster, Text, der über Karten hinausläuft, und Diagramme, in denen Linien fehlen. Rendere mindestens ein Standbild pro Szene mit Diagramm. Falsche Icon-Namen fallen ohne Fehlermeldung aus, deshalb gleichst du sie mit `node_modules/lucide-static/icons/<name>.svg` ab.

Dann rendern (4 Worker mit je eigenem Chromium; rund 40 min für 9 min Video auf 4 Kernen):

```bash
node render.js --workers 4 --out <Thema>_Erklaervideo.mp4    # → build/<name>.mp4 (inkl. Ton)
```

Starte das als Hintergrundprozess und warte auf die Fertig-Meldung (`fertig:` im Log), statt ständig nachzusehen. Danach prüfst du mit `ffprobe` Länge und Ton und ziehst ein paar Frames aus dem fertigen MP4. Das Video ist für Git meist zu groß (über 100 MB), deshalb gibst du es direkt als Datei aus.

### 5. Lernzettel (`lernzettel/lernzettel.html`)

Die Vorlage ist ein vollständiger 4-Seiten-Zettel zum Beispielthema. Ersetze den Inhalt und behalte die CSS-Bausteine bei. Die Bausteine sind in **`references/lernzettel.md`** beschrieben.

- **Seiten 1–3:** Ein Abschnitt pro Thema (`.sec` mit Nummer, Icon und Kapitelfarbe wie im Video). Jeder Abschnitt hat einen Merksatz, Karten bzw. Tabellen mit allen Begriffen und Beispielen, ein Inline-SVG-Diagramm, wo es passt, und eine Klausurfalle.
- **Seite 4:** Selbsttest mit 12–17 Fragen im Stil der Prüfungsaufgaben aus dem Material, eine Checkliste „Kann ich das?“ und die Lösungen.
- Bauen mit `node build.js` (setzt `{{icon-name}}` ein und druckt als A4-PDF). Danach rasterst du das PDF (`pdftoppm -r 60`) und prüfst jede Seite: **Nichts darf über den Seitenrand oder in die Fußzeile laufen.** Ist eine Seite zu voll, kürze Text oder verschiebe einen Abschnitt, statt die Schrift unter etwa 8 pt zu verkleinern.
- Das dunkle Design ist für Bildschirm und Tablet gedacht. Wer drucken will, bekommt auf Wunsch eine helle Variante: `--bg` weiß, Text dunkel, Glows weglassen.

### 6. Übergabe

Gib MP4 und PDF als Dateien aus. Sag kurz, was drin ist, welche Inhalte nicht aus dem Material stammen und welche Stimme verwendet wurde. Biete Änderungen an (Texte, Tempo, Beispiele) und nenne dazu die Renderzeit.

## Stimme

Standard ist **Piper `de_DE-thorsten-high`**: kostenlos, lokal, ohne Netzwerk zur Laufzeit. Microsoft Edge TTS (`edge-tts`, z. B. `de-DE-ConradNeural`) klingt natürlicher, braucht aber `speech.platform.bing.com`. Dieser Host ist in Cloud-Sandboxes oft gesperrt (Proxy-403 oder „No server date in headers“). Lässt sich der Host freigeben, kannst du `synth_all()` in `build_audio.py` auf edge-tts umstellen. Die restliche Pipeline arbeitet mit beliebigen WAV- oder MP3-Dateien pro Satz.

## Bekannte Stolperfallen (schon in der Vorlage gelöst)

- **GSAP `fromTo`:** Jede Eigenschaft im `from` braucht auch einen Zielwert im `to`. Sonst animiert GSAP sie zurück auf den CSS-Wert, und Linien verschwinden nach dem Zeichnen. Beachte das bei eigenen Erweiterungen.
- **Ein Browser pro Render-Worker:** Mehrere Seiten in einem Chromium teilen sich einen Renderer-Prozess und rendern dann nacheinander statt parallel.
- **Audio:** Gleitende Mittelwerte per `cumsum` (`movavg`) berechnen, nicht mit `np.convolve` und großen Fenstern (das dauert Minuten statt Sekunden).
- **Deterministisch rendern:** Alles läuft über `window.seek(t)` und die Timeline. Nutze keine CSS-Animationen und kein `Math.random()` in der Seite.
