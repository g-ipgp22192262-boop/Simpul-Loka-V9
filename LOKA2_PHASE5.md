# Fasa 5 — Ambil Hati: Kedai Cenderamata Ajaib

**Status: reka bentuk dan fungsi Loka 2 diluluskan pengguna; dokumen ini disertakan dalam pelepasan kod rasmi. Status Published Netlify memerlukan bukti remote berasingan.** Asas branch `work` disemak terhadap `FETCH_HEAD`: `008137889d2542a379b2854f41cb5f909bddfc74`. Animasi Cop Pasport Loka 1 memang wujud dalam asas tersebut; Fasa 5 menggunakannya semula.

## Permainan sebenar

1. **Teroka Makna:** satu ilustrasi dua sahabat, situasi kucing hilang, tiga kad jawapan, maklum balas/petunjuk dan zum. Maksud tepat: “Melakukan sesuatu untuk menggembirakan atau menyenangkan hati seseorang.”
2. **Hadiah Penuh Kasih:** pilih kad semangat, patung atau poster; ketiga-tiganya diterima dengan alasan sesuai atau penerangan lisan. Maklum balas berbeza mengikut tindakan. Patung tidak menggantikan kucing; poster melibatkan bantuan orang dewasa. Kemudian empat langkah kaunter: kotak bergerak/terbuka, hadiah masuk, reben melilit/bersimpul, kad masuk/kotak tertutup/kilauan. Empat gambar dibuka mengikut langkah; selepas siap barulah arena bertukar kepada susunan cerita. Bank gambar dirawakkan dan tidak bermula dalam urutan jawapan. Butang pilih/letak/keluar/alihtempat melengkapkan seret-lepas.
3. **Pentas Cerita:** empat ilustrasi, haiwan tiket besar dengan tangan/mulut beranimasi, bantuan tiga aras, rakaman/main semula/ulang/muat turun dan laluan lisan tanpa mikrofon. Murid digalakkan menggunakan “ambil hati”.
4. **Pasport bersama:** buka pasport, cop kayu lambang hadiah, hentakan/bunyi lembut, kilauan/konfeti terhad. Cop Loka 1 hanya dipaparkan jika `progress[1].completed` benar; menamatkan Loka 2 tidak mencipta kemajuan Loka 1. Flag upacara disimpan sebelum animasi, maka Langkau/reload/keluar tidak mengulanginya. Lawatan semula boleh menggunakan “Lihat Cop Ambil Hati”. Butang Loka 3 membuka aktiviti **asal** Anak Emas yang sudah tersedia, bukan mini permainan Fasa baharu.

Semua objek boleh ditekan/keyboard; hadiah juga mempunyai pointer drag dengan pengesanan kawasan kotak sebenar. Web Animations API menggerakkan objek DOM/SVG ke koordinat kaunter; mockup/video bukan antaramuka. Langkau, pemasa sandaran 4.5 saat, fallback API gagal, pembatalan navigasi/tab tersembunyi dan perubahan tetapan mencegah animasi menyekat murid.

## Fail dan penggunaan semula

- `public/assets/loka-two.js`: state, aliran tiga misi, kaunter, susunan, PBD setempat dan payload kemajuan.
- `public/assets/loka-two.css`: selector Loka 2 sahaja; menu permainan ringkas, kedai, kaunter, pentas dan responsif.
- `public/assets/loka-two-art.js`: kotak/lid, hadiah, reben dan cop SVG berlapis; gradien kotak beridentiti warna sendiri.
- `public/assets/loka-story.js`: komponen avatar berartikulasi/perakam boleh guna semula, disesuaikan daripada mekanik Loka 1. Loka 1 masih menggunakan perakam asalnya; tiada migrasi atau perubahan tiga misi Loka 1.
- `public/assets/loka-one-reward.js`: enjin pasport sedia ada diperluas dengan identiti dan cop terdahulu pilihan. `LokaPassport` ialah alias enjin sama. Pemanggil `LokaOneReward` dan tetapan lalai Loka 1 dikekalkan; tiada salinan enjin animasi kedua.
- `public/assets/app.js` dan `public/index.html`: muatan skrip/gaya, routing indeks 1, lifecycle dan preference hook sahaja. Kandungan `IDIOMS`, backend, PBD rasmi, Gerbang, Library dan Ferris tidak dirombak.
- `package.json`: semakan sintaks baharu dan `test:loka2`.
- `tests/loka-two-browser.mjs`: suite khusus. `tests/browser.mjs` menguji kedai baharu bagi Loka 2 dan mengekalkan regresi Loka lain/Rush.

`public/assets/loka2-mockup.png` tidak diubah dan digunakan sebagai rujukan visual. Aset baharu dalam `public/assets/images/loka2/`: `magic-shop.webp`, `story-atlas.webp` (patung), `story-card.webp`, `story-poster.webp`. Ilustrasi dijana untuk pembangunan ini dan dimampatkan WebP, sekitar 1.3 MB keseluruhan; telah diluluskan pengguna melalui media semakan. Cerita berubah mengikut pilihan sebenar, tanpa menggambarkan kucing telah ditemui. Kawalan, watak pemain dan props kaunter ialah lapisan berasingan; tiada butang palsu di atas mockup.

## Inklusif, audio dan privasi

Tetapan sedia ada digunakan: Andika/tulisan besar/jarak luas/kontras/Fokus/Kurangkan Animasi/Senyap, OS reduced motion, keyboard dan sentuhan. Fokus menghentikan gerakan hiasan/tangan/mulut tetapi merakam tetap boleh. Kurangkan Animasi terus menunjukkan hasil langkah; butang kekal boleh digunakan. Dialog zum asli menyokong Escape dan pemulihan fokus.

“Dengar Arahan” menggunakan fungsi bacaan pelayar `speech()` **sedia ada**, termasuk maklum balas semasa. Ia dilabelkan sebagai bacaan pelayar untuk aksesibiliti, bukan rakaman guru sebenar. Tiada MP3 guru Loka 2 diterima/direka atau AI TTS baharu ditambah. Audio perpustakaan tidak diubah.

Perakam meminta izin hanya selepas klik; maksimum tiga minit, MediaRecorder WebM/Opus atau MP4 mengikut sokongan. Blob/URL/chunks hanya dalam memori; dibersihkan ketika keluar/tamat/ulang. Trek mikrofon ditutup, termasuk izin yang tiba lewat. Tiada audio, URL blob atau base64 dihantar ke backend atau localStorage. Senyap menghentikan main balik tetapi tidak menghalang murid merakam atau bercerita secara lisan. Bunyi cop ialah WebAudio pendek yang diwarisi daripada enjin pasport, bukan rakaman suara.

## Kemajuan dan PBD

State permainan menggunakan `simpulloka_v9_loka2_<mode>_<studentId>`; tidak menulis kunci Loka 1. `saveProgress(studentId, token, 2, sequenceAttempts, hints, ordered, meaning, finished)` mengekalkan kontrak sedia ada. Bilangan klik, warna, pilihan hadiah dan keberhasilan membungkus tidak dijadikan TP. Susunan gambar dan makna/penceritaan ialah flag pembelajaran yang dihantar. Gagal simpan memberikan status jelas, ganjaran setempat dan butang cuba segerak semula.

Ruang pemerhatian PBD kekal boleh buka/tutup, dengan catatan setempat dan pautan Sudut Cikgu. Rekod rasmi/TP tetap melalui pertimbangan guru dan backend PBD sedia ada. Tiada perubahan Google Apps Script, Netlify Function atau skema Sheets.

## Pengesahan dan media

Perintah: `npm run check`, `npm test`, `npm run build`, `npm run test:loka2`, `npm run test:loka1`, `npm run test:reward`, `npm run test:browser`, `npm run test:ferris`, `npm run test:library`, `node tests/home-browser.mjs`.

Ujian Loka 2 meliputi pilihan hadiah/alasan, seretan hit/miss, lapan fasa pembungkusan, bank rawak/susunan salah/betul/petunjuk, rakaman MediaRecorder sebenar dengan **mikrofon simulasi ujian**, dengar/ulang/download, izin ditolak/tiada/lewat/dibatalkan, laluan lisan, tiada audio/PBD automatik, persistensi, cop lama/tiada cop rekaan, Langkau/keyboard/touch/OS/Fokus/Reduce/Senyap, API animasi gagal, watchdog tersekat, keluar ketika objek bergerak, simpanan gagal/cuba semula dan lebar 320–1440px.

Audit axe-core 4.10.3 dijalankan pada sepuluh paparan × desktop/telefon, dan sembilan paparan × desktop/telefon dengan tulisan sangat besar/Andika/kontras/Fokus/Reduce: 38 audit. Hasil terperinci QA berada dalam `work/loka2/`; bukan production. Ujian automatik bukan pengganti semakan guru, pembaca skrin manusia, Safari/iOS, mikrofon/peranti fizikal atau sambungan sekolah sebenar.

Media semakan berada dalam `preview-screenshots/loka2-phase5/`: 32 PNG dan tiga pasangan MP4/GIF. Demo: `gift-wrapping`, `avatar-story`, `passport-ceremony`. Ia merakam DOM sebenar; bukan video yang digunakan sebagai permainan. Video avatar menggunakan mikrofon simulasi tanpa suara murid; video hadiah/avatar senyap. MP4 pasport merangkumi bunyi cop WebAudio sebenar; GIF tiada audio dan tidak berulang tanpa henti. Cop Loka 1 dalam media disediakan melalui kemajuan ujian, bukan secara automatik dalam produk.

Media, QA, dokumentasi dan ujian berada di luar `public/` dan tidak disalin ke `dist/`. Media preview sudah dipush melalui komit media sahaja `7129204d257bb7968bbe5148e4bdf6c3b6382321`. Kod dan aset permainan kini diluluskan untuk pelepasan Fasa 5. Tiada penggunaan Outputs. Projek V7 tidak disentuh.

### Keputusan semakan setempat

- Sintaks, 6 ujian Node dan build: **lulus**.
- Suite Loka 2 akhir (termasuk gerakan sebenar SVG, empat gradien kotak berbeza, pemetaan ilustrasi poster, watchdog dan simpanan gagal): **lulus**, 0 pageerror.
- Regresi Loka 1, pasport Loka 1, Gerbang, Perpustakaan, enam perjalanan Ferris, enam Loka, Refleksi/latihan, Rush dan Konsert: **lulus**, 0 pageerror.
- 20 audit paparan biasa + 18 audit tetapan inklusif: **0 pelanggaran dikesan** selepas membetulkan label kontras.
- Perbandingan Git: `loka-one.js`, `loka-one.css`, `styles.css`, `ferris.*`, `ferris-geometry.js`, `library.*`, backend adapter, Apps Script dan Netlify Function tidak berubah. Enjin pasport bersama menerima identiti pilihan tanpa mengubah lalai Loka 1.
- 32 PNG + 3 MP4 H.264 + 3 GIF berjaya dijana; ffprobe mengesahkan video boleh dibaca dan MP4 pasport mempunyai trek AAC. Tiada media/ujian/work/dokumen root dalam `dist/`.
- Semakan pelepasan dijalankan semula sebelum commit; kod Gerbang/Library/Ferris, tiga misi Loka 1 dan backend kekal tidak berubah. Push bukan bukti Netlify Published.
