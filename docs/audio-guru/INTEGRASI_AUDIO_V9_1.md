> Pusingan semakan manual terkini: lihat `PENAMBAHBAIKAN_AKHIR_V9_1.md`. Video kini mempunyai lapan narasi sebenar; audio maksud, navigasi dan completion telah diperhalusi. Inventori kekal 65 aplikasi + 8 video = 73 MP3.

# Integrasi Audio SimpulLoka V9.1 — laporan pengesahan

Sumber kod asas: `d42941498e079e94affdc68cb619f8679e44c508`. Rujukan skrip utama ialah `SKRIP_AKHIR_UNTUK_RAKAMAN.pdf`; catalog semasa mengikuti pindaan PDF, bukan gabungan teks lama.

## ✅ Berfungsi dan telah diuji

- 73 sumber M4A ditemui: 72 daripada ZIP asal dan satu lampiran Kitab Ilmu; tiada nama berganda.
- 73 MP3 berjaya dinyahkod penuh dengan FFmpeg dan Web Audio serta dimainkan hingga event ended dalam Chromium pada kelajuan ujian dipercepat.
- 65 klip aplikasi mempunyai laluan UI yang diuji; 8 narasi diasingkan untuk video sahaja.
- Keenam-enam Pentas Cerita diuji: mikrofon opt-in, rakaman, avatar, henti, dengar semula, rakam semula, Mod Senyap dan penamatan lisan.
- Arahan disekat ketika izin/rakaman aktif; pending play, perubahan halaman, penolakan izin, lewat izin dan kegagalan media diuji.

## 🔧 Perubahan yang dibuat

- MP3 mono 128 kbps / 44.1 kHz; nama asas asal dikekalkan. Sumber M4A asal kekal di `/workspace/simpul-audio-originals/`.
- Mapping eksplisit mengikut Loka/misi/item/stesen; tiada pencarian awalan teks atau bacaan keseluruhan dynamic status untuk memilih MP3.
- Loka 1 mendapat Dengar Arahan; Ferris dipetakan; Studio Foto Loka 4 tidak menggunakan Buaian/Pulau; soalan Loka 5 berasingan; stesen Loka 5–6 memakai ID tetap.
- Kawalan panduan tambahan menggunakan rakaman yang dibekalkan; tiada autoplay, reka bentuk semula atau perubahan syarat pembelajaran.
- 17 entri legacy dikekalkan berasingan daripada 65 klip inventori semasa; teks legasi yang tidak dipetakan mengekalkan bacaan pelayar berlabel.
- Manifest aplikasi dan manifest narasi video diasingkan. Video MP4 asal tidak diubah.

## ⚠️ Masalah / belum siap

- Isu Kitab Ilmu selesai: `kitab-ilmu.mp3` ditambah melalui lampiran berasingan, dimainkan hingga tamat pada kelajuan biasa melalui UI, dan ketujuh-tujuh audio Perpustakaan kini tersedia.
- Jemputan umum pernah dicadangkan tetapi rakaman/nama yang diluluskan tidak dibekalkan; tiada audio lain digunakan sebagai pengganti.
- V08 kini muat dalam slot melalui pelarasan tempo sekitar 2% dalam video sahaja; MP3 asal kekal tidak berubah.
- `loka4-semak-ayat.mp3`: peak volumedetect dibundarkan kepada 0.0 dB. Ini bukan bukti clipping; semakan pendengaran manual diperlukan.
- Ketepatan setiap perkataan, sebutan dan keselesaan bunyi belum disahkan melalui pendengaran manusia. Ujian playback bukan kelulusan kandungan rakaman.
- Mikrofon perkakasan, Safari dan sambungan Google sebenar tidak diuji dalam tugas ini. Tiada deployment atau push dibuat.

## 🎵 Jadual semua 73 audio

FOUND = sumber ditemui; CONVERTED = eksport MP3 berjaya; INTEGRATED = mapping aplikasi dipasang; PLAYBACK VERIFIED = decode penuh dan playback ended pelayar; VIDEO ONLY = diasingkan daripada Loka; OPTIONAL = tambahan PDF; ISSUE = nota susulan.

Semua nama sumber berakhiran `.m4a`, dan nama asas yang sama digunakan untuk `.mp3`. Laluan aplikasi bermula `public/assets/audio/guru/`; tujuh buku berada dalam `perpustakaan/`, dan narasi dalam `video-panduan/`.

| Bil. | Fail MP3 | Laluan | Durasi decode (s) | Status | Nota |
|---|---|---|---:|---|---|
| 1 | `air-muka.mp3` | `public/assets/audio/guru/perpustakaan/air-muka.mp3` | 6.08 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 2 | `ambil-hati.mp3` | `public/assets/audio/guru/perpustakaan/ambil-hati.mp3` | 5.57 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 3 | `anak-emas.mp3` | `public/assets/audio/guru/perpustakaan/anak-emas.mp3` | 6.33 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 4 | `babak-01-pengenalan.mp3` | `public/assets/audio/guru/video-panduan/babak-01-pengenalan.mp3` | 28.01 | FOUND / CONVERTED / VIDEO ONLY / PLAYBACK VERIFIED | — |
| 5 | `babak-02-peta-ilmu.mp3` | `public/assets/audio/guru/video-panduan/babak-02-peta-ilmu.mp3` | 22.72 | FOUND / CONVERTED / VIDEO ONLY / PLAYBACK VERIFIED | — |
| 6 | `babak-03-roda-ferris.mp3` | `public/assets/audio/guru/video-panduan/babak-03-roda-ferris.mp3` | 23.32 | FOUND / CONVERTED / VIDEO ONLY / PLAYBACK VERIFIED | — |
| 7 | `babak-04-tiga-misi.mp3` | `public/assets/audio/guru/video-panduan/babak-04-tiga-misi.mp3` | 48.75 | FOUND / CONVERTED / VIDEO ONLY / PLAYBACK VERIFIED | — |
| 8 | `babak-05-inklusif.mp3` | `public/assets/audio/guru/video-panduan/babak-05-inklusif.mp3` | 27.33 | FOUND / CONVERTED / VIDEO ONLY / PLAYBACK VERIFIED | — |
| 9 | `babak-06-kenangan-pencapaian.mp3` | `public/assets/audio/guru/video-panduan/babak-06-kenangan-pencapaian.mp3` | 32.87 | FOUND / CONVERTED / VIDEO ONLY / PLAYBACK VERIFIED | — |
| 10 | `babak-07-sudut-guru-pbd.mp3` | `public/assets/audio/guru/video-panduan/babak-07-sudut-guru-pbd.mp3` | 38.42 | FOUND / CONVERTED / VIDEO ONLY / PLAYBACK VERIFIED | — |
| 11 | `babak-08-penutup.mp3` | `public/assets/audio/guru/video-panduan/babak-08-penutup.mp3` | 25.28 | FOUND / CONVERTED / VIDEO ONLY / PLAYBACK VERIFIED | Diselaraskan dalam video melalui tempo sekitar 2%; MP3 asal tidak diubah. |
| 12 | `bersama-cuba-lagi.mp3` | `public/assets/audio/guru/bersama-cuba-lagi.mp3` | 8.64 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 13 | `bersama-gambar-diperoleh.mp3` | `public/assets/audio/guru/bersama-gambar-diperoleh.mp3` | 7.61 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 14 | `cakap-besar.mp3` | `public/assets/audio/guru/perpustakaan/cakap-besar.mp3` | 9.41 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 15 | `dalam-tangan.mp3` | `public/assets/audio/guru/perpustakaan/dalam-tangan.mp3` | 4.88 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 16 | `ferris-arahan.mp3` | `public/assets/audio/guru/ferris-arahan.mp3` | 13.16 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 17 | `gerbang-selamat-datang.mp3` | `public/assets/audio/guru/gerbang-selamat-datang.mp3` | 12.22 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 18 | `grand-finale-tahniah.mp3` | `public/assets/audio/guru/grand-finale-tahniah.mp3` | 12.56 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 19 | `imbas-pengalaman.mp3` | `public/assets/audio/guru/imbas-pengalaman.mp3` | 11.11 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 20 | `imbas-pengenalan.mp3` | `public/assets/audio/guru/imbas-pengenalan.mp3` | 6.25 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 21 | `imbas-soalan1.mp3` | `public/assets/audio/guru/imbas-soalan1.mp3` | 8.38 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 22 | `imbas-soalan2.mp3` | `public/assets/audio/guru/imbas-soalan2.mp3` | 14.87 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 23 | `imbas-soalan3.mp3` | `public/assets/audio/guru/imbas-soalan3.mp3` | 9.49 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 24 | `konsert-panduan.mp3` | `public/assets/audio/guru/konsert-panduan.mp3` | 10.35 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 25 | `loka1-misi1.mp3` | `public/assets/audio/guru/loka1-misi1.mp3` | 6.68 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 26 | `loka1-misi2.mp3` | `public/assets/audio/guru/loka1-misi2.mp3` | 10.86 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 27 | `loka1-misi3.mp3` | `public/assets/audio/guru/loka1-misi3.mp3` | 9.32 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 28 | `loka1-susun.mp3` | `public/assets/audio/guru/loka1-susun.mp3` | 10.94 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 29 | `loka2-hadiah.mp3` | `public/assets/audio/guru/loka2-hadiah.mp3` | 3.95 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 30 | `loka2-kotak.mp3` | `public/assets/audio/guru/loka2-kotak.mp3` | 2.07 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 31 | `loka2-misi1.mp3` | `public/assets/audio/guru/loka2-misi1.mp3` | 10.00 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 32 | `loka2-misi3.mp3` | `public/assets/audio/guru/loka2-misi3.mp3` | 7.61 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 33 | `loka2-perasaan.mp3` | `public/assets/audio/guru/loka2-perasaan.mp3` | 6.93 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 34 | `loka2-reben.mp3` | `public/assets/audio/guru/loka2-reben.mp3` | 1.98 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 35 | `loka2-sokongan.mp3` | `public/assets/audio/guru/loka2-sokongan.mp3` | 10.43 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 36 | `loka2-susun.mp3` | `public/assets/audio/guru/loka2-susun.mp3` | 4.63 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 37 | `loka2-ucapan.mp3` | `public/assets/audio/guru/loka2-ucapan.mp3` | 4.20 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 38 | `loka3-misi1.mp3` | `public/assets/audio/guru/loka3-misi1.mp3` | 23.06 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 39 | `loka3-misi3.mp3` | `public/assets/audio/guru/loka3-misi3.mp3` | 8.30 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 40 | `loka3-panah.mp3` | `public/assets/audio/guru/loka3-panah.mp3` | 7.79 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 41 | `loka3-penjelasan.mp3` | `public/assets/audio/guru/loka3-penjelasan.mp3` | 13.25 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 42 | `loka3-susun.mp3` | `public/assets/audio/guru/loka3-susun.mp3` | 4.46 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 43 | `loka4-misi1.mp3` | `public/assets/audio/guru/loka4-misi1.mp3` | 17.68 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 44 | `loka4-misi3.mp3` | `public/assets/audio/guru/loka4-misi3.mp3` | 11.54 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 45 | `loka4-semak-ayat.mp3` | `public/assets/audio/guru/loka4-semak-ayat.mp3` | 17.17 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL / ISSUE | Volumedetect peak rounds to 0.0 dB; manual listening required, clipping not established. |
| 46 | `loka4-semak-tindakan.mp3` | `public/assets/audio/guru/loka4-semak-tindakan.mp3` | 18.71 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 47 | `loka4-susun.mp3` | `public/assets/audio/guru/loka4-susun.mp3` | 11.45 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 48 | `loka5-misi1-1.mp3` | `public/assets/audio/guru/loka5-misi1-1.mp3` | 15.55 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 49 | `loka5-misi1-2.mp3` | `public/assets/audio/guru/loka5-misi1-2.mp3` | 18.37 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 50 | `loka5-misi1-3.mp3` | `public/assets/audio/guru/loka5-misi1-3.mp3` | 16.83 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 51 | `loka5-misi3.mp3` | `public/assets/audio/guru/loka5-misi3.mp3` | 7.53 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 52 | `loka5-stesen1.mp3` | `public/assets/audio/guru/loka5-stesen1.mp3` | 8.81 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 53 | `loka5-stesen2.mp3` | `public/assets/audio/guru/loka5-stesen2.mp3` | 9.07 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 54 | `loka5-stesen3.mp3` | `public/assets/audio/guru/loka5-stesen3.mp3` | 15.12 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 55 | `loka5-stesen4.mp3` | `public/assets/audio/guru/loka5-stesen4.mp3` | 18.11 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 56 | `loka5-susun.mp3` | `public/assets/audio/guru/loka5-susun.mp3` | 4.29 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 57 | `loka5-tenaga.mp3` | `public/assets/audio/guru/loka5-tenaga.mp3` | 8.04 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 58 | `loka6-kapal.mp3` | `public/assets/audio/guru/loka6-kapal.mp3` | 6.08 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 59 | `loka6-misi1.mp3` | `public/assets/audio/guru/loka6-misi1.mp3` | 18.28 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 60 | `loka6-misi3.mp3` | `public/assets/audio/guru/loka6-misi3.mp3` | 8.64 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 61 | `loka6-stesen1.mp3` | `public/assets/audio/guru/loka6-stesen1.mp3` | 17.77 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 62 | `loka6-stesen2.mp3` | `public/assets/audio/guru/loka6-stesen2.mp3` | 13.67 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 63 | `loka6-stesen3.mp3` | `public/assets/audio/guru/loka6-stesen3.mp3` | 15.72 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 64 | `loka6-stesen4.mp3` | `public/assets/audio/guru/loka6-stesen4.mp3` | 22.29 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 65 | `loka6-susun.mp3` | `public/assets/audio/guru/loka6-susun.mp3` | 4.03 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 66 | `mandi-peluh.mp3` | `public/assets/audio/guru/perpustakaan/mandi-peluh.mp3` | 9.32 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | — |
| 67 | `mod-inklusif-panduan.mp3` | `public/assets/audio/guru/mod-inklusif-panduan.mp3` | 12.31 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 68 | `pasport-panduan.mp3` | `public/assets/audio/guru/pasport-panduan.mp3` | 10.43 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 69 | `pentas-kawalan-loka12.mp3` | `public/assets/audio/guru/pentas-kawalan-loka12.mp3` | 17.68 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 70 | `pentas-kawalan-loka356.mp3` | `public/assets/audio/guru/pentas-kawalan-loka356.mp3` | 17.85 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 71 | `pentas-kawalan-loka4.mp3` | `public/assets/audio/guru/pentas-kawalan-loka4.mp3` | 17.26 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 72 | `perpustakaan-pengenalan.mp3` | `public/assets/audio/guru/perpustakaan-pengenalan.mp3` | 13.16 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED / OPTIONAL | — |
| 73 | `kitab-ilmu.mp3` | `public/assets/audio/guru/perpustakaan/kitab-ilmu.mp3` | 17.43 | FOUND / CONVERTED / INTEGRATED / PLAYBACK VERIFIED | Wajib; UI dan playback kelajuan biasa hingga tamat disahkan. |

## 🧪 Ujian yang dijalankan

| Ujian | Keputusan |
|---|---|
| `npm run check` | PASS |
| `npm run build` | PASS: 65 MP3 aplikasi, 8 narasi berasingan |
| `npm test` | PASS: 33, gagal 0 |
| `tests/loka-one-browser.mjs` | PASS |
| `tests/loka-two-browser.mjs` | PASS |
| `tests/loka-three-browser.mjs` | PASS |
| `tests/loka-four-browser.mjs` | PASS |
| `tests/loka-five-browser.mjs` | PASS |
| `tests/loka-six-browser.mjs` | PASS |
| `tests/loka-four-recording-browser.mjs` | PASS |
| `tests/kitab-ilmu-browser.mjs` | PASS: normal-speed ended, pause/replay, silent, navigation, HTTP 200/206, 0 pageerrors |
| `tests/v91-browser.mjs` | PASS |
| `tests/teacher-audio-browser.mjs` | PASS: 73 decode/playback, 65 UI mapping, 6 perakam, 0 pageerrors |

Ujian pelayar menggunakan `PLAYWRIGHT_MODULE` dan `CHROMIUM_PATH` sedia ada. `npm run test:audio` menjalankan keseluruhan ujian media dan UI. Pilihan `--ui-only` hanya digunakan semasa diagnosis; larian akhir penambahan Kitab melaksanakan semula semua 73 playback. Kegagalan awal kawalan tambahan Loka 2 telah dibaiki. Kegagalan sesi pelayan luar dipulihkan menggunakan runner yang memiliki pelayannya sendiri. Tiada assertion aliran Loka dilonggarkan.

## 📁 Fail kod yang berubah

- `package.json`
- `public/assets/app.js`
- `public/assets/ferris.js`
- `public/assets/imbas-loka.js`
- `public/assets/library.js`
- `public/assets/loka-five.js`
- `public/assets/loka-four.js`
- `public/assets/loka-one.js`
- `public/assets/loka-six.js`
- `public/assets/loka-story.js`
- `public/assets/loka-three.js`
- `public/assets/loka-two.js`
- `public/assets/sudut-guru.js`
- `public/assets/teacher-audio-catalog.js`
- `public/assets/teacher-audio.js`
- `public/index.html`
- `scripts/build-teacher-resources.mjs`
- `tests/sudut-guru.test.mjs`
- `tests/teacher-audio-browser.mjs`
- `tests/kitab-ilmu-browser.mjs`

Bukti terperinci dan checksum sumber/MP3: `AUDIO_INTEGRATION_AUDIT.json`. Bukti playback mentah, termasuk ID mapping dan recorder, disimpan di `work/audio-integration/playback.json` (ignored).

## Penambahan Kitab Ilmu

Mapping catalog sedia ada dikekalkan tanpa perubahan. Checksum semua 72 MP3 terdahulu tidak berubah. Ujian integrasi melaksanakan semula semua 64 mapping UI asal, ditambah Kitab Ilmu (65). Sumber asal: `/workspace/simpul-audio-originals/kitab-ilmu.m4a`. Kawalan sedia ada berlabel **Dengar suara cikgu**, tidak dinamakan semula kepada Dengar Arahan. Checkpoint ini untuk semakan manual sahaja; deployment Netlify memerlukan arahan berasingan.
