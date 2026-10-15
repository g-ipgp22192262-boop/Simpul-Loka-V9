# Upacara Cop Pasport Ajaib Loka 1 — versi rasmi diluluskan

Status: reka bentuk dan animasi diluluskan pengguna pada 16 Oktober 2026 (Malaysia). Dokumen ini disertakan dalam pelepasan kod rasmi; Published Netlify memerlukan bukti remote berasingan.

## Skop

Skrin penamat sahaja. `public/assets/loka-one-reward.js` membina pasport HTML dua halaman, kulit berengsel, cop kayu SVG, lambang botol, konfeti/kilauan terhad dan pembantu Loka menggunakan avatar tiket. `loka-one-reward.css` menggunakan selector skrin penamat sahaja. Latar menggunakan aset pentas V2 sedia ada; tiada perubahan aset Gerbang/Perpustakaan/Ferris atau tiga misi.

`loka-one.js` hanya mendelegasikan markup ganjaran dan lifecycle kepada modul baharu. Fungsi makna, permainan botol, susunan, rekod mikrofon, `finish`, `sync`, pemerhatian guru serta payload backend kekal sama. `index.html` memuatkan fail baharu; `package.json` menambah semakan sintaks dan `test:reward`.

## Animasi dan ganjaran

Urutan normal sekitar 3.3 saat: kulit pasport terbuka → cop kayu turun → hentakan kecil dan bunyi kayu lembut → lambang Loka 1/botol tercetak → konfeti dan kilauan sekali → pembantu muncul. Semua ini DOM/SVG/Web Animations API sebenar, bukan video atau gambar statik. Bunyi cop ialah denyutan WebAudio pendek (bukan suara AI, tiada muat turun fail bunyi luaran).

`stampCeremonyDone` ditambah kepada rekod permainan setempat murid yang sedia ada `simpulloka_v9_loka1_<mode>_<studentId>`. Ia ditandakan sebelum animasi bermula supaya keluar halaman, reload, Langkau atau perubahan preference tidak mengulang upacara. Status `finished` dan cop backend tidak digantikan oleh flag animasi. Ganjaran kekal kelihatan walaupun animasi/bunyi gagal. Memadam data pelayar boleh memadam flag setempat; ini tidak memadam cop sekolah yang telah disimpan.

Mod Fokus, Kurangkan Animasi dan OS reduced motion memaparkan pasport terbuka serta cop akhir terus tanpa pergerakan/hentakan/konfeti. Mod Senyap tidak mewujudkan AudioContext dan menghentikan konteks yang sudah wujud jika ditukar semasa animasi. Langkau sentiasa menyelesaikan paparan dengan selamat. Pemasa sandaran 4.5 saat dan pengendalian tab tersembunyi mengelakkan animasi tergantung. Tiada animasi berkelip atau loop tanpa henti.

Tiada dialog/trap fokus baharu. Grafik perayaan tersembunyi daripada pembaca skrin; tiga misi dan cop mempunyai label tetap. Status pendek diumumkan secara polite pada mula/akhir. Jika butang Langkau sedang mempunyai fokus ketika disembunyikan, fokus dipulihkan ke Kembali ke Roda Ferris. Semua destinasi kekal boleh digunakan semasa animasi.

## Destinasi dan PBD

- Kembali ke Roda Ferris menggunakan navigasi asal.
- Teruskan ke Loka 2 hanya aktif apabila tiket dan destinasi sebenar tersedia. Loka 2 **asal** (Ambil Hati) sudah tersedia; butang membukanya, bukan mendakwa mini permainan tiga misi Loka 2 baharu siap.
- Ruang Pemerhatian PBD ialah details boleh buka/tutup, catatan setempat dan pautan Sudut Cikgu sedia ada. Bukan TP automatik atau markah botol.
- Segerakkan Kemajuan menggunakan `LokaOne.sync()` asal; tiada perubahan Google Apps Script/Sheets/backend.

## Pengujian dan media

`npm run check`, `npm test`, `npm run build`; browser `npm run test:reward`, `test:loka1`, `test:browser`, `test:ferris`, `test:library` dan `node tests/home-browser.mjs`.

Suite ganjaran meliputi fasa sebenar/gerakan cop, simpan/pulih flag dan cop selepas reload, catatan PBD, laluan Loka 2, Langkau setiap fasa/fokus, Focus/Reduce/Senyap/OS, bunyi/animasi gagal, keluar halaman, keyboard/sentuhan, 320/390/768/1024/1440px dan mod tulisan/Andika/kontras. Audit axe dilakukan pada skrin penamat desktop dan telefon; bukan pensijilan atau pengganti ujian peranti/pembaca skrin fizikal.

Sepuluh media semakan telah dikongsi melalui komit media sahaja `c155d2bb1a6c44b290dc58379e16d240695478ba` dalam `preview-screenshots/loka1-passport/`: `before-desktop.png`, `before-mobile.png`, `stamp-desktop.png`, `stamp-mobile.png`, `passport-desktop.png`, `passport-mobile.png`, `focus-desktop.png`, `focus-mobile.png`, `passport-ceremony.mp4`, `passport-ceremony.gif`. MP4 merakam animasi DOM dan bunyi cop WebAudio sebenar; GIF tiada audio dan tidak berulang tanpa henti. Bingkai awal/hentakan dijeda melalui skrip QA sahaja bagi tangkapan PNG, tanpa mengubah kod produk. Tiada suara murid digunakan. Media berada di luar `public/` dan tidak disalin ke build production.
