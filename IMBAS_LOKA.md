# Imbas Loka dan satu aliran sijil SimpulLoka

Status: Imbas Loka dan pembetulan aliran sijil BELUM diluluskan untuk commit/push. Hanya media preview dibenarkan. Tiada deployment. Sudut Guru tidak dibangunkan.

## Fasa A yang telah disimpan

Loka 5 disahkan berada di GitHub (`7d7e43c0904ba74a3961acadd7e67e26b424de79`). Sumber Loka 6/Grand Finale sepadan dengan snapshot preview. Check/test/build dan browser Loka 6 serta Grand Finale disahkan semula, kemudian 28 fail diluluskan sahaja di-commit dan dipush pada `e4d301b0e89ce92791d00c22d9efa7cbf1d8e9b6` dengan penanda skip hosting/CI. HOME_PREVIEW.md asal tidak disentuh. Penantian ujian penutup diganti daripada 600ms tetap kepada keadaan transform sebenar; tiada mekanik permainan diubah.

## Mockup dan visual

Nama sebenar mockup rasmi di branch work ialah `public/assets/imbasloka-mockup.png` (tanpa tanda sempang selepas imbas). Fail ini telah diperiksa dan digunakan, bukan diganti dengan mockup alternatif. Background courtyard.webp ialah lapisan suasana 2.5D taman fantasi/portal cermin berpandukan mockup, tanpa butang/teks palsu. Pembantu menggunakan aset otter Grand Finale yang sama. Enam ilustrasi menggunakan atlas Perpustakaan sedia ada dengan nisbah sel asal dikekalkan. Semua panel, pilihan, radio, teks, textarea dan navigasi ialah HTML sebenar. Tiada animasi hiasan berulang.

## Satu sijil, satu sumber kelayakan

Tiada komponen, rekod atau sijil kedua dibina. Renderer `certificateSvg()`/`renderCertificate()` dalam LokaSixFinal sedia ada digunakan oleh semua laluan:

- Grand Finale → Langkau & Lihat Sijil.
- Grand Finale → Teruskan ke Imbas Loka → Selesai Imbas Loka → sijil yang sama.
- Langkau pada mana-mana soalan → sijil yang sama.
- Pasport → Lihat Sijil, atau route certificate → sijil yang sama.

Kelayakan sentiasa `session && LokaRewards.count()===6`, berdasarkan enam Loka unik asal. Refleksi tidak menjadi syarat. Nama daripada tiket/nama yang diberikan secara jelas jika tiada; tarikh sebenar Malaysia daripada renderer asal. Muat turun kekal SVG 1200×850 dengan nama fail yang sama. Ujian membandingkan kandungan SVG muat turun sebelum/selepas refleksi, melalui Langkau dan buka semula dari Pasport; sama secara tepat dalam hari/sesi ujian.

MountCertificate membuka fasa sijil secara terus tanpa memanggil claimFinal/menandakan resit played. Tiada sambutan automatik ketika membuka semula sijil. Resit gula kapas tiga/enam Loka, cop pasport dan kriteria kemajuan tidak diubah. Perubahan LokaRewards hanya menggantikan label sijil “fasa akhir” yang sudah lapuk. Nav Imbas Loka menjadi entri utama; halaman refleksi lama masih tersedia melalui route reflection supaya data/kawalan pemulihan dan integrasi guru lama kekal.

## Refleksi kendiri

Tiga soalan, satu pada satu masa. Enam nama tepat (Dalam tangan, Ambil hati, Anak emas, Air muka, Mandi peluh, Cakap besar). Soalan 1 diingati, Soalan 2 menerima faham/belajar/bantuan sama rata, Soalan 3 kegemaran dan sebab pilihan (boleh kosong atau diceritakan kepada guru tanpa rakaman). Tiada markah, jawapan betul/salah, TP atau penilaian bahasa automatik.

Pilihan native radio menyokong Tab/anak panah/Space dan label seluruh kad mesra sentuhan. Kembali, Seterusnya, Ubah Jawapan dan Langkau mengekalkan pilihan. Seterusnya aktif selepas memilih satu jawapan sahaja; sijil tetap boleh dibuka tanpa melengkapkan refleksi. Ringkasan menggunakan respons sebenar, bukan nilai contoh. Nota neutral menghargai semua tahap kefahaman kendiri.

## Storan dan privasi

`ImbasLokaState` menormalisasikan draf. Kunci `simpulloka_v9_imbas_<mode>_<studentId>` menggunakan identiti sesi sedia ada, tanpa token atau PII tambahan. Fields: step, remembered, understanding, favourite, reason (maksimum 240 aksara), completed. Draf disimpan pada pilihan/input; Selesai menetapkan completed lalu membuka sijil. Tiada panggilan saveReflection, backend baharu, POST, Google Sheets, audio atau MediaRecorder. Data PBD/rekod lama tidak diubah.

Status menerangkan simpanan pelayar ini sahaja dan kehilangan apabila data pelayar dipadam. Jika storan gagal, Map dalam sesi mengekalkan draf dan status menerangkan had tersebut; tiada dakwaan simpanan kekal. Kunci mengasingkan murid serta mode; jawapan murid lama tidak muncul pada tiket baharu. Teks sebab di-escape sebelum ditunjukkan dalam ringkasan.

## Inklusif dan lifecycle

Andika, tulisan besar/sangat besar, kontras, Fokus, Senyap dan OS reduced motion global dikekalkan. Senyap menyahaktif audio arahan; bacaan pelayar hanya apabila butang ditekan, tiada suara/rakaman wajib. Native radio, butang besar, satu soalan, arahan ringkas dan tiada had masa. Responsif diuji 320–1440px, termasuk teks sangat besar. Dialog sijil asal mengekalkan fokus papan kekunci dan Escape. Keluar Imbas menghentikan bacaan arahan dan membersihkan rujukan UI; tiada animasi/perakam baharu.

## Fail

Baharu: assets/imbas-loka-state.js, assets/imbas-loka.js, assets/imbas-loka.css, assets/images/imbas-loka/courtyard.webp, tests/imbas-loka-state.test.mjs, tests/imbas-loka-browser.mjs, dokumen ini.
Integrasi: loka-six-final.js adapter/laluan sijil dan dua pilihan selepas hadiah; app.js routing/lifecycle/nav/Pasport; loka-rewards.js label sijil sahaja; index.html muatan modul/CSS; package.json check/test:imbas; penyesuaian ujian Grand Finale (Imbas kini aktif) dan navigasi global. Kod/visual tiga misi Loka 1–6, ayunan akhir, backend, struktur PBD dan V7 tidak diubah.

## QA dan media

Perintah: npm run check && npm test && npm run build; test:imbas; test:finale; test:loka1–6; test:browser. Ujian sebenar meliputi Grand/skip/Imbas/Sijil/Pasport/Ferris, perbandingan SVG, syarat enam unik, tiada resit bertambah, ketiga-tiga respons sah, sebab kosong, back/edit/summary, reload/isolation/storage failure, sifar POST, nama/tarikh, radio keyboard/sentuhan, audio senyap dan saiz 320–1440px. Fail sijil SVG juga diuji oleh Grand Finale yang asal.

Preview sebenar: preview-screenshots/imbas-loka/ — 16 PNG (8 paparan desktop/telefon) dan satu MP4 ringkas melalui Grand → Imbas → sijil yang sama. 16 audit axe pada UI normal, tiada pelanggaran dikesan. Tangkapan dialog telefon merangkumi kandungan boleh tatal menggunakan style capture sementara, bukan perubahan aplikasi. Scratch frames, laporan dan sijil ujian dalam work/imbas-loka (ignored), bukan production.

Batas: Chromium desktop/emulasi telefon, bukan ujian Safari/iOS/peranti fizikal atau pembaca skrin manusia. Draf tidak disegerakkan antara peranti. Sijil SVG bukan PDF. Tiada hosting deployment atau integrasi backend sekolah baharu.

Penstabilan harness regresi: persediaan Ferris Loka 2 menggunakan API skip sedia ada; panel Mod Inklusif ditutup sebelum interaksi permainan; helper Loka 5/6 menunggu kemajuan selepas tamat secara semula jadi (butang Langkau boleh hilang dalam Mod Fokus); jangkaan label sijil Loka 3 dikemas kini daripada teks lama “fasa akhir” kepada syarat satu sijil selepas enam Loka. Tiada mekanik permainan diubah.

Keputusan akhir: check, unit test dan build LULUS; test:imbas, test:finale, test:loka1–6, test:ferris, test:library dan test:browser LULUS. 16 audit axe sifar pelanggaran, sifar pageerror/aset gagal untuk preview; 17 media disahkan decode penuh dan tidak kosong. Ujian semula Loka 2/3 serta global lulus selepas penstabilan harness yang diterangkan di atas.
