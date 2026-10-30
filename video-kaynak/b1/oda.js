/* Saat - tek odalı daire: yağmurlu pencere, iki yatak, duvardaki fotoğraf, duvar saati, masa ve not.
   Geniş plan dünyası = 1080x1920 (z = 1): pencere solda, saat ortada, fotoğraf ve kardeşin yatağı sağda, masa önde solda. */
const ODA = { pencere: [40, 360, 380, 640], saat: [815, 470, 74], foto: [690, 690, 250, 190], yatak: [600, 1190], masa: [70, 1300, 470], zemin: 1500 };
function takvim(c, x, y) {   // duvarda yırtılan takvim: günlerin üstü çizili
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + 6, y + 8, 150, 190);
  c.fillStyle = '#e8e2d6'; c.fillRect(x, y, 150, 190); c.fillStyle = '#b8333a'; c.fillRect(x, y, 150, 40);
  yaz(c, 'EKİM', x + 75, y + 21, '800 24px "Segoe UI"', '#fff', { golge: false });
  c.strokeStyle = 'rgba(60,60,70,.5)'; c.lineWidth = 1.5;
  for (let i = 0; i < 28; i++) { const cx = x + 14 + (i % 7) * 19, cy = y + 56 + Math.floor(i / 7) * 32; c.strokeRect(cx, cy, 15, 24); if (i < 26) { c.strokeStyle = 'rgba(184,51,58,.8)'; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + 15, cy + 24); c.stroke(); c.strokeStyle = 'rgba(60,60,70,.5)'; } }
}

function pencereCam(c, x, y, w, h, t, o = {}) {   // dışarısı flu neon + yağmur; camda damlalar
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip();
  c.fillStyle = lg(c, 0, y, 0, y + h, [[0, '#1d2a48'], [.6, '#3a3f66'], [1, '#6a4a6e']]); c.fillRect(x, y, w, h);
  c.save(); c.filter = 'blur(10px)';
  for (let i = 0; i < 5; i++) { c.fillStyle = 'rgba(14,20,34,.8)'; c.fillRect(x + i * w / 5 - 10, y + h * (.3 + (i % 2) * .15), w / 5 - 6, h); }
  bokeh(c, t, { seed: o.seed || 5, adet: 18, y0: y, y1: y + h, buyuk: 50, a: 1.2, renkler: [NEON.cam, NEON.mac, '#ffcf86', NEON.kir] });
  c.restore();
  const r = rng(33);   // camdaki damlalar: durgun + süzülen
  for (let i = 0; i < 70; i++) { const dx = x + r() * w, dy = y + r() * h, s = .5 + r() * 1.2; elips(c, dx, dy, 4 * s, 5 * s, 'rgba(200,225,255,.22)'); elips(c, dx - s, dy - s * 1.5, 1.6 * s, 1.6 * s, 'rgba(255,255,255,.5)'); }
  for (let i = 0; i < 9; i++) {
    const dx = x + r() * w, h0 = r() * h, v = 60 + r() * 140, dy = y + (h0 + t * v) % (h + 60) - 30;
    c.strokeStyle = 'rgba(200,225,255,.22)'; c.lineWidth = 3; c.beginPath(); c.moveTo(dx, y + Math.max(0, dy - y - 220)); c.lineTo(dx + Math.sin(dy * .02) * 4, dy); c.stroke();
    elips(c, dx, dy, 6, 8, 'rgba(210,235,255,.35)'); elips(c, dx - 2, dy - 3, 2, 2, 'rgba(255,255,255,.7)');
  }
  c.restore();
  c.strokeStyle = '#151a26'; c.lineWidth = 22; c.strokeRect(x, y, w, h);
  c.lineWidth = 14; c.beginPath(); c.moveTo(x + w / 2, y); c.lineTo(x + w / 2, y + h); c.moveTo(x, y + h * .45); c.lineTo(x + w, y + h * .45); c.stroke();
  c.fillStyle = '#20263a'; c.fillRect(x - 30, y + h + 10, w + 60, 26);
}
function duvarSaati(c, x, y, r, sn) {
  elips(c, x + 6, y + 8, r * 1.08, r * 1.08, 'rgba(0,0,0,.35)');
  elips(c, x, y, r * 1.08, r * 1.08, '#2a2f3a'); elips(c, x, y, r, r, '#e8e4da');
  c.strokeStyle = '#2a2f3a'; c.lineCap = 'round';
  for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2, L = i % 5 ? .06 : .14; c.lineWidth = i % 5 ? 1.5 : 4; c.beginPath(); c.moveTo(x + Math.cos(a) * r * (.92 - L), y + Math.sin(a) * r * (.92 - L)); c.lineTo(x + Math.cos(a) * r * .92, y + Math.sin(a) * r * .92); c.stroke(); }
  const s = sn % 43200, ak = s / 43200 * Math.PI * 2 - Math.PI / 2, am = Math.floor((s % 3600) / 60) / 60 * Math.PI * 2 - Math.PI / 2, as = Math.floor(s % 60) / 60 * Math.PI * 2 - Math.PI / 2;
  c.lineWidth = r * .09; c.strokeStyle = '#1a1d24'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(ak) * r * .5, y + Math.sin(ak) * r * .5); c.stroke();
  c.lineWidth = r * .06; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(am) * r * .78, y + Math.sin(am) * r * .78); c.stroke();
  c.lineWidth = r * .025; c.strokeStyle = '#c0392b'; c.beginPath(); c.moveTo(x - Math.cos(as) * r * .15, y - Math.sin(as) * r * .15); c.lineTo(x + Math.cos(as) * r * .84, y + Math.sin(as) * r * .84); c.stroke();
  elips(c, x, y, r * .07, r * .07, '#1a1d24');
  c.fillStyle = 'rgba(255,255,255,.18)'; c.beginPath(); c.ellipse(x - r * .3, y - r * .4, r * .5, r * .25, -.5, 0, 7); c.fill();
}
function yatak(c, x, y, w, o = {}) {   // x,y: yatağın sol üst köşesi (yastık tarafı)
  c.fillStyle = '#3a2f2a'; c.fillRect(x, y - 140, 26, 360);
  c.fillStyle = '#4a3d36'; rr(c, x, y, w, 70, 10); c.fill();
  c.fillStyle = '#c9c6d4'; rr(c, x + 8, y - 30, w - 16, 60, 18); c.fill();
  c.fillStyle = '#e4e0ea'; rr(c, x + 30, y - 76, 190, 74, 30); c.fill();   // yastık
  if (o.bos) { c.fillStyle = 'rgba(120,120,150,.35)'; c.beginPath(); c.ellipse(x + 125, y - 44, 60, 16, 0, 0, 7); c.fill(); }
  c.fillStyle = o.yorgan || '#455c8a'; c.beginPath(); c.moveTo(x + 200, y - 40);
  if (o.bos) { c.quadraticCurveTo(x + 260, y - 120, x + 330, y - 50); c.quadraticCurveTo(x + 380, y - 110, x + w - 10, y - 30); }
  else c.quadraticCurveTo(x + w * .6, y - 70, x + w - 10, y - 30);
  c.lineTo(x + w, y + 60); c.lineTo(x + 190, y + 60); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(20,30,60,.4)'; c.lineWidth = 4; for (const k of [.4, .6, .8]) { c.beginPath(); c.moveTo(x + w * k, y - 50); c.quadraticCurveTo(x + w * k + 30, y, x + w * k - 10, y + 50); c.stroke(); }
  c.fillStyle = '#2a221e'; c.fillRect(x + 10, y + 70, 20, 90); c.fillRect(x + w - 30, y + 70, 20, 90);
}
function fotoCerceve(c, x, y, w, h, o = {}) {   // siz ve kardeşiniz, küçük bir pastanın önünde; kardeşiniz yeni yanmış sayacını gösterir
  c.save(); c.translate(x, y); c.rotate(o.rot ?? -.03);
  c.fillStyle = 'rgba(0,0,0,.4)'; c.fillRect(8, 10, w, h);
  c.fillStyle = '#d8c9a8'; c.fillRect(-10, -10, w + 20, h + 20);
  c.save(); c.beginPath(); c.rect(0, 0, w, h); c.clip();
  c.fillStyle = lg(c, 0, 0, 0, h, [[0, '#7a4a3a'], [1, '#3a2230']]); c.fillRect(0, 0, w, h);
  isik(c, w * .5, h * .78, w * .6, '#ffcf86', .6);
  const s = w / 1000;
  c.save(); c.translate(w * .32, h * .5); c.scale(s * 1.05, s * 1.05); senBust(c, PS, { kafa: { gul: 1, agiz: .4, dis: true, goz: .8, bak: [.3, 0] } }); c.restore();
  c.save(); c.translate(w * .68, h * .52); c.scale(s, s);
  kardesBust(c, { kol: { A: [220, 260], B: [300, 420], C: [180, 140] }, kafa: { bak: [-.3, 0] } }); c.restore();
  c.fillStyle = '#f4ece0'; rr(c, w * .38, h * .8, w * .24, h * .16, 6); c.fill(); c.fillStyle = '#e36b8a'; c.fillRect(w * .38, h * .82, w * .24, h * .03);
  for (const k of [0, 1]) { c.fillStyle = '#e8e2f0'; c.fillRect(w * (.46 + k * .06), h * .72, 4, h * .08); elips(c, w * (.46 + k * .06) + 2, h * .7, 4, 7, '#ffcf4a'); isik(c, w * (.46 + k * .06) + 2, h * .7, 30, '#ffb04a', .6); }
  yaz(c, '25', w * .5, h * .88, `800 ${Math.round(h * .07)}px "Segoe UI"`, '#c0392b', { golge: false });
  c.fillStyle = 'rgba(255,240,210,.12)'; c.fillRect(0, 0, w, h);
  c.restore();
  c.fillStyle = 'rgba(255,255,255,.1)'; poly(c, [[0, 0], [w * .4, 0], [0, h * .6]]);
  c.restore();
}
function notKagit(c, x, y, s, o = {}) {   // el yazısı not; o.satir: görünen satır (kısmi), o.katli: 0 açık / 1 katlı
  c.save(); c.translate(x, y); c.rotate(o.rot ?? -.04); c.scale(s, s);
  const k = o.katli || 0;
  c.fillStyle = 'rgba(0,0,0,.3)'; c.fillRect(-300 + 10, -200 + 14, 600, 400 * (1 - k * .5));
  c.fillStyle = '#efe8d8'; c.fillRect(-300, -200, 600, 400 * (1 - k * .5));
  c.fillStyle = 'rgba(120,100,70,.18)'; c.fillRect(-300, -2, 600, 4);
  c.strokeStyle = 'rgba(120,150,200,.35)'; c.lineWidth = 2; for (let i = 0; i < 6; i++) { c.beginPath(); c.moveTo(-280, -130 + i * 62); c.lineTo(280, -130 + i * 62); c.stroke(); }
  if (k < .5) {
    const satirlar = ['Abi, borcum vardı.', 'Sana 5 saat bıraktım.', "6'da dönüp hepsini", 'geri vereceğim.'], gor = o.satir ?? 4;
    c.font = '64px Caveat'; c.fillStyle = '#1d2a55'; c.textBaseline = 'alphabetic'; c.textAlign = 'left';
    for (let i = 0; i < satirlar.length; i++) {
      const g = clamp(gor - i); if (g <= 0) break;
      const m = satirlar[i], n = Math.ceil(m.length * g);
      c.save(); c.translate(-262, -140 + i * 76); c.rotate(-.015 * i); c.fillText(m.slice(0, n), 0, 0); c.restore();
    }
  }
  c.restore();
}
function masa(c, x, y, w, o = {}) {   // x,y: masa üstünün sol ucu
  c.fillStyle = '#4a3a30'; c.fillRect(x, y, w, 34); c.fillStyle = '#3a2c24'; c.fillRect(x, y + 34, w, 16);
  c.fillStyle = '#2e231d'; c.fillRect(x + 20, y + 50, 26, 300); c.fillRect(x + w - 46, y + 50, 26, 300);
  c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(x, y, w, 6);
  // kupa
  const mx = x + w * .62, my = y - 4;
  c.fillStyle = '#c8d0dc'; rr(c, mx - 40, my - 92, 80, 92, 10); c.fill(); c.strokeStyle = '#c8d0dc'; c.lineWidth = 12; c.beginPath(); c.arc(mx + 44, my - 50, 22, -1.2, 1.2); c.stroke();
  c.fillStyle = '#3a2418'; elips(c, mx, my - 90, 36, 8, '#3a2418');
  c.fillStyle = 'rgba(0,0,0,.25)'; rr(c, mx - 40, my - 92, 26, 92, 10); c.fill();
  if (o.not !== false) { c.save(); c.translate(x + w * .3, y - 8); c.scale(1, .32); c.fillStyle = '#efe8d8'; c.fillRect(-90, -60, 180, 120); c.fillStyle = 'rgba(0,0,0,.12)'; c.fillRect(-90, -2, 180, 4); c.restore(); }
  c.fillStyle = '#9a9aa8'; elips(c, x + w * .1, y - 4, 22, 5, '#9a9aa8');   // anahtarlar
}
function odaGenis(c, t, o = {}) {   // geniş plan: duvar, zemin, pencere, saat, fotoğraf, kardeşin boş yatağı, masa
  c.fillStyle = lg(c, 0, 0, 0, ODA.zemin, [[0, '#232a3d'], [1, '#33394f']]); c.fillRect(-600, -400, 2300, ODA.zemin + 400);
  doku(c, -600, -400, 2300, ODA.zemin + 400, .35);
  c.fillStyle = 'rgba(0,0,0,.18)'; for (const [x, y, w, h] of [[480, 300, 90, 200], [880, 1000, 120, 60], [140, 1100, 60, 140]]) rr(c, x, y, w, h, 20), c.fill();   // dökülmüş sıva
  const [px, py, pw, ph] = ODA.pencere;
  pencereCam(c, px, py, pw, ph, t, { seed: 5 });
  c.save(); c.globalCompositeOperation = 'screen';   // pencereden düşen neon ışığı
  c.fillStyle = lg(c, px + pw, py, 900, 1500, [[0, 'rgba(255,60,200,.22)'], [1, 'rgba(255,60,200,0)']]); poly(c, [[px + pw * .2, py], [px + pw, py + ph * .3], [1100, 1500], [400, 1600]]);
  c.fillStyle = lg(c, px, py, 300, 1700, [[0, 'rgba(60,220,255,.18)'], [1, 'rgba(60,220,255,0)']]); poly(c, [[px, py + ph * .5], [px + pw * .5, py + ph], [600, 1900], [-100, 1900]]);
  c.restore();
  takvim(c, 470, 640);
  c.fillStyle = '#3a2f2a'; c.fillRect(450, 1000, 200, 14); c.fillStyle = '#2a221e'; c.fillRect(470, 1014, 10, 30); c.fillRect(620, 1014, 10, 30);   // raf
  c.fillStyle = '#6a8a9a'; rr(c, 470, 940, 40, 60, 6); c.fill(); c.fillStyle = '#b87a3a'; rr(c, 530, 960, 30, 40, 4); c.fill(); c.fillStyle = '#8a6a8a'; c.fillRect(580, 920, 50, 80);
  c.strokeStyle = '#141824'; c.lineWidth = 4; c.beginPath(); c.moveTo(560, -400); c.lineTo(560, 200); c.stroke();   // tavandan sarkan ampul (kapalı)
  elips(c, 560, 222, 22, 28, 'rgba(220,220,200,.35)'); c.fillStyle = '#2a2f3a'; c.fillRect(548, 196, 24, 14);
  c.strokeStyle = 'rgba(10,12,20,.7)'; c.lineWidth = 5; c.beginPath(); c.moveTo(1080, 1080); c.quadraticCurveTo(980, 1120, 960, 1170); c.stroke();   // priz kablosu
  c.fillStyle = '#d8d4c8'; rr(c, 1030, 1060, 40, 56, 6); c.fill();
  duvarSaati(c, ODA.saat[0], ODA.saat[1], ODA.saat[2], o.saat ?? 32220);
  const [fx, fy, fw, fh] = ODA.foto; fotoCerceve(c, fx, fy, fw, fh);
  c.fillStyle = lg(c, 0, ODA.zemin, 0, 1920, [[0, '#2a221e'], [1, '#17120f']]); c.fillRect(-600, ODA.zemin, 2300, 600);
  c.strokeStyle = 'rgba(0,0,0,.35)'; c.lineWidth = 3; for (let x = -600; x < 1700; x += 120) { c.beginPath(); c.moveTo(x, ODA.zemin); c.lineTo(540 + (x - 540) * 1.8, 1920); c.stroke(); }
  c.fillStyle = '#1a1f2c'; c.fillRect(-600, ODA.zemin - 16, 2300, 16);
  yatak(c, ODA.yatak[0], ODA.yatak[1], 520, { bos: true, yorgan: '#8a3a46' });
  masa(c, ODA.masa[0], ODA.masa[1], ODA.masa[2], { not: o.not !== false });
}
