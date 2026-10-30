/* Saat - zaman çizelgesi ve son işlem: renk, gren, vinyet, anı (geri dönüş) efekti, sayaç paneli, seçim ekranı, filigran, kapak. */
const SAHNE = { yatak: sYatak, yuz: sYuz, pencere: sPencere, kafe: sKafe, bank: sBank, bilek: sBilek, ani: sAni, oda: sOda,
  sokak: sSokak, kavsak: sKavsak, vurus: sVurus, secim: sSecim };
let PLAN = [], TOPLAM = 0, SAYAC_KF = [[0, 180]], AGIZ_D = null, HUD_BAS = 5, SICRAMA = [];

/* sayaç: anahtar karelerden; aralarda gerçek hızla (1 sn / sn) akar, kesmelerde ileri atlayabilir */
function SAYAC(t) {
  let kf = SAYAC_KF[0];
  for (const q of SAYAC_KF) if (t >= q[0]) kf = q; else break;
  return Math.max(0, kf[1] - (t - kf[0]));
}
function AGIZ(t) {   // tefecinin ağzı: seslendirmenin zarfından
  if (!AGIZ_D) return 0;
  const i = Math.floor((t - AGIZ_D.bas) * AGIZ_D.fps);
  return i >= 0 && i < AGIZ_D.d.length ? AGIZ_D.d[i] : 0;
}
async function kur(z) {
  PLAN = z.planlar; TOPLAM = z.toplam; SAYAC_KF = z.sayac || SAYAC_KF; AGIZ_D = z.agiz || null; HUD_BAS = z.hudBas ?? HUD_BAS;
  SICRAMA = [];
  for (let i = 1; i < SAYAC_KF.length; i++) { const [a, v] = SAYAC_KF[i], [a0, v0] = SAYAC_KF[i - 1]; if (Math.abs((v0 - (a - a0)) - v) > .5) SICRAMA.push(a); }
  await document.fonts.load('64px Caveat'); await document.fonts.ready;
  window.hazir = true;
}
function renkKat(c, renk, a, mod = 'source-over') { c.save(); c.setTransform(1, 0, 0, 1, 0, 0); c.globalCompositeOperation = mod; c.globalAlpha = a; c.fillStyle = renk; c.fillRect(0, 0, W, H); c.restore(); }
function aniEfekt(t) {   // dün gece: soğuk mavi, soluk, kenarları bulanık, titreyen pozlama
  TX.setTransform(1, 0, 0, 1, 0, 0); TX.clearRect(0, 0, W, H); TX.drawImage(cv, 0, 0);
  X.filter = 'saturate(.5) brightness(.92) contrast(1.06)'; X.drawImage(TMP, 0, 0); X.filter = 'blur(10px)'; X.globalAlpha = .3; X.drawImage(TMP, 0, 0); X.globalAlpha = 1; X.filter = 'none';
  renkKat(X, '#5a9cff', .32, 'soft-light'); renkKat(X, '#0a1a40', .18, 'multiply');
  const fl = .04 * Math.sin(t * 83) + .03 * Math.sin(t * 29 + 1); renkKat(X, fl > 0 ? '#dfeaff' : '#000000', Math.abs(fl));
  X.fillStyle = rg(X, 540, 960, 520, 1150, [[0, 'rgba(6,14,40,0)'], [1, 'rgba(6,14,40,.85)']]); X.fillRect(0, 0, W, H);
}
function hudCiz(t) {   // sayaç paneli: sol üstte hikâye saati + kalan zaman
  const sn = SAYAC(t), renk = SAYAC_RENK(sn), fr = sn - Math.floor(sn), yan = sn < 60 ? .55 + .45 * Math.cos(2 * Math.PI * (1 - fr)) : 1;
  const gir = easeOut(clamp((t - HUD_BAS) / .45));
  let fl = 0; for (const a of SICRAMA) if (t >= a && t < a + .5) fl = Math.max(fl, 1 - (t - a) / .5);
  X.save(); X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = gir; X.translate(lerp(-70, 0, gir), 0);
  rr(X, 40, 262, 392, 140, 20); X.fillStyle = 'rgba(8,10,22,.64)'; X.fill();
  X.shadowColor = renk; X.shadowBlur = 10 + 20 * fl; X.strokeStyle = rgba(renk, .55 + .45 * fl); X.lineWidth = 2.5 + 2 * fl; X.stroke(); X.shadowBlur = 0;
  // 1. satır: saat ikonu + hikâye saati
  X.strokeStyle = 'rgba(255,255,255,.85)'; X.lineWidth = 3.5; X.beginPath(); X.arc(80, 304, 16, 0, 7); X.stroke();
  const ss = SAATSN(t), ak = (ss % 43200) / 43200 * Math.PI * 2 - Math.PI / 2, am = (ss % 3600) / 3600 * Math.PI * 2 - Math.PI / 2;
  X.lineWidth = 3; X.beginPath(); X.moveTo(80, 304); X.lineTo(80 + Math.cos(ak) * 8, 304 + Math.sin(ak) * 8); X.moveTo(80, 304); X.lineTo(80 + Math.cos(am) * 12, 304 + Math.sin(am) * 12); X.stroke();
  const hh = String(Math.floor(ss / 3600) % 24).padStart(2, '0'), mm = String(Math.floor(ss / 60) % 60).padStart(2, '0');
  X.font = '600 34px Consolas'; X.textAlign = 'left'; X.textBaseline = 'middle'; X.fillStyle = 'rgba(255,255,255,.9)'; X.fillText(`${hh}:${mm}`, 112, 305);
  X.font = '600 22px "Segoe UI"'; X.fillStyle = 'rgba(255,255,255,.55)'; X.fillText('KALAN', 330, 305);
  // 2. satır: bilek ikonu + sayaç
  X.fillStyle = 'rgba(255,255,255,.85)'; rr(X, 62, 352, 40, 22, 10); X.fill(); X.fillStyle = rgba(renk, yan); X.shadowColor = renk; X.shadowBlur = 12; elips(X, 82, 363, 8, 6, rgba(renk, yan)); X.shadowBlur = 0;
  X.font = '700 56px Consolas'; X.letterSpacing = '2px'; X.shadowColor = renk; X.shadowBlur = 18 * yan; X.fillStyle = rgba(renk, .5 + .5 * yan); X.fillText(sureYaz(sn), 112, 364);
  X.shadowBlur = 0; X.fillStyle = rgba(mixc(renk, '#ffffff', .6), .55 * yan); X.fillText(sureYaz(sn), 112, 364);
  if (fl > 0) { X.globalAlpha = gir * fl * .5; rr(X, 40, 262, 392, 140, 20); X.fillStyle = rgba(renk, .3); X.fill(); }
  X.restore();
}

/* ------------------------------------------------------------ SEÇİM: bölünmüş ekran (Hayatta Kalma'dan uyarlandı) */
function etiket(c, metin, y, buyu, parla) {
  c.save(); c.translate(540, y); c.scale(buyu, buyu);
  c.fillStyle = lg(c, -540, 0, 540, 0, [[0, 'rgba(0,0,0,0)'], [.2, 'rgba(0,0,0,.6)'], [.8, 'rgba(0,0,0,.6)'], [1, 'rgba(0,0,0,0)']]); c.fillRect(-540, -52, 1080, 104);
  yaz(c, metin, 0, 4, '78px Impact', '#ffcf4a', { aralik: '6px', golgeRenk: `rgba(255,170,40,${.35 + .5 * parla})`, blur: 20 + 30 * parla });
  c.restore();
}
const PANEL = { tefeci: panelTefeci, uyuyan: panelUyuyan };
function sSecim(s, t, u) {
  const p = s.prm, don = p.donma, tt = Math.min(t, don);
  const [pa, pb] = p.paneller, [e1, e2] = p.etiketler, h1 = 960;
  X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
  X.save(); X.beginPath(); X.rect(0, 0, W, h1); X.clip(); PANEL_DY = -480; PANEL[pa](tt); X.restore();
  X.save(); X.beginPath(); X.rect(0, h1, W, H - h1); X.clip(); PANEL_DY = 480; PANEL[pb](tt); X.restore();
  PANEL_DY = 0;
  X.setTransform(1, 0, 0, 1, 0, 0);
  const ac = clamp((t - p.acilis) / .35);
  const v1 = p.v1 && t >= p.v1[0] && t < p.v1[1], v2 = p.v2 && t >= p.v2[0] && t < p.v2[1];
  if (v1) { X.fillStyle = 'rgba(0,0,0,.45)'; X.fillRect(0, 960, W, 960); }
  if (v2) { X.fillStyle = 'rgba(0,0,0,.45)'; X.fillRect(0, 0, W, 960); }
  if (t >= don) { X.fillStyle = `rgba(0,0,0,${.3 * clamp((t - don) / .3)})`; X.fillRect(0, 0, W, H); }
  etiket(X, e1, 330, lerp(.6, 1, easeOut(ac)) * (1 + .1 * nab(t, p.b1, 4) + (v1 ? .05 : 0)), (v1 ? .6 : 0) + nab(t, p.b1, 4));
  etiket(X, e2, 1095, lerp(.6, 1, easeOut(ac)) * (1 + .1 * nab(t, p.b2, 4) + (v2 ? .05 : 0)), (v2 ? .6 : 0) + nab(t, p.b2, 4));
  X.fillStyle = 'rgba(255,207,74,.3)'; X.fillRect(0, h1 - 3, W * ac, 6);   // ayırıcı + sayaç çizgisi
  let f = 1; if (p.sayac && t >= p.sayac[0]) f = 1 - clamp((t - p.sayac[0]) / (p.sayac[1] - p.sayac[0]));
  const bw = W * f * ac;
  X.save(); X.shadowColor = '#ffb020'; X.shadowBlur = 24; X.fillStyle = f < .25 ? '#ff5a3a' : '#ffcf4a'; X.fillRect(540 - bw / 2, h1 - 6, bw, 12); X.restore();
  if (t >= don) {
    const gg = easeOut(clamp((t - don) / .22));
    X.save(); X.translate(540, 960); X.scale(.7 + .3 * gg, .7 + .3 * gg); X.globalAlpha = gg;
    rr(X, -420, -92, 840, 184, 30); X.fillStyle = 'rgba(12,10,22,.88)'; X.fill(); X.strokeStyle = '#ffcf4a'; X.lineWidth = 5; X.stroke();
    yaz(X, 'YORUMLARA YAZIN: 1 / 2', 0, -24, '72px Impact', '#ffcf4a', { aralik: '4px', golge: false });
    yaz(X, `ÇOĞUNLUĞUN SEÇİMİ: BÖLÜM ${p.bolum || 2}'${p.ek || 'DE'}`, 0, 46, '800 36px "Segoe UI"', '#ffffff', { golge: false, aralik: '1px' });
    X.restore();
  }
}

/* ------------------------------------------------------------ kapak arka planı */
function kapakCiz(bolum) {
  X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
  const k = { x: 540, y: 960, z: 1, r: 0, sx: 0, sy: 0 };
  if (bolum === 1) {
    // Bölüm 1 "Üç Dakika": yağmurda kavşak; solda tefecinin kırmızı kapısı, sağda yeşil durak; önde siz, kırmızı yanan bileğinizi yüzünüze kaldırmışsınız
    SAYAC_KF = [[0, 30]];
    bulanik(k, 7, c => { kavsak(c, 1.3, { saat: 32370 }); c.save(); c.translate(980, KAVSAK.oturak); c.scale(.42, .42); zenginBank(c, { t: 1, sayac: 60 * SN_YIL + 112 * SN_GUN }); c.restore(); });
    katman(X, k, 1);
    karakterBasla(k); KX.save(); KX.translate(560, 1230); KX.scale(1.32, 1.32);
    senBust(KX, PS, { kafa: { goz: 1.5, kas: 1, bak: [-.35, .55], agiz: .25, yagmur: true }, kollar: [{ A: [250, 300], B: [330, 300], C: [-160, 120], sayac: 30, sayacS: .62, poz: 'acik', taraf: -1, elRot: -.2, sayacO: { sabit: true } }] });
    KX.restore();
    isiklandir(KX, [{ x: 560, y: 1900, r: 900, renk: '#ff3636', a: .32 }, { x: 0, y: 900, r: 900, renk: '#ff4a5a', a: .3 }, { x: 1080, y: 900, r: 900, renk: '#7dffd0', a: .28 }]);
    karakterBas(); katman(X, k, 1);
    yagmurCiz(X, 1.3, { yogun: 1 });
  }
  X.setTransform(1, 0, 0, 1, 0, 0);
  TX.setTransform(1, 0, 0, 1, 0, 0); TX.clearRect(0, 0, W, H); TX.drawImage(cv, 0, 0);
  X.filter = RENK; X.drawImage(TMP, 0, 0); X.filter = 'none';
  X.globalCompositeOperation = 'overlay'; X.globalAlpha = .12; X.drawImage(GREN[0], 0, 0, W, H);
  X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.drawImage(VIG, 0, 0);
}

/* ------------------------------------------------------------ kare */
function ciz(t) {
  let s = PLAN[PLAN.length - 1];
  for (const q of PLAN) if (t >= q.bas && t < q.son) { s = q; break; }
  const p = s.prm, u = clamp((t - s.bas) / (s.son - s.bas));
  X.save();
  X.setTransform(1, 0, 0, 1, 0, 0); X.fillStyle = '#000'; X.fillRect(0, 0, W, H);   // önceki kareden iz kalmasın
  if (s.sahne !== 'siyah') SAHNE[s.sahne](s, t, u);
  X.restore();
  PANEL_DY = 0;
  X.setTransform(1, 0, 0, 1, 0, 0); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over'; X.filter = 'none';
  if (s.sahne !== 'siyah') {
    TX.setTransform(1, 0, 0, 1, 0, 0); TX.clearRect(0, 0, W, H); TX.drawImage(cv, 0, 0);
    X.filter = RENK; X.drawImage(TMP, 0, 0); X.filter = 'none';
    X.globalCompositeOperation = 'overlay'; X.globalAlpha = .13;
    const gi = Math.floor(t * 30) % 4, ox = (Math.floor(t * 30) * 37) % 60, oy = (Math.floor(t * 30) * 53) % 60;
    X.drawImage(GREN[gi], -ox, -oy, W + 60, H + 60); X.globalAlpha = 1; X.globalCompositeOperation = 'source-over';
    X.drawImage(VIG, 0, 0);
  }
  if (p.ani) aniEfekt(t);
  if (p.flas && t - s.bas < .12) { X.fillStyle = `rgba(255,246,230,${.7 * (1 - (t - s.bas) / .12)})`; X.fillRect(0, 0, W, H); }
  if (p.kirmizi) { const a = p.kirmizi * (.5 + .5 * Math.cos(2 * Math.PI * (1 - (SAYAC(t) % 1)))); renkKat(X, '#ff1a2a', a * .18, 'screen'); }
  if (p.sus !== undefined && t >= p.sus) renkKat(X, '#000000', .25 * clamp((t - p.sus) / .3), 'source-over');
  if (p.hud !== 0 && s.sahne !== 'secim' && s.sahne !== 'siyah' && t >= HUD_BAS) hudCiz(t);
  if (p.son_karartma) { const a = 1 - clamp((TOPLAM - t) / p.son_karartma); if (a > 0) { X.fillStyle = `rgba(0,0,0,${a})`; X.fillRect(0, 0, W, H); } }
  X.font = '600 40px "Segoe UI"'; X.textAlign = 'center'; X.textBaseline = 'alphabetic'; X.fillStyle = 'rgba(255,255,255,.62)'; X.letterSpacing = '0px';
  X.shadowColor = 'rgba(0,0,0,.6)'; X.shadowBlur = 6; X.fillText('@sonsiginak', 540, 1505); X.shadowBlur = 0;
}
