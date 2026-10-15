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
