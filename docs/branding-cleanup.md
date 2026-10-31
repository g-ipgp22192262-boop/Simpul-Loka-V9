# Final user-facing branding cleanup

Product branding in the live HTML interface and generated print resources is **SimpulLoka**. This is a presentation-only cleanup, based on commit `bb8c5ccb45c062e7dffd596373595773a1ac80ff` on `review/v9.1-teacher-audio`.

## Exact visible text changes

| Source | Before | After |
|---|---|---|
| `public/index.html`, browser title | SimpulLoka V9.1 | SimpulLoka |
| `public/index.html`, site footer | SimpulLoka V9.1 • … | SimpulLoka • … |
| `public/assets/sudut-guru-content.js`, shared printable header | SIMPULLOKA V9 · BAHASA MELAYU TAHUN 3 | SIMPULLOKA · BAHASA MELAYU TAHUN 3 |
| `public/assets/sudut-guru.js`, teacher support | Rakaman V9.1 dimainkan … | Rakaman dimainkan … |
| Same source, support heading | Audio suara cikgu · persediaan fasa akhir | Audio suara cikgu |
| Same source, audio-catalog introduction | slot untuk fasa integrasi akhir | rakaman yang belum tersedia |
| `public/assets/teacher-audio-catalog.js`, 17 rendered status descriptions | Legacy · bukan pelan rakaman V9.1 semasa | Rakaman terdahulu · bukan pelan rakaman semasa |
| `public/assets/video/guru/panduan-simpulloka.ms.vtt`, caption text | SimpulLoka V9.1 · Bahasa Melayu Tahun 3 | SimpulLoka · Bahasa Melayu Tahun 3 |
| Teacher-guide MP4/poster, footer and first caption | SIMPULLOKA V9.1 / SimpulLoka V9.1 | SIMPULLOKA / SimpulLoka |

All eight downloadable/printable HTML documents inherit the shared header change. Caption timecodes and all remaining caption content are unchanged. The audio catalog's IDs, paths, scripts, triggers, labels, flags and ordering are unchanged; only the 17 user-visible status descriptions differ.

## Search and classification

A repeat scan of public HTML/JS/JSON/SVG/VTT/TXT source finds no remaining live software-release labels in rendered text. Remaining references are intentionally retained:

- JavaScript functions/constants: `v9ConcertHtml`, `v9Confetti`, `v9Rush`, `V9_SK`, `V9_SP`, etc.
- DOM/CSS contracts: `v9-band`, `v9-split`, `v9VoicePanel`, `v9TeacherInfo`, `v91.css`, and related identifiers.
- Persistent storage: `simpulloka_v9_*`, including pupil sessions, activity state, PBD outbox and teacher demo storage.
- Assessment metadata: `version`, `assessmentVersion`, and the Sheet header `Versi penilaian` refer to assessment concurrency/history, not a software-release label. Backend/schema/UI logic is untouched.
- Source comments, package metadata, test identifiers, historical documentation, historical video-generation scripts and Git history retain their existing release references. The package version is unchanged; no new version was created.
- `public/assets/fonts/library/OFL.txt`: “Version 1.1” identifies the font licence, not the product. Legal text is retained.

### Recorded teacher guide

The existing teacher-guide video and poster also displayed the old release label. Only the footer branding strip and the first eight seconds of the burned-in introductory caption are relabelled. The 280-second timeline, 7,000 frames, dimensions and frame rate are retained. The compressed narration stream is copied unchanged (SHA-256 `59cc4bad2d499175adc198402c4c0d6c7e4eacae72e21f9787ef4328fdebcb8f`). The poster is extracted from the relabelled video at two seconds, and the two current-video integrity hashes in `narration.json` are refreshed. Narration chapter mappings and the original-source hashes are unchanged.

## Preservation checks

Before/after SHA-256 checks cover the real song, full lyric player source (therefore all 45 cue timings and lyric text), teacher audio/recording/finale modules, all backend/configuration files and PBD modules. They are unchanged. The real song checksum remains:

```text
c19ae0c9773d4a021ac6bd492dc6019298fd14c0b8848f12df089b72244d9cd6
```

A structural comparison of the entire teacher audio catalog, excluding only its visible `status` field, is identical to HEAD. No Google operation, migration, backend change, audio replacement, route change, internal rename or deployment is part of this cleanup.

## Verification

`tests/branding-browser.mjs` checks the rendered text of 35 pupil/teacher screens, all 8 generated printable resources, page title/footer and guide captions using isolated local test data. The recorded footer and poster are inspected separately, with narration-stream and demonstration-frame preservation checks. No production records or Google credentials are used.

Verification commands and results:

- `npm run check`: PASS.
- `npm test`: PASS, 38 tests, zero failures.
- `npm run build`: PASS; eight standalone printable resources generated.
- `node tests/branding-browser.mjs`: PASS; 35 screens, eight printable resources, title/footer/captions, zero page errors.
- `npm run test:browser`: PASS; broad pupil/application flow and mobile navigation.
- `npm run test:lyric`: PASS; both concert paths, all 45 synthetic-clock cues, playback controls, accessibility and responsive layout. The real song and cue source are byte-identical to the verified baseline; this cleanup does not retime them.
- `npm run test:audio`: PASS; all 79 teacher/narration MP3s decoded and played to completion at accelerated speed, all 71 app audio mappings checked, all six record/re-record/replay/oral flows, zero page errors.
- `npm run test:final`: PASS; six introductions/definitions, no Loka TTS, finale gates, teacher-guide narration/CC/silent/navigation checks.
- `npm run test:finale`: PASS; full Grand Finale, six seals, sequential animations, reduced motion, valid certificate SVG, keyboard/touch/navigation, zero page errors.
- `npm run test:video:narration`: PASS; nine demonstration-frame positions and eight real narration sources matched.

Browser commands use the environment's installed Playwright/Chromium; Node socket tests require local-network permission. Unrelated legacy tests are not rewritten. Detailed local outputs are under ignored `work/branding/`.

