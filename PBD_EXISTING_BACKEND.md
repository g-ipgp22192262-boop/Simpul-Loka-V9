# Sambungan V9.1 kepada backend Google sedia ada

Branch: `review/v9.1-teacher-audio`. Gunakan Google Spreadsheet, projek Apps Script dan deployment “SimpulLoka PBD - Ujian” yang SEDIA ADA. Dokumen ini tidak meminta penciptaan spreadsheet, projek Apps Script atau backend baharu.

## Perubahan dan keputusan audit

- Perubahan aplikasi/backend dalam kerja ini hanya nilai `REFERENCE` Loka 4 dalam `backend/apps-script/Code.gs`: `Buaian Diraja` → `Studio Foto Air Muka`.
- Pengguna mengesahkan sel `TetapanRujukan.ride` Loka 4 sudah dibetulkan di Google. Jangan ubah semula atau jalankan setup untuk menyegarkannya.
- `Records.gs` dan `PbdModel.gs` tidak diubah. Model Apps Script dan `public/assets/pbd-model.js` kekal sama; enam item bahasa PBD sepadan dengan frontend.
- Tiada schema, ID, migrasi, pemadaman atau reset data ditambah. Ringkasan A–R dan Butiran A–V dikekalkan.
- `setupSimpulLoka()` dan `setupPbdRecords()` tidak diperlukan untuk struktur lengkap yang pengguna sahkan. Jangan jalankan kedua-duanya sebagai langkah kemas kini biasa.
- UI sudah mempunyai rekod, carian nama, tapisan kelas, enam Loka, sesi/ulangan, evidens dan status Objektif 1/2, checkbox mendengar, lima skor rubrik, skor lisan/bertulis 1–5, ulasan, simpan dan muat semula.
- Objektif 2 sesi baharu bermula `Belum Dinilai` dengan skor kosong; `Capai`/`Perlu Bimbingan` memerlukan pengesahan guru mendengar, lima skor aspek dan skor lisan. Permainan tidak menjana TP atau skor lisan. Item bahasa berkunci Loka 4–6 sahaja dirumus untuk Objektif 1; Loka 1–3 `Tiada Evidens`.
- Checkbox mendengar ialah validasi permintaan; ia bukan lajur boolean baharu. Status checkbox selepas reload masih berdasarkan kewujudan penilaian. Tiada perubahan schema dibuat untuknya.

## Bukti pemeliharaan rekod

`tests/pbd-existing-records.test.mjs` memuatkan baris berformat V9.1 sedia ada terus ke API Sheets dalam memori, termasuk respons lama tanpa medan bantuan tambahan, ID/runId lama, rubrik, skor, ulasan, versi dan sejarah penilaian. Ujian menyekat panggilan setup selepas pembentukan fixture, memastikan baca rekod tidak mengubah baris, sync murid tidak menimpa skor guru, sesi baharu tidak menetapkan semula penilaian lama, dan penilaian guru bagi sesi baharu tidak mengubah baris sesi lama.

Ini bukti simulator dengan kod `.gs` sebenar, BUKAN bukti pembacaan spreadsheet Google pengguna. Tiada URL/credential sebenar tersedia dalam environment ini. Keserasian header Google sebenar adalah berdasarkan pengesahan manual pengguna; kandungan semua rekod Google lama belum diperiksa oleh agen.

## Urutan manual menggunakan sistem sedia ada

1. Gunakan folder laptop yang mengandungi perubahan workspace ini. ZIP GitHub lama tidak mengandungi perubahan belum dipush. Pastikan branch/folder betul; jangan reset atau buang perubahan sedia ada.
2. Sebelum mengubah Google, hentikan penggunaan seketika. Simpan sandaran spreadsheet secara setempat melalui File → Download (contohnya `.xlsx`), salinan tiga fail kod Google, nombor versi deployment dan URL `/exec` lama. Simpan juga konfigurasi penting secara peribadi. Tidak perlu mencipta spreadsheet baharu.
3. Buka projek Apps Script SEDIA ADA. Kekalkan `SPREADSHEET_ID`, `NETLIFY_PROXY_SECRET`, `PBD_ENABLED=true` serta property sistem. Jangan salin rahsia ke kod/repository/chat.
4. Bandingkan `Code.gs`, `Records.gs`, `PbdModel.gs` Google dengan tiga fail di `backend/apps-script/`. Jika sudah sama selain rujukan Loka 4, ubah hanya nilai `ride` Loka 4 dalam `Code.gs` Google kepada `Studio Foto Air Muka`. `Records.gs` dan `PbdModel.gs` tidak memerlukan perubahan akibat pembetulan ini. Jika terdapat perbezaan fungsi/schema lain, semak diff dahulu; jangan menggantikan kod tersuai lama secara membuta tuli.
5. Simpan kod. JANGAN jalankan `setupSimpulLoka()` atau `setupPbdRecords()`. Jangan cipta atau menamakan semula tab/lajur. Sel `ride` dalam spreadsheet sudah dibetulkan pengguna.
6. Jika kod Google berubah dan anda bersedia mengaktifkannya: Deploy → Manage deployments → pilih “SimpulLoka PBD - Ujian” → Edit → Version: New version → Deploy. Kekalkan Execute as Me dan akses gateway yang diluluskan. Jangan pilih New deployment untuk menggantikan URL tanpa sebab. Langkah ini dilakukan pemilik secara manual, bukan oleh agen.
7. Catat versi baharu dan sahkan URL `/exec` deployment yang sama. Deployment Google berasingan daripada Netlify; tiada deployment Netlify diperlukan untuk ujian laptop. Jika konfigurasi akses Google memerlukan login interaktif yang gateway tidak dapat lakukan, jangan longgarkan polisi organisasi; semak akses dengan pemilik/pentadbir.
8. Pada laptop, gunakan `.env.pbd.local` yang sedia ada jika sudah dikonfigurasi. Jika tiada sahaja, salin template `config/pbd.env.example`. Jangan overwrite fail environment yang sudah berisi.

Command Prompt Windows, hanya jika fail belum ada:

```bat
if not exist .env.pbd.local copy config\pbd.env.example .env.pbd.local
```

Isi secara peribadi dalam fail tersebut:

| Nama | Keperluan |
|---|---|
| `APPS_SCRIPT_URL` | URL `/exec` sebenar deployment sedia ada; bukan URL editor atau Sheet |
| `APPS_SCRIPT_PROXY_SECRET` | Nilai sama dengan Script Property `NETLIFY_PROXY_SECRET` yang sedia ada |
| `PBD_PASSCODE_HASH` | Hash kod guru yang sedia ada jika tersedia/masih digunakan |
| `PBD_GATEWAY_ENABLED` | `true` |
| `PBD_SIMULATION` | `0` |
| `PBD_PORT` | `4180` atau port pilihan |
| `PBD_SITE_ORIGIN` | Dev-server menetapkannya sendiri kepada origin loopback; hosting kemudian memerlukan origin HTTPS tepat |
| `PBD_LOCAL_HTTP` | Kekalkan `0` dalam template; dev-server mengurus pengecualian HTTP loopback sendiri |

9. Jika hash/kod guru belum tersedia, jalankan `npm run pbd:passcode` pada laptop anda sendiri, pilih kod 12–200 aksara, kemudian simpan output hash sebagai `PBD_PASSCODE_HASH`. Jangan jalankan fungsi kata laluan guru legasi. Jangan jana semula kod jika kod/hash sedia ada masih betul. Hash mengandungi `$`; salin terus ke fail environment, bukan ke arahan shell yang boleh mengembangkannya.
10. Gunakan Node.js 22 atau lebih baharu. Jalankan dalam folder `package.json`:

```sh
npm run check
npm test
npm run build
node --env-file=.env.pbd.local scripts/pbd-dev-server.mjs
```

11. Buka `http://127.0.0.1:4180` (atau port sebenar yang dicetak), bukan Live Server/fail HTML. Gunakan tetingkap pelayar ujian baharu supaya tiket mod local tidak disangka tiket Google.
12. Semak kedua-dua endpoint pada origin yang sama: `/.netlify/functions/backend` dan `/.netlify/functions/teacher-records`. `configured=true` hanya membuktikan prasyarat konfigurasi, bukan authorization atau simpanan Google berjaya.
13. Sebelum mencipta tiket ujian, buka Sudut Guru → Rekod Kemajuan Murid, login dan baca rekod LAMA. Semak nama/kelas, progress, semua sesi, respons, rubrik, skor dan ulasan; jangan menekan Simpan pada rekod lama untuk menguji sambungan.
14. Selepas bacaan lama disahkan, cipta tiket berlabel UJIAN dengan nama rekaan. Lengkapkan Loka 4/5/6, semak respons dan status Objektif 1. Objektif 2 sesi baharu mesti kekal `Belum Dinilai` tanpa skor lisan automatik.
15. Pada rekod UJIAN sahaja: guru tandakan mendengar, isi lima aspek, skor lisan, skor bertulis pilihan dan ulasan. Simpan, muat semula UI, serta semak baris sebenar dalam Ringkasan PBD/Butiran Loka. Ulang Loka dan pastikan sesi lama masih boleh dipilih dengan penilaiannya kekal.
16. Uji kod salah, log keluar dan gangguan sambungan. Jangan anggap simpanan berjaya tanpa pengesahan. Jangan padam rekod lama atau menjalankan migrasi jika berlaku ralat; simpan mesej ralat tanpa rahsia untuk diagnosis.
17. Jika perlu rollback kod, pilih versi deployment sebelumnya. Rollback kod tidak memulihkan data yang sudah berubah; pemulihan data mesti berasaskan sandaran dan semakan berasingan.

## Had pengesahan

Tiada setup, deployment atau penulisan Google dilakukan oleh agen. Ujian environment menggunakan simulator berlabel; sambungan Google sebenar hanya boleh dilaporkan berjaya selepas rekod lama berjaya dibaca dan rekod UJIAN berjaya ditulis/dibaca semula pada spreadsheet sedia ada.

## Keputusan environment bagi kerja ini

- `npm run check`: PASS.
- `npm test`: 34/34 PASS, termasuk fixture rekod lama dan ujian pemilikan skor guru.
- `npm run build`: PASS.
- `npm run test:pbd`: PASS dengan gateway Node dan fail `.gs` sebenar dalam simulator Sheets; carian, kelas, enam Loka, dua sesi, checkbox/rubrik, skor/ulasan selepas reload, auth/CSRF/logout dan gangguan sambungan diuji.
- `npm run test:final`: PASS; progress, finale Loka 5/6 tanpa TTS, video narasi dan CC.
- `npm run test:audio`: PASS; 79 MP3 decode/play hingga tamat pada kelajuan dipercepat bagi regresi, semua 71 mapping klip aplikasi dan enam aliran rakaman.
- `node tests/human-review-browser.mjs`: PASS; soalan panduan cerita, navigasi bahan, cetakan PDF offline dan Mod Inklusif.
- Sambungan Google sebenar: BELUM DIUJI. Tiada konfigurasi sebenar atau `.env.pbd.local` dalam mesin ini. Tiada credential palsu dimasukkan.
