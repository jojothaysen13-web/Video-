# Format von `video/script.js`

`script.js` exportiert `scenes`, `CHAPTERS`, `C` (Farben) und `META`. Ein vollständiges Beispiel liegt in `assets/project/video/script.js`.

```js
const META = { title: 'Markt & Preisbildung' };            // oben links im Video
const CHAPTERS = ['Intro', 'Markt', 'Nachfrage', ...];     // Index = chapter-Nummer der Szenen; 0 = Intro
```

## Gemeinsame Felder jeder Szene

| Feld | Bedeutung |
|---|---|
| `id` | eindeutig, keine Leerzeichen (wird für TTS-Dateinamen genutzt) |
| `chapter` | Index in `CHAPTERS` (steuert HUD und Fortschrittsbalken) |
| `type` | `big`, `chapter`, `list`, `chart`, `matrix` oder `quiz` |
| `accent` | Hex-Farbe, Hintergrund-Glow und Akzente (eine Farbe pro Kapitel) |
| `lines` | Liste von Zeilen: `{ say: 'Gesprochener Satz', v: { …visuell… } }` oder `{ pause: Sekunden, v: {…} }` |

Jede Zeile beginnt, wenn ihr Satz beginnt. Ihre visuellen Aktionen (`v`) starten genau dann. Die Untertitel entstehen automatisch aus `say`.

Beliebige Zeilen können `sticker: 'kurzer Text'` enthalten (gedrehtes Label in Akzentfarbe, etwa 0,4 s nach Satzbeginn). Das passt für Humor, Warnungen und „merken!“.

## `chapter`: Kapitelkarte

```js
{ id: 'c2', chapter: 2, type: 'chapter', accent: C.nachfrage, num: '02', title: 'Die Nachfrage', icon: 'users', lines: [{ pause: 1.6 }] }
```
Große Outline-Nummer, Icon und Titel, mit Whoosh-Sound. Ohne Sprache.

## `big`: Vollbild-Schnitte (eine neue Komposition pro Zeile)

Mögliche Felder in `v` (kombinierbar):
- `kicker`: kleines Label-Pill
- `big`: Riesentext (2–3 Wörter!)
- `sub`: Untertitelzeile
- `icon`: Lucide-Name, große Kachel
- `chips: ['A','B',…]`: Pills, gestaffelt eingeblendet (z. B. Themenliste)
- `equation: ['Angebot','+','Nachfrage','=','Markt']`: `+` und `=` werden Akzent, das letzte Wort wird hervorgehoben
- `icons: [['store','Wochenmarkt'], …]`: 3–4 Kacheln mit Icon und Label
- `versus: [[icon, Titel, Zeile], [icon, Titel, Zeile]]`: zwei Karten mit „VS“

## `list`: Karten-Raster mit schrittweisem Aufdecken

```js
{ id: 'nbest', chapter: 2, type: 'list', accent: C.nachfrage, title: 'Bestimmungsgrößen der Nachfrage', kicker: 'Was die Nachfrage beeinflusst', cols: 3,
  groups: [['Gütermärkte', 0, 2], ['Faktormärkte', 2, 5]],   // optional: Gruppenüberschriften über Spalten [von, bis)
  items: [ { id: 'pr', icon: 'tag', title: 'Preis des Gutes', text: 'Preis ↓ → Nachfrage ↑', ex: 'E-Bikes billiger', tag: 'optional mono', res: [['Preis','↓'],['Menge','↑']] }, … ],
  lines: [
    { say: 'Intro-Satz …', v: {} },
    { say: 'Eins: …', v: { reveal: ['pr'], focus: 'pr' } },       // aufdecken + hervorheben, andere abdunkeln
    { say: 'Zusammenfassung …', v: { focus: ['a','b'] } },        // mehrere hervorheben; focus: [] = alle normal
    { say: '…', v: { showTags: true } },                          // tags erst jetzt einblenden
  ] }
```
- `cols` 3 mit 3 oder 6 Items (2 Reihen), `cols` 4 oder 5 mit 1 Reihe (hohe Karten). Mehr als 6 Items passen nicht gut, dann teilst du sie auf zwei Szenen auf.
- `text` kurz halten (≤ 45 Zeichen bei 2 Reihen), `ex` wird als „z. B. …“ angezeigt, `res` zeigt Ergebnis-Kästchen (z. B. Preis ↑).

## `chart`: Koordinatensystem + Notizspalte rechts

```js
{ id: 'gg', type: 'chart', chapter: 4, accent: C.gg, title: 'Kartoffeln · Wochenmarkt Kiel',
  axes: { xMax: 600, yMin: 0, yMax: 3.5, xTicks: [0,100,…], yTicks: [1,1.5,…], yFmt: 'eur2', xUnit: 'kg', yUnit: '€ je kg' },
  preset: [ …ops, sofort beim Szenenstart sichtbar… ],
  lines: [ { say: '…', v: { ops: [ … ], note: { … } } } ] }
```
`yFmt`: `'eur0'` (1.200 €), `'eur2'` (2,50 €). Für andere Einheiten erweiterst du `fmtY` in `engine.js`.

**ops** (alle mit optionalem `delay` in Sekunden). Koordinaten sind Datenwerte `[menge, preis]` bzw. `q`/`p`:
- `{op:'curve', id, from:[q,p], to:[q,p], color, label, ghost?}`: gerade Linie, wird gezeichnet; `ghost` = gestrichelt und blass
- `{op:'point', id, q, p, label, color, big?}`: Punkt mit Hilfslinien zu den Achsen und Label
- `{op:'gap', id, p, q1, q2, label, color}`: waagerechter Balken (Überhang, Differenz)
- `{op:'arrow', id, q, p1, p2, color}`: senkrechter Pfeil (Preis bewegt sich)
- `{op:'hline', id, p, label, color}`: gestrichelte waagerechte Linie (Höchst-/Mindestpreis, Schwelle)
- `{op:'shift', id, to:[[q,p],[q,p]], label}`: verschiebt eine vorhandene Kurve (alte bleibt als Geist, Pfeil zeigt die Richtung)
- `{op:'hide', ids:[…]}`: blendet Objekte aus
- `{op:'pulse', id}`: lässt eine Kurve oder einen Punkt pulsieren

**note** (ersetzt die vorige Notiz):
- `{icon, big, sub}`: Icon + großes Stichwort
- `{kicker, big, sub}`
- `{kicker, rows: [['Preis ↑','Nachfrage ↓'], …]}`: Regel-/Werte-Tabelle

## `matrix`: Schema/Raster mit Hervorhebung

```js
{ id: 'matrix', type: 'matrix', chapter: 5, accent: C.formen, kicker: 'Marktformen-Schema', title: '9 Marktformen',
  corner: ['Anbieter →', 'Nachfrager ↓'], colLabels: ['viele','wenige','einer'], rowLabels: ['viele','wenige','einer'],
  cells: [[…],[…],[…]],          // HTML erlaubt, &shy; für Trennstellen
  lines: [ { say:'…', v:{ fill: true } }, { say:'…', v:{ hl: [[zeile, spalte]] } } ] }
```
Bis etwa 4×4 Zellen.

## `quiz`

```js
{ id: 'quiz', type: 'quiz', chapter: 8, accent: C.quiz,
  questions: [ { q: 'Frage?', o: ['A-Text','B-Text','C-Text'], a: 1 }, … ],
  lines: [
    { say: 'Quick Check! …', v: { intro: true } },
    { say: 'Frage eins: …', v: { ask: 0 } },
    { pause: 3, v: { count: 0 } },               // 3-2-1-Countdown mit Ticks
    { say: 'B! Weil …', v: { answer: 0 } },      // richtige Option leuchtet, Ding-Sound
    … ] }
```

## Icons

Lucide-Namen: https://lucide.dev/icons. Lokal prüfst du sie mit `ls node_modules/lucide-static/icons | grep <wort>`. Häufig gebrauchte: `store, users, package, scale, landmark, badge-euro, brain, tag, wallet, heart, puzzle, repeat, target, receipt, swords, factory, building-2, briefcase, trending-up, trending-down, chart-candlestick, headset, handshake, calendar-clock, timer, zap, trophy, send, sparkles, magnet, eye, filter, route, radio-tower, door-open, copy, sun, snowflake, wheat, house`.
