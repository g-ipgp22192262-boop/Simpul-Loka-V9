# Fasa 2 — Roda Ferris interaktif yang diluluskan

## Siap dan berfungsi

Halaman Roda Ferris menggunakan roda SVG berputar, sokongan tetap, enam kabin berasingan, pintu berengsel, penumpang dan panel depan kabin. Latar pentas baharu dijana berpandukan identiti Halaman Utama; fail latar/karakter Halaman Utama tidak diubah. Roda ialah lapisan mekanikal sebenar, bukan pautan di atas gambar latar.

Setiap gondola dan butang senarai membuka pilihan yang sama: Dalam Tangan/Jatuhkan Botol, Ambil Hati/Kedai Cenderamata, Anak Emas/Memanah, Air Muka/Swing Ride, Mandi Peluh/Roller Coaster, Cakap Besar/Pirate Ship. Gondola menunggu dalam keadaan diam supaya sasaran mudah ditekan. Selepas dipilih, roda sejajar ke pelantar bawah, haiwan tiket berjalan/melompat kecil, pintu terbuka, haiwan masuk dan duduk di belakang panel depan, pintu ditutup, roda berputar 18 darjah dan kamera zoom ke kabin. Tajuk Loka muncul sebelum `enterLoka(index)` asal dipanggil. Tempoh normal kira-kira 4.2 saat (sekitar 4.3 saat dalam Chromium termasuk frame/navigasi).

Semua geometri menggunakan koordinat 1000×840, pusat (500,330), jejari 230. Hujung jejari dan pin kabin sepadan; kabin kekal tegak. Slot penumpang, destinasi avatar dan titik kamera dikira daripada koordinat sama. Tiada koordinat DOM piksel berasingan yang boleh tersasar apabila skrin berubah.

Mod Fokus membuka Loka selepas kira-kira 450 ms tanpa putaran/zoom; Kurangkan Animasi atau tetapan sistem reduced motion menempatkan penumpang terus di gondola dan membuka selepas kira-kira 180 ms. Mod Senyap disimpan dalam tetapan dan menyekat sintesis pertuturan. Tiada bunyi automatik. Langkau Animasi atau Escape membuka pilihan semasa. Pertukaran halaman membatalkan semua callback. Klik berulang tidak memulakan dua perjalanan. Pemasa sandaran 4.9 saat membuka Loka walaupun animation frame tidak berjalan; tab yang disembunyikan juga tidak membiarkan perjalanan tersekat.

Butang HTML sebenar menyokong Tab/Enter/Space, anak panah, Home/End, sentuhan, status skrin pembaca, fokus yang jelas dan label maksud/tarikan/kemajuan. Senarai di sisi/bawah menyediakan label penuh yang lebih besar pada telefon. Saiz teks besar, kontras dan jarak luas dikekalkan. Roda tidak menulis kemajuan; cop/glow dibaca daripada `progress` sedia ada. Loka yang lengkap boleh dimainkan semula. Tiada perubahan Apps Script, Sheets, struktur PBD, backend, kandungan Loka atau Rush.

## Batas visual / aset akhir yang diperlukan

**Reka bentuk serta mekanisme ini diluluskan pengguna pada 16 Oktober 2026.** Ilustrasi vektor berlapis kekal sebagai asas rasmi; grafik akhir boleh diperhalus tanpa mengganti mekanisme interaktif dengan imej statik.

- Roda emas/ungu berilustrasi 2.5D, lapisan lingkaran/jejari/hab berputar dengan pusat dan jejari sama.
- Sokongan roda, pelantar dan papan tanda sebagai lapisan tetap, latar telus.
- Enam kabin berlatar telus dalam warna tersendiri: badan belakang, pintu terbuka/tertutup, tingkap dan panel depan berasingan. Pin atas dan slot tempat duduk mesti sejajar dengan koordinat prototaip.
- Empat haiwan tiket (panda, harimau, kucing, ulat): sprite idle, berjalan/melompat, masuk dan duduk, dengan titik kaki/duduk konsisten. Sprite vektor kini menggunakan gerakan posisi, hop ringan dan skala; bukan animasi rangka watak akhir.
- Enam ikon tarikan berilustrasi dan cop pasport akhir. Emblem vektor semasa boleh diganti tanpa mengubah logik.
- Pilihan audio masa depan perlu kelulusan; sistem kini senyap kecuali arahan audio yang diminta secara manual.

## Fail

- `public/assets/ferris-geometry.js`: matematik kedudukan/kamera.
- `public/assets/ferris.js`: halaman, state animasi, pintu, pilihan dan lifecycle.
- `public/assets/ferris.css`: gaya halaman sahaja.
- `public/assets/images/ferris-prototype/`: aset sementara berlapis dan latar pentas.
- `public/assets/app.js`: delegasi halaman roda dan lifecycle; tetapan Senyap.
- `public/index.html`: muatan skrip/gaya serta checkbox Senyap.
- `package.json`: semakan sintaks dua fail dan arahan `test:ferris`.
- `tests/ferris-geometry.test.mjs`, `tests/ferris-browser.mjs`: geometri dan ujian browser.

## Ujian

`npm run check`, `npm test`, `npm run build`. Untuk browser gunakan Playwright dan pelayan setempat port 4173 seperti README; `npm run test:ferris`, `npm run test:browser` dan `node tests/home-browser.mjs`. Pilih pemasangan Chromium sedia ada melalui `PLAYWRIGHT_MODULE`/`CHROMIUM_PATH` jika perlu.

Diuji dalam Chromium headless: semua enam animasi penuh dengan empat haiwan, penjajaran pelantar, sembilan fasa, ulang Loka selesai, tidak menulis kemajuan, pendaftaran/tiket diperlukan, keyboard, skip, klik berganda, perubahan preference semasa animasi, keluar halaman, frame tidak dihantar, aset SVG gagal dimuat, Mod Senyap/Fokus/Reduce/OS reduced motion, sentuhan 390px, skrin 320/768px, teks sangat besar dan jarak luas tanpa overflow. Regresi Halaman Utama, enam Loka, Refleksi/Pemulihan/Pengukuhan, Rush dan Konsert turut lulus dengan 0 pageerror.

Had pengesahan: Chromium sahaja; bukan semakan fizikal pembaca skrin, iOS/Safari atau integrasi Google sekolah sebenar. Screenshot QA berada dalam `work/`, diabaikan Git dan tidak masuk build. Kod Fasa 2 disediakan untuk commit/push ke branch `work` selepas semakan akhir. Screenshot/video semakan berada di luar `public/` dan tidak disalin ke production.

## Kemasan kelulusan

Avatar berjalan dan penumpang dibesarkan 20% dengan titik kaki dan pusat duduk yang dikekalkan. Fasa duduk dan tutup pintu dipisahkan sebelum roda bergerak. Cahaya radial lembut muncul bersama zoom; tiada kilatan atau cahaya bergerak dalam Mod Fokus/Reduce. Semasa bergerak, hanya label terapung pilihan dipaparkan supaya tidak bertindih; enam nama penuh kekal dalam senarai tetap yang boleh diakses. Tempoh keseluruhan masih kira-kira 4.2 saat.
