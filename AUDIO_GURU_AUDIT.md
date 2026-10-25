# Audit audio sedia ada dan persediaan suara cikgu

| Kawasan | Sumber semasa | Persediaan |
|---|---|---|
| Gerbang | Tiada ucapan audio automatik / butang selamat datang | Slot gerbang-selamat-datang.mp3 sahaja, belum dipasang ke UI |
| Perpustakaan / Peta Ilmu | Rakaman MP3 sahaja, tujuh slot buku; tiada TTS | Folder guru/perpustakaan diutamakan apabila wujud, laluan lama tetap diterima; jika tiada “Audio cikgu akan ditambah” |
| Loka 1 | Tiada butang audio arahan; audio murid MediaRecorder dan kesan cop Web Audio | Tiga skrip misi disediakan sebagai slot; tidak menambah/mengubah mekanik Loka 1 |
| Loka 2–6 | Butang Dengar Arahan memanggil speech() (sintesis ms-MY); teks berubah mengikut misi/tugasan/maklum balas | TeacherAudio mengutamakan MP3 bagi awalan skrip tepat yang tersedia. Baki dinamik menggunakan sandaran pelayar berlabel; teks lain tidak dipadankan secara tekaan |
| Pentas Cerita | MediaRecorder audio murid, object URL sementara dalam pelayar | Kekal; tidak disalin ke folder guru atau dihantar ke backend |
| Grand Finale / pasport | Kesan bunyi mekanikal Web Audio; bukan suara guru | Slot tahniah disediakan sahaja; tiada autoplay atau suara palsu ditambah |
| Imbas Loka | Dengar Arahan melalui speech(), empat skrip (intro + 3 soalan) | Pemetaan rakaman tersedia; rakaman masih tiada |
| Rush / teks lain | speech() bacaan pelayar | Sandaran berlabel diteruskan, bukan dakwaan rakaman cikgu |

`teacher-audio-catalog.js` dan `AUDIO_GURU_SCRIPTS.md` menyenaraikan 65 fail/skrip/status. Tiada MP3 sebenar setakat build preview. Rakaman mestilah suara cikgu yang sebenar. Jangan menganggap header fail yang sah sebagai ujian kualiti audio; selepas rakaman dimasukkan, decode dan dengar semua MP3.

TeacherAudio tidak menyentuh kaedah recorder Loka. Klik rakam/main semula menghentikan arahan; event media play menjeda media lain; navigasi menghentikan arahan. Audio arahan sahaja boleh mempunyai ekor TTS selepas rakaman berakhir; ia tidak bermain serentak. Mod Senyap menghentikan arahan dan mengikuti kawalan senyap asal permainan. Tiada audio automatik: hanya interaksi butang sedia ada. Perpustakaan kekal tidak memanggil speech().

Keserasian sebenar diuji dengan audio fixture dalam browser dan fallback tidak tersedia. MP3 guru dan video sebenar belum diuji kerana belum dibekalkan. Fail fixture ujian bukan rakaman cikgu dan tidak dimasukkan ke public/ atau commit media.
