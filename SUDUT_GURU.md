> Kemas kini fasa integrasi: visual telah diluluskan. Status rekod, sesi guru dan dua tab PBD terkini diterangkan dalam `PBD_INTEGRATION_REVIEW.md` dan `PBD_GOOGLE_SHEETS_SETUP.md`. Catatan persediaan rekod di bawah ialah rekod fasa visual terdahulu; ia bukan status gateway baharu. Penyimpanan versi pembangunan pada branch `work` kini diluluskan untuk ujian localhost; tiada deployment hosting.

# Sudut Guru — versi preview untuk kelulusan

## Status
Imbas Loka dan satu aliran sijil diluluskan, diuji dan dipush sebagai `25126805f3de010d84051773a5c44aaed5f29826`. Loka 6/Grand Finale ialah `e4d301b0e89ce92791d00c22d9efa7cbf1d8e9b6`. Catatan fasa visual dahulu: kod Sudut Guru ketika itu belum diluluskan untuk commit. Arahan semasa meluluskan penyimpanan versi pembangunan lengkap bagi ujian localhost. Tiada deployment dilakukan. V7 tidak disentuh. HOME_PREVIEW.md ialah fail terdahulu yang tidak berkaitan dan tidak dimasukkan.

## Visual dan navigasi
Mockup rasmi `public/assets/sudutguruloka-mockup.png` diperiksa. Latar ilustrasi kiosk baharu tanpa teks/UI berdasarkan mockup, ditambah heading kayu, lima kad sebenar, Pembantu Loka sedia ada, rak bahan/video/dokumen. Semua teks, navigasi dan kawalan ialah HTML/CSS/JavaScript; mockup tidak digunakan sebagai UI. Satu bahagian terperinci pada satu masa, kembali ke lima kad atau Gerbang. Tiada animasi hiasan berulang.

## Kandungan
Sumber tunggal `sudut-guru-data.js`: ayat SK 4.1, SP 4.1.1 dan (i) simpulan bahasa serta kedua-dua objektif tepat seperti arahan. Tiada bandingan semacam/perumpamaan. RPH 5+10+20+15+10=60 minit, satu/beberapa Loka pilihan, bukan keenam-enam wajib. Kriteria kejayaan, BBM, aktiviti guru/murid, pentaksiran, pengetahuan awal, pembezaan dan refleksi tersedia.

Audit kod sebenar Loka1–6 membezakan Misi1, item makna/situasi Misi2 dan permainan/nilai murni. Loka1–3 belum mempunyai item makna Misi2 yang mencukupi secara berdikari; pemerhatian/alasan Loka2 ialah sokongan, soal jawab guru disyorkan. Loka4 Pulau3/4, Loka5 Stesen3/4, Loka6 Stesen1/4 ialah item bahasa yang relevan. Tiada dakwaan objektif dicapai daripada flag kemajuan. Guru mendengar Misi3 untuk SP; tulisan hanya sokongan.

Rubrik lisan 5 aspek × 5 deskriptor, bertulis 4 aspek × 5 deskriptor. Ruang skor setiap aspek dan ulasan, cetakan mengekalkan pilihan/ulasan. Tidak mengagregatkan skor/TP. Pilihan rubrik skrin bukan rekod sekolah; gunakan cetakan untuk catatan. Rekod demo menyediakan dua skor keseluruhan yang guru pilih sendiri, bukan pengiraan rubrik/permainan. Sokongan inklusif bukan penalti, disleksia bukan pencapaian rendah.

## Bahan sebenar
`sudut-guru-content.js` digunakan oleh skrin, cetakan dan generator `scripts/build-teacher-resources.mjs`. Enam HTML kendiri dibina di `dist/assets/downloads/`: rph-60-minit.html, rubrik-lisan.html, rubrik-bertulis.html, lembaran-kerja.html, kad-gambar-cerita.html, panduan-guru.html. Fail boleh dibuka offline; semua CSS inline, 24 kad gambar menggunakan enam atlas Loka sedia ada, setiap atlas di-embed base64 sekali sahaja (peraturan CSS setiap atlas) supaya saiz tidak digandakan empat kali. HTML ialah format sebenar, bukan fail yang dilabel PDF secara palsu; cetak/simpan PDF melalui browser. Dokumen butiran dibuka dalam cetakan supaya audit tidak hilang.

## Rekod dan keselamatan
Lihat `SUDUT_GURU_INTEGRATION.md`. Demo tiga identiti rekaan, termasuk dua Aisyah, diasingkan oleh UUID automatik. Satu baris setiap ID, paparan empat lajur utama, butiran L1–L6, skor1–5, ulasan, tarikh Kuala Lumpur. Storan namespace demo berasingan; data permainan sebenar tidak dibaca/diubah. Storan gagal → sesi sahaja. Reset demo tersedia. Tiada pengumpulan ID manual, password sebenar atau data murid sebenar.

Endpoint rekod baharu sentiasa503/no-store; laluan guru lama pada proksi turut503 sebelum fetch upstream. Apps Script draf tidak dipasang pada doPost dan semua operasi I/O dikunci gate yang sentiasa menolak. Schema/LockService/upsert by existingstudentId/ownershipmedan disediakan untuk integrasi akhir; tiada migration atau sambunganSheets dilakukan. Sesi guru, rate limiting tahan instance, CSRF dan bukti gateway belum diimplementasikan; ia prasyarat final, bukan keselamatan yang didakwa siap.

## Audio dan video
65 slot rakaman, skrip/status dalam `teacher-audio-catalog.js`, `AUDIO_GURU_SCRIPTS.md`, `AUDIO_GURU_AUDIT.md` dan skrin Dokumen Sokongan → Audio. Tiada MP3 guru sekarang. Lapisan speech() diutamakan fail sebenar yang teksnya sepadan, kemudian sandaran browser berlabel; playback bersama tidak bertindih. Modul tiga misi Loka1–6 tidak diubah. Perpustakaan masih hanya rakaman, mengekalkan status pending; folder baharu disokong dengan laluan lama sebagai sandaran rakaman. Slot Gerbang/Loka1/tahniah Grand Finale belum diaktifkan ke butang kerana tiada butang suara pada versi asal.

Video `<video controls playsinline>` responsif, poster kiosk, tiada autoplay. Fail sebenar `assets/video/guru/panduan-simpulloka.mp4`, sari kata pilihan `.ms.vtt`; manifest build daripada fail sebenar. Belum ada video, maka “Video panduan akan disediakan” + panduan teks. Header inventory bukan ujian decode kualiti: selepas fail diberi, decode/dengar/tonton sebelum integrasi akhir.

## Ujian dan batas
`npm run check && npm test && npm run build`, `npm run test:teacher` dan regresi browser Loka1–6, Grand Finale, Imbas, Ferris, Library dan global. Harness teacher meliputi kandungan tepat, rubrik/print, semua download offline +24imej, demo same-name/save/reload/reset/noPOST/fallback, akses belumaktif, real local fixture MP3/video+caption/fallback/silence, keyboard/touch dan inclusive320–1440. Fail fixture kecil dalam tests/fixtures ialah nada sintetik ujian dan video biru ujian, bukan rakaman cikgu dan tidak dibina ke production. Unit menguji ownershipmedan dan gateGAS/proksi; tidak membuktikan GoogleSheets sebenar.

Preview aplikasi sebenar di `preview-screenshots/sudut-guru/`, scratch/report/frame di `work/sudut-guru/` (ignored). Screenshot desktop/telefon untuk semua bahagian utama, satu MP4 navigasi. Tiada mockup statik sebagai bukti. Batas: Chromium/emulasi telefon, bukan Safari/peranti fizikal atau pembaca skrin manusia. Backend sekolah/sesi guru dan rakaman cikgu sebenar menunggu fasa integrasi akhir.

## Keputusan akhir preview
Semua check/unit/build dan test:teacher LULUS. Regresi Loka1–6, browserglobal, Imbas, GrandFinale, Ferris dan Library LULUS. Persediaan ujian Loka3 menggunakan API Ferris.skip() sedia ada supaya tidak berlumba dengan butang yang hilang selepas animasi; permainan tidak diubah. 24 audit axe tiada pelanggaran, sifar pageerror/aset gagal preview. 24 PNG dan satu MP4 35.5s disahkan decode/nonblank; semua24kad muat turun diuji offline selepas penjanaan CSS disesuaikan untuk atlasPNGbesar. Tiada sambungan GoogleSheets sebenar diuji atau diaktifkan.
