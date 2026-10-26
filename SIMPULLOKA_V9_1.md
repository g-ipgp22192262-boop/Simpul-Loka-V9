# SimpulLoka V9.1 — versi pembangunan localhost

## Skop

- Gerbang: label versi di penjuru dibuang; tiga langkah tiket → susun empat gambar → bercerita diletakkan di atas kandungan. Jarak hero, tiket dan watak dikemaskan.
- Header: enam pautan sahaja, mengikut susunan Gerbang, Peta Ilmu, Roda Ferris, Imbas Loka, Pasport, Sudut Guru. Header tidak bertindih dengan kawalan permainan. Rush, Pemulihan dan Pengukuhan tidak dipadam sebagai fungsi legasi, tetapi tiada akses daripadanya dalam navigasi/aliran utama.
- Ferris: kemasan warna pastel, emas, bayang dan label; koordinat, kawalan dan mekanik pemilihan gondola dikekalkan.
- Loka 4: Studio Foto Air Muka menggantikan perjalanan pulau/buaian. Empat foto rawak, slot photobooth, seret-lepas dan tekan-pilih, semak, peluang cuba semula, petunjuk bertahap, cetakan jalur foto, Langkau Animasi. Misi 3 menggunakan komponen rakaman LokaStory asal: mula/henti, main semula, rakam semula dan muat turun pilihan. Mikrofon diminta hanya melalui butang Rakam Cerita; audio kekal dalam memori pelayar, tidak dihantar ke Sheets/pelayan. Laluan bercerita langsung bersama guru tersedia jika izin ditolak atau rakaman tidak disokong. Cerita Amir/Sofia dan makna maruah/harga diri dikekalkan.
- Dua item bahasa L4 sedia ada dikekalkan sebagai semakan foto selepas susunan, bukan permainan utama baharu. ID API `l4-p3`/`l4-p4` kekal untuk keserasian PBD; ia bukan lagi nama pulau dalam permainan. Tiada skema/API/GAS ditukar. Skor guru kekal berasingan.
- Loka 5/6: pada desktop, trek/kapal dan kawalan menggunakan dua lajur; geometri, pergerakan, aktiviti, empat gambar dan ganjaran dikekalkan. Telefon menggunakan satu lajur.
- Imbas: enam set empat gambar menggunakan atlas sebenar. Urutan siap murid digunakan jika sah; selainnya urutan contoh. Kenangan/konsert boleh dilihat sebelum lengkap. Refleksi akhir memerlukan enam Loka unik, dengan perasaan, pembelajaran, bintang 1–5 dan ringkasan. Respons kendiri kekal dalam pelayar, bukan skor PBD.
- Pasport: enam ruang cop dengan gaya buku taman tema; ganjaran dan animasi cop Loka sedia ada dikekalkan. Laluan sijil hanya ditawarkan melalui Pasport, dengan syarat enam Loka. Komponen sijil asal kekal tunggal; tiada rekod sijil/ganjaran baharu.
- Sudut Guru: ruang bahan pemulihan/pengukuhan memaparkan status PDF belum tersedia. Bahan HTML sebenar masih boleh dicetak/disimpan sebagai PDF.

## Aset yang belum tersedia dan had audio

Repository hanya menyediakan pautan lagu Suno asal `https://suno.com/s/Mk9omkQDxSYSdnUc`, bukan fail MP3/OGG lagu. Lagu/teks asal dikekalkan dalam Konsert di Imbas. Tiada autoplay; pautan disekat dalam Mod Senyap. Play/Pause/kelantangan lagu kini menggunakan pemain Suno dalam tab luar. Aplikasi tidak boleh menjeda tab luar secara automatik. Fail lagu sebenar diperlukan untuk memenuhi pemain terbina dalam dan auto-pause ketika refleksi sepenuhnya; tiada URL audio/embed rekaan ditambah. Audio arahan aplikasi dihentikan apabila menukar bahagian.

PDF khusus Lembaran Pemulihan dan Lembaran Pengukuhan belum ada. Tiada pautan PDF palsu. Guru perlu menyediakan dua fail tersebut sebelum fungsi buka/muat turun/cetak PDF khusus boleh diaktifkan. Bahan HTML sedia ada tetap berfungsi.

## Perlindungan rekod

Backend, konfigurasi, Apps Script, model PBD, proxy dan keselamatan sesi guru tidak diubah. Fail .env.pbd.local tidak dimasukkan. Kunci tiket, kemajuan dan cop asal dikekalkan. Murid yang sudah lengkap L4 tidak perlu mengulangi aktiviti untuk mengekalkan cop; status gameCorrect lama memulihkan jalur foto dan laluan cerita. Gambar Imbas tidak mengubah kemajuan. V7 tidak disentuh.

Pemilik telah melaporkan sambungan Google sebenar berjaya pada Windows sebelum perubahan ini. Regresi pembangunan menggunakan gateway sebenar dan kod GAS pada simulator Sheets, bukan akses akaun Google pemilik. Ujian Google sebenar selepas kemas kini masih perlu dibuat pemilik.

## Ujian

- npm run check; npm test (32 ujian, termasuk Windows/POSIX dan akses guru); npm run build.
- npm run test:v91 (Playwright/Chromium diperlukan): navigasi enam pautan, kenangan/konsert awal, gate refleksi, empat foto, drag desktop dan tekan telefon, cetakan, laluan lisan, cop/sijil tunggal, tulisan besar/kontras, paparan 390/768/1366, ralat JavaScript.
- npm run test:pbd: tiket, masa, evidens L4 salah→betul, bantuan item, penceritaan tanpa mikrofon, login/cookie/CSRF, skor guru tidak ditimpa, retry, outage/logout dan responsif. Menggunakan simulator, bukan bukti Google sebenar.
- tests/loka-four-browser.mjs dan tests/imbas-loka-browser.mjs menjalankan suite V9.1 semasa menggantikan andaian pulau/rakaman/wizard lama. tests/browser.mjs mengekalkan regresi interaksi enam Loka dan fungsi legasi.
- Screenshot aplikasi sebenar di work/v91/ ialah bahan setempat yang diabaikan Git, bukan aset production.
- Windows sebenar, Safari, pembaca skrin manusia, dan kawalan audio tab Suno tidak boleh disahkan oleh Chromium Linux ini.

## Semua fail sumber dan ujian yang berubah

- package.json
- public/index.html
- public/assets/app.js
- public/assets/ferris.js
- public/assets/imbas-loka-state.js
- public/assets/imbas-loka.js
- public/assets/loka-four.js
- public/assets/loka-five.js
- public/assets/loka-six.js
- public/assets/sudut-guru.js
- public/assets/v91.css (baharu)
- tests/browser.mjs
- tests/imbas-loka-browser.mjs
- tests/imbas-loka-state.test.mjs
- tests/loka-four-browser.mjs
- tests/loka-four-helpers.mjs
- tests/pbd-browser.mjs
- tests/v91-browser.mjs (baharu)
- SIMPULLOKA_V9_1.md (dokumen ini)

## Kemas kini Windows tanpa menyediakan semula environment

1. Hentikan pelayan dengan Ctrl+C. Simpan folder lama sebagai sandaran.
2. Muat turun ZIP branch work dan Extract All ke folder berasingan.
3. Salin kandungan public/ dan tests/ serta package.json dari ZIP ke folder projek Windows sedia ada. Ini memasukkan v91.css dan ujian baharu tanpa menyentuh .env.pbd.local. Jangan salin secara terpilih fail app.js sahaja.
4. Kekalkan backend/, scripts/, konfigurasi dan .env.pbd.local sedia ada daripada versi Windows yang sudah menerima pembetulan build/path terdahulu. Tiada dependency baharu diperlukan.
5. Dalam terminal folder projek: npm run check, npm test, npm run build.
6. Jalankan node --env-file=.env.pbd.local scripts/pbd-dev-server.mjs dan buka http://127.0.0.1:4180/.
7. Gunakan origin yang sama untuk mengekalkan tiket/kemajuan dalam pelayar. Jangan clear site data/localStorage. Cuba tiket rekaan dan simpan penilaian di Sheets untuk mengesahkan sambungan semula.

Tiada deployment hosting atau pengemaskinian Apps Script Google diperlukan untuk perubahan frontend ini. Commit menggunakan penanda skip Netlify/CI.

## Kemasan Pasport, Sijil dan pemulihan rakaman Loka 4

Header/navigasi kekal ungu pekat #3F2458, tab aktif emas. Pasport mengekalkan konsep buku terbuka dengan enam cap bingkai dakwat berganda, nombor Loka, ikon, nama dan status yang padat. Huraian makna panjang dikeluarkan daripada cap (kandungan pembelajaran kekal dalam Loka/Perpustakaan). Sijil menggunakan bingkai emas berhias dan mahkota dengan identiti ungu; syarat enam Loka dan format muat turun SVG tidak berubah.

Fail kemas kini: public/assets/app.js (markup Pasport sahaja), public/assets/loka-four.js, public/assets/loka-six-final.js (grafik SVG Sijil sahaja), public/assets/v91.css, tests/v91-browser.mjs, tests/loka-four-recording-browser.mjs (baharu), SIMPULLOKA_V9_1.md. Tiada perubahan pada modul rakaman bersama, permainan Loka lain, Ferris, Imbas, API, backend, GAS atau environment.

Ujian rakaman: jalankan `node tests/loka-four-recording-browser.mjs` dengan Playwright dan Chromium. Ujian melibatkan MediaRecorder sebenar menggunakan mikrofon sintetik pelayar, replay/rakam semula/download, Mod Senyap, penolakan izin dan laluan lisan; tiada POST audio atau audio dalam localStorage. Pasport diperiksa pada 1366/390/320px dan Sijil pada desktop/telefon. Foto semakan setempat: work/loka4-passport-fix/ (diabaikan Git). Mikrofon perkakasan Windows sebenar dan sambungan Google sebenar masih memerlukan ujian pemilik.

Windows: hentikan pelayan; gantikan empat fail public/assets di atas daripada ZIP branch work tanpa menyentuh .env.pbd.local. Kemas kini tests jika mahu menjalankan regresi browser. Jalankan npm run check, npm test, npm run build, kemudian mulakan semula pelayan PBD seperti biasa.
