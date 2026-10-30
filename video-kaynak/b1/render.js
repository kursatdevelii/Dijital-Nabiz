// animasyon.html'i başsız Chrome'da kare kare çizip ffmpeg'e verir.
// Kullanım: node render.js video            -> zaman.json'daki çıktıya mp4
//           node render.js onizleme "[t1,..]" -> onizleme/NN_t.jpg
//           ... --pov                         -> 1. şahıs alternatifi (animasyon-pov.html, çıktı: -pov.mp4)
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const puppeteer = require('puppeteer-core');

const B1 = __dirname;
const zaman = JSON.parse(fs.readFileSync(path.join(B1, 'zaman.json'), 'utf8'));
const mod = process.argv[2] || 'video';
const FPS = 30;
const POV = process.argv.includes('--pov');
const SAYFA = POV ? 'animasyon-pov.html' : 'animasyon.html';
if (POV) zaman.cikti = zaman.cikti.replace(/\.mp4$/, '-pov.mp4');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--allow-file-access-from-files', '--hide-scrollbars', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  page.on('console', m => console.log('[sayfa]', m.text()));
  page.on('pageerror', e => console.log('[HATA]', e.message));
  await page.goto('file:///' + path.join(B1, SAYFA).replace(/\\/g, '/'));
  await page.evaluate(z => kur(z), zaman);
  await page.waitForFunction('window.hazir === true', { timeout: 60000 });
  const kare = t => page.evaluate(t => { ciz(t); return document.getElementById('c').toDataURL('image/jpeg', 0.94).slice(23); }, t);

  if (mod === 'onizleme') {
    const zamanlar = JSON.parse(process.argv[3]);
    const klasor = path.join(B1, 'onizleme');
    fs.mkdirSync(klasor, { recursive: true });
    for (const [i, t] of zamanlar.entries())
      fs.writeFileSync(path.join(klasor, `${String(i).padStart(2, '0')}.jpg`), Buffer.from(await kare(t), 'base64'));
  } else {
    const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y',
      '-f', 'image2pipe', '-c:v', 'mjpeg', '-framerate', String(FPS), '-i', '-', '-i', zaman.ses,
      '-filter_complex', '[1:a]loudnorm=I=-14:TP=-1.5:LRA=11[a]', '-map', '0:v', '-map', '[a]',
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-maxrate', '12M', '-bufsize', '24M', '-pix_fmt', 'yuv420p',
      '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', '-movflags', '+faststart', zaman.cikti],
      { stdio: ['pipe', 'inherit', 'inherit'] });
    const N = Math.ceil(zaman.toplam * FPS);
    const bas = Date.now();
    for (let i = 0; i < N; i++) {
      const b = Buffer.from(await kare(i / FPS), 'base64');
      if (!ff.stdin.write(b)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % 300 === 0) console.log(`kare ${i}/${N}  (${((Date.now() - bas) / 1000).toFixed(0)} sn)`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
    console.log('Video hazır:', zaman.cikti);
  }
  await browser.close();
})();
