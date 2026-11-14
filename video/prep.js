// Bündelt Timeline + benötigte Lucide-Icons in build/data.js für die Render-Seite.
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const tl = JSON.parse(fs.readFileSync(path.join(ROOT, 'build/timeline.json'), 'utf8'));
const { CHAPTERS } = require('./script.js');
const ICON_DIR = path.join(ROOT, '../node_modules/lucide-static/icons');
const icons = {};
const s = JSON.stringify(tl);
const names = new Set(['check', 'x', 'arrow-right', 'calendar-clock']);
for (const m of s.matchAll(/"icon":"([a-z0-9-]+)"/g)) names.add(m[1]);
for (const m of s.matchAll(/\["([a-z0-9-]+)","/g)) names.add(m[1]);
for (const n of names) {
  const f = path.join(ICON_DIR, n + '.svg');
  if (fs.existsSync(f)) icons[n] = fs.readFileSync(f, 'utf8').replace(/<!--.*?-->/gs, '').replace(/class="[^"]*"/, '').trim();
}
fs.writeFileSync(path.join(ROOT, 'build/data.js'), `window.TL=${JSON.stringify(tl)};window.ICONS=${JSON.stringify(icons)};window.CHAPTERS=${JSON.stringify(CHAPTERS)};`);
console.log('data.js ok, icons:', Object.keys(icons).length, 'total', tl.total);
