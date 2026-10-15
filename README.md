# SimpulLoka V9.0 — Netlify

Frontend V9.0 diambil daripada `SimpulLoka_V9_Kod_Lengkap.zip`. Arkib asal kekal tanpa perubahan. Tiada fail, deployment Apps Script atau data V7 diubah. Halaman Utama taman tema 2.5D yang diluluskan menjadi asas visual rasmi projek. Latar taman, cikgu/panda, Tiket Pengembaraan dan panel sementara Enam Loka tersedia; aset roda Ferris interaktif berasingan masih menunggu. Enam simpulan bahasa, kandungan cerita, permainan, Mod Inklusif, Studio Cerita, Pasport, Refleksi, Pemulihan, Pengukuhan, Rush dan Konsert dikekalkan.

Halaman Roda Ferris Fasa 2 kini menggunakan enam gondola berlapis yang bergerak ke pelantar, membawa avatar tiket dan membuka Loka sebenar. Mekanisme serta reka bentuk diluluskan; grafik boleh diperhalus kemudian. Lihat `FERRIS_PHASE2.md` untuk geometri, pilihan inklusif dan ujian. Jalankan `npm run test:ferris` untuk ujian browser khusus.

## Struktur

- `public/index.html`: halaman utama dan bekas halaman aplikasi.
- `public/assets/styles.css`: gaya V9 dengan gaya Halaman Utama 2.5D yang diasingkan melalui `home-page`.
- `public/assets/images/`: latar taman tema dan ilustrasi cikgu/panda.
- `public/assets/app.js`: navigasi dan aktiviti asal V9; pembetulan butang audio Rush serta pengendalian sesi.
- `public/assets/backend.js`: adapter simpanan setempat / sambungan sekolah.
- `netlify/functions/backend.mjs`: perantara pelayan ke Apps Script; rahsia tidak dihantar ke browser.
- `backend/apps-script/Code.gs`: kod backend asal dengan adapter HTTP berasingan.
- `backend/apps-script/PANDUAN_ASAL.txt`: rujukan sejarah sahaja. Untuk Netlify, ikut README ini; **jangan ganti projek lama**.
- `scripts/build.mjs`: salin hanya frontend ke `dist/`.
- `netlify.toml`: build, publish, functions dan header.
- `tests/`: ujian adapter, proxy dan aliran browser.

## Jalankan dan semak

Node.js 22 atau lebih baharu. Tiada dependency diperlukan untuk build.

```sh
npm run check
npm test
npm run build
python -m http.server 4173 --directory dist
```

Buka http://localhost:4173. Pelayan statik menggunakan mod setempat. Respons 404 pada endpoint Netlify Function di pelayan statik adalah dijangka; aplikasi tetap berjalan. Fon Andika luaran mempunyai fallback fon pelayar.

Untuk ujian browser pilihan, pasang Playwright dalam persekitaran pembangunan (`npm install --no-save playwright`, kemudian `npx playwright install chromium`), jalankan pelayan di atas dan `npm run test:browser`. `PLAYWRIGHT_MODULE` dan `CHROMIUM_PATH` boleh memilih pemasangan sedia ada. Ujian mendaftar murid ujian, melengkapkan enam Loka, memulihkan sesi, menguji latihan, Rush dan Konsert. Masa menunggu gerbang kedua/ketiga dipendekkan dalam ujian sahaja. Fail browser ini tidak termasuk dalam build frontend.

## Terbitkan sebagai site Netlify baharu

1. Simpan semua perubahan baharu ke repository `g-ipgp22192262-boop/Simpul-Loka-V9` pada branch baharu, semak dan push. Contoh: `git switch -c feat/v9-netlify`, `git add .`, `git commit -m "Prepare SimpulLoka V9 for Netlify"`, `git push -u origin feat/v9-netlify`.
2. Netlify → **Add new project / Import an existing project** → GitHub → pilih repository V9 dan branch tersebut. Cipta site baharu; jangan ubah site/domain/deployment V7.
3. Base directory: kosong (root repository). Build command: `npm run check && npm test && npm run build`. Publish directory: `dist`. Functions directory: `netlify/functions`. `netlify.toml` menetapkannya secara automatik.
4. Deploy. Buka URL HTTPS yang diberikan dan cuba tiket, Loka dan Mod Inklusif. Jangan gunakan muat naik `dist` sahaja jika memerlukan backend; import Git menjalankan Netlify Functions juga.

Tanpa tetapan backend, mod setempat membolehkan pembelajaran penuh, kemajuan enam Loka, refleksi dan Rush. Rekod hanya pada browser/origin yang sama; memadam data browser memadam kemajuan. Ia bukan rekod rasmi sekolah. Sudut Cikgu masih memaparkan panduan/kurikulum; dashboard PBD, pentaksiran dan CSV memerlukan backend sekolah serta kata laluan sah. Tiada kata laluan guru palsu dalam frontend.

## Sambungan Google Apps Script / Sheets pilihan

Gunakan **projek Apps Script baharu dan Google Sheets baharu khusus V9**. Jangan salin ID spreadsheet, kata laluan atau deployment V7.

1. Salin `backend/apps-script/Code.gs` ke projek Apps Script baharu. Tiada `Index.html` diperlukan; `doGet` hanya memberi status backend.
2. Dalam Project Settings → Script Properties, tetapkan `NETLIFY_PROXY_SECRET` kepada rahsia rawak yang panjang. Jalankan `setupSimpulLoka()` sekali; ia mencipta spreadsheet baharu dan menyimpan `SPREADSHEET_ID` secara automatik. Jika menentukan ID sendiri, gunakan spreadsheet baharu V9 sahaja.
3. Tetapkan kata laluan guru menggunakan helper `setTeacherPassword_(password)` pada bahagian pelayan. Contohnya, cipta fungsi sementara dalam editor Apps Script yang memanggil helper itu dengan kata laluan baharu sekurang-kurangnya 12 aksara, jalankan, kemudian padam fungsi sementara. Hanya hash dan salt disimpan dalam Script Properties. Jangan commit kata laluan atau log nilainya.
4. Deploy sebagai Web App baharu, execute as pemilik. Akses endpoint perlu membenarkan panggilan pelayan Netlify tanpa login interaktif; adapter menolak permintaan tanpa rahsia proxy, dan fungsi murid/guru tetap mengesahkan token/kata laluan masing-masing.
5. Dalam environment variables **server/Functions sahaja** Netlify tetapkan `APPS_SCRIPT_URL` kepada URL `/exec` deployment baharu dan `APPS_SCRIPT_PROXY_SECRET` kepada nilai sama seperti `NETLIFY_PROXY_SECRET`. Jangan gunakan prefix frontend atau masukkan nilai ini dalam repository. Redeploy Netlify.
6. Semak label “Mod sekolah” pada Gerbang. Daftar tiket baharu, lengkapkan Loka, simpan refleksi/Rush, kemudian sahkan tab Sheets dan login guru serta eksport CSV. Token sesi dan kata laluan yang ditaip dihantar melalui HTTPS; rahsia sambungan dan ID Sheets tidak dibenamkan dalam frontend.

Sesi mod setempat dan mod sekolah diasingkan. Tiada migrasi automatik rekod setempat ke Sheets. Jika backend yang telah dikonfigurasi gagal, permintaan memberi ralat dan tidak bertukar diam-diam kepada simpanan setempat. Jika semakan awal konfigurasi tidak dapat dicapai, aplikasi memulakan mod setempat dengan label yang jelas.

Rakaman mikrofon kekal pilihan, dalam memori sesi browser sahaja; HTTPS dan izin mikrofon diperlukan. Pautan lagu Konsert asal dikekalkan. Skor Rush bukan TP PBD automatik.

## Pengesahan

Lihat `VALIDATION.md` untuk hasil semakan dan batas ujian. Penerbitan Netlify dan sambungan Google sebenar perlu diuji selepas akaun/konfigurasi deployment disediakan.
