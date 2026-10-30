# Penambahbaikan akhir SimpulLoka V9.1 — semakan manual

Asas: `5c6caa34163174826af7023b375568b8ee221015`. Laporan ini ialah bukti pengesahan untuk checkpoint branch semakan `review/v9.1-teacher-audio`; bukan kelulusan deployment Netlify.

## ✅ Siap dan diuji

| Isu | Perubahan | Bukti |
|---|---|---|
| 1 | Dengar Maksud di Teroka Makna keenam-enam Loka menggunakan enam MP3 Perpustakaan sebenar, dengan ID eksplisit. Arahan misi asal dikekalkan. | 6 laluan maksud dimainkan dalam Chromium; tiada TTS. |
| 2 | Completion Loka 5–6 tidak memanggil TTS. Kawalan suara tidak ditawarkan pada finale tanpa rakaman; pemanggil legasi di page Loka juga disekat tanpa toast fallback. | Ujian spy speechSynthesis: 0 panggilan dalam Loka; Loka 5 finale diuji. |
| 3 | V01–V08 dicampur sebagai AAC ke video 280 saat. Aksi/timeline asal dikekalkan; label TANPA NARASI, kapsyen penutup dan poster diperbaharui. | Padanan kawasan demonstrasi di 9 timestamp; 3 fingerprint tenaga suara bagi setiap babak; isyarat audio 8 babak dalam pelayar. |
| 4 | APP UI AUDIO = 65; VIDEO NARRATION = 8; TOTAL MP3 = 73. | Manifest berasingan; semua 73 checksum MP3 asal tidak berubah. |
| 5 | Navigasi Loka 1–6 berhampiran Roda Ferris, active state, lock tiket dan reka bentuk responsif. | 320/390/768/1366px; progress/sesi selepas navigasi dan reload dikekalkan. |
| 6 | Panel Apa kita akan buat? pada permulaan setiap Loka, menyebut simpulan bahasa, aktiviti dan Pentas Cerita. | Keenam-enam panel diuji. Loka 5 teks sahaja; tiada audio pengenalan rekaan. |
| 7 | Celebration/cop Loka 6 kekal, CTA Teruskan ke Imbas Loka tanpa auto-pindah; audio tahniah hanya apabila 6 Loka unik lengkap. | Loka 6 awal → Kenangan/refleksi terkunci; 6 lengkap → pengenalan refleksi. CTA menunggu simpanan jika acknowledgement lambat, dan tidak auto-pindah jika pengguna telah menukar halaman. Next/return Loka 1–5 kekal. |

## 🧪 Keputusan ujian

| Ujian | Keputusan |
|---|---|
| Syntax dan build | PASS |
| npm test | 33 PASS, 0 FAIL |
| tests/final-polish-browser.mjs | PASS: semua 7 isu, 0 pageerrors |
| tests/video-narration.mjs | PASS: 9 padanan demo + 24 fingerprint suara |
| tests/teacher-audio-browser.mjs | PASS: 73 playback ended, 65 UI mapping, 6 perakam |
| tests/loka-one-browser.mjs | PASS |
| tests/loka-two-browser.mjs | PASS |
| tests/loka-three-browser.mjs | PASS |
| tests/loka-four-browser.mjs | PASS |
| tests/loka-five-browser.mjs | PASS |
| tests/loka-six-browser.mjs | PASS |
| tests/loka-four-recording-browser.mjs | PASS |
| tests/v91-browser.mjs | PASS |
| tests/teacher-guide-video-browser.mjs | PASS |

## Video dan sari kata

V08 menggunakan tempo 1.0207 (sekitar 2.07% lebih pantas, pitch dikekalkan) dalam campuran video sahaja. Semua MP3 sumber tidak dipotong/ditulis semula. Tempoh video kekal 4:40, 1920×1080, 7000 frame. Footer lama berada di bawah kawasan demonstrasi y=948; pembetulan hanya pada jalur footer dan label/kapsyen lama. Encoding semula ringan diperlukan untuk pembetulan footer. Sari kata/CC Bahasa Melayu 31 cue dikekalkan, dengan teks penutup diperbetulkan; CC ialah penerangan demonstrasi, bukan transkrip baharu kata demi kata.

## ⚠️ Had pengesahan

- Ujian mikrofon memakai MediaRecorder sebenar dengan mikrofon sintetik pelayar. Mikrofon laptop, Safari dan Google Sheets sebenar tidak diuji.
- Ujian padanan suara/tenaga membuktikan trek rakaman benar berada dalam babak; semakan sebutan dan keselesaan pendengaran manusia kekal untuk semakan pemilik.
- Nota QC lama puncak 0.0 dB pada loka4-semak-ayat.mp3 tidak diubah; ini bukan bukti clipping.
- Environment tidak menawarkan preview HTTPS luar; URL ujian adalah loopback cloud, bukan URL browser laptop.

## 🌐 URL ujian dalaman

- http://127.0.0.1:4196/ — suite penambahbaikan akhir.
- http://127.0.0.1:4173/ — regresi keenam-enam Loka.
- http://127.0.0.1:4191/ — pemain Video Panduan.
- http://127.0.0.1:4193/ — regresi audio 73 MP3.

## 📁 Fail berubah

- `docs/audio-guru/AUDIO_INTEGRATION_AUDIT.json`
- `docs/audio-guru/INTEGRASI_AUDIO_V9_1.md`
- `docs/audio-guru/PENAMBAHBAIKAN_AKHIR_V9_1.md`
- `docs/video-panduan/README.md`
- `docs/video-panduan/panduan-simpulloka.ms.srt`
- `package.json`
- `public/assets/app.js`
- `public/assets/audio/guru/README.md`
- `public/assets/loka-five.js`
- `public/assets/loka-four.js`
- `public/assets/loka-one.js`
- `public/assets/loka-six.js`
- `public/assets/loka-three.js`
- `public/assets/loka-two.js`
- `public/assets/sudut-guru.js`
- `public/assets/teacher-audio.js`
- `public/assets/v91.css`
- `public/assets/video/guru/README.md`
- `public/assets/video/guru/narration.json`
- `public/assets/video/guru/panduan-simpulloka-poster.png`
- `public/assets/video/guru/panduan-simpulloka.mp4`
- `public/assets/video/guru/panduan-simpulloka.ms.vtt`
- `public/index.html`
- `scripts/build-teacher-resources.mjs`
- `scripts/mix-teacher-narration.py`
- `tests/final-polish-browser.mjs`
- `tests/video-narration.mjs`
