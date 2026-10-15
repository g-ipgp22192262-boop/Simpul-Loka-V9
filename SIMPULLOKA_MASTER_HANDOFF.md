# SimpulLoka V9.0 — Master Handoff

Tarikh semakan: **16 Oktober 2026 (Malaysia)**. Dokumen ini menerangkan kod sebenar pada branch `work` termasuk **Loka 1 V2, Upacara Cop Pasport Ajaib dan Loka 2 yang diluluskan**. Ia ialah panduan kesinambungan pembangunan, operasi dan pengujian; kelulusan reka bentuk atau build setempat bukan bukti deployment telah Published.

## 1. Identiti projek dan sumber rujukan

- Repository: https://github.com/g-ipgp22192262-boop/Simpul-Loka-V9
- Branch penerbitan yang dinyatakan pemilik: `work`.
- Website yang diberikan pemilik: https://simpulloka.netlify.app/.
- Sumber asal: `SimpulLoka_V9_Kod_Lengkap.zip`, dikekalkan sebagai arkib sejarah.
- **V7 ialah projek berasingan. Jangan mengubah fail, deployment, domain, Apps Script, ID Sheets atau rekod V7.**
- Rujukan teknikal mengikut fasa: `FERRIS_PHASE2.md`, `LIBRARY_PHASE3.md`, `LOKA1_PHASE4.md`, `LOKA1_PASSPORT.md`, `LOKA2_PHASE5.md`, `README.md`, `VALIDATION.md`.
- Dokumen ini dan kod terkini mengatasi nota pratonton lama yang masih menyebut keadaan sebelum kelulusan.

Jejak utama sebelum pelepasan Loka 1 V2:

| Peristiwa | Komit |
| --- | --- |
| Roda Ferris Fasa 2 diluluskan | `5639a784ce7e616f4c701a73f4dc2d317d9a2b4f` |
| Perpustakaan Ajaib Fasa 3 rasmi | `975fbe653bd9e15a35c393fd0ac13848c5e0eea0` |
| Media semakan Loka 1 V1 sahaja | `7866e182b664dcf31cb6797ca2da72e74bf72495` |
| Media semakan Loka 1 V2 sahaja | `51fa4db5d20ca574e900f51d40e885348b892c68` |

Kod rasmi Loka 1 V2 berada dalam komit pelepasan yang mengandungi dokumen ini. Dapatkan hash melalui `git log -1 --format=%H -- SIMPULLOKA_MASTER_HANDOFF.md`; jangan menganggap komit media di atas mengandungi kod produk.

## 2. Status sebenar pembangunan

| Komponen | Keadaan sebenar |
| --- | --- |
| Fasa 1 — Gerbang/Halaman Utama | Reka bentuk 2.5D diluluskan: latar taman, istana, cikgu/panda, Tiket Pengembaraan HTML, pilihan avatar dan navigasi. Panel sementara Enam Loka di Gerbang dikekalkan. |
| Fasa 2 — Roda Ferris | Diluluskan dan berfungsi: enam gondola berlapis, avatar tiket ke pelantar, pintu, duduk, putaran dan zum ke Loka. Grafik vektor boleh diperhalus kemudian tanpa menghilangkan mekanisme. |
| Fasa 3 — Perpustakaan Ajaib | Diluluskan dan berfungsi: Kitab Ilmu Utama, enam buku bergerak dari rak, kulit berengsel, dua halaman, zum, tanda penerokaan, Kunci Ilmu dan pintu Ferris tanpa sekatan 6/6. |
| Fasa 4 — Loka 1 V2 | **Diluluskan sebagai versi rasmi.** Tiga misi, gerai botol sebenar, empat gambar baharu, susunan, pentas, avatar berartikulasi, rakaman sementara, Upacara Cop Pasport Ajaib dan ruang pemerhatian guru. |
| Fasa 5 — Loka 2 | Diluluskan: kedai interaktif, tiga pilihan bantuan/alasan, empat langkah pembungkusan, cerita berubah mengikut pilihan, susunan, perakam bersama dan pasport bersama. |
| Loka 3–6 | Kandungan dan aliran asal masih berfungsi; mini permainan tiga misi memerlukan pembangunan berasingan. |
| Pasport, Refleksi, Pemulihan/Pengukuhan | Aliran asal dikekalkan dan diuji regresi. |
| SimpulLoka Rush dan Konsert | Aliran asal dikekalkan; tiada reka bentuk baharu dalam Fasa 4. |
| Backend sekolah | Kod adapter/proxy/Apps Script tersedia. Konfigurasi atau sambungan Google sebenar tidak dapat disahkan melalui ujian setempat. |
| Netlify Published untuk pelepasan ini | Perlu bukti status remote selepas push; lihat bahagian deployment. |

## 3. Enam Loka dan kandungan

| ID backend / indeks JS | Simpulan bahasa | Tarikan | Maksud | Pelaksanaan semasa |
| --- | --- | --- | --- | --- |
| 1 / 0 | Dalam Tangan | Jatuhkan Botol | Sudah pasti diperoleh atau dikuasai. | Tiga misi V2, fizik trajektori mudah dan perlanggaran DOM, empat ilustrasi, pentas rakaman. |
| 2 / 1 | Ambil Hati | Kedai Cenderamata | Menyenangkan atau menggembirakan hati seseorang. | Tiga misi Kedai Cenderamata Ajaib; pembungkusan DOM/SVG, susunan cerita, rakaman sementara dan cop bersama. |
| 3 / 2 | Anak Emas | Memanah | Orang yang paling disayangi atau diberi keutamaan. | Aliran asal; belum ada mini permainan memanah tiga misi. |
| 4 / 3 | Air Muka | Swing Ride | Raut atau ekspresi wajah seseorang. | Aliran asal; belum ada permainan buaian tiga misi. |
| 5 / 4 | Mandi Peluh | Roller Coaster | Berpeluh dengan banyaknya. | Aliran asal; belum ada permainan roller coaster tiga misi. |
| 6 / 5 | Cakap Besar | Pirate Ship | Bercakap dengan sombong atau bermegah-megah. | Aliran asal; belum ada permainan kapal lanun tiga misi. |

`IDIOMS` dalam `app.js` kekal sumber kandungan bersama bagi perpustakaan dan Loka asal. Cerita empat gambar V2 adalah `story` setempat dalam `loka-one.js`, supaya permintaan baharu tidak mengubah kandungan lima Loka lain:

1. Amir menyertai pertandingan Jatuhkan Botol.
2. Amir menyelesaikan cabaran dengan menjatuhkan botol.
3. Guru mengumumkan Amir sebagai pemenang; hadiah sudah dalam tangan walaupun belum diterima.
4. Amir menerima hadiah daripada guru.

Jangan menyatakan keenam-enam mini permainan 2.5D sudah dibina. Nama tarikan sudah wujud bagi semua Loka, tetapi Loka 1 dan Loka 2 menggunakan pelaksanaan tiga misi baharu.

## 4. Perjalanan murid dan pintu kemajuan

Gerbang → isi nama panggilan/kelas/pilih haiwan → Perpustakaan → Roda Ferris → gondola → Loka → ganjaran/cop → Roda Ferris/Pasport. Ini aplikasi satu halaman dengan state JavaScript; tiada URL laluan `/loka1` atau penghala history yang dibina. URL ujian langsung ialah halaman utama, kemudian gunakan navigasi sebenar.

- Haiwan tiket: panda, harimau, kucing, ulat. Pilihan dibaca daripada sesi murid.
- Perpustakaan boleh diteroka tanpa tiket; Ferris meminta tiket sebelum masuk Loka.
- Buku tidak diwajibkan 6/6 sebelum keluar ke Ferris. Kunci Ilmu ialah ganjaran penerokaan, berasingan daripada cop Pasport.
- Loka 1: Misi 2 memerlukan makna dipilih betul; Misi 3 memerlukan empat gambar disusun betul.
- Balingan tersasar tidak mengunci perjalanan: Tambah 3 Bola dan Bantuan Sasaran tersedia.
- Selepas empat gambar dikumpulkan, gerai digantikan dengan paparan susun; kedua-duanya tidak dipaparkan serentak.
- Pentas selesai selepas murid mengesahkan sudah bercerita. Rakaman bukan syarat; laluan lisan bersama cikgu kekal.
- Cop menggunakan rekod kemajuan backend sedia ada. Jika simpanan gagal, ganjaran setempat kekal dan ada Segerakkan Kemajuan; UI tidak mendakwa cop disimpan sebelum pengesahan.
- Rush memerlukan enam Loka lengkap. Tiga Gerbang Minda mempunyai dua soalan setiap satu. Konsert memerlukan Rush selesai. Skor Rush bukan TP automatik.

## 5. Struktur teknikal

Frontend ialah HTML/CSS/JavaScript biasa, tanpa framework, bundler atau dependency build. Skrip browser bukan ES module: urutan muatan dalam `public/index.html` penting. Node minimum projek: 22.

```text
public/
  index.html                  Bekas aplikasi, menu, Mod Inklusif dan urutan skrip
  assets/
    app.js                    IDIOMS, sesi, state navigasi, Loka asal, Pasport,
                              guru, Refleksi, latihan, Rush dan Konsert
    styles.css                Gaya asas dan Gerbang 2.5D
    backend.js                Adapter local/school
    ferris-geometry.js         Koordinat roda, pin gondola, pelantar dan kamera
    ferris.js / ferris.css     Ferris + lifecycle dan preference hook
    library.js / library.css   Buku, animasi, audio guru, penerokaan
    loka-one-reward.js / .css Upacara cop dan UI skrin penamat sahaja
    loka-one.js / loka-one.css Loka 1 V2, tiga misi dan rakaman sementara
    images/                   Gerbang, ferris-prototype/, library/, loka1/
    fonts/library/            Andika self-hosted WOFF dan lesen OFL
    audio/README.md           Pemetaan MP3 guru; bukan rakaman
netlify/functions/backend.mjs Proxy pelayan ke Apps Script
backend/apps-script/Code.gs    Backend V9 dan skema Sheets
scripts/build.mjs             Jana dist/ dan inventori audio sebenar
tests/                        Ujian Node dan browser
preview-screenshots/          Media semakan; bukan production
work/                         Scratch/skrip QA; diabaikan Git
netlify.toml                  Build, publish, Functions dan header
```

Urutan: `backend.js` → `ferris-geometry.js` → `ferris.js` → `library.js` → `loka-one-reward.js` → `loka-one.js` → `app.js`. `lokaHtml()` mendelegasikan hanya indeks 0 kepada `LokaOne.html()`; indeks 1 kepada `LokaTwo.html()`; indeks 2–5 kekal pada aliran asal. `render()` mengurus unmount/mount dan kelas `loka-one-page`, `home-page`, `library-page`, `ferris-page`. `applyPref()` memanggil hook setiap modul.

`LokaMissions` menyediakan nama dan prasyarat tiga misi untuk penggunaan semula. Ini asas kecil, bukan enjin generik siap untuk semua jenis tarikan. Pengembangan Loka 2–6 memerlukan implementasi dan kelulusan tersendiri.

## 6. Keputusan reka bentuk dan aset Loka 1

Rujukan sebenar repository ialah `public/assets/Loka1-mockup.png` (L besar; laluan case-sensitive). Ia rujukan visual, bukan antaramuka statik. Jangan menggantikannya dengan hot spot palsu di atas mockup.

- `carnival-booth.png`: latar gerai tanpa UI; bola, botol SVG, sasaran, baki bola dan butang ialah elemen sebenar.
- `story-atlas-v2.png`: atlas 2×2 empat peristiwa, dipaparkan menggunakan kedudukan latar CSS dan label aksesibiliti. Kad tidak memberi ayat jawapan di bawah gambar; butiran tersedia melalui zum/petunjuk.
- `story-theatre.png`: latar pentas tanpa watak atau kawalan. Avatar dan rakaman ialah lapisan sebenar.
- `story-atlas.png`: ilustrasi V1 yang masih disimpan; paparan aktif V2 menggunakan `story-atlas-v2.png`.
- Avatar asal `ferris-prototype/avatar-*.svg` dimuat secara inline oleh Loka 1, kemudian tangan/mulut diberi kumpulan SVG beranimasi. Fail avatar Ferris asal tidak diubah. Imej asal kekal fallback jika rig tidak dapat dimuatkan.
- Lampu tidak berkelip. Kejayaan menggunakan cahaya lembut dan gambar hadiah; bukan video yang menggantikan permainan.
- Panel krim penuh diganti arena gerai, kad terapung dan pentas fantasi. Jangan merombak visual diluluskan kepada laman latihan biasa tanpa arahan pemilik.

Build menyalin `public/` termasuk aset rujukan yang berada di dalamnya, tetapi UI tidak menggunakan mockup sebagai permainan. `preview-screenshots/`, `work/`, ujian, dokumentasi root dan Apps Script tidak disalin ke `dist/`. Fail `README.md` dalam public ditapis. Netlify Function dihantar melalui konfigurasi Functions, berasingan daripada `dist/`.

## 7. Mod Inklusif dan aksesibiliti

Tetapan `simpulloka_pref`: tulisan biasa/besar/sangat besar, Andika, jarak huruf/baris, kontras, Fokus, Kurangkan Animasi dan Senyap. Sokongan sentuhan, Tab/Enter/Space, fokus jelas dan butang alternatif kepada drag dikekalkan.

- Ferris: keyboard/anak panah/Home/End; Langkau atau Escape; Focus peralihan singkat, reduce/OS reduced motion tanpa perjalanan panjang. Watchdog mencegah tersekat.
- Perpustakaan: native dialog, tutup/Escape, pulih fokus, sebelum/seterusnya, zum, Langkau Animasi, focus/reduce serta pengendalian resize/tab tersembunyi.
- Loka 1: butang Baling Bola, bantuan sasaran, pilih/letak/keluar/alihtempat gambar, dialog zum, petunjuk bertahap. Watchdog dan fallback Web Animations API mengekalkan permainan jika animasi gagal.
- Semasa rakaman/main balik, mulut dan tangan avatar bergerak serta kening berubah. Ia simulasi, bukan lip-sync tepat. Focus/reduce/OS reduced motion menghentikan gerakan; status teks masih menyatakan rakaman/main balik.
- Mod Senyap menghentikan dan menyekat main balik, bukan menghalang rakaman atau jawapan lisan.
- Audit axe tidak menjamin pematuhan keseluruhan atau menggantikan ujian pembaca skrin/peranti fizikal.

## 8. Audio guru dan rakaman murid

**Perpustakaan: suara guru sebenar sahaja.** Tiada MP3 guru diterima dalam repository semasa. Oleh itu status ialah “Audio cikgu akan ditambah”, tanpa butang main palsu. Build menjana `dist/assets/audio/library-audio.json` daripada fail MP3 yang benar-benar wujud.

Pemetaan: `dalam-tangan.mp3`, `ambil-hati.mp3`, `anak-emas.mp3`, `air-muka.mp3`, `mandi-peluh.mp3`, `cakap-besar.mp3`; pilihan `kitab-ilmu.mp3`, semuanya dalam `public/assets/audio/`. Baca panduan audio dan build semula selepas rakaman sebenar ditambah. Jangan gunakan AI TTS untuk buku perpustakaan.

Sintesis pertuturan pelayar **masih wujud dalam fungsi asal** `speech()` untuk arahan/aktiviti lain dan Rush. Jangan mendakwa seluruh projek bebas TTS; modul perpustakaan dan Loka 1 tidak menggunakannya untuk menggantikan rakaman.

**Rakaman murid Loka 1:**

- `getUserMedia({audio:true})` hanya selepas klik Rakam Cerita. Memerlukan HTTPS atau localhost dan izin browser.
- `MediaRecorder` memilih WebM/Opus atau MP4 jika disokong; muat turun WebM atau M4A mengikut MIME.
- Chunk/Blob/URL kekal dalam memori. Tiada audio/base64/URL blob dihantar ke backend atau disimpan dalam localStorage/Sheets.
- Rakam, Selesai Rakaman, Dengar Semula, Rakam Semula, muat turun pilihan; kawalan hanya kelihatan apabila relevan.
- Maksimum tiga minit setiap rakaman, boleh cuba semula. Mikrofon ditolak/tiada/tidak disokong memberi penerangan dan laluan lisan.
- Keluar Loka/selesai aktiviti membersihkan rakaman, URL dan trek mikrofon. Kebenaran mikrofon lewat selepas keluar dibatalkan dengan menutup trek. Tab tersembunyi menghentikan rakaman dan main balik.
- `LokaOne` tidak menggunakan perakam Studio Cerita lama `v9Record*`; Studio asal Loka lain dikekalkan.

## 9. Kemajuan, penyimpanan dan PBD

| Data | Lokasi / kunci | Catatan |
| --- | --- | --- |
| Preference inklusif | `simpulloka_pref` | Browser ini; dikongsi antara halaman. |
| Tiket sesi | `simpulloka_v9_session_local` / `_school` | Mengandungi token sesi; jangan log atau kongsi. |
| Rekod mod setempat | `simpulloka_v9_records` | Murid/progress/refleksi/Rush; bukan rekod rasmi sekolah. |
| Penerokaan buku | `simpulloka_v9_library_<mode>_<studentId atau guest>` | Setempat; bukan cop Pasport. |
| Perincian permainan Loka 1 | `simpulloka_v9_loka1_<mode>_<studentId atau guest>` | Makna, balingan, gambar, susunan, bantuan, selesai dan catatan guru setempat; bukan audio. |
| Kemajuan sekolah/PBD | Apps Script → Google Sheets V9 | Hanya apabila backend sekolah dikonfigurasi dan pengesahan sah. |

`saveProgress(studentId, token, 1, sequenceAttempts, hints, ordered, meaning, finished)` menggunakan kontrak sedia ada. `gameCorrect` ialah susunan betul, `simpulDone` ialah makna difahami, `storyDone` ialah penceritaan selesai. Backend menetapkan `completed` apabila ketiga-tiga flag benar dan mengekalkan kemajuan yang pernah dicapai. Balingan/hit/markah botol tidak dijadikan TP bahasa. Data perincian permainan dan catatan ganjaran kekal setempat walaupun dalam mod sekolah; tiada migrasi automatik semua state permainan ke Sheets.

PBD rasmi berada di Sudut Cikgu: kefahaman, urutan, penceritaan, catatan dan TP melalui pertimbangan profesional guru. Ruang pemerhatian pada ganjaran Loka 1 hanyalah catatan setempat serta pautan ke penilaian rasmi; bukan pentaksiran yang dihantar automatik. Mod local menolak dashboard/simpan pentaksiran sekolah.

Skema `Code.gs` yang dikekalkan:

- `Murid`: studentId, nickname, avatar, accessHash, createdAt, updatedAt, kelas.
- `KemajuanLoka`: studentId, lokaId, attempts, hintLevel, gameCorrect, simpulDone, storyDone, completed, updatedAt.
- `PentaksiranPBD`: studentId, lokaId, rubricUnderstanding, rubricSequencing, rubricOral, teacherNote, teacherTP, assessedAt.
- `TetapanRujukan`: lokaId, idiom, ride, meaning.
- `RefleksiMurid`: studentId, feeling, learning, recoveryDone, reinforcementDone, updatedAt.
- `RushMinda`: studentId, score, total, answersJson, completedAt.

Jangan menukar struktur ini untuk mini permainan baharu tanpa keputusan reka bentuk data yang berasingan. Memadam data browser menghilangkan rekod setempat; pemulihan tiket sekolah juga bergantung pada token sesi pada browser tersebut. Tiada login merentas peranti dibina.

## 10. Backend sekolah dan rahsia

Browser memanggil endpoint same-origin `/.netlify/functions/backend`. GET melaporkan konfigurasi; POST hanya membenarkan createStudent, getStudent, saveProgress, saveReflection, saveRushResult, teacherDashboard, saveAssessment.

Netlify Functions membaca `APPS_SCRIPT_URL` dan `APPS_SCRIPT_PROXY_SECRET` pada pelayan. Apps Script menggunakan `NETLIFY_PROXY_SECRET`, `SPREADSHEET_ID`, `TEACHER_HASH`, `TEACHER_SALT` dalam Script Properties. **Nama pembolehubah ini bukan nilai rahsia. Jangan memasukkan nilai sebenar ke frontend, Git, log atau dokumen handoff.**

Gunakan projek Apps Script/Sheets baharu V9; ikuti README untuk setup sekali dan kata laluan guru. Jangan jalankan setup terhadap sumber V7. Frontend tidak mengandungi `google.script.run`; adapter HTTP mengekalkan fungsi asal.

Jika konfigurasi awal tiada/gagal dicapai, mod local digunakan dan dilabelkan. Jika mod school telah dipilih dan permintaan kemudian gagal, ia memberi ralat, tidak diam-diam menulis rekod sekolah ke simpanan local. Token/kata laluan yang ditaip dihantar melalui HTTPS; rahsia proxy hanya ditambah dalam Function.

## 11. Build dan pengujian

```sh
npm run check
npm test
npm run build
python -m http.server 4173 --directory dist
```

Buka http://localhost:4173. Pada server statik, 404 bagi endpoint Netlify Function adalah dijangka; ini menguji mod local. Build tidak memerlukan dependency npm tambahan. Ia memadam/menjana semula `dist/`; folder itu diabaikan Git.

Browser tests memerlukan Playwright/Chromium yang dipasang secara berasingan. Jika tidak memasangnya pada projek, tetapkan `PLAYWRIGHT_MODULE` kepada fail modul Playwright dan `CHROMIUM_PATH` kepada executable. Jangan commit `node_modules` atau fail runtime sesi.

```sh
npm run test:reward
npm run test:loka1
npm run test:library
npm run test:ferris
npm run test:browser
node tests/home-browser.mjs
```

Semakan pelepasan 16 Oktober 2026:

- Sintaks: lulus. `npm test`: enam ujian Node lulus (backend local/proxy, tiga ujian geometri Ferris, inventori audio/build).
- Build: lulus; media semakan, ujian, dokumen root, work dan Apps Script tidak berada dalam `dist/`.
- Loka 1: aliran Ferris → tiga misi → cop → Ferris; drag/hit/miss/refill/assist, susunan salah/betul/petunjuk; avatar tiket; rekod sebenar MediaRecorder menggunakan **mikrofon simulasi ujian**; main balik, ulang, muat turun tersedia, Senyap, Focus, izin ditolak/tiada/izin lewat, laluan lisan, persistensi dan bentuk payload tanpa audio.
- Gerbang/Ferris/Perpustakaan dan regresi semua Loka, Pasport, Refleksi, Pemulihan/Pengukuhan, Rush, Konsert: lulus, tiada pageerror.
- Responsif dan input: 320/390/768/1024/1440px dalam ujian berkaitan; keyboard, sentuhan, teks besar/Andika/kontras/fokus/reduce/senyap/zum.
- Axe-core 4.10.3: lima keadaan Loka 1 (makna, botol, susunan, pentas, ganjaran), desktop 1440px dan telefon 390px; tiada pelanggaran A/AA yang dikesan. Alat QA di `work/`, bukan dependency production.

Batas: Chromium headless, bukan peranti fizikal/Safari/iOS atau ujian pembaca skrin manusia. Google sekolah sebenar, rekod PBD sebenar, mikrofon fizikal, bunyi OS dan lagu luaran belum disahkan semula. Ujian local/mocks tidak membuktikan sambungan sekolah berfungsi.

## 12. Netlify dan bukti deployment

Tetapan sebenar `netlify.toml`:

| Tetapan | Nilai |
| --- | --- |
| Base directory | Root repository |
| Branch | `work` menurut pemilik; sahkan pada dashboard Netlify |
| Build command | `npm run check && npm test && npm run build` |
| Publish | `dist` |
| Node | 22 |
| Functions | `netlify/functions` |
| Microphone header | `Permissions-Policy: camera=(), microphone=(self)` |

Site sedia ada telah dinyatakan pemilik sebagai terhubung kepada branch `work`; **jangan cipta site pengganti atau ubah site V7**. Push kod rasmi tanpa `[skip netlify]` membolehkan integrasi Git biasa memulakan build. Jangan ubah konfigurasi remote yang tidak diperlukan.

Bukti yang diperlukan sebelum mendakwa Published: deployment Netlify untuk SHA pelepasan ini berstatus Published/ready, atau status GitHub Netlify yang berkaitan dan pemeriksaan aset aplikasi live. HTTP 200 halaman utama sahaja tidak membuktikan kod baharu telah diterbitkan.

Dalam sesi ini GitHub boleh dicapai tetapi domain Netlify tidak tersenarai dalam polisi rangkaian. Jika status commit GitHub kosong atau pemeriksaan live disekat, laporkan **belum dapat disahkan**, bukan berjaya atau gagal. Semak dashboard Netlify → Deploys → deployment branch `work` → SHA/log build. URL untuk ujian manual ialah https://simpulloka.netlify.app/.

Ujian penerimaan live: tiket nama panggilan/kelas/avatar → perpustakaan → Ferris Dalam Tangan → jawapan makna → empat botol/gambar → susun → rakam/dengar/ulang ATAU laluan lisan → cop → kembali Ferris; reload dan semak cop. Cuba Mod Fokus/Senyap/Reduce dan telefon. Semak rekod sekolah hanya jika backend benar-benar dikonfigurasi.

## 13. Media semakan dan kerja seterusnya

Media V2 telah dipush berasingan dalam `preview-screenshots/loka1-v2/`: 10 PNG (Misi 1, botol, susunan, pentas, ganjaran × desktop/telefon) dan dua demonstrasi MP4/GIF (`ball-throw`, `avatar-story`). Ia rakaman DOM sebenar; video/GIF tidak digunakan sebagai permainan dan tidak mengandungi audio murid. Media V1 kekal di `preview-screenshots/loka1-phase4/` untuk sejarah. Media GitHub bukan bukti deployment production.

Keutamaan seterusnya selepas pengesahan live:

1. Dapatkan bukti Netlify Published untuk komit rasmi dan uji penerimaan di telefon sebenar.
2. Guru merakam MP3 sebenar bagi perpustakaan; masukkan mengikut pemetaan, tanpa AI TTS.
3. Semak sambungan sekolah sebenar/login guru/CSV dengan akaun V9 yang sah, tanpa menyentuh V7.
4. Rancang Loka 2–6 satu demi satu menggunakan asas tiga misi; jangan menyalin permainan botol dan mendakwa tarikan lain siap.
5. Perhalus aset Ferris jika diminta sambil mengekalkan koordinat, pintu, tempat duduk, pergerakan avatar dan fallback.

Jangan merombak Gerbang, Perpustakaan, Ferris atau Loka 1 yang diluluskan tanpa arahan. Jangan commit screenshot/debug baharu bersama kod production tanpa skop yang jelas. `HOME_PREVIEW.md` yang belum dijejak ialah nota sejarah Gerbang sebelum kelulusan, bukan kerja Fasa 4 atau dokumen status semasa.

## 14. Pelepasan Upacara Cop Pasport Ajaib yang diluluskan

Skrin penamat sahaja diperbaiki: pasport HTML dua halaman terbuka, cop kayu SVG turun dan menghentak lembut, bunyi cop WebAudio pendek, lambang botol/Dalam Tangan, konfeti/kilauan sekali dan pembantu Loka. Tiada animasi berkelip atau loop. Maklumat tiga misi berada pada halaman kiri; ruang PBD kekal dalam details berasingan.

Modul `loka-one-reward.js`/`loka-one-reward.css` dimuat sebelum `loka-one.js`. Yang berubah pada modul Loka 1 ialah delegasi markup ganjaran, mount/unmount dan preference hook; 29 fungsi misi/rakaman/kemajuan diluluskan dibandingkan dengan Git dan kekal sama. Fail gaya asal Loka 1, Gerbang, Perpustakaan, Ferris dan backend tidak diubah.

Flag `stampCeremonyDone` berada dalam rekod setempat `simpulloka_v9_loka1_<mode>_<studentId>`, ditandakan sebelum animasi bermula supaya kembali/reload/keluar halaman/Langkau tidak mengulangnya. Ia bukan pengganti `finished` atau cop backend dan tidak menambah medan Sheets. Menghapuskan data browser boleh memadam flag animasi setempat, tetapi tidak menghapuskan cop sekolah yang sudah disimpan.

Focus/reduce/OS reduced motion terus memaparkan pasport terbuka dan cop; Senyap tidak memulakan AudioContext. Langkau dan watchdog 4.5 saat menamatkan animasi dengan selamat, termasuk jika API animasi/bunyi gagal. Grafik perayaan aria-hidden, status polite ringkas, fokus dipulihkan ke Kembali ke Roda Ferris apabila butang Langkau disembunyikan. Destinasi kekal boleh digunakan semasa upacara. Butang Loka 2 membuka **aktiviti asal yang sudah wujud**; tiada pembangunan Loka 2 baharu dimulakan.

`npm run test:reward` menguji fasa dan pergerakan sebenar, bunyi sekali/tidak dimainkan dalam Senyap, persistensi dan reload, catatan PBD, Langkau setiap fasa, fokus keyboard, pembatalan, kegagalan animasi/audio, mod inklusif dan responsif. Media semakan 8 PNG + MP4/GIF telah dipush secara berasingan dalam komit `c155d2bb1a6c44b290dc58379e16d240695478ba`. Lihat `LOKA1_PASSPORT.md`; tiada media/debug baharu perlu dimasukkan dalam komit pelepasan kod.

## 15. Fasa 5 — Loka 2 diluluskan

Lihat `LOKA2_PHASE5.md` untuk aliran sebenar, fail, simpanan dan semakan. `loka-story.js` menyediakan avatar/perakam boleh guna semula; Loka 1 masih menggunakan perakam asal. `LokaPassport` ialah alias enjin cop asal dengan identiti pilihan, bukan pangkalan data ganjaran kedua. `saveProgress` menggunakan lokaId 2 dan kontrak PBD asal; audio tidak dihantar. Grafik kedai/cerita WebP berada dalam `images/loka2/`. Skrip dimuat selepas Loka 1 dan sebelum app.

Media 32 PNG + tiga pasangan MP4/GIF dipush berasingan (`7129204`). Pelepasan kod tidak memasukkan media/debug. Loka 3 masih aktiviti asal pada masa pelepasan Loka 2; pembangunan Fasa 6 dan peraturan ganjaran tiga/enam Loka memerlukan perubahan seterusnya yang belum diluluskan.
