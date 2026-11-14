# Lernzettel-Bausteine (`lernzettel/lernzettel.html`)

Die Vorlage ist ein vollständiges Beispiel. Ersetze die Inhalte und behalte die Klassen bei. `{{icon-name}}` wird beim Bauen durch das Lucide-SVG ersetzt.

## Seite

```html
<section class="page" style="--glow:var(--markt);--glow2:var(--n)">   <!-- zwei Hintergrund-Glows -->
  <div class="top"><div class="brand"><i></i>Titel · Lernzettel</div><div class="mono">KLASSE · KLAUSUR DATUM</div></div>
  … Abschnitte …
  <div class="foot"><span>Lernzettel · Thema</span><span class="mono">1 / 4</span></div>
</section>
```
Farbvariablen stehen in `:root` (`--markt --n --a --gg --formen --staat --funk --quiz`). Benenne sie fürs neue Thema um bzw. weise sie neu zu, passend zu den Kapitelfarben im Video.

## Abschnitt

```html
<div class="sec" style="--c:var(--n)">
  <div class="sh"><div class="ic">{{users}}</div><span class="num">02</span><h2>Die Nachfrage</h2></div>
  …
</div>
```

## Bausteine

- `.merk`: Merksatz-Box in Kapitelfarbe: `<div class="merk"><b>Gesetz der Nachfrage</b><span>…</span></div>`
- `.trap`: rot gestrichelte Klausurfalle: `<div class="trap"><b>⚠ Klausurfalle:</b> …</div>`
- `.card` mit `h3`, `p`, `.ex` (Beispiel-Pill), `.acc` (Text in Kapitelfarbe)
- Raster: `.grid.g2/.g3/.g4/.g5/.g6` oder `style="grid-template-columns: 54mm 1fr"` (Diagramm links, Text rechts)
- `table` mit `th`/`td`; `.up` (grün ↑), `.down` (rot ↓)
- `.mx`: Matrix/Schema, Zellen mit `.h` (Kopf) und `.hi` (hervorgehoben)
- Inline-SVG-Diagramme: `<svg class="chart" viewBox="0 0 220 150" width="100%">` mit Linien in den Kurvenfarben aus dem Video. Koordinaten rechnest du selbst um (Datenwert → SVG-Pixel) und prüfst dabei Schnittpunkte nach.
- Seite 4: `.quiz` (nummerierte Fragen mit Optionen in `<span>`), `.check` (Checkliste mit Kästchen), `.sol` (zweispaltige Lösungen, `<b>` = Nummer)

## Platz

Eine A4-Seite fasst etwa 2 Themenabschnitte. Prüf nach `node build.js` jede Seite gerastert (`pdftoppm -r 60 -png <pdf> /tmp/lz`). Läuft etwas über, kürze den Text oder verschiebe einen Abschnitt auf die nächste Seite. Die Seitenzahl darf dafür auf 5 steigen.
