"""Bake the film's images and audio into assets/.

Run from the film folder:  python3 -I tools/prepare_assets.py
Every output is deterministic (fixed seeds), so re-running gives identical files.

Image treatments are the film's medium:
  bit   1-bit Floyd-Steinberg dither at fax dot shape (2 px wide x 4 px tall),
        like a Group 3 page at standard resolution (204 x 98 dpi).
  grey  continuous tone mapped from ink to paper (the analog era).
  onoff hard threshold with no dither, coarse dots (Bain/Caselli era on/off).
"""

import json
import math
import shutil
import subprocess
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

FILM = Path.cwd()
SRC = FILM.parent.parent  # research/fax-history
IMG = SRC / "images"
OUT = FILM / "assets" / "img"
AUD = FILM / "assets" / "audio"
OUT.mkdir(parents=True, exist_ok=True)
AUD.mkdir(parents=True, exist_ok=True)

INK = np.array([0x14, 0x14, 0x14], dtype=np.float32)
PAPER = np.array([0xEF, 0xEF, 0xEC], dtype=np.float32)


def load_grey(rel):
    im = Image.open(IMG / rel)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, (255, 255, 255, 255))
        im = Image.alpha_composite(bg, im)
    return ImageOps.autocontrast(im.convert("L"), cutoff=1)


def fit(im, box_w, box_h):
    s = min(box_w / im.width, box_h / im.height)
    return im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)


def colorize(l_arr):
    a = l_arr.astype(np.float32)[..., None] / 255.0
    rgb = INK + (PAPER - INK) * a
    return Image.fromarray(rgb.clip(0, 255).astype(np.uint8), "RGB")


def to_grey(im):
    return colorize(np.asarray(im))


def to_bit(im, dot=(2, 4)):
    small = im.resize((max(1, im.width // dot[0]), max(1, im.height // dot[1])), Image.LANCZOS)
    one = small.convert("1")  # Floyd-Steinberg
    big = one.resize((small.width * dot[0], small.height * dot[1]), Image.NEAREST)
    return colorize(np.asarray(big.convert("L")))


def to_onoff(im, dot=(6, 6), threshold=128):
    small = im.resize((max(1, im.width // dot[0]), max(1, im.height // dot[1])), Image.LANCZOS)
    arr = (np.asarray(small) >= threshold).astype(np.uint8) * 255
    big = Image.fromarray(arr, "L").resize((small.width * dot[0], small.height * dot[1]), Image.NEAREST)
    return colorize(np.asarray(big))


def save(im, name):
    im.save(OUT / name, optimize=True)
    return {"file": f"assets/img/{name}", "w": im.width, "h": im.height}


manifest = {}

# The one page: Caselli's 1862 pantelegram, placed on a sheet with margins.
SHEET_W, SHEET_H = 880, 1120
content = load_grey("01-origins-1840-1900/1862-pantelegram-paris-lyon.jpg")
content = fit(content, SHEET_W - 120, SHEET_H - 160)
sheet = Image.new("L", (SHEET_W, SHEET_H), 255)
sheet.paste(content, ((SHEET_W - content.width) // 2, 150))
manifest["page-grey"] = save(to_grey(sheet), "page-grey.png")
page_bit = to_bit(sheet)
manifest["page-bit"] = save(page_bit, "page-bit.png")
manifest["page-onoff"] = save(to_onoff(sheet, dot=(4, 4), threshold=150), "page-onoff.png")

# Bain-era drift: each scan line lands a little further right than the last.
bit_arr = np.asarray(page_bit)
sheared = np.empty_like(bit_arr)
sheared[:] = PAPER.astype(np.uint8)
for y in range(SHEET_H):
    band = y // 4  # one fax line is 4 px tall
    shift = int(((band * 4) / SHEET_H) ** 1.4 * 170 + 5 * math.sin(band / 6.0))
    row = np.roll(bit_arr[y], shift, axis=0)
    if shift > 0:
        row[:shift] = PAPER.astype(np.uint8)
    sheared[y] = row
manifest["page-sheared"] = save(Image.fromarray(sheared, "RGB"), "page-sheared.png")

# Analog line noise: horizontal bands of wrong shading and soft edges.
rng = np.random.default_rng(1843)
noisy = np.asarray(sheet).astype(np.float32)
noisy = np.asarray(Image.fromarray(noisy.astype(np.uint8)).resize((SHEET_W // 3, SHEET_H // 3), Image.LANCZOS).resize((SHEET_W, SHEET_H), Image.BICUBIC)).astype(np.float32)
rows = np.arange(SHEET_H, dtype=np.float32)
bands = 26 * np.sin(rows / 41.0) + 14 * np.sin(rows / 9.3 + 1.7)
row_noise = rng.normal(0, 10, SHEET_H // 4).repeat(4)[:SHEET_H]
noisy = noisy * 0.78 + 30 + bands[:, None] + row_noise[:, None] + rng.normal(0, 9, noisy.shape)
manifest["page-noisy"] = save(colorize(noisy.clip(0, 255).astype(np.uint8)), "page-noisy.png")

# Archive images. (key, source, box w, box h, treatments)
IMAGES = [
    ("bain-patent", "01-origins-1840-1900/1843-1850-bain-improved-facsimile-patent.png", 900, 900, ["grey"]),
    ("caselli-drawing", "01-origins-1840-1900/caselli-pantelegraph-full-drawing.png", 700, 1000, ["grey"]),
    ("caselli-flowers", "01-origins-1840-1900/1861-caselli-pantelegraph-sample.jpg", 800, 760, ["grey"]),
    ("coolidge", "web/1924-ranger-photoradiogram-coolidge.jpg", 560, 980, ["grey", "onoff", "bit"]),
    ("belin-1907", "02-photo-telegraphy-1900-1940/1907-belin-with-telestereograph.jpg", 700, 940, ["grey"]),
    ("belino-1914", "02-photo-telegraphy-1900-1940/1914-belinograph-transmitted-photo.png", 1300, 920, ["grey"]),
    ("bartlane", "02-photo-telegraphy-1900-1940/1926-how-photos-are-cabled-bartlane.png", 760, 1000, ["grey"]),
    ("icebreaker", "03-radio-fax-1920-1970/1968-icebreaker-weather-fax.jpg", 1300, 900, ["grey"]),
    ("mufax", "04-office-fax-1960-2000/1975-mufax-courier-sender.jpg", 900, 640, ["grey"]),
    ("kxf90", "04-office-fax-1960-2000/1990s-panasonic-kx-f90.jpg", 900, 640, ["bit"]),
    ("minifax", "04-office-fax-1960-2000/ntt-minifax-mf1.jpg", 900, 760, ["bit"]),
    ("receiving-2009", "06-21st-century/2009-receiving-a-fax.jpg", 1100, 860, ["bit"]),
    ("sharp-home", "06-21st-century/sharp-ux-d63cl-home-fax.jpg", 1000, 640, ["bit"]),
]
for key, rel, bw, bh, kinds in IMAGES:
    g = fit(load_grey(rel), bw, bh)
    for kind in kinds:
        fn = {"grey": to_grey, "bit": to_bit, "onoff": to_onoff}[kind]
        manifest[f"{key}-{kind}"] = save(fn(g), f"{key}-{kind}.png")

# Spectrogram of the real handshake recording (fax-answering-tones.ogg).
src_audio = SRC / "audio" / "fax-answering-tones.ogg"
pcm = subprocess.run(
    ["ffmpeg", "-v", "error", "-i", str(src_audio), "-ac", "1", "-ar", "8000", "-f", "s16le", "-"],
    check=True, capture_output=True,
).stdout
x = np.frombuffer(pcm, dtype=np.int16).astype(np.float32) / 32768.0
SR, N, HOP = 8000, 512, 40  # 5 ms hop
FMIN, FMAX = 1000, 2400
SPEC_W, SPEC_H = 1680, 560
win = np.hanning(N)
frames = [x[i : i + N] * win for i in range(0, len(x) - N, HOP)]
mag = np.abs(np.fft.rfft(np.array(frames), axis=1))
freqs = np.fft.rfftfreq(N, 1 / SR)
sel = (freqs >= FMIN) & (freqs <= FMAX)
db = 20 * np.log10(mag[:, sel] + 1e-6)
db = (db - (db.max() - 50)).clip(0, None) / 50.0  # 50 dB range
img = (1.0 - db.T[::-1]) * 255  # low frequency at the bottom, dark = loud
spec = Image.fromarray(img.astype(np.uint8), "L").resize((SPEC_W, SPEC_H), Image.BICUBIC)
manifest["spec-grey"] = save(to_grey(spec), "spec-grey.png")
manifest["spec-bit"] = save(to_bit(spec), "spec-bit.png")
duration = len(x) / SR
manifest["spec-axis"] = {
    "duration_s": round(duration, 3),
    "fmin_hz": FMIN,
    "fmax_hz": FMAX,
    "px_per_s": round(SPEC_W / duration, 3),
    "y_of_hz": {str(f): round(SPEC_H * (1 - (f - FMIN) / (FMAX - FMIN)), 1) for f in (1100, 1650, 1850, 2100)},
    "segments_s": [
        [0.0, 2.5, "2,100 Hz answer tone (CED)"],
        [2.5, 3.5, "V.21 preamble, ~1,650 Hz"],
        [3.5, 4.9, "DIS capability list, 1,650/1,850 Hz"],
        [5.0, 7.7, "silence: waiting for the caller"],
        [7.7, 10.3, "no reply, so it repeats preamble + DIS"],
    ],
}

for name in [
    "fax-answering-tones.ogg",
    "radiofax-signal.ogg",
    "fax-laser-fax-machine-sounds.ogg",
    "2016-ansam-2100hz-answer-tone.wav",
    "2005-v92-fax-modem-56k-handshake.wav",
]:
    shutil.copy2(SRC / "audio" / name, AUD / name)

(FILM / "assets" / "manifest.json").write_text(json.dumps(manifest, indent=1))
print(json.dumps(manifest, indent=1))
