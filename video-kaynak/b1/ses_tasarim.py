"""Saat B1 "Üç Dakika" - ses tasarımı + zaman çizelgesi + video.

Bölüm klasöründeki seslendirme -> STEREO ses (anlatım + efekt + müzik; anlatım konuşurken efekt/müzik kısılır)
Plan listesi + sayaç anahtar kareleri + tefecinin ağız zarfı -> zaman.json -> render.js -> bölüm klasörüne mp4.

Kullanım: python ses_tasarim.py [--sadece-ses] [--onizleme] [--analiz]
"""
import json
import os
import subprocess
import sys

import numpy as np

B1 = os.path.dirname(os.path.abspath(__file__))
SERI = os.path.dirname(os.path.dirname(B1))
BOLUM = os.path.join(SERI, "Bölüm 01 - Üç Dakika")
SES = next(os.path.join(BOLUM, a) for a in ("seslendirme.mp3", "saatbolum1.mp3") if os.path.exists(os.path.join(BOLUM, a)))
CIKTI = os.path.join(BOLUM, "01-saat-bolum-1.mp4")
GECICI = os.path.join(B1, "gecici")
os.makedirs(GECICI, exist_ok=True)
SR = 44100

# ------------------------------------------------------------------ ZAMAN
# Kayıttaki cümleler (orijinal sn): 0.00 "Dün gece…" · 2.20 "Şimdi…" · 5.13 "Bu şehirde…" · 9.83 "kolunuzda…" · 11.85 "Sıfıra inerse…"
# 13.29 "kalbiniz durur" · 14.93 "Bileğinizde…" · 16.87 "Uyurken…" · 19.09 "ve zamanınızı çekmiş" · 20.86 "Kardeşinizin yatağı boş"
# 22.64 "Masada bir not" · 23.82 not · 29.46 nefes · 30.39 "Saat dokuza geliyor" · 31.95 "Dönmedi" · 32.78 "İki dakika" · 33.63 "Sokağa…"
# 34.86 "Herkesin…" · 36.76 "ve kimse durmuyor" · 38.23 "Köşede…" · 40.23 "Kardeşinizin borçlu…" · 42.35 TEFECİ · 44.80 kıkırtı
# 45.51 "Kardeşin de…" · 47.26 "Ama karşı durakta…" · 49.26 "Yukarı Şehir'den" · 50.46 "Kolunda… altmış yıl" · 52.48 "Tefeci sizi…"
# 54.28 "Uyuyandan…" · 57.52 "Üstelik…" · 59.72 "izlenir" · 60.72 "Otuz saniye" · 62.07 CTA · 65.39 "Bir mi" · 66.14 "iki mi" · 69.95 son
# Boşluklar: "kalbiniz durur" sessizliği, geri dönüşten çıkış, notun ardından nefes, kapı, neonun yanması, hızlı çevirme, alarm, üç kesme, kapanış
BOSLUKLAR = [(14.45, .9), (20.60, .3), (29.15, .5), (32.60, .5), (38.05, .4), (47.10, .6), (60.50, .8), (61.75, 1.2), (70.19, 2.0)]


def T(t, sonra=False):
    """Orijinal ses zamanını kurgu zamanına çevirir. sonra=True: o anda açılan boşluğun sonrası."""
    return t + sum(g for q, g in BOSLUKLAR if q < t or (sonra and q == t))


DONMA = 69.95   # sayaç sıfır, ekran donar ("unutmayın" biter)
DURUR = 13.75   # sayacı sıfıra inen el; tik bir kez atlar


def P(a, b, sahne, **prm):
    return (a, b, sahne, prm)


# Sayaç (kurgu sn -> kalan sn): aralarda gerçek hızla akar, kesmelerde ileri atlar; hiçbir zaman geri gitmez.
SAYAC = [(0, 180),
         (T(20.60, True), 150),                                     # oda: 02:30
         (T(29.15, True), 120 + T(31.95) - T(29.15, True)),         # duvar saati: "Dönmedi"de 08:58'e geçer (= 02:00)
         (T(35.00), 110), (T(36.70), 103),                          # sokak
         (T(38.05), 90), (T(40.10), 84),                            # tefeci: 01:24
         (T(47.10), 64), (T(50.30), 58.5),                          # durak; bir dakikanın altı: alarm
         (T(52.30), 44),                                            # ikilem: 00:44
         (T(60.50, True), 30 + T(60.72) - T(60.50, True))]          # "Otuz saniye"
HUD_BAS = T(5.05)


def sayac(t):
    kf = SAYAC[0]
    for q in SAYAC:
        if t >= q[0]:
            kf = q
    return max(0.0, kf[1] - (t - kf[0]))


SEC = dict(paneller=["tefeci", "uyuyan"], etiketler=["1 · TEFECİYE GİDİN", "2 · UYUYANDAN ALIN"], bolum=2, ek="DE",
           sayac=[T(65.39), T(DONMA)], donma=T(DONMA), acilis=T(61.75, True))
KOS = dict(mod="kos", t0=T(32.60), x0=420, hiz=1140, z=[1.0, 1.0], c=[[540, 1100], [540, 1100]])
DUK = dict(mod="dukkan", yan=T(38.05) + .15, z=[1.45, 1.6], c=[[260, 1140], [240, 1120]])
YUZS = dict(yer="sokak", goz=1.55, kas=1, agiz=.3, bak=[.1, .6], z=[1.0, 1.08], kirmizi=.8)

# (başlangıç, bitiş [orijinal sn], sahne, parametreler [zamanlar kurgu saniyesi]); "ARA" = boşluğu dolduran plan
PLANLAR = [
    # Kanca: ön planda bilek (00:03:00, kırmızı), arkada uyuyan yüz; odak yüze kayar, "Şimdi"de gözler açılır
    P(0.00, 2.35, "yatak", mod="bilek", odak=T(1.45), uyan=T(2.12), hud=0, z=[1.0, 1.07], c=[[540, 1000], [560, 960]]),
    P(2.35, 5.05, "yatak", mod="dogrul", hud=0, z=[1.12, 1.0], c=[[540, 1000], [540, 960]], el=.6),
    # Şehir: pencereden çıkış, kafe okuyucusu, sayacı sıfıra inen el
    P(5.05, 9.70, "pencere", gecis=2.1, z=[1.0, 1.12], c=[[540, 980], [600, 1010]]),
    P(9.70, 11.70, "kafe", ode=T(10.05), cek=T(11.15), z=[1.0, 1.06], c=[[600, 960], [620, 960]]),
    P(11.70, 14.45, "bank", son=T(DURUR), z=[1.0, 1.12], c=[[560, 880], [560, 960]]),
    ("ARA", .9, "bank", dict(son=T(DURUR), z=[1.12, 1.13], c=[[560, 960], [560, 962]], sus=T(14.45))),
    # Morluklar; dün gece (anı); öfke
    P(14.45, 16.75, "bilek", z=[1.05, 1.16], c=[[540, 1000], [560, 980]]),
    P(16.75, 19.00, "ani", kavra=T(17.2), ani=1, hud=0, z=[1.0, 1.07], c=[[600, 1000], [640, 1040]]),
    P(19.00, 20.60, "yuz", yer="oda", ofke=1, ofkeT=.55, z=[1.0, 1.08]),
    ("ARA", .3, "yuz", dict(yer="oda", ofke=1, ofkeT=-2, z=[1.08, 1.09])),
    # Not: boş yatak + fotoğraf, masa, notun satırları, duvar saati
    P(20.60, 22.50, "oda", mod="genis", z=[1.4, 1.75], c=[[830, 1270], [815, 820]]),
    P(22.50, 23.75, "oda", mod="masa", al=T(22.85), z=[2.0, 2.15], c=[[330, 1260], [360, 1240]]),
    P(23.75, 29.15, "oda", mod="not", satirlar=[[T(23.85), T(25.15)], [T(25.55), T(26.70)], [T(27.05), T(27.95)], [T(27.95), T(28.75)]],
      z=[1.0, 1.12], c=[[560, 1060], [600, 1080]]),
    ("ARA", .5, "oda", dict(mod="not", satirlar=[[0, .01]] * 4, z=[1.12, 1.13], c=[[600, 1080], [602, 1081]])),
    P(29.15, 32.60, "oda", mod="saat", tik=T(31.95), z=[2.5, 3.0], c=[[815, 520], [815, 485]]),
    # Sokak: kapıdan fırlayış + koşu (tek plan), kalabalık, kadın
    ("ARA", .5, "sokak", KOS),
    P(32.60, 35.00, "sokak", **KOS),
    P(35.00, 36.70, "sokak", mod="kalabalik", cek=T(35.55), sakla=T(35.25), x0=342, hiz=1260, z=[1.0, 1.06], c=[[540, 1180], [560, 1180]]),
    P(36.70, 38.05, "sokak", mod="kadin", z=[1.0, 1.06], c=[[540, 960], [540, 940]]),
    # Tefeci: neon yanar; alt açı; omuz üstü konuşma; kıkırtı + altın diş
    ("ARA", .4, "kavsak", DUK),
    P(38.05, 40.10, "kavsak", **DUK),
    P(40.10, 42.20, "kavsak", mod="tefeci", z=[1.0, 1.08], c=[[540, 1000], [540, 950]]),
    P(42.20, 44.60, "kavsak", mod="konus", kaldir=T(42.35), z=[1.0, 1.06]),
    P(44.60, 47.10, "kavsak", mod="gulus", kikir=T(44.82), z=[1.0, 1.1], c=[[540, 980], [540, 1000]]),
    # Durak: hızlı çevirme, uyuyan adam, rozet, bilek (60 yıl)
    ("ARA", .6, "kavsak", dict(mod="whip", sure=.45, z=[1.75, 1.75], c=[[540, 960], [540, 960]])),
    P(47.10, 49.10, "kavsak", mod="durak", z=[1.75, 1.85], c=[[540, 960], [540, 960]]),
    P(49.10, 50.30, "kavsak", mod="rozet", parla=T(49.30), z=[1.0, 1.08], c=[[540, 960], [560, 940]]),
    P(50.30, 52.30, "kavsak", mod="bilek", z=[1.0, 1.16], c=[[540, 1060], [520, 1110]]),
    # İkilem: kavşağın tamamı, ortada siz; ardından kayıt işareti ("izlenir")
    P(52.30, 57.40, "kavsak", mod="ikilem", z=[1.28, 1.12], c=[[360, 1150], [640, 1190]], kirmizi=.5),
    P(57.40, 60.50, "kavsak", mod="isaret", z=[1.05, 1.3], c=[[540, 1060], [470, 1120]]),
    ("ARA", .8, "yuz", YUZS),
    # Son vuruş: 00:00:30; üç hızlı kesme
    P(60.50, 61.75, "vurus", z=[1.0, 1.12], c=[[540, 1000], [520, 990]], kirmizi=1),
    ("ARA", .4, "kavsak", dict(mod="kapi", z=[2.4, 2.6], c=[[190, 1220], [200, 1220]], kirmizi=.6)),
    ("ARA", .4, "kavsak", dict(mod="kay", z=[1.1, 1.2], c=[[540, 1060], [520, 1100]], kirmizi=.6)),
    ("ARA", .4, "yuz", dict(YUZS, z=[1.15, 1.3], goz=1.7)),
    # Seçim: bölünmüş ekran; "bir mi" -> sayaç; sıfırda donma
    P(61.75, 70.19, "secim", v1=[T(62.07), T(63.32)], v2=[T(63.52), T(65.07)], b1=T(65.39), b2=T(66.14), **SEC),
    ("ARA", 2.0, "secim", dict(son_karartma=.8, **SEC)),
]


def zaman_cizelgesi():
    satirlar, t = [], 0.0
    for i, (a, b, sahne, prm) in enumerate(PLANLAR):
        if a == "ARA":
            son = t + b
        else:
            sonraki_ara = i + 1 < len(PLANLAR) and PLANLAR[i + 1][0] == "ARA"
            son = T(b, sonra=not sonraki_ara)
        satirlar.append(dict(bas=round(t, 4), son=round(son, 4), sahne=sahne, prm=prm))
        t = son
    return satirlar


# ------------------------------------------------------------------ SES ARAÇLARI (Hayatta Kalma'dan)
def ffmpeg(*args):
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", *args], check=True)


def yukle(af=None):
    out = os.path.join(GECICI, "tmp.f32")
    args = ["-i", SES, "-ac", "1", "-ar", str(SR)]
    if af:
        args += ["-af", af]
    ffmpeg(*args, "-f", "f32le", out)
    return np.fromfile(out, np.float32).astype(np.float64)


def zaman(d):
    return np.arange(max(1, int(d * SR))) / SR


def alcak(x, fc, taps=511):
    n = np.arange(taps) - (taps - 1) / 2
    k = np.sinc(2 * fc / SR * n) * np.hamming(taps)
    return np.convolve(x, k / k.sum(), mode="same")


def bant(x, f0, f1):
    return alcak(x, f1) - alcak(x, f0)


def zarf(n, a=0.01, r=0.05):
    e = np.ones(n)
    na, nr = max(1, min(n, int(a * SR))), max(1, min(n, int(r * SR)))
    e[:na] *= np.linspace(0, 1, na)
    e[-nr:] *= np.linspace(1, 0, nr)
    return e


def ekle(mix, t0, sig, kazanc=1.0):
    i = int(t0 * SR)
    if i < 0:
        sig, i = sig[-i:], 0
    j = min(len(mix), i + len(sig))
    if i < j:
        mix[i:j] += sig[: j - i] * kazanc


def ekle2(L, R, t0, sig, kaz=1.0, pan=0.0):
    """Stereo ekleme; pan -1 (sol) .. 1 (sağ)."""
    ekle(L, t0, sig, kaz * min(1.0, 1 - pan))
    ekle(R, t0, sig, kaz * min(1.0, 1 + pan))


def gurultu(d, seed):
    return np.random.default_rng(seed).standard_normal(int(d * SR))


def gumbur(d=2.2):
    t = zaman(d)
    ph = 2 * np.pi * np.cumsum(38 + 50 * np.exp(-t * 6)) / SR
    return np.sin(ph) * np.exp(-t * 2.0) + alcak(np.random.randn(len(t)), 260) * np.exp(-t * 8) * 2.5


def kalp():
    t = zaman(0.2)
    return np.sin(2 * np.pi * 52 * t) * np.exp(-t * 24)


def ped(d, notalar, parlak=1400):
    t = zaman(d)
    s = np.zeros(len(t))
    for i, f in enumerate(notalar):
        for det in (-0.12, 0.0, 0.12):
            ph = 2 * np.pi * f * 2 ** (det / 12) * t + i
            s += sum(np.sin(h * ph) / h for h in range(1, 7))
    return alcak(s / (3 * len(notalar)), parlak)


def klik(f=3000, d=0.03):
    t = zaman(d)
    return (np.sin(2 * np.pi * f * t) + np.random.randn(len(t)) * .5) * np.exp(-t * 200)


def yukselis(d, f0=180, f1=900):
    t = zaman(d)
    k = (t / t[-1]) ** 2
    n = np.random.randn(len(t))
    return (n - alcak(n, 1800)) * k * .7 + np.sin(2 * np.pi * np.cumsum(f0 + (f1 - f0) * k) / SR) * k * .5


def nefes(d=1.4, sert=False):
    t = zaman(d)
    n = np.random.randn(len(t))
    e = np.sin(np.pi * t / d) ** 2 if not sert else np.exp(-((t - .12) / .09) ** 2) + .25 * np.exp(-t * 3)
    return bant(n, 300, 2200) * e


def piyano(f, d=2.6):
    t = zaman(d)
    s = sum(np.sin(2 * np.pi * f * h * t * (1 + .0006 * h)) * np.exp(-t * (1.1 + h * .9)) / h ** 1.3 for h in range(1, 7))
    return s * zarf(len(t), .004, .4)


def tik():
    return klik(2600, .025) * .8 + klik(1300, .025) * .4


def yanki(x, gec=((.09, .5), (.19, .32), (.31, .2), (.46, .12), (.64, .07))):
    y = np.zeros(len(x) + int(gec[-1][0] * SR) + 1)
    y[:len(x)] += x
    for d, a in gec:
        i = int(d * SR)
        y[i:i + len(x)] += x * a
    return y


def hisirti(d=.5, seed=0):
    t = zaman(d)
    n = np.random.default_rng(seed).standard_normal(len(t))
    am = np.clip(np.abs(alcak(np.random.default_rng(seed + 1).standard_normal(len(t)), 18, 301)) * 6, 0, 1)
    return bant(n, 700, 5000) * am * zarf(len(t), .05, .15)


# --- Saat'e özel efektler
def yagmur(d, seed=1, ic=False):
    """Yağmur: geniş bantlı hışırtı + seyrek iri damlalar. ic=True: camın ardından, boğuk."""
    r = np.random.default_rng(seed)
    t = zaman(d)
    n = r.standard_normal(len(t))
    s = bant(n, 400, 9000) * .6 + alcak(n, 500) * .5
    s *= .8 + .2 * np.sin(2 * np.pi * t / 5.3 + seed)
    tt = zaman(.02)
    for _ in range(int(d * 40)):
        ekle(s, r.random() * d, np.sin(2 * np.pi * r.uniform(1500, 4500) * tt) * np.exp(-tt * 260), r.uniform(.3, 1.2))
    return alcak(s, 1400) * 1.3 if ic else s


def neon_vizilti(d, seed=0):
    t = zaman(d)
    s = sum(np.sin(2 * np.pi * 100 * h * t) / h ** 1.2 for h in range(1, 9))
    buzz = bant(np.random.default_rng(seed).standard_normal(len(t)), 2000, 7000) * (np.sin(2 * np.pi * 100 * t) > .6) * .5
    return (s * .25 + buzz) * (.85 + .15 * np.sin(2 * np.pi * .7 * t))


def zzt(seed=0):
    """Neonun yanarken çıkardığı kesik cızırtı."""
    r = np.random.default_rng(seed)
    s = np.zeros(int(.5 * SR))
    for k in range(5):
        d = .03 + r.random() * .06
        ekle(s, k * .09 + r.random() * .03, neon_vizilti(d, k) * zarf(int(d * SR), .002, .01) * 2.2)
    return s


def okuyucu_bip():
    t = zaman(.22)
    return (np.sin(2 * np.pi * 1760 * t) * (t < .09) + np.sin(2 * np.pi * 2350 * t) * (t > .11)) * zarf(len(t), .003, .02)


def zil():
    """Dükkân kapısının zili."""
    t = zaman(1.4)
    return sum(np.sin(2 * np.pi * f * t) * np.exp(-t * (3 + i)) / (i + 1) for i, f in enumerate((2093, 2637, 3136, 4186)))


def kapi_carpma():
    t = zaman(.8)
    n = np.random.randn(len(t))
    s = alcak(n, 600) * np.exp(-t * 14) * 2 + np.sin(2 * np.pi * 70 * t) * np.exp(-t * 10)
    ekle(s, 0, klik(1200, .04), .6)
    return s


def adim_su(seed=0):
    t = zaman(.18)
    n = np.random.default_rng(seed).standard_normal(len(t))
    return bant(n, 300, 6000) * np.exp(-t * 26) + np.sin(2 * np.pi * 90 * t) * np.exp(-t * 40) * .5


def alarm():
    """Bilek alarmı: tiz, kısa çift bip."""
    t = zaman(.07)
    b = np.sin(2 * np.pi * 2900 * t) * zarf(len(t), .003, .01)
    s = np.zeros(int(.2 * SR))
    ekle(s, 0, b)
    ekle(s, .11, b)
    return s


def vinn(d, f0=200, f1=1600):
    """Zaman çekilirken yükselen ton."""
    t = zaman(d)
    k = (t / t[-1]) ** 1.5
    ph = 2 * np.pi * np.cumsum(f0 + (f1 - f0) * k) / SR
    return (np.sin(ph) + .4 * np.sin(2 * ph + .3) + .2 * np.sin(3.01 * ph)) * (.4 + .6 * k) * zarf(len(t), .05, .08)


def whoosh(d=.45, seed=3):
    t = zaman(d)
    n = np.random.default_rng(seed).standard_normal(len(t))
    e = np.sin(np.pi * t / d) ** 2
    return (bant(n, 300, 3000) + bant(n, 3000, 9000) * .5) * e


def kalabalik(d, seed=5):
    """Uzaktan uğuldayan kalabalık."""
    r = np.random.default_rng(seed)
    t = zaman(d)
    s = np.zeros(len(t))
    for k in range(6):
        n = r.standard_normal(len(t))
        f = r.uniform(300, 900)
        am = np.clip(np.abs(alcak(r.standard_normal(len(t)), 4, 301)) * 5, 0, 1)
        s += bant(n, f * .7, f * 1.6) * am
    return s / 3


def horlama(d, seed=8):
    t = zaman(d)
    n = np.random.default_rng(seed).standard_normal(len(t))
    e = np.clip(np.sin(2 * np.pi * t / 2.6), 0, 1) ** 2
    return (bant(n, 80, 600) * .8 + np.sin(2 * np.pi * 60 * t) * .2) * e


def kagit(d=.5, seed=0):
    return hisirti(d, seed) * 1.4 + bant(gurultu(d, seed + 9)[:int(d * SR)], 3000, 9000) * zarf(int(d * SR), .05, .1) * .4


def bas_kirli(d, f=55):
    """Tefecinin kirli bas notası: kıpırdayan testere dalga."""
    t = zaman(d)
    ph = 2 * np.pi * f * t * (1 + .004 * np.sin(2 * np.pi * .3 * t))
    s = sum(np.sin(h * ph) / h for h in range(1, 14))
    return alcak(np.tanh(s * 1.8), 900) * zarf(len(t), .4, .6)


def ses_olustur():
    print("Ses hazırlanıyor...", flush=True)
    orta = yukle()
    # kayıtta kısık kalan yerler: tefecinin repliği (ayrı ses, ~10 dB kısık) ve "Saat dokuza geliyor. Dönmedi."
    for a, b, g in ((42.25, 47.0, 3.0), (29.40, 32.50, 1.5)):
        i, j, k = int(a * SR), int(b * SR), int(.03 * SR)
        e = np.ones(j - i) * g
        e[:k] = np.linspace(1, g, k)
        e[-k:] = np.linspace(g, 1, k)
        orta[i:j] *= e
    parcalar, onceki = [], 0
    for q, g in BOSLUKLAR:
        i = min(len(orta), int(q * SR))
        parcalar += [orta[onceki:i], np.zeros(int(g * SR))]
        onceki = i
    s = np.concatenate(parcalar + [orta[onceki:]])
    toplam = len(s) / SR

    fL, fR, mL, mR = (np.zeros(len(s)) for _ in range(4))
    np.random.seed(12)
    rr_ = np.random.default_rng(4)
    dn = T(DONMA)

    # --- Tik: sayaç her tam saniyeye indiğinde (anıda ve "durur" sessizliğinde yok)
    ani0, ani1 = T(16.75), T(19.00)
    sus0, sus1 = T(DURUR), T(14.45, True)
    onceki = None
    for i in range(int(dn * 1000)):
        t = i / 1000
        v = int(np.ceil(sayac(t)))
        if onceki is not None and v != onceki and not (ani0 <= t < ani1) and not (sus0 <= t < sus1):
            ic = t < T(32.60)
            ekle2(fL, fR, t, alcak(tik(), 3500) if ic else tik(), .1 if t < T(60.5) else .14)
            if sayac(t) < 60 and t >= T(50.30):
                ekle2(fL, fR, t + .02, alarm(), .04 if t < T(61.75) else .06, pan=-.1)
        onceki = v
    # Kalp atışı: ilk karede tok vuruş; tempo bölüm boyunca yükselir
    ekle2(fL, fR, 0, alcak(gumbur(1.4), 300), .15)
    tv = .9
    while tv < dn:
        if not (ani0 <= tv < ani1) and not (sus0 <= tv < sus1):
            g = .06 + .1 * min(1, tv / dn)
            ekle2(fL, fR, tv, kalp(), g)
            ekle2(fL, fR, tv + .2, kalp(), g * .6)
        tv += .9 - .38 * min(1, tv / dn)

    # --- İçerisi: camın ardında yağmur, uzak tramvay; kapı çarpınca dışarısı
    d0, d1 = 0, T(32.60)
    yi = yagmur(d1 - d0, 1, ic=True)
    ekle2(fL, fR, d0, yi * zarf(len(yi), .3, .1), .09, pan=-.2)
    tr = alcak(gurultu(3.0, 77), 180) * np.sin(np.pi * zaman(3.0) / 3.0) ** 2
    ekle2(fL, fR, T(6.0), tr, .2, pan=.5)
    # Pencereden şehre çıkış: yağmur açılır, neon vızıltısı, uzaktan şehir
    a_, b_ = T(5.05), T(14.45, True)
    yd = yagmur(b_ - a_, 2)
    ekle2(fL, fR, a_, yd * zarf(len(yd), 1.5, .2), .065)
    nv = neon_vizilti(b_ - a_, 3)
    ekle2(fL, fR, a_, alcak(nv, 2500) * zarf(len(nv), 1.0, .2), .015, pan=.3)
    ekle2(fL, fR, T(10.05), okuyucu_bip(), .12, pan=.3)
    ekle2(fL, fR, T(10.15), vinn(.8, 900, 600)[::-1] * .4, .04, pan=.3)
    # "Kalbiniz durur": sönen bilek; sonra bir saniye her şey susar
    ekle2(fL, fR, T(DURUR), alcak(gumbur(1.0), 200), .1)
    # --- Morluk, anı: boğuk uğultu + yükselen çekilme tonu
    ekle2(fL, fR, T(14.45, True), hisirti(.4, 3), .06)
    ad = alcak(gurultu(ani1 - ani0, 44), 200) * 1.4
    ekle2(fL, fR, ani0, ad * zarf(len(ad), .2, .2), .14)
    v_ = vinn(ani1 - T(17.2) - .1, 220, 1500)
    ekle2(fL, fR, T(17.2) + .1, v_, .045, pan=.25)
    ekle2(fL, fR, T(17.2), alcak(klik(900, .06), 2000), .25, pan=.2)
    ekle2(fL, fR, ani1, yukselis(.3, 1500, 300)[::-1], .05)
    # --- Not: kâğıt, duvar saati, tek piyano notası, nefes (kayıtta)
    ekle2(fL, fR, T(22.85), kagit(.5, 4), .14, pan=-.2)
    ekle2(fL, fR, T(23.8), kagit(.35, 5), .1, pan=-.1)
    ekle2(mL, mR, T(23.85), piyano(110, 4.5), .09)
    ekle2(mL, mR, T(27.05), piyano(130.8, 4.0), .06)
    for x in np.arange(T(29.15, True), T(32.60), 1.0):
        ekle2(fL, fR, x + .5, klik(1900, .02), .05, pan=.2)
    ekle2(fL, fR, T(31.95), klik(1500, .05) + klik(700, .05), .2)
    # --- Kapı + koşu: dışarının yağmuru, adımlar, nefes
    o0, o1 = T(32.60), T(38.05)
    ekle2(fL, fR, o0 + .05, kapi_carpma(), .35, pan=-.3)
    yd = yagmur(T(DONMA) - o0, 6)
    yk = np.ones(len(yd)) * .085

    def aralik(a, b, deger):
        yk[int((a - o0) * SR):int((b - o0) * SR)] = deger
    aralik(T(40.10), T(47.10), .055)
    aralik(T(60.50, True), T(61.75), .045)
    yk = np.convolve(yk, np.ones(8820) / 8820, mode="same")
    ekle2(fL, fR, o0, yd * yk, 1.0)
    tv, k = o0 + .25, 0
    while tv < T(35.0):
        ekle2(fL, fR, tv, adim_su(k), .2, pan=-.2 if k % 2 else .2)
        tv += 1 / 3.0
        k += 1
    for x in (T(33.4), T(34.4)):
        ekle2(fL, fR, x, nefes(.5, sert=True), .1)
    kl = kalabalik(o1 - T(35.0), 5)
    ekle2(fL, fR, T(35.0), kl * zarf(len(kl), .3, .3), .05)
    ekle2(fL, fR, T(35.55), hisirti(.3, 12), .14, pan=.3)
    # --- Tefeci: neon cızırtısı ve vızıltı (solda), kapı zili, kirli bas
    ekle2(fL, fR, T(38.05) + .15, zzt(2), .08, pan=-.4)
    nv = neon_vizilti(T(47.10) - T(38.05), 4)
    ekle2(fL, fR, T(38.05) + .5, nv * zarf(len(nv), .3, .3), .025, pan=-.45)
    ekle2(fL, fR, T(40.10), zil(), .09, pan=-.3)
    bk = bas_kirli(T(47.10) - T(40.10) + 1.0)
    ekle2(mL, mR, T(40.10), bk, .035)
    # --- Durak: hızlı çevirme, cam saçağa vuran yağmur ve horlama (sağda), alarm (sayaçla)
    ekle2(fL, fR, T(47.10), whoosh(.5), .2, pan=.3)
    hr = horlama(T(52.30) - T(47.10, True), 8)
    ekle2(fL, fR, T(47.10, True), hr, .045, pan=.45)
    for i in range(int((T(52.3) - T(47.1)) * 10)):
        ekle2(fL, fR, T(47.1) + i * .1 + rr_.random() * .08, klik(3500 + 1500 * rr_.random(), .015), .025, pan=.5)
    ekle2(fL, fR, T(49.30), piyano(1046.5, 1.5) * .5, .04, pan=.3)
    # --- İkilem: iki nota solda ve sağda gidip gelir (tefeci / durak)
    i0, i1 = T(52.30), T(60.50)
    tv, k = i0, 0
    while tv < i1:
        f, pn = (110, -.7) if k % 2 == 0 else (116.5, .7)
        ekle2(mL, mR, tv, piyano(f, 2.0), .05, pan=pn)
        ekle2(mL, mR, tv, piyano(f * 2, 1.4), .02, pan=pn)
        tv += .95
        k += 1
    ekle2(fL, fR, T(60.29) + .03, alcak(gumbur(1.2), 260), .3)   # "izlenir" kelimesinin hemen ardından
    # --- Son vuruş: sesler çekilir; üç kesmede vınlama
    for x in (T(61.75), T(61.75) + .4, T(61.75) + .8):
        ekle2(fL, fR, x - .03, bant(gurultu(.14, int(x * 100)), 1500, 8000) * np.exp(-zaman(.14) * 22), .08)
    ekle2(fL, fR, T(61.75) + .4, zil() * .4, .05, pan=-.4)

    # --- Müzik: karanlık ped (La minör), son bölümde gerilim
    for a_, b_, notalar, kz in [(T(5.05), T(14.45), [55, 65.4, 82.4], .022), (T(14.45, True), T(32.6), [55, 61.7, 82.4], .02),
                                (T(32.6), T(40.1), [58.3, 69.3, 87.3], .022), (T(47.1), T(52.3), [55, 65.4, 77.8], .022),
                                (T(52.3), T(60.5), [51.9, 61.7, 77.8], .02), (T(61.75, True), dn, [55, 65.4, 82.4, 98], .03)]:
        pd = ped(b_ - a_, notalar, 1000)
        ekle2(mL, mR, a_, pd * zarf(len(pd), .6, .2), kz)
    sc0 = T(61.75, True)
    ekle2(fL, fR, sc0, yukselis(dn - sc0, 90, 520), .05)
    for x, f in ((T(65.39), 880), (T(66.14), 988)):
        t_ = zaman(.5)
        ekle2(fL, fR, x, np.sin(2 * np.pi * f * t_) * np.exp(-t_ * 7), .07)

    # "Kalbiniz durur" ve son vuruş: dünya susar
    sus = np.ones(len(s))
    sus[int((T(DURUR) + .25) * SR):int(T(14.45, True) * SR)] = .06
    sus[int(T(60.50, True) * SR):int((T(61.75) + 1.2) * SR)] = .35
    sus = np.convolve(sus, np.ones(6615) / 6615, mode="same")
    for b in (fL, fR, mL, mR):
        b *= sus
    # Kapanış: sıfırda her şey kesilir; siyahta tek bir tik
    ekle2(fL, fR, dn, alcak(gumbur(1.4), 400), .5)
    for b in (fL, fR, mL, mR):
        b[int((dn + .02) * SR):] = 0
    ekle2(fL, fR, toplam - 1.0, tik(), .16)

    # Anlatım üstünde efekt ve müziği kıs (ducking): ses zarfına göre
    def kaygan(x, n):
        c = np.cumsum(np.concatenate([np.zeros(n // 2), x, np.zeros(n - n // 2)]))
        return (c[n:] - c[:-n]) / n
    zarf_ = kaygan(np.abs(s), 2205)
    esik = np.percentile(zarf_[zarf_ > 1e-4], 70) * .45
    d = np.clip(zarf_ / esik, 0, 1)
    d = kaygan(kaygan(d, 6615), 6615)[:len(s)]
    fL *= 1 - .72 * d
    fR *= 1 - .72 * d
    mL *= 1 - .5 * d
    mR *= 1 - .5 * d

    if "--analiz" in sys.argv:   # cümle cümle ses/efekt oranı için ham parçaları sakla
        np.save(os.path.join(GECICI, "anlatim.npy"), s.astype(np.float32))
        np.save(os.path.join(GECICI, "efekt.npy"), ((fL + fR) / 2 + (mL + mR) / 2).astype(np.float32))

    L, R = s + fL + mL, s + fR + mR
    tepe = max(np.max(np.abs(L)), np.max(np.abs(R)))
    mix = np.stack([L, R], 1) / tepe * .95
    ham = os.path.join(GECICI, "mix.f32")
    mix.astype(np.float32).tofile(ham)
    wav = os.path.join(GECICI, "ses_mix.wav")
    ffmpeg("-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", ham, wav)
    print(f"Ses süresi: {toplam:.2f} sn", flush=True)
    return wav, toplam, s


def agiz_zarfi(s):
    """Tefecinin konuştuğu aralıkta (Bir gün veririm … başlamıştı) ağız açıklığı, 30 fps."""
    a, b, fps = T(42.20), T(47.10), 30
    d = []
    for i in range(int((b - a) * fps)):
        t = a + i / fps
        w = s[int(t * SR):int((t + 1 / fps) * SR)]
        d.append(float(np.sqrt(np.mean(w ** 2))) if len(w) else 0.0)
    d = np.array(d)
    d = np.clip((d - .01) / (np.percentile(d, 90) + 1e-6), 0, 1)
    d = np.convolve(d, [.25, .5, .25], mode="same")
    # kıkırtıda ağız gülümsemeye döner (sahne gül parametresiyle), konuşmadığı yerde kapanır
    return dict(bas=round(a, 4), fps=fps, d=[round(float(x), 3) for x in d])


if __name__ == "__main__":
    if "--sadece-plan" in sys.argv:
        wav, toplam = os.path.join(GECICI, "ses_mix.wav"), T(70.19, True)
        s = np.zeros(int(toplam * SR))
    else:
        wav, toplam, s = ses_olustur()
    planlar = zaman_cizelgesi()
    with open(os.path.join(B1, "zaman.json"), "w", encoding="utf-8") as f:
        json.dump(dict(toplam=toplam, ses=wav, cikti=CIKTI, planlar=planlar, sayac=[[round(a, 4), round(v, 4)] for a, v in SAYAC],
                       agiz=agiz_zarfi(s), hudBas=round(HUD_BAS, 4)), f, ensure_ascii=False)
    for pl in planlar:
        print(f"  {pl['bas']:6.2f}-{pl['son']:6.2f}  {pl['sahne']} {pl['prm'].get('mod', '')}")
    if "--sadece-ses" in sys.argv or "--sadece-plan" in sys.argv:
        sys.exit()
    mod = ["onizleme", json.dumps([round((p["bas"] + p["son"]) / 2, 3) for p in planlar])] if "--onizleme" in sys.argv else ["video"]
    subprocess.run(["node", "render.js", *mod], cwd=B1, check=True)
