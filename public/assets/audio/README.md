> Kemas kini V9.1: tujuh rakaman buku sebenar telah dipasang di `guru/perpustakaan/`; Kitab Ilmu kini tersedia. Laluan lama di bawah kekal disokong. Lihat `docs/audio-guru/INTEGRASI_AUDIO_V9_1.md`.

# Rakaman guru sebenar — Perpustakaan Ajaib

Letakkan rakaman MP3 suara guru sebenar dengan nama fail tepat berikut:

- `dalam-tangan.mp3`
- `ambil-hati.mp3`
- `anak-emas.mp3`
- `air-muka.mp3`
- `mandi-peluh.mp3`
- `cakap-besar.mp3`
- `kitab-ilmu.mp3` (wajib untuk Kitab Ilmu Utama)

Baca nama dan maksud ringkas, tanpa cerita atau kuiz. Jangan gunakan suara AI/TTS. Rakaman baharu menggunakan folder guru/perpustakaan; jangan tambah placeholder. `MagicLibrary.audioFiles` dalam `library.js` memetakan laluan. `npm run build` menyenaraikan MP3 yang benar-benar wujud dalam `dist/assets/audio/library-audio.json`; fail JSON ini dijana, bukan diisi dengan rakaman palsu. Selepas menambah rakaman, build semula. Fail yang tiada memaparkan “Audio cikgu akan ditambah”.

Mod Senyap menyekat dan menghentikan rakaman; pertukaran/tutup buku atau keluar halaman turut menghentikannya. Rakaman gagal dimuat ditandakan tidak tersedia. Pastikan rakaman dibenarkan untuk digunakan sebelum dimasukkan.
