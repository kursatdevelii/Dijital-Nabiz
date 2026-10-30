/* Saat - karakterler. SEN bu seriye özel yeni bir yüz (Radyasyon / Hayatta Kalma'daki SEN değil):
   esmer, geniş ve köşeli çene, yanları sıfıra yakın (undercut) mavi-siyah saç, alnına düşen bir tutam, sol kaşında yarık,
   sol kulağında gümüş halka. Kıyafet: solmuş hardal sarısı iş ceketi (kollar dirseğe kadar sıvalı), siyah tişört,
   gri iş pantolonu, siyah bot. Sol bileğin iç yüzünde sayaç.
   Ölçü (önden kafa): genişlik ~210 birim, kafa merkezi orijin, çene ~y 138. Tam boy figürlerde kafa .6 ölçekli. */
const TABAN = { ten: '#b9805a', tenG: '#93603f', tenK: '#5b3723', sac: '#120f17', sacA: '#4a4566', fade: '#34292f',
  beyaz: '#f0ebe4', iris: '#6e4316', kirpik: '#0c0909', dudak: '#86493a',
  ceket: '#d19d2f', ceketG: '#a8791e', ceketK: '#5e4311', ceketA: '#f3cd66', tisort: '#1b1b22', tisortA: '#3a3a46',
  pant: '#3e434d', pantG: '#2b2e36', pantA: '#5d6370', bot: '#17130f', botA: '#45392e' };
function pal(m, taban = TABAN) { const o = {}; for (const k in taban) o[k] = carp(taban[k], m); return o; }
const PS = pal([1, 1, 1]);
const TEFECI = { ten: '#d6a786', tenG: '#ad7f60', tenK: '#6e4a36', sac: '#0b0a0d', sacA: '#6a6880', fade: '#1c1a20', beyaz: '#e8dfd0', iris: '#2e2218',
  kirpik: '#0c0909', dudak: '#8a4f45', palto: '#741b2f', paltoG: '#521223', paltoK: '#2b0711', paltoA: '#b23a57', gomlek: '#141116', altin: '#f6c64f' };
const KARDES = { ten: '#bf8763', tenG: '#986343', tenK: '#5f3925', sac: '#0e0b10', sacA: '#43395a', fade: '#2a2228', beyaz: '#f0ebe4', iris: '#5b3714',
  kirpik: '#0c0909', dudak: '#8c4c3c', hood: '#de3430', hoodG: '#a9231f', hoodK: '#68130f', hoodA: '#ff7a63' };
const ZENGIN = { ten: '#f2c9a8', tenG: '#d3a485', tenK: '#9a6e55', sac: '#c99d5c', sacA: '#f3dba0', fade: '#a8834c', beyaz: '#f3efe8', iris: '#3d6a8a',
  kirpik: '#5a3a22', dudak: '#c27a70', palto: '#f4f1ea', paltoG: '#d2ccc1', paltoK: '#8f897d', atki: '#2c42a0', atkiA: '#5873d6', altin: '#ffcf4a', pant: '#d9d4ca', ayak: '#3a2a20' };
const KADIN = { ten: '#8d5b3f', tenG: '#6f442d', tenK: '#43271a', sac: '#22140f', sacA: '#5a3a2c', fade: '#22140f', beyaz: '#efe8df', iris: '#2a1a10',
  kirpik: '#0c0909', dudak: '#9a4a48', yag: '#2a958b', yagG: '#1c6d66', yagK: '#0d3d39', yagA: '#5fd1c4' };

/* ---------------- sayaç: derinin altında parlayan rakamlar */
const SN_YIL = 31536000, SN_GUN = 86400;
const SAYAC_RENK = sn => sn >= SN_GUN ? '#3dffa0' : sn >= 600 ? '#ffb22e' : '#ff3636';
function sureYaz(sn) {
  sn = Math.max(0, Math.floor(sn));
  const y = Math.floor(sn / SN_YIL); sn -= y * SN_YIL;
  const g = Math.floor(sn / SN_GUN); sn -= g * SN_GUN;
  const hms = [3600, 60, 1].map(b => String(Math.floor(sn / b) % (b === 3600 ? 24 : 60)).padStart(2, '0')).join(':');
  if (y) return `${y} YIL · ${String(g).padStart(3, '0')} GÜN · ${hms}`;
  if (g) return `${String(g).padStart(2, '0')} GÜN · ${hms}`;
  return hms;
}
const DAMAR = (() => { const r = rng(31), a = []; for (let i = 0; i < 6; i++) { const s = i % 2 ? 1 : -1, y0 = s * (8 + r() * 14); a.push([s * (150 + r() * 40), y0, s * (260 + r() * 60), y0 + (r() - .5) * 30, s * (360 + r() * 80), y0 + (r() - .5) * 40]); } return a; })();
// o: renk, a (opaklık), sonuk (0..1), metin, font, morluk, halka, damar, kirp (genişlik sınırı), isaret (altın kayıt işareti 0..1), sabit (yanıp sönmez)
function sayacCiz(c, x, y, rot, s, sn, o = {}) {
  const renk = o.renk || SAYAC_RENK(sn);
  const fr = sn - Math.floor(sn), yan = sn < 60 && sn > 0 && !o.sabit ? .62 + .38 * Math.cos(2 * Math.PI * (1 - fr)) : 1;
  const a = (o.a ?? 1) * (1 - (o.sonuk || 0)) * (sn <= 0 && !o.metin ? 0 : 1);
  const metin = o.metin || sureYaz(sn), f = o.font || 64;
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s);
  c.font = `700 ${f}px Consolas`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.letterSpacing = `${f * .04}px`;
  const w = c.measureText(metin).width, sk = o.kirp && w > o.kirp ? o.kirp / w : 1, tw = w * sk, pw = tw + f * 1.0, ph = f * 1.3;
  if (a > 0) {   // deri altındaki ekran: koyu şerit + renkli kenar ışığı; rakamlar her zeminde okunur
    isik(c, 0, 0, f * 4.2, renk, .55 * a * yan);
    rr(c, -pw / 2, -ph / 2, pw, ph, f * .34); c.fillStyle = `rgba(14,3,9,${.66 * a})`; c.fill();
    c.shadowColor = renk; c.shadowBlur = f * .5 * yan; c.strokeStyle = rgba(renk, .7 * a * yan); c.lineWidth = f * .06; c.stroke(); c.shadowBlur = 0;
    rr(c, -pw / 2 + f * .1, -ph / 2 + f * .1, pw - f * .2, ph - f * .2, f * .26); c.fillStyle = rg(c, 0, 0, 0, pw * .6, [[0, rgba(renk, .2 * a * yan)], [1, rgba(renk, .04 * a)]]); c.fill();
  }
  if (o.morluk) {   // zorla çekilen zamanın izi: bileği saran dört parmak + karşı tarafta başparmak
    for (const [mx, my, mw, mh, mr] of [[-120, -30, 16, 22, .25], [-58, -32, 18, 24, .1], [6, -32, 18, 24, -.05], [66, -30, 15, 21, -.2], [-30, 30, 26, 12, 0]]) {
      c.fillStyle = rg(c, 0, 0, 0, 48, [[0, rgba('#3a1250', .85 * o.morluk)], [.55, rgba('#5a2266', .5 * o.morluk)], [1, rgba('#5a2266', 0)]]);
      c.save(); c.translate(mx, my); c.rotate(mr); c.scale(mw / 40, mh / 40); c.beginPath(); c.arc(0, 0, 48, 0, 7); c.fill(); c.restore();
    }
  }
  if (a > 0) {
    if (o.damar !== false) {   // ışık damarlar boyunca kola yayılır
      c.strokeStyle = rgba(renk, .26 * a * yan); c.lineWidth = 2.6; c.lineCap = 'round';
      for (const [x1, y1, cx, cy, x2, y2] of DAMAR) { const k = f / 64; c.beginPath(); c.moveTo(x1 * k, y1 * k); c.quadraticCurveTo(cx * k, cy * k, x2 * k, y2 * k); c.stroke(); }
    }
    if (o.halka) {   // zorla çekilmenin izi: şeridin kenarında nabız gibi atan ince halka (şeritten taşmaz)
      c.save(); c.shadowColor = renk; c.shadowBlur = f * .8 * o.halka; c.strokeStyle = rgba(renk, .55 * o.halka * a); c.lineWidth = f * .05;
      rr(c, -pw / 2 + f * .12, -ph / 2 + f * .12, pw - f * .24, ph - f * .24, f * .24); c.stroke(); c.restore();
    }
    c.save(); c.scale(sk, 1);
    c.shadowColor = renk; c.shadowBlur = f * .7; c.fillStyle = rgba(renk, a * yan); c.fillText(metin, 0, 2); c.fillText(metin, 0, 2);
    c.shadowBlur = f * .18; c.fillStyle = rgba(mixc(renk, '#ffffff', .72), .95 * a * yan); c.fillText(metin, 0, 2);
    c.restore();
    if (o.isaret) {   // Yukarı Şehir sayacı: rakamların yanında altın kayıt işareti
      const ix = tw / 2 + f * .95;
      isik(c, ix, 0, f * 1.4, '#ffcf4a', .7 * o.isaret);
      c.fillStyle = rgba('#ffd84a', o.isaret); c.beginPath(); c.moveTo(ix, -f * .36); c.lineTo(ix + f * .28, 0); c.lineTo(ix, f * .36); c.lineTo(ix - f * .28, 0); c.closePath(); c.fill();
    }
  }
  c.restore();
}

/* ---------------- yardımcılar: konik uzuv, iki kemikli ters kinematik */
function uzuv(c, x1, y1, x2, y2, w1, w2, renk) {
  const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a), ny = Math.cos(a);
  c.fillStyle = renk; c.beginPath();
  c.moveTo(x1 + nx * w1 / 2, y1 + ny * w1 / 2); c.lineTo(x2 + nx * w2 / 2, y2 + ny * w2 / 2);
  c.arc(x2, y2, w2 / 2, a + Math.PI / 2, a - Math.PI / 2, true);
  c.lineTo(x1 - nx * w1 / 2, y1 - ny * w1 / 2);
  c.arc(x1, y1, w1 / 2, a - Math.PI / 2, a + Math.PI / 2, true);
  c.closePath(); c.fill();
}
function uzuvG(c, x1, y1, x2, y2, w1, w2, renk, golge, taraf = 1) {   // gölgeli uzuv
  uzuv(c, x1, y1, x2, y2, w1, w2, renk);
  const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a) * taraf, ny = Math.cos(a) * taraf;
  uzuv(c, x1 + nx * w1 * .24, y1 + ny * w1 * .24, x2 + nx * w2 * .24, y2 + ny * w2 * .24, w1 * .5, w2 * .5, golge);
}
function ik(ax, ay, bx, by, l1, l2, yon = 1) {   // a'dan b'ye uzanan iki kemik: dirsek/diz konumu
  const dx = bx - ax, dy = by - ay, d = clamp(Math.hypot(dx, dy), Math.abs(l1 - l2) + .01, l1 + l2 - .01);
  const a = Math.atan2(dy, dx), cs = (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), aci = a - yon * Math.acos(clamp(cs, -1, 1));
  return [ax + Math.cos(aci) * l1, ay + Math.sin(aci) * l1];
}

/* ---------------- yüz (önden) */
const YUZ = { sen: { w: 104, cene: 'kare', cy: 138, kas: 15 }, tefeci: { w: 90, cene: 'uzun', cy: 154, kas: 8 }, kardes: { w: 98, cene: 'yuvarlak', cy: 124, kas: 11 },
  zengin: { w: 98, cene: 'oval', cy: 130, kas: 8 }, kadin: { w: 90, cene: 'oval', cy: 124, kas: 7 } };
function yuzYolu(c, tip) {
  const { w, cene, cy } = YUZ[tip];
  c.beginPath(); c.moveTo(0, -142);
  c.bezierCurveTo(w * .74, -142, w, -98, w, -34);
  if (cene === 'kare') { c.bezierCurveTo(w, 24, w * .97, 74, w * .76, 102); c.quadraticCurveTo(w * .48, cy - 4, 0, cy); c.quadraticCurveTo(-w * .48, cy - 4, -w * .76, 102); c.bezierCurveTo(-w * .97, 74, -w, 24, -w, -34); }
  else if (cene === 'uzun') { c.bezierCurveTo(w, 44, w * .84, 110, w * .38, cy - 12); c.quadraticCurveTo(0, cy + 4, -w * .38, cy - 12); c.bezierCurveTo(-w * .84, 110, -w, 44, -w, -34); }
  else { const k = cene === 'yuvarlak' ? .92 : .8; c.bezierCurveTo(w, 40, w * k, 96, w * .38, cy - 8); c.quadraticCurveTo(0, cy + 2, -w * .38, cy - 8); c.bezierCurveTo(-w * k, 96, -w, 40, -w, -34); }
  c.bezierCurveTo(-w, -98, -w * .74, -142, 0, -142); c.closePath();
}
function goz(c, x, y, o, s) {
  const p = o.p, tip = o.tip, acik = o.goz ?? 1, b = o.bak || [0, 0];
  if (o.kapali || acik < .08) {
    c.strokeStyle = p.kirpik; c.lineWidth = 4.5; c.lineCap = 'round'; c.beginPath(); c.moveTo(x - 25, y); c.quadraticCurveTo(x, y + 10, x + 25, y); c.stroke();
    c.lineWidth = 2.5; for (let i = -2; i <= 2; i++) { c.beginPath(); c.moveTo(x + i * 9, y + 6 - Math.abs(i)); c.lineTo(x + i * 10, y + 12 - Math.abs(i)); c.stroke(); }
    if (tip === 'zengin') { c.strokeStyle = rgba(p.tenK, .45); c.lineWidth = 2.5; c.beginPath(); c.moveTo(x - 22, y - 12); c.quadraticCurveTo(x, y - 20, x + 22, y - 12); c.stroke(); }
    return;
  }
  const w = tip === 'tefeci' ? 23 : 26, h = 12 * acik;
  c.save(); c.beginPath(); c.moveTo(x - w, y + 2); c.quadraticCurveTo(x, y - h * 1.7, x + w, y); c.quadraticCurveTo(x, y + h * 1.15, x - w, y + 2); c.closePath();
  c.fillStyle = p.beyaz; c.fill(); c.clip();
  const ix = x + b[0] * 11, iy = y + b[1] * 5;
  elips(c, ix, iy, 11.5, 11.5, p.iris); elips(c, ix, iy, 7.5, 7.5, rgba(mixc(p.iris, '#000000', .4), 1)); elips(c, ix, iy, 5, 5, '#070505');
  elips(c, ix + 4, iy - 4, 2.8, 2.8, 'rgba(255,255,255,.95)');
  c.fillStyle = 'rgba(0,0,0,.22)'; c.fillRect(x - w, y - h * 2, 2 * w, h * .95);
  if (tip === 'tefeci') { c.fillStyle = p.tenG; c.beginPath(); c.moveTo(x - w - 2, y - 2); c.quadraticCurveTo(x, y - h * 1.9, x + w + 2, y - 3); c.lineTo(x + w + 2, y - h * .5); c.quadraticCurveTo(x, y - h * .1, x - w - 2, y - h * .3); c.fill(); }
  c.restore();
  c.strokeStyle = p.kirpik; c.lineWidth = tip === 'kadin' ? 6 : 5; c.lineCap = 'round';
  if (tip === 'tefeci') { c.beginPath(); c.moveTo(x - w - 3, y - h * .3); c.quadraticCurveTo(x, y - h * .05, x + w + 3, y - h * .5); c.stroke(); }
  else { c.beginPath(); c.moveTo(x - w - 3, y + 2); c.quadraticCurveTo(x, y - h * 1.7 - 3, x + w + 3, y - 1); c.stroke(); }
  if (tip === 'kadin') { c.lineWidth = 3; c.beginPath(); c.moveTo(x + s * (w + 2), y - 1); c.lineTo(x + s * (w + 10), y - 7); c.stroke(); }
  c.strokeStyle = rgba(p.kirpik, .4); c.lineWidth = 2;
  c.beginPath(); c.moveTo(x - w + 4, y + 3); c.quadraticCurveTo(x, y + h * 1.2 + 2, x + w - 4, y + 1); c.stroke();
  if (tip === 'sen') { c.strokeStyle = rgba(p.tenK, .55); c.lineWidth = 2.6; c.beginPath(); c.moveTo(x - w + 2, y - h * 1.6 - 9); c.quadraticCurveTo(x + 4, y - h * 1.8 - 14, x + w + 2, y - h * .9 - 8); c.stroke(); }
  if (tip === 'tefeci') {   // yaşlı gözler: torbalar ve kaz ayağı
    c.strokeStyle = rgba(p.tenK, .55); c.lineWidth = 2.4;
    for (const k of [0, 1]) { c.beginPath(); c.moveTo(x - w + 6, y + 10 + k * 7); c.quadraticCurveTo(x, y + 18 + k * 9, x + w - 4, y + 9 + k * 6); c.stroke(); }
    for (const d of [-8, 0, 8]) { c.beginPath(); c.moveTo(x + s * (w + 4), y + d * .4); c.lineTo(x + s * (w + 18), y + d); c.stroke(); }
  }
}
function kasCiz(c, s, o) {
  const p = o.p, tip = o.tip, k = o.kas || 0, of = o.ofke || 0, kal = YUZ[tip].kas, fx = (o.yon || 0) * 16;
  const ix = s * 22 + fx, iy = -50 - k * 15 + of * 13, ox = s * 84 + fx, oy = -45 + k * 3 - of * 6, mx = s * 54 + fx, my = -61 - k * 9 - of * 1;
  c.strokeStyle = o.kasRenk || p.sac; c.lineWidth = kal; c.lineCap = 'round';
  c.beginPath(); c.moveTo(ix, iy); c.quadraticCurveTo(mx, my, ox, oy); c.stroke();
  if (tip === 'sen') {
    c.lineWidth = kal * .45; c.strokeStyle = rgba(p.sac, .7);
    c.beginPath(); c.moveTo(ix + s * 6, iy + 4); c.quadraticCurveTo(mx, my + 6, ox - s * 10, oy + 3); c.stroke();
    if (s === 1) {   // sol kaşta eski bir yarık
      const yx = 60 + fx, yy = lerp(iy, oy, .58) - 7;
      c.strokeStyle = p.ten; c.lineWidth = 5.5; c.beginPath(); c.moveTo(yx + 4, yy - 13); c.lineTo(yx - 3, yy + 13); c.stroke();
      c.strokeStyle = 'rgba(240,205,185,.6)'; c.lineWidth = 2; c.beginPath(); c.moveTo(yx + 6, yy - 20); c.lineTo(yx - 4, yy + 18); c.stroke();
    }
  }
}
function burunCiz(c, o) {
  const p = o.p, tip = o.tip;
  c.strokeStyle = rgba(p.tenK, .75); c.lineWidth = 4; c.lineCap = 'round';
  if (tip === 'sen') {
    c.beginPath(); c.moveTo(-6, -14); c.quadraticCurveTo(-16, 22, -15, 40); c.stroke();
    elips(c, 2, 40, 21, 11, rgba(p.tenK, .28));
    c.fillStyle = rgba(p.tenK, .85); c.beginPath(); c.ellipse(-11, 47, 6, 3.4, .3, 0, 7); c.fill(); c.beginPath(); c.ellipse(12, 47, 6, 3.4, -.3, 0, 7); c.fill();
    c.strokeStyle = rgba(p.tenK, .6); c.lineWidth = 3; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 18, 36); c.quadraticCurveTo(s * 26, 44, s * 17, 51); c.stroke(); }
    c.strokeStyle = 'rgba(255,230,210,.32)'; c.lineWidth = 4; c.beginPath(); c.moveTo(4, -6); c.lineTo(5, 30); c.stroke();
  } else if (tip === 'tefeci') {
    c.beginPath(); c.moveTo(-4, -14); c.quadraticCurveTo(-12, 34, -16, 54); c.quadraticCurveTo(-4, 62, 12, 56); c.stroke();
    elips(c, -2, 52, 14, 9, rgba(p.tenK, .3));
    c.strokeStyle = rgba(p.tenK, .55); c.lineWidth = 2.6; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 24, 54); c.quadraticCurveTo(s * 36, 82, s * 30, 104); c.stroke(); }
  } else {
    c.lineWidth = 3.5; c.beginPath(); c.moveTo(-5, -4); c.quadraticCurveTo(-13, 26, -9, 36); c.stroke();
    elips(c, 0, 40, 16, 6, rgba(p.tenK, .3));
    c.strokeStyle = rgba(p.tenK, .7); c.lineWidth = 3; c.beginPath(); c.moveTo(-13, 38); c.quadraticCurveTo(0, 46, 13, 38); c.stroke();
  }
}
function agizCiz(c, o) {
  const p = o.p, tip = o.tip, a = o.agiz ?? 0, g = o.gul ?? 0, sm = o.smirk ?? 0;
  const y0 = { sen: 88, tefeci: 100, kardes: 80, zengin: 86, kadin: 80 }[tip], w = (tip === 'tefeci' ? 24 : 27) + g * 6;
  if (tip === 'tefeci') {   // ince bıyık
    c.fillStyle = rgba(p.sac, .85); c.beginPath(); c.moveTo(-30, y0 - 9); c.quadraticCurveTo(0, y0 - 20, 30, y0 - 9); c.quadraticCurveTo(0, y0 - 13, -30, y0 - 9); c.fill();
  }
  if (a > .04) {
    const h = 4 + 20 * a, ky = y0 - g * 7;
    c.save(); c.beginPath(); c.moveTo(-w, ky - sm * 4); c.quadraticCurveTo(0, y0 - h * .35 - g * 3, w, ky - sm * 8);
    c.quadraticCurveTo(0, y0 + h + g * 6, -w, ky - sm * 4); c.closePath(); c.fillStyle = '#2a1012'; c.fill(); c.clip();
    if (o.dis || g > .2) {
      c.fillStyle = '#ece4d6'; c.fillRect(-w, y0 - h * .5 - g * 6, 2 * w, 8 + h * .25);
      if (o.altin) { c.fillStyle = p.altin || '#f6c64f'; c.fillRect(6, y0 - h * .5 - g * 6, 10, 9 + h * .25); c.fillStyle = 'rgba(255,255,220,.9)'; c.fillRect(8, y0 - h * .5 - g * 6 + 1, 3, 5); }
      c.strokeStyle = 'rgba(120,100,90,.4)'; c.lineWidth = 1.5; for (let x = -w + 9; x < w; x += 9) { c.beginPath(); c.moveTo(x, y0 - h * .6 - g * 6); c.lineTo(x, y0 - h * .1); c.stroke(); }
    }
    elips(c, 0, y0 + h * .7, w * .5, h * .3, '#7a2e30');
    c.restore();
    c.strokeStyle = rgba(p.dudak, .9); c.lineWidth = 3; c.beginPath(); c.moveTo(-w + 4, y0 + h * .55 + g * 3); c.quadraticCurveTo(0, y0 + h + g * 6 + 4, w - 4, y0 + h * .55 + g * 3); c.stroke();
  } else {
    c.strokeStyle = p.dudak; c.lineWidth = 5; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-w, y0 - g * 9 + sm * 3); c.quadraticCurveTo(0, y0 + 1 + g * 7, w, y0 - g * 9 - sm * 9); c.stroke();
    c.strokeStyle = rgba(p.tenK, .35); c.lineWidth = 3; c.beginPath(); c.moveTo(-w * .5, y0 + 11); c.quadraticCurveTo(0, y0 + 16, w * .5, y0 + 11); c.stroke();
    if (o.altin && g > .3) { c.fillStyle = p.altin; c.fillRect(8, y0 - 3, 9, 6); }
  }
}
function tutam(c, x0, y0, x1, y1, gen, bukul) {   // saç tutamı: kökten uca sivrilen yaprak
  const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, a = Math.atan2(y1 - y0, x1 - x0), nx = -Math.sin(a), ny = Math.cos(a);
  c.beginPath(); c.moveTo(x0 + nx * gen, y0 + ny * gen);
  c.quadraticCurveTo(mx + nx * gen * (1.2 + bukul), my + ny * gen * (1.2 + bukul), x1, y1);
  c.quadraticCurveTo(mx - nx * gen * (.6 - bukul), my - ny * gen * (.6 - bukul), x0 - nx * gen, y0 - ny * gen);
  c.closePath(); c.fill();
}
/* saç modelleri (önden): undercut (SEN), geri (tefeci), kivircik (kardeş), yan (zengin), kadin (küt kesim) */
function sacOn(c, o) {
  const p = o.p, tip = o.tip, w = YUZ[tip].w, fx = (o.yon || 0) * 8, sal = o.sal || 0;
  if (tip === 'sen') {
    // yanlar ve şakaklar: sıfıra yakın, dokulu; favoriler kulak hizasına iner
    c.save(); yuzYolu(c, 'sen'); c.clip();
    for (const s of [-1, 1]) {
      c.beginPath(); c.moveTo(s * w * .46, -170); c.lineTo(s * (w + 12), -170); c.lineTo(s * (w + 12), 6); c.lineTo(s * w * .92, 6);
      c.quadraticCurveTo(s * w * .86, -44, s * w * .8, -88); c.quadraticCurveTo(s * w * .72, -118, s * w * .46, -128); c.closePath();
      c.save(); c.clip();
      c.fillStyle = lg(c, 0, -150, 0, 8, [[0, rgba(p.fade, .97)], [.75, rgba(p.fade, .88)], [1, rgba(p.fade, .55)]]); c.fillRect(-w - 20, -175, 2 * w + 40, 190);
      const r = rng(s > 0 ? 3 : 4); c.fillStyle = rgba(p.sac, .6); for (let i = 0; i < 140; i++) c.fillRect(s * (w * .5 + r() * w * .6), -150 + r() * 156, 2.2, 2.2);
      c.restore();
    }
    c.restore();
    // tepe: arkadan öne ve sağa taranmış uzun saç, katman katman tutamlar
    c.fillStyle = p.sac; c.beginPath();
    c.moveTo(-w * .82, -94);
    c.bezierCurveTo(-w * 1.0, -160, -w * .62, -216 + sal, fx, -218 + sal);
    c.bezierCurveTo(w * .64, -220 + sal, w * 1.04, -176, w * .9, -106);
    c.quadraticCurveTo(w * .82, -92, w * .68, -104);
    c.quadraticCurveTo(w * .42, -136, w * .1, -128);
    c.quadraticCurveTo(-w * .26, -122, -w * .52, -108);
    c.quadraticCurveTo(-w * .7, -98, -w * .82, -94); c.closePath(); c.fill();
    const ac = mixc(p.sac, p.sacA, .28);
    for (const [x0, y0, x1, y1, g, b, r] of [[-70, -150, 70, -196, 22, .2, 0], [-86, -112, 40, -176, 20, .1, 1], [-30, -130, 96, -150, 18, .3, 0], [-60, -124, 74, -122, 16, .2, 1], [10, -184, 104, -128, 18, .1, 0]]) {
      c.fillStyle = r ? ac : p.sac; tutam(c, x0, y0 + sal * .4, x1, y1 + sal * .6, g, b);
    }
    c.fillStyle = p.sac; tutam(c, w * .02, -126, w * .46, -60 + sal * .3, 15, .35);   // alnına düşen tutam
    c.fillStyle = ac; tutam(c, w * .14, -122, w * .4, -74 + sal * .3, 7, .3);
    c.strokeStyle = rgba(p.sacA, .9); c.lineWidth = 3.5; c.lineCap = 'round';
    for (const [x1, y1, cx, cy, x2, y2] of [[-66, -120, -40, -184, 26, -200], [-34, -126, 6, -176, 62, -184], [6, -128, 50, -164, 90, -144], [-84, -104, -82, -146, -46, -186]]) {
      c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo(cx, cy + sal * .5, x2, y2 + sal * .5); c.stroke();
    }
    c.strokeStyle = 'rgba(150,165,255,.3)'; c.lineWidth = 9; c.beginPath(); c.moveTo(-44, -196 + sal); c.quadraticCurveTo(10, -214 + sal, 60, -198 + sal); c.stroke();
  } else if (tip === 'tefeci') {
    c.fillStyle = p.sac; c.beginPath();
    c.moveTo(-w * 1.02, -40); c.bezierCurveTo(-w * 1.06, -150, -w * .5, -184, 0, -184); c.bezierCurveTo(w * .5, -184, w * 1.06, -150, w * 1.02, -40);
    c.quadraticCurveTo(w * .9, -96, w * .6, -112); c.quadraticCurveTo(w * .25, -114, 0, -98); c.quadraticCurveTo(-w * .25, -114, -w * .6, -112); c.quadraticCurveTo(-w * .9, -96, -w * 1.02, -40); c.fill();
    c.strokeStyle = 'rgba(255,255,255,.26)'; c.lineWidth = 5; c.lineCap = 'round';
    for (const [x1, y1, x2, y2] of [[-56, -120, -30, -176], [0, -106, 6, -180], [52, -120, 34, -176], [-80, -90, -72, -150], [80, -90, 72, -150], [-28, -112, -14, -178], [28, -112, 20, -178]]) { c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo((x1 + x2) / 2 + 6, (y1 + y2) / 2, x2, y2); c.stroke(); }
    c.fillStyle = 'rgba(150,150,170,.5)'; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * w * 1.0, -40); c.quadraticCurveTo(s * w * 1.03, -80, s * w * .92, -100); c.lineTo(s * w * .88, -80); c.closePath(); c.fill(); }   // kırlaşmış şakaklar
  } else if (tip === 'kardes') {
    const r = rng(77);
    for (let i = 0; i < 46; i++) { const an = Math.PI * (1.02 + r() * .96), rad = w * (.82 + r() * .38); elips(c, Math.cos(an) * rad, -40 + Math.sin(an) * rad * 1.18 - 30, 22 + r() * 9, 20 + r() * 8, p.sac); }
    for (let i = 0; i < 18; i++) { const x = -w * .8 + r() * w * 1.6; elips(c, x, -120 + r() * 26, 20, 18, p.sac); }
    c.strokeStyle = rgba(p.sacA, .8); c.lineWidth = 3; for (let i = 0; i < 16; i++) { const x = -w * .8 + r() * w * 1.6, y = -170 + r() * 60; c.beginPath(); c.arc(x, y, 9, Math.PI, Math.PI * 1.8); c.stroke(); }
  } else if (tip === 'zengin') {
    c.fillStyle = p.sac; c.beginPath();
    c.moveTo(-w * 1.02, -30); c.bezierCurveTo(-w * 1.06, -150, -w * .5, -188, -w * .2, -186); c.bezierCurveTo(w * .5, -194, w * 1.08, -150, w * 1.02, -30);
    c.quadraticCurveTo(w * .96, -100, w * .7, -118); c.bezierCurveTo(w * .3, -136, -w * .1, -128, -w * .32, -150); c.quadraticCurveTo(-w * .6, -110, -w * 1.02, -30); c.fill();
    c.strokeStyle = rgba(p.sacA, .8); c.lineWidth = 5; c.lineCap = 'round';
    for (const [x1, y1, x2, y2] of [[-30, -150, 70, -140], [-20, -170, 80, -160], [-70, -140, -90, -60], [60, -126, 90, -70]]) { c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - 14, x2, y2); c.stroke(); }
  } else if (tip === 'kadin') {
    c.fillStyle = p.sac; c.beginPath();   // kâkül + tepe
    c.moveTo(-w * 1.06, -10); c.bezierCurveTo(-w * 1.16, -176, w * 1.16, -176, w * 1.06, -10);
    c.lineTo(w * .93, -24); c.quadraticCurveTo(w * .86, -78, w * .58, -84); c.quadraticCurveTo(w * .3, -66, 0, -78); c.quadraticCurveTo(-w * .3, -66, -w * .58, -84);
    c.quadraticCurveTo(-w * .86, -78, -w * .93, -24); c.closePath(); c.fill();
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * w * .93, -30); c.quadraticCurveTo(s * w * 1.12, 20, s * w * 1.0, 74); c.lineTo(s * w * .86, 66); c.quadraticCurveTo(s * w * .96, 20, s * w * .86, -20); c.closePath(); c.fill(); }
    c.strokeStyle = rgba(p.sacA, .8); c.lineWidth = 4; for (const x of [-60, -24, 12, 48]) { c.beginPath(); c.moveTo(x, -150); c.quadraticCurveTo(x * 1.2, -110, x * 1.1, -82); c.stroke(); }
  }
}
// o: p, tip, goz, kas (korku), ofke, bak, agiz, gul, smirk, dis, altin, kapali, yon, sal (saç sallanması), ter, yagmur, boyun
function kafa(c, o) {
  const p = o.p, tip = o.tip || 'sen', w = YUZ[tip].w, fx = (o.yon || 0) * 16;
  if (o.boyun !== false) {
    c.fillStyle = p.tenG; c.beginPath(); c.moveTo(-w * .42, 70); c.lineTo(w * .42, 70); c.quadraticCurveTo(w * .44, 160, w * .54, 215); c.lineTo(-w * .54, 215); c.quadraticCurveTo(-w * .44, 160, -w * .42, 70); c.closePath(); c.fill();
    c.fillStyle = lg(c, 0, 96, 0, 170, [[0, rgba(p.tenK, .6)], [1, rgba(p.tenK, 0)]]); c.fillRect(-w * .56, 96, w * 1.12, 80);
    c.strokeStyle = rgba(p.tenK, .35); c.lineWidth = 3; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * w * .3, 130); c.quadraticCurveTo(s * w * .2, 180, s * w * .06, 212); c.stroke(); }
  }
  if (tip === 'kadin') { c.fillStyle = p.sac; c.beginPath(); c.moveTo(-w * 1.14, 74); c.bezierCurveTo(-w * 1.3, -200, w * 1.3, -200, w * 1.14, 74); c.quadraticCurveTo(0, 100, -w * 1.14, 74); c.fill(); }
  for (const s of [-1, 1]) {
    const ex = s * (w - 2) + fx * .25;
    elips(c, ex, 4, 16, 29, p.tenG); elips(c, ex, 6, 8, 17, rgba(p.tenK, .6));
    if (tip === 'sen' && s === 1) { c.strokeStyle = '#dfe5ee'; c.lineWidth = 3.6; c.beginPath(); c.arc(ex + 4, 34, 9, -.2, Math.PI * 1.25); c.stroke(); elips(c, ex + 1, 26, 2.5, 2.5, '#ffffff'); }
  }
  yuzYolu(c, tip); c.fillStyle = p.ten; c.fill();
  c.save(); yuzYolu(c, tip); c.clip();
  const ys = o.yon || 0;
  c.fillStyle = lg(c, -w, 0, w, 0, [[0, rgba(p.tenK, .46 + Math.max(0, ys) * .2)], [.3, rgba(p.tenK, 0)], [.8, rgba(p.tenK, 0)], [1, rgba(p.tenK, .3 + Math.max(0, -ys) * .2)]]); c.fillRect(-w - 10, -150, 2 * w + 20, 300);
  c.fillStyle = lg(c, 0, 70, 0, 140, [[0, rgba(p.tenK, 0)], [1, rgba(p.tenK, .25)]]); c.fillRect(-w - 10, 70, 2 * w + 20, 80);
  if (tip === 'sen' || tip === 'tefeci') {   // elmacık kemiği gölgesi
    c.strokeStyle = rgba(p.tenK, .22); c.lineWidth = 6; c.lineCap = 'round';
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * w * .86 + fx * .3, 18); c.quadraticCurveTo(s * w * .66 + fx * .3, 54, s * w * .44 + fx * .3, 60); c.stroke(); }
  }
  if (tip === 'sen') { c.fillStyle = rgba('#2a2c3a', .08); c.beginPath(); c.moveTo(-w, 30); c.bezierCurveTo(-w * .9, 96, -w * .4, 136, 0, 138); c.bezierCurveTo(w * .4, 136, w * .9, 96, w, 30); c.bezierCurveTo(w * .7, 70, w * .3, 76, 0, 72); c.bezierCurveTo(-w * .3, 76, -w * .7, 70, -w, 30); c.fill(); }
  if (tip === 'zengin') { elips(c, -54 + fx, 50, 24, 13, 'rgba(255,110,110,.22)'); elips(c, 54 + fx, 50, 24, 13, 'rgba(255,110,110,.22)'); elips(c, fx, 36, 12, 8, 'rgba(255,110,110,.2)'); }
  if (tip === 'kardes') { const r = rng(9); for (let i = 0; i < 18; i++) elips(c, (r() > .5 ? 1 : -1) * (30 + r() * 34) + fx, 18 + r() * 26, 2.4, 2.4, rgba(p.tenK, .45)); }
  if (o.kizil) { c.fillStyle = rgba(o.kizilRenk || '#ff3a3a', o.kizil); c.fillRect(-w - 10, -150, 2 * w + 20, 300); }
  c.restore();
  sacOn(c, o);
  for (const s of [-1, 1]) kasCiz(c, s, o);
  for (const s of [-1, 1]) goz(c, s * 44 + fx, -14, o, s);
  c.save(); c.translate(fx * 1.15, 0); burunCiz(c, o); c.restore();
  c.save(); c.translate(fx, 0); agizCiz(c, o); c.restore();
  if (o.ter) { c.fillStyle = 'rgba(210,230,255,.75)'; for (const [x, y, s] of [[-64, -92, 1], [56, -96, .8], [24, -110, .9], [80, 10, .7]]) { c.beginPath(); c.ellipse(x, y, 4 * s, 6.5 * s, 0, 0, 7); c.fill(); } }
  if (o.yagmur) { c.fillStyle = 'rgba(200,230,255,.6)'; for (const [x, y, s] of [[-70, -60, 1], [64, -20, .8], [-30, 100, .9], [80, 60, .7], [10, -120, .8], [-90, 20, .6]]) { c.beginPath(); c.ellipse(x, y, 3.5 * s, 6.5 * s, 0, 0, 7); c.fill(); } }
}
function kafaArka(c, p, o = {}) {   // SEN, arkadan: sıfıra yakın ense, uzun tepe
  const w = 104, sal = o.sal || 0;
  if (o.boyun !== false) { c.fillStyle = p.tenG; c.beginPath(); c.moveTo(-46, 40); c.lineTo(46, 40); c.lineTo(54, 215); c.lineTo(-54, 215); c.closePath(); c.fill(); c.fillStyle = rgba(p.tenK, .3); c.fillRect(-6, 60, 12, 150); }
  for (const s of [-1, 1]) { elips(c, s * 102, 6, 15, 28, p.tenG); elips(c, s * 102, 8, 7, 16, rgba(p.tenK, .6)); }
  if (o.kupe !== false) { c.strokeStyle = '#dfe5ee'; c.lineWidth = 3.6; c.beginPath(); c.arc(-104, 34, 9, -.2, Math.PI * 1.25); c.stroke(); }
  c.save(); c.beginPath(); c.ellipse(0, -30, w, 118, 0, 0, 7); c.clip();
  c.fillStyle = p.ten; c.fillRect(-w, -160, 2 * w, 260);
  c.fillStyle = lg(c, 0, -150, 0, 84, [[0, rgba(p.fade, 1)], [.6, rgba(p.fade, .93)], [.86, rgba(p.fade, .6)], [1, rgba(p.fade, .1)]]); c.fillRect(-w, -160, 2 * w, 260);
  const r = rng(6); c.fillStyle = rgba(p.sac, .55); for (let i = 0; i < 220; i++) c.fillRect(-w + r() * 2 * w, -120 + r() * 190, 2.2, 2.2);
  c.restore();
  c.fillStyle = p.sac; c.beginPath(); c.moveTo(-w * .78, -80);
  c.bezierCurveTo(-w * .96, -156, -w * .52, -208 + sal, 0, -212 + sal); c.bezierCurveTo(w * .52, -208 + sal, w * .96, -156, w * .78, -80);
  c.quadraticCurveTo(w * .4, -100, 0, -92); c.quadraticCurveTo(-w * .4, -100, -w * .78, -80); c.fill();
  const ac = mixc(p.sac, p.sacA, .28);
  for (const [x0, y0, x1, y1, g, k] of [[-60, -110, 30, -200, 18, 1], [10, -100, 70, -190, 16, 0], [-80, -96, -20, -170, 14, 0], [40, -100, 86, -150, 14, 1]]) { c.fillStyle = k ? ac : p.sac; tutam(c, x0, y0, x1, y1 + sal, g, .2); }
  c.strokeStyle = rgba(p.sacA, .8); c.lineWidth = 4; c.lineCap = 'round';
  for (const [x1, y1, x2, y2] of [[-50, -100, -40, -190], [-6, -96, 0, -204], [40, -100, 34, -190]]) { c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo((x1 + x2) / 2 + 10, (y1 + y2) / 2, x2, y2 + sal); c.stroke(); }
  if (o.yagmur) { c.strokeStyle = 'rgba(200,225,255,.3)'; c.lineWidth = 6; c.beginPath(); c.moveTo(-50, -190); c.quadraticCurveTo(0, -210, 50, -188); c.stroke(); }
}
function kafaYan(c, p, o = {}) {   // SEN, profil (sağa bakar)
  const acik = o.goz ?? 1, sal = o.sal || 0;
  c.fillStyle = p.tenG; poly(c, [[-44, 66], [50, 86], [44, 214], [-64, 214]], p.tenG);
  c.beginPath();
  c.moveTo(-10, -146); c.bezierCurveTo(50, -150, 88, -110, 92, -62);
  c.lineTo(97, -44); c.quadraticCurveTo(93, -30, 100, -20); c.lineTo(123, 14); c.quadraticCurveTo(124, 25, 104, 27);
  c.quadraticCurveTo(107, 36, 104, 42); c.quadraticCurveTo(98, 48, 102, 56); c.quadraticCurveTo(104, 64, 95, 72);
  c.quadraticCurveTo(101, 98, 90, 112); c.quadraticCurveTo(62, 132, 18, 124);
  c.quadraticCurveTo(-30, 112, -62, 72); c.bezierCurveTo(-112, 20, -114, -82, -70, -124); c.quadraticCurveTo(-44, -146, -10, -146);
  c.closePath(); c.fillStyle = p.ten; c.fill();
  c.save(); c.clip();
  c.fillStyle = lg(c, -110, 0, 120, 0, [[0, rgba(p.tenK, .45)], [.5, rgba(p.tenK, 0)], [1, rgba(p.tenK, .12)]]); c.fillRect(-120, -160, 260, 300);
  c.fillStyle = rgba(p.fade, .95); c.beginPath(); c.moveTo(-130, -170); c.lineTo(66, -170); c.lineTo(44, -100); c.quadraticCurveTo(10, -70, 6, -16); c.lineTo(-8, 30); c.quadraticCurveTo(-50, 40, -130, 60); c.closePath(); c.fill();
  const r = rng(8); c.fillStyle = rgba(p.sac, .55); for (let i = 0; i < 110; i++) { const x = -110 + r() * 150, y = -140 + r() * 170; if (y < 30 - (x + 110) * .1) c.fillRect(x, y, 2.2, 2.2); }
  c.strokeStyle = rgba(p.tenK, .4); c.lineWidth = 4; c.beginPath(); c.moveTo(90, 112); c.quadraticCurveTo(40, 124, 0, 104); c.stroke();
  c.restore();
  elips(c, -14, -2, 16, 28, p.tenG); elips(c, -12, 0, 8, 16, rgba(p.tenK, .6));
  c.strokeStyle = '#dfe5ee'; c.lineWidth = 3.6; c.beginPath(); c.arc(-12, 30, 8, -.3, Math.PI * 1.2); c.stroke();
  c.strokeStyle = p.sac; c.lineWidth = 13; c.lineCap = 'round'; c.beginPath(); c.moveTo(54, -54 - (o.kas || 0) * 10); c.quadraticCurveTo(74, -62, 92, -52); c.stroke();
  c.save(); c.beginPath(); c.ellipse(74, -26, 15, 9 * acik + .1, 0, 0, 7); c.fillStyle = p.beyaz; c.fill(); c.clip(); elips(c, 82, -26, 8, 8, p.iris); elips(c, 83, -26, 4, 4, '#070505'); c.restore();
  c.strokeStyle = p.kirpik; c.lineWidth = 4; c.beginPath(); c.moveTo(60, -30); c.quadraticCurveTo(74, -38 - 4 * acik, 90, -27); c.stroke();
  c.strokeStyle = rgba(p.tenK, .7); c.lineWidth = 3; c.beginPath(); c.moveTo(104, 4); c.quadraticCurveTo(96, 14, 104, 22); c.stroke();
  c.strokeStyle = p.dudak; c.lineWidth = 4; c.beginPath(); c.moveTo(100, 48); c.lineTo(86, 50 + (o.agiz || 0) * 8); c.stroke();
  // tepe: geriye ve öne kabaran uzun saç
  c.fillStyle = p.sac; c.beginPath(); c.moveTo(70, -118);
  c.bezierCurveTo(66, -184 + sal, -30, -222 + sal, -98, -156 + sal); c.bezierCurveTo(-112, -130, -104, -100, -92, -88);
  c.quadraticCurveTo(-30, -124, 30, -114); c.quadraticCurveTo(52, -110, 70, -118); c.fill();
  c.fillStyle = p.sac; tutam(c, 40, -128, 104, -74 + sal * .3, 14, .3);
  const ac = mixc(p.sac, p.sacA, .28); c.fillStyle = ac; tutam(c, -60, -150, 60, -150 + sal, 12, .2); tutam(c, -80, -120, 30, -130, 10, .1);
  c.strokeStyle = rgba(p.sacA, .85); c.lineWidth = 3.5;
  for (const [x1, y1, x2, y2] of [[50, -140, -60, -160], [40, -124, -70, -130], [20, -170, -80, -140]]) { c.beginPath(); c.moveTo(x1, y1 + sal); c.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - 16 + sal, x2, y2 + sal); c.stroke(); }
}

/* ---------------- eller: bilekten rot yönüne uzanır (s ölçek). Elin üstü görünür; poz: acik, tut, yumruk, kavra, sark, isaret */
const PARMAK = [[-29, [37, 24, 18], -.16], [-10, [42, 27, 20], -.05], [9, [40, 26, 19], .06], [27, [31, 20, 16], .17]];
function elCiz(c, x, y, rot, s, p, o = {}) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s * (o.ayna ? -1 : 1));
  const ten = o.ten || p.ten, tenK = o.tenK || p.tenK, cizgi = rgba(tenK, .9);
  const poz = o.poz || 'acik', k = o.kavra ?? 1;
  const KIV = { acik: [.12, .16, .12], tut: [1.0, 1.05, .7], yumruk: [1.45, 1.6, 1.2], kavra: [.5 + .8 * k, .7 + .7 * k, .5 + .4 * k], sark: [.35, .5, .4], isaret: [1.45, 1.6, 1.2] }[poz];
  const ac = poz === 'acik' ? 1.3 : poz === 'sark' ? .7 : .25;
  const parmak = (i, cz) => {
    const [py, L, yay] = PARMAK[i];
    let kv = KIV; if (poz === 'isaret' && i === 0) kv = [.05, .05, .03];
    let px = 88 + (i === 0 || i === 3 ? -4 : 0), yy = py, a = yay * ac, pts = [[px, yy]];
    for (let j = 0; j < 3; j++) { a += kv[j]; px += Math.cos(a) * L[j]; yy += Math.sin(a) * L[j]; pts.push([px, yy]); }
    const gen = [19, 17, 15, 13].map(g => g * (i === 3 ? .86 : 1));
    for (let j = 0; j < 3; j++) uzuv(c, pts[j][0], pts[j][1], pts[j + 1][0], pts[j + 1][1], gen[j] + cz, gen[j + 1] + cz, cz ? cizgi : ten);
    if (!cz && kv[2] < .6) { const [tx, ty] = pts[3]; elips(c, tx - Math.cos(a) * 5, ty - Math.sin(a) * 5, 5, 4, rgba('#ffffff', .2)); }
    if (!cz) { c.strokeStyle = rgba(tenK, .35); c.lineWidth = 1.6; for (const j of [1, 2]) { const [jx, jy] = pts[j]; const n = [-Math.sin(a), Math.cos(a)]; c.beginPath(); c.moveTo(jx - n[0] * 5, jy - n[1] * 5); c.lineTo(jx + n[0] * 5, jy + n[1] * 5); c.stroke(); } }
  };
  for (let i = 3; i >= 0; i--) parmak(i, 5);
  for (let i = 3; i >= 0; i--) parmak(i, 0);
  // avuç
  const avuc = () => { c.beginPath(); c.moveTo(-4, -34); c.quadraticCurveTo(40, -46, 86, -42); c.quadraticCurveTo(100, -30, 98, 4); c.quadraticCurveTo(98, 34, 84, 40); c.quadraticCurveTo(40, 46, -4, 34); c.quadraticCurveTo(-14, 0, -4, -34); c.closePath(); };
  avuc(); c.strokeStyle = cizgi; c.lineWidth = 5; c.stroke(); c.fillStyle = ten; c.fill();
  c.save(); avuc(); c.clip();
  c.fillStyle = lg(c, 0, -44, 0, 44, [[0, 'rgba(255,255,255,.12)'], [.6, 'rgba(255,255,255,0)'], [1, rgba(tenK, .3)]]); c.fillRect(-20, -50, 130, 100);
  c.strokeStyle = rgba(tenK, .28); c.lineWidth = 2.2; for (const py of [-26, -8, 10, 26]) { c.beginPath(); c.moveTo(20, py * .55); c.quadraticCurveTo(54, py * .8, 84, py); c.stroke(); }
  if (o.yuzuk) { c.fillStyle = o.yuzuk; for (const py of [-29, -10, 9]) { rr(c, 84, py - 9, 10, 18, 3); c.fill(); } }
  c.restore();
  for (const [i, py] of PARMAK.map((q, i) => [i, q[0]])) if (KIV[0] > .9 && !(poz === 'isaret' && i === 0)) elips(c, 92, py, 9, 9, rgba('#ffffff', .1));   // boğumlar
  // başparmak
  const ba = { acik: [-1.05, .25], tut: [-.5, .7], yumruk: [-.2, 1.1], kavra: [-.7 + .5 * k, .5 + .5 * k], sark: [-.7, .4], isaret: [-.3, .9] }[poz];
  let tx = 24, ty = -30, a = ba[0];
  const tp = [[tx, ty]]; for (const [L, d] of [[34, 0], [26, ba[1]]]) { a += d; tx += Math.cos(a) * L; ty += Math.sin(a) * L; tp.push([tx, ty]); }
  for (const cz of [5, 0]) for (let j = 0; j < 2; j++) uzuv(c, tp[j][0], tp[j][1], tp[j + 1][0], tp[j + 1][1], [24, 20, 17][j] + cz, [24, 20, 17][j + 1] + cz, cz ? cizgi : ten);
  c.restore();
}
// ön kol: dirsekten bileğe kaslı, bilekte incelen biçim
function onKol(c, B, C, w1, w2, ten, tenK, o = {}) {
  const a = Math.atan2(C[1] - B[1], C[0] - B[0]), L = Math.hypot(C[0] - B[0], C[1] - B[1]);
  c.save(); c.translate(B[0], B[1]); c.rotate(a);
  const yol = () => { c.beginPath(); c.moveTo(0, -w1 / 2); c.bezierCurveTo(L * .22, -w1 * .66, L * .62, -w2 * .62, L, -w2 / 2); c.lineTo(L, w2 / 2); c.bezierCurveTo(L * .66, w2 * .56, L * .28, w1 * .58, 0, w1 / 2); c.arc(0, 0, w1 / 2, Math.PI / 2, Math.PI * 1.5); c.closePath(); };
  yol(); c.strokeStyle = rgba(tenK, .85); c.lineWidth = 5; c.stroke(); c.fillStyle = ten; c.fill();
  c.save(); yol(); c.clip();
  const ts = o.taraf || 1;
  c.fillStyle = lg(c, 0, -w1 * .7 * ts, 0, w1 * .7 * ts, [[0, 'rgba(255,255,255,.14)'], [.45, 'rgba(255,255,255,0)'], [.7, rgba(tenK, .12)], [1, rgba(tenK, .42)]]); c.fillRect(-w1, -w1, L + w1 * 2, w1 * 2);
  c.strokeStyle = rgba(tenK, .3); c.lineWidth = 2.4;
  for (const d of [-.16, .16]) { c.beginPath(); c.moveTo(L * .9, d * w2 * 2); c.quadraticCurveTo(L * .94, d * w2 * 2.4, L * .97, d * w2 * 1.8); c.stroke(); }   // bilek çizgileri
  c.strokeStyle = 'rgba(255,255,255,.12)'; c.lineWidth = 6; c.beginPath(); c.moveTo(L * .15, -w1 * .28 * ts); c.quadraticCurveTo(L * .5, -w1 * .36 * ts, L * .85, -w2 * .25 * ts); c.stroke();
  c.restore();
  c.restore();
}
// kol: omuz A, dirsek B, bilek C. Üst kol ceketli, dirsekte sıvanmış kol (ya da o.manset rengi), çıplak ön kol (ya da o.yen: uzun kollu), el.
function kolCiz(c, p, A, B, C, o = {}) {
  const kalin = o.kalin || 1, a = Math.atan2(C[1] - B[1], C[0] - B[0]), kr = o.kolRenk || p.ceket;
  o = Object.assign({ kolK: p.ceketK || carp(kr, [.45, .45, .45]), kolG: p.ceketG || carp(kr, [.78, .78, .78]), kolA: p.ceketA || mixc(kr, '#ffffff', .3) }, o);
  if (o.ust !== false) uzuvG(c, A[0], A[1], B[0], B[1], 96 * kalin, 84 * kalin, kr, rgba(o.kolK, .4), o.taraf || 1);
  if (o.yen) {   // uzun kollu: ön kol kumaş, bilekte lastikli manşet
    uzuvG(c, B[0], B[1], C[0], C[1], 82 * kalin, 70 * kalin, o.yen, rgba(o.yenK || '#000000', .3), o.taraf || 1);
    c.save(); c.translate(C[0], C[1]); c.rotate(a); c.fillStyle = o.yenG || carp(o.yen, [.75, .75, .75]); rr(c, -34 * kalin, -36 * kalin, 34 * kalin, 72 * kalin, 10 * kalin); c.fill();
    c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 2; for (let i = 1; i < 5; i++) { c.beginPath(); c.moveTo(-34 * kalin + i * 7 * kalin, -34 * kalin); c.lineTo(-34 * kalin + i * 7 * kalin, 34 * kalin); c.stroke(); } c.restore();
  } else onKol(c, B, C, 78 * kalin, 56 * kalin, o.ten || p.ten, o.tenK || p.tenK, { taraf: o.taraf });
  if (o.ust !== false && !o.yen) {   // dirsekte: sıvanmış kol ya da kısa manşet
    c.save(); c.translate(B[0] + Math.cos(a) * 6, B[1] + Math.sin(a) * 6); c.rotate(a);
    if (o.manset) { rr(c, -26 * kalin, -50 * kalin, 40 * kalin, 100 * kalin, 16 * kalin); c.fillStyle = o.manset; c.fill(); c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(4 * kalin, -50 * kalin, 10 * kalin, 100 * kalin); }
    else {
      rr(c, -30 * kalin, -52 * kalin, 56 * kalin, 104 * kalin, 22 * kalin); c.fillStyle = o.kolG || p.ceketG; c.fill();
      c.strokeStyle = rgba(o.kolK || p.ceketK, .55); c.lineWidth = 3; for (const dx of [-14, 2, 16]) { c.beginPath(); c.moveTo(dx * kalin, -48 * kalin); c.quadraticCurveTo((dx + 6) * kalin, 0, dx * kalin, 48 * kalin); c.stroke(); }
      c.fillStyle = rgba(o.kolA || p.ceketA, .35); rr(c, -24 * kalin, -46 * kalin, 14 * kalin, 92 * kalin, 6); c.fill();
    }
    c.restore();
  }
  if (o.sayac !== undefined && !o.yen) {
    // şerit ön kola tam sığar: boyuna (dirsekten ve bilekten pay bırakarak) ve o noktadaki kalınlığına göre ölçeklenir;
    // gerekirse rakamlar en fazla %22 yatay sıkışır (birim: 64 px'lik yazı tipi; Consolas karakter genişliği ~37,8)
    const so = Object.assign({}, o.sayacO || {}), L = Math.hypot(C[0] - B[0], C[1] - B[1]);
    const metinW = (so.metin || sureYaz(o.sayac)).length * 37.8, ek = 64 + (so.isaret ? 110 : 0);
    const pay0 = 42 * kalin, pay1 = 36 * kalin, bos = Math.max(10, L - pay0 - pay1);
    let ss = (o.sayacS || .42) * kalin * 1.15;
    const cx = clamp((bos / ss - ek) / metinW, .78, 1);
    ss = Math.min(ss, bos / (metinW * cx + ek));
    let pos = o.sayacPos ?? .62;
    for (let i = 0; i < 2; i++) {
      const yarim = (metinW * cx + ek) / 2 * ss;
      pos = clamp(pos, (pay0 + yarim) / L, 1 - (pay1 + yarim) / L);
      ss = Math.min(ss, lerp(78, 56, pos) * kalin * .76 / (64 * 1.3));   // şeridin yüksekliği kolun kalınlığını aşmaz
    }
    if (cx < 1) so.kirp = metinW * cx; else delete so.kirp;
    const sx = lerp(B[0], C[0], pos), sy = lerp(B[1], C[1], pos);
    let r_ = a; if (Math.cos(r_) < 0) r_ += Math.PI;   // rakamlar baş aşağı okunmasın
    const arg = [sx, sy, r_, ss, o.sayac, so];
    if (c === KX) SAYAC_Q.push({ m: c.getTransform(), arg }); else sayacCiz(c, ...arg);   // karakter katmanında: ışıklandırmadan sonra çizilir
  }
  if (o.el !== false) elCiz(c, C[0], C[1], a + (o.elRot || 0), .78 * kalin, p, { poz: o.poz || 'acik', ayna: o.ayna, ten: o.ten, tenK: o.tenK, kavra: o.kavra, yuzuk: o.yuzuk });
}

/* ---------------- SEN, önden göğüs (bust). orijin: kafa merkezi. o.kafa: kafa() seçenekleri, o.kollar: [{A,B,C,...}] */
function ceketOn(c, p, o = {}) {
  c.fillStyle = p.ceket; c.beginPath(); c.moveTo(-360, 700); c.bezierCurveTo(-356, 360, -300, 240, -150, 206); c.lineTo(150, 206); c.bezierCurveTo(300, 240, 356, 360, 360, 700); c.closePath(); c.fill();
  c.save(); c.clip();
  c.fillStyle = lg(c, -360, 0, 360, 0, [[0, rgba(p.ceketK, .55)], [.3, rgba(p.ceketK, 0)], [.7, rgba(p.ceketK, 0)], [1, rgba(p.ceketK, .45)]]); c.fillRect(-370, 190, 740, 520);
  doku(c, -370, 190, 740, 520, .5);
  for (const [x, y, rx, ry] of [[-220, 420, 60, 90], [210, 380, 50, 70], [-90, 620, 80, 50]]) elips(c, x, y, rx, ry, rgba(p.ceketA, .14));   // solmuş yerler
  c.fillStyle = p.tisort; c.beginPath(); c.moveTo(-96, 206); c.lineTo(96, 206); c.lineTo(110, 720); c.lineTo(-110, 720); c.closePath(); c.fill();   // açık önden siyah tişört
  c.fillStyle = rgba(p.tisortA, .6); c.beginPath(); c.moveTo(-60, 208); c.quadraticCurveTo(0, 262, 60, 208); c.lineTo(52, 206); c.quadraticCurveTo(0, 246, -52, 206); c.fill();
  c.strokeStyle = rgba(p.tisortA, .5); c.lineWidth = 3; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 60, 380); c.quadraticCurveTo(s * 30, 470, s * 70, 600); c.stroke(); }
  for (const s of [-1, 1]) {   // ceketin ön kenarları + göğüs cepleri
    c.fillStyle = p.ceketG; c.beginPath(); c.moveTo(s * 96, 206); c.lineTo(s * 126, 206); c.lineTo(s * 150, 720); c.lineTo(s * 108, 720); c.closePath(); c.fill();
    c.fillStyle = p.ceket; rr(c, s > 0 ? 150 : -270, 330, 120, 130, 10); c.fill();
    c.fillStyle = p.ceketG; rr(c, s > 0 ? 146 : -274, 318, 128, 44, 8); c.fill();
    elips(c, s * 210, 344, 7, 7, '#3a2a10');
    c.strokeStyle = rgba(p.ceketK, .6); c.lineWidth = 2.5; c.setLineDash([7, 6]); c.strokeRect(s > 0 ? 156 : -264, 366, 108, 88); c.setLineDash([]);
  }
  c.strokeStyle = rgba(p.ceketK, .55); c.lineWidth = 3; for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 170, 212); c.quadraticCurveTo(s * 270, 330, s * 290, 700); c.stroke(); }
  c.restore();
}
function yakaOn(c, p) {   // gömlek yakası gibi sivri ceket yakası
  for (const s of [-1, 1]) {
    c.fillStyle = p.ceketG; c.beginPath(); c.moveTo(s * 70, 168); c.lineTo(s * 150, 196); c.lineTo(s * 168, 262); c.lineTo(s * 104, 300); c.lineTo(s * 96, 210); c.closePath(); c.fill();
    c.strokeStyle = rgba(p.ceketK, .7); c.lineWidth = 3; c.stroke();
    c.fillStyle = rgba(p.ceketA, .3); c.beginPath(); c.moveTo(s * 82, 176); c.lineTo(s * 140, 198); c.lineTo(s * 108, 218); c.closePath(); c.fill();
  }
}
function senBust(c, p, o = {}) {
  const arka = (o.kollar || []).filter(k => k.arka), on = (o.kollar || []).filter(k => !k.arka);
  for (const k of arka) kolCiz(c, p, k.A, k.B, k.C, k);
  ceketOn(c, p, o);
  kafa(c, Object.assign({ p, tip: 'sen' }, o.kafa || {}));
  yakaOn(c, p);
  for (const k of on) kolCiz(c, p, k.A, k.B, k.C, k);
}

/* ---------------- bot (yandan, sağa bakar); orijin: ayak bileği altı */
function botCiz(c, p, ta, koyu) {
  c.save(); c.rotate(ta);
  c.fillStyle = koyu ? carp(p.bot, [.7, .7, .7]) : p.bot; c.beginPath(); c.moveTo(-34, -46); c.lineTo(22, -46); c.quadraticCurveTo(30, -20, 52, -16); c.quadraticCurveTo(84, -12, 86, 6); c.lineTo(86, 14); c.lineTo(-40, 14); c.quadraticCurveTo(-44, -20, -34, -46); c.fill();
  c.fillStyle = p.botA; c.fillRect(-40, 6, 126, 10); c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(-26, -40, 8, 40);
  c.restore();
}
/* ---------------- koşu döngüsü: bir bacağın anahtar pozları. [evre, uyluk (dikeyden, + öne), diz bükümü (baldır geriye), ayak (+ parmak aşağı)], derece.
   0 temas · .12 yüklenme · .22 orta duruş · .35 itiş · .50 topuk kalçaya kalkar · .65 diz öne · .78 diz yukarıda · .90 bacak uzanır.
   Duruş evresi 0-.35; öbür bacak yarım döngü geride olduğu için .35-.50 ve .85-1 arasında iki ayak da havadadır (koşuyu yürüyüşten ayıran an). */
const KOSU = [[0, 20, 10, -12], [.12, 6, 30, 0], [.22, -8, 28, 0], [.35, -24, 12, 30], [.5, -14, 105, 70], [.65, 28, 112, 45], [.78, 52, 85, 18], [.9, 38, 34, 0]];
function kosuPoz(q) {   // periyodik Catmull-Rom
  q = ((q % 1) + 1) % 1;
  const n = KOSU.length; let i = 0; for (let k = 0; k < n; k++) if (KOSU[k][0] <= q) i = k;
  const g = j => KOSU[((j % n) + n) % n], t0 = KOSU[i][0], t1 = i + 1 < n ? KOSU[i + 1][0] : 1, u = (q - t0) / (t1 - t0);
  const out = [];
  for (let c = 1; c < 4; c++) {
    const P0 = g(i - 1)[c], P1 = g(i)[c], P2 = g(i + 1)[c], P3 = g(i + 2)[c];
    out.push(.5 * (2 * P1 + (-P0 + P2) * u + (2 * P0 - 5 * P1 + 4 * P2 - P3) * u * u + (-P0 + 3 * P1 - 3 * P2 + P3) * u * u * u) * Math.PI / 180);
  }
  return out;
}
const UYLUK = 240, BALDIR = 232;
function bacakPoz(q, A) {   // kalçaya göre diz (K), ayak bileği (F), ayak açısı ve tabanın en alt noktası; A = 0 ayakta, 1 tam koşu
  const [th0, ka0, ay0] = kosuPoz(q), th = th0 * A, ka = lerp(.05, ka0, A), ay = ay0 * A;
  const K = [Math.sin(th) * UYLUK, Math.cos(th) * UYLUK], sh = th - ka;
  const F = [K[0] + Math.sin(sh) * BALDIR, K[1] + Math.cos(sh) * BALDIR];
  const alt = F[1] + 30 + Math.max(86 * Math.sin(ay) + 14 * Math.cos(ay), -40 * Math.sin(ay) + 14 * Math.cos(ay));
  return { K, F, ay, alt };
}
// gövdenin döngü başına alması gereken yol (birim): duruşta ayak bileğinin geriye kayışı. Sahneler hızı buna göre ayarlar, ayak yerde kaymaz.
const ADIM = (bacakPoz(0, 1).F[0] - bacakPoz(.35, 1).F[0]) / .35;

/* ---------------- SEN, yandan tam boy (sağa bakar). orijin: ayaklar-zemin.
   o.dongu (koşu döngüsü sayısı; yoksa o.faz radyan), o.kos (koşu genliği 0..1), o.egil, o.diz (diz çökme 0..1),
   o.uzan: [x, y] yakın kolun hedefi (orijine göre), o.kafa. Döndürür: ayakların yeri ve evresi (sıçrama için). */
function senYan(c, p, o = {}) {
  const A = o.kos ?? 0, dz = o.diz || 0, egil = (o.egil ?? A * .07) + dz * .08;   // koşuda gövde dik, çok hafif öne
  const q0 = o.dongu ?? (o.faz || 0) / (2 * Math.PI), qs = [q0, q0 + .5], f = q0 * 2 * Math.PI;
  const bp = qs.map((q, i) => { const b = bacakPoz(q, A); b.F[0] += (1 - A) * (i ? -18 : 18); b.K[0] += (1 - A) * (i ? -9 : 9); return b; });
  // kalça yüksekliği: alttaki ayak yere değer; iki ayak da havadayken gövde yükselir
  const yq = ((q0 % .5) + .5) % .5, ucus = yq > .35 ? Math.sin(Math.PI * (yq - .35) / .15) : 0;
  const H = [0, dz > 0 ? -290 : -Math.max(bp[0].alt, bp[1].alt) - 24 * ucus * A];
  const S = [H[0] + Math.sin(egil) * 285, H[1] - Math.cos(egil) * 285];
  const bacak = (i, renk, koyu) => {
    const hip = [H[0] + (i ? -8 : 8), H[1]];
    let K, F, ta;
    if (dz > 0) { K = i ? [-30, -36] : [150, -270]; F = i ? [-190, -40] : [150, -30]; ta = i ? 1.35 : 0; }   // diz çökmüş: geri diz yerde, ön diz yukarıda
    else { K = [hip[0] + bp[i].K[0], hip[1] + bp[i].K[1]]; F = [hip[0] + bp[i].F[0], hip[1] + bp[i].F[1]]; ta = bp[i].ay; }
    uzuvG(c, hip[0], hip[1], K[0], K[1], 104, 84, renk, rgba(p.pantG, .55));
    uzuvG(c, K[0], K[1], F[0], F[1], 84, 66, renk, rgba(p.pantG, .55));
    elips(c, K[0] + 8, K[1], 26, 16, rgba('#ffffff', .05));
    c.save(); c.translate(F[0], F[1] + 30); botCiz(c, p, ta, koyu); c.restore();
    return F;
  };
  const kol = (i, yakin) => {
    const sh = [S[0] + (yakin ? 4 : -4), S[1] + 30];
    let E, Hn;
    if (yakin && o.uzan) { Hn = o.uzan; E = ik(sh[0], sh[1], Hn[0], Hn[1], 200, 190, -1); }
    else if (dz > 0) { E = [sh[0] + 36, sh[1] + 186]; Hn = [sh[0] + 150, sh[1] + 260]; }
    else {   // kol, aynı taraftaki bacağın tersine sallanır; dirsek bükük, yumruk göğüs hizasına kadar gelir
      const s = Math.cos(2 * Math.PI * (qs[i] - .78)), ua = -.85 * s * A + (1 - A) * .06, fa = ua + lerp(.12, 1.5 + .25 * s, A);
      E = [sh[0] + Math.sin(ua) * 200, sh[1] + Math.cos(ua) * 200];
      Hn = [E[0] + Math.sin(fa) * 186, E[1] + Math.cos(fa) * 186];
    }
    kolCiz(c, p, sh, E, Hn, Object.assign({ kalin: .8, poz: yakin && o.uzan ? (o.uzanPoz || 'acik') : (A > .05 ? 'yumruk' : 'sark'), taraf: -1 },
      yakin ? { sayac: o.sayac, sayacS: .5, sayacPos: .56, sayacO: Object.assign({ damar: false, kirp: 250 }, o.sayacO || {}) } :
        { kolRenk: carp(p.ceket, [.7, .7, .7]), ten: carp(p.ten, [.72, .72, .72]), tenK: carp(p.tenK, [.72, .72, .72]), kolG: carp(p.ceketG, [.7, .7, .7]) }));
  };
  const F1 = bacak(1, carp(p.pant, [.72, .72, .72]), true);
  kol(1, false);
  // gövde: ceket yandan (sırt eğrisi, açık önden tişört, yaka, cep); etekleri adımla dalgalanır
  c.save(); c.translate(H[0], H[1]); c.rotate(egil);
  const flap = Math.sin(f * 2) * 12 * A;
  c.fillStyle = p.ceket; c.beginPath(); c.moveTo(-58, -292); c.quadraticCurveTo(-82, -200, -74, -60); c.quadraticCurveTo(-72, 10, -66 - flap, 52);
  c.lineTo(52 - flap * .5, 48); c.quadraticCurveTo(60, -100, 58, -210); c.quadraticCurveTo(52, -270, 30, -300); c.quadraticCurveTo(-20, -312, -58, -292); c.closePath(); c.fill();
  c.save(); c.clip();
  c.fillStyle = lg(c, -80, 0, 70, 0, [[0, rgba(p.ceketK, .5)], [.45, rgba(p.ceketK, 0)], [1, rgba(p.ceketK, .18)]]); c.fillRect(-100, -330, 200, 400); doku(c, -100, -330, 200, 400, .45);
  c.fillStyle = p.tisort; c.beginPath(); c.moveTo(30, -300); c.quadraticCurveTo(66, -200, 64, 46); c.lineTo(42, 46); c.quadraticCurveTo(46, -200, 16, -296); c.fill();
  c.fillStyle = p.ceketG; rr(c, -24, -230, 64, 54, 8); c.fill(); c.fillStyle = p.ceketG; rr(c, -28, -240, 72, 18, 6); c.fill();
  c.strokeStyle = rgba(p.ceketK, .5); c.lineWidth = 3; c.beginPath(); c.moveTo(-60, -120); c.quadraticCurveTo(-10, -110, 50, -120); c.stroke();
  c.restore();
  c.fillStyle = p.ceketG; c.beginPath(); c.moveTo(-60, -294); c.quadraticCurveTo(-10, -330, 34, -302); c.lineTo(44, -270); c.quadraticCurveTo(-6, -296, -52, -270); c.closePath(); c.fill();
  c.restore();
  const N = [S[0] + 12, S[1] - 34];
  c.save(); c.translate(N[0] + 10, N[1] - 82); c.rotate(egil * .4 + (o.basEg || 0) + Math.sin(f * 2) * .025 * A); c.scale(.6, .6);
  kafaYan(c, p, Object.assign({ sal: -Math.cos(f * 2) * 14 * A }, o.kafa || {})); c.restore();
  const F0 = bacak(0, p.pant, false);
  kol(0, true);
  return [[F0[0], qs[0] % 1], [F1[0], qs[1] % 1]];
}

/* ---------------- SEN, arkadan tam boy. orijin: ayaklar-zemin. o.faz, o.kos, o.uzan [x,y] (sağ kol hedefi), o.sol [x,y] (sol kol hedefi), o.sayac */
function senArka(c, p, o = {}) {
  const f = o.faz || 0, A = o.kos ?? 0, bob = -Math.abs(Math.sin(f)) * 16 * A, nf = Math.sin((o.t || 0) * 1.6) * 4;
  c.save(); c.translate(0, bob);
  for (const [i, s] of [[0, -1], [1, 1]]) {
    const kalk = Math.max(0, Math.sin(f + i * Math.PI)) * A;
    const hip = [s * 44, -470], F = [s * 52, -kalk * 150], K = [s * 50, lerp(-238, -262, kalk) - kalk * 60];
    uzuvG(c, hip[0], hip[1], K[0], K[1], 106, 86, p.pant, rgba(p.pantG, .55), -s);
    uzuvG(c, K[0], K[1], F[0], F[1] - 26, 86, 70, p.pant, rgba(p.pantG, .55), -s);
    c.fillStyle = p.bot; rr(c, F[0] - 44, F[1] - 44, 88, 52 - kalk * 16, 18); c.fill();
    c.fillStyle = p.botA; c.fillRect(F[0] - 44, F[1] + 2 - kalk * 16, 88, 9);
  }
  const kol = (s, hedef, sayacli) => {
    const sh = [s * 148, -760 + nf];
    const sal = Math.sin(f + (s > 0 ? 0 : Math.PI)) * A;
    let E, Hn;
    if (hedef) { Hn = hedef; E = ik(sh[0], sh[1], Hn[0], Hn[1], 196, 186, s > 0 ? -1 : 1); }
    else { E = [s * 178, -590 + sal * 30 + nf * .6]; Hn = [s * (168 - A * 20), -420 + sal * 60 - A * 70 + nf * .3]; }
    kolCiz(c, p, sh, E, Hn, { kalin: .84, poz: hedef ? (o.uzanPoz || 'acik') : (A > .05 ? 'yumruk' : 'sark'), taraf: s, ayna: s < 0, elRot: 0 });
    if (sayacli && o.sayac !== undefined) {   // arkadan bilekteki ışık
      const r_ = SAYAC_RENK(o.sayac), fr = o.sayac - Math.floor(o.sayac), yan = o.sayac < 60 ? .55 + .45 * Math.cos(2 * Math.PI * (1 - fr)) : 1;
      const wx = lerp(E[0], Hn[0], .78), wy = lerp(E[1], Hn[1], .78);
      isik(c, wx, wy, 240, r_, .95 * yan); elips(c, wx - s * 18, wy, 12, 26, rgba(mixc(r_, '#ffffff', .4), .9 * yan));
    }
  };
  kol(-1, o.sol, true);
  kol(1, o.uzan, false);
  // ceket sırtı
  c.save(); c.translate(0, nf * .5);
  c.fillStyle = p.ceket; c.beginPath(); c.moveTo(-150, -790); c.quadraticCurveTo(0, -822, 150, -790); c.lineTo(138, -418); c.quadraticCurveTo(0, -402, -138, -418); c.closePath(); c.fill();
  c.save(); c.clip();
  c.fillStyle = lg(c, -150, 0, 150, 0, [[0, rgba(p.ceketK, .5)], [.3, rgba(p.ceketK, 0)], [.7, rgba(p.ceketK, 0)], [1, rgba(p.ceketK, .45)]]); c.fillRect(-160, -830, 320, 430);
  doku(c, -160, -830, 320, 430, .5);
  c.strokeStyle = rgba(p.ceketK, .55); c.lineWidth = 3; c.beginPath(); c.moveTo(-150, -700); c.quadraticCurveTo(0, -680, 150, -700); c.stroke();
  for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * 70, -700); c.lineTo(s * 76, -420); c.stroke(); }
  elips(c, -60, -560, 50, 80, rgba(p.ceketA, .14));
  if (o.yagmur) {   // ıslak omuzlar: üstte koyulaşan kumaş + ince akıntılar
    c.fillStyle = lg(c, 0, -820, 0, -640, [[0, 'rgba(50,30,5,.28)'], [1, 'rgba(50,30,5,0)']]); c.fillRect(-160, -830, 320, 200);
    c.strokeStyle = 'rgba(50,30,5,.16)'; c.lineWidth = 5; c.lineCap = 'round';
    for (let i = 0; i < 9; i++) { const r_ = rng(i + 3), x = -130 + r_() * 260, y = -780 + r_() * 120; c.beginPath(); c.moveTo(x, y); c.lineTo(x + (r_() - .5) * 8, y + 60 + r_() * 120); c.stroke(); }
  }
  c.restore();
  c.fillStyle = p.ceketG; c.beginPath(); c.moveTo(-86, -806); c.quadraticCurveTo(0, -830, 86, -806); c.lineTo(96, -770); c.quadraticCurveTo(0, -790, -96, -770); c.closePath(); c.fill();
  c.restore();
  c.save(); c.translate(0, -905 + nf * .6); c.scale(.58, .58); kafaArka(c, p, Object.assign({ sal: -Math.cos(f * 2) * 8 * A, yagmur: o.yagmur }, o.kafa || {})); c.restore();
  c.restore();
}

/* ---------------- KARDEŞ (fotoğrafta, önden göğüs): kırmızı kapüşonlu, yeni yanmış sayacını gösterir */
function kardesBust(c, o = {}) {
  const p = KARDES;
  c.fillStyle = p.hoodG; c.beginPath(); c.moveTo(-190, 226); c.bezierCurveTo(-180, 150, 180, 150, 190, 226); c.lineTo(150, 250); c.lineTo(-150, 250); c.closePath(); c.fill();
  c.fillStyle = p.hood; c.beginPath(); c.moveTo(-340, 700); c.bezierCurveTo(-336, 350, -280, 240, -150, 204); c.lineTo(150, 204); c.bezierCurveTo(280, 240, 336, 350, 340, 700); c.closePath(); c.fill();
  c.save(); c.clip(); c.fillStyle = lg(c, -340, 0, 340, 0, [[0, rgba(p.hoodK, .55)], [.3, rgba(p.hoodK, 0)], [.7, rgba(p.hoodK, 0)], [1, rgba(p.hoodK, .45)]]); c.fillRect(-350, 190, 700, 520); c.restore();
  for (const s of [-1, 1]) { c.strokeStyle = '#f0ece6'; c.lineWidth = 7; c.beginPath(); c.moveTo(s * 40, 216); c.quadraticCurveTo(s * 50, 300, s * 44, 380); c.stroke(); }
  kafa(c, Object.assign({ p, tip: 'kardes', gul: 1, agiz: .45, dis: true, goz: .85 }, o.kafa || {}));
  if (o.kol) kolCiz(c, p, o.kol.A, o.kol.B, o.kol.C, { kolRenk: p.hood, kolG: p.hoodG, kolK: p.hoodK, kolA: p.hoodA, manset: p.hoodG, ten: p.ten, tenK: p.tenK, sayac: SN_GUN, sayacS: .5, poz: 'acik', sayacO: { damar: false } });
}

/* ---------------- TEFECİ: önden göğüs. orijin kafa merkezi. o.kafa, o.kol: {A,B,C}, o.sayac, o.kolPoz, o.kavra */
function tefeciBust(c, o = {}) {
  const p = TEFECI;
  c.fillStyle = p.palto; c.beginPath(); c.moveTo(-340, 760); c.bezierCurveTo(-338, 380, -290, 246, -140, 210); c.lineTo(140, 210); c.bezierCurveTo(290, 246, 338, 380, 340, 760); c.closePath(); c.fill();
  c.save(); c.clip();
  c.fillStyle = lg(c, -340, 0, 340, 0, [[0, rgba(p.paltoK, .65)], [.32, rgba(p.paltoK, 0)], [.7, rgba(p.paltoK, 0)], [1, rgba(p.paltoK, .5)]]); c.fillRect(-350, 200, 700, 570);
  doku(c, -350, 200, 700, 570, .35);
  c.fillStyle = p.gomlek; c.beginPath(); c.moveTo(-80, 210); c.lineTo(80, 210); c.lineTo(40, 760); c.lineTo(-40, 760); c.closePath(); c.fill();
  for (const s of [-1, 1]) {   // geniş yakalar
    c.fillStyle = p.paltoG; c.beginPath(); c.moveTo(s * 80, 210); c.lineTo(s * 190, 236); c.lineTo(s * 150, 330); c.lineTo(s * 190, 360); c.lineTo(s * 58, 620); c.closePath(); c.fill();
    c.strokeStyle = rgba(p.paltoA, .5); c.lineWidth = 3; c.stroke();
  }
  c.strokeStyle = p.altin; c.lineWidth = 6; c.beginPath(); c.moveTo(-60, 230); c.quadraticCurveTo(0, 330, 60, 230); c.stroke();   // altın zincir
  elips(c, 0, 312, 14, 18, p.altin); elips(c, -4, 306, 4, 6, 'rgba(255,255,220,.8)');
  c.fillStyle = 'rgba(255,240,200,.8)'; rr(c, 170, 280, 50, 8, 3); c.fill();   // cepte mendil
  c.restore();
  kafa(c, Object.assign({ p, tip: 'tefeci', goz: .9, smirk: .6, gul: .25 }, o.kafa || {}));
  if (o.kol) kolCiz(c, p, o.kol.A, o.kol.B, o.kol.C, { kolRenk: p.palto, kolG: p.paltoG, kolK: p.paltoK, kolA: p.paltoA, manset: p.paltoG, ten: p.ten, tenK: p.tenK, sayac: o.sayac,
    sayacS: o.sayacS || .3, sayacO: { kirp: 900, damar: false }, poz: o.kolPoz || 'acik', yuzuk: p.altin, kavra: o.kavra, kalin: o.kalin || 1, taraf: o.taraf, ayna: o.ayna, elRot: o.elRot });
}
function tefeciTam(c, o = {}) {   // kapı eşiğinde ayakta; orijin ayaklar-zemin
  const p = TEFECI;
  for (const s of [-1, 1]) { uzuv(c, s * 36, -470, s * 40, -30, 70, 60, '#16121a'); c.fillStyle = '#0a0809'; rr(c, s * 40 - 34, -36, 78, 36, 12); c.fill(); }
  c.fillStyle = p.palto; c.beginPath(); c.moveTo(-150, -780); c.quadraticCurveTo(0, -800, 150, -780); c.lineTo(176, -250); c.quadraticCurveTo(0, -230, -176, -250); c.closePath(); c.fill();
  c.save(); c.clip(); c.fillStyle = lg(c, -176, 0, 176, 0, [[0, rgba(p.paltoK, .65)], [.4, rgba(p.paltoK, 0)], [1, rgba(p.paltoK, .5)]]); c.fillRect(-180, -800, 360, 560);
  poly(c, [[-40, -780], [40, -780], [10, -500], [-10, -500]], p.gomlek); c.restore();
  for (const s of [-1, 1]) { uzuvG(c, s * 150, -760, s * 176, -560, 80, 70, p.palto, rgba(p.paltoK, .5)); uzuvG(c, s * 176, -560, s * 150, -420, 70, 60, p.palto, rgba(p.paltoK, .5)); elips(c, s * 148, -404, 22, 26, p.tenG); }
  c.save(); c.translate(0, -890); c.scale(.56, .56); kafa(c, Object.assign({ p, tip: 'tefeci', goz: .9, smirk: .6, gul: .3 }, o.kafa || {})); c.restore();
}

/* ---------------- UYUYAN ADAM: durak bankında sızmış, önden; kolu bankın üstünde uzanır, eli kenardan sarkar.
   orijin: oturak ortası. o.kipir (göz kapağı), o.kay (sarkan elin kayması 0..1), o.sayac, o.isaret (kayıt işareti) */
function zenginBank(c, o = {}) {
  const p = ZENGIN, kay = o.kay || 0, nefes = Math.sin((o.t || 0) * 1.3) * 4;
  // bacaklar: oturur; kalçadan dizlere kısalmış (öne uzanan) uyluklar, dizden yere baldırlar
  for (const s of [-1, 1]) {
    uzuvG(c, s * 62, -14, s * 118, 46, 118, 104, p.pant, rgba('#8f897d', .45));
    uzuvG(c, s * 118, 46, s * 136, 290, 90, 74, p.pant, rgba('#8f897d', .45), s);
    c.fillStyle = p.ayak; c.beginPath(); c.ellipse(s * 150, 300, 58, 26, s * .3, 0, 7); c.fill(); c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.ellipse(s * 140, 292, 20, 8, s * .3, 0, 7); c.fill();
  }
  elips(c, 0, -4, 150, 40, p.paltoG);
  c.save(); c.translate(0, nefes * .3); c.rotate(-.05);
  c.fillStyle = p.palto; c.beginPath(); c.moveTo(-196, -400); c.quadraticCurveTo(0, -436, 196, -400); c.lineTo(176, 10); c.quadraticCurveTo(0, 36, -176, 10); c.closePath(); c.fill();
  c.save(); c.clip(); c.fillStyle = lg(c, -200, 0, 200, 0, [[0, rgba(p.paltoK, .5)], [.35, rgba(p.paltoK, 0)], [.75, rgba(p.paltoK, 0)], [1, rgba(p.paltoK, .4)]]); c.fillRect(-210, -450, 420, 500);
  poly(c, [[-46, -404], [46, -404], [18, -200], [-18, -200]], '#e9e5dc');
  c.strokeStyle = rgba(p.paltoK, .35); c.lineWidth = 3; c.beginPath(); c.moveTo(-20, -190); c.lineTo(-30, 10); c.stroke();
  c.restore();
  for (const s of [-1, 1]) { c.fillStyle = p.paltoG; c.beginPath(); c.moveTo(s * 46, -404); c.lineTo(s * 150, -378); c.lineTo(s * 104, -280); c.lineTo(s * 26, -170); c.closePath(); c.fill(); }
  // altın kule rozeti
  c.save(); c.translate(-118, -318); elips(c, 0, 0, 20, 24, p.altin); poly(c, [[-8, -14], [0, -24], [8, -14], [8, 12], [-8, 12]], '#b8862a'); c.fillStyle = '#fff4c8'; c.fillRect(-2, -8, 4, 10); c.restore();
  // atkı
  c.fillStyle = p.atki; c.beginPath(); c.moveTo(-104, -420); c.quadraticCurveTo(0, -386, 104, -420); c.lineTo(86, -366); c.quadraticCurveTo(0, -340, -86, -366); c.closePath(); c.fill();
  c.fillStyle = p.atki; rr(c, 36, -386, 58, 250, 18); c.fill(); c.fillStyle = p.atkiA; for (let i = 0; i < 4; i++) c.fillRect(40, -366 + i * 58, 50, 9);
  // kucaktaki el
  uzuvG(c, 176, -370, 176, -170, 86, 76, p.palto, rgba(p.paltoK, .4)); uzuvG(c, 176, -170, 60, -70, 76, 64, p.palto, rgba(p.paltoK, .4));
  elCiz(c, 60, -70, Math.PI + .5, .72, p, { poz: 'sark', ten: p.ten, tenK: p.tenK });
  c.restore();
  // bankın üstünde uzanan kol: omuzdan dirseğe, oradan bileğe; el kenardan sarkar
  const omz = [-186, -360 + nefes * .3], dir = [-300, -80], bil = [lerp(-560, -600, kay), lerp(-42, 10, kay)];
  kolCiz(c, p, omz, dir, bil, { kolRenk: p.palto, kolG: p.paltoG, kolK: p.paltoK, manset: p.paltoG, ten: p.ten, tenK: p.tenK, poz: 'sark', sayac: o.sayac, sayacS: .24, sayacPos: .52,
    sayacO: { kirp: 780, damar: false, isaret: o.isaret, metin: o.sayacMetin }, elRot: lerp(.9, 1.25, kay), kalin: .95, taraf: -1 });
  // baş: geriye, cama yaslanmış
  c.save(); c.translate(-26, -540 + nefes * .3); c.rotate(-.3); c.scale(.7, .7);
  kafa(c, { p, tip: 'zengin', kapali: !(o.kipir > 0), goz: o.kipir ? .18 : 0, agiz: .2 + .05 * Math.sin((o.t || 0) * 1.3), kas: -.2 });
  c.restore();
}

/* ---------------- KADIN (sokakta): önden göğüs, amber sayacını gösterir; o.bas: başını sallama açısı */
function kadinBust(c, o = {}) {
  const p = KADIN;
  c.fillStyle = p.yag; c.beginPath(); c.moveTo(-330, 720); c.bezierCurveTo(-326, 360, -280, 240, -150, 208); c.lineTo(150, 208); c.bezierCurveTo(280, 240, 326, 360, 330, 720); c.closePath(); c.fill();
  c.save(); c.clip(); c.fillStyle = lg(c, -330, 0, 330, 0, [[0, rgba(p.yagK, .6)], [.3, rgba(p.yagK, 0)], [.7, rgba(p.yagK, 0)], [1, rgba(p.yagK, .45)]]); c.fillRect(-340, 190, 680, 540);
  c.strokeStyle = rgba(p.yagA, .4); c.lineWidth = 9; for (const [x1, y1, x2, y2] of [[-240, 300, -160, 250], [170, 270, 250, 330]]) { c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo((x1 + x2) / 2, y1 - 20, x2, y2); c.stroke(); }
  c.strokeStyle = rgba(p.yagK, .6); c.lineWidth = 6; c.beginPath(); c.moveTo(0, 230); c.lineTo(0, 720); c.stroke();
  for (let i = 0; i < 4; i++) elips(c, 20, 300 + i * 90, 8, 8, rgba(p.yagK, .8));
  c.restore();
  c.fillStyle = p.yagG; c.beginPath(); c.moveTo(-200, 230); c.bezierCurveTo(-190, 140, 190, 140, 200, 230); c.lineTo(150, 252); c.lineTo(-150, 252); c.closePath(); c.fill();
  c.save(); c.rotate(o.bas || 0); kafa(c, { p, tip: 'kadin', goz: .85, kas: .55, bak: o.bak || [0, .2], agiz: 0, gul: -.3, yagmur: true }); c.restore();
  if (o.kol) kolCiz(c, p, o.kol.A, o.kol.B, o.kol.C, { kolRenk: p.yag, kolG: p.yagG, kolK: p.yagK, kolA: p.yagA, manset: p.yagG, ten: p.ten, tenK: p.tenK, sayac: o.sayac, sayacS: .46, sayacO: { damar: false }, poz: 'acik', taraf: -1, elRot: -.3 });
}

/* ---------------- yaya (kalabalık): neon kenar ışıklı silüet; yağmurluk, kapüşon ya da şemsiye; orijin ayaklar, boy ~600.
   o.renk (gövde), o.kenar (kenar ışığı rengi), o.semsiye, o.yon (1 ön / -1 arka), o.faz, o.yuru, o.sakla (bileğini cebine sokar 0..1), o.sayac */
const YAYA_RENK = ['#151a26', '#1a1726', '#121a22', '#1d1520', '#141c1a', '#18181f', '#1e1a16', '#141a28'];
function yaya(c, o) {
  const r = o.renk || '#151a26', kn = o.kenar || NEON.cam, sw = Math.sin(o.faz || 0) * 12 * (o.yuru ?? 1);
  const govde = () => {
    kapsul(c, -22, -240, -26 + sw * .3, -18, 44, r); kapsul(c, 22, -240, 26 - sw * .3, -18, 44, r);
    elips(c, -28, -8, 28, 12, r); elips(c, 28, -8, 28, 12, r);
    c.fillStyle = r; c.beginPath(); c.moveTo(-74, -480); c.quadraticCurveTo(0, -500, 74, -480); c.lineTo(92, -180); c.quadraticCurveTo(0, -168, -92, -180); c.closePath(); c.fill();
    c.fillRect(-18, -526, 36, 50); elips(c, 0, -552, 40, 48, r);
    if (o.kapuson) { c.beginPath(); c.ellipse(0, -560, 50, 58, 0, Math.PI * .85, Math.PI * 2.15); c.fill(); }
  };
  // kenar ışığı: aynı silüeti renkli çizip biraz kaydırarak arkaya koy
  c.save(); c.translate(o.kenarX ?? 5, -3); c.globalAlpha = .9;
  kapsul(c, -22, -240, -26 + sw * .3, -18, 48, kn); kapsul(c, 22, -240, 26 - sw * .3, -18, 48, kn);
  c.fillStyle = kn; c.beginPath(); c.moveTo(-78, -484); c.quadraticCurveTo(0, -504, 78, -484); c.lineTo(96, -178); c.quadraticCurveTo(0, -166, -96, -178); c.closePath(); c.fill(); elips(c, 0, -552, 44, 52, kn);
  c.restore();
  govde();
  const sak = o.sakla || 0;
  // bilekli kol: bilek önde parlar, saklarken cebe iner
  const bx = lerp(-96, -46, sak), by = lerp(-292 + sw, -300, sak);
  kapsul(c, -66, -450, bx, by, 34, r);
  if (o.sayac !== undefined && sak < .95) { const sr = SAYAC_RENK(o.sayac); isik(c, bx, by + 6, 70, sr, .9 * (1 - sak)); c.fillStyle = rgba(sr, .95 * (1 - sak)); rr(c, bx - 14, by - 2, 28, 12, 5); c.fill(); }
  if (o.semsiye) {
    kapsul(c, 66, -450, 72, -600, 32, r);
    c.strokeStyle = '#0a0c12'; c.lineWidth = 6; c.beginPath(); c.moveTo(72, -600); c.lineTo(72, -900); c.stroke();
    c.fillStyle = o.semsiye; c.beginPath(); c.moveTo(-150, -800); c.quadraticCurveTo(72, -1010, 294, -800); for (let i = 4; i >= 0; i--) c.quadraticCurveTo(-150 + (i + .5) * 88.8, -830, -150 + i * 88.8, -800); c.fill();
    c.strokeStyle = rgba(kn, .7); c.lineWidth = 4; c.beginPath(); c.moveTo(-150, -800); c.quadraticCurveTo(72, -1010, 294, -800); c.stroke();
  } else kapsul(c, 68, -450, 90, -290 - sw, 34, r);
}
