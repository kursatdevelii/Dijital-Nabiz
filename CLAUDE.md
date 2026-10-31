# Animasyon Sineması — Dijital Nabız Çalışma Klasörü (Saat)

Bu klasör **Animasyon Sineması** kanalının (@animasyonsinemasiyt) **Dijital Nabız** serisinin çalışma alanıdır. Seri Son Sığınak kanalına ait değildir.
- **Ad değişikliği:** Serinin eski çalışma adı Saat'ti, 30 Eki 2026'da Dijital Nabız oldu (kullanıcının isteği).
- **Ekranda, kapakta, başlık kartında ve açıklamalarda:** **Dijital Nabız** (büyük harfle `DİJİTAL NABIZ`) yazılır. Hashtag `#dijitalnabız`.
- **Değişmeyenler:** Klasör ve dosya adları (`Saat\`, `NN-saat-bolum-N-...`) ile koddaki `saat` adları aynı kalır. Seri, *Zamana Karşı* (In Time, 2011) filminin öncülünden esinlenir: zamanın para olduğu bir şehirde koldaki sayaç sıfıra inerse kalp durur. İzleyici seçimlidir: her bölüm tek bir seçimle biter, izleyici yorumlardan oy verir, sonraki bölüm çoğunluğun seçimiyle başlar. Radyasyon ve Hayatta Kalma'dan bağımsızdır.

Kanal kuralları Hayatta Kalma kılavuzundan aynen uygulanır: `..\Hayatta Kalma\sonsiginak.md`. Bu dosya yoksa (örn. repo GitHub'dan indirildiyse) aynı klasördeki `kilavuz.md` okunur; o, kılavuzun kopyasıdır. Kılavuz değiştiğinde, GitHub'a göndermeden önce kopya yenilenir. Geçerli olan bölümler:
- Bölüm 1-4: "siz" hitabı ve şimdiki zaman, görsel tarz, filigranın konumu ve görünümü, 75-90 sn format, çıktı biçimi, ElevenLabs metni, klasör ve paket düzeni. **Dış kamera kuralı bu seriye uygulanmaz.** Seri 1. şahıs (POV) üretilir, bkz. aşağıdaki "Bakış Açısı: POV" bölümü.
- **Kanal: Animasyon Sineması (kullanıcının isteği, 30 Eki 2026; her video, her kapak ve her paket, istenmeden).** Kullanıcı bunu tekrar tekrar söylemek istemiyor. `Son Sığınak`, `SON SIĞINAK`, `@sonsiginak` ve `#sonsiginak` bu seride hiçbir yerde yazılmaz.
  - **Filigran:** `@animasyonsinemasiyt` (videoda ve kapakta).
  - **Kapağın üstündeki kanal adı:** `ANİMASYON SİNEMASI`.
  - **Paketler:** Başlıklarda "Animasyon Sineması (@animasyonsinemasiyt)" yazılır. Abone ve takip satırlarında `@animasyonsinemasiyt`, hashtag olarak `#animasyonsinemasi`, YouTube etiketlerinde `animasyon sineması` kullanılır.
  - **Konum ve görünüm** kılavuzdaki gibidir: orta-alt (videoda y ≈ 1505, kapakta alttan ~330 px), beyaz, %60-70 opaklık.
  - **Kod:**
    - Videoda filigran `video-kaynak\b2\bolum2.js` → `ciz` içinde yazılır; yedeği `son.js` → `ciz` içindedir.
    - Kapakta kanal adı ve filigran `video-kaynak\kapaklar\NN-saat-bolum-N-kapak.html` → `.marka` ve `.filigran` içindedir.
    - Yeni bölüm `b2`'den ve `02-saat-bolum-2-kapak.html`'den kopyalandığı için bu yazılar doğru gelir. Üretimden sonra bir kareyle kontrol edilir.
  - **Durum (30 Eki 2026):**
    - Bölüm 1 ve 2'nin videoları, kapakları ve paketleri yeni kanalla yeniden üretildi.
    - Bölüm 1'in yayınlanan POV kapağı (`povkapak.jpg`) kodla çizilmediği için eski yazılar resimden silindi: `kapaklar\01-saat-bolum-1-pov-arkaplan.png`. Yeni yazılar `01-saat-bolum-1-pov-kapak.html` ile basılır, çıktı `01-saat-bolum-1-kapak-pov.png`.
- Bölüm 5'ten yalnızca: Seçim Ekranı, **Açılış Akışı**, Geri Dönüş Vizörü, **Başlık Kartı**, Seçim Kuralları, Oylama Süreci, Her Bölümün İskeleti.

Oradaki uçak, ada ve envanter formatı bu seriye **uygulanmaz**. Dosya adları `NN-saat-bolum-N-...` biçimindedir.

## Bakış Açısı: POV (Bölüm 2'den itibaren tüm üretim)
Dijital Nabız artık yalnızca 1. şahıs (POV) üretilir (kullanıcının isteği, 30 Eki 2026). Kamera sizin gözünüzdür. Bölüm 1'in hem dış kamera hem POV sürümü var; Bölüm 2'den itibaren tek sürüm POV'dur.
- **Görünmeyenler:** Yüzünüz ve bedeniniz görünmez. Omuzlar kadrajın dışında kalır.
- **Görünenler:**
  - Kadrajın altından giren kendi kollarınız ve elleriniz: zeytin-bronz ten, dirseğe kadar sıvalı hardal ceket kolu.
  - Aşağı bakınca siyah tişört, gri pantolon ve siyah botlar.
  - Yüzünüz yalnızca kısa yansımalarda görünebilir (ayna, vitrin camı, su birikintisi). Bu yüzden Karakter Kartı geçerli kalır.
- **Anlatım:** Değişmez. "Siz" hitabı, şimdiki zaman. Ana karakter seslendirilmez.
- **Sol bilekteki sayaç POV'un ana öğesidir:**
  - Gerilim, bileği kaldırıp bakmakla kurulur. Her bölümde birkaç yakın bilek planı olur.
  - Sayacın görünüm ve renk kuralları aynen geçerlidir.
  - Kanca ilk karede bileği ve tehlikeyi birlikte gösterir.
- **Baş hareketi:**
  - Hiçbir plan sabit kalmaz: nefes salınımı (`kafaHareketi`), bakışın yön değiştirmesi, kesmelerde baş çevirme.
  - Uyanma, bayılma ve göz kırpma göz kapaklarıyla gösterilir (`gozKapagi`).
- **Koşu:**
  - Kamera ileri perspektifle akar (`ileriSokak`, `yagmurIleri`, `ileriIz`).
  - Kollar kadrajın altından, adımlarla ters yönde sallanır (`kosanKollar`).
  - Her basışta kamera sarsılır.
  - `KOSU`'daki sekiz poz yalnızca başka koşan karakterler içindir.
- **Planlar:**
  - Geniş: etrafa bakış.
  - Yakın: birinin yüzü size eğilir, size bakarak konuşur. Göz teması POV'un gücüdür.
  - Detay: bilek, el, not, okuyucu.
  - Aşağı bakış: eller ve ayaklar.
- **Temas:** Zaman alışverişi elinizin uzanıp bir bileği kavramasıyla gösterilir. Kavrayan el yönü belirler (Dünya Kuralı 4).
- **Geri dönüş:** Kesmeler önceki bölümün POV planlarından alınır. Vizör, kamera kaydı olarak POV'la uyumludur.
- **Seçim panelleri:** İki yolun ilk saniyesi de sizin gözünüzden oynar (örn. tefecinin kapısına uzanan eliniz / uyuyan adamın bileğine uzanan eliniz).
- **Kapak — yalnızca POV kapak üretilir** (kullanıcının isteği, 30 Eki 2026). Dış kamera, yani karakterin yüzünün göründüğü kapak artık üretilmez.
  - Bölüm 1 POV kapakla yayınlandı (kullanıcının masaüstündeki `povkapak.jpg`). Yeni kanal yazılı hâli `Bölüm 01 - Üç Dakika\01-saat-bolum-1-kapak-pov.png`. Sonraki kapaklar bu düzeni örnek alır. Bölüm 2 kapağı: `02-saat-bolum-2-kapak.png` (`bolum2.js` → `kapakCiz(2)`).
  - Yüz yok. Kadrajın altından giren kollarınız ve bilekteki sayaç ön planda, arkada bölümün kilit sahnesi bulanık durur.
  - Üstte `ANİMASYON SİNEMASI` yazar. Rozet `DİJİTAL NABIZ · BÖLÜM N`, başlık ve alt satır kılavuzdaki gibidir. Filigran `@animasyonsinemasiyt`.
  - Başlık, bilek ve sayaç ortadaki 4:5 alanda kalır.
  - Arka plan `kapakCiz(N)` ile POV olarak çizilir. Kaynak `video-kaynak\kapaklar\NN-saat-bolum-N-kapak.html` ve `-arkaplan.jpg`, çıktı bölüm klasöründe `NN-saat-bolum-N-kapak.png`.
  - Başlık ve açıklama paketindeki "Kapak" bölümü POV kapağı anlatır.
- **Kod (Bölüm 2'de kuruldu):**
  - `animasyon.html` `pov.js`'i ve bölümün kendi dosyasını (`bolum2.js`) yükler.
  - `render.js` varsayılan olarak POV çizer. Çıktı `-pov` eki almaz: `NN-saat-bolum-N.mp4`.
  - `sahneler.js`'teki dış kamera planları yalnızca POV'un kullandığı çizimler (şehir, karakterler, paneller) ve geri dönüş için kalır.

## Açılış (Bölüm 2'den itibaren her videoda)
Kılavuzdaki Açılış Akışı aynen uygulanır (kullanıcının isteği, 30 Eki 2026):
1. **Kanca:** Önceki bölümün son anı "şimdi"de oynar.
2. **Donma ve geri sarma:** Kare donar, vizör yerine oturur, görüntü geri sarılır.
3. **Geri dönüş:** Önceki bölümden 5-6 hızlı kesme, REC ve kayıt saatleriyle.
4. **Oylama sonucu:** Kazanan panele ÇOĞUNLUK damgası basılır, panel tam ekrana açılır.
5. **Başlık kartı:** `DİJİTAL NABIZ` / `BÖLÜM N` / bölüm adı. Seri adı `KAYIP UÇUŞ`'tan uzun olduğu için Anton boyutu küçültülür (~110 px). Yazı sağdaki 150 px'lik güvenli alana taşmaz.
6. **Yeni hikâye.**

Her bölümde bölüm numarası, bölüm adları, vizör etiketi (`BÖLÜM N-1 · ÖNCEKİ BÖLÜM ADI`) ve kayıt saatleri güncellenir.
- **İlk 5 saniye (kullanıcının isteği, 30 Eki 2026; bütün seriler):** Bölüm 2'de izlenme oranı %35'te kaldı, izleyicilerin %65'i ilk saniyelerde kaydırıp geçti.
  - **Bölüm 2'deki zayıflıklar:**
    - Kanca fısıltıyla açıldı; ilk cümle sonrakilerden ~6 dB kısıktı.
    - İlk kare loş bir POV'du.
    - ~5. saniyede kare donup kayıt efektli eski görüntüye geçti; yeni hikâye ~12. saniyede başladı.
  - **Kurallar:**
    - **İlk ses ve ilk kelime:** 0. saniyede tok bir vuruş gelir. İlk kelime ~0,3 sn içinde, net ve güçlü bir tonla okunur. Kanca cümlesi en fazla ~2 sn sürer.
    - **Fısıltı:** İlk 5 saniyede kullanılmaz; ElevenLabs'te kancaya `[whispers]` konmaz.
    - **İlk kare:** Hareket halindedir ve odakta parlak bir öğe bulunur (sayaç, bilek, ışık).
    - **Bağımsız kanca:** Kanca önceki bölümü bilmeyen biri için de anlaşılır olur.
  - **Bölüm 2'nin kancası yeniden kaydedildi** (30 Eki 2026): Yeni kayıt `dijitalnabız2ek.mp3`, video 88,5 sn'den 87,6 sn'ye indi. Kod: `b2\ses_tasarim.py` → `KANCA` bölümü.
    - `EK_YER`: Yeni kayıt, "çalıyorsunuz" kelimesi temasa denk gelecek şekilde yerleştirilir.
    - `KIRP`: Kurgu bu kadar geç başlar; ilk kelime ~0,14. saniyede gelir.
    - `seviyele()`: Kısık kelimeleri yükseltir.
    - **Vuruş:** 0. saniyedeki vuruş, ducking'den sonra eklenir.
  - **Kullanıcıya sorulacaklar:** Şu üç değişiklik yukarıdaki akışı ve altyazı kuralını değiştirir, bu yüzden uygulanmadan önce kullanıcıya sorulur:
    - Kancada bölümün en çarpıcı anından ileri sıçrama (flash-forward).
    - Geri dönüşün ve oylama damgasının ~3-4 sn'ye inmesi.
    - İlk 2 saniyede 2-4 kelimelik büyük kanca yazısı.
- **Bölüm 1'e de başlık kartı eklendi** (kullanıcının isteği, 31 Eki 2026): `DİJİTAL NABIZ` / `BÖLÜM 1` / `ÜÇ DAKİKA`, 5,05-7,05 sn, kanca bitip kamera pencereden şehre çıkarken (sayaç paneliyle aynı anda girer). Kod: `b1\son.js` (`baslikCiz`, B2'dekinin kopyası), `b1\ses_tasarim.py` (`BASLIK`, `baslik_vurus`), `animasyon.html` / `animasyon-pov.html` (Anton). Yani her bölümde kanca bittikten sonra bir başlık kartı bulunur.
- **Sayaç paneli:** Geri dönüşte gizlenir, başlık kartıyla birlikte geri gelir. Panel (y ≤ 400) ile kart (y ≈ 590-880) çakışmaz.
- **Kod:** Vizör, geri sarma, başlık kartı ve oylama damgası Bölüm 2'de Hayatta Kalma'dan taşındı: `video-kaynak/b2/bolum2.js` (`kayitEfekt`, `vizorCiz`, `sarEfekt`, `baslikCiz`, `damgaCiz`, `ciz` içindeki `don` / `sar` / `geri`), `ses_tasarim.py` (`VIZOR`, `saat()`, `BASLIK`, `baslik_vurus`), `animasyon.html` (Anton `@font-face`). Başlık kartında seri adı 110 px Anton'la yazılır ve ortadaki 760 px'e sığacak şekilde küçülür.
- **Bölüm saatleri** (sonraki bölümün geri dönüşünde kayıt saati olarak kullanılır):
  - **Bölüm 1:** Kayıt saati = 08:59:55 − sayaç (sayaç paneliyle uyumlu). Uyanış 08:56:55 (`00:03:00`), sokak ve okuyucu 08:57:00, oda ve not 08:57:25 (duvar saati 08:57), kadın 08:57:55, tefeci 08:58:31, uyuyan adam 08:58:57, seçim 08:59:25 (`00:00:30`). Gece geri dönüşü: kardeşiniz ~04:00.
  - **Bölüm 2:** Aktarımdan önce kayıt saati = 08:59:55 − sayaç, sonra 08:59:55 + (24:00:00 − sayaç). Kanca 08:59:36 (`00:00:19`), temas ve aktarım 08:59:41, adamın bileğindeki morluk 08:59:48, ambere dönüş 08:59:56, altın işaret 08:59:58, adam gözlerini açıyor 09:00:05, kapüşonlu 09:00:12, camdaki yansıma ve beyaz yağmurluklular 09:00:19, tefecinin kapısı 09:00:37, seçim 09:00:40 (`23:59:15`), donma 09:00:46 (`23:59:09`).

## Kapanış sorusu (her videoda)
CTA seçenekleri adıyla sorar ve gerekçe ister (kullanıcının isteği, 30 Eki 2026). Örnek: "Tefeciye mi gidersiniz, uyuyandan mı alırsınız? Neden? Fikrinizi yorumlara yazın. Üçüncü bölüm için takip etmeyi unutmayın."
- "Bir mi, iki mi?" denmez.
  - İstisna: Bölüm 1'in videosunda eski CTA ("Bir mi, iki mi?") ve numaralı etiketler (`1 · TEFECİYE GİDİN`) kalıyor. Kullanıcı 31 Eki 2026'da "1. bölüm öyle kalsın" dedi, bu yüzden düzeltilmez. Sonraki bölümler Bölüm 2'deki yapıyla devam eder.
- Seçim ekranındaki etiketlerde numara yazmaz (`TEFECİYE GİDİN`).
- **Kapanış kartı:** Paneller donunca ekranda yalnızca seçenek yazıları (`HANGİSİ? NEDEN?` başlığıyla) kalır, altına zilli `TAKİP ET` butonu gelir. Kart "…takip etmeyi unutmayın" cümlesinde açılır ve anlatımdan sonra ~2 sn kalır (kılavuz → Seçim Ekranı → Kapanış kartı). POV'da da aynıdır: kart düz yazıdır, kollar ve sayaç paneli görünmez.
- Sabitlenen yorum ve açıklamalar da seçenekleri adıyla sorar.
- Amaç, izleyicinin tek bir rakam yerine fikrini ve gerekçesini yazmasıdır (kılavuz → Şablon → SEÇİM, Seçim Ekranı).

## Başlık ve açıklama paketi (her videoda)
`NN-saat-bolum-N-baslik-ve-aciklama.md`, kılavuzun 4.1 maddesine göre yazılır (kullanıcının isteği, 30 Eki 2026). YouTube açıklaması uzundur ve sırası şöyledir: kanca, 3-4 paragraf hikâye, adıyla oylama, 🔔/▶️ satırları, ⚠️ kurgu uyarısı, `Bu videoda:`, hashtag'ler ve 👍💬🔔📌 kapanış bloğu. Etiketler virgülle ayrılır ve YouTube sayacında ~480/500'e kadar doldurulur. Bu seriye özel değerler:
- **Seri/bölüm satırı:** "Dijital Nabız · Bölüm N: Ad" (örn. "Dijital Nabız · Bölüm 1: Üç Dakika").
- **Kurgu uyarısı:** "⚠️ 'Dijital Nabız' gerçek bir olay değildir; kurgusal bir bilim kurgu gerilim serisidir. Zamana Karşı (In Time, 2011) filminin fikrinden esinlenildi; hikâye ve karakterler özgündür." (bkz. Telif sınırı)
- **Hashtag satırı:** `#Shorts #DijitalNabız` ile başlar, `#animasyonsinemasi` ile biter. Arada bölüme göre seçilen hashtag'ler yer alır (örn. `#Distopya #BilimKurgu #GerilimHikaye #Animasyon`).
- **`Bu videoda:`** bölümün kavramları (sayaç, tefeci, Alt Şehir…) ve tür kelimeleri: distopya · bilim kurgu · POV · interaktif hikaye · seçim sizin.

## Seslendirme metni: ElevenLabs ses etiketleri
Kılavuzdaki "ElevenLabs Ses Etiketleri" kuralı uygulanır: ruh haline göre İngilizce köşeli parantezli etiketler, dosya başında ayarlar satırı. Bu seriye özel karakter tonları:
- **Anlatıcı:** Kalan süre okunurken `[nervous]`✱ ya da `[breathless]`✱ kullanılır. Son saniyeler `[whispers]` ile okunur.
- **Tefeci:** Sakin ve keyifli; `[mischievously]`, `[chuckles]`, `[sarcastic]`.
- **Bilek alarmı ve sayaç bipleri:** Etiketle değil, `ses_tasarim.py`'de efektle verilir.

## Klasör düzeni
| Yol | İçerik |
|---|---|
| `Bölüm NN - <Bölüm Adı>/` | `NN-saat-bolum-N-senaryo.md`, `-seslendirme-metni.md`, kullanıcının `seslendirme.mp3`'ü; sonra `.mp4`, `-kapak.png`, `-baslik-ve-aciklama.md` |
| `video-kaynak/bN/` | Bölüm başına üretim klasörü (b1 = Bölüm 1; yeni bölüm bir öncekinden kopyalanır; ortak `node_modules` ve `fonts/` `video-kaynak/` altında). Animasyon parçalı: `animasyon.html` → `cekirdek.js` (kamera, ışık; Hayatta Kalma'dan), `karakter.js` (SEN, kardeş, tefeci, uyuyan adam, kadın, yayalar, sayaç çizimi `sayacCiz`), `sehir.js` (yağmur, neon, Yukarı Şehir + sur + Büyük Saat, yan sokak, kavşak), `oda.js` (daire, pencere, duvar saati, fotoğraf, not), `sahneler.js` (planlar + seçim panelleri), `son.js` (sahne tablosu, `SAYAC(t)`, sayaç paneli, seçim ekranı, `kapakCiz(N)`). `ses_tasarim.py` kendi başına çalışır (stereo; bölüm klasöründeki `seslendirme.mp3`'ü ya da `saatbolum1.mp3`'ü okur; sayaç anahtar kareleri `SAYAC`, plan listesi `PLANLAR`). `render.js`, `kapak.js` |
| `video-kaynak/kapaklar/` | Kapak kaynak HTML'leri ve `-arkaplan.jpg` sahneleri |
| `video-kaynak/b1/pov.js` + `animasyon-pov.html` | **POV motoru**. Bölüm 1'de dış kamera sürümünün alternatifiydi, Bölüm 2'den itibaren ana üretimdir (bkz. Bakış Açısı: POV). Zaman çizelgesi ve ses dış kamera sürümüyle aynı (`zaman.json`). `pov.js` sahneleri karakterin gözünden yeniden çizer: SEN görünmez, kollar kadrajın altından girer; uyanışta göz kapakları; koşu sokağın sonundaki Büyük Saat'e doğru ileri perspektifle (`ileriSokak`). Bölüm 1 üretimi: `node render.js video --pov` → bölüm klasörüne `01-saat-bolum-1-pov.mp4` |
| `video-kaynak/b2/` | **Bölüm 2 (POV, ana üretim).** b1'in dosyaları ortak çizimler ve geri dönüş kesmeleri için aynen yüklenir; `bolum2.js` en son yüklenir ve şunları ekler: taban + aktarım sayacı (`SAYAC0`, `AKTARIM`), B1 sahnelerini kendi sayacıyla oynatan geri dönüş (`sEski`, `eskiBaglam`), vizör, geri sarma, başlık kartı, oylama damgası, kapanış kartı (`kapanisKarti`), `İŞARETLİ` satırlı sayaç paneli (`hudCiz2`), yeni sahneler (`banket`, `adam`, `kapuson`, `yansima`, `yagmurluk`, `ikilem2`, `tefeciKapi`), seçim panelleri (`kac`, `teslim`) ve POV kapak `kapakCiz(2)`. `ses_tasarim.py` kaydı yeniden sıralar (adamın fısıltısı senaryodaki yerine taşınır), fısıltıları yükseltir, B1 planlarını `../b1/zaman.json`'dan okur; `python ses_tasarim.py` → `02-saat-bolum-2.mp4`. Kayıt bölüm klasöründe `dijitalnabız2.mp3` (ya da `seslendirme.mp3`). Yeni bölüm b2'den kopyalanır. |

## Telif sınırı
- Filmden yalnızca öncül alınır: zaman para birimidir, 25 yaşında yaşlanma durur, kolda bir sayaç vardır.
- Filmin karakterleri, yer ve örgüt adları, sahneleri, diyalogları kullanılmaz. Filmden görüntü, müzik ya da afiş de kullanılmaz.
- Başlıkta veya açıklamada filmin adı geçecekse "esinlenildi" diye geçer.

## Dünya Kuralları (bozulmaz)
1. Herkes 25. doğum gününde yaşlanmayı bırakır. Sol bileğin iç yüzünde, derinin altında bir sayaç yanar ve **1 günle** başlar.
2. Tek para birimi zamandır. Ücretler saatle ödenir; fiyatlar dakika, saat ve gün cinsindendir. Alt Şehir'de günlük ücret ~1 gündür, insanlar gün gün yaşar.
3. Sayaç sıfıra inerse kalp anında durur. Ekranda yüz ya da beden gösterilmez, sadece ışığı sönen bilek gösterilir.
4. Zaman **bilek bileğe temasla** akar; yönü kavrayan el belirler. Uyuyan ya da direnemeyen birinden zaman çekilebilir. Zorla çekilen bilekte parmak şeklinde morluklar ve bir süre sönmeyen ince bir ışık halkası kalır. Dükkânlarda ödeme bileği okuyucuya dayayarak yapılır.
5. **Renk:** 1 gün ve üstü yeşil, 1 günün altı amber, 10 dakikanın altı kırmızı. 1 dakikanın altında kırmızı yanıp söner ve bilek alarmı çalar.
   - **Görünüm** (kullanıcının isteği, 30 Eki 2026: "koldaki saat belirgin olsun"): Rakamlar derinin altında, koyu ve köşeleri yuvarlak bir ekran şeridinin içinde parlar. Şeridin kenarında renkli bir ışık vardır.
   - **Çizim sırası:** Sahnenin renkli ışığı rakamları boyamasın diye sayaç ışıklandırmadan sonra, en üste çizilir (`cekirdek.js` → `SAYAC_Q`).
   - **Konum ve boyut:** Şerit ön kola tam sığar. Kolun boyuna ve o noktadaki kalınlığına göre kendiliğinden küçülür, bileğe ya da ele taşmaz. Uzun sayaçlarda (`60 YIL · …`) rakamlar en fazla %22 yatay sıkışır (`kolCiz`).
- **Hareket:** Karakter sahnelerde yürümez, koşar (kullanıcının isteği, 30 Eki 2026). POV'da koşu ileri perspektif, kadrajın altında sallanan kollar ve adım sarsıntısıyla gösterilir (bkz. Bakış Açısı: POV). Aşağıdaki kurallar dış kamerada koşan karakterler için geçerlidir; koşu `karakter.js` → `KOSU` dizisindeki sekiz anahtar pozla çizilir.
  - **Pozlar:** temas, yüklenme, orta duruş, itiş, topuğun kalçaya kalkması, diz öne, diz yukarıda, uzanma.
  - **Havada kalma anı:** Her adımda iki ayak da yerden kesilir. Kalça yüksekliği alttaki ayağa göre hesaplanır.
  - **Kollar:** Dirsek bükük, bacakların tersine sallanır.
  - **Gövde:** Dik durur (~4°).
  - **Ayak kaymaz:** Sahnelerde yol ve adım `ADIM` sabitinden hesaplanır (`dongu = yol / (ADIM * ölçek)`). Koşu hızı ölçeğe göre ~1140-1260 px/sn, ~1,3 döngü/sn.
  - **Hız hissi:** Arka planda yatay iz (`hizIzi`), her basışta kamera sarsıntısı (`adimSarsinti`) ve su sıçraması (`ayakSicrama`).
6. **Yukarı Şehir sayaçları kayıtlıdır:** rakamların yanında derinin altında küçük altın bir işaret vardır. Bu sayaçlardan yapılan her transfer izlenir. İzleyenler Bölüm 2'de göründü (beyaz yağmurluklular), kim oldukları henüz açılmadı.
   - **İşaretli zaman** (Bölüm 2'de kuruldu): Kayıtlı bir sayaçtan çekilen zaman, altın işaretini de alan bileğe taşır. İşaret kalp atışı gibi yanıp söner ve izleyenleri o bileğe götürür. Zorla çekilen bilekteki ışık halkası gibi bir süre sonra söner; süresi henüz açılmadı. İşaretli bilekte sayaç panelinde `İŞARETLİ` durum satırı görünür.
7. **Coğrafya:** Alt Şehir liman dibinde; yağmurlu, neonlu, dar sokaklı. Yukarı Şehir tepede, yüksek bir surun ardında; altın ışıklı beyaz kuleler. Surun kapısının üstünde Büyük Saat yeşil yanar. Gerçek şehir ve marka adı kullanılmaz.

## Karakter Kartı (tüm görsellerde birebir aynı)
| Karakter | Tarif |
|---|---|
| **Ana karakter ("siz")** | **Bu seriye özel yeni bir yüz.** Radyasyon ve Hayatta Kalma'daki SEN kullanılmaz (kullanıcının isteği, 30 Eki 2026). Esmer (zeytin-bronz ten); geniş, köşeli çene, temiz tıraş. Yanları sıfıra yakın (undercut), tepesi uzun, mavi-siyah saç; alnına düşen bir tutam. Kalın kaşlar, sol kaşta eski bir yarık, ela gözler, sol kulakta gümüş halka. Üç yıldır 25 yaşında. **Kıyafet:** solmuş hardal sarısı iş ceketi, kolları dirseğe kadar sıvalı (sayaç hep görünür); siyah tişört, gri iş pantolonu, siyah bot. Çizim: `video-kaynak\b1\karakter.js` → `kafa({ tip: 'sen' })`, `senBust`, `senYan`, `senArka`, `kafaArka`, `kafaYan`; palet `TABAN`. **POV'da** yalnızca ön kollar ve eller (`pov.js` → `benimKol`, `kosanKollar`), sol bilekteki sayaç ve aşağı bakınca kıyafet görünür. Yüz sadece yansımalarda görünür. |
| **Kardeşiniz** | Bir ay önce 25 oldu. Sizden ince, kıvırcık siyah saçlı; kırmızı bol bir kapüşonlu giyer. Bölüm 1'de sadece fotoğrafta ve geri dönüşteki kapüşon kolunda görünür. Bölüm 2'de kırmızı kapüşonlusu duraktaki bankın altında, bir kolu dikiş yerinden yırtık hâlde bulunur. |
| **Tefeci** | 25 yaşında görünür ama gözleri çok yaşlıdır. Geriye taranmış siyah saç, bordo uzun palto, her parmağında altın yüzük, bir altın diş. Bileğinde `84 YIL`. Dükkânında kırmızı neon `ZAMAN VERİLİR` yazar. Sakin ve keyiflidir, hiç acele etmez. |
| **Uyuyan adam** | Yukarı Şehir'den. Beyaz uzun palto, ipek atkı, yakasında altın kule rozeti. Durakta sızmış, yanında şampanya şişesi. Bileğinde `60 YIL`. **Bölüm 2'de uyumadığı ortaya çıkar:** ayık, keskin bakışlı, soğuk bir nezaketle konuşur. Zaman hırsızları için yem olarak bekler, yakasındaki rozete dokunarak haber verir. Bir gün alındıktan sonra bileğinde `60 YIL · 111 GÜN`, parmak morlukları ve ışık halkası var. |
| **Beyaz yağmurluklular** | Bölüm 2'de görünür. İki kişi; dizlerine kadar beyaz yağmurluklar, yüzleri kapüşon gölgesinde, yakalarında altın kule rozeti, beyaz eldivenler. Bileklerindeki altın işaretler izledikleri bilekle aynı ritimde yanıp söner. Koşmazlar, eşit ve acelesiz yürürler. Adları ve kime bağlı oldukları henüz açılmadı; filmdeki örgüt adları kullanılmaz. |

## Renk düzeni
- **Alt Şehir:** petrol mavisi-gri yağmur ve camgöbeği-macenta neonlar.
- **Sayaç:** yeşil, amber ve alarm kırmızısı. Derinin altındaki damarlar sayacın rengiyle parlar.
- **Yukarı Şehir:** sıcak altın.
- **Seçim ekranı:** altın sarısı etiketler.
- Karanlık sahnelerde bile renkler canlı kalır.

## Sayaç Paneli (Bölüm 1'den itibaren)
Bu seride durum paneli ilk bölümden vardır, çünkü bütün gerilim kalan zamandan gelir.
- **Konum:** Sol üst, x ≈ 40-430, y ≈ 260-400. Yarı saydam koyu zemin, Consolas yazı.
- **Satırlar:**
  1. Saat ikonu ve hikâyenin saati (`08:57`).
  2. Bilek ikonu ve sayaç (`00:02:30`). Renk kuralı bilekle aynıdır.
- **Kurallar:**
  - Sayaç aynı hızda akar. Kesmelerde ileri atlayabilir ama hiçbir zaman geri gitmez ve anlatıdaki değerle çelişmez.
  - Geri dönüşte ve seçim ekranında gizlenir. Seçim ekranında süre bilekteki rakamlardan okunur.
  - Gerektiğinde Hayatta Kalma'daki gibi durum satırı eklenir (örn. `KARDEŞ KAYIP`).

## Seçim Kaydı
| Bölüm | Durum | Seçenekler | Çoğunluk |
|---|---|---|---|
| 1 · Üç Dakika | Kardeşiniz üç gününüzü aldı, dönmedi. 30 saniye kaldı. Köşede tefeci, karşı durakta Yukarı Şehir'den uyuyan bir adam. | 1 · Tefeciye gidin / 2 · Uyuyandan alın | **2 · Uyuyandan alın** (Bölüm 2 açılışında yüzdesiz damga) |
| 2 · Bir Gün | Uyuyan adamdan bir gün aldınız, zaman işaretli. Adam uyumuyordu (yem). Bankın altında kardeşinizin kapüşonlusu var. İki beyaz yağmurluk yaklaşıyor, tefeci kapısını aralıyor. | 1 · Kaçın / 2 · Teslim olun | **Oylamada** (Bölüm 3 açılışında) |

**Bölümden bölüme taşınan durum (Bölüm 1 sonu):**
- Saat ~08:59; sayaçta ~19 saniye var.
- Bileğinizde parmak morlukları.
- Kardeşiniz gece 04:00 civarında zamanınızı aldı, size 5 saat bıraktı ve "altıda dönerim" dedi. Dönmedi.
- Tefeci kardeşinizi tanıyor ("Kardeşin de böyle başlamıştı").
- Uyuyan adamın sayacı kayıtlı; ondan alınan zaman izlenir.

**Bölümden bölüme taşınan durum (Bölüm 2 sonu):**
- Saat 09:00:46; sayaçta `23:59:09` (amber). Sayacın yanında altın işaret yanıp sönüyor, panelde `İŞARETLİ` satırı var.
- Bileğinizde hâlâ dünkü parmak morlukları var. Adamın bileğinde de sizin morluklarınız ve ışık halkası duruyor.
- Sağ elinizde kardeşinizin kırmızı kapüşonlusu (bir kolu yırtık).
- Adam uyumuyordu, yem. "Bu sabahki… daha açgözlüydü" ve "Kardeşin hâlâ yaşıyor… şimdilik" dedi. Doğru söyleyip söylemediği belli değil.
- Kardeşin gecesi (ima edilen): 04.00'te sizden zaman aldı. Altıda geri verebilmek için duraktaki adamdan fazlasını çalmaya kalktı ve beyaz yağmurluklular tarafından götürüldü.
- İki beyaz yağmurluk on adım ötede; öndeki eldivenli elini uzatmış bekliyor.
- Tefeci kapısını aralayıp sizi içeri çağırdı.

**Açık iplikler:**
- Kardeşiniz nerede, hayatta mı? Tefeciye borcunu ödedi mi?
- Tefeci ne biliyor, sizi neden içeri çağırıyor?
- Beyaz yağmurluklular kim, kime bağlı? Götürdükleri insanlara ne oluyor?
- Duraktaki adam kim, yemliği kimin için yapıyor?
- İşaret ne kadar sürede söner, temizlenebilir mi?
- Büyük Saat.
