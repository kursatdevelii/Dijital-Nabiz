/* Saat B1 - çekirdek (Hayatta Kalma'dan): yardımcılar, kamera, karakter katmanı.
   Dünya koordinatları = 1080x1920 ekran; kamera katman() ile yaklaşır/kayar. */
const W = 1080, H = 1920;
const cv = document.getElementById('c'), X = cv.getContext('2d');
const off = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
const KL = off(W, H), KX = KL.getContext('2d');   // karakter katmanı (ayrı ışıklandırılır)
const TMP = off(W, H), TX = TMP.getContext('2d');

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => { t = clamp(t); return t * t * (3 - 2 * t); };
const easeOut = t => 1 - Math.pow(1 - clamp(t), 3);
const easeIn = t => Math.pow(clamp(t), 2.2);
function rng(s) { return () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const hx = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgba = (h, a = 1) => { const [r, g, b] = hx(h); return `rgba(${r},${g},${b},${a})`; };
const carp = (h, m) => '#' + hx(h).map((v, i) => clamp(Math.round(v * m[i]), 0, 255).toString(16).padStart(2, '0')).join('');
const mixc = (a, b, t) => { const A = hx(a), B = hx(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(t))).toString(16).padStart(2, '0')).join(''); };
function lg(c, x0, y0, x1, y1, stops) { const g = c.createLinearGradient(x0, y0, x1, y1); for (const [o, col] of stops) g.addColorStop(o, col); return g; }
function rg(c, x, y, r0, r1, stops) { const g = c.createRadialGradient(x, y, r0, x, y, r1); for (const [o, col] of stops) g.addColorStop(o, col); return g; }
function isik(c, x, y, r, renk, a, mod = 'screen') {
  if (a <= 0 || r <= 0) return;
  c.save(); c.globalCompositeOperation = mod;
  const g = c.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, rgba(renk, a)); g.addColorStop(1, rgba(renk, 0));
  c.fillStyle = g; c.fillRect(x - r, y - r, 2 * r, 2 * r); c.restore();
}
function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, Math.max(0, Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2))); }
function kapsul(c, x1, y1, x2, y2, w, renk) { c.strokeStyle = renk; c.lineWidth = w; c.lineCap = 'round'; c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); }
function elips(c, x, y, rx, ry, renk, rot = 0) { c.fillStyle = renk; c.beginPath(); c.ellipse(x, y, Math.max(.1, rx), Math.max(.1, ry), rot, 0, Math.PI * 2); c.fill(); }
function poly(c, pts, renk) {   // renk verilmezse geçerli dolgu rengiyle doldurur; null: sadece yol
  c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]); c.closePath();
  if (renk !== null) { if (renk) c.fillStyle = renk; c.fill(); }
}
function gurultu(w, h, seed, ton = 128, genlik = 60) {
  const c = off(w, h), x = c.getContext('2d'), d = x.createImageData(w, h), r = rng(seed);
  for (let i = 0; i < w * h; i++) { const v = ton + (r() - .5) * 2 * genlik; d.data[i * 4] = d.data[i * 4 + 1] = d.data[i * 4 + 2] = v; d.data[i * 4 + 3] = 255; }
  x.putImageData(d, 0, 0); return c;
}
const GREN = [1, 2, 3, 4].map(s => gurultu(540, 960, s, 128, 70));
const DOKU = gurultu(256, 256, 9, 128, 45);
function doku(c, x, y, w, h, a) { c.save(); c.globalAlpha = a; c.globalCompositeOperation = 'overlay'; c.fillStyle = c.createPattern(DOKU, 'repeat'); c.fillRect(x, y, w, h); c.restore(); }
const VIG = off(W, H);
{ const v = VIG.getContext('2d'); const g = v.createRadialGradient(540, 960, 420, 540, 960, 1200); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.55)'); v.fillStyle = g; v.fillRect(0, 0, W, H); }
const RENK = 'saturate(1.25) brightness(1.07) contrast(1.07)';   // genel renk düzenlemesi: yağmurlu neon, karanlıkta bile canlı
function yaz(c, metin, x, y, font, renk, o = {}) {   // gölgeli metin
  c.save(); c.font = font; c.textAlign = o.hiza || 'center'; c.textBaseline = 'middle';
  if (o.aralik) c.letterSpacing = o.aralik;
  if (o.golge !== false) { c.shadowColor = o.golgeRenk || 'rgba(0,0,0,.7)'; c.shadowBlur = o.blur ?? 14; }
  c.fillStyle = renk; c.fillText(metin, x, y); c.restore();
}

/* ------------------------------------------------------------ kamera */
let PANEL_DY = 0;   // seçim ekranında sahneyi üst/alt panele kaydırır
function katman(c, k, f = 1) {
  const z = 1 + (k.z - 1) * f;
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.translate(W / 2 + k.sx * f, H / 2 + PANEL_DY + k.sy * f);
  if (k.r) c.rotate(k.r * f);
  c.scale(z, z);
  c.translate(-(W / 2 + (k.x - W / 2) * f), -(H / 2 + (k.y - H / 2) * f));
}
function kamera(s, t, u) {
  const p = s.prm, e = ease(u);
  let z = p.z ? lerp(p.z[0], p.z[1], e) : 1;
  const c0 = p.c ? p.c[0] : [540, 960], c1 = p.c ? p.c[1] : c0;
  let x = lerp(c0[0], c1[0], e), y = lerp(c0[1], c1[1], e), sx = 0, sy = 0, r = p.egim || 0;
  const a = p.el || 0;
  if (a) {
    sx += a * (Math.sin(t * 1.7 + 1) + .6 * Math.sin(t * 3.3) + .3 * Math.sin(t * 7.1 + 2)) / 1.9;
    sy += a * (Math.cos(t * 1.4) + .6 * Math.sin(t * 3.9 + 1) + .3 * Math.cos(t * 6.3)) / 1.9;
    r += a * .0009 * Math.sin(t * 1.1 + .5);
  }
  const sr = p.sars || 0;   // uçak sarsıntısı: yüksek frekanslı titreme
  if (sr) {
    sx += sr * 7 * (Math.sin(t * 41) + .7 * Math.sin(t * 67 + 1) + .5 * Math.sin(t * 23 + 2));
    sy += sr * 9 * (Math.sin(t * 37 + .4) + .7 * Math.sin(t * 59) + .5 * Math.sin(t * 19 + 1));
    r += sr * .0035 * Math.sin(t * 29);
  }
  for (const tv of (p.vur || [])) if (t >= tv && t < tv + .7) {
    const d = t - tv; sx += 16 * Math.exp(-d * 11) * Math.sin(d * 70); sy += 24 * Math.exp(-d * 11) * Math.sin(d * 55);
    z *= 1 + .03 * Math.exp(-d * 9);
  }
  return { x, y, z, r, sx, sy };
}
function isiklandir(c, isiklar) {   // karakter katmanına (source-atop) renkli ışık
  c.save(); c.globalCompositeOperation = 'source-atop';
  for (const L of isiklar) {
    if (L.a <= 0) continue;
    if (L.duz) { c.globalCompositeOperation = 'source-atop'; c.fillStyle = rgba(L.renk, L.a); c.fillRect(-4000, -4000, 9000, 9000); continue; }
    const g = c.createRadialGradient(L.x, L.y, 0, L.x, L.y, L.r); g.addColorStop(0, rgba(L.renk, L.a)); g.addColorStop(1, rgba(L.renk, 0));
    c.fillStyle = g; c.fillRect(L.x - L.r, L.y - L.r, 2 * L.r, 2 * L.r);
  }
  c.restore();
}
let SAYAC_Q = [];   // karakter katmanındaki koldaki sayaçlar: renkli ışık rakamları boyamasın diye en son, ışığın üstüne çizilir
function karakterBasla(k) { SAYAC_Q = []; KX.setTransform(1, 0, 0, 1, 0, 0); KX.clearRect(0, 0, W, H); katman(KX, k, 1); }
function karakterBas(alfa = 1) {
  for (const q of SAYAC_Q) { KX.save(); KX.setTransform(q.m); sayacCiz(KX, ...q.arg); KX.restore(); }
  SAYAC_Q = [];
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = alfa; X.drawImage(KL, 0, 0); X.restore();
}

/* ------------------------------------------------------------ parçacıklar */
const TOZ = (() => { const r = rng(17), a = []; for (let i = 0; i < 160; i++) a.push({ x: r() * 1300 - 110, y: r() * 2100 - 90, z: .4 + r() * .9, v: r() * 6.28 }); return a; })();
function tozCiz(c, t, renk, yogun, bolge, hiz = 1) {
  for (const d of TOZ) {
    const x = ((d.x + t * 14 * d.z * hiz + Math.sin(t * .7 + d.v) * 20) % 1300 + 1300) % 1300 - 110;
    const y = ((d.y - t * 9 * d.z * hiz) % 2100 + 2100) % 2100 - 90;
    let a = (.35 + .65 * Math.abs(Math.sin(t * 1.3 + d.v))) * yogun;
    if (bolge) a *= bolge(x, y);
    if (a > .02) isik(c, x, y, 3 + d.z * 4, renk, a, 'screen');
  }
}
