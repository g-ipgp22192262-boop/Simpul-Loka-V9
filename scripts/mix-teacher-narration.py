"""Mux eight VIDEO ONLY recordings; update only the obsolete footer on the 280s guide.
Usage: python scripts/mix-teacher-narration.py [source-video.mp4]
Requires FFmpeg/ffprobe; no changes to the original MP3 recordings.
"""
import hashlib
import json
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public/assets/video/guru/panduan-simpulloka.mp4'
SOURCE = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else OUTPUT
NAMES = ['pengenalan', 'peta-ilmu', 'roda-ferris', 'tiga-misi', 'inklusif', 'kenangan-pencapaian', 'sudut-guru-pbd', 'penutup']
BOUNDS = [0, 30, 60, 85, 140, 170, 205, 255, 280]

def probe(path):
    return json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', str(path)]))

def picture_hash(path):
    return subprocess.check_output(['ffmpeg', '-nostdin', '-v', 'error', '-i', str(path), '-map', '0:v:0', '-c:v', 'copy', '-f', 'hash', '-hash', 'sha256', '-'], text=True).strip()

source_info = probe(SOURCE)
assert abs(float(source_info['format']['duration']) - 280) < .1
source_sha = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
source_picture = picture_hash(SOURCE)
args = ['ffmpeg', '-nostdin', '-v', 'error', '-i', str(SOURCE)]
filters, chapters = [], []
for i, name in enumerate(NAMES, 1):
    clip = ROOT / f'public/assets/audio/guru/video-panduan/babak-{i:02d}-{name}.mp3'
    duration = float(probe(clip)['format']['duration'])
    slot = BOUNDS[i] - BOUNDS[i-1]
    # Leave a small tail inside the existing shot; V08 needs only ~2% acceleration.
    tempo = max(1.0, duration / (slot - .2))
    assert tempo < 1.05, 'Narration exceeds its shot; manual alignment required'
    args += ['-i', str(clip)]
    filters.append(f'[{i}:a]aresample=44100,asetpts=PTS-STARTPTS,atempo={tempo:.8f},adelay={BOUNDS[i-1]*1000}:all=1[a{i}]')
    chapters.append({'id': f'V{i:02d}', 'path': str(clip.relative_to(ROOT / 'public')), 'start': BOUNDS[i-1], 'end': BOUNDS[i], 'source_duration': duration, 'tempo': tempo, 'source_sha256': hashlib.sha256(clip.read_bytes()).hexdigest()})
# The old source has a burned-in TANPA NARASI footer. Keep all demo pixels
# above y=948 and all timing; replace only footer labels/caption below it.
work = ROOT / 'work/teacher-guide/narration'
work.mkdir(parents=True, exist_ok=True)
title = work / 'footer-title.txt'
closing = work / 'footer-closing.txt'
title.write_text('SIMPULLOKA V9.1 · NARASI CIKGU DANEA')
closing.write_text('SimpulLoka · Belajar, bermain dan bercerita bersama Cikgu Danea.')
timeline = json.loads((ROOT / 'docs/video-panduan/masa-babak.json').read_text())
last = timeline['captions'][-1]
filters.append(f"[0:v]drawbox=x=1130:y=952:w=790:h=42:color=0x3F2458:t=fill,drawtext=font=DejaVuSans-Bold:textfile='{title}':fontsize=23:fontcolor=0xEFD08A:x=w-tw-62:y=959,drawbox=x=0:y=994:w=1920:h=86:color=0x3F2458:t=fill:enable='between(t,{last['start']},280)',drawtext=font=DejaVuSans:textfile='{closing}':fontsize=30:fontcolor=0xFFF7E8:x=(w-tw)/2:y=1025:enable='between(t,{last['start']},280)'[picture]")
filters.append(''.join(f'[a{i}]' for i in range(1, 9)) + 'amix=inputs=8:duration=longest:normalize=0,apad,atrim=duration=280[narration]')
temp = OUTPUT.with_name('panduan-simpulloka.mixing.mp4')
assert not temp.exists(), 'Unexpected temporary video; inspect before overwriting'
try:
    subprocess.run(args + ['-filter_complex', ';'.join(filters), '-map', '[picture]', '-map', '[narration]', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-maxrate', '2200k', '-bufsize', '4400k', '-pix_fmt', 'yuv420p', '-threads', '2', '-c:a', 'aac', '-b:a', '128k', '-ac', '1', '-t', '280', '-movflags', '+faststart', str(temp)], check=True)
    info = probe(temp)
    assert abs(float(info['format']['duration']) - 280) < .1
    assert any(s['codec_type'] == 'audio' for s in info['streams'])
    assert next(x for x in info['streams'] if x['codec_type']=='video')['nb_frames'] == next(x for x in source_info['streams'] if x['codec_type']=='video')['nb_frames'], 'Frame timeline changed'
    temp.replace(OUTPUT)
except BaseException:
    if temp.exists():
        temp.unlink()
    raise
source_blob = None
try:
    candidate = subprocess.check_output(['git','hash-object',str(SOURCE)],cwd=ROOT,text=True).strip()
    subprocess.run(['git','cat-file','-e',candidate],cwd=ROOT,check=True,capture_output=True)
    source_blob = candidate
except (subprocess.CalledProcessError, FileNotFoundError):
    pass
metadata = {'source_video_git_blob': source_blob, 'narrated': True, 'videoOnly': True, 'duration': 280, 'source_video_sha256': source_sha, 'video_sha256': hashlib.sha256(OUTPUT.read_bytes()).hexdigest(), 'source_video_stream_hash': source_picture, 'video_stream_hash': picture_hash(OUTPUT), 'footer_updated': True, 'demonstration_area': {'x':0,'y':0,'width':1920,'height':948}, 'chapters': chapters}
(OUTPUT.parent / 'narration.json').write_text(json.dumps(metadata, indent=2) + '\n')
subprocess.run(['ffmpeg','-nostdin','-v','error','-ss','2','-i',str(OUTPUT),'-frames:v','1','-y',str(OUTPUT.with_name('panduan-simpulloka-poster.png'))],check=True)
print('PASS: 8 real narration clips, 280s, original demo timeline; obsolete footer updated; original MP3s untouched.')
