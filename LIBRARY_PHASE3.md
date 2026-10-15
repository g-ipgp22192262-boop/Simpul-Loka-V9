# Fasa 3 — Perpustakaan Ajaib

Reka bentuk dan animasi ini diluluskan sebagai versi rasmi Fasa 3.

Halaman `map`/Peta Ilmu kini sebuah perpustakaan fantasi dengan Kitab Ilmu Utama dan enam buku HTML. Tiada kuiz atau cerita panjang ditambah. Mockup asal yang dimuat naik ialah `public/assets/perpustakaan-ajaib.png.png`; namanya diseragamkan kepada `public/assets/perpustakaan-ajaib.png` tanpa mengubah kandungan imej. Ia hanya rujukan seni, bukan antaramuka yang boleh ditekan.

Latar bilik, burung hantu telus dan enam ilustrasi kiasan dijana sebagai aset berasingan. Rak, arka dan roda Ferris dalam latar adalah hiasan; semua enam buku, panel, butang, kemajuan dan pintu Ferris ialah HTML/CSS/JavaScript.

## Interaksi

- Buku membuka native modal `dialog`: nama, satu ilustrasi besar dan maksud ringkas asal `IDIOMS`.
- Tutup/Escape memulihkan fokus ke buku asal; modal memerangkap fokus secara native. Anak panah dan butang membolehkan navigasi buku, Tab/Enter/Space dan sentuhan disokong.
- Zum 180% membolehkan ilustrasi ditatal dalam bingkai, tanpa membuka buku lain atau melebarkan skrin.
- Penanda diteroka disimpan dalam `simpulloka_v9_library_<mode>_<studentId atau guest>`. Data pelajar/guest dan mod backend diasingkan. Ia bukan cop Pasport dan tidak menulis kepada rekod PBD atau Google Sheets.
- Enam buku dibuka memperoleh Kunci Ilmu. Pintu Roda Ferris sentiasa aktif, termasuk apabila 0/6 buku diteroka.
- Fon Andika untuk perpustakaan dibekalkan setempat dalam format WOFF bersama lesen OFL; tiada perubahan fon atau gaya halaman lain. Teks besar, kontras, fokus, kurangkan animasi, senyap dan jarak huruf tetap berfungsi.

## Audio guru sebenar sahaja

Pemetaan `MagicLibrary.audioFiles` dalam `public/assets/library.js`:

| Buku | Fail rakaman di `public/assets/audio/` |
| --- | --- |
| Dalam Tangan | `dalam-tangan.mp3` |
| Ambil Hati | `ambil-hati.mp3` |
| Anak Emas | `anak-emas.mp3` |
| Air Muka | `air-muka.mp3` |
| Mandi Peluh | `mandi-peluh.mp3` |
| Cakap Besar | `cakap-besar.mp3` |
| Kitab Ilmu Utama (pilihan) | `kitab-ilmu.mp3` |

Tiada MP3 sebenar diterima setakat ini. Oleh itu UI memaparkan “Audio cikgu akan ditambah”, tanpa butang main palsu. Tiada panggilan `speech()` atau speech synthesis daripada modul perpustakaan. Build menjana `dist/assets/audio/library-audio.json` berdasarkan fail MP3 yang benar-benar wujud. Fail metadata yang tiada/gagal dibaca memberi status tiada rakaman. Rakaman bermasalah memberi status tidak tersedia; Mod Senyap, tutup buku, tukar buku dan keluar halaman menghentikan pemain. Main/jeda tersedia selepas guru menambah rakaman dan build semula.

## Fail utama

`public/assets/library.js`, `public/assets/library.css`, `public/assets/images/library/`, `public/assets/fonts/library/`, `public/assets/audio/README.md`; integrasi terhad dalam `public/assets/app.js` dan `public/index.html`. `scripts/build.mjs` menjana inventori audio dan mengelakkan dokumen audio dalam production. `package.json` menambah semakan dan arahan `test:library`. Ujian sedia ada hanya dikemas kini pada tajuk halaman yang ditunggu selepas pendaftaran.

## Semakan

`npm run check`, `npm test`, `npm run build`, `npm run test:library`, `npm run test:browser`, `npm run test:ferris`, `node tests/home-browser.mjs` menggunakan pemasangan Playwright seperti ujian sedia ada.

Ujian perpustakaan merangkumi enam maksud/ilustrasi, Kitab, tutup/fokus/keyboard, navigasi, zum, tanda/ganjaran/persistensi dan pengasingan pelajar, pintu tanpa sekatan, tiada penulisan PBD, MP3 tiada, pemain rakaman melalui mock ujian sahaja, jeda, senyap, ralat media, telefon sentuh, 320/390/768/1024/1440px dan tetapan inklusif. Ujian build mengesahkan inventori audio mencerminkan fail dan media semakan tidak diterbitkan. Tiada rakaman palsu disimpan sebagai aset production.

Had: belum menerima atau mendengar rakaman guru sebenar; interaksi audio diuji melalui mock player. Chromium sahaja; bukan ujian fizikal pembaca skrin atau Safari/iOS. Status deployment mesti disahkan secara berasingan daripada keputusan build setempat.

## Media semakan

Media semakan terdahulu telah dikongsi melalui GitHub dalam `preview-screenshots/library-phase3/`, termasuk `library-book-animation.mp4`, `library-book-animation.gif`, `book-spread-desktop.png` dan `book-spread-mobile.png`. Media ini berada di luar `public/` dan tidak disalin ke `dist/`.

## Animasi buku untuk semakan
Buku HTML diklon sebagai elemen dialog, diangkat 24px dan bergerak daripada koordinat rak sebenar ke tengah. Kulit berengsel menggunakan Web Animations API (rotateY), kemudian memaparkan dua halaman HTML: ilustrasi kiri dan makna/audio kanan. Menutup membalikkan urutan dan memulangkan buku ke kedudukan rak sebenar. Pembukaan sekitar 1.9 saat; penutupan 1.3 saat.

Langkau, Escape, Mod Fokus, Kurangkan Animasi dan prefers-reduced-motion disokong. Watchdog, kegagalan API animasi, perubahan saiz viewport dan tab tersembunyi menyelesaikan peralihan tanpa menyekat pembacaan. Semua kandungan dan storan penerokaan dikekalkan. Media demonstrasi dirakam daripada pergerakan DOM sebenar, bukan digunakan sebagai antaramuka.
