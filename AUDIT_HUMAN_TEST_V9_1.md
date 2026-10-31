# Audit pembetulan human test V9.1

## Kemas kini integrasi audio pengenalan

Enam M4A pengguna telah ditukar kepada MP3 mono, 128 kbps, 44.1 kHz dan dipasang pada keenam-enam laluan khusus. Inventori kini 79 MP3: 71 klip aplikasi dan 8 narasi video berasingan. Semua 73 MP3 terdahulu kekal sama berdasarkan SHA-256. Bahagian audit asal di bawah merekod keadaan sebelum rakaman diterima; status menunggu itu kini telah diselesaikan.

## Audio dan Pentas Cerita

Punca: `lokaIntro()` dalam `public/assets/app.js` menggunakan ID `lokaN-misi1` (Loka 5 tiada butang), jadi pengenalan mengulang arahan Teroka Makna. Kini ID khusus `loka1-pengenalan` hingga `loka6-pengenalan` dipetakan dalam `teacher-audio-catalog.js` kepada:

```text
public/assets/audio/guru/loka1-pengenalan.mp3
public/assets/audio/guru/loka2-pengenalan.mp3
public/assets/audio/guru/loka3-pengenalan.mp3
public/assets/audio/guru/loka4-pengenalan.mp3
public/assets/audio/guru/loka5-pengenalan.mp3
public/assets/audio/guru/loka6-pengenalan.mp3
```

Pada audit awal, enam fail ini belum ada. Kini keenam-enam MP3 sebenar telah dipasang. Tiada rakaman lama disalin, tiada TTS atau audio baharu dijana. Setiap panel menunjukkan status belum tersedia; butang menerangkan keadaan itu tanpa meminta MP3 yang tiada. Build hanya memasukkan fail dengan header MP3 sah ke manifest. Selepas rakaman sebenar dimasukkan, jalankan `npm run build` dan mulakan semula pelayan; mapping akan aktif tanpa menukar Misi 1. Format disyorkan MP3, mono/stereo, 44.1/48 kHz, 128–192 kbps, suara jelas dan tiada muzik yang menenggelamkan arahan. Nama fail tepat dan huruf kecil.

Skrip setiap pengenalan disimpan pada medan `script` enam entri pertama katalog. Setiap skrip menerangkan aktiviti Loka sendiri, urutan empat gambar dan laluan Pentas Cerita/rakaman atau lisan kepada guru.

Audit enam `stage()` mengesahkan soalan khusus hanya wujud pada Loka 6. Kini semua mempunyai empat soalan mengikut cerita sebenar: Amir/botol; sahabat/kucing hilang dan hadiah dipilih; Vanessa/Cikgu Aina; Amir/Sofia/bacaan; Danish/gotong-royong; Hakim/Faris/kapal. Soalan terbuka dipaparkan tanpa menukar kawalan rakaman, avatar, kemajuan atau pengesahan lisan.

`TeacherAudio.say()` sebelum ini masih membenarkan TTS di halaman selain Loka. Fallback ini ditutup supaya laluan legasi juga tidak boleh menghidupkan semula suara pelayar selepas navigasi/finale. Semua audio pengajaran kekal pada rakaman yang disenaraikan dalam manifest; teks tanpa rakaman menggunakan bimbingan bertulis. Panggilan `speechSynthesis.cancel()` yang tinggal hanya menghentikan suara, bukan menjana suara.

## Video dan MV

MP4, narasi, poster serta VTT Video Panduan tidak diubah. Hanya penerangan halaman diringkaskan. CC kekal. Skrip `scripts/record-teacher-guide.mjs` menunjukkan babak rekod menggunakan `createAppsScriptSimulator()` bersama UI `PbdTeacherUI` sebenar—bukan sambungan Google sebenar. Label data demonstrasi dikekalkan dalam penerangan ringkas supaya video tidak menjanjikan backend yang belum dikonfigurasi.

Konsert sebenar berada di `ImbasLoka.concert()`, `public/assets/imbas-loka.js`. Pautan `https://suno.com/s/Mk9omkQDxSYSdnUc` dikekalkan. Ditambah slot teks “Video Muzik SimpulLoka” yang jujur bahawa fail belum tersedia. Tiada pemain rosak, autoplay, iframe, muat turun Suno atau audio baharu.

Untuk MV kemudian, sediakan fail MP4 dengan video H.264 dan audio AAC, 16:9 (1280×720 atau 1920×1080), `faststart`, kelantangan selesa; saiz praktikal disyorkan bawah 50–80 MB untuk laptop/Internet sekolah. Nama cadangan `simpulloka-mv.mp4`; poster JPG/PNG/WebP pilihan, sari kata Bahasa Melayu `.vtt` pilihan. Sediakan hanya video/audio yang mempunyai kebenaran penggunaan. Penyambungan pemain kemudian perlu menghormati Mod Senyap, kawalan manual, pause semasa navigasi serta semasa rakaman murid. Ia tidak akan menggantikan pautan Suno.

## Google Sheets — keadaan yang benar-benar diperiksa

Dalam mesin ini, ketujuh-tujuh nama konfigurasi PBD tidak berisi dan `.env.pbd.local` tiada. Nilai rahsia tidak dibaca/dicetak. Keadaan laptop atau hosting pengguna tidak boleh disimpulkan daripada mesin ini; mesej pengguna selaras dengan gateway yang gagal syarat `configured`, tetapi punca tepat pada hosting perlu disemak di environment pelayannya.

UI sebenar `public/assets/pbd-teacher-client.js` meminta `/.netlify/functions/teacher-records`. Backend murid meminta `/.netlify/functions/backend`. Kedua-duanya mesti berjalan pada origin aplikasi yang sama. Membuka HTML/statik sahaja tidak menjalankan kedua-dua endpoint.

| Konfigurasi pelayan | Keperluan |
|---|---|
| `APPS_SCRIPT_URL` | URL Web App sebenar berbentuk `https://script.google.com/macros/s/<deployment-id>/exec`; bukan URL editor, `/dev`, URL Sheets atau URL rekaan. |
| `APPS_SCRIPT_PROXY_SECRET` | Rahsia pelayan yang sama dengan Script Property `NETLIFY_PROXY_SECRET`; jangan masukkan dalam frontend/chat/Git. |
| `PBD_PASSCODE_HASH` | Hash scrypt daripada `npm run pbd:passcode`; kod guru 12–200 aksara dipilih secara peribadi. Bukan kata laluan Google atau kata laluan guru legasi. |
| `PBD_GATEWAY_ENABLED` | `true` untuk mengaktifkan gateway setelah prasyarat dipenuhi. |
| `PBD_SITE_ORIGIN` | Origin HTTPS tepat untuk hosting, tanpa path/trailing slash. Pelayan pembangunan menetapkan origin loopbacknya sendiri. |
| `PBD_LOCAL_HTTP` | `0`/tiada di hosting. Pengecualian HTTP hanya ditetapkan oleh dev-server pada loopback. |
| `PBD_SIMULATION` | `0`/tiada untuk ujian Google sebenar. `1` ialah simulasi, tidak boleh dianggap Google. |

`PBD_PORT=4180` ialah pilihan pelayan setempat. Tiada Google API key, OAuth browser token atau credential baharu dicipta untuk reka bentuk ini. Gateway membawa rahsia proksi kepada Apps Script; Google authorization dilakukan pemilik projek ketika setup/deploy.

## Sheet/schema dan tindakan pemilik

Kod yang sudah ada mencukupi untuk laluan sebenar; tiada backend palsu atau datastore kedua ditambah. Rujukan lengkap: `PBD_GOOGLE_SHEETS_SETUP.md`, `config/pbd.env.example`.

1. Gunakan spreadsheet ujian sendiri, private, dan backup dahulu jika menggunakan projek sedia ada. Jangan jalankan setup pada data produksi tanpa semakan.
2. Pasang tiga fail pada **projek Apps Script yang sama**: `backend/apps-script/Code.gs`, `backend/apps-script/teacher-records/Records.gs`, `backend/apps-script/teacher-records/PbdModel.gs`.
3. Project Settings → Script Properties: isi `SPREADSHEET_ID` sebenar dan rahsia rawak `NETLIFY_PROXY_SECRET`. Simpan secara peribadi.
4. Jalankan `setupSimpulLoka()`, kemudian `setupPbdRecords()`; pemilik memberi authorization Google selepas memeriksa akses yang diminta. Fungsi kedua menetapkan `PBD_ENABLED=true` dan memeriksa header sebelum menulis; jangan cipta header secara tekaan.
5. Enam tab asal: `Murid`, `KemajuanLoka`, `PentaksiranPBD`, `TetapanRujukan`, `RefleksiMurid`, `RushMinda`. Skema asal ialah `TABLES` dalam `Code.gs`. `PentaksiranPBD` legasi dikekalkan, bukan digunakan untuk mengandaikan TP baharu.
6. Dua tab PBD baharu: `Ringkasan PBD` (18 lajur) dan `Butiran Loka` (22 lajur). Header tepat ialah `PbdModel.summaryHeaders` dan `PbdModel.detailHeaders` dalam `PbdModel.gs`; salinan frontend `public/assets/pbd-model.js` sama. Ringkasan menyimpan tarikh/masa, nama/kelas, enam Loka, jumlah, dua objektif, skor guru, ulasan, kemas kini dan `recordId` tersembunyi. Butiran menyimpan `recordId/runId/lokaId`, sesi, respons, objektif, rubrik, skor/ulasan, versi dan sejarah. Tiada audio murid dalam Sheets.
7. Pemilik menyediakan atau mengemas kini Web App Google untuk kod semasa: Execute as Me, akses gateway mengikut polisi sekolah. Simpan URL `/exec` sebenar. Jika polisi memerlukan login Google interaktif yang gateway tidak boleh lakukan, jangan longgarkan polisi; reka bentuk alternatif berizin diperlukan. Agen tidak deploy.
8. Pada laptop: salin `config/pbd.env.example` kepada `.env.pbd.local` (ignored), isi nilai sebenar secara peribadi, jana hash melalui `npm run pbd:passcode` dan tetapkan gateway aktif/simulasi tidak aktif. Jalankan `npm run build`, kemudian `node --env-file=.env.pbd.local scripts/pbd-dev-server.mjs`. Jangan buka rahsia dalam chat atau commit fail environment.
9. Untuk hosting kemudian, nilai yang sama perlu berada pada **server environment**, bukan public frontend. `PBD_SITE_ORIGIN` ialah origin HTTPS aplikasi. Mengubah fail lokal tidak mengkonfigurasi hosting sedia ada. Tiada deploy hosting dilakukan dalam kerja ini.
10. Uji tiket rekaan → Loka → baris dua tab sebenar → login guru → penilaian → reload dan semak Sheets. `configured=true` hanya bermaksud konfigurasi lengkap, belum membuktikan simpanan/authorization Google berjaya. Uji juga kod salah, logout, CSRF, sesi tamat dan putus sambungan.

## Perbandingan UI rekod dengan video

Semua fungsi berikut sudah berada pada UI/gateway sebenar yang digunakan dalam video:

| Fungsi | Laluan/peraturan |
|---|---|
| Senarai, carian nama, tapisan kelas | `PbdTeacherUI.content()/filtered()` selepas login pelayan |
| Loka 1–6, sesi/ulangan, status dua objektif | `detail()`, `pbdAttempt`, model PBD mengikut `runId` |
| Soalan, percubaan awal/terkini, bantuan | `evidence()`; hanya item bahasa berkunci yang sah dikira |
| Checkbox guru mendengar cerita | `pbdObserved`; tiada penilaian lisan automatik daripada selesai permainan |
| Lima aspek lisan | Penggunaan simpulan bahasa, kefahaman konteks, kesinambungan cerita, bahasa indah dan santun, kejelasan penyampaian |
| Skor lisan keseluruhan, bertulis pilihan, ulasan | `assessment()` → gateway → `pbdTeacherAssess`, versi konflik/sejarah |

Loka 1–3 tidak mempunyai item Misi 2 berkunci yang sesuai; status Objektif 1 “Tiada Evidens” ialah keputusan reka bentuk, bukan data hilang. Loka 4–6 mempunyai dua item relevan masing-masing. Checkbox guru ialah pengesahan mendengar cerita, bukan checkbox untuk mengubah jawapan permainan. Objektif 2, lima aspek dan skor ditetapkan guru. Tiada skor permainan → TP, tiada AI menilai suara, dan bantuan inklusif tidak dipenalti.

## Bahan dan navigasi

Lembaran Pemulihan: padanan enam makna, enam ayat berbingkai, penceritaan berpandu dan jawapan guru. Lembaran Pengukuhan: enam situasi dengan alasan, cerita baharu empat peristiwa, penceritaan santun dan tulisan sokongan. Kedua-duanya menggunakan renderer dan generator bahan HTML kendiri sedia ada; boleh dibuka offline, dicetak dan disimpan sebagai PDF pelayar. PDF binari bukan format sumber yang didakwa.

Rak bahan kini lapan bahan. Semua pratonton yang dibuka dari rak mempunyai “← Bahan Muat Turun”. Bahan sedia ada dan 24 kad gambar kekal. Laporan ujian dan checklist langkah demi langkah berada dalam `HUMAN_TEST_V9_1.md` dan output ujian `work/` (ignored).
