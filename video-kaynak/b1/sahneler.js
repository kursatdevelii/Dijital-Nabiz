/* Saat B1 "Üç Dakika" - sahneler. Her sahne (s, t, u): s.prm plan parametreleri, t kurgu saniyesi, u plan içi 0..1.
   Sayaç her yerde aynı: SAYAC(t) (son.js, ses_tasarim.py'deki anahtar karelerden). Hikâye saati = 09:00 - sayaç. */
const ARKA = off(W, H), AX = ARKA.getContext('2d');
function bulanik(k, blur, fn, alfa = 1) {   // bir katmanı ayrı çizip bulanıklaştırarak bas (odak kaydırma, alan derinliği)
  AX.setTransform(1, 0, 0, 1, 0, 0); AX.clearRect(0, 0, W, H); katman(AX, k, 1); fn(AX);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = alfa; if (blur > .3) X.filter = `blur(${blur.toFixed(1)}px)`; X.drawImage(ARKA, 0, 0); X.restore();
}
const SAATSN = t => 9 * 3600 - SAYAC(t);
const nab = (t, b, h = 5) => b !== undefined && t >= b ? Math.exp(-(t - b) * h) : 0;
const ZSN = 60 * SN_YIL + 112 * SN_GUN + 7 * 3600 + 21 * 60 + 3;   // uyuyan adamın sayacı (Sahne 7 başında)
const TSN = 84 * SN_YIL + 203 * SN_GUN + 11 * 3600 + 40 * 60 + 16; // tefecinin sayacı
const zsn = t => ZSN - (t - 50.3);
const tsn = t => TSN - (t - 42.7);

/* ------------------------------------------------------------ YATAK: kanca (bilek), doğrulma */
function yastikArka(c, t, o = {}) {   // yatak başı: duvar, pencereden sızan neon, ahşap başlık, yastık, yorgan
  c.fillStyle = lg(c, 0, 0, 0, 1920, [[0, '#1c2236'], [1, '#2a2f45']]); c.fillRect(-800, -400, 2700, 2800);
  doku(c, -800, -400, 2700, 2800, .3);
  c.save(); c.globalCompositeOperation = 'screen';
  c.fillStyle = lg(c, 0, 200, 1080, 900, [[0, 'rgba(255,60,200,.28)'], [1, 'rgba(255,60,200,0)']]); poly(c, [[-200, 200], [700, 120], [1300, 900], [-200, 1200]]);
  c.fillStyle = lg(c, 1080, 400, 300, 1300, [[0, 'rgba(60,220,255,.22)'], [1, 'rgba(60,220,255,0)']]); poly(c, [[1300, 300], [1300, 900], [200, 1500], [600, 600]]);
  c.restore();
  c.fillStyle = '#3a2b24'; rr(c, -100, 300, 1300, 330, 26); c.fill(); c.fillStyle = '#4a382e'; rr(c, -80, 320, 1260, 290, 20); c.fill();
  c.strokeStyle = 'rgba(0,0,0,.25)'; c.lineWidth = 4; for (let x = 40; x < 1200; x += 160) { c.beginPath(); c.moveTo(x, 330); c.lineTo(x, 600); c.stroke(); }
  // yastık: kabarık, dikişli
  c.fillStyle = '#d9d5e2'; c.beginPath(); c.moveTo(300, 640); c.bezierCurveTo(290, 540, 420, 520, 640, 530); c.bezierCurveTo(880, 520, 1010, 540, 1000, 650);
  c.bezierCurveTo(1010, 790, 900, 860, 650, 850); c.bezierCurveTo(420, 860, 290, 790, 300, 640); c.fill();
  c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(560, 600, 200, 40, -.05, 0, 7); c.fill();
  c.strokeStyle = 'rgba(90,90,130,.3)'; c.lineWidth = 3; c.beginPath(); c.moveTo(330, 690); c.quadraticCurveTo(650, 740, 980, 680); c.stroke();
  c.fillStyle = '#455c8a'; c.beginPath(); c.moveTo(-400, 1000); c.bezierCurveTo(200, 860, 700, 1060, 1400, 940); c.lineTo(1400, 2400); c.lineTo(-400, 2400); c.closePath(); c.fill();
  c.strokeStyle = 'rgba(20,30,60,.45)'; c.lineWidth = 6; for (const x of [0, 300, 650, 950]) { c.beginPath(); c.moveTo(x, 1000); c.quadraticCurveTo(x + 80, 1300, x - 30, 1700); c.stroke(); }
}
function sYatak(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn);
  if (p.mod === 'bilek') {
    // kanca: ön planda bilek (keskin), arkada yastıkta uyuyan yüz (bulanık); odak yüze kayar, gözler açılır
    const od = ease(clamp((t - p.odak) / .45)), uyan = clamp((t - p.uyan) / .12);
    bulanik(k, lerp(16, 1, od), c => {
      yastikArka(c, t);
      c.save(); c.translate(690, 700); c.rotate(-1.38); c.scale(1.15, 1.15);
      kafa(c, { p: PS, tip: 'sen', kapali: uyan <= 0, goz: lerp(.2, 1.5, uyan), kas: uyan, bak: [.6, .9], agiz: .15 * uyan, boyun: false });
      c.restore();
      c.fillStyle = '#455c8a'; c.beginPath(); c.moveTo(900, 640); c.bezierCurveTo(1000, 900, 1200, 1100, 1400, 1100); c.lineTo(1400, 500); c.closePath(); c.fill();
      isik(c, 560, 1060, 700, kir, .5); isik(c, 650, 760, 380, kir, .35);
    });
    katman(X, k, 1);
    bulanik(k, lerp(0, 9, od), c => {
      kolCiz(c, PS, [-500, 1700], [-60, 1360], [760, 1010], { ust: true, kalin: 2.9, sayac: sn, sayacS: .64, poz: 'acik', taraf: -1, elRot: -.15 });
    });
    katman(X, k, 1);
    isik(X, 470, 1180, 520, kir, .22 + .12 * Math.sin(t * 6.3));
  } else if (p.mod === 'dogrul') {
    // yatakta doğrulup bileğinizi yüzünüze yaklaştırırsınız
    const g = easeOut(clamp((t - s.bas) / .75)), kal = ease(clamp((t - s.bas - .35) / .7));
    katman(X, k, 1); yastikArka(X, t);
    karakterBasla(k);
    KX.save(); KX.translate(560, 1500); KX.rotate(lerp(-1.1, .02, g) + Math.sin(t * 1.3) * .01); KX.translate(0, -640); KX.scale(.95, .95);
    const A = [250, 300], B = [lerp(330, 360, kal), lerp(640, 470, kal)], C = [lerp(300, -60, kal), lerp(760, 380, kal)];
    senBust(KX, PS, { kafa: { goz: 1.45, kas: .9, bak: [lerp(.4, -.2, kal), lerp(.2, .95, kal)], agiz: .28 + .05 * Math.sin(t * 5), ter: true },
      kollar: [{ A, B, C, sayac: sn, sayacS: .5, poz: 'acik', taraf: -1, elRot: -.2 }] });
    KX.restore();
    isiklandir(KX, [{ x: lerp(800, 470, kal), y: lerp(1500, 1180, kal), r: 700, renk: kir, a: .5 }, { x: 0, y: 300, r: 900, renk: '#ff3fd2', a: .2 }, { x: 1080, y: 600, r: 900, renk: '#3ff4ff', a: .16 }]);
    karakterBas(); katman(X, k, 1);
    X.fillStyle = '#455c8a'; X.beginPath(); X.moveTo(-400, 1560); X.bezierCurveTo(200, lerp(1380, 1480, g), 700, 1560, 1400, 1500); X.lineTo(1400, 2400); X.lineTo(-400, 2400); X.closePath(); X.fill();
    X.strokeStyle = 'rgba(20,30,60,.45)'; X.lineWidth = 6; for (const x of [0, 300, 650, 950]) { X.beginPath(); X.moveTo(x, 1560); X.quadraticCurveTo(x + 80, 1760, x - 30, 2000); X.stroke(); }
  }
}

/* ------------------------------------------------------------ YÜZ: yakın plan (oda ya da sokak) */
function sYuz(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn), fr = sn - Math.floor(sn), nb = sn < 60 ? .55 + .45 * Math.cos(2 * Math.PI * (1 - fr)) : 1;
  bulanik(k, 12, c => {
    if (p.yer === 'sokak') { c.fillStyle = lg(c, 0, 0, 0, 1920, [[0, '#1b2540'], [1, '#2a2440']]); c.fillRect(-800, -400, 2700, 2800); bokeh(c, t, { seed: 8, adet: 30, buyuk: 120, a: 1.3 }); }
    else yastikArka(c, t);
  });
  katman(X, k, 1);
  const of = p.ofke ? ease(clamp((t - s.bas - (p.ofkeT || .3)) / .5)) : 0;
  karakterBasla(k);
  KX.save(); KX.translate(540, 900); KX.scale(2.1, 2.1); KX.rotate(Math.sin(t * .9) * .015);
  senBust(KX, PS, { kafa: { goz: lerp(p.goz ?? 1.45, 1.05, of), kas: lerp(p.kas ?? .9, 0, of), ofke: of, bak: p.bak || [0, .55], agiz: lerp(p.agiz ?? .25, 0, of), ter: p.yer !== 'sokak', yagmur: p.yer === 'sokak', sal: Math.sin(t * 2) * 2 } });
  KX.restore();
  isiklandir(KX, [{ x: 540, y: 1900, r: 1300, renk: kir, a: .5 * nb }, { x: 0, y: 400, r: 1000, renk: p.yer === 'sokak' ? '#3ff4ff' : '#ff3fd2', a: .2 }, { duz: true, renk: '#1a2040', a: .1 }]);
  karakterBas(); katman(X, k, 1);
  if (p.yer === 'sokak') yagmurCiz(X, t, { yogun: .8 });
}

/* ------------------------------------------------------------ PENCERE: içeriden şehre */
function sPencere(s, t, u) {
  const p = s.prm, k = kamera(s, t, u);
  katman(X, k, 1); manzara(X, t, { saat: SAATSN(t) });
  X.setTransform(1, 0, 0, 1, 0, 0);
  yagmurCiz(X, t, { yogun: .7, a: .9 });
  // pencere çerçevesi + camdaki damlalar: kamera camın içinden geçerken büyüyüp kadrajdan çıkar
  const g = ease(clamp((t - s.bas) / (p.gecis || 2.2))), sc = lerp(1, 3.2, g), a = 1 - g;
  if (a > .01) {
    X.save(); X.translate(540, 900); X.scale(sc, sc); X.translate(-540, -900); X.globalAlpha = a;
    const r = rng(51);
    for (let i = 0; i < 60; i++) { const x = r() * 1080, y = r() * 1920, s_ = .8 + r() * 1.6; elips(X, x, y, 6 * s_, 8 * s_, 'rgba(210,230,255,.22)'); elips(X, x - 2, y - 3, 2 * s_, 2 * s_, 'rgba(255,255,255,.55)'); }
    X.strokeStyle = '#0e121c'; X.lineWidth = 60; X.strokeRect(40, 200, 1000, 1500); X.lineWidth = 36; X.beginPath(); X.moveTo(540, 200); X.lineTo(540, 1700); X.moveTo(40, 900); X.lineTo(1040, 900); X.stroke();
    X.fillStyle = '#0e121c'; X.fillRect(-600, -600, 640, 3200); X.fillRect(1040, -600, 700, 3200); X.fillRect(-600, -600, 2400, 800); X.fillRect(-600, 1700, 2400, 900);
    X.restore();
  }
}

/* ------------------------------------------------------------ KAFE: okuyucuya dayanan bilek */
function sKafe(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), d = clamp((t - p.ode) / .9), cek = ease(clamp((t - p.cek) / .5));
  bulanik(k, 10, c => {
    c.fillStyle = '#2a1e1c'; c.fillRect(-800, -400, 2700, 2800);
    c.fillStyle = rg(c, 300, 800, 0, 900, [[0, 'rgba(255,190,120,.55)'], [1, 'rgba(120,60,40,.1)']]); c.fillRect(-800, -400, 2700, 2800);
    for (let i = 0; i < 4; i++) { c.fillStyle = 'rgba(10,8,8,.75)'; rr(c, 60 + i * 230, 900, 120, 500, 50); c.fill(); elips(c, 120 + i * 230, 860, 60, 66, 'rgba(10,8,8,.75)'); }
    bokeh(c, t, { seed: 4, adet: 16, renkler: ['#ffcf86', NEON.cam], buyuk: 110 });
  });
  katman(X, k, 1);
  neon(X, 'KAHVE · 4 DK', 520, 470, { renk: NEON.cam, font: 76, t, titre: .02, seed: 2 });
  X.fillStyle = '#2a2e38'; rr(X, 690, 760, 250, 420, 30); X.fill(); X.fillStyle = '#3a3f4c'; rr(X, 700, 770, 230, 400, 26); X.fill();
  X.fillStyle = '#071820'; rr(X, 720, 800, 190, 140, 14); X.fill();
  const ekran = d > 0 && d < 1 ? '- 00:04:00' : d >= 1 ? 'ÖDENDİ' : 'BİLEK';
  yaz(X, ekran, 815, 870, `700 ${ekran.length > 8 ? 30 : 36}px Consolas`, d >= 1 ? '#3dffa0' : NEON.cam, { golgeRenk: NEON.cam, blur: 14 });
  X.fillStyle = rg(X, 815, 1060, 0, 80, [[0, rgba(NEON.cam, .8 * (1 - cek * .7))], [1, rgba(NEON.cam, 0)]]); X.beginPath(); X.arc(815, 1060, 70, 0, 7); X.fill();
  X.strokeStyle = rgba(NEON.cam, .9); X.lineWidth = 4; X.beginPath(); X.arc(815, 1060, 62, 0, 7); X.stroke();
  const once = 5 * 3600 + 12 * 60 + 33, sn = once - 240 * ease(d) - (t - s.bas);
  karakterBasla(k);
  const C = [lerp(800, 600, cek), lerp(1060, 1160, cek)];
  kolCiz(KX, KADIN, [-260, 1500], [140, 1320], C, { kolRenk: KADIN.yag, kolG: KADIN.yagG, kolK: KADIN.yagK, kolA: KADIN.yagA, manset: KADIN.yagG, ten: KADIN.ten, tenK: KADIN.tenK, kalin: 2.2, sayac: sn, sayacS: .44, poz: 'acik', taraf: -1, elRot: -.2 });
  isiklandir(KX, [{ x: 815, y: 1060, r: 500, renk: NEON.cam, a: .35 }, { x: 0, y: 600, r: 1000, renk: '#ffb070', a: .25 }]);
  karakterBas(); katman(X, k, 1);
  if (d > 0 && d < 1) { X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 6; i++) { const f = (t * 3 + i / 6) % 1; isik(X, lerp(470, 815, f), lerp(1180, 1060, f), 30, '#ffb22e', .8 * (1 - f)); } X.restore(); }
}

/* ------------------------------------------------------------ BANK: sayacı sıfıra inen el */
function bacakGecis(c, t, x, y, s, renk) {   // ön planda geçip giden bacaklar
  const f = t * 9;
  for (const [i, sd] of [[0, -1], [1, 1]]) { const sw = Math.sin(f + i * Math.PI) * 90; uzuv(c, x + sd * 30, y - 600 * s, x + sd * 30 + sw * s, y, 120 * s, 100 * s, renk); elips(c, x + sd * 30 + sw * s + 30 * s, y, 70 * s, 34 * s, '#0b0c10'); }
}
function bankTahta(c, y, x0, x1) {   // bank oturağı: ahşap çıtalar
  c.fillStyle = '#3a2f26'; c.fillRect(x0, y + 50, x1 - x0, 26);
  for (let i = 0; i < 3; i++) { c.fillStyle = i % 2 ? '#5a4838' : '#4e3e30'; c.fillRect(x0, y + i * 18, x1 - x0, 16); c.fillStyle = 'rgba(255,255,255,.06)'; c.fillRect(x0, y + i * 18, x1 - x0, 3); }
}
function sBank(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), son = t >= p.son, sn = son ? 0 : 1.4 - (t - s.bas) * (0.4 / (p.son - s.bas));
  katman(X, k, 1);
  X.fillStyle = lg(X, 0, 0, 0, 1920, [[0, '#1e2638'], [1, '#121722']]); X.fillRect(-800, -400, 2700, 2800);
  bokeh(X, t, { seed: 12, adet: 22, y0: 0, y1: 900, buyuk: 110 });
  X.fillStyle = '#2b2f3a'; X.fillRect(-300, 560, 1700, 260);   // arkalık
  for (let i = 0; i < 3; i++) { X.fillStyle = i % 2 ? '#3a3f4c' : '#333845'; X.fillRect(-300, 580 + i * 70, 1700, 50); }
  bankTahta(X, 860, -300, 1400);
  for (const x of [80, 980]) { X.fillStyle = '#2a2420'; X.fillRect(x, 936, 30, 420); }
  islakZemin(X, 1340, 1920, [{ x: 300, renk: NEON.mac, w: 200 }, { x: 800, renk: NEON.cam, w: 160 }], { t });
  for (let i = 0; i < 4; i++) halkalar(X, t + i * .4, 200 + i * 230, 1500 + (i % 2) * 120, 1.2);
  karakterBasla(k);
  // kol bankın üstünde uzanır (sahibi kadraj dışında), el kenardan sarkar
  const dus = son ? easeOut(clamp((t - p.son) / .5)) : 0;
  kolCiz(KX, PS, [-300, 760], [140, 830], [700 - dus * 6, 852 + dus * 20], { kolRenk: '#4a4f5c', kolG: '#363a45', kolK: '#1e2028', kolA: '#6a7080', manset: '#3e424d', ten: '#9a6e54', tenK: '#5a3a2a',
    kalin: 1.6, sayac: son ? 0.0001 : sn, sayacS: .52, poz: 'sark', elRot: lerp(1.0, 1.25, dus), sayacO: { metin: son ? '00:00:00' : '00:00:01', sonuk: son ? clamp((t - p.son) / .35) : 0, renk: '#ff3636', sabit: true } });
  isiklandir(KX, [{ x: 480, y: 860, r: 500, renk: '#ff3636', a: son ? .45 * (1 - clamp((t - p.son) / .35)) : .45 }, { duz: true, renk: '#1a2240', a: .2 }]);
  karakterBas(); katman(X, k, 1);
  for (const [x0, v, sc, rk] of [[-500, 700, 1.0, '#1a1d26'], [1700, -600, 1.15, '#151820']]) { const x = x0 + (t - s.bas) * v; X.save(); X.filter = 'blur(8px)'; bacakGecis(X, t, x, 2000, sc, rk); X.restore(); }
  yagmurCiz(X, t, { yogun: .75 });
}

/* ------------------------------------------------------------ BİLEK: morluklar (şimdi) */
function sBilek(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn);
  bulanik(k, 14, c => { yastikArka(c, t); isik(c, 540, 1000, 900, kir, .4); });
  katman(X, k, 1);
  karakterBasla(k);
  const a = lerp(-.16, .04, u);
  KX.save(); KX.translate(540, 1000); KX.rotate(a); KX.translate(-540, -1000);
  kolCiz(KX, PS, [-700, 1500], [-160, 1180], [880, 920], { ust: true, kalin: 3.1, sayac: sn, sayacS: .58, poz: 'acik', taraf: -1, elRot: -.1, sayacO: { morluk: ease(clamp((t - s.bas) / .4)), halka: .6 + .3 * Math.sin(t * 5) } });
  const bas = ease(clamp((t - s.bas - .5) / .6));   // öbür elin işaret parmağı morluğu yoklar
  elCiz(KX, lerp(1250, 900, bas), lerp(1500, 1180, bas), -2.5, 2.0, PS, { poz: 'isaret' });
  KX.restore();
  isiklandir(KX, [{ x: 520, y: 1000, r: 800, renk: kir, a: .32 }, { x: 1080, y: 200, r: 900, renk: '#3ff4ff', a: .15 }]);
  karakterBas(); katman(X, k, 1);
}

/* ------------------------------------------------------------ ANI: dün gece, zaman çekilirken (soğuk mavi geri dönüş) */
function sAni(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), g = ease(clamp((t - p.kavra) / .35)), akis = clamp((t - p.kavra - .2) / (s.son - p.kavra - .3));
  const once = 3 * SN_GUN + 4 * 3600 + 12 * 60 + 55, sonra = 5 * 3600, sn = lerp(once, sonra, Math.pow(akis, .6));
  bulanik(k, 9, c => {
    c.fillStyle = '#1a2036'; c.fillRect(-800, -400, 2700, 2800);
    c.fillStyle = '#d9d5e2'; c.beginPath(); c.ellipse(260, 520, 420, 190, -.05, 0, 7); c.fill();
    c.save(); c.translate(300, 500); c.rotate(-1.5); c.scale(1.2, 1.2); kafa(c, { p: PS, tip: 'sen', kapali: true, agiz: .08, boyun: false }); c.restore();
    c.fillStyle = '#455c8a'; c.beginPath(); c.moveTo(-400, 760); c.bezierCurveTo(300, 700, 700, 860, 1400, 780); c.lineTo(1400, 2400); c.lineTo(-400, 2400); c.closePath(); c.fill();
  });
  katman(X, k, 1);
  X.fillStyle = 'rgba(30,45,90,.25)'; X.fillRect(-800, 900, 2700, 1500);
  karakterBasla(k);
  // yorganın üstünde uzanan bileğiniz (yeşil, akıp amber'e döner)
  kolCiz(KX, PS, [-260, 1470], [150, 1270], [800, 1140], { ust: true, kalin: 2.2, sayac: sn, sayacS: .5, poz: 'acik', taraf: -1, elRot: .1 });
  // kırmızı kapüşon kolu: yukarıdan uzanıp bileği kavrar
  const C = [lerp(1000, 690, g), lerp(300, 1030, g)];
  kolCiz(KX, KARDES, [1500, -500], [1200, 380], C, { kolRenk: KARDES.hood, yen: KARDES.hood, yenG: KARDES.hoodG, ten: KARDES.ten, tenK: KARDES.tenK, kalin: 1.9, poz: 'kavra', kavra: g, elRot: .9 });
  isiklandir(KX, [{ x: 600, y: 1150, r: 700, renk: SAYAC_RENK(sn), a: .45 }]);
  karakterBas(); katman(X, k, 1);
  if (akis > 0 && akis < 1) { X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 10; i++) { const f = (t * 2.4 + i / 10) % 1; isik(X, lerp(470, 760, f), lerp(1200, 1000 - f * 160, f), 36, SAYAC_RENK(sn), .9 * (1 - f)); } X.restore(); }
}

/* ------------------------------------------------------------ ODA: boş yatak + fotoğraf, masa, not, duvar saati */
function sOda(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn);
  if (p.mod === 'genis') {
    katman(X, k, 1); odaGenis(X, t, { saat: SAATSN(t) });
    bulanik(k, 6, c => { c.save(); c.translate(430, 2300); c.scale(1.4, 1.4); senArka(c, PS, { t }); c.restore(); });
    katman(X, k, 1);
    isik(X, 230, 1700, 300, kir, .4);
  } else if (p.mod === 'masa') {
    const al = ease(clamp((t - p.al) / .55));
    katman(X, k, 1); odaGenis(X, t, { saat: SAATSN(t), not: false });
    X.save(); X.translate(lerp(ODA.masa[0] + ODA.masa[2] * .3, 420, al), lerp(ODA.masa[1] - 8, 1150, al)); X.scale(1, lerp(.32, .9, al)); X.rotate(lerp(0, -.1, al));
    X.fillStyle = '#efe8d8'; X.fillRect(-90, -60, 180, 120); X.fillStyle = 'rgba(0,0,0,.12)'; X.fillRect(-90, -2, 180, 4); X.restore();
    karakterBasla(k);
    const C = [lerp(640, 470, Math.min(1, al * 2 + .4)), lerp(1520, 1220, Math.min(1, al * 2 + .4)) + (al > .5 ? (al - .5) * -140 : 0)];
    kolCiz(KX, PS, [900, 1900], [760, 1620], C, { kalin: .95, sayac: sn, sayacS: .4, poz: al > .2 ? 'tut' : 'acik', elRot: -.4 });
    isiklandir(KX, [{ x: 640, y: 1500, r: 400, renk: kir, a: .4 }]);
    karakterBas(); katman(X, k, 1);
  } else if (p.mod === 'not') {
    // omuz üstü: notu okuyorsunuz; satırlar seslendirmeyle birlikte belirir
    bulanik(k, 8, c => odaGenis(c, t, { saat: SAATSN(t), not: false }));
    katman(X, k, 1);
    let satir = 0; (p.satirlar || []).forEach(([a, b]) => { satir += clamp((t - a) / (b - a)); });
    karakterBasla(k);
    KX.save(); KX.translate(620, 1080); KX.rotate(-.04 + Math.sin(t * 1.1) * .01);
    notKagit(KX, 0, 0, 1.18, { satir, rot: 0 });
    elCiz(KX, -420, 250, -1.05, 1.5, PS, { poz: 'tut' });
    elCiz(KX, 420, 250, -2.09, 1.5, PS, { poz: 'tut', ayna: true });
    KX.restore();
    isiklandir(KX, [{ x: 640, y: 1500, r: 700, renk: kir, a: .45 }, { x: 0, y: 600, r: 900, renk: '#ff3fd2', a: .16 }]);
    karakterBas(); katman(X, k, 1);
    bulanik(k, 5, c => {   // ön planda ensen ve omzun
      c.save(); c.translate(70, 1380); c.scale(1.75, 1.75); c.fillStyle = PS.ceket;
      c.beginPath(); c.moveTo(-360, 700); c.bezierCurveTo(-356, 360, -300, 240, -150, 206); c.lineTo(150, 206); c.bezierCurveTo(300, 240, 356, 360, 360, 700); c.fill();
      kafaArka(c, PS, {}); c.restore();
      isik(c, 260, 1700, 400, kir, .3);
    });
  } else if (p.mod === 'saat') {
    katman(X, k, 1); odaGenis(X, t, { saat: SAATSN(t) });
    const tk = nab(t, p.tik, 9);
    if (tk > 0) { X.save(); X.globalCompositeOperation = 'screen'; isik(X, ODA.saat[0], ODA.saat[1], 260, '#ffffff', .25 * tk); X.restore(); }
  }
}

/* ------------------------------------------------------------ koşu yardımcıları */
function adimSarsinti(k, dongu, A) {   // her ayak basışında kameraya kısa, sönümlü bir sarsıntı
  const q = ((dongu * 2) % 1 + 1) % 1;
  k.sy += 10 * Math.exp(-q * 8) * Math.sin(q * 26) * A; k.r = (k.r || 0) + .004 * Math.exp(-q * 8) * Math.sin(q * 20) * A;
}
function hizIzi(px) {   // hızla kayan arka planda yatay sürüklenme izi (karakter çizilmeden önce)
  if (px < 1) return;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  TX.setTransform(1, 0, 0, 1, 0, 0); TX.clearRect(0, 0, W, H); TX.drawImage(cv, 0, 0);
  X.globalAlpha = .22; for (const dx of [-px, -px * .5, px * .5, px]) X.drawImage(TMP, dx, 0);
  X.restore();
}
function ayakSicrama(c, t, x, y, sc, ayaklar) {   // ayak yere bastığı an su birikintisinden sıçrayan damlalar
  for (const [fx, q] of ayaklar) {
    if (q > .14) continue;
    const g = q / .14, ax = x + (fx + 30) * sc, r = rng(Math.floor(t * 3) * 7 + Math.round(fx));
    c.save(); c.strokeStyle = `rgba(215,235,255,${.75 * (1 - g)})`; c.fillStyle = `rgba(215,235,255,${.8 * (1 - g)})`; c.lineWidth = 3;
    c.beginPath(); c.ellipse(ax, y + 8, 40 + 90 * g, 8 + 12 * g, 0, 0, 7); c.stroke();
    for (let i = 0; i < 9; i++) {
      const a = Math.PI * (1.08 + r() * .84), v = 60 + r() * 120;
      elips(c, ax + Math.cos(a) * v * (.3 + g), y + Math.sin(a) * v * (.3 + g) * 1.2 + 90 * g * g, 4, 4, `rgba(215,235,255,${.8 * (1 - g)})`);
    }
    c.restore();
  }
}

/* ------------------------------------------------------------ SOKAK (yandan): kapıdan çıkış + koşu, kalabalık, kadın */
function sSokak(s, t, u) {
  const p = s.prm, sn = SAYAC(t), kir = SAYAC_RENK(sn);
  if (p.mod === 'kos') {
    // kapıdan fırlayıp hızlanarak koşarsınız; kamera izler. Yol ve adım aynı hesaptan: yere basan ayak kaymaz.
    const d = t - p.t0, r = .35, yol = p.hiz * (d <= 0 ? 0 : d < r ? d * d / (2 * r) : d - r / 2), x = p.x0 + yol, kx = x + 120 - 540;
    const A = d <= 0 ? .12 : clamp(.35 + .65 * d / r, .35, 1), dongu = yol / (ADIM * .86 * lerp(.55, 1, A));
    const k = kamera(s, t, u); k.x += kx; adimSarsinti(k, dongu, A);
    katman(X, k, 1); yanSokak(X, t, { kx, kapiAcik: d < .45 }); hizIzi(Math.min(28, p.hiz * .022) * A);
    karakterBasla(k); KX.save(); KX.translate(x, 1590); KX.scale(.86, .86);
    const ay = senYan(KX, PS, { dongu, kos: A, sayac: sn, kafa: { goz: 1.3, kas: .8 } });
    KX.restore();
    isiklandir(KX, [{ x: x + 120, y: 1150, r: 400, renk: kir, a: .5 }, { x: x, y: 900, r: 900, renk: '#3ff4ff', a: .2 }, { duz: true, renk: '#1a2240', a: .14 }]);
    karakterBas(); katman(X, k, 1);
    ayakSicrama(X, t, x, 1590, .86, ay);
    yagmurCiz(X, t, { yogun: 1, aci: .24, kay: -kx * .2 });
  } else if (p.mod === 'kalabalik') {
    // koşarak kalabalığın içinden geçersiniz; kamera sizi izler, yanından geçtiğiniz adamın koluna uzanırsınız
    const d = t - s.bas, x = p.x0 + d * p.hiz, kx = x + 160 - 540, dongu = (x - p.x0) / (ADIM * .95) + .3;
    const k = kamera(s, t, u); k.x += kx; adimSarsinti(k, dongu, 1);
    katman(X, k, 1); yanSokak(X, t, { kx }); hizIzi(Math.min(28, p.hiz * .022));
    karakterBasla(k);
    const arka = [[880, 1560, .78, NEON.cam, 0], [1060, 1550, .76, NEON.mac, '#1d2a44'], [1580, 1560, .8, NEON.mac, 0], [1720, 1555, .78, NEON.sari, '#2a1a30']];
    for (const [x, y, sc, kn, sem] of arka) { const sak = ease(clamp((t - p.sakla - (x - 900) * .0006) / .4)); KX.save(); KX.translate(x, y); KX.scale(sc, sc); yaya(KX, { yon: 1, faz: t * 4 + x, yuru: .4, sakla: sak, sayac: x % 3 ? 3 * 3600 : 2 * SN_GUN, semsiye: sem, kenar: kn, kapuson: !sem }); KX.restore(); }
    const cek = ease(clamp((t - p.cek) / .35));   // adam: kolunu çekip cebine sokar
    KX.save(); KX.translate(1420, 1760); KX.scale(1.2, 1.2); yaya(KX, { yon: 1, faz: 0, yuru: 0, sakla: cek, sayac: 6 * 3600, kenar: NEON.mac, kapuson: true, kenarX: -6 }); KX.restore();
    const uz = ease(clamp((t - p.cek + .3) / .25)) * (1 - ease(clamp((t - p.cek - .45) / .25)));   // kol yalnızca adamın yanından geçerken uzanır
    KX.save(); KX.translate(x, 1790); KX.scale(.95, .95);
    const ay = senYan(KX, PS, { dongu, kos: 1, sayac: sn, uzan: uz > .02 ? [lerp(200, lerp(330, 290, cek), uz), lerp(-430, -560, uz)] : null, uzanPoz: 'acik', kafa: { goz: 1.35, kas: 1 } });
    KX.restore();
    const ond = [[1240, 1840, 1.15, NEON.cam, '#141824'], [1880, 1830, 1.1, NEON.mac, 0]];
    for (const [x, y, sc, kn, sem] of ond) { KX.save(); KX.translate(x, y); KX.scale(sc, sc); yaya(KX, { yon: 1, faz: t * 4 + x, yuru: .5, sakla: ease(clamp((t - p.sakla - .2) / .4)), sayac: SN_GUN * 3, semsiye: sem, kenar: kn, kapuson: !sem }); KX.restore(); }
    isiklandir(KX, [{ x: x + 400, y: 900, r: 1100, renk: NEON.mac, a: .14 }, { x: x + 120, y: 1350, r: 320, renk: kir, a: .35 }]);
    karakterBas(); katman(X, k, 1);
    ayakSicrama(X, t, x, 1790, .95, ay);
    yagmurCiz(X, t, { yogun: 1, aci: .24, kay: -kx * .2 });
  } else if (p.mod === 'kadin') {
    const k = kamera(s, t, u);
    bulanik(k, 14, c => { c.fillStyle = lg(c, 0, 0, 0, 1920, [[0, '#1b2540'], [1, '#262040']]); c.fillRect(-800, -400, 2700, 2800); bokeh(c, t, { seed: 21, adet: 34, buyuk: 120, a: 1.3 }); });
    katman(X, k, 1);
    const sl = Math.sin((t - s.bas) * 7) * .1 * clamp((t - s.bas - .3) / .3) * (1 - clamp((t - s.bas - 1.6) / .4));
    karakterBasla(k); KX.save(); KX.translate(560, 760); KX.scale(1.45, 1.45);
    kadinBust(KX, { bas: sl, bak: [-.2, .1], sayac: 41 * 60 + 10 - (t - s.bas), kol: { A: [-250, 320], B: [-290, 640], C: [150, 470] } });
    KX.restore();
    isiklandir(KX, [{ x: 420, y: 1500, r: 600, renk: '#ffb22e', a: .4 }, { x: 1080, y: 300, r: 900, renk: NEON.cam, a: .2 }, { x: 0, y: 500, r: 900, renk: NEON.mac, a: .16 }]);
    karakterBas(); katman(X, k, 1);
    yagmurCiz(X, t, { yogun: .9 });
  }
}

/* ------------------------------------------------------------ KAVŞAK: tefeci, durak, ikilem */
function tefeciArka(c, t) {   // tefecinin yakın planları için kapı ve kırmızı iç ışık
  c.fillStyle = '#17121f'; c.fillRect(-800, -400, 2700, 2800);
  c.fillStyle = rg(c, 620, 1000, 0, 900, [[0, '#ff5a6a'], [.55, '#a3152f'], [1, '#2a0610']]); c.fillRect(220, 200, 800, 1700);
  c.fillStyle = 'rgba(30,5,10,.5)'; for (let i = 0; i < 3; i++) c.fillRect(300 + i * 230, 1300, 150, 500);
  c.fillStyle = 'rgba(255,200,170,.15)'; for (let i = 0; i < 6; i++) rr(c, 260 + i * 120, 560, 80, 220, 8), c.fill();   // raflar
  c.fillStyle = '#0a070d'; c.fillRect(160, 160, 60, 1800); c.fillRect(1000, 160, 60, 1800);
  c.fillStyle = '#2c1a22'; poly(c, [[60, 100], [1160, 100], [1220, 200], [0, 200]]);
  neon(c, 'ZAMAN VERİLİR', 610, 40, { renk: NEON.kir, font: 90, t, titre: .03, seed: 9 });
}
// uyuyan adamın yakın planları: bank çıtaları + adam (büyük); m: rozet | bilek | isaret | kay
function zenginYakin(t, s, k, m, o = {}) {
  bulanik(k, 10, c => { kavsak(c, t, { saat: SAATSN(t), tefeci: false }); });
  katman(X, k, 1);
  const [tx, ty, sc] = m === 'rozet' ? [811, 1691, 2.3] : [1660, 1060, 2.1];
  X.save(); X.translate(tx, ty); X.scale(sc, sc); bankTahta(X, 0, -800, 600); X.restore();
  karakterBasla(k); KX.save(); KX.translate(tx, ty); KX.scale(sc, sc);
  zenginBank(KX, Object.assign({ t, sayac: zsn(t), kipir: 0 }, o)); KX.restore();
  isiklandir(KX, [{ x: 800, y: 700, r: 1200, renk: '#7dffd0', a: .26 }, { duz: true, renk: '#1a2240', a: .1 }]);
  karakterBas(); katman(X, k, 1);
}
function sKavsak(s, t, u) {
  const p = s.prm, sn = SAYAC(t), kir = SAYAC_RENK(sn), m = p.mod, k = kamera(s, t, u);
  if (m === 'dukkan') {
    const yan = p.yan !== undefined ? clamp((t - p.yan) / .6) : 1, nA = yan >= 1 ? 1 : (rng(Math.floor(t * 20))() < yan ? 1 : .08);
    katman(X, k, 1); kavsak(X, t, { saat: SAATSN(t), neonA: nA, titre: .02 });
    yagmurCiz(X, t, { yogun: .9 });
  } else if (m === 'tefeci' || m === 'konus' || m === 'gulus') {
    bulanik(k, m === 'gulus' ? 12 : 7, c => tefeciArka(c, t));
    katman(X, k, 1);
    const ag = AGIZ(t), gul = m === 'gulus' ? .6 + .4 * nab(t, p.kikir, 2) : .25;
    const kal = ease(clamp((t - (p.kaldir ?? 1e9)) / .5));
    karakterBasla(k);
    KX.save(); KX.translate(m === 'konus' ? 640 : 560, m === 'gulus' ? 980 : m === 'konus' ? 820 : 900); KX.scale(m === 'gulus' ? 2.1 : m === 'konus' ? 1.25 : 1.45, m === 'gulus' ? 2.1 : m === 'konus' ? 1.25 : 1.45);
    tefeciBust(KX, { kafa: { agiz: ag, gul, dis: ag > .1 || m === 'gulus', altin: true, bak: m === 'konus' ? [-.6, .1] : [-.2, .2], smirk: .6 },
      kol: m === 'konus' ? { A: [250, 300], B: [lerp(330, 300, kal), lerp(660, 600, kal)], C: [lerp(300, -160, kal), lerp(780, 470, kal)] } : null, sayac: tsn(t), sayacS: .42, taraf: -1, elRot: -.2 });
    KX.restore();
    isiklandir(KX, [{ x: 620, y: 1000, r: 1100, renk: '#ff4a5a', a: .36 }, { x: 0, y: 1600, r: 700, renk: kir, a: .22 }, { x: 1080, y: 200, r: 800, renk: NEON.mac, a: .12 }]);
    karakterBas(); katman(X, k, 1);
    if (m === 'konus') bulanik(k, 5, c => {   // ön planda ensen: tefeciyi omzunuzun üstünden görürüz
      c.save(); c.translate(60, 1560); c.scale(1.6, 1.6); c.fillStyle = PS.ceket;
      c.beginPath(); c.moveTo(-360, 700); c.bezierCurveTo(-356, 360, -300, 240, -150, 206); c.lineTo(150, 206); c.bezierCurveTo(300, 240, 356, 360, 360, 700); c.fill();
      kafaArka(c, PS, { yagmur: true }); c.restore();
    });
    if (m === 'gulus' && t > p.kikir && t < p.kikir + .35) { X.save(); X.globalCompositeOperation = 'screen'; isik(X, 540 + 13 * 2.1, 980 + 97 * 2.1, 60, '#fff2b0', .9 * (1 - (t - p.kikir) / .35)); X.restore(); }
    yagmurCiz(X, t, { yogun: .55, bolge: (x, y) => y > 1500 || x < 200 || x > 1000 });
  } else if (m === 'whip' || m === 'durak') {
    // hızlı çevirme (tefeciden durağa) + durak geniş planı
    const sure = p.sure || .4, wp = m === 'whip' ? ease(clamp((t - s.bas) / sure)) : 1, bl = m === 'whip' ? Math.sin(Math.PI * clamp((t - s.bas) / sure)) : 0;
    k.x = lerp(220, 1000, wp); k.y = lerp(1180, 1260, wp);
    const ciz_ = c => { kavsak(c, t, { saat: SAATSN(t) }); c.save(); c.translate(980, KAVSAK.oturak); c.scale(.42, .42); zenginBank(c, { t, sayac: zsn(t) }); c.restore(); };
    if (bl > .05) { for (let i = 0; i < 6; i++) { const kk = Object.assign({}, k, { x: k.x - (i - 2.5) * 40 * bl }); bulanik(kk, 2, ciz_, i === 0 ? 1 : .35); } }
    else { katman(X, k, 1); ciz_(X); }
    katman(X, k, 1);
    karakterBasla(k); KX.save(); KX.translate(800, 1960); KX.scale(.72, .72); senArka(KX, PS, { sayac: sn, yagmur: true, t }); KX.restore();
    isiklandir(KX, [{ x: 760, y: 1550, r: 300, renk: kir, a: .45 }, { x: 1000, y: 1200, r: 800, renk: '#7dffd0', a: .25 }]);
    karakterBas(); katman(X, k, 1);
    yagmurCiz(X, t, { yogun: 1, kay: -k.x * .3 });
  } else if (m === 'rozet') {
    zenginYakin(t, s, k, 'rozet');
    const pr = nab(t, p.parla, 3); X.save(); X.globalCompositeOperation = 'screen'; isik(X, 811 - 118 * 2.3, 1691 - 318 * 2.3, 140, '#ffd27a', .35 + .5 * pr); X.restore();
    yagmurCiz(X, t, { yogun: .4, bolge: (x, y) => y > 1500 });
  } else if (m === 'bilek' || m === 'isaret') {
    zenginYakin(t, s, k, 'bilek', { isaret: m === 'isaret' ? (Math.floor((t - s.bas) * 2.5) % 2 ? 1 : .3) : .25 });
    yagmurCiz(X, t, { yogun: .5, bolge: (x, y) => y > 1500 });
  } else if (m === 'kay') {   // son vuruş: sarkan el kayar, parlayan bilek size döner
    zenginYakin(t, s, k, 'bilek', { kay: ease(clamp((t - s.bas) / (s.son - s.bas))), isaret: .25 });
  } else if (m === 'ikilem') {
    katman(X, k, 1); kavsak(X, t, { saat: SAATSN(t) });
    X.save(); X.translate(980, KAVSAK.oturak); X.scale(.42, .42); zenginBank(X, { t, sayac: zsn(t) }); X.restore();
    karakterBasla(k); KX.save(); KX.translate(540, 1990); KX.scale(.92, .92); senArka(KX, PS, { sayac: sn, yagmur: true, t }); KX.restore();
    isiklandir(KX, [{ x: 0, y: 1300, r: 900, renk: '#ff4a5a', a: .35 }, { x: 1080, y: 1300, r: 900, renk: '#7dffd0', a: .3 }, { x: 400, y: 1600, r: 300, renk: kir, a: .5 }]);
    karakterBas(); katman(X, k, 1);
    yagmurCiz(X, t, { yogun: 1 });
  } else if (m === 'kapi') {   // son vuruş: tefeci kapıyı kapatıyor, aralıktan bakıyor
    bulanik(k, 3, c => kavsak(c, t, { saat: SAATSN(t), kapi: ease(clamp((t - s.bas) / (s.son - s.bas))) * .7, tefeciO: { kafa: { bak: [-.8, 0] } } }));
    katman(X, k, 1);
    yagmurCiz(X, t, { yogun: .9 });
  }
}

/* ------------------------------------------------------------ SON VURUŞ: kırmızı rakamlar */
function sVurus(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn);
  katman(X, k, 1);
  X.fillStyle = '#0d0a12'; X.fillRect(-800, -400, 2700, 2800);
  bokeh(X, t, { seed: 31, adet: 18, renkler: [NEON.kir, '#ff5a3a', NEON.mac], buyuk: 140, a: .8 });
  karakterBasla(k);
  const tit = Math.sin(t * 47) * 3;
  KX.save(); KX.translate(tit, 0);
  kolCiz(KX, PS, [-700, 1600], [-140, 1240], [880, 960], { ust: true, kalin: 3.2, sayac: sn, sayacS: .62, poz: 'acik', taraf: -1, elRot: -.15 + Math.sin(t * 31) * .02 });
  KX.restore();
  isiklandir(KX, [{ x: 520, y: 1080, r: 900, renk: kir, a: .22 }]);
  karakterBas(); katman(X, k, 1);
  yagmurCiz(X, t, { yogun: .6, renk: '#ffd0d0' });
}

/* ------------------------------------------------------------ SEÇİM panelleri (görünen dünya y: 480..1440) */
function panelTefeci(t) {   // 1 · tefeciye gidin: kırmızı kapıda tefeci bileğinizi kavrıyor
  const sn = SAYAC(t), k = { x: 540, y: 960, z: 1, r: Math.sin(t * .9) * .006, sx: 0, sy: 0 };
  katman(X, k, 1);
  X.save(); X.translate(0, 200); tefeciArka(X, t); X.restore();
  const g = .55 + .45 * (Math.sin(t * 2.2) * .5 + .5);
  karakterBasla(k);
  KX.save(); KX.translate(800, 640); KX.scale(.9, .9);
  tefeciBust(KX, { kafa: { agiz: 0, gul: .7, dis: true, altin: true, bak: [-.8, .5], smirk: .8 }, kol: { A: [-250, 300], B: [-420, 520], C: [-470, 400] }, kolPoz: 'kavra', kavra: g, sayac: tsn(t), sayacS: .32, elRot: -1.2 });
  KX.restore();
  kolCiz(KX, PS, [-300, 1500], [60, 1220], [lerp(330, 360, Math.sin(t * 2.2) * .5 + .5), 1010], { kalin: 1.3, sayac: sn, sayacS: .46, poz: 'acik', taraf: -1, elRot: -.2 });
  isiklandir(KX, [{ x: 600, y: 900, r: 1000, renk: '#ff4a5a', a: .38 }, { x: 300, y: 1060, r: 360, renk: SAYAC_RENK(sn), a: .5 }]);
  karakterBas(); katman(X, k, 1);
  X.save(); X.globalCompositeOperation = 'screen'; isik(X, 360, 1000, 150, '#ffd27a', .3 + .25 * Math.sin(t * 9)); X.restore();
  yagmurCiz(X, t, { yogun: .5 });
}
function panelUyuyan(t) {   // 2 · uyuyandan alın: durakta diz çökmüşsünüz, eliniz adamın parlayan bileğinin üstünde (1040 altı arayüzün altında)
  const sn = SAYAC(t), k = { x: 540, y: 960, z: 1, r: 0, sx: 0, sy: 0 };
  bulanik(k, 6, c => { c.save(); c.translate(-560, -560); c.scale(1.5, 1.5); kavsak(c, t, { tefeci: false }); c.restore(); });
  katman(X, k, 1);
  X.save(); X.translate(560, 1040); X.scale(.78, .78); bankTahta(X, 0, -900, 600); X.restore();
  const kip = Math.sin(t * 3.1) > .85 ? .35 : 0;
  karakterBasla(k);
  KX.save(); KX.translate(860, 1040); KX.scale(.7, .7); zenginBank(KX, { t, sayac: zsn(t), kipir: kip, isaret: .3 }); KX.restore();
  KX.save(); KX.translate(230, 1300); KX.scale(.74, .74); senYan(KX, PS, { diz: 1, sayac: sn, uzan: [lerp(340, 362, Math.sin(t * 2) * .5 + .5), -470], uzanPoz: 'acik', kafa: { goz: 1.25, kas: .6 } }); KX.restore();
  isiklandir(KX, [{ x: 700, y: 700, r: 900, renk: '#7dffd0', a: .28 }, { x: 420, y: 860, r: 260, renk: SAYAC_RENK(sn), a: .45 }]);
  karakterBas(); katman(X, k, 1);
  yagmurCiz(X, t, { yogun: .6 });
}
