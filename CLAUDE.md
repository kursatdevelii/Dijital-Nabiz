# Son Sığınak — Dijital Nabız Çalışma Klasörü (Saat)

Bu klasör **Son Sığınak** kanalının (@sonsiginak) **Dijital Nabız** serisinin çalışma alanıdır.
- **Ad değişikliği:** Serinin eski çalışma adı Saat'ti, 30 Eki 2026'da Dijital Nabız oldu (kullanıcının isteği).
- **Ekranda, kapakta, başlık kartında ve açıklamalarda:** **Dijital Nabız** (büyük harfle `DİJİTAL NABIZ`) yazılır. Hashtag `#dijitalnabız`.
- **Değişmeyenler:** Klasör ve dosya adları (`Saat\`, `NN-saat-bolum-N-...`) ile koddaki `saat` adları aynı kalır. Seri, *Zamana Karşı* (In Time, 2011) filminin öncülünden esinlenir: zamanın para olduğu bir şehirde koldaki sayaç sıfıra inerse kalp durur. İzleyici seçimlidir: her bölüm tek bir seçimle biter, izleyici yorumlardan oy verir, sonraki bölüm çoğunluğun seçimiyle başlar. Radyasyon ve Hayatta Kalma'dan bağımsızdır.

Kanal kuralları Hayatta Kalma kılavuzundan aynen uygulanır: `..\Hayatta Kalma\sonsiginak.md`. Geçerli olan bölümler:
- Bölüm 1-4: "siz" hitabı ve şimdiki zaman, görsel tarz, filigran, 75-90 sn format, çıktı biçimi, ElevenLabs metni, klasör ve paket düzeni. **Dış kamera kuralı bu seriye uygulanmaz.** Seri 1. şahıs (POV) üretilir, bkz. aşağıdaki "Bakış Açısı: POV" bölümü.
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
  - Bölüm 1 POV kapakla yayınlandı (kullanıcının masaüstündeki `povkapak.jpg`). Sonraki kapaklar bu düzeni örnek alır.
  - Yüz yok. Kadrajın altından giren kollarınız ve bilekteki sayaç ön planda, arkada bölümün kilit sahnesi bulanık durur.
  - Üstte `SON SIĞINAK`, rozet `DİJİTAL NABIZ · BÖLÜM N`, başlık, alt satır ve filigran `@sonsiginak` kılavuzdaki gibidir.
  - Başlık, bilek ve sayaç ortadaki 4:5 alanda kalır.
  - Arka plan `kapakCiz(N)` ile POV olarak çizilir. Kaynak `video-kaynak\kapaklar\NN-saat-bolum-N-kapak.html` ve `-arkaplan.jpg`, çıktı bölüm klasöründe `NN-saat-bolum-N-kapak.png`.
  - Başlık ve açıklama paketindeki "Kapak" bölümü POV kapağı anlatır.
- **Kod (Bölüm 2 kurulurken):**
  - `pov.js` ana sahne dosyası olur. `animasyon.html` onu yükler.
  - `render.js` varsayılan olarak POV çizer. Çıktı `-pov` eki almaz: `NN-saat-bolum-N.mp4`.
  - `sahneler.js`'teki dış kamera planları yalnızca POV'un kullandığı çizimler (şehir, karakterler, paneller) için kalır.

## Açılış (Bölüm 2'den itibaren her videoda)
Kılavuzdaki Açılış Akışı aynen uygulanır (kullanıcının isteği, 30 Eki 2026):
1. **Kanca:** Önceki bölümün son anı "şimdi"de oynar.
2. **Donma ve geri sarma:** Kare donar, vizör yerine oturur, görüntü geri sarılır.
3. **Geri dönüş:** Önceki bölümden 5-6 hızlı kesme, REC ve kayıt saatleriyle.
4. **Oylama sonucu:** Kazanan panele ÇOĞUNLUK damgası basılır, panel tam ekrana açılır.
5. **Başlık kartı:** `DİJİTAL NABIZ` / `BÖLÜM N` / bölüm adı. Seri adı `KAYIP UÇUŞ`'tan uzun olduğu için Anton boyutu küçültülür (~110 px). Yazı sağdaki 150 px'lik güvenli alana taşmaz.
6. **Yeni hikâye.**

Her bölümde bölüm numarası, bölüm adları, vizör etiketi (`BÖLÜM N-1 · ÖNCEKİ BÖLÜM ADI`) ve kayıt saatleri güncellenir.
- **Sayaç paneli:** Geri dönüşte gizlenir, başlık kartıyla birlikte geri gelir. Panel (y ≤ 400) ile kart (y ≈ 590-880) çakışmaz.
- **Kod:** `video-kaynak/b1`'de vizör ve başlık kartı kodu yok. Bölüm 2 üretiminde Hayatta Kalma'nın `video-kaynak/b2` klasöründen taşınır:
  - `son.js` → `kayitEfekt`, `vizorCiz`, `sarEfekt`, `baslikCiz` ve `ciz` içindeki `don` / `sar` / `geri` işleyişi.
  - `ses_tasarim.py` → `GERI`, `saat()`, `BASLIK`, `baslik_vurus`.
  - `animasyon.html` → Anton `@font-face`. Yazı tipi `video-kaynak/fonts/Anton-Regular.ttf`.
- **Bölüm saatleri** (sonraki bölümün geri dönüşünde kayıt saati olarak kullanılır):
  - **Bölüm 1:** Kayıt saati = 08:59:55 − sayaç (sayaç paneliyle uyumlu). Uyanış 08:56:55 (`00:03:00`), sokak ve okuyucu 08:57:00, oda ve not 08:57:25 (duvar saati 08:57), kadın 08:57:55, tefeci 08:58:31, uyuyan adam 08:58:57, seçim 08:59:25 (`00:00:30`). Gece geri dönüşü: kardeşiniz ~04:00.

## Kapanış sorusu (her videoda)
CTA seçenekleri adıyla sorar ve gerekçe ister (kullanıcının isteği, 30 Eki 2026). Örnek: "Tefeciye mi gidersiniz, uyuyandan mı alırsınız? Neden? Fikrinizi yorumlara yazın. Üçüncü bölüm için takip etmeyi unutmayın."
- "Bir mi, iki mi?" denmez.
- Seçim ekranındaki etiketlerde numara yazmaz (`TEFECİYE GİDİN`). Sıfırda `HANGİSİ? NEDEN? YORUMLARA YAZIN` yazar.
- Sabitlenen yorum ve açıklamalar da seçenekleri adıyla sorar.
- Amaç, izleyicinin tek bir rakam yerine fikrini ve gerekçesini yazmasıdır (kılavuz → Şablon → SEÇİM, Seçim Ekranı).

## Klasör düzeni
| Yol | İçerik |
|---|---|
| `Bölüm NN - <Bölüm Adı>/` | `NN-saat-bolum-N-senaryo.md`, `-seslendirme-metni.md`, kullanıcının `seslendirme.mp3`'ü; sonra `.mp4`, `-kapak.png`, `-baslik-ve-aciklama.md` |
| `video-kaynak/bN/` | Bölüm başına üretim klasörü (b1 = Bölüm 1; yeni bölüm bir öncekinden kopyalanır; ortak `node_modules` ve `fonts/` `video-kaynak/` altında). Animasyon parçalı: `animasyon.html` → `cekirdek.js` (kamera, ışık; Hayatta Kalma'dan), `karakter.js` (SEN, kardeş, tefeci, uyuyan adam, kadın, yayalar, sayaç çizimi `sayacCiz`), `sehir.js` (yağmur, neon, Yukarı Şehir + sur + Büyük Saat, yan sokak, kavşak), `oda.js` (daire, pencere, duvar saati, fotoğraf, not), `sahneler.js` (planlar + seçim panelleri), `son.js` (sahne tablosu, `SAYAC(t)`, sayaç paneli, seçim ekranı, `kapakCiz(N)`). `ses_tasarim.py` kendi başına çalışır (stereo; bölüm klasöründeki `seslendirme.mp3`'ü ya da `saatbolum1.mp3`'ü okur; sayaç anahtar kareleri `SAYAC`, plan listesi `PLANLAR`). `render.js`, `kapak.js` |
| `video-kaynak/kapaklar/` | Kapak kaynak HTML'leri ve `-arkaplan.jpg` sahneleri |
| `video-kaynak/b1/pov.js` + `animasyon-pov.html` | **POV motoru**. Bölüm 1'de dış kamera sürümünün alternatifiydi, Bölüm 2'den itibaren ana üretimdir (bkz. Bakış Açısı: POV). Zaman çizelgesi ve ses dış kamera sürümüyle aynı (`zaman.json`). `pov.js` sahneleri karakterin gözünden yeniden çizer: SEN görünmez, kollar kadrajın altından girer; uyanışta göz kapakları; koşu sokağın sonundaki Büyük Saat'e doğru ileri perspektifle (`ileriSokak`). Bölüm 1 üretimi: `node render.js video --pov` → bölüm klasörüne `01-saat-bolum-1-pov.mp4` |

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
6. **Yukarı Şehir sayaçları kayıtlıdır:** rakamların yanında derinin altında küçük altın bir işaret vardır. Bu sayaçlardan yapılan her transfer izlenir; kimin izlediği henüz açılmadı.
7. **Coğrafya:** Alt Şehir liman dibinde; yağmurlu, neonlu, dar sokaklı. Yukarı Şehir tepede, yüksek bir surun ardında; altın ışıklı beyaz kuleler. Surun kapısının üstünde Büyük Saat yeşil yanar. Gerçek şehir ve marka adı kullanılmaz.

## Karakter Kartı (tüm görsellerde birebir aynı)
| Karakter | Tarif |
|---|---|
| **Ana karakter ("siz")** | **Bu seriye özel yeni bir yüz.** Radyasyon ve Hayatta Kalma'daki SEN kullanılmaz (kullanıcının isteği, 30 Eki 2026). Esmer (zeytin-bronz ten); geniş, köşeli çene, temiz tıraş. Yanları sıfıra yakın (undercut), tepesi uzun, mavi-siyah saç; alnına düşen bir tutam. Kalın kaşlar, sol kaşta eski bir yarık, ela gözler, sol kulakta gümüş halka. Üç yıldır 25 yaşında. **Kıyafet:** solmuş hardal sarısı iş ceketi, kolları dirseğe kadar sıvalı (sayaç hep görünür); siyah tişört, gri iş pantolonu, siyah bot. Çizim: `video-kaynak\b1\karakter.js` → `kafa({ tip: 'sen' })`, `senBust`, `senYan`, `senArka`, `kafaArka`, `kafaYan`; palet `TABAN`. **POV'da** yalnızca ön kollar ve eller (`pov.js` → `benimKol`, `kosanKollar`), sol bilekteki sayaç ve aşağı bakınca kıyafet görünür. Yüz sadece yansımalarda görünür. |
| **Kardeşiniz** | Bir ay önce 25 oldu. Sizden ince, kıvırcık siyah saçlı; kırmızı bol bir kapüşonlu giyer. Bölüm 1'de sadece fotoğrafta ve geri dönüşteki kapüşon kolunda görünür. |
| **Tefeci** | 25 yaşında görünür ama gözleri çok yaşlıdır. Geriye taranmış siyah saç, bordo uzun palto, her parmağında altın yüzük, bir altın diş. Bileğinde `84 YIL`. Dükkânında kırmızı neon `ZAMAN VERİLİR` yazar. Sakin ve keyiflidir, hiç acele etmez. |
| **Uyuyan adam** | Yukarı Şehir'den. Beyaz uzun palto, ipek atkı, yakasında altın kule rozeti. Durakta sızmış, yanında şampanya şişesi. Bileğinde `60 YIL`. |

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
| 1 · Üç Dakika | Kardeşiniz üç gününüzü aldı, dönmedi. 30 saniye kaldı. Köşede tefeci, karşı durakta Yukarı Şehir'den uyuyan bir adam. | 1 · Tefeciye gidin / 2 · Uyuyandan alın | **Oylamada** |

**Bölümden bölüme taşınan durum (Bölüm 1 sonu):**
- Saat ~08:59; sayaçta ~19 saniye var.
- Bileğinizde parmak morlukları.
- Kardeşiniz gece 04:00 civarında zamanınızı aldı, size 5 saat bıraktı ve "altıda dönerim" dedi. Dönmedi.
- Tefeci kardeşinizi tanıyor ("Kardeşin de böyle başlamıştı").
- Uyuyan adamın sayacı kayıtlı; ondan alınan zaman izlenir.

**Açık iplikler:**
- Kardeşiniz nerede? Kime, neden borçlandı ve altıda neden dönmedi?
- Tefeci ne biliyor?
- Yukarı Şehir'in zamanını kim izliyor, zaman çalana ne oluyor?
- Büyük Saat.
