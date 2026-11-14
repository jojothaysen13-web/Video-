"""TTS (Piper, lokal & kostenlos) + Timeline + Musik/SFX-Mix.

Liest build/scenes.json (aus script.js exportiert), erzeugt pro Satz eine WAV,
berechnet die Timeline (build/timeline.json) und mischt build/audio.wav.
"""
import hashlib, json, math, os, re, subprocess, sys, wave
import numpy as np

ROOT = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.join(ROOT, 'build')
TTS_DIR = os.path.join(BUILD, 'tts')
os.makedirs(TTS_DIR, exist_ok=True)
MODEL = os.environ.get('PIPER_MODEL', '/tmp/claude-0/piper/de_DE-thorsten-high.onnx')
SR = 44100
GAP = 0.30          # Pause nach jedem Satz
SCENE_TAIL = 0.35   # kleiner Puffer am Szenenende
LENGTH_SCALE = 0.93 # etwas zügiger sprechen

# Aussprache-Hilfen für englische Begriffe / Abkürzungen
PRON = [
    (r'TikTok', 'Tick-Tock'), (r'Plot Twist', 'Plott Twist'), (r'Quick Check', 'Kwick Tscheck'),
    (r'\bready\b', 'reddi'), (r'Callcenter', 'Kollsenter'), (r'Headsets', 'Hedsets'),
    (r'E-Bike', 'I-Beik'), (r'\bSale\b', 'Seyl'), (r'Onlineshop', 'Onlein-Schopp'),
    (r'Dialogmarketing', 'Dialog-Marketing'), (r'\bPCs\b', 'Pe-Zehs'), (r'\bwars\b', "war's"),
    (r'\bgehts\b', "geht's"), (r'…', ''), (r'\bB!', 'Bee!'),
]


def pron(t):
    for a, b in PRON:
        t = re.sub(a, b, t)
    return t


def synth_all(scenes):
    from piper import PiperVoice, SynthesisConfig
    voice = None
    cfg = SynthesisConfig(length_scale=LENGTH_SCALE, noise_scale=0.6, noise_w_scale=0.75)
    for sc in scenes:
        for i, ln in enumerate(sc['lines']):
            if 'say' not in ln:
                continue
            text = pron(ln['say'])
            h = hashlib.md5(f'{text}|{LENGTH_SCALE}'.encode()).hexdigest()[:10]
            path = os.path.join(TTS_DIR, f"{sc['id']}_{i:02d}_{h}.wav")
            ln['wav'] = path
            if os.path.exists(path):
                continue
            if voice is None:
                voice = PiperVoice.load(MODEL)
            with wave.open(path, 'wb') as wf:
                voice.synthesize_wav(text, wf, syn_config=cfg)
            print('tts', os.path.basename(path), flush=True)


def load_wav(path):
    """Lädt WAV und resampelt auf SR (ffmpeg), mono float32."""
    out = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    a = np.frombuffer(out, dtype=np.float32).copy()
    # Stille am Anfang/Ende trimmen
    thr = 0.01
    idx = np.where(np.abs(a) > thr)[0]
    if len(idx):
        a = a[max(0, idx[0] - int(0.02 * SR)): idx[-1] + int(0.06 * SR)]
    return a


def build_timeline(scenes):
    t = 0.0
    tl = []
    voice_clips = []
    for sc in scenes:
        s0 = t
        lines = []
        for ln in sc['lines']:
            if 'say' in ln:
                a = load_wav(ln['wav'])
                d = len(a) / SR
                voice_clips.append((t, a))
                lines.append({'start': round(t, 3), 'dur': round(d + GAP, 3), 'speech': round(d, 3), 'say': ln['say'], 'v': ln.get('v', {})})
                t += d + GAP
            else:
                p = ln['pause']
                lines.append({'start': round(t, 3), 'dur': p, 'speech': 0, 'pause': True, 'v': ln.get('v', {})})
                t += p
        if sc['type'] != 'chapter':
            t += SCENE_TAIL
        tl.append({**{k: v for k, v in sc.items() if k != 'lines'}, 'start': round(s0, 3), 'end': round(t, 3), 'lines': lines})
    return tl, t, voice_clips


# ───────────────────────────── Musik & SFX (prozedural, lizenzfrei)
def note_freq(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def make_music(total):
    n = int(total * SR) + SR
    out = np.zeros(n, dtype=np.float32)
    bpm = 92
    beat = 60 / bpm
    bar = beat * 4
    t_all = np.arange(n) / SR
    # Akkorde (MIDI): Am9, Fmaj7, Cmaj7, G6
    chords = [[57, 60, 64, 67, 71], [53, 57, 60, 64, 69], [48, 55, 59, 64, 67], [55, 59, 62, 64, 67]]
    # Pad
    nbars = int(total / bar) + 2
    for b in range(nbars):
        ch = chords[b % 4]
        s = int(b * bar * SR)
        e = min(n, int((b + 1) * bar * SR) + int(0.3 * SR))
        if s >= n:
            break
        tt = np.arange(e - s) / SR
        env = np.minimum(1, tt / 0.6) * np.minimum(1, np.maximum(0, (bar + 0.3 - tt)) / 0.6)
        sig = np.zeros(e - s, dtype=np.float32)
        for k, m in enumerate(ch):
            f = note_freq(m)
            sig += (np.sin(2 * np.pi * f * tt + k) + 0.25 * np.sin(2 * np.pi * 2 * f * tt)) * (0.9 if k else 0.6)
        out[s:e] += (sig * env * 0.035).astype(np.float32)
        # Bass
        f = note_freq(ch[0] - 12)
        benv = np.exp(-tt * 1.2) * np.minimum(1, tt / 0.01)
        out[s:e] += (np.sin(2 * np.pi * f * tt) * benv * 0.11).astype(np.float32)
    # Drums
    rng = np.random.default_rng(1)
    nbeats = int(total / beat) + 2
    kick_len = int(0.35 * SR)
    kt = np.arange(kick_len) / SR
    kick = np.sin(2 * np.pi * (50 + 90 * np.exp(-kt * 30)) * kt) * np.exp(-kt * 9) * 0.32
    hat_len = int(0.05 * SR)
    hat = rng.standard_normal(hat_len) * np.exp(-np.arange(hat_len) / SR * 90) * 0.035
    hat = np.diff(np.concatenate([[0], hat]))  # Hochpass-artig
    snare_len = int(0.2 * SR)
    st = np.arange(snare_len) / SR
    snare = (rng.standard_normal(snare_len) * 0.07 + np.sin(2 * np.pi * 190 * st) * 0.06) * np.exp(-st * 22)
    for i in range(nbeats):
        s = int(i * beat * SR)
        if s + kick_len < n and i % 4 in (0, 2):
            out[s:s + kick_len] += kick
        if s + snare_len < n and i % 4 in (1, 3):
            out[s:s + snare_len] += snare
        for off in (0, 0.5):
            hs = int((i + off) * beat * SR)
            if hs + hat_len < n:
                out[hs:hs + hat_len] += hat * (1 if off else 0.6)
    # leichter Tiefpass (gleitender Mittelwert) für Lo-Fi-Gefühl
    k = 5
    out = np.convolve(out, np.ones(k) / k, mode='same').astype(np.float32)
    # Fade in/out
    fi = int(2 * SR)
    out[:fi] *= np.linspace(0, 1, fi)
    fo = int(3 * SR)
    end = int(total * SR)
    out[end - fo:end] *= np.linspace(1, 0, fo)
    out[end:] = 0
    return out


def whoosh(d=0.45, strength=1.0):
    n = int(d * SR)
    rng = np.random.default_rng(int(d * 1000))
    x = rng.standard_normal(n)
    tt = np.linspace(0, 1, n)
    env = np.sin(np.pi * tt) ** 2
    # Bandpass-Sweep grob über wechselnde Glättung
    y = np.zeros(n)
    acc = 0
    for i in range(n):
        a = 0.02 + 0.5 * tt[i]
        acc += a * (x[i] - acc)
        y[i] = acc
    y = y - np.convolve(y, np.ones(30) / 30, mode='same')
    return (y * env / (np.abs(y).max() + 1e-9) * 0.16 * strength).astype(np.float32)


def blip(f=880, d=0.12, vol=0.12):
    tt = np.arange(int(d * SR)) / SR
    return (np.sin(2 * np.pi * f * tt) * np.exp(-tt * 30) * vol).astype(np.float32)


def ding():
    a = blip(1318, 0.5, 0.12)
    b = blip(1760, 0.5, 0.09)
    out = np.zeros(int(0.6 * SR), dtype=np.float32)
    out[:len(a)] += a
    o = int(0.08 * SR)
    out[o:o + len(b)] += b
    return out


def mix(tl, total, voice_clips):
    n = int(total * SR) + SR
    voice = np.zeros(n, dtype=np.float32)
    for t, a in voice_clips:
        s = int(t * SR)
        voice[s:s + len(a)] += a[:max(0, n - s)]
    # Normalisieren der Stimme
    voice *= 0.85 / (np.abs(voice).max() + 1e-9)
    sfx = np.zeros(n, dtype=np.float32)

    def put(t, clip):
        s = max(0, int(t * SR))
        e = min(n, s + len(clip))
        sfx[s:e] += clip[:e - s]

    w_small = whoosh(0.35, 0.6)
    w_big = whoosh(0.7, 1.2)
    for sc in tl:
        if sc['type'] == 'chapter':
            put(sc['start'] - 0.15, w_big)
        else:
            put(sc['start'] - 0.1, w_small)
            # kleine "Cuts" pro Satz in big-Szenen, Pops bei Reveals
            for ln in sc['lines'][1:]:
                v = ln.get('v', {})
                if sc['type'] == 'big':
                    put(ln['start'] - 0.08, whoosh(0.25, 0.4))
                elif v.get('reveal'):
                    put(ln['start'], blip(660, 0.09, 0.07))
                if v.get('count') is not None:
                    for k in range(3):
                        put(ln['start'] + k, blip(1000 if k < 2 else 1250, 0.08, 0.10))
                if v.get('answer') is not None:
                    put(ln['start'], ding())
                if v.get('sticker'):
                    put(ln['start'] + 0.45, blip(1500, 0.06, 0.05))
    music = make_music(total)[:n]
    # Ducking: Musik leiser, wenn gesprochen wird
    env = np.abs(voice)
    win = int(0.25 * SR)
    env = np.convolve(env, np.ones(win) / win, mode='same')
    duck = 1 - 0.55 * np.clip(env / 0.05, 0, 1)
    music = music * duck
    out = voice + music * 0.9 + sfx
    out *= 0.95 / (np.abs(out).max() + 1e-9)
    stereo = np.stack([out, out], axis=1)
    pcm = (stereo * 32767).astype(np.int16)
    path = os.path.join(BUILD, 'audio.wav')
    with wave.open(path, 'wb') as wf:
        wf.setnchannels(2)
        wf.setsampwidth(2)
        wf.setframerate(SR)
        wf.writeframes(pcm.tobytes())
    print('audio ->', path)


def main():
    subprocess.run(['node', '-e', f"const s=require('{ROOT}/script.js');require('fs').writeFileSync('{BUILD}/scenes.json', JSON.stringify(s.scenes))"], check=True)
    scenes = json.load(open(os.path.join(BUILD, 'scenes.json')))
    synth_all(scenes)
    tl, total, clips = build_timeline(scenes)
    json.dump({'total': round(total + 0.5, 3), 'scenes': tl}, open(os.path.join(BUILD, 'timeline.json'), 'w'), ensure_ascii=False, indent=1)
    print(f'Gesamtlänge: {total:.1f}s ({total/60:.2f} min)')
    if '--no-mix' not in sys.argv:
        mix(tl, total + 0.5, clips)


if __name__ == '__main__':
    main()
