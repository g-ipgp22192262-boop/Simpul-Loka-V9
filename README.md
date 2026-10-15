# SimpulLoka V9.0 — Netlify

Frontend V9.0 berasaskan arkib `SimpulLoka_V9_Kod_Lengkap.zip` yang dikekalkan. Gerbang 2.5D, Roda Ferris interaktif, Perpustakaan Ajaib dan **Loka 1 V2 tiga misi** telah diluluskan sebagai asas rasmi. Lima Loka lain masih menggunakan aliran asal; mini permainan tiga misi bagi Loka 2–6 belum dibina. Backend PBD dan projek V7 tidak diubah oleh pelepasan Loka 1.

Rujukan lengkap status, keputusan pembangunan, enam Loka, inklusif, audio, struktur teknikal, data, ujian dan deployment: [SIMPULLOKA_MASTER_HANDOFF.md](SIMPULLOKA_MASTER_HANDOFF.md). Butiran fasa: [FERRIS_PHASE2.md](FERRIS_PHASE2.md), [LIBRARY_PHASE3.md](LIBRARY_PHASE3.md) dan [LOKA1_PHASE4.md](LOKA1_PHASE4.md).

Website yang diberikan pemilik: https://simpulloka.netlify.app/, terhubung kepada branch `work` menurut pemilik. Status Published bagi komit terkini mesti disahkan berasingan.

## Struktur

- `public/index.html`: halaman utama dan bekas halaman aplikasi.
- `public/assets/styles.css`: gaya V9 dengan gaya Halaman Utama 2.5D yang diasingkan melalui `home-page`.
- `public/assets/images/`: latar taman tema dan ilustrasi cikgu/panda.
- `public/assets/app.js`: navigasi dan aktiviti asal V9 serta lifecycle modul.
- `public/assets/library.js` / `library.css`: perpustakaan dan buku beranimasi.
- `public/assets/loka-one.js` / `loka-one.css`: tiga misi Loka 1 V2, botol, susunan, pentas dan rakaman sementara.
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

## Penerbitan Netlify sedia ada

Site V9 sedia ada menggunakan repository ini dan branch `work`; jangan cipta site pengganti atau ubah site V7. Selepas semakan dan kelulusan, commit hanya fail produk/ujian/dokumentasi berkaitan dan push ke `work`. Import Git menjalankan Netlify Functions; muat naik `dist` sahaja tidak menyediakan backend.

Base directory: root repository. Build command: `npm run check && npm test && npm run build`. Publish directory: `dist`. Functions directory: `netlify/functions`. Node 22. `netlify.toml` ialah konfigurasi rujukan. Semak Netlify → Deploys bagi SHA yang dipush; hanya dakwa Published apabila status remote disahkan. Media review berada di luar `public/` dan menggunakan komit berasingan dengan `[skip netlify]`.

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
