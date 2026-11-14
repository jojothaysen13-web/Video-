// Skript + Szenenplan für das Erklärvideo "Markt & Preisbildung"
// Jede Szene hat einen Typ (Layout) und eine Liste von Zeilen.
// Jede Zeile = ein gesprochener Satz (say) + visuelle Aktion für genau diesen Moment.
// {pause: s} = Stille (z. B. Countdown, Kapitelkarte).

const C = {
  markt: '#8B6CFF',
  nachfrage: '#3D8BFF',
  angebot: '#FF8A3D',
  gg: '#2EE6A6',
  formen: '#FF4D8D',
  staat: '#FFD23D',
  funktion: '#4DE1FF',
  quiz: '#C6FF3D',
};

const N_COLOR = C.nachfrage, A_COLOR = C.angebot;

// Laptop-Daten (Dialogfix GmbH)
const LAPTOP = { xMax: 450, yMin: 500, yMax: 1500, xTicks: [0, 100, 200, 300, 400], yTicks: [600, 800, 1000, 1200, 1400], yFmt: 'eur0', xUnit: 'Stück', yUnit: '€ je Laptop' };
// Kartoffeln (Kieler Wochenmarkt)
const KARTOFFEL = { xMax: 600, yMin: 0, yMax: 3.5, xTicks: [0, 100, 200, 300, 400, 500], yTicks: [1, 1.5, 2, 2.5, 3], yFmt: 'eur2', xUnit: 'kg', yUnit: '€ je kg' };

const scenes = [
  // ───────────────────────── HOOK
  {
    id: 'hook', chapter: 0, type: 'big', accent: C.quiz,
    lines: [
      { say: 'Dienstag ist Klausur. Und du warst nicht im Unterricht?', v: { kicker: 'Dienstag, 17.11.', big: 'Klausur.', icon: 'calendar-clock', sticker: 'uff' } },
      { say: 'Kein Stress. In zehn Minuten hast du alles drauf, was drankommt.', v: { kicker: 'Kein Stress', big: '10 Minuten.', sub: 'Alles, was drankommt.', icon: 'timer' } },
      { say: 'Markt, Angebot und Nachfrage, Gleichgewichtspreis, Marktformen, Staatseingriffe und die Funktionen des Preises.', v: { kicker: 'Das kommt dran', chips: ['Markt', 'Nachfrage', 'Angebot', 'Gleichgewichtspreis', 'Marktformen', 'Staatseingriffe', 'Funktionen des Preises'] } },
      { say: 'Handy weg. Fokus an. Los gehts.', v: { big: 'Fokus an.', icon: 'zap', sub: 'Los geht’s.' } },
    ],
  },

  // ───────────────────────── 01 MARKT
  { id: 'c1', chapter: 1, type: 'chapter', accent: C.markt, num: '01', title: 'Der Markt', icon: 'store', lines: [{ pause: 1.6 }] },
  {
    id: 'markt', chapter: 1, type: 'big', accent: C.markt,
    lines: [
      { say: 'Was ist ein Markt? Ganz einfach: Jeder Ort, an dem Angebot und Nachfrage zusammentreffen.', v: { kicker: 'Definition', equation: ['Angebot', '+', 'Nachfrage', '=', 'Markt'] } },
      { say: 'Das kann der Wochenmarkt sein, ein Onlineshop, die Börse, oder sogar ein Telefonat im Callcenter.', v: { kicker: 'Wo?', icons: [['store', 'Wochenmarkt'], ['shopping-cart', 'Onlineshop'], ['chart-candlestick', 'Börse'], ['headset', 'Telefonat']] } },
      { say: 'Der Markt hat zwei Aufgaben. Erstens: Vermittlung. Er bringt Anbieter und Nachfrager zusammen.', v: { kicker: 'Aufgabe 1', big: 'Vermittlung', icon: 'handshake', sub: 'Anbieter + Nachfrager zusammenbringen' } },
      { say: 'Zweitens: Preisbildung. Über den Preis werden die Güter bewertet.', v: { kicker: 'Aufgabe 2', big: 'Preisbildung', icon: 'tag', sub: 'Güter werden über den Preis bewertet' } },
      { say: 'Und beide Seiten wollen das Gegenteil: Der Anbieter will einen möglichst hohen Preis, der Nachfrager will möglichst wenig zahlen.', v: { kicker: 'Interessen', versus: [['trending-up', 'Anbieter', 'Preis hoch'], ['trending-down', 'Nachfrager', 'Preis niedrig']], sticker: 'toxic? nein. markt.' } },
    ],
  },
  {
    id: 'situationen', chapter: 1, type: 'list', accent: C.markt, title: 'Marktsituationen', kicker: 'Wer hat die Macht?', cols: 3,
    items: [
      { id: 'k', icon: 'shopping-bag', title: 'Käufermarkt', text: 'Angebot > Nachfrage', tag: 'Käufer im Vorteil', ex: 'PC, Auto' },
      { id: 'v', icon: 'crown', title: 'Verkäufermarkt', text: 'Nachfrage > Angebot', tag: 'Anbieter im Vorteil', ex: 'Benzin, Luxussportwagen' },
      { id: 's', icon: 'landmark', title: 'Starrer Markt', text: 'Staat regelt den Preis mit', tag: 'kein freier Ausgleich', ex: 'Buchpreisbindung' },
    ],
    lines: [
      { say: 'Wer sich durchsetzt, hängt davon ab, wie groß Angebot und Nachfrage im Verhältnis sind. Es gibt drei Marktsituationen.', v: {} },
      { say: 'Käufermarkt: Das Angebot ist größer als die Nachfrage. Die Käufer haben die Macht. Zum Beispiel bei PCs oder Autos.', v: { reveal: ['k'], focus: 'k' } },
      { say: 'Verkäufermarkt: Die Nachfrage ist größer als das Angebot. Jetzt haben die Anbieter die Macht. Zum Beispiel bei Benzin.', v: { reveal: ['v'], focus: 'v' } },
      { say: 'Starrer Markt: Der Staat regelt den Preis mit. Zum Beispiel die Buchpreisbindung. Dein Schulbuch kostet überall gleich viel.', v: { reveal: ['s'], focus: 's' } },
      { say: 'Heute sind die meisten Konsumgütermärkte Käufermärkte. Und genau deshalb ist Dialogmarketing so wichtig.', v: { focus: 'k', sticker: 'deshalb gibt’s deinen Job' } },
    ],
  },
  {
    id: 'marktarten', chapter: 1, type: 'list', accent: C.markt, title: 'Marktarten', kicker: 'Was wird gehandelt?', cols: 5, groups: [['Gütermärkte', 0, 2], ['Faktormärkte', 2, 5]],
    items: [
      { id: 'kon', icon: 'printer', title: 'Konsumgüter­markt', text: 'Private Haushalte kaufen', ex: 'Drucker für Herrn Kohl' },
      { id: 'pro', icon: 'factory', title: 'Produktions­gütermarkt', text: 'Unternehmen kaufen, um zu produzieren', ex: '100 Headsets' },
      { id: 'imm', icon: 'building-2', title: 'Immobilien­markt', text: 'Faktor Boden', ex: 'Grundstück' },
      { id: 'arb', icon: 'briefcase', title: 'Arbeits­markt', text: 'Faktor Arbeit', ex: 'Stellenanzeige' },
      { id: 'kap', icon: 'landmark', title: 'Kapital­markt', text: 'Faktor Kapital', ex: 'Kredit' },
    ],
    lines: [
      { say: 'Dann gibt es noch die Marktarten. Hier ist die Frage: Was wird gehandelt?', v: {} },
      { say: 'Auf Gütermärkten werden Güter gehandelt. Beim Konsumgütermarkt kaufen private Haushalte, zum Beispiel einen Drucker.', v: { reveal: ['kon'], focus: 'kon' } },
      { say: 'Beim Produktionsgütermarkt kaufen Unternehmen Güter, um damit selbst etwas herzustellen. Zum Beispiel hundert Headsets fürs Callcenter.', v: { reveal: ['pro'], focus: 'pro' } },
      { say: 'Auf Faktormärkten werden die Produktionsfaktoren gehandelt: Boden, Arbeit und Kapital.', v: { reveal: ['imm', 'arb', 'kap'], focus: ['imm', 'arb', 'kap'] } },
      { say: 'Also Immobilienmarkt, Arbeitsmarkt und Kapitalmarkt. Klausurfalle: Der Konsumgütermarkt ist kein Faktormarkt!', v: { focus: ['arb', 'kap', 'imm'], sticker: 'Klausurfalle ⚠' } },
    ],
  },

  // ───────────────────────── 02 NACHFRAGE
  { id: 'c2', chapter: 2, type: 'chapter', accent: C.nachfrage, num: '02', title: 'Die Nachfrage', icon: 'users', lines: [{ pause: 1.6 }] },
  {
    id: 'nkurve', chapter: 2, type: 'chart', accent: C.nachfrage, axes: LAPTOP, title: 'Laptop-Markt',
    lines: [
      { say: 'Nachfrager wollen mit ihrem knappen Geld möglichst viel Nutzen rausholen.', v: { note: { icon: 'wallet', big: 'Max. Nutzen', sub: 'mit knappem Geld' } } },
      { say: 'Darum gilt das Gesetz der Nachfrage: Steigt der Preis, sinkt die Nachfrage. Sinkt der Preis, steigt die Nachfrage.', v: { ops: [{ op: 'curve', id: 'N', from: [400, 600], to: [0, 1400], color: N_COLOR, label: 'N' }], note: { kicker: 'Gesetz der Nachfrage', rows: [['Preis ↑', 'Nachfrage ↓'], ['Preis ↓', 'Nachfrage ↑']] } } },
      { say: 'Beispiel Laptop: Bei sechshundert Euro wollen ihn vierhundert Leute haben. Bei vierzehnhundert Euro niemand mehr.', v: { ops: [{ op: 'point', id: 'p1', q: 400, p: 600, label: '600 € → 400 Stück', color: N_COLOR }, { op: 'point', id: 'p2', q: 0, p: 1400, label: '1.400 € → 0', color: N_COLOR, delay: 1.6 }] } },
      { say: 'Die Nachfragekurve fällt also von links oben nach rechts unten.', v: { ops: [{ op: 'hide', ids: ['p1', 'p2'] }, { op: 'pulse', id: 'N' }], note: { icon: 'trending-down', big: 'fällt', sub: 'links oben → rechts unten' } } },
    ],
  },
  {
    id: 'nbest', chapter: 2, type: 'list', accent: C.nachfrage, title: 'Bestimmungsgrößen der Nachfrage', kicker: 'Was die Nachfrage beeinflusst', cols: 3,
    items: [
      { id: 'pr', icon: 'tag', title: 'Preis des Gutes', text: 'Preis ↓ → Nachfrage ↑', ex: 'E-Bikes billiger' },
      { id: 'ko', icon: 'puzzle', title: 'Komplementärgüter', text: 'ergänzen sich → gleiche Richtung', ex: 'E-Bike + Akku' },
      { id: 'su', icon: 'repeat', title: 'Substitutionsgüter', text: 'austauschbar → entgegengesetzt', ex: 'Kaffee ↔ Tee' },
      { id: 'ei', icon: 'wallet', title: 'Verfügbares Einkommen', text: 'mehr Kaufkraft → mehr Nachfrage', ex: 'Tariflohn steigt' },
      { id: 'vo', icon: 'heart', title: 'Persönliche Vorlieben', text: 'Trend, Mode, Geschmack', ex: 'Hype auf TikTok' },
      { id: 'ex', icon: 'cloud-sun-rain', title: 'Externe Faktoren', text: 'Politik, Wetter, Jahreszeit', ex: 'kühler Sommer' },
    ],
    lines: [
      { say: 'Aber nicht nur der Preis entscheidet. Hier sind die sechs Bestimmungsgrößen der Nachfrage.', v: {} },
      { say: 'Eins: der Preis des Gutes selbst.', v: { reveal: ['pr'], focus: 'pr' } },
      { say: 'Zwei: Preise von Komplementärgütern. Die ergänzen sich, wie E-Bike und Akku. Ihre Nachfrage geht in die gleiche Richtung.', v: { reveal: ['ko'], focus: 'ko' } },
      { say: 'Drei: Preise von Substitutionsgütern. Die sind austauschbar, wie Kaffee und Tee. Hier geht die Nachfrage in die entgegengesetzte Richtung.', v: { reveal: ['su'], focus: 'su' } },
      { say: 'Vier: das verfügbare Einkommen. Mehr Geld, mehr Nachfrage.', v: { reveal: ['ei'], focus: 'ei' } },
      { say: 'Fünf: persönliche Vorlieben. Trends, Mode, Geschmack. Wenn TikTok sagt, das Teil ist angesagt, steigt die Nachfrage.', v: { reveal: ['vo'], focus: 'vo', sticker: 'it’s giving Nachfrage' } },
      { say: 'Und sechs: externe Faktoren. Politik, Wetter, Jahreszeit. Kühler Sommer? Keiner kauft Badehosen.', v: { reveal: ['ex'], focus: 'ex' } },
    ],
  },

  // ───────────────────────── 03 ANGEBOT
  { id: 'c3', chapter: 3, type: 'chapter', accent: C.angebot, num: '03', title: 'Das Angebot', icon: 'package', lines: [{ pause: 1.6 }] },
  {
    id: 'akurve', chapter: 3, type: 'chart', accent: C.angebot, axes: LAPTOP, title: 'Laptop-Markt',
    lines: [
      { say: 'Jetzt die andere Seite: die Anbieter. Die wollen vor allem eins: Gewinn.', v: { note: { icon: 'piggy-bank', big: 'Gewinn', sub: 'maximieren' } } },
      { say: 'Gesetz des Angebots: Steigt der Preis, wird mehr angeboten. Sinkt der Preis, wird weniger angeboten.', v: { ops: [{ op: 'curve', id: 'A', from: [0, 600], to: [400, 1400], color: A_COLOR, label: 'A' }], note: { kicker: 'Gesetz des Angebots', rows: [['Preis ↑', 'Angebot ↑'], ['Preis ↓', 'Angebot ↓']] } } },
      { say: 'Logisch: Je höher der Preis, desto mehr bleibt nach Abzug der Kosten übrig. Und dann lohnt es sich auch für neue Anbieter.', v: { ops: [{ op: 'point', id: 'p1', q: 100, p: 800, label: '800 € → 100 Stück', color: A_COLOR }, { op: 'point', id: 'p2', q: 300, p: 1200, label: '1.200 € → 300 Stück', color: A_COLOR, delay: 1.2 }], note: { icon: 'coins', big: 'Preis – Kosten', sub: '= mehr übrig' } } },
      { say: 'Die Angebotskurve steigt also von links unten nach rechts oben. Genau andersrum als die Nachfrage.', v: { ops: [{ op: 'hide', ids: ['p1', 'p2'] }, { op: 'curve', id: 'Ng', from: [400, 600], to: [0, 1400], color: N_COLOR, label: 'N', ghost: true }, { op: 'pulse', id: 'A' }], note: { icon: 'trending-up', big: 'steigt', sub: 'links unten → rechts oben' } } },
    ],
  },
  {
    id: 'twist', chapter: 3, type: 'big', accent: C.angebot,
    lines: [
      { say: 'Plot Twist: Auf dem Arbeitsmarkt bist du der Anbieter.', v: { kicker: 'Plot Twist', big: 'Du bist Anbieter.', icon: 'user-round', sticker: 'wait what' } },
      { say: 'Du bietest deine Arbeitskraft an, dein Betrieb fragt sie nach. Und der Preis dafür ist dein Lohn.', v: { kicker: 'Arbeitsmarkt', versus: [['user-round', 'Du', 'bietest Arbeit an'], ['building-2', 'Betrieb', 'fragt Arbeit nach']], sub: 'Preis = Lohn' } },
    ],
  },
  {
    id: 'abest', chapter: 3, type: 'list', accent: C.angebot, title: 'Bestimmungsgrößen des Angebots', kicker: 'Was das Angebot beeinflusst', cols: 5,
    items: [
      { id: 'mp', icon: 'badge-euro', title: 'Erzielbarer Marktpreis', text: 'höherer Preis → mehr Gewinnspanne' },
      { id: 'ko', icon: 'receipt', title: 'Kosten der Produktion', text: 'Personal, Energie, Material' },
      { id: 'wb', icon: 'swords', title: 'Wettbewerbs­situation', text: 'an Konkurrenz orientieren' },
      { id: 'uz', icon: 'target', title: 'Unternehmens­ziel', text: 'z. B. Marktanteil statt Gewinn' },
      { id: 'ex', icon: 'snowflake', title: 'Externe Faktoren', text: 'Politik, Natur, Jahreszeit' },
    ],
    lines: [
      { say: 'Und das Angebot hat fünf Bestimmungsgrößen.', v: {} },
      { say: 'Eins: der erzielbare Marktpreis. Höherer Preis, höhere Gewinnspanne.', v: { reveal: ['mp'], focus: 'mp' } },
      { say: 'Zwei: die Kosten der Produktion. Steigen Personal-, Energie- oder Materialkosten, wird es teurer, oder es wird weniger hergestellt.', v: { reveal: ['ko'], focus: 'ko' } },
      { say: 'Drei: die Wettbewerbssituation. Wer viele Konkurrenten hat, muss sich an deren Preisen orientieren.', v: { reveal: ['wb'], focus: 'wb' } },
      { say: 'Vier: das Unternehmensziel. Wer Marktanteile will, macht auch mal Kampfpreise mit wenig Gewinn.', v: { reveal: ['uz'], focus: 'uz' } },
      { say: 'Fünf: externe Faktoren. Ein milder Winter, und die Winterjacken landen im Sale.', v: { reveal: ['ex'], focus: 'ex', sticker: '-70% 🧥' } },
    ],
  },

  // ───────────────────────── 04 GLEICHGEWICHT
  { id: 'c4', chapter: 4, type: 'chapter', accent: C.gg, num: '04', title: 'Der Gleichgewichts­preis', icon: 'scale', lines: [{ pause: 1.6 }] },
  {
    id: 'gg', chapter: 4, type: 'chart', accent: C.gg, axes: KARTOFFEL, title: 'Kartoffeln · Wochenmarkt Kiel',
    lines: [
      { say: 'Jetzt kommt das Herzstück. Wir sind auf dem Wochenmarkt in Kiel, und es geht um Kartoffeln.', v: { note: { icon: 'shopping-basket', big: 'Kartoffeln', sub: 'Wochenmarkt Kiel' } } },
      { say: 'Hier ist die Nachfragekurve, und hier die Angebotskurve.', v: { ops: [{ op: 'curve', id: 'N', from: [500, 1], to: [100, 3], color: N_COLOR, label: 'N' }, { op: 'curve', id: 'A', from: [100, 1], to: [500, 3], color: A_COLOR, label: 'A', delay: 1.4 }], note: { kicker: 'Beide Seiten', rows: [['N', 'Nachfrage'], ['A', 'Angebot']] } } },
      { say: 'Da, wo sie sich schneiden, liegt der Gleichgewichtspreis. Hier: zwei Euro pro Kilo, bei dreihundert Kilo.', v: { ops: [{ op: 'point', id: 'gg', q: 300, p: 2, label: 'GG: 2,00 € · 300 kg', color: '#ffffff', big: true }], note: { kicker: 'Schnittpunkt', big: '2,00 €', sub: 'Gleichgewichtsmenge: 300 kg' } } },
      { say: 'Bei diesem Preis passt alles: Jeder Anbieter findet einen Käufer, und jeder Käufer einen Verkäufer.', v: { note: { icon: 'check-check', big: 'Alle happy', sub: 'größtmöglicher Absatz' } } },
      { say: 'Man sagt: Der Markt wird geräumt.', v: { note: { icon: 'sparkles', big: 'Markt geräumt', sub: 'Merksatz für die Klausur' } } },
      { say: 'Und wenn der Preis zu niedrig ist? Bei eins fünfzig wollen die Leute vierhundert Kilo, aber angeboten werden nur zweihundert.', v: { ops: [{ op: 'gap', id: 'g1', p: 1.5, q1: 200, q2: 400, label: '200 kg fehlen', color: N_COLOR }], note: { kicker: 'Preis: 1,50 €', rows: [['Nachfrage', '400 kg'], ['Angebot', '200 kg']] } } },
      { say: 'Das ist ein Nachfrageüberhang. Also ein Verkäufermarkt. Der Preis steigt Richtung Gleichgewicht.', v: { ops: [{ op: 'arrow', id: 'ar1', p1: 1.5, p2: 1.95, q: 300, color: N_COLOR }], note: { kicker: 'unter GG', big: 'Nachfrage­überhang', sub: 'Verkäufermarkt · Preis ↑' } } },
      { say: 'Umgekehrt bei zwei fünfzig: vierhundert Kilo Angebot, aber nur zweihundert Nachfrage. Angebotsüberhang, also Käufermarkt. Der Preis fällt.', v: { ops: [{ op: 'gap', id: 'g2', p: 2.5, q1: 200, q2: 400, label: '200 kg zu viel', color: A_COLOR }, { op: 'arrow', id: 'ar2', p1: 2.5, p2: 2.05, q: 300, color: A_COLOR, delay: 2.5 }], note: { kicker: 'über GG', big: 'Angebots­überhang', sub: 'Käufermarkt · Preis ↓' } } },
      { say: 'Merke: Der Markt zieht den Preis immer Richtung Gleichgewicht. Wie ein Magnet.', v: { ops: [{ op: 'pulse', id: 'gg' }], note: { icon: 'magnet', big: 'Wie ein Magnet', sub: 'Gesetz von Angebot und Nachfrage' } } },
    ],
  },
  {
    id: 'shift', chapter: 4, type: 'chart', accent: C.gg, axes: KARTOFFEL, title: 'Verschiebung der Kurven', preset: [
      { op: 'curve', id: 'N', from: [500, 1], to: [100, 3], color: N_COLOR, label: 'N', instant: true },
      { op: 'curve', id: 'A', from: [100, 1], to: [500, 3], color: A_COLOR, label: 'A1', instant: true },
      { op: 'point', id: 'gg', q: 300, p: 2, label: '2,00 € · 300 kg', color: '#ffffff', instant: true },
    ],
    lines: [
      { say: 'Aber Achtung: Ändert sich nur der Preis, bewegst du dich auf der Kurve. Ändert sich eine Bestimmungsgröße, verschiebt sich die ganze Kurve.', v: { note: { kicker: 'Wichtig', rows: [['nur Preis ändert sich', 'auf der Kurve'], ['Bestimmungsgröße ändert sich', 'Kurve verschiebt sich']] } } },
      { say: 'Beispiel: heißer Sommer, schlechte Ernte. Die Bauern bieten bei jedem Preis hundert Kilo weniger an. Die Angebotskurve wandert nach links.', v: { ops: [{ op: 'shift', id: 'A', to: [[0, 1], [400, 3]], label: 'A2' }, { op: 'hide', ids: ['gg'] }], note: { icon: 'sun', big: 'Schlechte Ernte', sub: 'Angebot → nach links' } } },
      { say: 'Neues Gleichgewicht: zwei Euro fünfundzwanzig, aber nur noch zweihundertfünfzig Kilo. Preis rauf, Menge runter.', v: { ops: [{ op: 'point', id: 'gg2', q: 250, p: 2.25, label: 'neu: 2,25 € · 250 kg', color: '#ffffff', big: true }], note: { kicker: 'Neues Gleichgewicht', rows: [['Preis', '↑ 2,25 €'], ['Menge', '↓ 250 kg']] } } },
    ],
  },
  {
    id: 'faelle', chapter: 4, type: 'list', accent: C.gg, title: 'Die 4 Fälle', kicker: 'Rechts = mehr · Links = weniger', cols: 4,
    items: [
      { id: 'a1', icon: 'arrow-right', title: 'Angebot steigt', text: 'A nach rechts', res: [['Preis', '↓'], ['Menge', '↑']] },
      { id: 'a2', icon: 'arrow-left', title: 'Angebot sinkt', text: 'A nach links', res: [['Preis', '↑'], ['Menge', '↓']] },
      { id: 'n1', icon: 'arrow-right', title: 'Nachfrage steigt', text: 'N nach rechts', res: [['Preis', '↑'], ['Menge', '↑']] },
      { id: 'n2', icon: 'arrow-left', title: 'Nachfrage sinkt', text: 'N nach links', res: [['Preis', '↓'], ['Menge', '↓']] },
    ],
    lines: [
      { say: 'Insgesamt gibt es vier Fälle. Merkhilfe: Nach rechts heißt mehr, nach links heißt weniger.', v: {} },
      { say: 'Angebot steigt: Der Preis sinkt, die Menge steigt.', v: { reveal: ['a1'], focus: 'a1' } },
      { say: 'Angebot sinkt: Der Preis steigt, die Menge sinkt.', v: { reveal: ['a2'], focus: 'a2' } },
      { say: 'Nachfrage steigt: Preis und Menge steigen.', v: { reveal: ['n1'], focus: 'n1' } },
      { say: 'Nachfrage sinkt: Preis und Menge sinken. Screenshot machen!', v: { reveal: ['n2'], focus: ['a1', 'a2', 'n1', 'n2'], sticker: '📸 screenshot' } },
    ],
  },

  // ───────────────────────── 05 MARKTFORMEN
  { id: 'c5', chapter: 5, type: 'chapter', accent: C.formen, num: '05', title: 'Marktformen', icon: 'layout-grid', lines: [{ pause: 1.6 }] },
  {
    id: 'formen', chapter: 5, type: 'list', accent: C.formen, title: 'Monopol · Oligopol · Polypol', kicker: 'Einfach zählen', cols: 3,
    items: [
      { id: 'mo', icon: 'user', title: 'Monopol', text: 'einer → bestimmt den Preis', tag: 'monos = einer', ex: 'Stadtwerk (Wasser)' },
      { id: 'ol', icon: 'users', title: 'Oligopol', text: 'wenige → beeinflussen den Preis', tag: 'oligos = wenige', ex: 'Mobilfunknetze' },
      { id: 'po', icon: 'users-round', title: 'Polypol', text: 'viele → flexible Preise', tag: 'polys = viele', ex: 'Wochenmarkt' },
    ],
    lines: [
      { say: 'Nächstes Thema: Marktformen. Hier zählst du einfach, wie viele Anbieter und Nachfrager es gibt.', v: {} },
      { say: 'Monopol: nur einer. Der kann den Preis bestimmen. Beispiel: das Stadtwerk als einziger Wasserversorger.', v: { reveal: ['mo'], focus: 'mo' } },
      { say: 'Oligopol: wenige. Die können den Preis beeinflussen. Beispiel: die paar Mobilfunknetze in Deutschland.', v: { reveal: ['ol'], focus: 'ol' } },
      { say: 'Polypol: viele. Vollständige Konkurrenz und flexible Preise. Beispiel: der Wochenmarkt.', v: { reveal: ['po'], focus: 'po' } },
      { say: 'Die Namen kommen aus dem Griechischen: monos heißt einer, oligos wenige, polys viele.', v: { focus: ['mo', 'ol', 'po'], showTags: true } },
    ],
  },
  {
    id: 'matrix', chapter: 5, type: 'matrix', accent: C.formen,
    lines: [
      { say: 'Kombinierst du beide Seiten, bekommst du neun Marktformen.', v: { fill: true } },
      { say: 'Der Trick: Der Name richtet sich nach der Seite mit weniger Teilnehmern.', v: { sticker: 'Trick: kleinere Seite zählt' } },
      { say: 'Ein Anbieter, viele Nachfrager: Angebotsmonopol.', v: { hl: [[0, 2]] } },
      { say: 'Viele Anbieter, wenige Nachfrager: Nachfrageoligopol. Zum Beispiel viele Milchbauern und zwei Molkereien.', v: { hl: [[1, 0]] } },
      { say: 'Wenige Anbieter, viele Nachfrager: Angebotsoligopol, wie bei Mineralölkonzernen und Tankstellen.', v: { hl: [[0, 1]] } },
    ],
  },
  {
    id: 'vollk', chapter: 5, type: 'list', accent: C.formen, title: 'Der vollkommene Markt', kicker: '6 Voraussetzungen', cols: 3,
    items: [
      { id: 'v1', icon: 'users-round', title: '1 · Polypol', text: 'viele Anbieter & Nachfrager' },
      { id: 'v2', icon: 'door-open', title: '2 · Freier Marktzugang', text: 'keiner wird ausgesperrt' },
      { id: 'v3', icon: 'copy', title: '3 · Homogene Güter', text: 'alles gleichartig' },
      { id: 'v4', icon: 'scale', title: '4 · Keine Präferenzen', text: 'nur der Preis zählt' },
      { id: 'v5', icon: 'eye', title: '5 · Markttransparenz', text: 'alle kennen alle Preise' },
      { id: 'v6', icon: 'zap', title: '6 · Sofortige Reaktion', text: 'ohne Verzögerung' },
    ],
    lines: [
      { say: 'Und jetzt der Traum jedes Wirtschaftsbuchs: der vollkommene Markt. Dafür müssen sechs Voraussetzungen erfüllt sein.', v: {} },
      { say: 'Eins: Polypol.', v: { reveal: ['v1'], focus: 'v1' } },
      { say: 'Zwei: freier Marktzugang. Keiner wird ausgesperrt.', v: { reveal: ['v2'], focus: 'v2' } },
      { say: 'Drei: homogene Güter, also alles gleichartig.', v: { reveal: ['v3'], focus: 'v3' } },
      { say: 'Vier: keine Präferenzen. Käufer schauen nur auf den Preis.', v: { reveal: ['v4'], focus: 'v4' } },
      { say: 'Fünf: vollständige Markttransparenz. Alle kennen alle Preise.', v: { reveal: ['v5'], focus: 'v5' } },
      { say: 'Sechs: sofortige Reaktion auf Änderungen.', v: { reveal: ['v6'], focus: 'v6' } },
      { say: 'Fehlt auch nur eine davon, ist der Markt unvollkommen. Und das ist in der Realität fast immer so.', v: { focus: [], sticker: 'Realität: unvollkommen' } },
    ],
  },
  {
    id: 'boerse', chapter: 5, type: 'big', accent: C.formen,
    lines: [
      { say: 'Am nächsten kommt dem vollkommenen Markt die Börse. Beliebte Prüfungsfrage, also merken!', v: { kicker: 'Prüfungsfrage', big: 'Die Börse.', icon: 'chart-candlestick', sub: 'am nächsten am vollkommenen Markt', sticker: 'merken!' } },
      { say: 'Und Dialogmarketing schafft ganz bewusst Präferenzen, zum Beispiel mit freundlichem Service. Damit Kunden bleiben, auch wenn es woanders billiger ist.', v: { kicker: 'Dialogmarketing', big: 'Präferenzen', icon: 'heart-handshake', sub: 'Kunden binden, obwohl es woanders billiger ist' } },
    ],
  },

  // ───────────────────────── 06 STAAT
  { id: 'c6', chapter: 6, type: 'chapter', accent: C.staat, num: '06', title: 'Staatseingriffe', icon: 'landmark', lines: [{ pause: 1.6 }] },
  {
    id: 'staat', chapter: 6, type: 'chart', accent: C.staat, axes: KARTOFFEL, title: 'Preis-Mengen-Diagramm', preset: [
      { op: 'curve', id: 'N', from: [500, 1], to: [100, 3], color: N_COLOR, label: 'N', instant: true },
      { op: 'curve', id: 'A', from: [100, 1], to: [500, 3], color: A_COLOR, label: 'A', instant: true },
      { op: 'point', id: 'gg', q: 300, p: 2, label: 'GG', color: '#ffffff', instant: true },
    ],
    lines: [
      { say: 'Manchmal findet der Staat den Marktpreis nicht fair und greift ein. Zwei Klassiker im Preis-Mengen-Diagramm.', v: { note: { icon: 'landmark', big: 'Staat greift ein', sub: '2 Klassiker' } } },
      { say: 'Erstens: der Höchstpreis. Der Staat legt einen Preis unter dem Gleichgewichtspreis fest. Teurer darf es nicht werden.', v: { ops: [{ op: 'hline', id: 'hp', p: 1.5, label: 'Höchstpreis', color: C.staat }], note: { kicker: 'Höchstpreis', big: 'unter GG', sub: 'schützt die Nachfrager' } } },
      { say: 'Das schützt die Nachfrager. Aber es entsteht ein Nachfrageüberhang. Die Ware wird knapp, es drohen Warteschlangen und Schwarzmärkte.', v: { ops: [{ op: 'gap', id: 'g1', p: 1.5, q1: 200, q2: 400, label: 'Nachfrageüberhang', color: N_COLOR }], note: { kicker: 'Folge', big: 'Knappheit', sub: 'Schlangen · Schwarzmarkt' } } },
      { say: 'Ein Beispiel ist die Mietpreisbremse.', v: { note: { icon: 'house', big: 'Mietpreisbremse', sub: 'Beispiel Höchstpreis' } } },
      { say: 'Zweitens: der Mindestpreis. Der liegt über dem Gleichgewichtspreis. Billiger darf es nicht werden.', v: { ops: [{ op: 'hide', ids: ['hp', 'g1'] }, { op: 'hline', id: 'mp', p: 2.5, label: 'Mindestpreis', color: C.staat }], note: { kicker: 'Mindestpreis', big: 'über GG', sub: 'schützt die Anbieter' } } },
      { say: 'Das schützt die Anbieter. Folge: ein Angebotsüberhang. Der Staat muss Überschüsse oft aufkaufen und lagern.', v: { ops: [{ op: 'gap', id: 'g2', p: 2.5, q1: 200, q2: 400, label: 'Angebotsüberhang', color: A_COLOR }], note: { kicker: 'Folge', big: 'Überschuss', sub: 'Staat kauft auf & lagert' } } },
      { say: 'Beispiele sind Agrarpreise, und auf dem Arbeitsmarkt der Mindestlohn.', v: { note: { icon: 'wheat', big: 'Agrarpreise', sub: '+ Mindestlohn (Arbeitsmarkt)' } } },
      { say: 'Merke: Höchstpreis unten, Nachfrageüberhang. Mindestpreis oben, Angebotsüberhang.', v: { ops: [{ op: 'hline', id: 'hp2', p: 1.5, label: 'Höchstpreis', color: C.staat }, { op: 'gap', id: 'g3', p: 1.5, q1: 200, q2: 400, label: 'Nachfrageüberhang', color: N_COLOR }], note: { kicker: 'Merke', rows: [['Höchstpreis ↓', 'Nachfrageüberhang'], ['Mindestpreis ↑', 'Angebotsüberhang']] } } },
    ],
  },

  // ───────────────────────── 07 FUNKTIONEN
  { id: 'c7', chapter: 7, type: 'chapter', accent: C.funktion, num: '07', title: 'Funktionen des Marktpreises', icon: 'badge-euro', lines: [{ pause: 1.6 }] },
  {
    id: 'funk', chapter: 7, type: 'list', accent: C.funktion, title: 'Funktionen des Marktpreises', kicker: 'Was der Preis leistet', cols: 4,
    items: [
      { id: 'au', icon: 'scale', title: 'Ausgleichs­funktion', text: 'gleicht Angebot & Nachfrage aus, räumt den Markt' },
      { id: 'si', icon: 'radio-tower', title: 'Signal­funktion', text: 'zeigt, wie knapp ein Gut ist' },
      { id: 'le', icon: 'route', title: 'Lenkungs­funktion', text: 'lenkt Produktionsfaktoren dorthin, wo sie gebraucht werden' },
      { id: 'se', icon: 'filter', title: 'Auslese­funktion', text: 'zu teure Anbieter fliegen raus' },
    ],
    lines: [
      { say: 'Zum Schluss: Was leistet der Marktpreis eigentlich? Vier Funktionen.', v: {} },
      { say: 'Die Ausgleichsfunktion: Der Preis gleicht Angebot und Nachfrage aus und räumt den Markt.', v: { reveal: ['au'], focus: 'au' } },
      { say: 'Die Signalfunktion: Der Preis zeigt, wie knapp ein Gut ist. Hoher Preis heißt knapp und begehrt.', v: { reveal: ['si'], focus: 'si' } },
      { say: 'Die Lenkungsfunktion: Der Preis lenkt Geld, Arbeit und Material dahin, wo sie am meisten gebraucht werden.', v: { reveal: ['le'], focus: 'le' } },
      { say: 'Und die Auslesefunktion: Wer zu teuer produziert, fliegt vom Markt.', v: { reveal: ['se'], focus: 'se', sticker: 'bye 👋' } },
    ],
  },

  // ───────────────────────── 08 QUIZ
  { id: 'c8', chapter: 8, type: 'chapter', accent: C.quiz, num: '08', title: 'Quick Check', icon: 'brain', lines: [{ pause: 1.4 }] },
  {
    id: 'quiz', chapter: 8, type: 'quiz', accent: C.quiz,
    questions: [
      { q: 'Was ist ein Käufermarkt?', o: ['Nachfrage > Angebot', 'Angebot > Nachfrage', 'Staat legt Preis fest'], a: 1 },
      { q: 'Kaffee und Tee sind …', o: ['Komplementärgüter', 'Substitutionsgüter', 'Produktionsgüter'], a: 1 },
      { q: '4 €: N 600 / A 200 · 6 €: N 400 / A 400 · 8 €: N 200 / A 600. Gleichgewichtspreis?', o: ['4 €', '6 €', '8 €'], a: 1 },
      { q: 'Welcher Markt ist dem vollkommenen Markt am nächsten?', o: ['Mobilfunk', 'Leitungswasser', 'Wertpapierbörse'], a: 2 },
      { q: 'Ein Höchstpreis unter dem Gleichgewicht führt zu …', o: ['Angebotsüberhang', 'Nachfrageüberhang', 'Markträumung'], a: 1 },
    ],
    lines: [
      { say: 'Quick Check! Drei Sekunden pro Frage. Sag die Antwort laut.', v: { intro: true } },
      { say: 'Frage eins: Was ist ein Käufermarkt?', v: { ask: 0 } },
      { pause: 3, v: { count: 0 } },
      { say: 'B! Das Angebot ist größer als die Nachfrage.', v: { answer: 0 } },
      { say: 'Frage zwei: Kaffee und Tee sind …?', v: { ask: 1 } },
      { pause: 3, v: { count: 1 } },
      { say: 'Substitutionsgüter. Die sind austauschbar.', v: { answer: 1 } },
      { say: 'Frage drei: Wo liegt hier der Gleichgewichtspreis?', v: { ask: 2 } },
      { pause: 3, v: { count: 2 } },
      { say: 'Sechs Euro. Da sind Angebot und Nachfrage beide vierhundert.', v: { answer: 2 } },
      { say: 'Frage vier: Welcher Markt ist dem vollkommenen Markt am nächsten?', v: { ask: 3 } },
      { pause: 3, v: { count: 3 } },
      { say: 'Die Wertpapierbörse.', v: { answer: 3 } },
      { say: 'Und Frage fünf: Wozu führt ein Höchstpreis unter dem Gleichgewicht?', v: { ask: 4 } },
      { pause: 3, v: { count: 4 } },
      { say: 'Zum Nachfrageüberhang.', v: { answer: 4 } },
    ],
  },
  {
    id: 'outro', chapter: 8, type: 'big', accent: C.quiz,
    lines: [
      { say: 'Das wars. Wenn du das alles verstanden hast, bist du für Dienstag ready.', v: { kicker: 'Fertig', big: 'Ready für Dienstag.', icon: 'trophy' } },
      { say: 'Schick das Video in die Klassengruppe. Viel Erfolg bei der Klausur!', v: { kicker: 'KDM 25a', big: 'Viel Erfolg!', icon: 'send', sub: 'Ab in die Klassengruppe damit.', sticker: 'du schaffst das' } },
      { pause: 1.5, v: {} },
    ],
  },
];

const CHAPTERS = ['Intro', 'Markt', 'Nachfrage', 'Angebot', 'Gleichgewicht', 'Marktformen', 'Staat', 'Funktionen', 'Quiz'];

if (typeof module !== 'undefined') module.exports = { scenes, CHAPTERS, C };
if (typeof window !== 'undefined') Object.assign(window, { SCENES: scenes, CHAPTERS, COLORS: C });
