# Bahan panduan guru SimpulLoka V9.1

Hasil utama: `public/assets/video/guru/panduan-simpulloka.mp4`.

Video disusun daripada rakaman Playwright aplikasi sebenar menggunakan pelayan PBD setempat dan simulator berlabel. Tiada halaman mockup, rakaman stok atau suara AI. Cincin klik ialah anotasi editorial pada rakaman, bukan kawalan aplikasi baharu. Peralihan lembut ditambah selepas rakaman. Zoom dalam babak Peta Ilmu menggunakan fungsi zum ilustrasi sebenar.

## Fail

- `masa-babak.json`: lapan babak, cue teks, skrip narasi dan masa sasaran.
- `skrip-narasi-guru.md`: teks untuk dirakam oleh guru sendiri; suara belum dimasukkan.
- `panduan-simpulloka.ms.srt`: sari kata untuk editor video.
- `../../public/assets/video/guru/panduan-simpulloka.ms.vtt`: sari kata pemain aplikasi.
- `../../public/assets/video/guru/panduan-simpulloka-poster.png`: bingkai daripada video sebenar.

## Ketepatan demonstrasi dan batasan

- Babak mikrofon menggunakan fungsi MediaRecorder sebenar dengan peranti mikrofon ujian Chromium. MP4 akhir tidak mempunyai trek audio. Tiada rakaman murid sebenar atau suara guru palsu.
- Babak PBD menggunakan data rekaan pada simulator yang menjalankan kod Apps Script sebenar terhadap API Sheets dalam memori. Ia bukan sambungan Google Sheets sebenar, dan video melabel perbezaan ini.
- Enam status selesai disediakan melalui API kemajuan sedia ada untuk memperlihatkan syarat enam cop dan sijil dalam masa tutorial. Video tidak mendakwa keenam-enam permainan dimainkan lengkap dalam masa tersebut.
- Konsert memperlihatkan pautan lagu Suno sedia ada; laman luar tidak dimainkan/dirakam. Pemain lagu dalaman belum tersedia dan tidak direka-reka.
- Tiada kod laluan sebenar, token tiket atau rahsia Google dikongsi. Kod akses demonstrasi dijana dalam memori, dipaparkan sebagai medan kata laluan bertopeng, dan tidak ditulis ke laporan.

## Menghasilkan semula

Alat pembangunan: Node 22+, Playwright dengan sokongan rakaman FFmpeg, Chromium, Python 3, FFmpeg dengan libx264/libass dan ffprobe. Alat ini bukan dependency runtime website.

1. Jalankan `npm run build`.
2. Jalankan `node scripts/record-teacher-guide.mjs` (sekitar 4:40, ditambah masa memuatkan aplikasi). Tetapkan `PLAYWRIGHT_MODULE` dan `CHROMIUM_PATH` jika pemasangan alat berada di lokasi khusus. Playwright mesti mempunyai executable FFmpeg rakamannya; pemasangan standard boleh menyediakan melalui `npx playwright install ffmpeg`.
3. Pilihan latihan: `GUIDE_REHEARSAL=1 node scripts/record-teacher-guide.mjs`. Latihan tidak boleh digunakan sebagai video akhir.
4. Jalankan `python scripts/render-teacher-guide.py` daripada folder projek. Skrip menolak latihan atau rakaman yang mempunyai ralat halaman.
5. Jalankan `npm run build` semula supaya MP4, poster, VTT dan manifest tersedia dalam dist.
6. Jalankan pelayan localhost seperti biasa. Buka Sudut Guru → Video Panduan; tiada deployment diperlukan.
7. Ujian pemain: `node tests/teacher-guide-video-browser.mjs` dengan Playwright/Chromium.

Fail raw dan bahan kerja berada dalam work/teacher-guide/ dan tidak dibina ke production. Pembangunan ini tidak mengubah permainan, API, Apps Script atau .env.pbd.local.

## Memasukkan narasi kemudian

Rakam sendiri mengikut skrip bertanda masa. Fail audio per babak boleh disunting mengikut sela masa dalam JSON. Contoh perintah di bawah hanya selepas fail narasi sebenar 4:40 disediakan sendiri:

```
ffmpeg -i public/assets/video/guru/panduan-simpulloka.mp4 -i narasi-guru.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 160k -t 280 -movflags +faststart panduan-dengan-narasi.mp4
```

Perintah menghasilkan fail baharu dan tidak menggantikan MP4 asal. Semak sebutan, aras bunyi, masa dan sari kata sebelum menggantikan sumber pemain.

## Ujian pemain dan pelayan setempat

Ujian pemain mendedahkan seek memerlukan byte-range HTTP. scripts/pbd-dev-server.mjs kini menyokong julat byte tunggal untuk aset media sahaja; operasi PBD/Google dan pemeriksaan keselamatan laluan tidak berubah. Ujian tests/pbd-static-path.test.mjs meliputi julat sah, suffix, julat tidak sah, HTTP 206/416 dan Windows/POSIX. Hasil akhir dalam hasil-ujian.json. Versi tanpa narasi diluluskan untuk disimpan pada branch work. Tiada deployment hosting dibuat.
