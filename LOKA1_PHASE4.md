# Fasa 4 — Loka 1 Dalam Tangan V2 (versi rasmi diluluskan)

Branch `work`, rujukan terkini `public/assets/Loka1-mockup.png` (nama sebenar menggunakan L besar). Mockup tidak digunakan sebagai antaramuka. Gerai, botol SVG, bola, kad, kawalan dan pentas dibina sebagai HTML/CSS/JavaScript. Aset gerai tanpa antaramuka dan empat ilustrasi cerita baharu disimpan berasingan dalam `public/assets/images/loka1/`.

## Tiga misi

1. **Teroka Makna**: situasi guru mengesahkan kemenangan; dua pilihan maksud, penjelasan dan petunjuk selepas jawapan salah. Maksud dikekalkan daripada `IDIOMS[0]`. Cerita setempat Loka 1 dikemas kini mengikut arahan V2: menyertai pertandingan, menyelesaikan cabaran, diumumkan menang dan menerima hadiah. Kandungan Loka lain tidak diubah.
2. **Cabaran Loka**: Pointer Events menyokong seretan sentuhan/tetikus, butang Baling Bola menyokong klik/Enter/Space. Trajektori dikira daripada kedudukan DOM sebenar. Balingan automatik menyasarkan botol yang masih berdiri; seretan yang tersasar tidak menjatuhkan botol. Perlanggaran memberikan satu gambar. Tiga bola boleh ditambah tanpa had; bantuan sasaran sentiasa tersedia. Empat gambar boleh disusun dengan seret-lepas atau pilih/letak, alih kiri/kanan dan keluarkan. Semakan salah memberi petunjuk bertahap. Kegagalan Web Animations API menggunakan penyelesaian segera dan watchdog mengelakkan sekatan.
3. **Pentas Cerita**: empat gambar tersusun, avatar tiket (panda/harimau/kucing/ulat), bantuan ayat tiga tahap, rakam/henti/dengar/rakam semula/muat turun pilihan dan pengesahan penceritaan lisan. Murid boleh menamatkan tanpa mikrofon atau rakaman.

`LokaMissions` menyediakan nama dan prasyarat tiga misi untuk digunakan semula. Hanya `LokaOne` dibina; Loka 2–6 kekal menggunakan aliran asal.

## Rakaman dan privasi

`getUserMedia({audio:true})` dipanggil selepas murid menekan Rakam Cerita. `MediaRecorder` menghasilkan Blob dalam memori dan URL sementara untuk pemain serta muat turun. Tiada Blob, URL audio, base64, chunk atau fail dihantar ke backend, localStorage, Sheets atau pelayan. Keluar Loka membersihkan URL, menutup trek mikrofon, menghentikan pemain dan timer. Kebenaran lewat selepas keluar dibuang dan treknya ditutup. Permintaan mikrofon yang menunggu boleh dibatalkan melalui Selesai Rakaman. Rakaman dihadkan tiga minit setiap cubaan; rakam semula tersedia. Mod Senyap menghentikan main balik tanpa menutup fungsi rakaman. Mod Fokus/Kurangkan Animasi menghentikan gerakan hiasan; status rakaman kekal jelas.

Semakan automatik menggunakan mikrofon simulasi Chromium bagi menguji MediaRecorder sebenar. MP4/GIF demonstrasi ialah rakaman paparan tanpa audio murid. Belum diuji pada peranti fizikal atau Safari/iOS.

## Kemajuan dan PBD

Kunci `simpulloka_v9_loka1_<mode>_<studentId>` menyimpan kemajuan misi, balingan, bantuan, gambar dan susunan pada pelayar, berasingan daripada penilaian guru. `saveProgress` sedia ada menerima hanya ID/token, Loka 1, cubaan **susunan**, tahap petunjuk, susunan betul, kefahaman makna dan penceritaan selesai. Markah balingan tidak dihantar sebagai skor bahasa atau TP. Cop pasport menggunakan `completed` backend sedia ada. Jika simpanan pelayan gagal, murid tetap melihat ganjaran setempat dan boleh menekan Segerakkan Kemajuan; UI tidak mendakwa cop disimpan sebelum pengesahan.

Ganjaran menyediakan ruang pemerhatian guru (catatan setempat sahaja) dan pautan ke Sudut Cikgu sedia ada untuk pentaksiran rasmi. Tiada TP automatik, tiada perubahan struktur PBD, Google Apps Script atau backend.

## Integrasi dan fail

- `public/assets/loka-one.js`, `public/assets/loka-one.css`, `public/assets/images/loka1/`.
- Integrasi minimum `public/assets/app.js` (render Loka 1, mount/unmount, mod inklusif), `public/index.html` (muat modul/gaya).
- `package.json` menambah semakan sintaks dan `test:loka1`.
- `tests/loka-one-browser.mjs` menguji misi; `tests/browser.mjs` menggunakan aliran baharu bagi Loka 1 dan aliran asal bagi lima Loka lain.

Gerbang, Perpustakaan, Ferris, Loka 2–6, Rush, Konsert dan backend tidak direka semula. V7 tidak disentuh.

## Ujian dan media

`npm run check`, `npm test`, `npm run build`; ujian Playwright `test:loka1`, `test:browser`, `test:ferris`, `test:library` dan `node tests/home-browser.mjs`. Browser memerlukan server `dist/` pada port 4173 serta `PLAYWRIGHT_MODULE` dan `CHROMIUM_PATH` mengikut persekitaran sedia ada.

Semakan axe-core 4.10.3 bagi WCAG 2 A/AA dan 2.1 AA pada lima keadaan Loka 1: tiada pelanggaran ditemui. Ini melengkapi ujian papan kekunci, sentuhan, dialog zum, mod inklusif dan responsif; bukan pensijilan atau pengganti ujian pembaca skrin fizikal.

Media dalam `preview-screenshots/loka1-phase4/`: `mission1`, `mission2-bottles`, `mission2-sequence`, `mission3`, `reward`, masing-masing `-desktop.png` dan `-mobile.png`; `ball-throw.mp4/.gif` dan `avatar-story.mp4/.gif`. Media ini di luar `public/` dan tidak diterbitkan oleh build. Media V1 telah dikongsi melalui komit media sahaja. Kod V2 kini diluluskan untuk pelepasan rasmi; lihat master handoff bagi keadaan semasa.

## Kemasan V2

Kod enjin misi, balingan/perlanggaran, susunan, bantuan, kemajuan, cop, pemerhatian guru dan MediaRecorder sedia ada diperbaiki; projek tidak dibina semula. Panel krim besar dibuang daripada misi. Gerai menjadi arena utama dengan bola 108px desktop/88px telefon, sasaran bintang, HUD kecil dan gambar ganjaran muncul selepas setiap botol terkena. Paparan susun menggantikan gerai hanya selepas empat gambar dikumpulkan. Kad berasaskan gambar tanpa ayat jawapan; penerangan alternatif dan paparan zum mengekalkan akses kepada makna gambar.

Aset `story-atlas-v2.png` menggambarkan empat peristiwa baharu; `story-theatre.png` ialah latar pentas tanpa butang atau avatar. Semua input, kad dan kawalan kekal HTML sebenar. `story` setempat dalam modul mengasingkan kemas kini cerita daripada `IDIOMS` yang digunakan halaman lain.

Avatar asal tiket dikekalkan dan SVG dimuat sebagai bahagian berartikulasi setempat. Mulut membuka/menutup dan kedua-dua tangan bergerak semasa rakaman serta main balik; kening berubah kepada ekspresi ceria. Tiada animasi mulut atau tangan semasa diam. Jika SVG gagal dimuat, imej avatar asal kekal sebagai fallback. Focus/reduce/OS reduced-motion menghentikan gerakan dan status rakaman teks kekal jelas. Lampu hiasan tidak berkelip. Kawalan main/rakam semula/muat turun dan pemain hanya dipaparkan apabila audio sebenar dalam memori wujud. Bantuan ayat dan maklumat laluan lisan/privasi berada dalam butiran boleh buka. Tiada perubahan payload backend atau storan audio.

Media V2 disimpan berasingan dalam `preview-screenshots/loka1-v2/`, dengan nama paparan dan demonstrasi sama seperti V1. Media V1 yang telah dikongsi tidak ditindih. Media V2 telah dipush melalui komit `51fa4db5d20ca574e900f51d40e885348b892c68`. Kod V2 diluluskan untuk commit/push sebagai versi rasmi. Status Published Netlify memerlukan pengesahan remote dan tidak dibuktikan oleh build setempat.
