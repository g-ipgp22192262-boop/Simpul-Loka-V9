"""Render the real Playwright recording; needs FFmpeg with libass. No narration."""
import json, pathlib, subprocess, textwrap
root=pathlib.Path(__file__).resolve().parent.parent
source=root/'work/teacher-guide/capture/raw.webm'
report=json.loads((source.parent/'capture-report.json').read_text())
if report['rehearsal'] or report['pageErrors']:raise RuntimeError('A complete error-free recording is required')
timeline=json.loads((root/'docs/video-panduan/masa-babak.json').read_text())
probe=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-of','json',str(source)]))
lead=max(0,float(probe['format']['duration'])-timeline['duration'])
def stamp(t):return f'{int(t//3600)}:{int(t//60%60):02}:{int(t%60):02}.00'
def esc(t):return t.replace('\\','\\\\').replace('{','\\{').replace('}','\\}')
header='''[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 0
[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: Caption,DejaVu Sans,30,&H00E8F7FF,&H00E8F7FF,&H0058243F,&H0058243F,0,0,0,0,100,100,0,0,1,0,0,2,65,65,20,1
Style: Chapter,DejaVu Sans,23,&H008AD0EF,&H008AD0EF,&H0058243F,&H0058243F,1,0,0,0,100,100,0,0,1,0,0,7,62,62,0,1
[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
'''
lines=[]
for i,c in enumerate(timeline['chapters']):
 text=esc(f'{i+1:02}  {c["title"].upper()}')
 lines.append(f'Dialogue: 0,{stamp(c["start"])},{stamp(c["end"])},Chapter,,0,0,0,,{{\\pos(62,959)}}{text}')
 lines.append(f'Dialogue: 0,{stamp(c["start"])},{stamp(c["end"])},Chapter,,0,0,0,,{{\\an9\\pos(1858,959)}}SIMPULLOKA V9.1 · TANPA NARASI')
for cue in timeline['captions']:
 text='\\N'.join(esc(t) for t in textwrap.wrap(cue['text'],width=100,break_long_words=False))
 lines.append(f'Dialogue: 1,{stamp(cue["start"])},{stamp(cue["end"])},Caption,,0,0,0,,{text}')
ass=root/'work/teacher-guide/guide.ass';ass.write_text(header+'\n'.join(lines)+'\n')
filters=[f'trim=start={lead:.3f}:duration=280','setpts=PTS-STARTPTS','fps=25','tpad=stop_mode=clone:stop_duration=1','trim=duration=280']
# Brief gentle dips at chapter boundaries; UI actions themselves remain authentic.
for c in timeline['chapters'][1:]:
 t=c['start'];filters += [f"fade=t=out:st={t-.22}:d=0.22:enable='between(t,{t-.22},{t})'",f"fade=t=in:st={t}:d=0.22:enable='between(t,{t},{t+.22})'"]
filters += ['pad=1920:1080:0:0:color=0x3F2458','drawbox=x=0:y=948:w=1920:h=4:color=0xEFD08A:t=fill',"subtitles=work/teacher-guide/guide.ass"]
out=root/'public/assets/video/guru/panduan-simpulloka.mp4'
subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','warning','-i',str(source),'-vf',','.join(filters),'-an','-c:v','libx264','-preset','veryfast','-crf','23','-maxrate','2200k','-bufsize','4400k','-pix_fmt','yuv420p','-movflags','+faststart','-threads','2',str(out)],cwd=root,check=True)
subprocess.run(['ffmpeg','-y','-hide_banner','-loglevel','error','-ss','2','-i',str(out),'-frames:v','1',str(out.with_name('panduan-simpulloka-poster.png'))],check=True)
print('Rendered actual recording:',out)
