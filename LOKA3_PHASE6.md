# Fasa 6 — Anak Emas: Arena Memanah Diraja

**Status: reka bentuk, interaksi dan pembangunan Loka 3 telah diluluskan pengguna. Kod, aset, ujian dan dokumentasi dibenarkan untuk commit/push ke `work`; deployment Netlify tidak dibenarkan dalam pelepasan ini.** Asas ialah pelepasan Loka 2 yang diluluskan, `7b19eb7a90da3600e54418c83632b14e1a1e1bff`. Projek V7 dan backend V9 tidak diubah.

## Pengalaman sebenar

Gerbang mempunyai butang Mula Pengembaraan dan avatar tiket; ia bukan misi keempat. Kemudian tepat tiga misi: Teroka Makna, Cabaran Loka dan Pentas Cerita. Murid hanya melihat satu tugasan utama pada satu masa.

Misi 1 menggunakan Vanessa/Cikgu Aina, maksud tepat “Orang yang sangat disayangi atau diberikan layanan istimewa”, tiga jawapan rasmi dan penjelasan bahawa membantu guru semata-mata bukan maksud anak emas. Situasi penuh boleh dibuka dalam details dan dibaca melalui audio arahan pelayar sedia ada. Semua murid tetap dihargai; ilustrasi tidak menggalakkan pilih kasih.

Misi 2 menggunakan SVG berlapis di atas latar arena. Koordinat aim, putaran busur, tali, nock anak panah, penerbangan, hujung anak panah, perlanggaran dan anak panah yang melekat berkongsi sistem viewBox yang sama. Pointer dipetakan melalui matriks SVG sebenar, termasuk pada telefon. Tarik tali ke belakang lalu lepaskan, atau gunakan Halakan/Panah. Kawalan arah dan sentuh sasaran tersedia; sasaran besar, toleransi munasabah, tambah tiga anak panah tanpa hukuman, petunjuk dan Langkau. Panahan tersasar tidak membuka gambar. Setiap hit membuka satu gambar; selepas empat hit barulah arena digantikan dengan susunan rawak, seret-lepas atau pilih/letak/keluar/alihtempat melalui butang. Markah 25 setiap hit bukan TP.

Empat ilustrasi berbeza dan konsisten: aktiviti diperkenalkan kepada semua murid; Vanessa dipilih mengagihkan bahan; tugas dilakukan dan dipuji; kepercayaan/perhatian istimewa diperhatikan rakan. Kapsyen jawapan panjang tidak ditunjukkan pada bank gambar; penjelasan berada dalam zum/petunjuk/label aksesibiliti.

Misi 3 menggunakan `LokaStory` bersama: avatar tiket besar dengan mulut/tangan berartikulasi, Mula Bercerita, Selesai Bercerita, Dengar Semula, Rakam Semula, muat turun pilihan dan laluan lisan tanpa mikrofon. Bantuan Ringkas/Sederhana/Lanjutan ialah rangka ayat rasmi dengan ruang murid melengkapkan sendiri. Rakaman tidak diwajibkan.

## Pasport dan peraturan ganjaran

`LokaPassport` (alias enjin cop asal) menerima ikon sasaran/anak panah, tanda kayu tersendiri dan cop terdahulu yang benar-benar selesai. Tiada Loka lain ditandakan selesai secara automatik. Flag upacara berada dalam state Loka 3; lawatan semula tidak mengulangnya. Langkau, Focus/Reduce/OS, Senyap, ralat animasi/audio dan pemasa sandaran mengekalkan ganjaran serta navigasi. Destinasi berikut membuka aktiviti asal Air Muka yang tersedia; tidak membina Loka 4.

Peraturan bersama kini ialah **satu Loka = satu cop; mana-mana tiga Loka unik = Gula Kapas Ajaib Pertama; enam Loka unik = kelayakan Gula Kapas Emas Istimewa dan sijil pada fasa akhir**. Loka 3 sahaja tidak memberi gula kapas. Jumlah dikira daripada enam rekod `progress` sebenar, ditapis ID sah dan status completed; bukan daripada markah panahan atau nombor halaman. Penerimaan simpanan kemajuan sahaja mencetuskan pengesanan ambang; gagal simpan tidak mereka ganjaran sekolah.

`loka-rewards.js` menyimpan resit animasi/ganjaran setempat dalam `simpulloka_v9_reward_receipts_<mode>_<studentId>`, bukan pangkalan data kemajuan kedua. Ia tidak menyalin kemajuan atau menulis semula rekod Loka 1/2. Resit `three.earned/played` menghalang animasi berulang; dimainkan sekali selepas upacara cop selesai. Mesin SVG memusingkan pusat, membentuk gumpalan gula kapas berperingkat, mengikat reben dan memberi bintang terhad. Flag dimainkan disimpan sebelum animasi; Langkau/keluar/ralat tetap memberi hasil akhir. Rekod lama yang sudah mempunyai tiga Loka dikenali tanpa mengulang perayaan secara retroaktif. Struktur `six.earned` disediakan; sijil lengkap belum dibina dan UI menyatakannya.

Pengiraan/resit digunakan oleh semua Loka melalui adapter panggilan frontend sedia ada. Teks ganjaran lama per-Loka di Pasport, ucapan tamat, petunjuk Gerbang dan lirik Konsert dibetulkan secara terhad; reka bentuk halaman tersebut tidak dirombak. Pendaftaran tiket baharu mengosongkan state paparan murid sebelumnya; respons lama ditapis mengikut pemilik sesi sebelum mencetuskan ganjaran. Rekod murid lama tidak dipadam.

## Fail

- Baharu: `public/assets/loka-three.js`, `loka-three-art.js`, `loka-three.css`.
- Baharu dan boleh guna semula: `loka-sequence.js`, `loka-rewards.js`, `loka-rewards.css`.
- Aset `public/assets/images/loka3/royal-arena.webp` dan `vanessa-story.webp`: ilustrasi dijana berpandukan mockup dan dimampatkan; telah diluluskan melalui preview aplikasi sebenar. Mockup rasmi tidak diubah atau digunakan sebagai UI.
- `loka-story.js`: penjana panel cerita pilihan dan label Stop pilihan ditambah; logik perakam asal Loka 1/2 dikekalkan.
- `loka-one-reward.js`: simbol/ukiran pilihan dan event selesai cop untuk menyambung perayaan; nilai lalai Loka 1/2 dikekalkan.
- `app.js`, `index.html`, `package.json`: routing indeks 2, lifecycle/preference, muatan, ganjaran rasmi dan skrip ujian.
- `tests/loka-three-browser.mjs`, `loka-three-helpers.mjs`, `loka-rewards.test.mjs`; regresi `tests/browser.mjs` melalui arena sebenar, bukan aliran lama Loka 3.

## Privasi, PBD dan inklusif

State Loka 3: `simpulloka_v9_loka3_<mode>_<studentId>`. `saveProgress` menggunakan lokaId 3, percubaan susunan, petunjuk, susunan betul, makna dan penceritaan melalui kontrak asal. Panahan/klik tidak dijadikan TP. Catatan pemerhatian setempat dalam details dan pautan Sudut Cikgu kekal berasingan; pentaksiran rasmi memerlukan pertimbangan guru.

Blob, URL dan chunks audio kekal dalam memori; tiada audio/base64 dihantar atau disimpan di localStorage/Sheets. Izin hanya selepas klik. Trek/URL dibersihkan ketika keluar/tamat/ulang; izin lewat ditutup. Senyap menyekat main balik/bacaan/bunyi cop tetapi tidak menghalang rakaman atau jawapan lisan. Tiada rakaman suara guru palsu ditambah; Dengar Arahan ialah bacaan pelayar sedia ada, bukan MP3 guru.

Andika, tulisan besar, jarak luas, kontras, Fokus, Kurangkan Animasi, OS reduced motion, sentuhan, papan kekunci, butang alternatif, zoom Escape dan petunjuk bertahap dikekalkan. Fokus menghentikan hiasan dan gerakan avatar tetapi mengekalkan panahan ringkas/rakaman. Tiada bendera berulang, strob atau bunyi kuat. Pemasa sandaran menyelesaikan panahan jika RAF gagal; upacara dan mesin mempunyai watchdog sendiri. Grafik animasi aria-hidden dan status ringkas polite; fokus Langkau dipulihkan.

## Pengujian dan media

Perintah: `npm run check && npm test && npm run build`, `npm run test:loka3`, `test:loka2`, `test:loka1`, `test:reward`, `test:browser`, `test:ferris`, `test:library` dan `node tests/home-browser.mjs`. Suite Loka 3 menggunakan browser sebenar, mikrofon simulasi ujian (bukan rakaman murid), pointer dan sentuhan, ukuran hujung anak panah pada sasaran, urutan/ganjaran/persistensi serta mod inklusif. Node menguji ambang unik, tiada ganjaran automatik Loka 3, resit berulang, enam Loka dan pengasingan murid.

Media berada dalam `preview-screenshots/loka3-phase6/`, di luar `public/`: PNG desktop/telefon, MP4/GIF archery, susunan, avatar, cop dan mesin gula kapas. Semuanya tangkapan DOM aplikasi; bukan mockup. Bingkai animasi PNG dijeda melalui skrip QA sahaja. Video avatar menggunakan mikrofon simulasi tanpa suara murid; MP4 cop menggunakan bunyi WebAudio sebenar. GIF tiada audio dan tidak berulang tanpa henti. Skrip QA/audit/frames berada dalam `work/loka3/` dan tidak dihantar ke production.

Batas: ujian Chromium headless dan mikrofon simulasi; Safari/iOS, mikrofon fizikal, pembaca skrin manusia, akaun Sheets/PBD sekolah sebenar serta Published Netlify memerlukan pengesahan berasingan. Kod Fasa 6 tidak diterbitkan melalui commit media; jangan samakan preview GitHub dengan website live.

## Pelepasan diluluskan — 16 Oktober 2026

Pembetulan telefon mengendalikan sentuhan Halakan/Panah terus pada `pointerup`, menolak gerakan yang bukan tap serta menapis klik keserasian yang berganda. Klik tetikus dan pengaktifan papan kekunci dikekalkan. Pointer capture pada arena dilepaskan apabila tarikan tamat. Mekanik sasaran, hit, bilangan gambar dan urutan misi tidak diubah.

38 fail media telah dipush berasingan melalui commit `336fa72a047cb1436e8a64b479b63dd62e244129`: 28 PNG, lima MP4 dan lima GIF. Semuanya lulus pemeriksaan fail; MP4 dinyahkod sepenuhnya dan semua bingkai GIF dibaca. Audit preview terdahulu: 18 keadaan biasa dan 12 keadaan inklusif, tiada pelanggaran axe dikesan.

Pelepasan kod menggunakan penanda `[skip netlify] [skip ci]` kerana pengguna meminta push tanpa deployment. Konfigurasi Netlify dan backend tidak diubah. Fail scratch `work/`, `HOME_PREVIEW.md`, screenshot sementara dan debug tidak termasuk dalam pelepasan kod. Loka 4 tidak dibangunkan.

Semakan akhir pelepasan: `npm run check && npm test && npm run build` lulus (empat fail suite Node). Suite browser Loka 3 lulus termasuk seretan sentuhan sebenar diikuti tap Halakan/Panah, alternatif papan kekunci, 320–1440px, perakam mikrofon simulasi, laluan lisan, cop/resit ganjaran sekali sahaja dan sifar pageerror.

Regresi akhir `test:loka1`, `test:loka2`, `test:reward` dan `test:browser` juga lulus dengan sifar pageerror: tiga misi terdahulu, perakam/laluan tanpa mikrofon, nota guru, simpanan pasport, Gerbang/navigasi, Mod Inklusif, Rush, Konsert dan paparan telefon. Ujian Roda Ferris/Perpustakaan telah lulus pada semakan preview sebelumnya; fail pelaksanaannya tidak diubah selepas itu.
