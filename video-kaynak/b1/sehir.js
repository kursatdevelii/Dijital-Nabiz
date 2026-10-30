/* Saat - şehir: yağmur, neon, binalar, Yukarı Şehir + sur + Büyük Saat, ıslak zemin, yan sokak, kavşak (tefeci + durak).
   Renk düzeni: petrol mavisi-gri yağmur, camgöbeği/macenta neon, uzakta sıcak altın Yukarı Şehir. */
const NEON = { cam: '#3ff4ff', mac: '#ff3fd2', sari: '#ffd23f', kir: '#ff2e4c', mor: '#a66bff', tur: '#ff8a2a' };

/* ---------------- yağmur (ekran uzayı) */
const DAMLA = (() => { const r = rng(91), a = []; for (let i = 0; i < 340; i++) a.push({ x: r() * 1300 - 110, y: r() * 2100, z: .35 + r() * .9, v: r() }); return a; })();
function yagmurCiz(c, t, o = {}) {
  const yog = o.yogun ?? 1, aci = o.aci ?? .12, renk = o.renk || '#cfe4ff', hiz = o.hiz ?? 1;
  c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.lineCap = 'round';
  const n = Math.floor(DAMLA.length * clamp(yog, 0, 1));
  for (let i = 0; i < n; i++) {
    const d = DAMLA[i], L = 38 + d.z * 70, v = (1500 + d.z * 1500) * hiz;
    const y = ((d.y + t * v) % 2150) - 120, x = ((d.x + y * aci + (o.kay || 0) * d.z) % 1300 + 1300) % 1300 - 110;
    if (o.bolge && !o.bolge(x, y)) continue;
    c.strokeStyle = rgba(renk, (.1 + d.z * .22) * (o.a ?? 1)); c.lineWidth = .8 + d.z * 1.8;
    c.beginPath(); c.moveTo(x, y); c.lineTo(x - aci * L, y - L); c.stroke();
  }
  c.restore();
}
function sicramaCiz(c, t, x0, x1, y0, y1, o = {}) {   // zemine düşen damlaların sıçraması
  const r = rng(Math.floor(t * 18) + 5), n = o.adet || 40;
  c.save(); c.strokeStyle = rgba(o.renk || '#d8ecff', o.a ?? .5); c.lineWidth = 2;
  for (let i = 0; i < n; i++) {
    const x = lerp(x0, x1, r()), y = lerp(y0, y1, r()), s = .5 + r() * .8 * (o.olcek || 1), f = r();
    c.beginPath(); c.ellipse(x, y, 10 * s * (1 + f), 3 * s * (1 + f), 0, Math.PI, 0); c.stroke();
  }
  c.restore();
}
function halkalar(c, t, x, y, s, renk = '#bfe0ff') {   // su birikintisinde açılan halka
  for (let k = 0; k < 3; k++) { const f = ((t * .9 + k / 3 + x * .001) % 1); c.strokeStyle = rgba(renk, .35 * (1 - f)); c.lineWidth = 2; c.beginPath(); c.ellipse(x, y, 10 + f * 60 * s, (3 + f * 16) * s, 0, 0, 7); c.stroke(); }
}

/* ---------------- neon tabela */
function titreme(t, seed, oran = .05) {   // neonun ara ara sönüp yanması
  const r = rng(Math.floor(t * 12) + seed * 101)();
  return r < oran ? .25 : 1;
}
function neon(c, metin, x, y, o = {}) {
  const renk = o.renk || NEON.cam, f = o.font || 56, a = (o.a ?? 1) * (o.t !== undefined && o.titre ? titreme(o.t, o.seed || 1, o.titre) : 1);
  c.save(); c.translate(x, y); if (o.rot) c.rotate(o.rot);
  c.font = `${o.agirlik || 800} ${f}px ${o.yazi || '"Segoe UI"'}`; c.textAlign = 'center'; c.textBaseline = 'middle'; if (o.aralik) c.letterSpacing = o.aralik;
  const w = c.measureText(metin).width;
  if (o.kutu !== false) {
    rr(c, -w / 2 - f * .5, -f * .78, w + f, f * 1.56, f * .25); c.fillStyle = o.zemin || 'rgba(8,10,20,.78)'; c.fill();
    c.strokeStyle = rgba(renk, .55 * a); c.lineWidth = 3; c.shadowColor = renk; c.shadowBlur = 16 * a; c.stroke();
  }
  if (a > 0) {
    isik(c, 0, 0, w * .9 + f * 2, renk, .22 * a);
    c.shadowColor = renk; c.shadowBlur = f * .55 * a; c.fillStyle = rgba(renk, .95 * a); c.fillText(metin, 0, 0);
    c.shadowBlur = f * .15; c.fillStyle = rgba(mixc(renk, '#ffffff', .7), .85 * a); c.fillText(metin, 0, 0);
  }
  c.restore();
  return w;
}

/* ---------------- gökyüzü + Yukarı Şehir + sur + Büyük Saat */
function gokSabah(c, o = {}) {
  const y0 = o.y0 ?? -400, y1 = o.ufuk ?? 900;
  c.fillStyle = lg(c, 0, y0, 0, y1, [[0, '#121c33'], [.45, '#263c5c'], [.78, '#5a5f82'], [1, '#c98a8e']]); c.fillRect(-3000, y0 - 2000, 7000, y1 - y0 + 2100);
  isik(c, o.gx ?? 640, y1 - 40, o.gr ?? 900, '#ffb562', .55);
  const r = rng(4);   // alçak yağmur bulutları
  for (let i = 0; i < 22; i++) { const x = (r() * 2400 - 700 + (o.t || 0) * (6 + r() * 6)) % 2400 - 400, y = y0 + 200 + r() * (y1 - y0) * .6; elips(c, x, y, 260 + r() * 300, 60 + r() * 60, rgba('#1a2440', .35 + r() * .25)); }
}
function buyukSaat(c, x, y, r, saatSn, o = {}) {   // surun kapısındaki yeşil kadran
  isik(c, x, y, r * 4, '#3dffa0', .45 * (o.a ?? 1));
  elips(c, x, y, r * 1.12, r * 1.12, '#0c1a1a');
  c.fillStyle = rg(c, x, y, 0, r, [[0, '#7dffc8'], [.7, '#22d985'], [1, '#0d7a4c']]); c.beginPath(); c.arc(x, y, r, 0, 7); c.fill();
  c.strokeStyle = 'rgba(10,40,30,.8)'; c.lineWidth = Math.max(1, r * .05);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; c.beginPath(); c.moveTo(x + Math.cos(a) * r * .8, y + Math.sin(a) * r * .8); c.lineTo(x + Math.cos(a) * r * .94, y + Math.sin(a) * r * .94); c.stroke(); }
  const s = saatSn % 43200, ak = s / 43200 * Math.PI * 2 - Math.PI / 2, am = (s % 3600) / 3600 * Math.PI * 2 - Math.PI / 2;
  c.strokeStyle = '#06261a'; c.lineCap = 'round';
  c.lineWidth = r * .12; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(ak) * r * .5, y + Math.sin(ak) * r * .5); c.stroke();
  c.lineWidth = r * .07; c.beginPath(); c.moveTo(x, y); c.lineTo(x + Math.cos(am) * r * .8, y + Math.sin(am) * r * .8); c.stroke();
  elips(c, x, y, r * .08, r * .08, '#06261a');
}
function yukariSehir(c, x, y, s, o = {}) {   // tepe, altın ışıklı beyaz kuleler, önünde sur ve Büyük Saat
  c.save(); c.translate(x, y); c.scale(s, s);
  isik(c, 0, -260, 1100, '#ffc46b', .5);
  c.fillStyle = '#26304a'; c.beginPath(); c.moveTo(-1100, 40); c.bezierCurveTo(-700, -120, -300, -200, 0, -210); c.bezierCurveTo(300, -200, 700, -120, 1100, 40); c.closePath(); c.fill();
  const r = rng(12);
  for (let i = 0; i < 17; i++) {
    const kx = -620 + i * 78 + (r() - .5) * 30, kh = 260 + r() * 420 * (1 - Math.abs(kx) / 900), kw = 44 + r() * 40, ky = -170 + Math.abs(kx) * .16;
    c.fillStyle = lg(c, kx, 0, kx + kw, 0, [[0, '#e9eef8'], [.6, '#c9d2e6'], [1, '#8f9cbb']]); rr(c, kx, ky - kh, kw, kh, 6); c.fill();
    if (r() < .5) { c.fillStyle = '#d7deee'; poly(c, [[kx, ky - kh], [kx + kw / 2, ky - kh - 60 - r() * 60], [kx + kw, ky - kh]]); }
    c.fillStyle = 'rgba(255,205,110,.85)'; for (let j = 0; j < kh / 34; j++) if (r() < .55) c.fillRect(kx + 8, ky - kh + 20 + j * 34, kw - 16, 6);
    isik(c, kx + kw / 2, ky - kh * .5, kh * .6, '#ffcf7a', .12);
  }
  // sur
  c.fillStyle = '#323a55'; c.fillRect(-1150, -60, 2300, 160);
  c.fillStyle = '#3c4562'; for (let i = -1150; i < 1150; i += 70) c.fillRect(i, -92, 40, 34);
  c.fillStyle = 'rgba(255,190,100,.25)'; c.fillRect(-1150, -60, 2300, 6);
  c.fillStyle = '#2a3048'; rr(c, -130, -320, 260, 420, 12); c.fill();   // kapı kulesi
  c.fillStyle = '#353d5a'; poly(c, [[-150, -320], [0, -400], [150, -320]]);
  c.fillStyle = '#0b0f1c'; c.beginPath(); c.moveTo(-70, 100); c.lineTo(-70, -10); c.quadraticCurveTo(0, -80, 70, -10); c.lineTo(70, 100); c.fill();
  isik(c, 0, 20, 160, '#ffc46b', .4);
  buyukSaat(c, 0, -205, 78, o.saat ?? 32220, o);
  c.restore();
}

/* ---------------- binalar */
function pencereler(c, x, y, w, h, o) {
  const r = rng(o.seed || 1), aw = o.aw || 46, ah = o.ah || 64, gx = o.gx || 30, gy = o.gy || 40;
  for (let yy = y + gy; yy + ah < y + h - 10; yy += ah + gy) for (let xx = x + gx; xx + aw < x + w - 10; xx += aw + gx) {
    const k = r();
    let renk = '#141a28';
    if (k < (o.isik ?? .35)) renk = r() < .6 ? '#ffcf86' : r() < .5 ? '#9fe9ff' : '#ff9ad8';
    c.fillStyle = renk; c.fillRect(xx, yy, aw, ah);
    if (renk !== '#141a28') { isik(c, xx + aw / 2, yy + ah / 2, aw * 1.6, renk, .18); c.fillStyle = 'rgba(0,0,0,.25)'; c.fillRect(xx, yy + ah * .55, aw, 3); }
    c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(xx - 3, yy + ah, aw + 6, 6);
    if (r() < .18) { c.fillStyle = '#5a6070'; c.fillRect(xx + aw * .1, yy + ah + 6, aw * .8, 22); }   // klima
  }
}
function bina(c, x, y, w, h, o = {}) {   // y: binanın tabanı
  c.fillStyle = o.renk || '#232c3f'; c.fillRect(x, y - h, w, h);
  c.fillStyle = lg(c, x, 0, x + w, 0, [[0, 'rgba(0,0,0,.25)'], [.2, 'rgba(0,0,0,0)'], [1, 'rgba(0,0,0,.35)']]); c.fillRect(x, y - h, w, h);
  pencereler(c, x, y - h, w, h - (o.zemin || 0), o);
  c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(x, y - h, w, 8);
  if (o.cati) { c.fillStyle = '#1a2030'; c.fillRect(x + w * .6, y - h - 70, 70, 70); c.strokeStyle = '#1a2030'; c.lineWidth = 4; c.beginPath(); c.moveTo(x + w * .3, y - h); c.lineTo(x + w * .3, y - h - 120); c.stroke(); }
}
function camasirIpi(c, x1, y1, x2, y2, t, seed) {
  c.strokeStyle = 'rgba(20,24,34,.9)'; c.lineWidth = 3; c.beginPath(); c.moveTo(x1, y1); c.quadraticCurveTo((x1 + x2) / 2, (y1 + y2) / 2 + 40, x2, y2); c.stroke();
  const r = rng(seed);
  for (let i = 1; i < 7; i++) {
    const f = i / 7, x = lerp(x1, x2, f), y = lerp(y1, y2, f) + 40 * 4 * f * (1 - f), w = 30 + r() * 30, h = 40 + r() * 50, sal = Math.sin(t * 2 + i) * 4;
    c.fillStyle = ['#c0475e', '#e3d6b8', '#4a7bb5', '#6a9a5a', '#d9a03a'][Math.floor(r() * 5)];
    c.beginPath(); c.moveTo(x - w / 2, y); c.lineTo(x + w / 2, y); c.lineTo(x + w / 2 + sal, y + h); c.lineTo(x - w / 2 + sal, y + h); c.fill();
  }
}
function islakZemin(c, y0, y1, isiklar, o = {}) {   // ıslak asfalt: neon yansımaları dikey lekeler halinde
  c.fillStyle = lg(c, 0, y0, 0, y1, [[0, o.ust || '#1b2333'], [1, o.alt || '#0c1019']]); c.fillRect(-3000, y0, 7000, y1 - y0);
  c.save(); c.globalCompositeOperation = 'screen';
  for (const L of isiklar) {
    const w = L.w || 80, h = (y1 - y0) * (L.uzun ?? .9);
    c.fillStyle = lg(c, 0, y0, 0, y0 + h, [[0, rgba(L.renk, .5 * (L.a ?? 1))], [1, rgba(L.renk, 0)]]);
    for (let i = 0; i < 5; i++) { const ww = w * (1 - i * .15), off = Math.sin(i * 1.7 + (o.t || 0) * 1.3) * 6; c.fillRect(L.x - ww / 2 + off, y0 + i * 6, ww, h * (1 - i * .12)); }
  }
  c.restore();
}
function bokeh(c, t, o = {}) {   // odak dışı neon ışıkları
  const r = rng(o.seed || 3), n = o.adet || 26;
  c.save(); c.globalCompositeOperation = 'screen';
  for (let i = 0; i < n; i++) {
    const renk = (o.renkler || [NEON.cam, NEON.mac, '#ffcf86', NEON.mor])[Math.floor(r() * (o.renkler || [1, 2, 3, 4]).length)];
    const x = r() * 1300 - 110 + Math.sin(t * .4 + i) * 10, y = (o.y0 ?? 0) + r() * ((o.y1 ?? 1920) - (o.y0 ?? 0)), rad = 30 + r() * (o.buyuk || 90);
    c.fillStyle = rg(c, x, y, 0, rad, [[0, rgba(renk, .32 * (o.a ?? 1))], [.75, rgba(renk, .22 * (o.a ?? 1))], [1, rgba(renk, 0)]]); c.beginPath(); c.arc(x, y, rad, 0, 7); c.fill();
  }
  c.restore();
}

/* ---------------- pencereden şehir (Sahne 2) */
function manzara(c, t, o = {}) {
  gokSabah(c, { ufuk: 980, gx: 640, gr: 900, t });
  yukariSehir(c, 640, 980, .62, { saat: o.saat });
  const r = rng(21);
  for (let i = 0; i < 12; i++) { const w = 120 + r() * 160; bina(c, -200 + i * 130, 1180, w, 260 + r() * 240, { renk: '#1f2a40', seed: 40 + i, isik: .3, aw: 18, ah: 24, gx: 14, gy: 18, cati: r() < .4 }); }
  c.fillStyle = 'rgba(120,140,190,.22)'; c.fillRect(-500, 1000, 2200, 200);   // sis
  for (let i = 0; i < 8; i++) { const w = 220 + r() * 160; bina(c, -260 + i * 200, 1560, w, 380 + r() * 260, { renk: '#18202f', seed: 60 + i, isik: .4, aw: 30, ah: 42, gx: 22, gy: 28, cati: true }); }
  camasirIpi(c, 80, 1230, 470, 1250, t, 4); camasirIpi(c, 620, 1260, 1000, 1240, t, 5);
  neon(c, 'KAHVE · 4 DK', 250, 1320, { renk: NEON.cam, font: 40, t, titre: .03, seed: 2 });
  neon(c, 'EKMEK · 12 DK', 820, 1380, { renk: NEON.mac, font: 40, t, titre: .02, seed: 3 });
  neon(c, 'OTOBÜS · 1 SA', 520, 1480, { renk: NEON.sari, font: 36, t, seed: 4 });
  neon(c, 'OTEL', 980, 1180, { renk: NEON.kir, font: 34, t, titre: .08, seed: 5 });
  c.fillStyle = 'rgba(100,120,170,.16)'; c.fillRect(-500, 1100, 2200, 600);
  for (let i = 0; i < 7; i++) { const w = 260 + r() * 140; bina(c, -300 + i * 220, 2000, w, 520 + r() * 160, { renk: '#121826', seed: 80 + i, isik: .45, aw: 40, ah: 56, gx: 30, gy: 34 }); }
  neon(c, 'ZAMAN VERİLİR', 300, 1680, { renk: NEON.kir, font: 48, t, titre: .06, seed: 6 });
  neon(c, 'KİRA · 2 GÜN', 830, 1610, { renk: NEON.mor, font: 38, t, seed: 7 });
}

/* ---------------- yan sokak (cepheye dik bakış): koşu, kafe, kalabalık. Dünya x: 0..5200, kaldırım y 1540, yol 1640 */
const YAN_DUKKAN = [
  { x: 150, w: 520, tip: 'kapi', ad: '17' },
  { x: 760, w: 640, tip: 'kafe', neon: 'KAHVE · 4 DK', renk: NEON.cam },
  { x: 1480, w: 560, tip: 'dukkan', neon: 'EKMEK · 12 DK', renk: NEON.mac },
  { x: 2120, w: 600, tip: 'dukkan', neon: 'TAMİR · 3 SA', renk: NEON.sari },
  { x: 2800, w: 640, tip: 'dukkan', neon: 'İLAÇ · 6 SA', renk: '#5cff8a' },
  { x: 3520, w: 560, tip: 'dukkan', neon: 'OTEL · 1 GÜN', renk: NEON.kir },
  { x: 4160, w: 640, tip: 'dukkan', neon: 'ÇAY · 2 DK', renk: NEON.mor },
];
function yanSokak(c, t, o = {}) {
  const kx = o.kx || 0;   // kamera x (parallax için)
  c.save(); c.translate(kx * .55, 0);
  gokSabah(c, { y0: -200, ufuk: 700, gx: 2600, gr: 1400, t });
  const r0 = rng(2);
  for (let i = 0; i < 30; i++) bina(c, -400 + i * 220, 820, 210, 520 + r0() * 300, { renk: '#1c2538', seed: 200 + i, isik: .3, aw: 22, ah: 30, gx: 16, gy: 22, cati: r0() < .3 });
  c.fillStyle = 'rgba(110,130,180,.22)'; c.fillRect(-1000, 500, 8000, 400);
  c.restore();
  // ön cephe
  const r = rng(7);
  for (let i = 0; i < 9; i++) bina(c, -300 + i * 640, 1540, 650, 1500, { renk: i % 2 ? '#29324a' : '#2f2b44', seed: 300 + i, isik: .38, zemin: 460 });
  for (let i = 0; i < 9; i++) camasirIpi(c, -200 + i * 640, 420 + r() * 200, 300 + i * 640, 460 + r() * 200, t, 30 + i);
  for (const d of YAN_DUKKAN) {
    c.fillStyle = '#151a26'; c.fillRect(d.x, 1080, d.w, 460);
    if (d.tip === 'kapi') {
      c.fillStyle = '#2b2f3c'; rr(c, d.x + 140, 1130, 240, 410, 8); c.fill();
      c.fillStyle = o.kapiAcik ? '#ffcf86' : '#1a1d27'; rr(c, d.x + 160, 1150, 200, 390, 6); c.fill();
      c.fillStyle = '#d8b25a'; elips(c, d.x + 330, 1350, 8, 8, '#d8b25a');
      yaz(c, d.ad, d.x + 260, 1100, '700 44px Consolas', '#e8e2d0', { golge: false });
      isik(c, d.x + 260, 1130, 220, '#ffcf86', .25);
    } else {
      c.fillStyle = d.tip === 'kafe' ? '#3b2a24' : '#1e2433'; c.fillRect(d.x + 30, 1180, d.w - 60, 300);
      c.fillStyle = rg(c, d.x + d.w / 2, 1340, 0, d.w * .6, [[0, rgba(d.renk, .35)], [1, rgba(d.renk, .05)]]); c.fillRect(d.x + 30, 1180, d.w - 60, 300);
      for (let k = 0; k < 4; k++) { const sx = d.x + 70 + k * (d.w - 140) / 3; c.fillStyle = 'rgba(10,12,18,.8)'; rr(c, sx - 26, 1330, 52, 150, 20); c.fill(); elips(c, sx, 1318, 24, 26, 'rgba(10,12,18,.8)'); }
      c.fillStyle = 'rgba(200,230,255,.08)'; poly(c, [[d.x + 40, 1190], [d.x + 140, 1190], [d.x + 60, 1470], [d.x + 40, 1470]]);
      c.fillStyle = d.tip === 'kafe' ? '#7a2a2a' : '#2a3348'; poly(c, [[d.x + 10, 1100], [d.x + d.w - 10, 1100], [d.x + d.w + 20, 1170], [d.x - 20, 1170]]);   // tente
      if (d.tip === 'kafe') { c.fillStyle = '#e8dcc8'; for (let k = 0; k < 8; k++) poly(c, [[d.x - 20 + k * (d.w + 40) / 8, 1170], [d.x - 20 + (k + .5) * (d.w + 40) / 8, 1170], [d.x - 20 + (k + .25) * (d.w + 40) / 8, 1190]]); }
    }
    if (d.neon) neon(c, d.neon, d.x + d.w / 2, 1040, { renk: d.renk, font: 50, t, titre: .03, seed: d.x });
  }
  // kafe kapısının yanındaki okuyucu
  const ok = YAN_DUKKAN[1].x + YAN_DUKKAN[1].w - 30;
  c.fillStyle = '#2a2e38'; rr(c, ok - 30, 1260, 60, 120, 10); c.fill(); c.fillStyle = '#0b1a22'; rr(c, ok - 22, 1272, 44, 40, 6); c.fill();
  isik(c, ok, 1292, 50, NEON.cam, .6);
  // kaldırım, yol
  c.fillStyle = '#323848'; c.fillRect(-1000, 1540, 7000, 24); c.fillStyle = '#262b38'; c.fillRect(-1000, 1564, 7000, 76);
  const yans = []; for (const d of YAN_DUKKAN) if (d.neon) yans.push({ x: d.x + d.w / 2, renk: d.renk, w: 200 });
  islakZemin(c, 1640, 2200, yans, { t });
  c.fillStyle = 'rgba(255,255,255,.5)'; for (let x = -800; x < 6000; x += 260) c.fillRect(x, 1800, 120, 10);
  for (let i = 0; i < 10; i++) halkalar(c, t + i * .37, 200 + i * 520, 1700 + (i % 3) * 60, 1);
}

/* ---------------- kavşak (sahne kompozisyonu): solda tefecinin dükkânı, sağda otobüs durağı, ortada uzayan sokak.
   Dünya = 1080x1920 (İkilem planı, z = 1). Kapı: x 70..290, y 980..1560. Durak: x 740..1300, oturak y 1430. */
const KAVSAK = { kapi: [70, 980, 220, 580], neon: [180, 905], durak: [740, 1110, 600, 470], oturak: 1430, kaldirim: 1560, vp: [540, 860] };
function kavsak(c, t, o = {}) {
  const [vx, vy] = KAVSAK.vp;
  gokSabah(c, { y0: -600, ufuk: 900, gx: vx, gr: 700, t });
  yukariSehir(c, vx, 900, .34, { saat: o.saat });
  c.fillStyle = 'rgba(120,140,190,.25)'; c.fillRect(-1000, 760, 3000, 200);
  // sokağın iki yanında perspektifle uzaklaşan binalar
  for (const s of [-1, 1]) for (let i = 6; i >= 0; i--) {
    const f0 = i / 7, f1 = (i + 1) / 7, x0 = lerp(vx + s * 70, vx + s * 900, f0 * f0), x1 = lerp(vx + s * 70, vx + s * 900, f1 * f1);
    const h0 = lerp(140, 1300, f0 * f0), h1 = lerp(140, 1300, f1 * f1), y0 = lerp(vy + 20, 1620, f0 * f0), y1 = lerp(vy + 20, 1620, f1 * f1);
    c.fillStyle = mixc(s < 0 ? '#2a3350' : '#2c2a48', '#4a5878', .5 * (1 - f0)); poly(c, [[x0, y0], [x0, y0 - h0], [x1, y1 - h1], [x1, y1]]);
    const r = rng(i * 7 + (s > 0 ? 50 : 0));
    for (let k = 0; k < 6; k++) for (let j = 0; j < 3; j++) if (r() < .45) {
      const fx = .15 + j * .28, fy = .15 + k * .13, xa = lerp(x0, x1, fx), ya = lerp(y0 - h0, y1 - h1, fx) + lerp(h0, h1, fx) * fy;
      c.fillStyle = r() < .6 ? '#ffcf86' : r() < .5 ? '#9fe9ff' : '#ff9ad8'; const ww = Math.abs(x1 - x0) * .14, hh = lerp(h0, h1, fx) * .07;
      c.fillRect(xa, ya, ww, hh);
    }
    if (i === 3 || i === 5) neon(c, s < 0 ? (i === 3 ? 'OTEL' : 'BAR') : (i === 3 ? 'ÇAY · 2 DK' : 'TAMİR'), lerp(x0, x1, .5), lerp(y0 - h0, y1 - h1, .5) + lerp(h0, h1, .5) * .3, { renk: i === 3 ? NEON.mac : NEON.cam, font: 18 + i * 6, t, titre: .04, seed: i + s, rot: 0 });
  }
  camasirIpi(c, vx - 260, 520, vx + 260, 540, t, 9); camasirIpi(c, vx - 160, 700, vx + 160, 690, t, 10);
  // yol
  c.fillStyle = '#161c29'; poly(c, [[vx - 60, vy + 20], [vx + 60, vy + 20], [1500, 1920], [-420, 1920]]);
  islakZemin(c, KAVSAK.kaldirim, 1920, [{ x: KAVSAK.neon[0], renk: NEON.kir, w: 260, a: o.neonA ?? 1 }, { x: 1010, renk: '#7dffd0', w: 280 }, { x: 540, renk: '#ffb562', w: 200, a: .6 }, { x: 420, renk: NEON.mac, w: 120, a: .5 }], { t, ust: '#1c2434', alt: '#0b0f18' });
  c.fillStyle = 'rgba(255,255,255,.4)'; for (let k = 0; k < 8; k++) { const f = k / 8, y = lerp(vy + 40, 1920, f * f), w = lerp(4, 30, f * f), h = lerp(6, 90, f * f); c.fillRect(vx - w / 2, y, w, h); }
  // sol bina: tefecinin dükkânı
  const [kx, ky, kw, kh] = KAVSAK.kapi;
  c.fillStyle = '#2b2440'; c.fillRect(-500, -200, 840, KAVSAK.kaldirim + 200);
  pencereler(c, -500, -200, 840, 1040, { seed: 401, isik: .35 });
  c.fillStyle = lg(c, 340, 0, 200, 0, [[0, 'rgba(0,0,0,.45)'], [1, 'rgba(0,0,0,0)']]); c.fillRect(200, -200, 140, KAVSAK.kaldirim + 200);
  c.fillStyle = '#17121f'; c.fillRect(-500, 860, 840, 700);
  // vitrin: içerisi kırmızı
  c.fillStyle = '#3a0c18'; c.fillRect(-300, 1060, 330, 360);
  c.fillStyle = rg(c, -130, 1240, 0, 300, [[0, 'rgba(255,60,80,.55)'], [1, 'rgba(120,10,30,.15)']]); c.fillRect(-300, 1060, 330, 360);
  c.fillStyle = 'rgba(0,0,0,.55)'; for (let k = 0; k < 3; k++) c.fillRect(-280 + k * 100, 1300, 70, 120);
  yaz(c, 'BUGÜN 1 · YARIN 2', -135, 1120, '800 34px "Segoe UI"', '#ffe9c8', { golgeRenk: 'rgba(255,60,60,.8)', blur: 12 });
  yaz(c, 'faiz: günlük %100', -135, 1166, '600 22px "Segoe UI"', 'rgba(255,220,200,.85)', { golge: false });
  c.strokeStyle = '#0a070d'; c.lineWidth = 10; c.strokeRect(-300, 1060, 330, 360);
  // kapı: iç ışık + kapanan kanat
  const ac = 1 - (o.kapi || 0);
  c.fillStyle = '#0a070d'; c.fillRect(kx - 14, ky - 14, kw + 28, kh + 14);
  c.fillStyle = rg(c, kx + kw / 2, ky + kh * .55, 0, kh * .8, [[0, '#ff5a6a'], [.6, '#a3152f'], [1, '#3a0612']]); c.fillRect(kx, ky, kw, kh);
  c.fillStyle = 'rgba(30,5,10,.6)'; c.fillRect(kx + 20, ky + 40, kw - 40, kh - 40);
  if (o.tefeci !== false) { c.save(); c.translate(kx + kw / 2, ky + kh - 4); c.scale(.5, .5); tefeciTam(c, o.tefeciO || {}); c.restore(); }   // eşikteki silüet (yakında ayrıca çizilir)
  c.fillStyle = '#2a1a22'; c.fillRect(kx, ky, kw * (1 - ac), kh);   // kapı kanadı
  if (ac < 1) { c.fillStyle = '#1a0f15'; c.fillRect(kx + kw * (1 - ac) - 10, ky, 10, kh); elips(c, kx + kw * (1 - ac) - 30, ky + kh * .55, 7, 7, '#d8b25a'); }
  // saçak
  c.fillStyle = '#2c1a22'; poly(c, [[kx - 60, ky - 40], [kx + kw + 60, ky - 40], [kx + kw + 90, ky + 10], [kx - 90, ky + 10]]);
  c.fillStyle = 'rgba(255,90,110,.25)'; c.fillRect(kx - 90, ky + 6, kw + 180, 6);
  neon(c, 'ZAMAN VERİLİR', KAVSAK.neon[0], KAVSAK.neon[1], { renk: NEON.kir, font: 44, t, titre: o.titre ?? .05, seed: 9, a: o.neonA ?? 1 });
  c.fillStyle = '#2a2f3c'; c.fillRect(-500, KAVSAK.kaldirim, 860, 30);
  // durak (sağ)
  const [dx, dy, dw, dh] = KAVSAK.durak;
  c.fillStyle = '#272f45'; c.fillRect(dx - 60, -200, 1000, KAVSAK.kaldirim + 200); pencereler(c, dx - 60, -200, 1000, 1100, { seed: 402, isik: .4 });
  c.fillStyle = '#141826'; c.fillRect(dx - 60, 900, 1000, KAVSAK.kaldirim - 900);
  c.fillStyle = lg(c, dx - 60, 0, dx + 120, 0, [[0, 'rgba(0,0,0,.5)'], [1, 'rgba(0,0,0,0)']]); c.fillRect(dx - 60, -200, 180, KAVSAK.kaldirim + 200);
  // reklam panosu (yeşil ışık)
  c.fillStyle = '#0d2b22'; rr(c, dx + 330, dy + 60, 230, 340, 10); c.fill();
  c.fillStyle = rg(c, dx + 445, dy + 230, 0, 240, [[0, 'rgba(120,255,200,.7)'], [1, 'rgba(30,140,100,.2)']]); rr(c, dx + 340, dy + 70, 210, 320, 8); c.fill();
  yaz(c, 'SONSUZ', dx + 445, dy + 170, '800 40px "Segoe UI"', '#06281c', { golge: false }); yaz(c, 'YAŞAM', dx + 445, dy + 218, '800 40px "Segoe UI"', '#06281c', { golge: false });
  yaz(c, 'Yukarı Şehir', dx + 445, dy + 300, 'italic 600 24px "Segoe UI"', '#0a3a28', { golge: false });
  isik(c, dx + 445, dy + 230, 380, '#7dffd0', .25);
  // cam sığınak
  c.fillStyle = 'rgba(160,200,230,.12)'; c.fillRect(dx, dy, dw * .55, dh); c.strokeStyle = 'rgba(200,230,255,.5)'; c.lineWidth = 6; c.strokeRect(dx, dy, dw * .55, dh);
  c.fillStyle = '#3a4258'; c.fillRect(dx - 30, dy - 40, dw + 60, 34); c.fillStyle = 'rgba(200,230,255,.3)'; c.fillRect(dx - 30, dy - 8, dw + 60, 4);
  for (const xx of [dx, dx + dw]) { c.fillStyle = '#4a5268'; c.fillRect(xx - 8, dy - 40, 16, dh + 40); }
  c.fillStyle = '#5a4a3a'; c.fillRect(dx + 20, KAVSAK.oturak, dw - 40, 22); c.fillStyle = '#3a2f26'; for (const xx of [dx + 50, dx + dw - 60]) c.fillRect(xx, KAVSAK.oturak + 22, 12, 110);
  // durak tabelası
  c.fillStyle = '#4a5268'; c.fillRect(dx + dw + 60, 900, 14, 660);
  c.fillStyle = '#ffd23f'; rr(c, dx + dw - 10, 880, 170, 110, 10); c.fill();
  yaz(c, 'OTOBÜS', dx + dw + 75, 912, '900 32px "Segoe UI"', '#1a1a1a', { golge: false }); yaz(c, '1 SA', dx + dw + 75, 956, '900 36px Consolas', '#1a1a1a', { golge: false });
  c.fillStyle = '#2a2f3c'; c.fillRect(dx - 60, KAVSAK.kaldirim, 1000, 30);
  // durağın camına vuran yağmur
  const r = rng(Math.floor(t * 10));
  c.fillStyle = 'rgba(220,240,255,.35)'; for (let k = 0; k < 14; k++) elips(c, dx + r() * dw, dy - 44 + r() * 10, 4, 3, 'rgba(220,240,255,.4)');
  for (let k = 0; k < 6; k++) halkalar(c, t + k * .3, 300 + k * 110, 1640 + (k % 2) * 80, 1);
}
