# Hasil ujian — 15 Oktober 2026

- `npm run check`: lulus (sintaks frontend dan Netlify Function).
- `npm test`: lulus (simpan/pulih murid, enam Loka, status kekal, refleksi, Rush, penolakan token salah, sekatan dashboard tanpa backend, JSON simpanan rosak; proxy tanpa konfigurasi, allowlist, rahsia upstream dan kegagalan login guru melalui mock).
- `npm run build`: lulus. `dist/` hanya mengandungi HTML/CSS/JavaScript frontend; kod Apps Script tidak diterbitkan.
- Chromium headless sebenar: lulus; **0 `pageerror`** sepanjang aliran.
- Browser: Gerbang, semua halaman navigasi, sekatan Rush sebelum enam cop, Mod Inklusif (saiz tulisan dan kurang gerakan), susun ayat semua enam Loka, SIMPUL, Studio Cerita dan cop, reload sesi, refleksi, Pemulihan, Pengukuhan, Rush kiri/lompat, animasi hingga gerbang pertama, jawapan salah/cuba lagi, butang audio soalan, enam jawapan, buka Konsert dan paparan mudah alih 390px.
- Menunggu gerbang berikutnya dipendekkan melalui state ujian sahaja. Tiada pemendekan dalam kod produk.
- Arkib sumber asal tidak diubah. Tiada sumber V7 atau deployment luaran disentuh.

Belum diuji: deployment Netlify sebenar, akaun Google/Sheets sebenar, login guru dan CSV dengan data sekolah sebenar, mikrofon fizikal, output suara OS dan lagu luaran. Proxy diuji dengan respons tiruan; ujian browser menggunakan simpanan setempat. Tiada tuntutan bahawa site telah diterbitkan.

## Halaman Utama 2.5D yang diluluskan — 15 Oktober 2026 (Malaysia)

- Asas visual diluluskan pengguna; komposisi utama dikekalkan. Foreground dicerahkan sedikit dan teks tiket/panel/butang diperbesar.
- `npm run check`, `npm test`, `npm run build`: lulus.
- Chromium: navigasi, nama/kelas melalui Enter, sambung tiket selepas reload, Mod Fokus/teks sangat besar/jarak luas, lebar 320/390/768/1024/1440px tanpa overflow; lulus.
- Regresi enam Loka, Refleksi, Pemulihan, Pengukuhan, Rush dan Konsert: lulus, 0 ralat JavaScript.
- Backend Apps Script, adapter backend dan struktur data PBD tidak diubah. Integrasi Google sebenar masih belum diuji semula dengan akaun sekolah.
- Build hanya menyalin `public/` ke `dist/`; tiada `preview-screenshots/`, `work/`, fail ujian atau dokumen pratonton dalam production.

## Fasa 2 Roda Ferris diluluskan — 16 Oktober 2026 (Malaysia)

- Sintaks, ujian backend/geometri dan build: lulus.
- Chromium desktop/telefon: enam perjalanan normal dengan empat haiwan, sembilan fasa, cop/ulang Loka, keyboard/touch, Langkau/Escape, Fokus/Reduce/OS reduced motion/Senyap, klik berulang, pembatalan halaman, watchdog dan kegagalan aset: lulus; 0 pageerror.
- Regresi Halaman Utama, enam Loka, Pasport/Refleksi/latihan, Rush dan Konsert: lulus; 0 pageerror.
- Avatar dibesarkan 20% sambil mengekalkan titik kaki dan tempat duduk. Pintu ditutup selepas avatar duduk sebelum roda berputar. Cahaya zum lembut dimatikan dalam Fokus/Reduce.
- Fail/aset Halaman Utama, logik masuk Loka, Rush dan backend dibandingkan dengan Git dan disahkan tidak berubah. Tiada screenshot/video ujian atau debug dalam build production.
- Deployment/URL Netlify memerlukan pengesahan berasingan; kelulusan ujian setempat bukan bukti penerbitan.

## Loka 1 V2 rasmi dan master handoff — 16 Oktober 2026 (Malaysia)

- Loka 1 V2 diluluskan pengguna sebagai versi rasmi. Kod enjin sedia ada diperbaiki, bukan projek baharu; tiga misi, gerai interaktif, empat ilustrasi berurutan, pentas dan avatar dengan mulut/tangan beranimasi.
- `npm run check`, `npm test` (6 ujian Node), `npm run build`: lulus.
- `npm run test:loka1`: lulus; balingan pointer sebenar/hit/miss/refill/assist, susunan/petunjuk, pilihan avatar, mulut/tangan, rakaman MediaRecorder dengan mikrofon simulasi, main/ulang/download tersedia, Senyap/Fokus/Reduce, penolakan/tiada/izin mikrofon lewat, laluan lisan, kemajuan/cop, payload tanpa audio, keyboard/sentuhan/zum/teks besar/Andika/kontras/responsif; 0 pageerror.
- `npm run test:browser`, `test:ferris`, `test:library`, `node tests/home-browser.mjs`: lulus; 0 pageerror. Gerbang, Perpustakaan, perjalanan enam gondola, Loka 2–6 asal, Pasport/Refleksi/latihan, Rush dan Konsert kekal berfungsi.
- Axe-core 4.10.3 dijalankan semula pada makna, botol, susunan, pentas dan ganjaran, setiap satu 1440px dan 390px: 0 pelanggaran A/AA yang dikesan. Skrip QA berada dalam `work/`, tidak dihantar ke production.
- Perbandingan Git: `styles.css` Gerbang, `ferris.*`, `ferris-geometry.js`, `library.*`, adapter backend, Netlify Function dan Apps Script tidak diubah. Integrasi `app.js` hanya routing Loka 1/lifecycle/preference hook. Projek V7 tidak disentuh.
- Master handoff lengkap: `SIMPULLOKA_MASTER_HANDOFF.md`. Loka 2–6 belum menggunakan mini permainan tiga misi baharu; jangan samakan kelengkapan aliran asal dengan peluasan Fasa 4 ke semua Loka.
- Media V2 sudah berada di GitHub melalui komit media sahaja `51fa4db5d20ca574e900f51d40e885348b892c68`. Tiada media/debug baharu ditambah dalam komit kod pelepasan; folder media tidak disalin ke `dist/`.
- Batas: Chromium headless; tiada pengesahan mikrofon/peranti fizikal, Safari/iOS, pembaca skrin manusia, sambungan Sheets/PBD sekolah sebenar. Status Published Netlify mesti disahkan secara remote bagi SHA pelepasan; push dan build setempat bukan bukti Published.

## Upacara Cop Pasport Loka 1 diluluskan — 16 Oktober 2026 (Malaysia)

- `npm run check`, `npm test` (6 ujian Node), `npm run build`: lulus.
- `npm run test:reward`: lulus; pasport terbuka, cop menghentak, lambang muncul, perayaan sekali sahaja, simpan/pulih, pemerhatian guru, Langkau pada setiap fasa, pemulihan fokus, bunyi/Senyap, Fokus/Reduce/OS reduced motion, kegagalan animasi/audio, pembatalan, papan kekunci/sentuhan dan responsif 320–1440px; 0 pageerror.
- `npm run test:loka1`, `npm run test:browser`, `npm run test:ferris`, `npm run test:library` dan `node tests/home-browser.mjs`: lulus; 0 pageerror. Tiga misi, rakaman sementara, kemajuan/cop serta aliran Fasa 1–3 kekal berfungsi.
- Axe-core 4.10.3: desktop dan telefon, tetapan biasa serta Fokus/Reduce/tulisan besar/Andika/kontras; empat audit, 0 pelanggaran dikesan.
- Perbandingan kod mengesahkan 29 fungsi misi/rakaman/kemajuan sedia ada tidak berubah. Fail Gerbang, Perpustakaan, Ferris, backend dan struktur PBD tidak diubah. Tiada pembangunan Loka 2 atau perubahan projek V7.
- Media semakan telah diterbitkan berasingan dalam komit `c155d2bb1a6c44b290dc58379e16d240695478ba`; tiada media atau fail debug ditambah dalam pelepasan kod ini.
- Batas ujian peranti fizikal dan integrasi sekolah sebenar di atas masih terpakai. Build setempat dan push bukan pengesahan Netlify Published.
