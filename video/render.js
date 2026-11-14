// Rendert index.html Frame für Frame (deterministisch via window.seek) und kodiert mit ffmpeg.
// node render.js --stills 3,10,20      -> build/stills/*.png
// node render.js [--workers 4] [--fps 30] [--from s --to s]  -> build/video.mp4
const { chromium } = require('playwright');
const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const args = process.argv.slice(2);
const arg = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const FPS = +arg('fps', 30);
const URL = 'file://' + path.join(ROOT, 'index.html');

async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('PAGEERROR', e.message));
  page.on('console', m => { if (m.type() === 'error') console.error('CONSOLE', m.text()); });
  await page.goto(URL);
  await page.evaluate(() => window.READY);
  return page;
}

async function stills(list) {
  const browser = await chromium.launch();
  const page = await openPage(browser);
  const dir = path.join(ROOT, 'build/stills'); fs.mkdirSync(dir, { recursive: true });
  for (const t of list) {
    await page.evaluate(t => window.seek(t), t);
    await page.screenshot({ path: path.join(dir, `t${String(t).padStart(6, '0')}.png`) });
  }
  await browser.close();
}

async function renderChunk(browser, f0, f1, out) {
  const page = await openPage(browser);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', String(FPS), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const t0 = Date.now();
  for (let f = f0; f < f1; f++) {
    await page.evaluate(t => window.seek(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - f0) % 300 === 0) console.log(`[${path.basename(out)}] ${f - f0}/${f1 - f0} frames, ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await page.close();
}

async function full() {
  const total = JSON.parse(fs.readFileSync(path.join(ROOT, 'build/timeline.json'))).total;
  const from = +arg('from', 0), to = +arg('to', total);
  const W = +arg('workers', 4);
  const F0 = Math.round(from * FPS), F1 = Math.round(to * FPS);
  const dir = path.join(ROOT, 'build/chunks'); fs.mkdirSync(dir, { recursive: true });
  const per = Math.ceil((F1 - F0) / W);
  const browser = await chromium.launch({ args: ['--disable-gpu-vsync'] });
  const jobs = [];
  const files = [];
  for (let i = 0; i < W; i++) {
    const a = F0 + i * per, b = Math.min(F1, a + per);
    if (a >= b) break;
    const out = path.join(dir, `c${i}.mp4`); files.push(out);
    jobs.push(renderChunk(browser, a, b, out));
  }
  await Promise.all(jobs);
  await browser.close();
  fs.writeFileSync(path.join(dir, 'list.txt'), files.map(f => `file '${f}'`).join('\n'));
  const outName = arg('out', 'video.mp4');
  const audio = path.join(ROOT, 'build/audio.wav');
  const outPath = path.join(ROOT, 'build', outName);
  const ffArgs = ['-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(dir, 'list.txt')];
  if (fs.existsSync(audio)) ffArgs.push('-ss', String(from), '-t', String(to - from), '-i', audio, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k');
  ffArgs.push('-c:v', 'copy', '-movflags', '+faststart', '-shortest', outPath);
  execFileSync('ffmpeg', ffArgs, { stdio: 'inherit' });
  console.log('fertig:', outPath);
}

(async () => {
  if (args.includes('--stills')) await stills(arg('stills').split(',').map(Number));
  else await full();
})();
