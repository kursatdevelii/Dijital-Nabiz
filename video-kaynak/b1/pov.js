/* Saat B1 "Üç Dakika" · 1. şahıs (POV) alternatifi. Zaman çizelgesi ve ses orijinalle aynı (zaman.json);
   bu dosya son.js'ten sonra yüklenir ve SAHNE / PANEL girdilerini karakterin gözünden çizen sürümlerle değiştirir.
   Kurallar: SEN hiç görünmez, sadece kendi kollarınız ve elleriniz (omuz kadrajın altında). Baş hareketi, göz kapakları, nefes. */

/* ------------------------------------------------------------ yardımcılar */
function kafaHareketi(k, t, g = 1) {   // baş: yavaş salınım + nefes
  k.sx += g * (6 * Math.sin(t * .9) + 3 * Math.sin(t * 2.3 + 1));
  k.sy += g * (5 * Math.sin(t * 1.3 + .5) + 4 * Math.sin(t * 3.1));
  k.r = (k.r || 0) + g * .006 * Math.sin(t * .7 + 2);
}
function gozKapagi(kapali) {   // üst ve alt göz kapağı (ekran uzayı); 0 açık .. 1 kapalı
  if (kapali <= .002) return;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  const ust = lerp(-260, 980, kapali), alt = lerp(2180, 940, kapali);
  X.fillStyle = '#05030a';
  X.beginPath(); X.moveTo(-60, -60); X.lineTo(1140, -60); X.lineTo(1140, ust - 170); X.quadraticCurveTo(540, ust + 210, -60, ust - 170); X.closePath(); X.fill();
  X.beginPath(); X.moveTo(-60, 1980); X.lineTo(1140, 1980); X.lineTo(1140, alt + 130); X.quadraticCurveTo(540, alt - 170, -60, alt + 130); X.closePath(); X.fill();
  X.fillStyle = lg(X, 0, ust - 60, 0, ust + 300, [[0, 'rgba(5,3,10,.85)'], [1, 'rgba(5,3,10,0)']]); X.fillRect(0, ust - 60, W, 360);
  X.fillStyle = lg(X, 0, alt + 60, 0, alt - 260, [[0, 'rgba(5,3,10,.85)'], [1, 'rgba(5,3,10,0)']]); X.fillRect(0, alt - 260, W, 320);
  X.restore();
}
function benimKol(c, A, B, C, o = {}) {   // kendi kolunuz: omuz kadrajın altında, ön kol ve el önünüzde
  kolCiz(c, PS, A, B, C, Object.assign({ kalin: 2.4, poz: 'acik', taraf: -1 }, o));
}
const EKRAN = { x: 540, y: 960, z: 1, r: 0, sx: 0, sy: 0 };   // kollar için: sahne kamerasından bağımsız, başla birlikte salınır
function ekranK(t, g = 1) { const k = Object.assign({}, EKRAN); kafaHareketi(k, t, g); return k; }
function camOrtusu(t, a = 1) {   // pencerenin ardından bakış: camda damlalar ve süzülen izler
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  const r = rng(77);
  for (let i = 0; i < 46; i++) { const x = r() * W, y = r() * H, s = .7 + r() * 1.5; elips(X, x, y, 7 * s, 9 * s, `rgba(210,230,255,${.15 * a})`); elips(X, x - 2, y - 3, 2.2 * s, 2.2 * s, `rgba(255,255,255,${.42 * a})`); }
  for (let i = 0; i < 7; i++) {
    const x = r() * W, h0 = r() * H, v = 80 + r() * 120, y = (h0 + t * v) % (H + 100) - 50;
    X.strokeStyle = `rgba(200,225,255,${.18 * a})`; X.lineWidth = 4; X.beginPath(); X.moveTo(x, Math.max(0, y - 260)); X.lineTo(x + Math.sin(y * .02) * 5, y); X.stroke();
    elips(X, x, y, 8, 10, `rgba(210,235,255,${.32 * a})`);
  }
  X.fillStyle = rg(X, 540, 960, 700, 1250, [[0, 'rgba(8,10,20,0)'], [1, `rgba(8,10,20,${.45 * a})`]]); X.fillRect(0, 0, W, H);
  X.restore();
}
function yastikOn(c) {   // yan yatarken gözün dibindeki yastık
  c.fillStyle = '#d9d5e2'; c.beginPath(); c.ellipse(60, 1780, 640, 440, -.4, 0, 7); c.fill();
  c.fillStyle = 'rgba(120,110,160,.45)'; c.beginPath(); c.ellipse(300, 1560, 320, 120, -.4, 0, 7); c.fill();
}

/* ------------------------------------------------------------ YATAK: yan yatmış uyanış, doğrulma */
function pYatak(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn);
  if (p.mod === 'bilek') {
    // oda yana devrik ve bulanık; gözünüzün önünde bileğiniz. İlk karede göz kapakları yarı açık, bileğin ışığı görünür.
    const od = ease(clamp((t - p.odak) / .45));
    bulanik(Object.assign({}, k, { r: -1.32 + .03 * Math.sin(t * .8), z: k.z * 1.55 }), lerp(22, 10, od), c => odaGenis(c, t, { saat: SAATSN(t) }));
    katman(X, k, 1);
    bulanik(k, 18, yastikOn);
    karakterBasla(k);
    benimKol(KX, [1350, 2350], [980, 1650], [260, 1060], { kalin: 2.7, sayac: sn, sayacS: .62, elRot: .1 });
    isiklandir(KX, [{ x: 600, y: 1350, r: 800, renk: kir, a: .3 }]);
    karakterBas(); katman(X, k, 1);
    isik(X, 600, 1330, 600, kir, .2 + .1 * Math.sin(t * 6.3));
    const kirp = t < p.uyan ? .4 + .08 * Math.sin(t * 2.2) + .5 * Math.exp(-Math.pow((t - .95) / .09, 2)) : .4 * (1 - easeOut(clamp((t - p.uyan) / .22)));
    gozKapagi(clamp(kirp));
  } else if (p.mod === 'dogrul') {
    // doğrulursunuz: oda düzelir, sol bileğiniz yüzünüze yaklaşır, sağ eliniz yorganı iter
    const g = easeOut(clamp((t - s.bas) / .8)), kal = ease(clamp((t - s.bas - .3) / .7));
    bulanik(Object.assign({}, k, { r: lerp(-1.32, 0, g), sy: k.sy + lerp(-300, 0, g), z: k.z * lerp(1.55, 1.05, g) }), lerp(14, 6, g), c => odaGenis(c, t, { saat: SAATSN(t) }));
    katman(X, k, 1);
    const yk = lerp(1450, 1640, g);
    X.fillStyle = '#455c8a'; X.beginPath(); X.moveTo(-400, yk); X.bezierCurveTo(200, yk - 90, 700, yk + 80, 1500, yk - 30); X.lineTo(1500, 2400); X.lineTo(-400, 2400); X.closePath(); X.fill();
    X.strokeStyle = 'rgba(20,30,60,.45)'; X.lineWidth = 7; for (const x of [80, 380, 700, 980]) { X.beginPath(); X.moveTo(x, yk + 10); X.quadraticCurveTo(x + 90, yk + 200, x - 30, yk + 420); X.stroke(); }
    const ke = ekranK(t, .6); karakterBasla(ke);
    benimKol(KX, [1350, 2550], [1180, 2050], [930, 1760], { kalin: 2.0, poz: 'acik', elRot: -.35, ayna: true });
    benimKol(KX, [-300, 2550], [lerp(-60, 130, kal), lerp(2080, 1660, kal)], [lerp(320, 600, kal), lerp(1760, 1090, kal)], { kalin: lerp(2.2, 3.0, kal), sayac: sn, sayacS: .6, elRot: -.25 });
    isiklandir(KX, [{ x: lerp(320, 600, kal), y: lerp(1760, 1250, kal), r: 700, renk: kir, a: .3 }]);
    karakterBas(); katman(X, k, 1);
  }
}

/* ------------------------------------------------------------ yüz yakın planları yerine: elleriniz */
function pYuz(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn), sokak = p.yer === 'sokak';
  kafaHareketi(k, t, sokak ? 1.6 : 1);
  bulanik(k, 11, c => sokak ? kavsak(c, t, { saat: SAATSN(t) }) : odaGenis(c, t, { saat: SAATSN(t) }));
  katman(X, k, 1);
  const of = p.ofke ? ease(clamp((t - s.bas - (p.ofkeT || .3)) / .35)) : 0, tit = Math.sin(t * 43) * (sokak ? 6 : 2 + 4 * of);
  const ke = ekranK(t, sokak ? 1.4 : .8); ke.sx += tit; karakterBasla(ke);
  if (sokak) {   // iki el, avuçlar yukarı, yağmurda titriyor
    benimKol(KX, [1380, 2550], [1120, 1980], [770, 1400], { kalin: 2.2, poz: 'acik', elRot: -.25, ayna: true });
    benimKol(KX, [-300, 2550], [-20, 1980], [330, 1400], { kalin: 2.2, sayac: sn, sayacS: .6, poz: 'acik', elRot: .25 });
  } else {   // öfke: sol eliniz yumruk olur, morluklar parlıyor
    benimKol(KX, [-260, 2480], [60, 1820], [650, 1170], { kalin: 2.6, sayac: sn, sayacS: .6, poz: of > .5 ? 'yumruk' : 'acik', elRot: -.15, sayacO: { morluk: 1 } });
  }
  isiklandir(KX, [{ x: 450, y: 1500, r: 800, renk: kir, a: .3 }, { duz: true, renk: '#1a2040', a: .1 }]);
  karakterBas(); katman(X, k, 1);
  if (sokak) yagmurCiz(X, t, { yogun: .9 });
}

/* ------------------------------------------------------------ BİLEK: morluğu yoklayan parmak */
function pBilek(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn);
  kafaHareketi(k, t, .6);
  bulanik(k, 14, c => { odaGenis(c, t, { saat: SAATSN(t) }); isik(c, 540, 1000, 900, kir, .3); });
  katman(X, k, 1);
  karakterBasla(k);
  benimKol(KX, [-260, 2550], [100, 1800], [lerp(820, 860, u), lerp(1060, 1020, u)], { kalin: 3.0, sayac: sn, sayacS: .6, elRot: -.1,
    sayacO: { morluk: ease(clamp((t - s.bas) / .4)), halka: .6 + .3 * Math.sin(t * 5) } });
  const bas = ease(clamp((t - s.bas - .5) / .6));
  benimKol(KX, [1500, 2650], [1250, 2100], [lerp(1300, 780, bas), lerp(2150, 1580, bas)], { kalin: 2.4, poz: 'isaret', ayna: true });   // işaret parmağı morluğa değer
  isiklandir(KX, [{ x: 520, y: 1300, r: 800, renk: kir, a: .3 }, { x: 1080, y: 200, r: 900, renk: '#3ff4ff', a: .14 }]);
  karakterBas(); katman(X, k, 1);
}

/* ------------------------------------------------------------ ANI: dün gece, uykulu gözlerle */
function pAni(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), g = ease(clamp((t - p.kavra) / .35)), akis = clamp((t - p.kavra - .2) / (s.son - p.kavra - .3));
  const once = 3 * SN_GUN + 4 * 3600 + 12 * 60 + 55, sonra = 5 * 3600, sn = lerp(once, sonra, Math.pow(akis, .6));
  bulanik(Object.assign({}, k, { r: -1.32, z: k.z * 1.55 }), 18, c => odaGenis(c, t, { saat: 4 * 3600 }));
  katman(X, k, 1);
  X.fillStyle = 'rgba(8,12,34,.5)'; X.fillRect(-800, -400, 2700, 2800);
  bulanik(k, 18, yastikOn);
  karakterBasla(k);
  benimKol(KX, [1350, 2350], [980, 1650], [260, 1060], { kalin: 2.5, sayac: sn, sayacS: .55, elRot: .1 });
  // kırmızı kapüşon kolu yukarıdan uzanıp bileğinizi kavrar
  kolCiz(KX, KARDES, [1450, -600], [1180, 280], [lerp(1050, 420, g), lerp(160, 1110, g)], { kolRenk: KARDES.hood, yen: KARDES.hood, yenG: KARDES.hoodG, ten: KARDES.ten, tenK: KARDES.tenK,
    kalin: 2.0, poz: 'kavra', kavra: g, elRot: .9 });
  isiklandir(KX, [{ x: 560, y: 1300, r: 700, renk: SAYAC_RENK(sn), a: .4 }]);
  karakterBas(); katman(X, k, 1);
  if (akis > 0 && akis < 1) { X.save(); X.globalCompositeOperation = 'screen'; for (let i = 0; i < 10; i++) { const f = (t * 2.4 + i / 10) % 1; isik(X, lerp(560, 480, f), lerp(1300, 1000, f), 38, SAYAC_RENK(sn), .9 * (1 - f)); } X.restore(); }
  gozKapagi(.38 + .06 * Math.sin(t * 1.7));
}

/* ------------------------------------------------------------ ODA: boş yatak, not (iki elinizde), masa, duvar saati */
function pOda(s, t, u) {
  const p = s.prm;
  if (p.mod === 'genis') { const k = kamera(s, t, u); kafaHareketi(k, t, .8); katman(X, k, 1); odaGenis(X, t, { saat: SAATSN(t) }); return; }
  if (p.mod === 'not') {
    const k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn);
    kafaHareketi(k, t, .5);
    bulanik(k, 8, c => odaGenis(c, t, { saat: SAATSN(t), not: false }));
    katman(X, k, 1);
    let satir = 0; (p.satirlar || []).forEach(([a, b]) => { satir += clamp((t - a) / (b - a)); });
    const ke = ekranK(t, .5); karakterBasla(ke);
    KX.save(); KX.translate(560, 1000); KX.rotate(-.03 + Math.sin(t * 1.1) * .012); notKagit(KX, 0, 0, 1.3, { satir, rot: 0 }); KX.restore();
    benimKol(KX, [-260, 2480], [20, 1880], [180, 1290], { kalin: 1.9, sayac: sn, sayacS: .5, poz: 'tut', elRot: -.4 });
    benimKol(KX, [1340, 2480], [1060, 1880], [940, 1290], { kalin: 1.9, poz: 'tut', elRot: .4, ayna: true });
    isiklandir(KX, [{ x: 300, y: 1600, r: 700, renk: kir, a: .35 }, { x: 0, y: 600, r: 900, renk: '#ff3fd2', a: .14 }]);
    karakterBas(); katman(X, k, 1);
    return;
  }
  sOda(s, t, u);   // masa (kolunuz kadrajın altından uzanır) ve duvar saati zaten göz hizasında
}

/* ------------------------------------------------------------ ileri bakan sokak (POV koşu): perspektif, birim ≈ cm */
const PF = 820, PVY = 840, PH = 170, PW = 700;   // odak, ufuk, göz yüksekliği, cephelerin uzaklığı
const pj = (X_, Y_, Z_) => [540 + PF * X_ / Z_, PVY + PF * (PH - Y_) / Z_];
const SOK_SEG = 520;
const SOK_NEON = [['KAHVE · 4 DK', NEON.cam], ['EKMEK · 12 DK', NEON.mac], ['OTEL · 1 GÜN', NEON.kir], ['TAMİR · 3 SA', NEON.sari], ['İLAÇ · 6 SA', '#5cff8a'], ['ÇAY · 2 DK', NEON.mor], ['BAR', NEON.cam], ['KİRA · 2 GÜN', NEON.mac]];
function binaBilgi(i, s) {
  const r = rng(i * 7 + (s > 0 ? 3 : 0) + 100);
  return { h: 900 + r() * 1700, renk: ['#262f47', '#2e2a46', '#232a3c', '#2b2540', '#20283a'][Math.floor(r() * 5)], isik: .3 + r() * .25, seed: Math.floor(r() * 1e6),
    neon: r() < .75 ? SOK_NEON[Math.floor(r() * SOK_NEON.length)] : null, dukkan: ['#ffcf86', NEON.cam, NEON.mac, '#ff9a5a'][Math.floor(r() * 4)] };
}
// o.yayalar: [{x, z, renk, kenar, semsiye, yon}] dünya konumu; yaklaşınca kenara çekilip bileğini saklar
function ileriSokak(c, t, camZ, o = {}) {
  gokSabah(c, { y0: -600, ufuk: PVY + 40, gx: 540, gr: 700, t });
  yukariSehir(c, 540, PVY + 40, .3, { saat: o.saat });
  c.fillStyle = 'rgba(120,140,190,.3)'; c.fillRect(-1000, PVY - 170, 3200, 230);
  c.fillStyle = lg(c, 0, PVY, 0, 1920, [[0, '#1f2638'], [1, '#0b0f18']]); c.fillRect(-1000, PVY, 3200, 1500);
  // kaldırımlar ve kenar çizgileri
  for (const s of [-1, 1]) {
    c.fillStyle = '#262c3c'; poly(c, [pj(s * 420, 0, 40), pj(s * PW, 0, 40), pj(s * PW, 0, 9000), pj(s * 420, 0, 9000)]);
    c.strokeStyle = 'rgba(160,175,210,.35)'; c.lineWidth = 4; c.beginPath(); c.moveTo(...pj(s * 420, 0, 45)); c.lineTo(...pj(s * 420, 0, 9000)); c.stroke();
  }
  for (let zd = Math.floor(camZ / 300) * 300 + 300; zd < camZ + 6000; zd += 300) {   // yol çizgisi
    const z1 = zd - camZ, z2 = z1 + 140; if (z1 < 40) continue;
    c.fillStyle = `rgba(230,230,240,${.55 * (1 - z1 / 6000)})`; poly(c, [pj(-10, 0, z1), pj(10, 0, z1), pj(10, 0, z2), pj(-10, 0, z2)]);
  }
  const ZMAX = 9000, i0 = Math.floor(camZ / SOK_SEG), spr = [];
  for (let i = i0 + Math.ceil(ZMAX / SOK_SEG); i >= i0; i--) {
    const z1 = i * SOK_SEG - camZ, z2 = z1 + SOK_SEG; if (z2 < 40) continue;
    const za = Math.max(z1, 40), sis = clamp((z1 - 2200) / 6800);
    for (const s of [-1, 1]) {
      const b = binaBilgi(i, s), X_ = s * PW;
      c.fillStyle = mixc(b.renk, '#5a6488', sis * .7); poly(c, [pj(X_, 0, za), pj(X_, b.h, za), pj(X_, b.h, z2), pj(X_, 0, z2)]);
      c.fillStyle = `rgba(0,0,0,${.3 * (1 - sis)})`; poly(c, [pj(X_, 0, za), pj(X_, b.h, za), pj(X_, b.h, za + 30), pj(X_, 0, za + 30)]);   // binalar arası derz
      const r = rng(b.seed);
      for (let fy = 460; fy < b.h - 120; fy += 300) for (let k = 0; k < 3; k++) {
        const w1 = z1 + 70 + k * 150, w2 = w1 + 100, lit = r() < b.isik, col = lit ? (r() < .6 ? '#ffcf86' : r() < .5 ? '#9fe9ff' : '#ff9ad8') : '#141a28';
        if (w1 < 50) continue;
        c.fillStyle = mixc(col, '#5a6488', sis * .6); poly(c, [pj(X_, fy, w1), pj(X_, fy + 170, w1), pj(X_, fy + 170, w2), pj(X_, fy, w2)]);
      }
      if (z1 + 80 > 50) {   // zemin katta ışıklı vitrin + ıslak zeminde yansıması
        const v1 = z1 + 80, v2 = z2 - 80;
        c.fillStyle = rgba(b.dukkan, .55 * (1 - sis)); poly(c, [pj(X_, 40, v1), pj(X_, 330, v1), pj(X_, 330, v2), pj(X_, 40, v2)]);
        c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = rgba(b.dukkan, .16 * (1 - sis));
        poly(c, [pj(X_, 0, v1), pj(X_ - s * 260, 0, v1), pj(X_ - s * 260, 0, v2), pj(X_, 0, v2)]); c.restore();
      }
      if (b.neon && z1 + 260 > 120) spr.push({ z: z1 + 260, tip: 'neon', s, b, i });
    }
  }
  for (const y of (o.yayalar || [])) { const z = y.z - camZ; if (z > 70 && z < 7000) spr.push({ z, tip: 'yaya', y }); }
  spr.sort((a, b) => b.z - a.z);
  for (const sp of spr) {
    if (sp.tip === 'neon') {
      const { s, b } = sp, f = PF / sp.z * 62; if (f > 190) continue;
      const [x0, y0] = pj(s * (PW - 260), 560, sp.z), sis = clamp((sp.z - 2200) / 6800);
      neon(c, b.neon[0], x0, y0, { renk: b.neon[1], font: f, t, titre: .03, seed: sp.i, a: 1 - sis * .6 });
      const [, yg] = pj(0, 0, sp.z), [, yr] = pj(0, -560, sp.z), w = f * b.neon[0].length * .6;
      c.save(); c.globalCompositeOperation = 'screen'; c.fillStyle = lg(c, 0, yg, 0, yr, [[0, rgba(b.neon[1], .32 * (1 - sis))], [1, rgba(b.neon[1], 0)]]); c.fillRect(x0 - w / 2, yg, w, yr - yg); c.restore();
    } else {
      const y = sp.y, yak = clamp((900 - sp.z) / 500), x_ = y.x + Math.sign(y.x || 1) * 140 * ease(yak) * (y.kac ?? 1);
      const sc = PF / sp.z * 175 / 600, [px, py] = pj(x_, 0, sp.z);
      c.save(); c.translate(px, py); c.scale(sc, sc);
      yaya(c, { yon: y.yon ?? 1, faz: t * 4 + y.z, yuru: .5, sakla: y.sakla ?? ease(yak), sayac: y.sn ?? 3 * 3600, semsiye: y.semsiye, kenar: y.kenar || NEON.cam, kapuson: !y.semsiye });
      c.restore();
    }
  }
}
const YD = (() => { const r = rng(55), a = []; for (let i = 0; i < 300; i++) a.push([r() * 1800 - 900, r() * 1000, r() * 2600]); return a; })();
function yagmurIleri(t, camZ, hiz) {   // koşarken üstünüze gelen yağmur: ufuk noktasından dışa çizgiler
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.lineCap = 'round';
  for (const [x0, y0, z0] of YD) {
    const z = ((z0 - camZ) % 2600 + 2600) % 2600 + 60, Y_ = ((y0 - t * 900) % 1000 + 1000) % 1000 - 100;
    const [ax, ay] = pj(x0, Y_, z), [bx, by] = pj(x0, Y_ + 55, z + 30 + hiz * .06);
    if (ax < -60 || ax > 1140 || ay < -60 || ay > 1980) continue;
    X.strokeStyle = `rgba(200,225,255,${clamp(1 - z / 2600) * .5})`; X.lineWidth = clamp(PF / z * 2.6, .6, 4);
    X.beginPath(); X.moveTo(ax, ay); X.lineTo(bx, by); X.stroke();
  }
  X.restore();
}
function ileriIz(g) {   // hızla ileri giderken ufuk noktasından dışa doğru iz
  if (g < .01) return;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0);
  TX.setTransform(1, 0, 0, 1, 0, 0); TX.clearRect(0, 0, W, H); TX.drawImage(cv, 0, 0);
  for (const [s_, a] of [[1.018, .3], [1.036, .2], [1.06, .12]]) { X.setTransform(s_, 0, 0, s_, 540 * (1 - s_), PVY * (1 - s_)); X.globalAlpha = a * g; X.drawImage(TMP, 0, 0); }
  X.restore();
}
function kapiCerceve(d) {   // kapıdan fırlayış: kapı çerçevesi büyüyüp kadrajdan çıkar, kanat açılır
  const g = easeIn(clamp(d / .5)); if (g >= 1) return;
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); const sc = lerp(1, 5.5, g);
  X.translate(540, 1000); X.scale(sc, sc); X.translate(-540, -1000); X.globalAlpha = 1 - g * g;
  X.fillStyle = '#0d0b13'; X.beginPath(); X.rect(-3000, -3000, 7000, 7000); X.rect(790, 470, -500, 1250); X.fill('evenodd');
  X.strokeStyle = '#2b2f3c'; X.lineWidth = 34; X.strokeRect(290, 470, 500, 1250);
  const ac = easeOut(clamp(d / .18));   // kanat sağ menteşeden size doğru açılır
  X.fillStyle = '#1a1d27'; poly(X, [[790, 470], [lerp(290, 760, ac), lerp(470, 380, ac)], [lerp(290, 760, ac), lerp(1720, 1820, ac)], [790, 1720]]);
  yaz(X, '17', lerp(380, 770, ac), 560, '700 52px Consolas', 'rgba(232,226,208,.8)', { golge: false });
  X.restore();
}
function kosanKollar(c, dongu, sn, A = 1, uzan) {   // koşarken kadrajın altından sallanan kollar; uzan: sol elin hedefi [x, y]
  const a = .5 + .5 * Math.sin(2 * Math.PI * dongu), b = 1 - a;
  if (uzan) benimKol(c, [-260, 2600], [lerp(80, 300, uzan[2]), lerp(2200, 1700, uzan[2])], [lerp(200, uzan[0], uzan[2]), lerp(2100, uzan[1], uzan[2])], { kalin: 2.2, sayac: sn, sayacS: .55, poz: 'acik', elRot: -.2 });
  else benimKol(c, [-260, 2600], [lerp(40, 170, a * A), lerp(2380, 1960, a * A)], [lerp(130, 430, a * A), lerp(2280, 1540, a * A)], { kalin: 2.2, sayac: sn, sayacS: .55, poz: 'yumruk', elRot: -.3 });
  benimKol(c, [1340, 2600], [lerp(1040, 910, b * A), lerp(2380, 1960, b * A)], [lerp(950, 650, b * A), lerp(2280, 1540, b * A)], { kalin: 2.2, poz: 'yumruk', elRot: .3, ayna: true });
}
const KOS_YAYA = [[-520, 700, NEON.cam, null], [540, 1250, NEON.mac, '#1d2a44'], [-470, 1900, NEON.sari, null], [420, 2500, NEON.cam, '#2a1a30'], [-560, 3100, NEON.mac, '#141824'],
  [500, 3700, NEON.cam, null], [-430, 4300, NEON.mor, '#1d2a44'], [560, 4900, NEON.sari, null]].map(([x, z, kenar, semsiye]) => ({ x, z, kenar, semsiye }));
const KAL_YAYA = [[-330, 380, NEON.cam, '#1d2a44'], [-120, 900, NEON.mac, null], [280, 1050, NEON.sari, '#2a1a30'], [-420, 1250, NEON.mac, null], [90, 1420, NEON.cam, '#141824'],
  [380, 1600, NEON.mac, null], [-250, 1750, NEON.cam, null], [180, 1900, NEON.mor, '#1d2a44'], [-500, 600, NEON.sari, null], [470, 760, NEON.cam, null]].map(([x, z, kenar, semsiye]) => ({ x, z, kenar, semsiye }));
function pSokak(s, t, u) {
  const p = s.prm, sn = SAYAC(t), kir = SAYAC_RENK(sn);
  if (p.mod === 'kos') {
    // kapıdan fırlayıp sokağın sonundaki Büyük Saat'e doğru koşarsınız; adımlar sesle aynı (saniyede 3)
    const d = t - p.t0, r = .35, hiz = 640, yol = hiz * (d <= 0 ? 0 : d < r ? d * d / (2 * r) : d - r / 2), A = clamp(.3 + d / r, .3, 1);
    const adim = Math.max(0, (d - .25) * 3), k = { x: 540, y: 960, z: 1, r: 0, sx: 0, sy: 0 };   // ses: ilk adım t0 + .25'te, sonra saniyede 3
    k.sy += (22 * Math.abs(Math.sin(Math.PI * adim)) - 11) * A; k.sx += 12 * Math.sin(Math.PI * adim) * A; k.r = .012 * Math.sin(Math.PI * adim) * A;   // basışta baş alçalır
    katman(X, k, 1); ileriSokak(X, t, yol, { saat: SAATSN(t), yayalar: KOS_YAYA });
    ileriIz(A * .9);
    yagmurIleri(t, yol, hiz * A);
    karakterBasla(Object.assign({}, EKRAN, { sx: k.sx * .6, sy: k.sy * .6 }));
    kosanKollar(KX, adim / 2, sn, A);
    isiklandir(KX, [{ x: 260, y: 1700, r: 600, renk: kir, a: .35 }, { duz: true, renk: '#1a2240', a: .12 }]);
    karakterBas();
    kapiCerceve(d);
  } else if (p.mod === 'kalabalik') {
    // kalabalığın arasından itişerek geçersiniz; herkes bileğini saklar, sağdaki adamın koluna uzanırsınız
    const d = t - s.bas, hiz = 430, yol = d * hiz, adim = d * 2.6, k = { x: 540, y: 960, z: 1, r: 0, sx: 0, sy: 0 };
    k.sy += 16 * Math.abs(Math.sin(Math.PI * adim)) - 8; k.sx += 16 * Math.sin(Math.PI * adim); k.r = .016 * Math.sin(Math.PI * adim);
    const cek = ease(clamp((t - p.cek) / .35)), uz = ease(clamp((t - p.cek + .35) / .25)) * (1 - ease(clamp((t - p.cek - .4) / .3)));
    const adam = { x: 150, z: 520, kenar: NEON.mac, sakla: cek, kac: 0, sn: 6 * 3600 };
    katman(X, k, 1); ileriSokak(X, t, yol, { saat: SAATSN(t), yayalar: KAL_YAYA.concat([adam]) });
    ileriIz(.45);
    yagmurIleri(t, yol, hiz);
    // adamın bileği (ekranda): sağ önünüzde; eliniz oraya uzanır
    const za = adam.z - yol, sc = PF / za * 175 / 600, [ax, ay] = pj(adam.x, 0, za), bx = ax - 96 * sc, by = ay - 292 * sc;
    karakterBasla(Object.assign({}, EKRAN, { sx: k.sx * .6, sy: k.sy * .6 }));
    kosanKollar(KX, adim / 2, sn, .7, uz > .02 ? [bx - 40, by + 30, uz] : null);
    isiklandir(KX, [{ x: 300, y: 1600, r: 600, renk: kir, a: .35 }, { duz: true, renk: '#1a2240', a: .12 }]);
    karakterBas();
  } else sSokak(s, t, u);   // kadın: zaten karşınızda, size bakıyor
}

/* ------------------------------------------------------------ KAVŞAK: tefeci size konuşur, durağa dönersiniz, ikilem */
function pKavsak(s, t, u) {
  const p = s.prm, m = p.mod, sn = SAYAC(t), kir = SAYAC_RENK(sn);
  if (m === 'konus') {
    const k = kamera(s, t, u); kafaHareketi(k, t, .5);
    bulanik(k, 7, c => tefeciArka(c, t));
    katman(X, k, 1);
    const ag = AGIZ(t), kal = ease(clamp((t - (p.kaldir ?? 1e9)) / .5));
    karakterBasla(k);
    KX.save(); KX.translate(600, 840); KX.scale(1.3, 1.3);
    tefeciBust(KX, { kafa: { agiz: ag, gul: .25, dis: ag > .1, altin: true, bak: [0, .15], smirk: .6 }, kol: { A: [250, 300], B: [lerp(330, 300, kal), lerp(660, 600, kal)], C: [lerp(300, -160, kal), lerp(780, 470, kal)] },
      sayac: tsn(t), sayacS: .42, taraf: -1, elRot: -.2 });
    KX.restore();
    isiklandir(KX, [{ x: 620, y: 1000, r: 1100, renk: '#ff4a5a', a: .36 }, { x: 1080, y: 200, r: 800, renk: NEON.mac, a: .12 }]);
    karakterBas(); katman(X, k, 1);
    karakterBasla(ekranK(t, .6));   // kendi kırmızı bileğiniz, kadrajın solunda
    benimKol(KX, [-300, 2550], [30, 1980], [400, 1600], { kalin: 2.2, sayac: sn, sayacS: .55, elRot: -.1 });
    isiklandir(KX, [{ x: 300, y: 1800, r: 600, renk: kir, a: .3 }]);
    karakterBas();
    yagmurCiz(X, t, { yogun: .55, bolge: (x, y) => y > 1500 || x < 200 || x > 1000 });
  } else if (m === 'whip' || m === 'durak') {   // başınızı durağa çevirirsiniz
    const k = kamera(s, t, u), sure = p.sure || .4, wp = m === 'whip' ? ease(clamp((t - s.bas) / sure)) : 1, bl = m === 'whip' ? Math.sin(Math.PI * clamp((t - s.bas) / sure)) : 0;
    k.x = lerp(220, 1000, wp); k.y = lerp(1180, 1260, wp); if (m === 'durak') kafaHareketi(k, t, .8);
    const ciz_ = c => { kavsak(c, t, { saat: SAATSN(t) }); c.save(); c.translate(980, KAVSAK.oturak); c.scale(.42, .42); zenginBank(c, { t, sayac: zsn(t) }); c.restore(); };
    if (bl > .05) { for (let i = 0; i < 6; i++) { const kk = Object.assign({}, k, { x: k.x - (i - 2.5) * 40 * bl }); bulanik(kk, 2, ciz_, i === 0 ? 1 : .35); } }
    else { katman(X, k, 1); ciz_(X); }
    yagmurCiz(X, t, { yogun: 1, kay: -k.x * .3 });
  } else if (m === 'ikilem') {   // iki yolun ortasında durursunuz; bileğiniz kadrajın altında kırmızı yanıp söner
    const k = kamera(s, t, u); kafaHareketi(k, t, 1);
    katman(X, k, 1); kavsak(X, t, { saat: SAATSN(t) });
    X.save(); X.translate(980, KAVSAK.oturak); X.scale(.42, .42); zenginBank(X, { t, sayac: zsn(t) }); X.restore();
    karakterBasla(ekranK(t, .8));
    benimKol(KX, [-150, 2650], [260, 2020], [700, 1640], { kalin: 2.3, sayac: sn, sayacS: .55, elRot: -.15 });
    isiklandir(KX, [{ x: 0, y: 1500, r: 900, renk: '#ff4a5a', a: .25 }, { x: 1080, y: 1500, r: 900, renk: '#7dffd0', a: .22 }, { x: 480, y: 1850, r: 400, renk: kir, a: .4 }]);
    karakterBas();
    yagmurCiz(X, t, { yogun: 1 });
  } else sKavsak(s, t, u);   // dükkân, tefeci, gülüş, rozet, bilek, işaret, kapı, kayan el: zaten göz hizasından
}

/* ------------------------------------------------------------ SON VURUŞ: kırmızı rakamlar, kadrajın altından */
function pVurus(s, t, u) {
  const p = s.prm, k = kamera(s, t, u), sn = SAYAC(t), kir = SAYAC_RENK(sn);
  katman(X, k, 1);
  X.fillStyle = '#0d0a12'; X.fillRect(-800, -400, 2700, 2800);
  bokeh(X, t, { seed: 31, adet: 18, renkler: [NEON.kir, '#ff5a3a', NEON.mac], buyuk: 140, a: .8 });
  const ke = ekranK(t, 1.2); ke.sx += Math.sin(t * 47) * 4; karakterBasla(ke);
  benimKol(KX, [-320, 2550], [60, 1700], [860, 1000], { kalin: 3.2, sayac: sn, sayacS: .62, elRot: -.15 + Math.sin(t * 31) * .02 });
  isiklandir(KX, [{ x: 520, y: 1300, r: 900, renk: kir, a: .22 }]);
  karakterBas(); katman(X, k, 1);
  yagmurCiz(X, t, { yogun: .6, renk: '#ffd0d0' });
}

/* ------------------------------------------------------------ SEÇİM paneli 2 (POV): banktaki adamın önündesiniz, eliniz bileğinin üstünde */
function pPanelUyuyan(t) {
  const sn = SAYAC(t), k = { x: 540, y: 960, z: 1, r: 0, sx: 0, sy: 0 };   // görünen dünya y: 480..1440
  bulanik(k, 6, c => { c.save(); c.translate(-560, -560); c.scale(1.5, 1.5); kavsak(c, t, { tefeci: false }); c.restore(); });
  katman(X, k, 1);
  X.save(); X.translate(640, 1060); X.scale(.9, .9); bankTahta(X, 0, -900, 700); X.restore();
  const kip = Math.sin(t * 3.1) > .85 ? .35 : 0;
  karakterBasla(k);
  KX.save(); KX.translate(760, 1060); KX.scale(.9, .9); zenginBank(KX, { t, sayac: zsn(t), kipir: kip, isaret: .3 }); KX.restore();
  const o_ = Math.sin(t * 2) * .5 + .5;
  benimKol(KX, [-200, 1800], [60, 1420], [lerp(300, 320, o_), lerp(960, 940, o_)], { kalin: 1.6, sayac: sn, sayacS: .5, poz: 'acik', elRot: -.5 });
  isiklandir(KX, [{ x: 700, y: 700, r: 900, renk: '#7dffd0', a: .28 }, { x: 260, y: 1150, r: 300, renk: SAYAC_RENK(sn), a: .4 }]);
  karakterBas(); katman(X, k, 1);
  yagmurCiz(X, t, { yogun: .6 });
}

/* ------------------------------------------------------------ sahne tablosu: POV sürümleri */
Object.assign(SAHNE, { yatak: pYatak, yuz: pYuz, bilek: pBilek, ani: pAni, oda: pOda, sokak: pSokak, kavsak: pKavsak, vurus: pVurus,
  kafe: (s, t, u) => { sKafe(s, t, u); camOrtusu(t, .9); },   // pencerenizden aşağıya bakarken
  bank: (s, t, u) => { sBank(s, t, u); camOrtusu(t, .9); } });
PANEL.uyuyan = pPanelUyuyan;
