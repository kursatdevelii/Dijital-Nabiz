# Dijital Nabız — Bölüm 1: Üç Dakika
**Seslendirme Metni (ElevenLabs) · Animasyon Sineması**

> Kaydı bu klasöre **`seslendirme.mp3`** adıyla koy. Konuşmacı etiketlerini ve parantez içindeki ton notlarını ElevenLabs'e yapıştırma. Seçim ekranındaki yazılar seslendirilmez. Yapıştırmaya hazır, ses etiketli sürüm en altta.

---

**ANLATICI** *(alçak, ağır, uğursuz)*:
Dün gece üç gününüz vardı. Şimdi… üç dakikanız var.

**ANLATICI** *(sakin, soğuk, bir kural anlatır gibi)*:
Bu şehirde para yok, zaman var. Yirmi beşinde yaşlanmayı bırakırsınız; kolunuzda bir saat başlar. Sıfıra inerse… kalbiniz durur.

*(Tik bir kez atlıyor. 1 sn sessizlik.)*

**ANLATICI** *(yavaş, tedirgin)*:
Bileğinizde taze morluklar. Uyurken biri bileğinizi kavramış… ve zamanınızı çekmiş.

**ANLATICI** *(alçak)*:
Kardeşinizin yatağı boş. Masada bir not:

**ANLATICI** *(notu okur; kısık, yumuşak, kardeşin sesini taklit etmeden)*:
"Abi, borcum vardı. Sana beş saat bıraktım. Altıda dönüp hepsini geri vereceğim."

**ANLATICI** *(kısa duraksama, sonra sert ve kısa)*:
Saat dokuza geliyor. Dönmedi.

**ANLATICI** *(hızlı, nefes nefese)*:
İki dakika. Sokağa fırlıyorsunuz. Herkesin kolunda birkaç saat var… ve kimse durmuyor.

**ANLATICI** *(gergin)*:
Köşede tefecinin ışığı yanıyor. Kardeşinizin borçlu olduğu adam.

**TEFECİ** *(sakin, keyifli, hiç acele etmeden)*:
"Bir gün veririm. Yarın iki gün alırım. Kardeşin de böyle başlamıştı."

**ANLATICI** *(alçak, yavaşlayarak)*:
Ama karşı durakta biri uyuyor. Yukarı Şehir'den. Kolunda… altmış yıl.

**ANLATICI** *(ağır, iki tarafı tartarak)*:
Tefeci sizi borca bağlar. Uyuyandan alırsanız, size yapılanı ona yaparsınız. Üstelik Yukarı Şehir'in zamanı… izlenir.

*(Bilek alarmı. Sesler çekiliyor; sadece tik ve kalp.)*

**ANLATICI** *(fısıltıya yakın)*:
Otuz saniye.

*(Seçim ekranı açılır, sayaç başlar.)*

**ANLATICI** *(doğrudan izleyiciye, ağır)*:
Tefeciye mi gidersiniz, yoksa uyuyandan mı alırsınız? Bir mi, iki mi? Yorumlara yazın. İkinci bölüm için takip etmeyi unutmayın.

*(Sayaç sıfır. Paneller donar. Siyah. Tek bir "tik".)*

---

**Toplam:** 136 kelime → **Tahmini süre:** ~1:20 - 1:25 ("durur" sessizliği, son vuruş ve seçim ekranıyla birlikte)

**Kullanılan sesler:**
- **Anlatıcı:** Radyasyon ve Hayatta Kalma'daki kanal anlatıcısı (derin, alçak, sinematik). Kanalın sesi aynı kalsın. Not da kanal kuralı gereği anlatıcı tarafından okunur.
- **Tefeci:** Genç bir erkek sesi ama yaşlı birinin ağırlığıyla konuşan; alçak, keyifli, tatlı bir tehdit. Temiz kaydet; yağmur ve neon vızıltısı kurguda eklenir.

---

## ElevenLabs'e yapıştırılacak sürüm (ses etiketli)

- **Model:** Eleven v4 ya da v3. Köşeli parantezli etiketleri bu iki model yorumlar; Multilingual v2 etiketleri tanımaz ve sesli okuyabilir.
- **Etiketler okunmaz.** Kelime sayısı aynı kalıyor: 136.
- **Üç parça:** Anlatıcı ve tefeci farklı sesler olduğu için metin üç üretime bölündü. Parçaları sırayla birleştirip `seslendirme.mp3` yap. Text to Dialogue ile tek seferde üretmek istersen her parçanın başına konuşmacı adını yaz ve seslerini ata.
- **Ses efekti etiketi kullanılmadı** (`[explosion]` vb.). Tik, alarm ve sessizlikler kurguda ekleniyor; anlatım kaydı temiz kalmalı.
- **Fısıltı motifi:** `[whispers]` sadece kalan zamanı söyleyen üç yerde var: "üç dakikanız var", "altmış yıl", "Otuz saniye".
- **Test edilecek etiketler:** `[serious]`, `[nervous]` ve `[urgent]` ElevenLabs'in örnek listesinde yok; listenin tam olmadığı ve başka etiketlerin de çalışabileceği belirtiliyor. Biri sesli okunursa ya da etkisiz kalırsa sil ya da değiştir:
  - `[serious]` yerine `[thoughtful]`
  - `[nervous]` yerine `[sad]`
  - `[urgent]` yerine `[excited]`

**Parça 1 · ANLATICI**
```
[serious] Dün gece üç gününüz vardı. [whispers] Şimdi… üç dakikanız var.

[long pause] [serious] Bu şehirde para yok, zaman var. Yirmi beşinde yaşlanmayı bırakırsınız; kolunuzda bir saat başlar. [short pause] Sıfıra inerse… kalbiniz durur.

[long pause] [nervous] Bileğinizde taze morluklar. Uyurken biri bileğinizi kavramış… ve zamanınızı çekmiş.

[thoughtful] Kardeşinizin yatağı boş. Masada bir not:

[sad] Abi, borcum vardı. Sana beş saat bıraktım. Altıda dönüp hepsini geri vereceğim.

[long pause] [exhales sharply] Saat dokuza geliyor. [short pause] Dönmedi.

[urgent] İki dakika. Sokağa fırlıyorsunuz. Herkesin kolunda birkaç saat var… [annoyed] ve kimse durmuyor.

[serious] Köşede tefecinin ışığı yanıyor. [short pause] Kardeşinizin borçlu olduğu adam.
```

**Parça 2 · TEFECİ**
```
[mischievously] Bir gün veririm. Yarın iki gün alırım. [chuckles] Kardeşin de böyle başlamıştı.
```

**Parça 3 · ANLATICI**
```
[curious] Ama karşı durakta biri uyuyor. Yukarı Şehir'den. [whispers] Kolunda… altmış yıl.

[thoughtful] Tefeci sizi borca bağlar. [short pause] Uyuyandan alırsanız, size yapılanı ona yaparsınız. [serious] Üstelik Yukarı Şehir'in zamanı… izlenir.

[long pause] [whispers] Otuz saniye.

[long pause] [serious] Tefeciye mi gidersiniz, yoksa uyuyandan mı alırsınız? [short pause] Bir mi, iki mi? Yorumlara yazın. İkinci bölüm için takip etmeyi unutmayın.
```
