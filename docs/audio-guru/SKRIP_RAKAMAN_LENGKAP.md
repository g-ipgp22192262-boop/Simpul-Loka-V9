# Audit audio dan skrip rakaman Cikgu Danea — SimpulLoka V9.1

Tarikh: 28 Oktober 2026 (Malaysia). Asas audit: branch `work`, commit `47ad83e93155c75b7af8dd30e3f8b3553c26703e`. **Draf untuk kelulusan skrip; kod aplikasi, katalog, video dan sari kata sedia ada tidak diubah.**

Dokumen berkaitan: [Senarai semak rakaman](SENARAI_SEMAK_RAKAMAN.md) · [Narasi akhir lapan babak video](NARASI_VIDEO_GURU_AKHIR.md).

## Cara menggunakan dokumen

- **WAJIB**: set teras yang dicadangkan untuk menggantikan arahan pembelajaran utama dengan suara guru sebenar. Ini keutamaan rakaman selepas skrip diluluskan, bukan syarat murid bermain atau arahan bahawa semua fail sudah boleh dipasang terus.
- **DIGALAKKAN**: rakam kemudian jika diperlukan. Panduan berulang, ucapan dan galakan dikongsi supaya jumlah rakaman terkawal.
- **TIDAK PERLU**: tiada fail diminta; disenaraikan dalam audit. Jangan rakam setiap klik, kiraan, jawapan murid, rekod PBD atau semua teks guru.
- Baca **teks dalam lajur Skrip** sahaja. Nama fail, durasi dan pencetus bukan narasi. Jika A/B/C berada dalam skrip pilihan, sebut huruf tersebut dengan jeda yang sama; jangan beri petunjuk jawapan melalui intonasi.
- Semua laluan dalam jadual relatif kepada akar repository. `public/` ialah lokasi simpan; URL pelayar bermula `assets/`, tanpa `public/`.
- Pencetus bertanda **Cadangan** belum wujud. Menyalin fail sahaja tidak mewujudkan butang atau sambungan audio baharu.
- Anggaran durasi pada 120–125 perkataan seminit, termasuk jeda pendek; ukur semula selepas rakaman. Untuk murid, gunakan nada lembut, sebutan jelas dan tanpa muzik latar.

## Keadaan audio sebenar

1. `public/assets/audio/` hanya mempunyai README; **0 fail MP3/WAV/OGG/M4A rakaman guru** ditemui. Tiada suara sebenar Cikgu Danea tersedia dalam kod semasa.
2. `teacher-audio-catalog.js` mengandungi **65 entri persediaan**. Bilangan ini bukan bilangan butang aktif atau fail tersedia. Beberapa entri lapuk atau tidak dicapai melalui aliran utama V9.1.
3. `speech(text)` dalam `app.js:23` memanggil `TeacherAudio.say`. `teacher-audio.js` membaca manifest hasil build, memilih entri mengikut awalan teks yang sepadan (ruang/huruf dinormalkan, **tanda baca tidak**), kemudian memainkan MP3 jika tersedia. Teks berbaki atau tidak sepadan menggunakan `speechSynthesis` berlabel bacaan pelayar. Ini suara sintesis pelayar, bukan rakaman guru; ketersediaan suara Melayu bergantung pada peranti.
4. Perpustakaan menggunakan pemain berasingan (`library.js`), **tanpa TTS**. Tujuh buku termasuk Kitab Ilmu menunggu rakaman; status “Audio cikgu akan ditambah”. Butang “Dengar suara cikgu” muncul hanya apabila manifest mengesahkan fail. Laluan guru/perpustakaan diutamakan; laluan lama `assets/audio/<id>.mp3` masih disokong.
5. Kesan cop pasport (`loka-one-reward.js`) dan pam gerabak (`loka-five.js`) ialah Web Audio mekanikal, bukan pertuturan. Tidak perlu dirakam semula oleh guru. Jangan kelirukan dengan suara AI.
6. Pentas Cerita Loka 1 dan 2 mempunyai perakam sendiri; Loka 3–6 menggunakan `LokaStory`. Audio murid ialah Blob sementara dalam pelayar, dimainkan semula selepas tindakan pengguna. Ia bukan aset MP3 guru dan tidak dihantar ke Sheets/pelayan.
7. Konsert ialah pautan luar Suno; **tiada fail lagu tempatan/pemain lagu dalaman**. Audio pada tab luar tidak boleh dihentikan secara automatik oleh aplikasi.
8. Video panduan sebenar ialah MP4 H.264 1920×1080, **280 saat, 0 trek audio** (disahkan semula dengan ffprobe). VTT/SRT dan lapan babak sedia ada disemak. Narasi akhir dicadangkan dalam dokumen berasingan; MP4 tidak diubah.

## Audit mengikut halaman dan Loka

| Bahagian | Aliran dan audio sebenar | Keputusan rakaman |
| --- | --- | --- |
| Gerbang | Tiket nama/kelas, avatar, Mula Pengembaraan. Tiada butang suara Gerbang. | Pengenalan DIGALAKKAN sahaja; jangan automain apabila halaman dibuka. |
| Peta Ilmu / Perpustakaan | Kitab Ilmu + enam buku; modal ilustrasi/maksud, Zum ilustrasi, buka/tutup. Rakaman sahaja; belum ada fail. | Tujuh rakaman WAJIB. Maksud ikut `IDIOMS` yang benar-benar digunakan buku. |
| Roda Ferris | Butang “Dengar arahan” memanggil `speech` dengan teks memilih gondola/langkau; belum ada entri katalog sepadan. | Arahan WAJIB, pemetaan baharu diperlukan. Tiada keperluan suara pada setiap putaran/gondola. |
| Loka 1 — Dalam Tangan | M1 Amir diumumkan menang; M2 Baling Bola/seret, botol, empat gambar kemudian susun; M3 Rakam Cerita/Selesai Rakaman, lisan dan cop. **Tiada butang arahan suara** dalam modul ini. | Tiga slot teras WAJIB untuk integrasi kemudian; susun dan kawalan rakaman DIGALAKKAN. Jangan menjanjikan audio aktif hanya dengan menyalin MP3. |
| Loka 2 — Ambil Hati | M1 sahabat kehilangan kucing; M2 pilih kad semangat/patung kucing/poster, alasan, kotak→hadiah→reben→ucapan→susun; M3 Rakam Cerita/Selesai Rakaman. Butang Dengar Arahan mengikut keadaan dan menambah maklum balas semasa. | Lapan klip WAJIB. Penjelasan sokongan DIGALAKKAN; hadiah bukan pengganti kucing. Teks dinamik belum diliputi rakaman statik sepenuhnya. |
| Loka 3 — Anak Emas | M1 Vanessa/Cikgu Aina; M2 Halakan/Panah atau tarik tali, empat kejayaan→susun; M3 Mula Bercerita/Selesai Bercerita. Dengar Arahan aktif. | Empat klip WAJIB. Penjelasan makna DIGALAKKAN; rajin membantu sahaja bukan takrif anak emas. Semua murid dihargai. |
| Loka 4 — Air Muka | **Studio Foto**, bukan Buaian/Pulau. M1 situasi Amir dan Sofia + tindakan sopan; M2 susun empat foto→cetak jalur→dua semakan bahasa; M3 Rakam Cerita/Henti Rakaman + Dengar Semula. | Tiga klip teras WAJIB perlu dipadankan semula. Dua soalan selepas cetak DIGALAKKAN. Katalog Buaian dan Pulau 1–2 lapuk; Pulau 3–4 kini soalan semakan tanpa label pulau. |
| Loka 5 — Mandi Peluh | M1 tiga item berasingan, situasi Danish dibaca bersama setiap item; M2 Mula Pengembaraan/Pam Tenaga/Bantuan Automatik; kutip daun, padan pasu, dua item bahasa, susun; M3 Mula Bercerita/Selesai Bercerita. | Sepuluh klip WAJIB. Bacakan pilihan secara neutral. Kiraan daun/pasu dan maklum balas berubah-ubah tidak perlu dirakam satu persatu. |
| Loka 6 — Cakap Besar | M1 Peta Ilmu · Cakap Besar (penerangan, bukan kuiz M1); M2 pam Kiri/Kanan/Tengah, empat stesen termasuk kapal mainan, kemudian susun; M3 Mula Bercerita/Selesai Bercerita. | Lapan klip WAJIB. Di stesen, arahan datang daripada `.l6-task.textContent` termasuk “STESEN”; katalog soalan sahaja belum sepadan. Jangan guna cerita lama Hakim takut ayunan sebagai cerita modul semasa. |
| Pentas Cerita semua Loka | Mikrofon diminta selepas klik mula, henti, Dengar Semula, Rakam Semula, Muat Turun pilihan dan laluan lisan. Avatar bergerak semasa rakaman/main semula. | Arahan isi cerita khusus setiap Loka + tiga panduan kawalan bersama DIGALAKKAN. Jangan main suara cikgu ketika murid merakam. |
| Imbas Loka | Imbas Kenangan dan Konsert terbuka; Refleksi Akhir selepas enam Loka. Tiga skrin soalan mempunyai Dengar Arahan; pengenalan refleksi tiada butang. Soalan 1 turut meminta perasaan dan bintang tetapi audio lama hanya menyebut simpulan bahasa. | Tiga klip soalan WAJIB; tambahan perasaan/bintang DIGALAKKAN dan perlu perluasan pemetaan. Refleksi bukan syarat sijil. |
| Pasport / sijil / Grand Finale | Cop, tiga Loka→gula kapas pertama, enam Loka→ganjaran emas dan satu sijil. Tiada butang narasi pasport/sijil. | Panduan pasport dan ucapan enam Loka DIGALAKKAN sahaja. Tidak perlu menyebut nama/kelas secara rakaman atau mengulang suara setiap lawatan. |
| Sudut Guru | Lima kad, bahan cetak, rubrik, rekod PBD/pengesahan, video dan senarai katalog audio. Tiada butang pertuturan bagi kandungan guru. | TIDAK PERLU rakaman setiap kad/jadual/rubrik. Video guru mencukupi; kekalkan kandungan bertulis boleh akses. |
| Video Panduan Guru | Rakaman UI sebenar lapan babak; simulator PBD dan mikrofon ujian berlabel. | Lapan trek narasi berasingan untuk suntingan kemudian; bukan audio aktiviti murid. |
| Rush / Studio lama / pemulihan / pengayaan | Fungsi lama masih dalam `app.js`, bukan enam Loka utama/nav V9.1. Beberapa butang `speech` lama masih wujud, serta contoh cerita warisan. | TIDAK PERLU rakaman tambahan dalam fasa ini; audit perbezaan dipelihara, jangan ambil skrip warisan sebagai aliran utama. |

## Maksud dan contoh: elakkan rakaman berulang

Enam rakaman buku menggunakan maksud `IDIOMS` sebenar. Dalam Loka 2 takrif lebih lengkap ialah “Melakukan sesuatu untuk menggembirakan atau menyenangkan hati seseorang”; Loka 3 menerangkan orang sangat disayangi/diberi layanan istimewa. Ini huraian konteks, bukan perubahan kandungan buku. Skrip misi merujuk aktiviti; guru tidak perlu merakam satu lagi set `makna-*.mp3` dan `contoh-*.mp3` untuk laluan warisan yang tidak digunakan buku.

Contoh ayat sesuai untuk perbualan guru, **bukan fail MP3 tambahan yang wajib**: “Hadiah itu sudah dalam tangan Amir.”; “Sahabat itu memberikan kad semangat untuk mengambil hati kawannya.”; “Vanessa dianggap anak emas Cikgu Aina kerana sering mendapat perhatian istimewa.”; “Sofia menjaga air muka Amir dengan membantunya secara sopan.”; “Danish mandi peluh selepas membersihkan taman sekolah.”; “Hakim suka cakap besar tentang kapal mainannya walaupun belum mengujinya.” Jangan membacakan empat cerita lengkap secara automatik sebelum murid bercerita.

## Jadual skrip tepat untuk rakaman

Semua rakaman dicadangkan **selepas klik pengguna**, bukan ketika memasuki halaman. Tajuk bahagian menyatakan kategori; status sambungan setiap fail dijelaskan selepas jadual.

### WAJIB — 47 fail

| Bil. | Halaman / Aktiviti | Nama Fail MP3 | Skrip Tepat untuk Dirakam | Anggaran Durasi | Pencetus Audio |
| --- | --- | --- | --- | --- | --- |
| 2 | Perpustakaan / Kitab Ilmu Utama | `public/assets/audio/guru/perpustakaan/kitab-ilmu.mp3` | Simpulan bahasa ialah gabungan perkataan yang membawa maksud kiasan. Maksudnya berbeza daripada maksud perkataan satu demi satu. Contohnya, dalam tangan bermaksud sudah pasti diperoleh atau dikuasai. | ±14 saat | Dengar suara cikgu, dalam Kitab Ilmu Utama |
| 3 | Perpustakaan / dalam-tangan | `public/assets/audio/guru/perpustakaan/dalam-tangan.mp3` | Dalam tangan. Sudah pasti diperoleh atau dikuasai. | ±5 saat | Dengar suara cikgu dalam buku terbuka |
| 4 | Perpustakaan / ambil-hati | `public/assets/audio/guru/perpustakaan/ambil-hati.mp3` | Ambil hati. Menyenangkan atau menggembirakan hati seseorang. | ±5 saat | Dengar suara cikgu dalam buku terbuka |
| 5 | Perpustakaan / anak-emas | `public/assets/audio/guru/perpustakaan/anak-emas.mp3` | Anak emas. Orang yang paling disayangi atau diberi keutamaan. | ±6 saat | Dengar suara cikgu dalam buku terbuka |
| 6 | Perpustakaan / air-muka | `public/assets/audio/guru/perpustakaan/air-muka.mp3` | Air muka. Maruah atau harga diri seseorang yang perlu dijaga. | ±6 saat | Dengar suara cikgu dalam buku terbuka |
| 7 | Perpustakaan / mandi-peluh | `public/assets/audio/guru/perpustakaan/mandi-peluh.mp3` | Mandi peluh. Berpeluh dengan banyak, lazimnya selepas melakukan kerja atau aktiviti yang menggunakan tenaga. | ±8 saat | Dengar suara cikgu dalam buku terbuka |
| 8 | Perpustakaan / cakap-besar | `public/assets/audio/guru/perpustakaan/cakap-besar.mp3` | Cakap besar. Suka bermegah-megah atau membanggakan diri, khususnya tentang kebolehan atau kelebihan sendiri. | ±8 saat | Dengar suara cikgu dalam buku terbuka |
| 9 | Roda Ferris | `public/assets/audio/guru/ferris-arahan.mp3` | Pilih satu daripada enam gondola. Teman haiwan akan menaiki gondola dan membawa kamu ke permainan Loka. Kamu boleh langkau animasi bila-bila masa. | ±12 saat | Dengar arahan |
| 10 | Loka 1 / Misi 1 | `public/assets/audio/guru/loka1-misi1.mp3` | Amir diumumkan menang. Hadiah sudah dalam tangan. Pilih maksud dalam tangan. | ±7 saat | Dengar Arahan |
| 11 | Loka 1 / Misi 2 — botol | `public/assets/audio/guru/loka1-misi2.mp3` | Sasarkan bola pada botol. Seret bola atau tekan Baling Bola. Kumpulkan empat gambar, kemudian susun mengikut urutan. | ±10 saat | Dengar Arahan |
| 12 | Loka 1 / Misi 3 | `public/assets/audio/guru/loka1-misi3.mp3` | Ceritakan kisah Amir menggunakan dalam tangan. Rakaman ialah pilihan. Kamu boleh bercerita terus kepada guru. | ±9 saat | Dengar Arahan |
| 13 | Loka 2 / Misi 1 | `public/assets/audio/guru/loka2-misi1.mp3` | Kawan saya sedih kerana dia kehilangan kucingnya. Saya mahu menggembirakannya. Apakah maksud ambil hati? | ±8 saat | Dengar Arahan |
| 14 | Loka 2 / Misi 2 — pemilihan | `public/assets/audio/guru/loka2-perasaan.mp3` | Pilih bantuan yang sesuai untuk sahabat yang sedih. Terangkan sebab pilihanmu. | ±7 saat | Dengar Arahan |
| 15 | Loka 2 / Misi 2 — kotak | `public/assets/audio/guru/loka2-kotak.mp3` | Pilih kotak. | ±2 saat | Dengar Arahan |
| 16 | Loka 2 / Misi 2 — hadiah | `public/assets/audio/guru/loka2-hadiah.mp3` | Tekan atau seret hadiah ke kotak. | ±4 saat | Dengar Arahan |
| 17 | Loka 2 / Misi 2 — reben | `public/assets/audio/guru/loka2-reben.mp3` | Pilih reben. | ±2 saat | Dengar Arahan |
| 18 | Loka 2 / Misi 2 — ucapan | `public/assets/audio/guru/loka2-ucapan.mp3` | Pilih ucapan yang menunjukkan sokongan. | ±4 saat | Dengar Arahan |
| 19 | Loka 2 / Misi 2 — susun | `public/assets/audio/guru/loka2-susun.mp3` | Susun empat gambar mengikut urutan cerita. | ±4 saat | Dengar Arahan |
| 20 | Loka 2 / Misi 3 | `public/assets/audio/guru/loka2-misi3.mp3` | Ceritakan kisah menggunakan simpulan bahasa ambil hati. Rakaman adalah pilihan. | ±6 saat | Dengar Arahan |
| 21 | Loka 3 / Misi 1 | `public/assets/audio/guru/loka3-misi1.mp3` | Vanessa ialah anak murid kesayangan Cikgu Aina. Setiap kali ada aktiviti di dalam kelas, Cikgu Aina sering memilih Vanessa untuk membantu beliau. Cikgu Aina juga selalu memuji Vanessa kerana rajin dan bertanggungjawab. Oleh itu, Vanessa dianggap sebagai anak emas Cikgu Aina. Apakah maksud anak emas? | ±23 saat | Dengar Arahan |
| 22 | Loka 3 / Misi 2 — memanah | `public/assets/audio/guru/loka3-panah.mp3` | Halakan busur ke sasaran. Tarik tali dan lepaskan, atau tekan Panah. | ±7 saat | Dengar Arahan |
| 23 | Loka 3 / Misi 2 — susun | `public/assets/audio/guru/loka3-susun.mp3` | Susun empat gambar cerita mengikut urutan. | ±4 saat | Dengar Arahan |
| 24 | Loka 3 / Misi 3 | `public/assets/audio/guru/loka3-misi3.mp3` | Ceritakan kisah Vanessa menggunakan anak emas. Rakaman ialah pilihan. | ±6 saat | Dengar Arahan |
| 25 | Loka 4 / Misi 1 | `public/assets/audio/guru/loka4-misi1.mp3` | Amir membaca di hadapan kelas. Dia tersalah menyebut satu perkataan lalu berasa malu. Sofia mendekatinya dan berbisik, “Tidak mengapa, mari kita baca bersama.” Amir kembali yakin. | ±14 saat | Dengar Arahan |
| 26 | Loka 4 / Misi 2 — Studio Foto | `public/assets/audio/guru/loka4-susun.mp3` | Susun empat foto Amir dan Sofia. Pilih gambar kemudian tekan slot. Semak susunan untuk mencetak jalur foto. | ±10 saat | Dengar Arahan |
| 27 | Loka 4 / Misi 3 | `public/assets/audio/guru/loka4-misi3.mp3` | Gunakan air muka dalam ceritamu. Tekan Rakam Cerita jika mahu merakam, atau bercerita terus bersama cikgu. | ±9 saat | Dengar Arahan |
| 28 | Loka 5 / Misi 1 — item 1 | `public/assets/audio/guru/loka5-misi1-1.mp3` | Danish membantu rakan-rakannya membersihkan taman sekolah semasa gotong-royong. Dia mengutip daun dan menyusun pasu hingga berpeluh dengan banyak. Danish mandi peluh selepas membantu membersihkan taman sekolah. Apakah maksud mandi peluh? A. Berpeluh dengan banyak selepas menggunakan tenaga. B. Mandi menggunakan air yang sejuk. C. Bermain dengan air di taman. | ±25 saat | Dengar Arahan |
| 29 | Loka 5 / Misi 1 — item 2 | `public/assets/audio/guru/loka5-misi1-2.mp3` | Danish membantu rakan-rakannya membersihkan taman sekolah semasa gotong-royong. Dia mengutip daun dan menyusun pasu hingga berpeluh dengan banyak. Danish mandi peluh selepas membantu membersihkan taman sekolah. Situasi manakah menunjukkan mandi peluh secara kiasan? A. Danish berpeluh banyak selepas mengutip daun. B. Danish mandi dengan sabun di bilik air. C. Danish membasuh tangan sebelum makan. | ±28 saat | Dengar Arahan |
| 30 | Loka 5 / Misi 1 — item 3 | `public/assets/audio/guru/loka5-misi1-3.mp3` | Danish membantu rakan-rakannya membersihkan taman sekolah semasa gotong-royong. Dia mengutip daun dan menyusun pasu hingga berpeluh dengan banyak. Danish mandi peluh selepas membantu membersihkan taman sekolah. Pilih contoh ayat yang sesuai. A. Danish mandi peluh selepas membantu membersihkan taman sekolah. B. Danish menyimpan mandi peluh dalam botol. C. Danish membeli mandi peluh di kedai. | ±28 saat | Dengar Arahan |
| 31 | Loka 5 / Misi 2 — gerabak | `public/assets/audio/guru/loka5-tenaga.mp3` | Naik gerabak, kemudian tekan Pam Tenaga. Bantuan Automatik sentiasa tersedia. | ±6 saat | Dengar Arahan |
| 32 | Loka 5 / Misi 2 — stesen 1 | `public/assets/audio/guru/loka5-stesen1.mp3` | Kutip Daun Berguguran. Seret daun ke bakul, atau tekan setiap daun untuk mengutipnya. | ±8 saat | Dengar Arahan |
| 33 | Loka 5 / Misi 2 — stesen 2 | `public/assets/audio/guru/loka5-stesen2.mp3` | Susun Pasu Bunga. Pilih pasu, kemudian tekan tapak sepadan. Kamu juga boleh menyeretnya. | ±8 saat | Dengar Arahan |
| 34 | Loka 5 / Misi 2 — stesen 3 | `public/assets/audio/guru/loka5-stesen3.mp3` | Mengapa Danish Berpeluh? Mengapakah Danish mandi peluh? A. Dia bekerja bersungguh-sungguh mengemas taman. B. Dia sedang tidur di dalam bilik. C. Dia hanya membaca di bawah kipas. | ±15 saat | Dengar Arahan |
| 35 | Loka 5 / Misi 2 — stesen 4 | `public/assets/audio/guru/loka5-stesen4.mp3` | Pilih Ayat yang Tepat. Ayat manakah menggunakan mandi peluh dengan tepat? A. Danish mandi peluh selepas membersihkan taman sekolah. B. Danish mandi peluh dengan sabun di bilik air. C. Danish membeli mandi peluh untuk rakannya. | ±19 saat | Dengar Arahan |
| 36 | Loka 5 / Misi 2 — susun | `public/assets/audio/guru/loka5-susun.mp3` | Susun empat gambar cerita Danish mengikut urutan. | ±5 saat | Dengar Arahan |
| 37 | Loka 5 / Misi 3 | `public/assets/audio/guru/loka5-misi3.mp3` | Ceritakan usaha Danish menggunakan mandi peluh. Rakaman ialah pilihan. | ±6 saat | Dengar Arahan |
| 38 | Loka 6 / Misi 1 | `public/assets/audio/guru/loka6-misi1.mp3` | Suka bermegah-megah atau membanggakan diri, khususnya tentang kebolehan atau kelebihan sendiri. Hakim suka cakap besar tentang kehebatan kapal mainannya walaupun dia belum mengujinya. Cakap besar bukan suara kuat. | ±15 saat | Dengar Arahan |
| 39 | Loka 6 / Misi 2 — kapal | `public/assets/audio/guru/loka6-kapal.mp3` | Pam Kiri atau Kanan. Tekan Tengah berhampiran bintang. Bantuan Ajaib tersedia. | ±7 saat | Dengar Arahan |
| 40 | Loka 6 / Misi 2 — stesen 1 | `public/assets/audio/guru/loka6-stesen1.mp3` | Pilih dialog yang menunjukkan cakap besar. A. Kapal saya paling hebat! Tiada siapa boleh mengalahkan saya! B. Saya akan mencuba sehabis baik. C. Saya masih perlu berlatih supaya lebih baik. | ±16 saat | Dengar Arahan |
| 41 | Loka 6 / Misi 2 — stesen 2 | `public/assets/audio/guru/loka6-stesen2.mp3` | Halakan kapal mainan ke laluan kosong, kemudian tekan Maju. Gunakan Kiri atau Kanan untuk menukar lorong. Pilih Pandu Berbantu jika perlu. | ±12 saat | Dengar Arahan |
| 42 | Loka 6 / Misi 2 — stesen 3 | `public/assets/audio/guru/loka6-stesen3.mp3` | Apakah tindakan Faris yang paling sesuai? A. Membantu Hakim membaiki kapal. B. Mengejek Hakim di hadapan rakan-rakan. C. Meninggalkan Hakim yang memerlukan bantuan. | ±13 saat | Dengar Arahan |
| 43 | Loka 6 / Misi 2 — stesen 4 | `public/assets/audio/guru/loka6-stesen4.mp3` | Pilih ayat yang menggunakan cakap besar dengan tepat. A. Hakim suka cakap besar tentang kebolehannya walaupun belum membuktikannya. B. Hakim cakap besar kerana memanggil Faris dengan suara kuat. C. Hakim cakap besar kerana melihat kapal yang besar. | ±20 saat | Dengar Arahan |
| 44 | Loka 6 / Misi 2 — susun | `public/assets/audio/guru/loka6-susun.mp3` | Susun empat gambar cerita Hakim dan Faris. | ±5 saat | Dengar Arahan |
| 45 | Loka 6 / Misi 3 | `public/assets/audio/guru/loka6-misi3.mp3` | Ceritakan kisah Hakim dan Faris menggunakan cakap besar. Rakaman ialah pilihan. | ±7 saat | Dengar Arahan |
| 46 | Imbas Loka / refleksi 1 | `public/assets/audio/guru/imbas-soalan1.mp3` | Simpulan bahasa yang paling saya ingat ialah. Pilih satu daripada enam simpulan bahasa. | ±8 saat | Dengar Arahan |
| 47 | Imbas Loka / refleksi 2 | `public/assets/audio/guru/imbas-soalan2.mp3` | Sejauh mana saya faham selepas bermain enam Loka? Pilih Saya faham, Saya masih belajar, atau Saya perlukan bantuan. Semua pilihan diterima. | ±12 saat | Dengar Arahan |
| 48 | Imbas Loka / refleksi 3 | `public/assets/audio/guru/imbas-soalan3.mp3` | Loka mana yang paling saya suka? Pilih satu Loka. Sebab adalah pilihan dan boleh diberitahu kepada cikgu. | ±10 saat | Dengar Arahan |
### DIGALAKKAN — 18 fail

| Bil. | Halaman / Aktiviti | Nama Fail MP3 | Skrip Tepat untuk Dirakam | Anggaran Durasi | Pencetus Audio |
| --- | --- | --- | --- | --- | --- |
| 1 | Gerbang | `public/assets/audio/guru/gerbang-selamat-datang.mp3` | Selamat datang ke SimpulLoka! Saya Cikgu Danea. Isi nama dan kelas pada Tiket Pengembaraan. Pilih avatar, kemudian tekan Mula Pengembaraan. | ±11 saat | Cadangan: butang Dengar panduan, selepas ditekan sahaja |
| 49 | Perpustakaan / pengenalan | `public/assets/audio/guru/perpustakaan-pengenalan.mp3` | Sentuh satu buku untuk melihat ilustrasi dan membaca maksudnya. Gunakan Zum ilustrasi jika mahu melihat gambar dengan lebih dekat. | ±11 saat | Cadangan Dengar panduan; butang baharu |
| 50 | Loka 1 / susun | `public/assets/audio/guru/loka1-susun.mp3` | Susun empat gambar cerita Amir mengikut urutan. Gunakan butang pada gambar jika tidak mahu menyeret. Kemudian tekan Semak Susunan. | ±11 saat | Cadangan Dengar Arahan pada susun; butang baharu |
| 51 | Loka 2 / sokongan perasaan | `public/assets/audio/guru/loka2-sokongan.mp3` | Hadiah atau kad menunjukkan sokongan kepada sahabat. Kucingnya masih belum ditemui, tetapi dia tahu kamu mengambil berat. | ±10 saat | Cadangan Dengar penjelasan selepas memilih alasan; belum ada |
| 52 | Loka 3 / penjelasan | `public/assets/audio/guru/loka3-penjelasan.mp3` | Anak emas ialah orang yang sangat disayangi atau mendapat layanan istimewa. Rajin membantu sahaja belum tentu bermaksud anak emas. Semua murid tetap dihargai. | ±13 saat | Cadangan Dengar penjelasan selepas jawapan; belum ada |
| 53 | Loka 4 / semakan tindakan | `public/assets/audio/guru/loka4-semak-tindakan.mp3` | Apakah tindakan Sofia yang menjaga air muka Amir? A. Menceritakan kesilapan Amir kepada semua orang. B. Menyuruh Amir berhenti membaca. C. Membantu secara perlahan dengan kata-kata baik. | ±15 saat | Cadangan Dengar soalan selepas jalur dicetak; kini Dengar Arahan hanya membaca arahan susun |
| 54 | Loka 4 / semakan ayat | `public/assets/audio/guru/loka4-semak-ayat.mp3` | Ayat manakah menggunakan air muka dengan sesuai? A. Sofia menjaga air muka Amir dengan membantunya secara sopan. B. Amir menyimpan air muka di dalam botol. C. Sofia membeli air muka di kedai. | ±17 saat | Cadangan Dengar soalan pada semakan kedua; belum ada |
| 55 | Imbas Loka / soalan 1 tambahan | `public/assets/audio/guru/imbas-pengalaman.mp3` | Pilih perasaan kamu selepas belajar. Kemudian pilih satu hingga lima bintang untuk pengalaman SimpulLoka. Semua pilihan diterima. | ±10 saat | Cadangan perluasan Dengar Arahan soalan 1; belum dipetakan |
| 56 | Imbas Loka / pengenalan | `public/assets/audio/guru/imbas-pengenalan.mp3` | Jom imbas kembali pengembaraan kamu. Refleksi adalah pilihan. | ±5 saat | Slot katalog ada; skrin pengenalan tiada butang suara |
| 57 | Konsert | `public/assets/audio/guru/konsert-panduan.mp3` | Tekan Buka lagu asal di Suno untuk mendengar lagu. Sebelum kembali ke aktiviti, jeda lagu atau tutup tab Suno. | ±11 saat | Cadangan Dengar panduan; belum ada |
| 58 | Inklusif | `public/assets/audio/guru/mod-inklusif-panduan.mp3` | Pilih saiz tulisan dan sokongan yang selesa untuk kamu. Mod Fokus mengurangkan gangguan. Mod Senyap mematikan audio aplikasi. | ±10 saat | Cadangan Dengar panduan dalam Mod Inklusif; belum ada |
| 59 | Maklum balas bersama | `public/assets/audio/guru/bersama-cuba-lagi.mp3` | Tidak mengapa. Cuba sekali lagi. Kamu boleh menggunakan Petunjuk atau meminta bantuan cikgu. | ±8 saat | Cadangan Dengar galakan selepas percubaan; jangan automatik |
| 60 | Maklum balas bersama | `public/assets/audio/guru/bersama-gambar-diperoleh.mp3` | Syabas! Satu gambar cerita telah diperoleh. Teruskan mengikut kemampuan kamu. | ±6 saat | Cadangan Dengar maklum balas selepas kejayaan; jangan automatik |
| 61 | Pasport | `public/assets/audio/guru/pasport-panduan.mp3` | Setiap Loka yang lengkap memberikan satu cop pasport. Selepas enam Loka lengkap, kamu boleh membuka sijil pengembaraan. | ±10 saat | Cadangan Dengar panduan pada Pasport; belum ada |
| 62 | Grand Finale | `public/assets/audio/guru/grand-finale-tahniah.mp3` | Tahniah! Kamu telah melengkapkan keenam-enam Loka SimpulLoka. Gula Kapas Emas Istimewa dan Sijil Tamat Pengembaraan milikmu. | ±9 saat | Slot sahaja; cadangan Dengar ucapan selepas enam Loka unik, jangan automatik |
| 63 | Pentas Cerita / Loka 1 dan 2 | `public/assets/audio/guru/pentas-kawalan-loka12.mp3` | Tekan Rakam Cerita jika mahu merakam cerita. Benarkan mikrofon apabila diminta. Tekan Selesai Rakaman apabila selesai. Pilih Dengar Semula untuk mendengar rakaman. Kamu juga boleh memilih Rakam Semula, atau bercerita terus kepada cikgu. | ±18 saat | Cadangan Dengar cara merakam sebelum mula; belum ada |
| 64 | Pentas Cerita / Loka 4 | `public/assets/audio/guru/pentas-kawalan-loka4.mp3` | Tekan Rakam Cerita jika mahu merakam cerita. Benarkan mikrofon apabila diminta. Tekan Henti Rakaman apabila selesai. Pilih Dengar Semula untuk mendengar rakaman. Kamu juga boleh memilih Rakam Semula, atau bercerita terus kepada cikgu. | ±18 saat | Cadangan Dengar cara merakam sebelum mula; belum ada |
| 65 | Pentas Cerita / Loka 3, 5 dan 6 | `public/assets/audio/guru/pentas-kawalan-loka356.mp3` | Tekan Mula Bercerita jika mahu merakam cerita. Benarkan mikrofon apabila diminta. Tekan Selesai Bercerita apabila selesai. Pilih Dengar Semula untuk mendengar rakaman. Kamu juga boleh memilih Rakam Semula, atau bercerita terus kepada cikgu. | ±18 saat | Cadangan Dengar cara merakam sebelum mula; belum ada |

### Status sambungan bagi setiap fail

“Sedia” di sini bermaksud laluan dan awalan katalog sudah sesuai, bukan rakaman sudah wujud atau diuji. Semua MP3 masih belum tersedia. Skrip yang diperbetulkan tidak boleh dipasang melalui katalog lama tanpa semakan pemetaan kemudian.

| Bil. | Status sebenar / kerja integrasi kemudian |
| --- | --- |
| 1 | Slot sahaja; butang belum ada |
| 2 | Sedia: butang muncul hanya apabila fail dikesan |
| 3 | Sedia: butang muncul hanya apabila fail dikesan |
| 4 | Sedia: butang muncul hanya apabila fail dikesan |
| 5 | Sedia: butang muncul hanya apabila fail dikesan |
| 6 | Sedia: butang muncul hanya apabila fail dikesan |
| 7 | Sedia: butang muncul hanya apabila fail dikesan |
| 8 | Sedia: butang muncul hanya apabila fail dikesan |
| 9 | Butang ada; entri katalog baharu diperlukan |
| 10 | Slot sahaja; butang arahan belum ada |
| 11 | Slot sahaja; butang arahan belum ada |
| 12 | Slot sahaja; butang arahan belum ada |
| 13 | Sedia: perlu rakaman dan build |
| 14 | Sedia: perlu rakaman dan build |
| 15 | Sedia: perlu rakaman dan build |
| 16 | Sedia: perlu rakaman dan build |
| 17 | Sedia: perlu rakaman dan build |
| 18 | Sedia: perlu rakaman dan build |
| 19 | Sedia: perlu rakaman dan build |
| 20 | Sedia: perlu rakaman dan build |
| 21 | Sedia: perlu rakaman dan build |
| 22 | Sedia: perlu rakaman dan build |
| 23 | Sedia: perlu rakaman dan build |
| 24 | Sedia: perlu rakaman dan build |
| 25 | Butang ada; katalog lama mengandungi teks tambahan, perlu dipadankan |
| 26 | Butang ada; ganti pemetaan lama yang menyebut gambar sahaja |
| 27 | Butang ada; ganti pemetaan lama |
| 28 | Butang ada; normalisasi tanda baca dan label A/B/C perlu dipadankan |
| 29 | Butang ada; normalisasi tanda baca dan label A/B/C perlu dipadankan |
| 30 | Butang ada; normalisasi tanda baca dan label A/B/C perlu dipadankan |
| 31 | Sedia: perlu rakaman dan build |
| 32 | Butang ada; katalog kini tajuk sahaja, perlu pemetaan teks statik berasingan daripada kiraan dinamik |
| 33 | Butang ada; katalog kini tajuk sahaja, perlu pemetaan teks statik berasingan daripada kiraan dinamik |
| 34 | Butang ada; katalog kini tajuk sahaja, perlu pemetaan teks statik berasingan daripada kiraan dinamik |
| 35 | Butang ada; katalog kini tajuk sahaja, perlu pemetaan teks statik berasingan daripada kiraan dinamik |
| 36 | Sedia: perlu rakaman dan build |
| 37 | Sedia: perlu rakaman dan build |
| 38 | Butang ada; padankan tanda baca berganda dalam katalog semasa |
| 39 | Sedia: perlu rakaman dan build |
| 40 | Butang ada; task.textContent bermula STESEN, katalog awalan soalan tidak sepadan; perlu pemetaan eksplisit |
| 41 | Butang ada; task.textContent bermula STESEN, katalog awalan soalan tidak sepadan; perlu pemetaan eksplisit |
| 42 | Butang ada; task.textContent bermula STESEN, katalog awalan soalan tidak sepadan; perlu pemetaan eksplisit |
| 43 | Butang ada; task.textContent bermula STESEN, katalog awalan soalan tidak sepadan; perlu pemetaan eksplisit |
| 44 | Sedia: perlu rakaman dan build |
| 45 | Sedia: perlu rakaman dan build |
| 46 | Sedia: perlu rakaman dan build |
| 47 | Sedia: perlu rakaman dan build |
| 48 | Sedia: perlu rakaman dan build |
| 49 | Belum disambungkan; perlu kelulusan integrasi |
| 50 | Belum disambungkan; perlu kelulusan integrasi |
| 51 | Belum disambungkan; perlu kelulusan integrasi |
| 52 | Belum disambungkan; perlu kelulusan integrasi |
| 53 | Belum disambungkan; perlu kelulusan integrasi |
| 54 | Belum disambungkan; perlu kelulusan integrasi |
| 55 | Belum disambungkan; perlu kelulusan integrasi |
| 56 | Belum disambungkan; perlu kelulusan integrasi |
| 57 | Belum disambungkan; perlu kelulusan integrasi |
| 58 | Belum disambungkan; perlu kelulusan integrasi |
| 59 | Belum disambungkan; perlu kelulusan integrasi |
| 60 | Belum disambungkan; perlu kelulusan integrasi |
| 61 | Belum disambungkan; perlu kelulusan integrasi |
| 62 | Belum disambungkan; perlu kelulusan integrasi |
| 63 | Rakaman murid berfungsi; panduan guru tambahan belum disambungkan |
| 64 | Rakaman murid berfungsi; panduan guru tambahan belum disambungkan |
| 65 | Rakaman murid berfungsi; panduan guru tambahan belum disambungkan |

## Pelan integrasi selepas kelulusan, bukan perubahan yang telah dibuat

1. Terima rakaman asal dan semak skrip/sebutan, kemudian eksport MP3 mono 44.1/48 kHz, 96–128 kbps. Simpan WAV asal di luar aset aplikasi. Tanpa muzik latar, tiada normalisasi keterlaluan; sasarkan kelantangan pertuturan konsisten, puncak di bawah −1 dBFS. Jeda sekitar 0.3–0.5 saat di awal/akhir.
2. Kekalkan laluan buku `public/assets/audio/guru/perpustakaan/`. Jangan menukar kepada nama rawak atau menambah nombor versi pada nama fail akhir. Gunakan nama dalam jadual **selepas skrip diluluskan**. Rakaman buku tidak perlu disalin ke `makna-*.mp3`.
3. Untuk fail bertanda “Sedia”, semak awalan tepat di `teacher-audio-catalog.js`, bina semula manifest dengan `npm run build`, kemudian uji fail sebenar. Pengesanan header ID3/MPEG semasa build bukan bukti fail boleh didekod atau didengar. `manifest.json` dan `library-audio.json` dijana di `dist`, jangan edit manual.
4. Untuk Loka 1, Gerbang dan semua pencetus cadangan, tambah butang aksesibel hanya selepas kelulusan integrasi. Untuk Ferris, tambah pemetaan. Untuk Loka 4, ganti teks lapuk dengan teks Studio Foto. Untuk Loka 5/6, pisahkan arahan statik daripada kiraan, status selesai dan teks DOM; jangan bergantung pada `textContent` keseluruhan untuk fail tetap.
5. Utamakan panggilan berdasarkan ID audio yang eksplisit pada fasa integrasi supaya tanda baca atau maklum balas berubah tidak menjejaskan pemilihan fail. Ini **cadangan**, sistem semasa masih padanan awalan. Tidak perlu mengubah permainan/PBD untuk melakukannya.
6. Dalam sistem semasa, `TeacherAudio.stop()` membatalkan pertuturan/rakaman arahan; klik mula rakam/main semula dan pertukaran halaman menghentikan arahan. Mod Senyap memanggil stop global; Perpustakaan/perakam mempunyai pengendalian sendiri. Perpustakaan menggunakan `new Audio()` berasingan; penyelarasan merentas semua pemain perlu diuji, jangan mengandaikan pendengar `play` DOM merangkumi semua objek Audio terasing.
7. Dasar integrasi: hanya satu suara panduan pada satu masa; hentikan suara lain sebelum main, semasa rakaman, navigasi atau Mod Senyap. Jangan mencelah dengan galakan automatik. Mod Fokus/Kurangkan Animasi tidak perlu menutup panduan suara yang sengaja dipilih. Kekalkan teks apabila tiada audio/Mod Senyap.
8. Baki maklum balas semasa kini boleh menyambung TTS selepas rakaman. Selepas suara guru diterima, tentukan bersama sama ada kekalkan sandaran berlabel atau guna teks sahaja untuk baki itu. Jangan merakam semua kombinasi jawapan/peratus/kiraan. Perpustakaan kekal tanpa TTS.
9. Kesan cop dan pam sedia ada tidak memerlukan suara guru. Ucapan enam Loka mesti hanya untuk enam Loka unik lengkap; jangan mengubah kelayakan ganjaran atau mengulang secara automatik. Narasi tidak menyebut sambungan Sheets berjaya tanpa pengesahan sebenar.
10. Video: lapan fail `video-panduan/babak-*.mp3` ialah sumber penyuntingan, bukan dimasukkan ke manifest arahan. Selepas rakaman diluluskan, gabung ke salinan MP4, semak VTT/SRT, kemudian gantikan video secara berasingan. **Tiada penyuntingan MP4 dilakukan sekarang.**
11. Uji desktop/telefon: klik/audio tamat/jeda/ulang, dua butang pantas, Mod Senyap semasa audio berjalan, navigasi, izin mikrofon diterima/ditolak, rakam tanpa suara panduan masuk, semua enam Misi 3, fail rosak/tiada, buku, tab Suno dan video. Main balik asli dan dengar sendiri setiap MP3 sebelum penerbitan.

## Audio TIDAK PERLU dirakam

- Setiap butang navigasi, setiap gondola, nombor skor/baki bola/peratus tenaga, kiraan daun/pasu dan setiap percubaan salah.
- Bunyi cop, pam, konfeti atau muzik baharu; kesan mekanikal sedia ada boleh dikekalkan.
- Setiap teks rubrik, rekod murid, kata laluan, token, URL Apps Script atau maklumat peribadi.
- Nama/kelas individu dan kandungan sijil yang berubah-ubah; kekalkan sebagai teks.
- Cerita jawapan penuh bagi setiap kad atau semua bantuan ayat tiga tahap. Guru/murid boleh membaca rangka apabila diperlukan; jangan menukar Pentas Cerita kepada meniru rakaman siap.
- Lagu Konsert sebagai suara guru baharu. Kekalkan sumber asal; fail lagu tempatan ialah perkara berasingan.
- Audio murid sebagai aset projek. Tiada rakaman murid boleh dimasukkan ke repository.

## Inventori 65 entri katalog lama — rujukan audit sahaja

**Jangan rakam semua entri di bawah.** Jadual skrip di atas ialah cadangan semasa. Ini menjejak setiap ID lama supaya tiada entri dianggap aktif tanpa semakan.

| ID katalog sedia ada | Laluan katalog (tanpa `public/`) | Keputusan audit |
| --- | --- | --- |
| `gerbang-selamat-datang` | `assets/audio/guru/gerbang-selamat-datang.mp3` | Slot sahaja; butang belum ada |
| `kitab-ilmu` | `assets/audio/guru/perpustakaan/kitab-ilmu.mp3` | Sedia: butang muncul hanya apabila fail dikesan |
| `makna-dalam-tangan` | `assets/audio/guru/makna-dalam-tangan.mp3` | Warisan Dengar maksud melalui fungsi app.js; bukan pemain buku semasa. Tidak perlu fail pendua |
| `contoh-dalam-tangan` | `assets/audio/guru/contoh-dalam-tangan.mp3` | Warisan story[0], bukan contoh ayat lengkap dan sebahagian cerita berbeza daripada modul Loka. Tidak perlu rakam |
| `buku-dalam-tangan` | `assets/audio/guru/perpustakaan/dalam-tangan.mp3` | Sedia: butang muncul hanya apabila fail dikesan |
| `makna-ambil-hati` | `assets/audio/guru/makna-ambil-hati.mp3` | Warisan Dengar maksud melalui fungsi app.js; bukan pemain buku semasa. Tidak perlu fail pendua |
| `contoh-ambil-hati` | `assets/audio/guru/contoh-ambil-hati.mp3` | Warisan story[0], bukan contoh ayat lengkap dan sebahagian cerita berbeza daripada modul Loka. Tidak perlu rakam |
| `buku-ambil-hati` | `assets/audio/guru/perpustakaan/ambil-hati.mp3` | Sedia: butang muncul hanya apabila fail dikesan |
| `makna-anak-emas` | `assets/audio/guru/makna-anak-emas.mp3` | Warisan Dengar maksud melalui fungsi app.js; bukan pemain buku semasa. Tidak perlu fail pendua |
| `contoh-anak-emas` | `assets/audio/guru/contoh-anak-emas.mp3` | Warisan story[0], bukan contoh ayat lengkap dan sebahagian cerita berbeza daripada modul Loka. Tidak perlu rakam |
| `buku-anak-emas` | `assets/audio/guru/perpustakaan/anak-emas.mp3` | Sedia: butang muncul hanya apabila fail dikesan |
| `makna-air-muka` | `assets/audio/guru/makna-air-muka.mp3` | Warisan Dengar maksud melalui fungsi app.js; bukan pemain buku semasa. Tidak perlu fail pendua |
| `contoh-air-muka` | `assets/audio/guru/contoh-air-muka.mp3` | Warisan story[0], bukan contoh ayat lengkap dan sebahagian cerita berbeza daripada modul Loka. Tidak perlu rakam |
| `buku-air-muka` | `assets/audio/guru/perpustakaan/air-muka.mp3` | Sedia: butang muncul hanya apabila fail dikesan |
| `makna-mandi-peluh` | `assets/audio/guru/makna-mandi-peluh.mp3` | Warisan Dengar maksud melalui fungsi app.js; bukan pemain buku semasa. Tidak perlu fail pendua |
| `contoh-mandi-peluh` | `assets/audio/guru/contoh-mandi-peluh.mp3` | Warisan story[0], bukan contoh ayat lengkap dan sebahagian cerita berbeza daripada modul Loka. Tidak perlu rakam |
| `buku-mandi-peluh` | `assets/audio/guru/perpustakaan/mandi-peluh.mp3` | Sedia: butang muncul hanya apabila fail dikesan |
| `makna-cakap-besar` | `assets/audio/guru/makna-cakap-besar.mp3` | Warisan Dengar maksud melalui fungsi app.js; bukan pemain buku semasa. Tidak perlu fail pendua |
| `contoh-cakap-besar` | `assets/audio/guru/contoh-cakap-besar.mp3` | Warisan story[0], bukan contoh ayat lengkap dan sebahagian cerita berbeza daripada modul Loka. Tidak perlu rakam |
| `buku-cakap-besar` | `assets/audio/guru/perpustakaan/cakap-besar.mp3` | Sedia: butang muncul hanya apabila fail dikesan |
| `loka1-misi1` | `assets/audio/guru/loka1-misi1.mp3` | Slot sahaja; butang arahan belum ada |
| `loka1-misi2` | `assets/audio/guru/loka1-misi2.mp3` | Slot sahaja; butang arahan belum ada |
| `loka1-misi3` | `assets/audio/guru/loka1-misi3.mp3` | Slot sahaja; butang arahan belum ada |
| `loka2-misi1` | `assets/audio/guru/loka2-misi1.mp3` | Sedia: perlu rakaman dan build |
| `loka2-perasaan` | `assets/audio/guru/loka2-perasaan.mp3` | Sedia: perlu rakaman dan build |
| `loka2-kotak` | `assets/audio/guru/loka2-kotak.mp3` | Sedia: perlu rakaman dan build |
| `loka2-hadiah` | `assets/audio/guru/loka2-hadiah.mp3` | Sedia: perlu rakaman dan build |
| `loka2-reben` | `assets/audio/guru/loka2-reben.mp3` | Sedia: perlu rakaman dan build |
| `loka2-ucapan` | `assets/audio/guru/loka2-ucapan.mp3` | Sedia: perlu rakaman dan build |
| `loka2-susun` | `assets/audio/guru/loka2-susun.mp3` | Sedia: perlu rakaman dan build |
| `loka2-misi3` | `assets/audio/guru/loka2-misi3.mp3` | Sedia: perlu rakaman dan build |
| `loka3-misi1` | `assets/audio/guru/loka3-misi1.mp3` | Sedia: perlu rakaman dan build |
| `loka3-panah` | `assets/audio/guru/loka3-panah.mp3` | Sedia: perlu rakaman dan build |
| `loka3-susun` | `assets/audio/guru/loka3-susun.mp3` | Sedia: perlu rakaman dan build |
| `loka3-misi3` | `assets/audio/guru/loka3-misi3.mp3` | Sedia: perlu rakaman dan build |
| `loka4-misi1` | `assets/audio/guru/loka4-misi1.mp3` | Butang ada; katalog lama mengandungi teks tambahan, perlu dipadankan |
| `loka4-buaian` | `assets/audio/guru/loka4-buaian.mp3` | TIDAK PERLU: mekanik telah diganti Studio Foto; jangan rakam |
| `loka4-susun` | `assets/audio/guru/loka4-susun.mp3` | Butang ada; ganti pemetaan lama yang menyebut gambar sahaja |
| `loka4-misi3` | `assets/audio/guru/loka4-misi3.mp3` | Butang ada; ganti pemetaan lama |
| `loka4-pulau1` | `assets/audio/guru/loka4-pulau1.mp3` | TIDAK PERLU: tiada pulau dalam aliran semasa |
| `loka4-pulau2` | `assets/audio/guru/loka4-pulau2.mp3` | TIDAK PERLU: tiada pulau dalam aliran semasa |
| `loka4-pulau3` | `assets/audio/guru/loka4-pulau3.mp3` | Soalan masih dalam semakan selepas cetak, tetapi pemetaan pulau tidak dipanggil; guna cadangan loka4-semak-* jika diluluskan |
| `loka4-pulau4` | `assets/audio/guru/loka4-pulau4.mp3` | Soalan masih dalam semakan selepas cetak, tetapi pemetaan pulau tidak dipanggil; guna cadangan loka4-semak-* jika diluluskan |
| `loka5-misi1-1` | `assets/audio/guru/loka5-misi1-1.mp3` | Butang ada; normalisasi tanda baca dan label A/B/C perlu dipadankan |
| `loka5-misi1-2` | `assets/audio/guru/loka5-misi1-2.mp3` | Butang ada; normalisasi tanda baca dan label A/B/C perlu dipadankan |
| `loka5-misi1-3` | `assets/audio/guru/loka5-misi1-3.mp3` | Butang ada; normalisasi tanda baca dan label A/B/C perlu dipadankan |
| `loka6-stesen1` | `assets/audio/guru/loka6-stesen1.mp3` | Butang ada; task.textContent bermula STESEN, katalog awalan soalan tidak sepadan; perlu pemetaan eksplisit |
| `loka6-stesen3` | `assets/audio/guru/loka6-stesen3.mp3` | Butang ada; task.textContent bermula STESEN, katalog awalan soalan tidak sepadan; perlu pemetaan eksplisit |
| `loka6-stesen4` | `assets/audio/guru/loka6-stesen4.mp3` | Butang ada; task.textContent bermula STESEN, katalog awalan soalan tidak sepadan; perlu pemetaan eksplisit |
| `loka5-tenaga` | `assets/audio/guru/loka5-tenaga.mp3` | Sedia: perlu rakaman dan build |
| `loka5-stesen1` | `assets/audio/guru/loka5-stesen1.mp3` | Butang ada; katalog kini tajuk sahaja, perlu pemetaan teks statik berasingan daripada kiraan dinamik |
| `loka5-stesen2` | `assets/audio/guru/loka5-stesen2.mp3` | Butang ada; katalog kini tajuk sahaja, perlu pemetaan teks statik berasingan daripada kiraan dinamik |
| `loka5-stesen3` | `assets/audio/guru/loka5-stesen3.mp3` | Butang ada; katalog kini tajuk sahaja, perlu pemetaan teks statik berasingan daripada kiraan dinamik |
| `loka5-stesen4` | `assets/audio/guru/loka5-stesen4.mp3` | Butang ada; katalog kini tajuk sahaja, perlu pemetaan teks statik berasingan daripada kiraan dinamik |
| `loka5-susun` | `assets/audio/guru/loka5-susun.mp3` | Sedia: perlu rakaman dan build |
| `loka5-misi3` | `assets/audio/guru/loka5-misi3.mp3` | Sedia: perlu rakaman dan build |
| `loka6-misi1` | `assets/audio/guru/loka6-misi1.mp3` | Butang ada; padankan tanda baca berganda dalam katalog semasa |
| `loka6-kapal` | `assets/audio/guru/loka6-kapal.mp3` | Sedia: perlu rakaman dan build |
| `loka6-susun` | `assets/audio/guru/loka6-susun.mp3` | Sedia: perlu rakaman dan build |
| `loka6-misi3` | `assets/audio/guru/loka6-misi3.mp3` | Sedia: perlu rakaman dan build |
| `imbas-pengenalan` | `assets/audio/guru/imbas-pengenalan.mp3` | Belum disambungkan; perlu kelulusan integrasi |
| `imbas-soalan1` | `assets/audio/guru/imbas-soalan1.mp3` | Sedia: perlu rakaman dan build |
| `imbas-soalan2` | `assets/audio/guru/imbas-soalan2.mp3` | Sedia: perlu rakaman dan build |
| `imbas-soalan3` | `assets/audio/guru/imbas-soalan3.mp3` | Sedia: perlu rakaman dan build |
| `grand-finale-tahniah` | `assets/audio/guru/grand-finale-tahniah.mp3` | Belum disambungkan; perlu kelulusan integrasi |

## Skrip narasi video dan lokasi fail

Lapan babak (00:00–00:30, 00:30–01:00, 01:00–01:25, 01:25–02:20, 02:20–02:50, 02:50–03:25, 03:25–04:15, 04:15–04:40) mempunyai teks tepat, nama fail, anggaran bacaan dan penanda aksi dalam [NARASI_VIDEO_GURU_AKHIR.md](NARASI_VIDEO_GURU_AKHIR.md). Fail cadangan disimpan di `public/assets/audio/guru/video-panduan/`, berasingan daripada arahan permainan. Semua lapan nama turut disenaraikan dalam senarai semak.

## Bukti dan batas audit

Sumber dibaca: `app.js`, `teacher-audio.js`, semua 65 entri `teacher-audio-catalog.js`, `library.js`, `ferris.js`, `loka-one.js` hingga `loka-six.js`, `loka-story.js`, `loka-sequence.js`, `loka-one-reward.js`, `loka-rewards.js`, `loka-six-final.js`, `imbas-loka.js`, `sudut-guru.js`, `scripts/build.mjs`, `scripts/build-teacher-resources.mjs`, skrip rakaman video, skrip narasi, masa babak dan VTT/SRT video sedia ada. Laluan enam Loka khusus mengambil keutamaan berbanding kod Studio lima peringkat warisan dalam `app.js`.

Semakan ini ialah audit sumber dan metadata video, bukan ujian dengar MP3 sebenar (fail belum ada) atau pengesahan rakaman Cikgu Danea. Tiada arahan suara baharu diaktifkan, tiada Google Sheets/Apps Script/env diubah. Dokumen lama `AUDIO_GURU_SCRIPTS.md` dan katalog lama dibiarkan asal untuk mematuhi skop; gunakan draf bertarikh ini untuk semakan rakaman V9.1.
