# Grand Finale SimpulLoka — semakan akhir Loka 6

Status: Loka 6 dan Grand Finale telah diluluskan pengguna; ujian kritikal disahkan semula sebelum release. Tiada deployment. Imbas Loka dan Sudut Guru tidak dibangunkan.

Mockup rasmi `public/assets/grand-finale-mockup.png` disegerakkan daripada branch work melalui fast-forward `a73c3e983390bccf2daa212eaa573e6d9ac445c5`. Ia satu-satunya perubahan remote; snapshot mengesahkan 21 perubahan tempatan Loka 6 kekal terpelihara. Mockup tidak digunakan sebagai satu imej aplikasi.

## Skop perubahan

Hanya komponen `public/assets/loka-six-final.js` diganti dengan persembahan Grand Finale. CSS baharu `grand-finale.css`, lima WebP dalam `assets/images/grand-finale/`, link CSS index.html, ujian `tests/grand-finale-browser.mjs`, skrip package test:finale, dan penyesuaian langkah interaksi Grand Finale dalam ujian Loka 6. Kod tiga misi/kapal/pasport Loka 6 tidak diubah. Loka 1–5, syarat/resit ganjaran bersama dan backend tidak diubah oleh penambahbaikan ini.

## Lima fasa sebenar

1. Enam cop unik dengan nama tepat serta ikon tarikan masing-masing (botol, hadiah, memanah, buaian, roller coaster, kapal). Tidak meniru kesilapan label/ikon berulang dalam mockup. Ucapan tahniah dan pembantu statik; murid memilih Buka Hadiah Ajaib mengikut keselesaan sendiri.
2. Kotak biru diraja/emas muncul, penutup aset berasingan terbuka menggunakan animasi 3D pada engsel, cahaya lembut tanpa kilatan.
3. Gula kapas berilustrasi 2.5D besar, gebu berlapis emas/pink/biru pastel, bintang dan reben biru naik dari kotak. Badan depan kotak melindungi bahagian bawah hadiah agar kedalaman visual konsisten.
4. Pembantu otter ceria menunjuk hadiah. Teks galakan dan Teruskan ke Sijil. Hanya satu fokus utama setiap fasa; tiada bunga api/konfeti/animasi latar berulang. Rangkaian hadiah sekitar 3.4 saat, sebelum sijil yang dikawal pengguna.
5. Sijil sebenar dengan nama daripada session.nickname. Jika kosong/ruang, borang nama diperlukan sebelum menjana sijil. Tarikh menggunakan Date semasa, format ms-MY dan zon Asia/Kuala_Lumpur ketika sijil dijana. Tiada nama/tarikh contoh tetap. Muat turun SVG 1200×850 boleh didekod, dibuka dan dicetak melalui pelayar; mengandungi nama, kelas, tarikh, identiti SimpulLoka dan nama enam Loka. Imbas Loka dilabel belum tersedia dengan butang disabled; Kembali ke Roda Ferris berfungsi.

## Kemajuan dan kebolehcapaian

Count===6 daripada LokaRewards asal diwajibkan sebelum mount, membuka hadiah, sijil atau download. Loka 6 sahaja tidak membuka Grand Finale. Resit six yang sama digunakan; tidak mengubah kaedah kira, tidak membuat salinan progress/pangkalan data. Resit dimainkan ditandakan sebelum membuka hadiah atau Langkau; lawatan semula menawarkan Lihat Hadiah dan Sijil, tanpa mengulang sambutan secara automatik. Cop Loka dan gula kapas merah jambu kekal di sistem asal.

Native dialog mengekalkan latar pasport yang diredam. Tab/Shift+Tab berkitar dalam dialog; Escape/Tutup mengembalikan fokus ke pencetus jika tersedia. Setiap fasa memaparkan satu bahagian, heading fokus serta butang Langkau melekat di bawah. Langkau sentiasa terus ke sijil (borang nama jika perlu), tidak bergantung kepada kejayaan animasi. Watchdog/catch memastikan kegagalan WAAPI tidak menyekat. Fokus/Reduce/OS reduced motion terus kepada persembahan hadiah statik, tanpa kehilangan sijil. Fon/saiz teks/kontras global dihormati. Tiada muzik/pertuturan/bunyi baharu. Timer, animasi, dialog dan listener dibersihkan ketika keluar.

## QA dan preview

Perintah check/test/build, test:finale, regresi test:loka1–6 dan test:browser. Ujian akhir memeriksa pintu enam unik, ketiadaan bagi Loka 6 sahaja, tiada ganjaran berganda, enam nama/ikon, animasi penutup/gula kapas yang benar-benar bergerak, Skip/Focus/Reduce/OS/WAAPI gagal, nama/tarikh semasa, fallback nama, XML SVG sah dan decode imej muat turun, papan kekunci, sentuhan/lebar 320–1440 dan kembali ke Ferris.

Media sebenar di `preview-screenshots/grand-finale/`: 12 PNG (enam paparan desktop/telefon) dan satu MP4 ringkas. Rakaman hanya satu sesi desktop sebenar, bukan mockup. Data ujian menggunakan Nur Safiya, bukan nilai tetap sijil. Screenshot telefon menangkap seluruh kandungan dialog yang boleh ditatal melalui style capture sementara; UI dan logik aplikasi tidak diubah untuk rakaman. Audit statik dilakukan pada UI normal, bukan style capture. Bingkai sementara, laporan dan fail sijil ujian berada dalam work/grand-finale (ignored).

Batas: Chromium desktop/emulasi telefon; Safari/iOS/peranti fizikal dan pembaca skrin manusia belum disemak. Fail sijil ialah SVG, bukan PDF. Backend sekolah dan hosting tidak diakses untuk deployment.

Pengesahan release: check/test/build lulus, browser Loka 6 dan Grand Finale lulus semula. Penantian penutup dalam ujian menggunakan keadaan transform sebenar, bukan jeda tetap 600ms. Pembetulan aliran sijil/Imbas Loka ialah fasa seterusnya dan tidak termasuk release ini. Tiada deployment.
