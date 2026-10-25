# Semakan Integrasi Google Sheets & PBD — versi pembangunan localhost

## Struktur yang siap
- Model tunggal `public/assets/pbd-model.js`, salinan byte-identical `backend/apps-script/teacher-records/PbdModel.gs` untuk validasi/status/unjuran.
- Dua tab rasmi melalui `Records.gs`, menggunakan identiti Murid dan kemajuan KemajuanLoka sedia ada; bukan DB kemajuan kedua. Header/skema dan contoh dalam `docs/pbd/examples/`.
- Gateway Node scrypt + cookie HttpOnly/Secure/SameSite, sesi30min, semakanOrigin dan had login tahan instance dalam ScriptProperties/LockService. Adapter functions dan pelayan setempat memakai gateway yang sama. Ia tidak aktif tanpa konfigurasi sebenar.
- Tiket automatik idempotent, masa KL pelayan, buffer evidens/outbox, retrydedup runId/eventId; skor/ulasan/Objektif2 hanya guru. Rekod murid tidak memberi akses kepada senarai atau skor guru.
- Tiga hook itemMisi2 pada Loka4/5/6 dan hook PentasCerita/enrol/progress sahaja. Tiada soalan/visual/animasi permainan ditambah atau ditukar.
- Panel rekod sedia ada, 7lajur, carian/tapisan, butiranperLoka/ulangan, percubaanawal/terkini/bantuan, rubrikmanual5aspek, skorlisan/bertulis/ulasan, statusdefaultBelumDinilai, ack simpan/error/expiry/logout. Reka bentuk kiosk dan lima kad dikekalkan.

## Objektif 1
L1–3 Tiada Evidens. L4 Pulau3(C)/4(A), L5 Stesen3(A)/4(A), L6 Stesen1(A)/4(A). Salah terkini → BelumBetul; semua itemloka dijawab betul → Betul; belumlengkap/tiadaitem → TiadaEvidens. Ringkasan berbilangstatus mengikut enamLoka. First/last/semua percubaan dan petunjuk dipaparkan, tanpa penalti atau dakwaan penguasaan keseluruhan. Satu jawapan betul tidak dianggap keenam-enam simpulan dikuasai.

## Ujian sebenar yang dijalankan
`npm run check && npm test && npm run build` LULUS. Unit termasuk kodGS sebenar pada API Spreadsheet simulasi, ownershipmedan, KLmidnight, dedup/replay, samename IDs, authdurable/sessionexpired/logout/CSRF/rate limits, failclosed/no config dan keserasianitemdengan kodLoka. `test:pbd` LULUS menjalankan aplikasi sebenar pada pelayan setempat: Misi2L4 salah→betul+petunjuk; penceritaan tanpa mikrofon; loginguru; cookie; manualObj2/rubrik/simpan; skor tidak ditimpa; errorSheets; carian; responsive320–1440/inclusive; logout; tiket kekal apabila sambungan gagal. Sifarpageerrors.
Regresi penuh Loka1–6, GrandFinale, Imbas, globalRush/Konsert, SudutGuru dan satu sijil LULUS. GlobalenamLoka+Imbas diuji semula selepas perubahan retrytiket. Sepuluhauditaxe pada preview: sifarpelanggaran; sifarassetgagal.

**Google Sheets sebenar BELUM dikonfigurasi/diuji.** Simulasi menjalankan kodAppsScript yang sebenar terhadap API dalam memori; ia bukan ujian Google/kuota/OAuth/LockService fizikal. Ujianbrowser Chromium dengan emulasi telefon, bukan peranti fizikal/Safari/pembaca skrin manusia. Fail fixture/dummy sahaja; tiada data murid sebenar atau suara yang dimuatnaik.

## Media semakan yang telah diterbitkan
`preview-screenshots/pbd-integration/` mengandungi 10PNG + pbd-teacher-flow.mp4. PNG: access-desktop, records-desktop, objective1-desktop, assessment-before-desktop, assessment-saved-desktop, sheets-error-desktop, records-mobile, assessment-mobile, inclusive-mobile, unconfigured-desktop. Semua decode penuh, nonblack/nonblank dan MP4 mempunyai frameUIberubah. Data dilabel SIMULASI SETEMPAT · BUKAN GOOGLE SHEETS. Bukan mockup atau video statik.

## Tindakan pemilik yang masih diperlukan
Ikut `PBD_GOOGLE_SHEETS_SETUP.md`: buat spreadsheet ujian private, salin 3skrip, set ScriptProperties sendiri, setup tab, semak/beri kebenaranGoogle dan terbitkan WebApp hanya jika dibenarkan pemilik/polisi sekolah. Isi rahsia/hash di environment pelayan sendiri, bukan chat/repo. Jalankan serverlokal dan ujiGoogle sebenar sebelum mengesahkan sambungan. Jika polisiGoogle menghalang gateway, seni bina alternatif perlu dipersetujui dahulu. Codex tidak menjalankan mana-mana tindakanGoogle/hostingini.

Had: identiti tiket bukan identiti murid yang disahkan, respons/hints/kemajuan sendiri boleh dimanipulasi oleh murid teknikal; Obj2 guru berasingan. Outboxbelumack hilang jika storage/peranti dibuang. Sheets tiada transaksi merentas2tab, maka retryupsert diperlukan jika penulisan tergendala. Hadkuota danambangrekod/response didokumenkan. TiadaTPauto/AIgrading/syaratsijilbaharu.

## Git
Branch `work`: media PBD telah dipush melalui `c9dbc02e3b8b46e92fff8e91277b05a9580b85ae`. Pengguna kini meluluskan commit/push kod pembangunan lengkap bagi ujian localhost, dengan penanda langkau Netlify/CI. Tiada deployment hosting atau perubahan pada Apps Script akaun pemilik dibuat. HOME_PREVIEW.md ialah nota sejarah tidak berkaitan dan dikecualikan. Fail environment, rahsia sebenar, dist dan work tidak dimasukkan. V7 tidak disentuh.

Pemilik memaklumkan lapan tab dan Web App sudah tersedia; ujian sambungan Google hujung ke hujung masih perlu dijalankan pemilik. Pembetulan `PbdModel.gs` menggantikan `??=`, `||=` dan `.at(-1)`; salinan model pelayar dikekalkan sama tepat.

Semakan akhir metadata bantuan: petunjuk bahasa khusus item, maklum balas jawapan salah bagi item sama, dan petunjuk permainan keseluruhan disimpan berasingan. Jawapan pertama item baharu tidak dilabel dibantu bahasa hanya kerana petunjuk motor pernah digunakan. Unit/E2E mengesahkannya; regresi penuh Loka5/6 diuji semula selepas hook petunjuk dan LULUS. Pemulihan offline→online juga mengosongkan outbox tanpa murid/ringkasan pendua.
