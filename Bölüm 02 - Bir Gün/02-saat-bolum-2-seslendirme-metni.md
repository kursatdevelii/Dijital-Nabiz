# Dijital Nabız — Bölüm 2: Bir Gün
**Seslendirme Metni (ElevenLabs) · Animasyon Sineması**

> **ElevenLabs ayarları:** Model **Eleven v3** ya da **v4** · Stability **Natural** · Ruh hali: buz gibi gerilim → suçluluk → tuzağı fark etme → daralan çemberde donma.
>
> Kaydı bu klasöre **`seslendirme.mp3`** adıyla koy. Konuşmacı etiketlerini ve parantez içindeki ton notlarını ElevenLabs'e yapıştırma. Seçim ekranındaki yazılar seslendirilmez. Yapıştırmaya hazır, ses etiketli sürüm en altta.

---

**ANLATICI** *(net, soğuk, tam sesle; fısıltı yok)*:
On dokuz saniyeniz kaldı. Ve ilk kez birinin zamanını çalıyorsunuz.

*(Kare donar. Geri sarma.)*

**ANLATICI** *(hızlı bir özet, sakin)*:
Kardeşiniz zamanınızı aldı, kimse size vermedi… ve siz uyuyandan almayı seçtiniz.

*(Damga. Başlık kartı.)*

**ANLATICI** *(derin bir nefes, sonra rahatlayarak)*:
Bileğini kavrıyorsunuz. Alarm susuyor. Zaman, damarlarınıza sıcak bir su gibi doluyor.

**ANLATICI** *(yavaş, suçlu)*:
Bir gün alıyorsunuz, fazlasını değil. Onun bileğinde parmak izleriniz morarıyor… tıpkı sizinki gibi.

**ANLATICI** *(merakla başlar, tedirgin biter)*:
Sonra kendi bileğinizde, rakamların yanında… küçük, altın bir ışık yanıyor. Aldığınız zaman… işaretli.

**ANLATICI** *(gergin)*:
Ve uyuyan adam… gözlerini açıyor.

**ADAM** *(sakin, ayık, keyifli; hiç acele etmeden)*:
"Bir gün mü? Mütevazısın. Bu sabahki… daha açgözlüydü."

**ANLATICI** *(alçak, kırık)*:
Bankın altında… kırmızı bir kapüşonlu.

*(1,5 sn sessizlik.)*

**ANLATICI** *(alçak)*:
Kardeşinizin. Altıda neden dönmediğini… şimdi anlıyorsunuz.

**ANLATICI** *(gergin, alçak)*:
Sokağın başında iki beyaz yağmurluk. Koşmuyorlar; gerek yok. Bileğinizdeki işaret… onları size getiriyor.

**ANLATICI** *(ağır, iki tarafı tartarak)*:
Kaçarsanız özgür kalırsınız, ama işaret sönene kadar peşinizi bırakmazlar. Teslim olursanız, belki kardeşinizin götürüldüğü yere gidersiniz… ama oradan dönen olmadı.

*(Sesler çekiliyor; sadece işaret sinyali, tik ve kalp.)*

**ADAM** *(fısıltıyla)*:
"Kardeşin hâlâ yaşıyor… şimdilik."

**ANLATICI** *(fısıltı)*:
On adım.

*(Seçim ekranı açılır, sayaç başlar.)*

**ANLATICI** *(doğrudan izleyiciye)*:
Kaçar mısınız, yoksa teslim mi olursunuz? Neden? Fikrinizi yorumlara yazın. Üçüncü bölüm için takip etmeyi unutmayın.

*(Paneller donar. Kapanış kartı ~2 sn. Siyah. Tek bir altın "çın".)*

---

**Toplam:** 137 kelime → **Tahmini süre:** ~1:20 - 1:25 (donma, damga, kapüşon sessizliği, son vuruş ve kapanış kartıyla birlikte)

**Kullanılan sesler:**
- **Anlatıcı:** Bölüm 1'deki kanal anlatıcısı (derin, alçak, sinematik). Kanalın sesi aynı kalsın.
- **Adam (duraktaki "uyuyan"):** Bu bölümde ilk kez konuşuyor, yeni bir ses.
  - Genç, pürüzsüz ve kibar bir erkek sesi; sarhoşluk izi yok, her kelime yerli yerinde.
  - Keyifli ve tepeden bakan bir tonu var. Tefecinin tatlı tehdidinden farkı, sıcaklığın hiç olmaması: soğuk bir nezaket.
  - Temiz kaydet; yağmur kurguda eklenir.
- **Tefeci:** Bu bölümde konuşmuyor.

---

## ElevenLabs'e yapıştırılacak sürüm (ses etiketli)

- **Etiketler okunmaz.** Kelime sayısı aynı kalıyor: 137.
- **Üç üretim, beş parça:**
  - Anlatıcı ve adam farklı sesler olduğu için metin üç üretime bölündü.
  - Adamın ikinci repliği çok kısa (≈35 karakter). Böyle kısa satırlar tek başına tutarsız çıkabildiği için adamın iki repliği tek üretimde, aralarında `[long pause]` ile yazıldı.
  - Kurguda sıralama şöyle: **Anlatıcı A → Adam replik 1 → Anlatıcı B ("…dönen olmadı."ya kadar) → Adam replik 2 → Anlatıcı B ("On adım." ve CTA).**
  - Text to Dialogue ile tek seferde üretmek istersen her bloğun başına konuşmacı adını yaz ve seslerini ata.
- **Ses efekti etiketi kullanılmadı.** Alarm, tik, işaret sinyali ve sessizlikler kurguda `ses_tasarim.py` ile ekleniyor.
- **Fısıltı motifi:** Anlatıcıda `[whispers]` sadece kalan zamanı ve yaklaşan tehlikeyi söyleyen iki yerde var: "Aldığınız zaman… işaretli" ve "On adım". Adamın son repliği de fısıltı.
- **Kanca yeniden kaydedildi** (İlk 5 saniye kuralı, 30 Eki 2026): Eski fısıltılı kanca "On dokuz saniye. Ve hayatınızda ilk kez… birinin zamanını çalıyorsunuz." idi. Yeni kayıt `dijitalnabız2ek.mp3`; `ses_tasarim.py` onu eski kancanın yerine koyar (bkz. `KANCA`).
- **Test edilecek etiketler:** `[serious]` ve `[nervous]` ElevenLabs'in örnek listesinde yok; liste tam değil, başka etiketler de çalışabilir. Biri sesli okunursa ya da etkisiz kalırsa sil ya da değiştir:
  - `[serious]` yerine `[thoughtful]`
  - `[nervous]` yerine `[sad]`

**Üretim 1 · ANLATICI A**
```
[serious] On dokuz saniyeniz kaldı. Ve ilk kez birinin zamanını çalıyorsunuz.

[long pause] [thoughtful] Kardeşiniz zamanınızı aldı, kimse size vermedi… [serious] ve siz uyuyandan almayı seçtiniz.

[long pause] [inhales deeply] Bileğini kavrıyorsunuz. Alarm susuyor. [exhales] Zaman, damarlarınıza sıcak bir su gibi doluyor.

[thoughtful] Bir gün alıyorsunuz, fazlasını değil. [sad] Onun bileğinde parmak izleriniz morarıyor… tıpkı sizinki gibi.

[long pause] [curious] Sonra kendi bileğinizde, rakamların yanında… küçük, altın bir ışık yanıyor. [whispers] Aldığınız zaman… işaretli.

[long pause] [nervous] Ve uyuyan adam… gözlerini açıyor.
```

**Üretim 2 · ADAM** (kurguda `[long pause]` noktasından ikiye bölünür)
```
[mischievously] Bir gün mü? [chuckles] Mütevazısın. [short pause] [sarcastic] Bu sabahki… daha açgözlüydü.

[long pause] [whispers] Kardeşin hâlâ yaşıyor… şimdilik.
```

**Üretim 3 · ANLATICI B** (kesme noktası "…dönen olmadı." ile "On adım." arası; adamın fısıltısı araya girer)
```
[sad] Bankın altında… kırmızı bir kapüşonlu. [long pause] Kardeşinizin. [exhales] Altıda neden dönmediğini… şimdi anlıyorsunuz.

[long pause] [nervous] Sokağın başında iki beyaz yağmurluk. Koşmuyorlar; gerek yok. [serious] Bileğinizdeki işaret… onları size getiriyor.

[thoughtful] Kaçarsanız özgür kalırsınız, ama işaret sönene kadar peşinizi bırakmazlar. [short pause] [serious] Teslim olursanız, belki kardeşinizin götürüldüğü yere gidersiniz… ama oradan dönen olmadı.

[long pause] [whispers] On adım.

[long pause] [curious] Kaçar mısınız, yoksa teslim mi olursunuz? [short pause] Neden? Fikrinizi yorumlara yazın. Üçüncü bölüm için takip etmeyi unutmayın.
```
