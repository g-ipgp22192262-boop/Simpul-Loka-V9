# Loka 6 — Cakap Besar: Kapal Lanun Ombak Ajaib

Status: Loka 6 dan Grand Finale diluluskan pengguna. Check/test/build serta ujian kritikal browser disahkan semula sebelum release. Tiada deployment Netlify, Cloudflare atau hosting lain. Imbas Loka dan Sudut Guru tidak dibangunkan dalam sesi ini.

## Asas dan skop

Loka 5 yang diluluskan disahkan sepadan dengan snapshot sumber semasa video four-stations.mp4 dan coaster-overview.mp4 dihasilkan. Check/test/build lulus, kemudian 20 fail berkaitan sahaja di-commit dan dipush pada `7d7e43c0904ba74a3961acadd7e67e26b424de79`. Loka 4 rasmi ialah `843284f79304cdf12f29c6314dc85bed15263d5e`. HOME_PREVIEW.md sedia ada tidak disentuh.

Mockup ASAL `public/assets/loka6-mockup.png` diperiksa. Ia digunakan sebagai rujukan, bukan UI statik. Latar laguna, badan kapal, kapal mainan, pengembara dan atlas empat gambar cerita ialah aset berasingan yang dimampatkan ke WebP (sekitar 1MB keseluruhan). Teks, butang, zon bintang, rakaman dan aktiviti ialah elemen sebenar. Kebanyakan hiasan statik dalam Mod Biasa juga; tiada bendera/ombak/kamera bergerak serentak.

## Tepat tiga misi

1. **Teroka Makna:** Peta Ilmu cakap besar, maksud rasmi dan contoh Hakim, ilustrasi besar, audio arahan atas pilihan pengguna, zum, penerangan bahawa cakap besar bukan suara kuat.
2. **Cabaran Loka:** avatar pilihan murid dan dua pengembara menaiki kapal, palang keselamatan, Pam Kiri/Kanan, Tengah/Berhenti, zon bintang yang luas, Bantuan Ajaib dan Langkau. Empat stesen mengikut urutan; kapal dan kawalan ayunan dikeluarkan semasa panel aktiviti dibuka supaya satu skrin mempunyai satu fokus. Stesen 1 dialog bermegah; Stesen 2 kapal mainan bergerak melalui tiga lorong dan empat baris batu dengan collision dan bantuan; Stesen 3 Faris membantu; Stesen 4 contoh ayat. Satu kad unik setiap stesen. Selepas empat kad, sistem susun bersama dirawakkan; seret dan butang tersedia. Tiga tahap petunjuk termasuk urutan berbantu dengan penerangan.
3. **Pentas Cerita:** komponen LokaStory sedia ada. Avatar pilihan murid, mulut/tangan ketika merakam dan mendengar, MediaRecorder sebenar selepas izin, henti/main semula/rakam semula/muat turun. Audio blob sementara sahaja, tiada muat naik atau simpanan audio dalam localStorage/backend. Laluan lisan dan mesej mikrofon ditolak/tidak disokong. Soalan panduan dan bantuan ayat boleh buka/tutup.

Selepas bercerita, Ayunan Terakhir 3.7 saat meriah tetapi terkawal, kemudian 0.6 saat ketibaan sebelum pasport. Ini bukan misi keempat. State told disimpan sebelum animasi; pintu masuk menyediakan sambung penamat jika tergendala. Skip terus menyelesaikan penamat. Watchdog setiap animasi memastikan tiada pergantungan mutlak kepada RAF.

## Geometri dan kawalan

`LokaSixMotion` menggunakan radian/saat dengan graviti, damping dan momentum, had sudut 0.72 radian. Pivot SVG tetap (500,80), panjang pusat kapal 350. Kapal, avatar dan tali berada dalam kumpulan transform yang sama; sasaran bintang menggunakan geometri bulatan yang sama. Manual menambah momentum, Tengah memberhentikan berhampiran sasaran dalam toleransi 0.22 radian. Dua cubaan menawarkan bantuan tanpa menghalang cuba sendiri. Auto menggunakan kawalan spring/damping menuju sudut sasaran sebenar, bukan butang palsu. Tiada penalti/had masa. Anak panah dan Space tersedia di kawasan permainan, Enter/Space pada butang. Langkau dan bantuan sentiasa ada.

## Pasport dan ganjaran bersama

Kemajuan menggunakan rekod asal ID 6 melalui saveProgress. Pasport LokaPassport asal, cop terdahulu hanya berdasarkan progress yang benar-benar completed, bukan ditandakan secara paksa. Upacara dan cop sekali bagi kejayaan baharu. PBD guru kekal berasingan daripada permainan, nota setempat boleh buka/tutup, tiada TP automatik.

Tambahan terhad `LokaRewards.finalReceipt()` menggunakan kunci resit bersama yang sedia ada. Tiada salinan kemajuan atau pangkalan data kedua. Enam Loka unik sahaja membolehkan resit emas; played disimpan sekali sebelum animasi. Syarat tiga Loka merah jambu tidak diubah. LokaSixFinal menunggu upacara cop/ganjaran merah jambu tamat, kemudian membentuk gula kapas emas secara berperingkat tanpa kilatan. Sijil hanya tersedia apabila count===6, nama/kelas sebenar sesi dan enam Loka; muat turun SVG bebas resolusi yang boleh dibuka/cetak melalui pelayar. Sijil ialah ganjaran aktiviti, bukan penilaian PBD. Tiada Loka 7; Imbas Loka dinyatakan belum tersedia.

## Inklusif dan lifecycle

Fokus/Reduce/OS reduced motion memendekkan boarding/penamat dan menghentikan momentum manual; klik masih mengubah sudut dengan langkah ringkas, auto/skip masih membuka stesen. Senyap menghentikan audio pilihan/main semula, bukan mikrofon. Fon Andika, besar/sangat besar, jarak luas, kontras, papan kekunci, sentuhan, zum dialog/Escape dan bantuan dikekalkan. Animasi utama dipulihkan oleh watchdog. Keluar halaman membersihkan RAF, timer, stream, audio blob, listener, pasport dan ganjaran. Aktiviti disimpan mengikut murid/mode dengan kunci simpulloka_v9_loka6_*. Input dinormalisasikan ketika reload.

## Fail dan integrasi

Baharu: loka-six.js, loka-six-motion.js, loka-six-final.js, loka-six.css; enam WebP dalam assets/images/loka6; ujian browser/helper/motion; dokumen ini.
Integrasi: app.js route/lifecycle/preference Loka 6 serta nama tarikan/maksud; index.html muat modul; package.json check/test:loka6; LokaRewards API resit akhir dan ujiannya; tests/browser.mjs menggantikan aliran lama Loka 6 dengan permainan sebenar. Kod permainan Loka 1–5, reka bentuk Fasa 1–3, backend dan V7 tidak diubah.

## QA dan media

Perintah: npm run check && npm test && npm run build; test:loka6; regresi test:loka1 hingga test:loka5 dan test:browser. Ujian geometri, damping, auto sasaran, penamat tepat tengah dan resit emas enam unik. Browser menguji kawalan sebenar, aktiviti, rakaman/muat turun/privasi, kegagalan mikrofon, ganjaran, nota guru, ulang lawatan, mod inklusif dan lebar 320–1440px. Ujian suntikan RAF gagal menggunakan polling timer supaya harness tidak turut tersekat pada RAF yang sengaja dimatikan.

Media preview daripada browser sebenar di preview-screenshots/loka6/. Satu MP4 ringkasan segmen sebenar untuk boarding, manual/auto, kapal mainan, avatar, ayunan akhir dan pasport/emas. Tiada mockup sebagai bukti fungsi. Rakaman video senyap, mikrofon Chromium simulasi dan data murid ujian. Batas: emulasi Chromium bukan Safari/iOS/mikrofon fizikal; audit automatik tidak menggantikan pembaca skrin manusia. Backend sekolah sebenar tidak diuji atau diubah. Tunggu kelulusan reka bentuk/interaksi sebelum commit kod.

### Keputusan semakan semasa

Check/test/build dan ujian penuh browser Loka 6 lulus (sifar pageerror). 24 audit axe statik desktop/telefon tanpa pelanggaran dikesan. 28 PNG sebenar dan satu MP4 sekitar 20 saat dihasilkan. Tangkapan komponen diperbaharui dengan header melekat disembunyikan dalam capture sahaja supaya kandungan tidak ditindih; aplikasi tidak diubah untuk tujuan ini. Semua media didekod, PNG bukan hitam/kosong, video penuh boleh didekod dan bingkai berubah. Regresi Loka 1–5 serta global dicatat dalam work/loka6/regression.log; keputusan akhir dilaporkan selepas proses tamat. Kod Loka 6 kekal menunggu kelulusan.

Penanda bintang dipaparkan di atas zon dengan garis penunjuk agar tidak terlindung oleh badan kapal. Elips sasaran, pivot, sudut dan toleransi kekal sama. Arahan menyebut arah Kiri/Kanan mengikut sasaran semasa. Media dikemas kini selepas semakan keterlihatan sasaran.

Keputusan akhir: semua regresi Loka 1–5 dan browser global lulus, termasuk Rush/Konsert. Ujian penuh Loka 6 diulang selepas penanda bintang dijelaskan dan lulus dengan sifar pageerror. Audit terakhir 24 paparan semuanya sifar pelanggaran. Tiada kod Loka 6 di-commit/push dan tiada deployment.
