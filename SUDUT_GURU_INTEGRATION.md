# Integrasi Sudut Guru / PBD — status semasa

Spesifikasi rekod ringkas lama telah digantikan dengan dua tab rasmi **Ringkasan PBD** dan **Butiran Loka**. Tiada sistem rekod sekolah kedua; unjuran menggunakan Murid/KemajuanLoka sedia ada. Penilaian guru baharu 1–5 tidak ditukar secara automatik daripada PBD lama 1–4/TP.

Rujuk `PBD_GOOGLE_SHEETS_SETUP.md` untuk seni bina, pemetaan enam item Objektif1, struktur lajur, pengurusan ulangan, kawalan guru sebenar pada gateway/Apps Script, had, konfigurasi pemilik dan ujian Google yang belum dilakukan. Draf gate lama yang sentiasa menolak digantikan dengan gateway sesi yang boleh diuji pada pelayan setempat. Ia tetap ditutup apabila environment sebenar belum dikonfigurasi.

Versi pembangunan diluluskan untuk disimpan pada branch `work` bagi ujian localhost; tiada deployment hosting. Pemilik sudah menyediakan Google Sheets dan Web App, tetapi sambungan aplikasi kepada Google sebenar belum disahkan. Preview menggunakan data rekaan dan simulasi API Sheets, bukan data murid/sekolah sebenar. Tiada kod laluan, Spreadsheet ID atau URL deployment sebenar dalam repository.
