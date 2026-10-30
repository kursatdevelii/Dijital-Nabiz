// Bölüm kapağının arka plan sahnesini animasyon.html'deki kapakCiz(N) ile çizer.
// Kullanım: node kapak.js <bolum_no> <cikti.jpg>
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const [bolum, cikti] = [Number(process.argv[2] || 1), process.argv[3]];
(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true, args: ['--allow-file-access-from-files', '--force-color-profile=srgb'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });
  page.on('pageerror', e => console.log('[HATA]', e.message));
  await page.goto('file:///' + path.join(__dirname, 'animasyon.html').replace(/\\/g, '/'));
  await page.evaluate(() => document.fonts.ready);
  const b64 = await page.evaluate(n => { kapakCiz(n); return document.getElementById('c').toDataURL('image/jpeg', 0.95).slice(23); }, bolum);
  fs.writeFileSync(cikti, Buffer.from(b64, 'base64'));
  console.log('Kapak arka planı:', cikti);
  await browser.close();
})();
