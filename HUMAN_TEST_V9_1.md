# Semakan human test V9.1

Asas: `review/v9.1-teacher-audio`, `0f30c64d10915001edde726e80c58efa2660d5f1`.
Tiada deployment, commit atau sambungan Google baharu dibuat dalam semakan ini.

## Menjalankan di laptop

Gunakan folder kerja yang mengandungi perubahan ini. ZIP GitHub lama belum mengandungi perubahan yang belum dipush.
Node.js 22 atau lebih baharu diperlukan. Dalam terminal folder `package.json`:

```sh
npm run check
npm test
npm run build
npm run dev:pbd
```

Buka `http://127.0.0.1:4180` di laptop. Kekalkan terminal terbuka. Jangan gunakan Live Server/statik untuk menguji gateway Google. Jika port digunakan, hentikan pelayan projek lama yang anda kenali. Selepas perubahan aset/config, build dan mulakan semula pelayan. Jangan padam storan pelayar/tiket sedia ada; gunakan profil pelayar ujian berasingan jika perlu.

## Langkah semakan

1. Guna tiket rekaan. Uji navigasi utama dan Loka 1–6; pastikan progress lama kekal selepas refresh.
2. Dalam setiap panel “Apa kita akan buat?”, tekan “Dengar Arahan Pengenalan”. Enam rakaman pengenalan sebenar kini tersedia. Pastikan setiap butang memainkan pengenalan Loka yang betul hingga tamat. Jika fail/manifest tidak tersedia, mesej “Audio pengenalan belum tersedia” mesti muncul tanpa suara pengganti. “Dengar Arahan” Teroka Makna dan “Dengar Maksud” masih memainkan rakaman asal yang sesuai.
3. Lengkapkan misi setiap Loka dan masuk Pentas Cerita. “Soalan panduan cerita” mesti terus kelihatan: Amir/pertandingan (L1), sahabat/kucing hilang (L2), Vanessa/Cikgu Aina (L3), Amir/Sofia/bacaan (L4), Danish/gotong-royong (L5), Hakim/Faris/kapal (L6).
4. Ceritakan semula menggunakan simpulan bahasa sasaran. Benarkan mikrofon, rakam dan lihat avatar bergerak; selesai rakaman, dengar semula, rakam semula dan muat turun jika mahu. Pastikan audio guru tidak bertindih dengan rakaman.
5. Cuba laluan tanpa mikrofon: bercerita terus kepada guru, tanda pengesahan penceritaan dan teruskan. Cuba menolak izin mikrofon; laluan lisan mesti kekal tersedia.
6. Lengkapkan Loka 5 dan Loka 6. Tiada suara pelayar/TTS. Uji finale, cop, ganjaran dan pautan Imbas Loka. Semak Mod Senyap, Mod Fokus, Kurangkan Animasi, tulisan besar dan kontras; audio tidak bermula sendiri.
7. Sudut Guru → Video Panduan: main, jeda, seek dan dengar narasi Cikgu Danea; hidupkan CC. Teks halaman ringkas dan contoh rekod video dikenal pasti sebagai demonstrasi. Mod Senyap menghentikan/membisukan video.
8. Imbas Loka → Konsert: pautan Suno asal tidak berubah. Slot “Video Muzik SimpulLoka” menunjukkan belum tersedia; tiada autoplay atau pemain kosong.
9. Sudut Guru → Bahan Muat Turun: semak kesemua lapan bahan. Buka Pratonton setiap bahan, tekan “← Bahan Muat Turun”, pastikan kembali terus ke rak bahan. Semak Kad Gambar Cerita masih mempunyai 24 gambar.
10. Buka Lembaran Pemulihan dan Lembaran Pengukuhan. Cuba Cetak / Simpan PDF, lihat print preview A4, simpan PDF dan buka semula. Muat turun HTML, buka tanpa Internet dan cetak. Panduan jawapan guru berada di bahagian akhir; pilih halaman murid sahaja semasa mencetak untuk murid jika perlu.
11. Tanpa konfigurasi Google, Rekod Kemajuan mesti terus menunjukkan belum dikonfigurasi—bukan data sebenar palsu. Demo hanya dibuka melalui butang demonstrasi.
12. Selepas pemilik menyiapkan Google mengikut `AUDIT_HUMAN_TEST_V9_1.md`, jalankan pelayan dengan `.env.pbd.local`. Guna tiket rekaan baharu, lengkapkan satu Loka dan semak baris sebenar pada dua tab PBD.
13. Log masuk guru. Uji carian nama, tapisan kelas, Loka 1–6 dan sesi/ulangan. Semak jawapan, bantuan dan status Objektif 1. Skor permainan tidak boleh menetapkan Objektif 2 atau TP.
14. Dengar cerita sebenar, tanda evidens mendengar dan isi lima aspek rubrik, skor lisan keseluruhan, skor bertulis pilihan serta ulasan. Simpan, muat semula, semak Sheets. Ulang Loka dan pastikan penilaian sesi lama kekal.
15. Cuba kod salah, log keluar dan gangguan Internet. Rekod guru mesti ditutup selepas log keluar; aplikasi tidak boleh mendakwa simpanan Google berjaya semasa permintaan gagal.

Hanya selepas ujian Google sebenar berjaya, sambungan boleh disahkan. Jangan gunakan data murid sebenar sebelum konfigurasi dan kawalan akses disemak.
