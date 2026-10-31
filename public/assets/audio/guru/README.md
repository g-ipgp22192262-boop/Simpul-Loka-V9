# Audio suara cikgu V9.1

65 MP3 aplikasi dan 8 MP3 narasi manusia dibekalkan dan dipasang. Ketujuh-tujuh rakaman buku, termasuk `kitab-ilmu.mp3`, berada di `perpustakaan/`. Narasi `video-panduan/` hanya untuk suntingan video, tidak dipetakan ke playback Loka.

Rujukan skrip utama: `docs/audio-guru/SKRIP_AKHIR_UNTUK_RAKAMAN.pdf`. Laporan semua 73 fail, status dan batas pengesahan: `docs/audio-guru/INTEGRASI_AUDIO_V9_1.md` dan `AUDIO_INTEGRATION_AUDIT.json`.

Build menghasilkan manifest klip aplikasi, sumber perpustakaan dan narasi berasingan. Audio guru hanya selepas klik; izin mikrofon/rakaman murid menyekat playback guru. Audio murid kekal sementara, bukan aset dalam folder ini. Ujian teknikal playback bukan pengesahan pendengaran bagi perkataan/sebutan.

Pusingan semakan akhir: enam MP3 maksud juga digunakan dalam Loka, tanpa TTS pada completion. Lapan narasi VIDEO ONLY telah dicampur ke MP4 panduan; ia tetap bukan mapping arahan Loka. Lihat `PENAMBAHBAIKAN_AKHIR_V9_1.md`.


## Pengenalan Loka 1–6

Enam rakaman M4A yang dibekalkan pengguna telah ditukar kepada MP3 mono 128 kbps / 44.1 kHz: `loka1-pengenalan.mp3` hingga `loka6-pengenalan.mp3`. Butang “Dengar Arahan Pengenalan” menggunakan enam ID khusus yang sepadan dalam `teacher-audio-catalog.js`. Arahan Misi/Teroka Makna tidak dipetakan semula. Jalankan `npm run build` untuk menjana manifest: 71 klip aplikasi + 8 narasi video = 79 MP3. Tiada TTS atau audio gantian. Fail sumber M4A tidak diterbitkan sebagai aset aplikasi.
