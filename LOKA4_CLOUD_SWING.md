# Loka 4 — Air Muka: Buaian Diraja dalam Taman Awan Ajaib

Status: **Loka 4, termasuk pembetulan ilustrasi empat pulau, diluluskan pengguna untuk commit dan push ke `work`. Tiada deployment Netlify dibenarkan.** Asas yang diluluskan: Loka 3 `312fa737bbecca712c665c998a2e465a15782a00` pada branch `work`.

## Kandungan dan aliran

Gerbang (bukan misi tambahan) → Teroka Makna → Cabaran Loka → Pentas Cerita → Upacara Cop Pasport → Roda Ferris. Tepat tiga misi.

Maksud dalam konteks ini: **maruah atau harga diri seseorang yang perlu dijaga**. Cerita: Amir membaca di hadapan kelas, tersalah menyebut perkataan dan berasa malu. Sofia membantu secara perlahan dengan kata-kata baik. Amir kembali yakin. Tiada ejekan digambarkan dan murid lain tidak direndahkan.

Misi 1 mempunyai dua langkah: pilih maksud kiasan, kemudian tindakan yang menjaga air muka. Kedua-duanya perlu selesai sebelum buaian dibuka. Salah menjawab memberi penjelasan dan percubaan semula.

Misi 2 menggunakan koordinat SVG yang sama untuk kerusi, avatar tiket, tali dan zon bintang. Buaian berayun secara sinus; zon bintang bergerak perlahan pada arka sama. Kedudukan visual menentukan kejayaan (`abs(angle-zone)<=13°`). Mula Buaian → Berhenti. Jika tersasar, tiada mata/nyawa ditolak. Berhenti Berpandu menyelaraskan kerusi dengan bintang dan murid menekan Berhenti. Pendaratan menggerakkan kerusi sebenar ke koordinat pulau; hujung tali mengikuti kerusi. Langkau dan watchdog 1.8 saat melengkapkan pendaratan jika animasi gagal. Halaman tersembunyi menghentikan buaian/rakaman.

Empat pulau berturutan: Kenali Perasaan; Fahami Situasi; Kata-kata Baik; Lengkapkan Cerita. Setiap pulau mempunyai ilustrasi dan soalan pemahaman berbeza. Pendaratan sahaja tidak membuka kad; jawapan betul diperlukan. Empat kad dikumpulkan dahulu, kemudian paparan berubah kepada susunan cerita rawak. Seret-lepas dan pilih/letak/alihtempat tersedia. Kesilapan pertama/kedua memberi petunjuk khusus; kesilapan ketiga menunjukkan susunan berpandu dengan penerangan sebab-akibat.

Misi 3 menggunakan `LokaStory` sedia ada: avatar tiket besar, mulut/tangan bergerak, Mula/Selesai Bercerita, main semula, rakam semula, muat turun, tiga bantuan ayat dan pilihan bercerita terus kepada guru. Izin diminta selepas klik. Audio kekal Blob dalam memori; tiada upload atau salinan audio di localStorage. Mikrofon ditolak/tidak tersedia tidak menyekat penamat. Arahan audio ialah bacaan pelayar sedia ada, bukannya rakaman guru sebenar.

## Kemajuan, PBD dan ganjaran

State antara misi: `simpulloka_v9_loka4_<mode>_<studentId>`. `saveProgress` menggunakan lokaId 4 dan kontrak sedia ada. Catatan pemerhatian setempat dan pautan penilaian guru kekal dalam bahagian boleh buka/tutup. Tiada TP automatik berdasarkan masa hentian, klik atau bantuan.

Pasport menggunakan `LokaPassport` sedia ada dengan cop buaian unik. Hanya cop Loka lain yang benar-benar selesai dipaparkan. Upacara baharu dimainkan sekali; lawatan semula tidak mengulangnya. `LokaRewards` dan syaratnya tidak diubah: mana-mana tiga Loka unik → gula kapas merah jambu; enam → kelayakan emas/sijil fasa akhir. Tidak melaksanakan sijil akhir atau Loka 5.

## Visual dan inklusif

Mockup rasmi `public/assets/loka4-mockup.png` telah diperiksa. Latar `cloud-garden.webp` dan atlas `amir-sofia-story.webp` ialah ilustrasi berasingan (jumlah sekitar 440 KB); mockup tidak digunakan sebagai antaramuka. Semua butang/panel/kad boleh digunakan; buaian, tali, kerusi, zon bintang dan pulau ialah elemen berlapis yang hidup. Parallax latar kecil mengikuti ayunan; dua lapisan awan bergerak pada kadar berbeza. Hiasan berhenti dalam Fokus/Kurangkan Animasi/OS reduced motion. Mod ini menyediakan hentian sejajar serta pendaratan ringkas; permainan masih boleh diselesaikan.

Fon Andika, tulisan besar, jarak huruf luas, kontras tinggi, Senyap, zum dialog/Escape, sentuhan dan papan kekunci dikekalkan. Kawalan sentuhan menangani pointerup dan menapis klik keserasian berganda. Pengendali ini hanya dipasang dalam Misi 2 supaya butang Selesai Bercerita Misi 3 mengekalkan pengendali rakaman asal.

## Fail

Baharu: `public/assets/loka-four.js`, `loka-four-art.js`, `loka-four.css`, dua WebP dalam `public/assets/images/loka4/`, `tests/loka-four-browser.mjs`, `loka-four-helpers.mjs`, dokumen ini.

Integrasi: `public/index.html` memuatkan modul/CSS; `app.js` menambah routing/lifecycle/preference dan kandungan Air Muka sahaja. `loka-sequence.js` menerima petunjuk/callback salah pilihan, dengan nilai lalai Loka 3 dikekalkan; bekas bank diberi role group. `package.json` menambah check dan `test:loka4`. Regresi `tests/browser.mjs` menggunakan aliran Loka 4 sebenar. Fail permainan Loka 1–3, backend, Netlify, Gerbang, Ferris dan Perpustakaan tidak dirombak. `HOME_PREVIEW.md` sedia ada tidak disentuh.

## Ujian dan media

Perintah: `npm run check && npm test && npm run build`, `npm run test:loka4`, regresi `test:loka1`, `test:loka2`, `test:loka3`, `test:browser`. Suite baharu menggunakan Ferris sebenar, soalan makna/konteks, koordinat kerusi/tali, pergerakan zon, tersasar/bantuan, empat soalan pulau, semua peringkat petunjuk, seret/klik, perakam mikrofon simulasi, Senyap, lisan, empat avatar, pasport lama/ganjaran ambang, nota guru, sentuhan, papan kekunci, Fokus/Reduce/OS/Skip/watchdog dan lebar 320–1440 piksel.

Media `preview-screenshots/loka4/` di luar publish directory `public/`: PNG berpasangan desktop/telefon dan lima demonstrasi MP4/GIF (buaian/zona bintang, kemajuan pulau, susunan, avatar/rakaman, cop). Tangkapan diambil daripada aplikasi sebenar selepas fon/imej/latar didekod. Video dirakam daripada perubahan bingkai browser; tiada mockup, animasi rekaan luar aplikasi atau pergerakan palsu. MP4/GIF preview tiada audio; avatar menggunakan mikrofon simulasi tanpa suara murid. Skrip QA, frame dan laporan audit dalam `work/loka4/` tidak termasuk production.

Batas semakan: Chromium headless, mikrofon simulasi dan audit automatik; Safari/iOS sebenar, mikrofon fizikal dan semakan pembaca skrin manusia belum disahkan. Preview GitHub tidak bermaksud Loka 4 sudah diterbitkan di Netlify.

## Keputusan semakan setempat — 16 Oktober 2026

- `npm run check && npm test && npm run build`: lulus; empat fail suite Node lulus.
- `npm run test:loka4`: lulus, sifar pageerror. Termasuk rakaman/henti melalui tap pada viewport telefon 390px, serta semua enam mod ujian bantuan/animasi.
- Regresi `test:loka1`, `test:loka2`, `test:loka3`, `test:browser`: lulus, sifar pageerror. Fail permainan asal Loka 1–3, recorder/passport/rewards bersama, backend dan konfigurasi Netlify tidak berubah.
- 30 audit axe WCAG 2 A/AA dan 2.1 AA pada UI desktop/telefon: tiada pelanggaran dikesan; bukan pengganti audit pembaca skrin manusia.
- Media: 34 PNG dimuat/diperiksa, semua bingkai lima GIF sah, lima MP4 dinyahkod sepenuhnya dan tiga bingkai sampel setiap video tidak hitam serta menunjukkan perubahan kandungan sebenar. 44 fail keseluruhan.
- Suite Loka 4 merangkumi fallback mikrofon ditolak/tidak disokong, rakaman sebenar melalui peranti ujian Chromium, empat avatar, miss/percubaan semula, sentuhan, papan kekunci, lebar 320–1440px, penghujung tali sepadan kerusi, bantuan susunan tiga tahap, PBD setempat dan ganjaran tiga Loka unik.

Preview telah disemak dan pengguna telah meluluskan kod. Pelepasan menggunakan `[skip netlify] [skip ci]` untuk mematuhi arahan tanpa deployment.

## Semakan visual pulau 2.5D — diluluskan

Empat pulau vektor rata telah diganti sepenuhnya dengan empat aset ilustrasi WebP beralpha: `island-friendship.webp` (Taman Persahabatan), `island-feelings.webp` (Balai Perasaan), `island-courtesy.webp` (Taman Budi Bahasa), `island-dignity.webp` (Istana Air Muka). Ilustrasi dijana berasaskan identiti latar cloud-garden; setiap pulau mempunyai batuan berlapis, rumput, bunga, tumbuhan menjuntai, pencahayaan dan ruang pendaratan. Aset 768px, jumlah 664,392 bait (sekitar 649 KiB), dimuat sekali dan digunakan sebagai SVG image; tidak menambah animasi baharu pada pulau. Fail PNG asal berada dalam generated_images, bukan production.

Nama visual disepadukan pada panel pulau tanpa mengubah soalan, jawapan, cerita atau objektif pembelajaran. Label Pulau 1–4 berada pada lapisan berasingan di atas ilustrasi dan dibesarkan pada telefon. Ruang ilustrasi pulau bawah dilaras untuk mengelakkan puncak istana bersilang dengan label atas; titik pendaratan kekal asal. Avatar, kerusi, zon bintang, logik ayunan/hentian, Mod Inklusif, rakaman, pasport dan ganjaran tidak berubah. Skrip perbandingan mengesahkan hanya markup `swing`/`islandPanel` berubah dalam loka-four.js serta hash latar/atlas cerita kekal sama.

Preview baharu disimpan berasingan dalam `preview-screenshots/loka4/islands-v2/` supaya media fasa awal tidak ditimpa. Media dikongsi terlebih dahulu melalui commit `77932d3f85b8b467d25a70ed0395012aeafb8940`; kod dan aset kini dibenarkan untuk pelepasan selepas semakan akhir.

Keputusan revisi pulau: check/test/build lulus; suite penuh Loka 4 lulus dengan sifar pageerror termasuk empat aset sebenar dimuat, tiga misi, sentuhan/papan kekunci, mikrofon/fallback, pasport dan ganjaran. Preview akhir mempunyai 14 audit axe tanpa pelanggaran dan tiada aset gagal dimuat. Sampel 90 sela RAF pada viewport telefon Chromium semasa rakaman: median 16.7 ms, p95 16.8 ms, purata kira-kira 60 fps; ini ukuran emulasi browser, bukan jaminan perkakasan telefon sebenar. 14 PNG, dua MP4 dan dua GIF diperiksa sepenuhnya, termasuk perubahan bingkai video dan ketiadaan bingkai hitam/kosong.

## Pelepasan rasmi yang diluluskan

Semakan sebelum pelepasan: `npm run check && npm test && npm run build` lulus (11 ujian Node). Suite browser Loka 4 serta regresi Loka 1, Loka 2, Loka 3 dan navigasi umum semuanya lulus dengan sifar pageerror. Pelepasan merangkumi tiga misi, semua pembetulan empat pulau 2.5D, ujian dan dokumentasi. Fail sementara/HOME_PREVIEW dikecualikan. Pengguna mengarahkan tiada deployment; commit menggunakan `[skip netlify] [skip ci]`.
