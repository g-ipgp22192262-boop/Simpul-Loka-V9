# Video Muzik SimpulLoka

A browser-native concert integrated into the existing V9.1 application. No FFmpeg, generated MP4, external video renderer, animation framework, CDN or generated voice is used. Backend behavior, Google configuration and pupil records were not changed.

## Real recording

The user-supplied recording is included unchanged at:

```text
public/assets/audio/jelajahi-simpulloka.mp3
```

Browser URL: `assets/audio/jelajahi-simpulloka.mp3`.

- SHA-256: `c19ae0c9773d4a021ac6bd492dc6019298fd14c0b8848f12df089b72244d9cd6`
- Encoded duration: 169.992 seconds; decoded samples: approximately 169.960 seconds (MP3 padding difference).
- Original stereo/48 kHz audio and embedded cover were preserved byte-for-byte; no re-encoding or song replacement.
- Inventory: 80 MP3 files in public assets: 79 previous files plus this song. The teacher-audio manifests still contain their original 71 app clips and 8 video-narration clips; the song is a separate HTML5 audio source.

## Integration and presentation

Imbas Loka → Konsert and `navTo('concert')` render the same `SimpulLyricVideo` as the legacy `v9ConcertHtml()` entry point. The script loads before `app.js`; explicit mount/unmount hooks replace the ineffective delayed `window.v9ConcertHtml` override.

The responsive stage reuses the existing theme-park background and two pupil characters from `images/loka6/friends.webp`. Features include current/next lyrics, target-idiom highlighting, established meaning cards, bridge call-and-response emphasis, progressive decorative song badges, “MISI SELESAI!” and separate outro messages. Song badges do not update real achievements, certificates, progress or PBD.

Playback is manual. Play/pause, restart, keyboard seeking, volume, silent/contrast/focus/reduced-motion preferences, `prefers-reduced-motion`, teacher-audio exclusivity and repeated navigation cleanup are supported. A missing or failed recording produces a non-destructive status with readable lyrics and a retry button—never Suno, TTS or a fake song fallback.

The supplied lyrics are preserved. The meaning cards read existing `IDIOMS` definitions. A note distinguishes the song's “wajah/raut wajah” wording from Loka 4's “menjaga air muka” meaning of protecting dignity; Cakap Besar remains boasting, not loudness.

## Timing validation against the actual recording

All 45 cues were retimed from the real MP3 using local multilingual Whisper base analysis, known-text cross-attention alignment with the official alignment heads and 50 Hz dynamic time warping, cross-checked against overlapping Malay ASR segments. Analysis tools/models were isolated in temporary/ignored paths, not added as application dependencies. The alignment ran locally, without FFmpeg.

The cue sheet remains an editable array in `public/assets/lyric-video.js`:

```js
{start:30.6, end:33.58, text:'Dalam tangan, pasti berjaya,', section:'verse1', idiom:0}
```

Section starts measured by this pass:

| Section | Seconds |
|---|---:|
| Intro cue / instrumental lead-in | 0.00 |
| Verse 1 | 15.12 |
| Chorus | 45.90 |
| Verse 2 | 74.26 |
| Bridge | 104.16 |
| Final chorus | 126.56 |
| Outro | 156.60 |
| Yeayyy / instrumental ending | 162.40–169.992 |

The final badges and MISI SELESAI threshold are derived from the cue sheet rather than the former approximate hard-coded times. `audio.currentTime` drives all visuals through media events and animation frames while playing, so pause, seeks in both directions, restart and ended remain consistent.

**Validation limits:** these are machine-estimated sung line boundaries, not a human listening certification or a promise of perfect syllable-level karaoke sync. The first cue includes the lead-in and the last cue holds through the instrumental tail. A full normal-speed browser playback and native seeks were actually run against this recording; no synthetic clock or test song was used in that real-audio run.

Per-line evidence and recording identity: `docs/music/lyric-timing-validation.json`. Test summary: `docs/music/validation-results.json`.

## Test results

- `npm run check`: PASS.
- `npm test`: **38/38 PASS**, including cue continuity, explicit route/script-order integration and real-song checksum/evidence checks.
- `npm run build`: PASS; built song hash matches the uploaded file.
- `npm run test:lyric`: PASS. Missing/retry handling is explicitly simulated; an existing short test-tone fixture tests controls, with synthetic media-clock samples for cue logic. No fixture is written to the production song path.
- `npm run test:lyric:real`: equivalent real-audio test file executed successfully. The actual recording decoded and played fully at **1×**, all **45 natural cue transitions** and **45 native backward seeks** passed, with finale/outro/restart/silence/navigation checks and zero page errors.
- `npm run test:browser`: PASS after updating only the intentionally replaced concert title assertion. Covers the broad home/navigation, six Loka, inclusive mode, persistence, reflection, Rush and mobile flow.
- `npm run test:audio`: PASS. All 79 prior MP3s decoded/played to completion (accelerated regression), all 71 teacher app-clip mappings, and six recording/re-record/replay/oral flows.
- `npm run test:reward`, `test:loka6`, `test:finale`, `test:final`: PASS. Final covers progress, Loka 5/6 finales without TTS, eight real narrated-video chapters and CC.
- `node tests/human-review-browser.mjs`: PASS; story guides, printable resources, navigation and the local concert.

The expanded run also executed the existing legacy browser commands. These are **not all green**, and unrelated code/assertions were not changed to conceal failures:

| Command | Remaining failure |
|---|---|
| `test:ferris` | Whole-database equality assertion conflicts with existing PBD visit recording. |
| `test:library` | Waits for unavailable-audio UI although the recordings already exist. |
| `test:loka1`, `test:loka2`, `test:loka3`, `test:loka5` | Broad sentence-help selector now also matches existing story questions. |
| `test:teacher` | Expects six resources; the existing application has eight. |
| `test:pbd` | Existing simulated outage/session issue, reproduced with unchanged baseline assets. Omitting the pre-existing Sheets-shortcut observer in an ignored diagnostic makes that diagnostic pass; production/backend code remains unchanged. |
| `test:v91`, `test:loka4`, `test:imbas` | The latter commands use the same V9.1 flow; existing Loka 4 completion wait fails and was reproduced on baseline HEAD. |

`test:video:narration` was **not run** because its existing implementation invokes FFmpeg, which the task prohibits. Browser video/narration/CC checks passed instead. A first parallel `test:final` attempt collided with the real-song test's server port; it was rerun separately and passed, and the new real-song test now uses its own port 4201.

Analysis/model files and detailed test logs/screenshots are in ignored `work/lyric-alignment/` and `work/lyric-video/`; none is a production dependency or credential. No Google Sheets connectivity claim is made by these tests.

## Local human test

Use the current folder/commit, not an older ZIP. With your existing private PBD environment file:

```sh
npm run build
node --env-file=.env.pbd.local scripts/pbd-dev-server.mjs
```

Without a PBD configuration file, `npm run dev:pbd` is sufficient for a frontend-only local test. No new Google Sheet, Apps Script project or credential is required for the concert.

1. Open the printed origin (normally `http://127.0.0.1:4180`), then Imbas Loka → Konsert.
2. Confirm “🎶 Video Muzik SimpulLoka”, no autoplay and no Suno dependency. Play the real song through once at 1×.
3. Check the line changes against what you hear, especially repeated “Simpul” phrases, bridge and outro. Machine-derived timings can be fine-tuned by editing the cue array and rebuilding; do not describe them as human-certified until reviewed by ear.
4. Pause/resume, seek forward/backward and restart. Check meaning cards, progressive badges, MISI SELESAI and the three outro lines.
5. Test silent/focus/reduced motion/contrast and narrow mobile layout. Trigger the existing concert guidance and verify it pauses the song.
6. Leave/reopen repeatedly: old audio must stop and one click must start only one player. Recheck ordinary Loka/Pentas Cerita/PBD workflows separately.

No deployment is part of this work.
