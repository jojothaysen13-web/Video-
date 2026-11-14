// Baut den Lernzettel: Icons einsetzen, mit Chromium als A4-PDF drucken.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const icons = path.join(dir, '../node_modules/lucide-static/icons');
let html = fs.readFileSync(path.join(dir, 'lernzettel.html'), 'utf8');
html = html.replace(/\{\{([a-z0-9-]+)\}\}/g, (_, n) => fs.readFileSync(path.join(icons, n + '.svg'), 'utf8').replace(/<!--.*?-->/gs, ''));
const tmp = path.join(dir, '_render.html');
fs.writeFileSync(tmp, html);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto('file://' + tmp);
  await p.evaluate(() => document.fonts.ready);
  const out = process.argv[2] || path.join(dir, 'Lernzettel_Markt_Preisbildung.pdf');
  await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  if (process.argv.includes('--png')) {
    await p.setViewportSize({ width: 794, height: 1123 });
    const pages = await p.$$('.page');
    for (let i = 0; i < pages.length; i++) await pages[i].screenshot({ path: path.join(dir, `_p${i + 1}.png`) });
  }
  await b.close();
  fs.unlinkSync(tmp);
  console.log('PDF:', out);
})();
