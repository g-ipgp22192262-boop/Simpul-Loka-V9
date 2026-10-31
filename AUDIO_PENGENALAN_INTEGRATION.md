# Integrasi audio pengenalan Loka 1–6

Sumber: enam fail M4A pengguna dalam `pengenalan loka.zip`. Fail asal disimpan dalam kawasan kerja ignored; hanya MP3 diterbitkan sebagai aset aplikasi.

Penukaran: FFmpeg/libmp3lame, mono (`-ac 1`), 128 kbps CBR (`-b:a 128k`), 44.1 kHz (`-ar 44100`). Tiada TTS, salinan audio lama, perubahan kelajuan, normalisasi atau campuran audio lain.

| Fail dalam `public/assets/audio/guru/` | Tempoh MP3 |
|---|---:|
| `loka1-pengenalan.mp3` | 24.37 saat |
| `loka2-pengenalan.mp3` | 25.99 saat |
| `loka3-pengenalan.mp3` | 28.40 saat |
| `loka4-pengenalan.mp3` | 29.83 saat |
| `loka5-pengenalan.mp3` | 30.69 saat |
| `loka6-pengenalan.mp3` | 29.94 saat |

Enam butang menggunakan ID `loka1-pengenalan` hingga `loka6-pengenalan` yang telah disediakan. Katalog hanya dikemas kini daripada status menunggu kepada tersedia. Semua entri katalog terdahulu, termasuk arahan Teroka Makna/Cabaran/Pentas Cerita, sama tepat dengan HEAD asal. SHA-256 semua 73 MP3 terdahulu juga tidak berubah.

`npm run build` menjana manifest kepada `dist/assets/audio/guru/manifest.json`: **71 klip aplikasi**. Narasi video kekal pada manifest berasingan: **8 MP3**. Inventori fail sebenar keseluruhan: **79 MP3**.

## Ujian

Keputusan akhir: semua pemeriksaan di bawah lulus. Enam pengenalan selesai pada 1×, 79 MP3 decode/play hingga tamat, enam aliran rakaman lulus, dan 0 JavaScript/page error.

- `npm run check`, `npm test` (33/33) dan `npm run build`.
- `tests/teacher-audio-browser.mjs`: semua 79 MP3 decode/play hingga ended (playback dipercepat untuk regresi), semua 71 mapping UI, enam aliran rakam/ulang/dengar/lisan, kawalan audio semasa rakaman dan izin mikrofon.
- `tests/introduction-audio-browser.mjs`: enam butang pengenalan sebenar, playback hingga natural ended pada **1× tanpa seek**, hentian navigasi, Mod Senyap, tiada pertindihan, arahan biasa kekal, tiada TTS/page error. Inventori tiada fail turut disimulasikan untuk memeriksa fallback bertulis sahaja.
- `tests/final-polish-browser.mjs`: pengenalan dan maksud, navigasi/progress, finale Loka 5–6, lapan babak narasi video dan CC.
- `tests/human-review-browser.mjs`: panduan cerita, bahan cetak dan navigasi bahan.

Semua ujian browser menggunakan Playwright/Chromium yang dipasang dalam environment. Untuk skrip baharu: `node tests/introduction-audio-browser.mjs` apabila Playwright/Chromium tersedia. Laporan mesin disimpan di `work/intro-audio/` (ignored).

Google Fonts tidak boleh dicapai dalam environment ujian dan permintaan favicon boleh menghasilkan 404 sedia ada. Amaran sumber ini direkod berasingan; ia bukan ralat JavaScript atau kegagalan audio. Tiada perubahan font/favicon dibuat dalam integrasi ini.

## Human test ringkas

Gunakan folder yang mempunyai perubahan tempatan ini, bukan ZIP GitHub lama. Jalankan `npm run build`, kemudian `npm run dev:pbd` dan buka aplikasi pada port yang dicetak di laptop. Bagi setiap Loka, tekan “Dengar Arahan Pengenalan”, dengar hingga tamat, main semula dan berpindah halaman, kemudian cuba Mod Senyap. Bandingkan dengan “Dengar Arahan” biasa: rakaman itu mesti kekal berbeza mengikut aktiviti. Akhir sekali uji rakaman Pentas Cerita. Tiada commit, push, merge atau deployment dilakukan.
