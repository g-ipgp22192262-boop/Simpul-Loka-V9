# Loka 5 — Mandi Peluh: Ekspres Peluh Ajaib

**Status: pembangunan/ujian untuk semakan sahaja. Kod, aset permainan, ujian dan dokumentasi Loka 5 BELUM diluluskan untuk commit/push. Media preview sahaja dibenarkan. Tiada deployment Netlify/Cloudflare; Loka 6 tidak dibangunkan.**

Prasyarat telah dipenuhi: Loka 4 termasuk empat pulau 2.5D diluluskan, diuji, di-commit dan dipush pada `843284f79304cdf12f29c6314dc85bed15263d5e`. Pembangunan Loka 5 bermula selepas push itu disahkan. Mockup `public/assets/loka5-mockup.png` telah diperiksa; ia tidak digunakan sebagai antaramuka statik.

## Tiga misi dan cerita

Gerbang → Teroka Makna → Cabaran Loka → Pentas Cerita → perjalanan roller coaster penamat → Cop Pasport → Roda Ferris. Perjalanan penamat bukan misi keempat.

Maksud: berpeluh dengan banyak, lazimnya selepas melakukan kerja atau aktiviti yang menggunakan tenaga. Danish dan rakan-rakannya menyediakan peralatan gotong-royong, membersihkan taman, bekerja bersungguh-sungguh hingga berpeluh, kemudian menikmati taman bersih dan berehat sambil minum air. Empat ilustrasi menunjukkan peristiwa berbeza dengan pakaian/lokasi konsisten.

Misi 1 mempunyai tiga langkah bergambar: maksud, beza literal/kiasan, dan contoh ayat. Semua langkah perlu diselesaikan sebelum Misi 2 dibuka. Jawapan salah memberi penjelasan dan percubaan tanpa penalti. Audio arahan menggunakan bacaan pelayar sedia ada, bukan rakaman guru baharu.

Misi 2 bermula dengan avatar tiket berjalan ke gerabak, duduk di belakang badan gerabak dan palang keselamatan ditutup. Mula Pengembaraan memulakan proses ini. Pam Tenaga lima kali meningkatkan meter 20% setiap tindakan dan menggerakkan gerabak ke puncak awal sepanjang trek. Bantuan Automatik sekali tekan melengkapkan baki pendakian; tiada tekanan masa. Roda berputar mengikut jarak perjalanan; bunyi mekanikal pendek dan lembut menghormati Senyap. Tetikus, papan kekunci dan sentuhan mempunyai pengendali nyata; klik keserasian selepas touch ditapis supaya tindakan tidak berganda.

Empat stesen ialah aktiviti sebenar:

1. Kutip Daun Berguguran: seret empat daun ke bakul atau tekan daun; daun bergerak ke bakul dan hilang dari kawasan taman. Empat daun diperlukan untuk satu gambar cerita.
2. Susun Pasu Bunga: seret atau pilih pasu kemudian tapak dengan petunjuk warna. Biru ke biru; dua pasu merah jambu boleh dipadankan dengan mana-mana tapak merah jambu. Pasu bergerak ke sasaran; tiga pasu diperlukan untuk satu gambar.
3. Mengapa Danish Berpeluh?: ilustrasi Danish mengangkat pasu ketika bekerja; pilih sebab yang tepat. Maklum balas menerangkan penggunaan tenaga.
4. Pilih Ayat yang Tepat: ilustrasi taman yang bersih; pilih ayat menggunakan mandi peluh dengan tepat, dengan penjelasan ringkas.

Gerabak bergerak sepanjang trek apabila murid meneruskan ke stesen berikutnya. Setiap aktiviti membuka satu kad; perjalanan sahaja tidak memberikan kad. Selepas empat kad, paparan bertukar kepada susunan rawak. Drag-and-drop, pilih/letak, alih kiri/kanan dan keluarkan tersedia melalui `LokaSequence`. Salah pertama memberi petunjuk kecil, salah kedua lebih jelas, salah ketiga menunjukkan susunan berpandu berserta penerangan sebab-akibat.

Misi 3 menggunakan `LokaStory` sedia ada dengan avatar pilihan murid yang besar, mulut/tangan berartikulasi, Mula/Selesai Bercerita, main semula, rakam semula, muat turun dan bantuan ayat Ringkas/Sederhana/Lanjutan rasmi. Laluan lisan terus kepada guru tetap tersedia. Audio hanya Blob dalam memori pelayar; tidak dimuat naik atau disimpan dalam localStorage/Sheets. Kebenaran mikrofon hanya diminta selepas tindakan pengguna; ditolak/tidak disokong tidak menyekat kejayaan.

## Trek dan kemuncak sebenar

`LokaFiveTrack` ialah satu path SVG berterusan yang dibina daripada enam segmen Bezier. Panjang segmen menentukan stesen/puncak; `getPointAtLength` menentukan kedudukan gerabak dan tangen menentukan sudut/arahnya. Roda menyentuh garis trek dan penumpang berada dalam kumpulan transform gerabak yang sama. Gerabak dibalikkan secara mendatar semasa bergerak ke kiri tanpa menterbalikkan penumpang.

Selepas penceritaan disahkan: gerabak bergerak perlahan dari stesen terakhir ke puncak, kamera menonjolkan ketinggian, jeda singkat, pecutan menurun, selekoh, kemudian perlahan pulang ke stesen. Kamera dan trek berada dalam sistem koordinat sama; latar mempunyai parallax kecil dan garis kelajuan. Kamera beransur kembali ke identiti sebelum ketibaan, mengelakkan lompatan pemandangan. Konfeti sekali sahaja meraikan ketibaan. Fokus/Reduce/OS motion menggunakan perjalanan ringkas dan tanpa hiasan berlebihan. Langkau Animasi terus memberikan hasil kejayaan; watchdog menyelesaikan animasi jika RAF gagal.

State `told` disimpan sebelum kemuncak. Jika keluar sebelum animasi tamat, Gerbang menawarkan Teruskan Perjalanan Penamat tanpa mengulang pembelajaran. `finished` dan cop disimpan selepas ketibaan atau Langkau. Lawatan semula memaparkan cop sedia ada, tanpa mengulang upacara atau ganjaran secara automatik.

## Pasport, kemajuan dan PBD

State: `simpulloka_v9_loka5_<mode>_<studentId>`. Kontrak `saveProgress` asal digunakan dengan lokaId 5. Percubaan susunan, bantuan, makna, susunan betul dan selesai digunakan sebagai rekod kemajuan; tiada audio dihantar. Catatan pemerhatian setempat boleh dibuka/tutup di penamat dan pautan penilaian guru sedia ada dikekalkan. Tiada TP atau penilaian suara automatik.

`LokaPassport` sedia ada menerima lambang roller coaster, cop lain yang benar-benar selesai dan resit upacara sekali sahaja. `LokaRewards` tidak diubah: mana-mana tiga Loka unik memberi gula kapas merah jambu sekali; enam memberi kelayakan emas/sijil fasa akhir. Loka 5 sahaja tidak memberikan gula kapas. Paparan ganjaran menunggu simpanan kemajuan semasa supaya jumlah Loka tidak tertinggal satu rekod. Tiada pangkalan data atau backend baharu.

## Visual dan inklusif

Latar garden.webp, cart.webp, danish-story.webp, empat station*.webp serta props.webp ialah ilustrasi berasingan yang dijana berpandukan mockup dan dimampatkan. Trek, roda, keselamatan, avatar, semua objek seret, panel, butang dan aktiviti ialah elemen sebenar. Gerabak mempunyai badan belakang/hadapan berlapis yang menutup bahagian bawah avatar; aset gerabak menggunakan sempadan alpha sebenar untuk penjajaran roda. Atlas cerita dan atlas objek mengekalkan nisbah asal. SVG dalaman objek tidak memintas drag butang.

Andika, tulisan besar, jarak luas, kontras, Fokus, Kurangkan Animasi, Senyap, sentuhan, papan kekunci, zum dialog/Escape, bantuan pam serta petunjuk dikekalkan. Hiasan berhenti dalam Fokus/Reduce; aktiviti utama tetap boleh diselesaikan. Audio/perakam/stream dibersihkan ketika keluar. Mengurangkan animasi atau menggunakan bantuan tidak mengurangkan ganjaran pembelajaran.

## Fail pembangunan

Baharu: `public/assets/loka-five.js`, `loka-five-track.js`, `loka-five-art.js`, `loka-five.css`, lapan WebP dalam `public/assets/images/loka5/`, `tests/loka-five-browser.mjs`, `loka-five-helpers.mjs`, `loka-five-track.test.mjs`, dokumen ini.

Integrasi terhad: `app.js` routing/lifecycle/preferences dan data Mandi Peluh; `index.html` muatan modul/CSS; `package.json` check/test:loka5; `tests/browser.mjs` menggunakan aliran Loka 5 sebenar. Kod permainan Loka 1–4, avatar/perakam bersama, syarat ganjaran, backend, Netlify dan projek V7 tidak diubah. HOME_PREVIEW sedia ada tidak disentuh.

## Semakan dan preview

Perintah: `npm run check && npm test && npm run build`; `npm run test:loka5`; regresi `test:loka1`, `test:loka2`, `test:loka3`, `test:loka4`, `test:browser`. Node menguji arah/tangen gerabak dan perjalanan penamat monotonik. Browser menguji makna/literal/contoh, boarding/palang, lima pam, bantuan, seret/klik, padanan pasu, empat kad, petunjuk tiga tahap, perakam sebenar melalui mikrofon simulasi Chromium, muat turun, Senyap, lisan, empat avatar, penurunan, ketibaan, Skip/watchdog/OS/Focus/Reduce, nota guru, resit ganjaran, sentuhan dan lebar 320–1440px.

Media `preview-screenshots/loka5/`: 36 PNG (18 paparan berpasangan desktop/telefon) dan enam pasangan MP4/GIF (boarding-lock, pump-climb, four-stations, avatar-story, coaster-descent, passport-reward). Tambahan `coaster-overview.mp4` menggabungkan rakaman boarding, pendakian, penurunan dan penamat menjadi satu video ringkas (jumlah 49 media: 36 PNG, tujuh MP4, enam GIF). Video kemuncak dan penamat bersama-sama menunjukkan penurunan, membrek, ketibaan dan upacara/ganjaran. Semuanya bingkai browser sebenar; tiada mockup sebagai bukti permainan. Video tiada audio dan rakaman avatar menggunakan mikrofon simulasi, bukan suara murid. Skrip QA/frames/audit dalam `work/loka5/` tidak termasuk production.

Batas: ujian Chromium headless/emulasi telefon, bukan Safari/iOS atau mikrofon fizikal. Audit automatik bukan pengganti semakan pembaca skrin manusia. Backend sekolah sebenar dan deployment tidak dijalankan. Tunggu kelulusan pengguna sebelum commit kod Loka 5.

## Pengesahan sambungan kerja

Semakan semula `npm run check && npm test && npm run build` lulus. Ujian browser Loka 5 lulus dengan sifar pageerror, termasuk seretan pointer sebenar selepas penstabilan tatal, sentuhan telefon, rakaman sementara, penurunan dan jumlah lima Loka unik apabila empat sudah lengkap. Resit ganjaran tiga Loka kekal sama selepas Loka 5. Audit sedia ada: 26 paparan desktop/telefon dan dua semakan semula penamat, semua tanpa pelanggaran axe yang dikesan. Semua 49 media didekod: PNG bukan kosong, semua bingkai GIF sah, MP4 didekod penuh dan bingkai sampel berubah. Video ringkasan ialah cantuman rakaman UI sebenar; tiada audit/rakaman berat diulang tanpa keperluan. Kod, aset, ujian dan dokumen Loka 5 masih belum diluluskan untuk commit.
