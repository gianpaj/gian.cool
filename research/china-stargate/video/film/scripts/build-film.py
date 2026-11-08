#!/usr/bin/env python3
"""Build the editable, offline HyperFrames composition from the approved script."""
import html
import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path

FILM = Path(__file__).resolve().parent.parent
STORY = json.loads((FILM.parent / 'story_script.json').read_text())
TIMING = FILM / 'audio/timing.json'
times = json.loads(TIMING.read_text()) if TIMING.exists() else None
shots = STORY['story_script']
duration = times['duration_seconds'] if times else 216
starts = times['shot_starts'] if times else [s['start_seconds'] for s in shots]
ends = starts[1:] + [duration]


def esc(text):
    return html.escape(str(text), quote=True)


def svg(content, view='0 0 1720 530'):
    return f'<svg viewBox="{view}" aria-hidden="true">{content}</svg>'


def text(x, y, content, size=36, fill='#242a26', anchor='middle', weight=400, cls=''):
    return f'<text x="{x}" y="{y}" text-anchor="{anchor}" fill="{fill}" font-size="{size}" font-weight="{weight}" class="{cls}">{esc(content)}</text>'


def turbine(x, y, size=1):
    return f'''<g transform="translate({x} {y}) scale({size})">
      <path d="M0 0 L-12 225 L12 225 Z" fill="#deded1" stroke="#242a26" stroke-width="4"/>
      <g class="rotor" transform="rotate(0 0 0)">
        <path d="M0 0 L-12 -126 Q-7 -155 5 -147 L14 -10 Z" fill="#242a26"/>
        <path d="M0 0 L-12 -126 Q-7 -155 5 -147 L14 -10 Z" fill="#242a26" transform="rotate(120)"/>
        <path d="M0 0 L-12 -126 Q-7 -155 5 -147 L14 -10 Z" fill="#242a26" transform="rotate(240)"/>
      </g><circle r="17" fill="#b45a18"/>
    </g>'''


def rack(x, y, size=1):
    slots = ''.join(f'<rect x="20" y="{27+i*43}" width="130" height="30" rx="3" fill="#eae9df"/><circle cx="131" cy="{42+i*43}" r="5" fill="#b45a18"/>' for i in range(5))
    return f'<g transform="translate({x} {y}) scale({size})"><rect width="170" height="270" rx="9" fill="#242a26"/>{slots}</g>'


def box(x, y, w, h, label, sub='', accent=False):
    color = '#b45a18' if accent else '#242a26'
    out = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#f7f6ef" stroke="{color}" stroke-width="4"/>'
    out += text(x+w/2, y+h/2+7 if not sub else y+h/2-10, label, 36, color, weight=700)
    if sub:
        out += text(x+w/2, y+h/2+45, sub, 31)
    return out


def line(x1, y1, x2, y2, dash=False):
    return f'<path class="power-line" d="M{x1} {y1} H{x2}" fill="none" stroke="#b45a18" stroke-width="9" stroke-linecap="round" {"stroke-dasharray=\"16 15\"" if dash else ""}/>'


def energy(storage=False, supply=False):
    out = turbine(190, 200, 0.9) + rack(1420, 175, 0.9)
    out += line(245, 295, 1390, 295)
    out += text(190, 470, 'WIND', 30, weight=700) + text(1497, 470, 'COMPUTING', 30, weight=700)
    if storage:
        out += '<path d="M660 295 V175" fill="none" stroke="#b45a18" stroke-width="7"/>'
        out += box(515, 50, 290, 125, 'STORAGE', 'Shifts energy')
    if supply:
        out += box(945, 210, 290, 170, 'POWER', 'Converts voltage')
    out += '<circle class="electron" cx="260" cy="295" r="12" fill="#242a26"/>'
    return svg(out)


def conversion(chip=False):
    out = line(75, 265, 1625, 265)
    out += box(90, 170, 300, 190, '10 kV AC', 'Incoming supply')
    out += box(540, 170, 380, 190, 'SOLID-STATE', 'Transformer', True)
    out += box(1080, 170, 300, 190, '800 V DC', 'Distribution bus', True)
    out += text(860, 465, 'Reported 5 MW pilot • one part of the first phase', 34)
    if chip:
        out = line(90, 265, 1600, 265) + box(70, 170, 340, 190, '800 V DC', 'Distribution bus', True)
        out += box(630, 170, 380, 190, 'RACK DC / DC', 'Further conversion')
        out += box(1250, 170, 350, 190, 'CHIPS', 'Much lower voltage')
        out += text(860, 465, '800 volts is not applied directly to the silicon', 34)
    return svg(out)


def capacity(mode=0):
    out = text(35, 105, '120 MW', 112, anchor='start', weight=700)
    out += text(35, 162, 'FIRST PHASE • REPORTED DELIVERED', 30, anchor='start')
    out += text(1665, 105, '800 MW', 112, anchor='end', weight=700)
    out += text(1665, 162, 'FULL CAMPUS • PLANNED IT CAPACITY', 30, anchor='end')
    out += '<rect x="35" y="230" width="1630" height="100" fill="#eeece0" stroke="#242a26" stroke-width="3" stroke-dasharray="14 10"/>'
    out += '<rect class="capacity-fill" x="35" y="230" width="244.5" height="100" fill="#b45a18"/>'
    out += text(35, 393, 'August 2026', 34, anchor='start') + text(1665, 393, 'Future build-out', 34, anchor='end')
    labels = ['Different stages of development', 'IT capacity = power intended for computing equipment', 'A plan is not operating capacity', 'Delivered does not establish actual server load']
    out += text(850, 490, labels[mode], 36, weight=700)
    return svg(out)


def current(heat=False):
    out = text(860, 75, 'SAME DC POWER: 100 kW', 36, weight=700)
    out += text(420, 195, '400 V', 83, weight=700) + text(1290, 195, '800 V', 83, '#b45a18', weight=700)
    out += text(420, 315, '250 A', 108, weight=700) + text(1290, 315, '125 A', 108, '#b45a18', weight=700)
    out += '<path d="M650 280 H1060 M1020 250 L1060 280 L1020 310" fill="none" stroke="#242a26" stroke-width="6"/>'
    if heat:
        out += text(860, 420, 'Conductor heating = I²R', 44, weight=700)
        out += text(860, 490, 'Same resistance • Galaxy savings are not measured here', 31)
    else:
        out += text(860, 445, 'Power = voltage × current', 44, weight=700)
        out += text(860, 505, 'An illustrative calculation, not Galaxy measurements', 31)
    return svg(out)


def wind(storage=False, duration_note=False):
    vals = [0.38, 0.64, 0.79, 0.76, 0.52, 0.26, 0.17, 0.29, 0.62, 0.72, 0.46, 0.32, 0.56]
    points = ' '.join(f'{100+i*105},{400-v*330:.1f}' for i,v in enumerate(vals))
    out = '<path d="M100 75 V420 H1415" fill="none" stroke="#aaa99f" stroke-width="3"/>'
    out += '<path d="M100 218 H1400" fill="none" stroke="#242a26" stroke-width="5" stroke-dasharray="14 10"/>'
    out += f'<polyline class="wind-curve" points="{points}" fill="none" stroke="#b45a18" stroke-width="9" stroke-linejoin="round"/>'
    out += text(1400, 192, 'Example load', 31, anchor='end')
    out += text(100, 475, 'Time →', 31, anchor='start') + text(100, 45, 'Relative power', 31, anchor='start')
    out += text(950, 80, 'Wind generation', 33, '#b45a18')
    if storage:
        out += '<rect x="1500" y="185" width="135" height="210" rx="10" fill="none" stroke="#242a26" stroke-width="5"/><rect x="1540" y="167" width="55" height="18" fill="#242a26"/>'
        out += '<rect class="battery-level" x="1510" y="260" width="115" height="125" fill="#b45a18"/>'
        out += text(1567, 460, 'Battery', 31)
    if duration_note:
        out += text(860, 530, 'Power (MW) + stored energy (MWh) + duration (h)', 34, weight=700)
    return svg(out)


def big_words(lines, smaller=False):
    return '<div class="word-stack">' + ''.join(f'<div class="reveal {"smaller" if smaller else ""}">{esc(x)}</div>' for x in lines) + '</div>'


def photo(filename, title, subtitle, credit):
    return f'<div class="photo-text"><div class="photo-copy"><p class="eyeline">{esc(title)}</p><p class="photo-note">{esc(subtitle)}</p></div><img class="photo" src="assets/images/{filename}" alt="{esc(title)}" /></div>', credit


titles = [
 'Why is a wind-turbine maker building an AI campus?', 'Meet Galaxy.', 'Follow the electricity.',
 'The person behind the strategy', 'An energy company moves into computing', 'Ulanqab, Inner Mongolia',
 'A reported visit. A testable story.', 'A comparison, not an OpenAI project',
 'Start with what was delivered.', 'What does “IT capacity” mean?', 'Then separate the plan.',
 'Two different milestones', 'Megawatts are only part of the story.',
 'Inside an AI data centre', 'Power in. Heat out.', 'A small pilot inside a larger phase',
 'From alternating to direct current', 'Higher voltage. Lower current.', 'Less conductor heating',
 'One more step before the chips', 'The energy-company connection', 'Coordinating the power system',
 'Rated power is not constant output.', 'Wind varies. The load needs continuity.', 'Storage shifts energy in time.',
 'How long can storage bridge the gap?', 'Renewable share is not hourly reliability.',
 'What is actually running?', 'Delivered capacity ≠ measured load', 'Buildings do not prove chip inventory.',
 'The larger plans need a clear boundary.', 'Questions for Zhang and the engineers',
 'The next test is useful computing.', 'Reporting and evidence', 'Images and map', 'Production and access limits'
]


def scene(number):
    credit = 'Original explanatory graphic • research checked 7 Nov 2026'
    if number == 1:
        return photo('wind.jpg', 'ENERGY → COMPUTING', 'Galaxy • Envision • Inner Mongolia', 'Photo: Tianwangxing / CC BY-SA 3.0 • Ulanqab region, 2012 • cropped; not Galaxy wind farms')
    if number in [2, 3]: return energy(), 'Conceptual power path • not an as-built Galaxy layout'
    if number == 4:
        return big_words(['Lei Zhang', 'Founder & CEO, Envision', 'Founded in 2007']), 'Sources: Envision; London School of Economics • no interview is presented'
    if number in [5, 21, 22, 33]: return energy(True, True), 'Conceptual power path • sources: Envision; SemiAnalysis'
    if number == 6:
        root = ET.parse(FILM.parents[1]/'images/maps/ulanqab-locator.svg').getroot()
        ET.register_namespace('', 'http://www.w3.org/2000/svg')
        for parent in root.iter():
            for child in list(parent):
                tag = child.tag.rsplit('}', 1)[-1]
                if child.attrib.get('d') == 'null':
                    parent.remove(child)
                elif tag == 'text':
                    y = float(child.attrib.get('y', 500))
                    if y < 180 or y > 950:
                        parent.remove(child)
                    else:
                        label=''.join(child.itertext())
                        sizes={'Ulanqab':67,'Beijing':63,'Hohhot':55,'≈300 km':60,'≈125 km':44}
                        child.set('font-size', str(sizes.get(label,max(37,float(child.attrib.get('font-size',37))))))
        inner = ''.join(ET.tostring(child, encoding='unicode') for child in root)
        return '<div class="map-panel">'+svg(inner, '0 180 1920 760')+'</div>', 'Straight-line city-reference distances • Natural Earth; GeoNames; Wikipedia • no campus pin'
    if number == 7:
        return big_words(['SemiAnalysis', 'Site visit: September 2026', 'Article: 7 November 2026'], True), 'Public preview only • paid implementation sections were not accessed'
    if number == 8:
        return big_words(['GALAXY → Envision / China', 'STARGATE → OpenAI & partners / US'], True), 'Sources: SemiAnalysis; OpenAI, 21 Jan 2025 • separate projects'
    if number in [9,10,11,12,13,29]:
        return capacity({9:0,10:1,11:2,12:0,13:3,29:3}[number]), 'Source: SemiAnalysis, 7 Nov 2026 • 120 MW reported delivered; 800 MW IT planned'
    if number == 14:
        return photo('h100.png','ACCELERATORS','Memory + networking keep the chips supplied.', 'Illustrative H100: Geekerwan / CC BY 3.0 • not confirmed Galaxy equipment • fitted; watermark retained')
    if number == 15:
        return photo('racks.jpg','RACKS + COOLING','Electricity becomes computation and heat.', 'Illustrative racks: Carl Lender / CC BY 2.0 • not Galaxy equipment • fitted')
    if number == 16:
        return big_words(['5 MW pilot', 'Inside the reported 120 MW phase'], True), 'Sources: SemiAnalysis; Envision, 2 Nov 2026 • pilot is a subset, not extra capacity'
    if number == 17: return conversion(), 'Reported Galaxy pilot • sources: SemiAnalysis; Envision, 2 Nov 2026'
    if number in [18,19]: return current(number==19), 'Ideal DC example • fixed power and conductor resistance • not a total-site efficiency claim'
    if number == 20: return conversion(True), 'General power-conversion explanation • sources: NVIDIA; SemiAnalysis'
    if number in [23,24,25,26]:
        return wind(number>=25, number==26), 'Illustrative wind and load curves • no Galaxy operating data is plotted'
    if number == 27:
        return big_words(['Annual renewable share', '≠', 'Power available every hour'], True), 'Hourly supply needs balancing • Galaxy’s measured energy mix remains unverified'
    if number == 28:
        return big_words(['Installed hardware?', 'Actual electrical load?', 'Useful computing output?'], True), 'Open reporting questions • delivered capacity does not answer them'
    if number == 30:
        return photo('h100.png','WHAT CHIPS?','The inventory and workload remain unverified.', 'Illustrative H100: Geekerwan / CC BY 3.0 • not confirmed Galaxy equipment • fitted; watermark retained')
    if number == 31:
        return big_words(['800 MW IT → SemiAnalysis campus plan', '3 GW → Envision announcement', 'Scope remains unresolved'], True), 'Sources: SemiAnalysis, 7 Nov; Envision, 2 Nov 2026 • neither is operating capacity'
    if number == 32:
        return big_words(['What is running today?', 'How is power balanced each hour?', 'What can measured results show?'], True), 'Questions for Lei Zhang and site engineers • no interview or answer is fabricated'
    if number == 34:
        return '<div class="credits"><p>SemiAnalysis • “We Visited China’s Stargate in Inner Mongolia”</p><p>Everlyn Tan · Jeremie Eliahou Ontiveros · Xiaopeng Laoban · Dylan Patel</p><p>Published 7 Nov 2026 • unauthenticated public preview</p><p>Cross-checks: Envision releases · Epoch AI · NVIDIA · OpenAI · LSE</p></div>', 'Full source links, access dates and claim checks accompany the video in the research folder'
    if number == 35:
        return '<div class="credits"><p>Wind: 天王星 / Wikimedia Commons / CC BY-SA 3.0</p><p>Racks: Carl Lender / Wikimedia Commons / CC BY 2.0</p><p>H100: 极客湾Geekerwan / Wikimedia Commons / CC BY 3.0</p><p>Map: original graphic; Natural Earth public-domain geography</p><p>Photo crops, fitting and motion are identified in the accompanying credits.</p></div>', 'creativecommons.org/licenses/by-sa/3.0 • /by/2.0 • /by/3.0'
    return '<div class="credits"><p>Research, script and explanatory graphics: gian.cool</p><p>AI narration: Gemini TTS • Charon</p><p>Music: “Cylinder Eight” / Chris Zabriskie / CC BY 4.0</p><p>Research checked 7 November 2026</p><p>No on-site recording or interview is presented.</p><p>Capacity, chip inventory and measured efficiency retain the stated limits.</p></div>', 'Music from Cylinders (2014) • chriszabriskie.com • creativecommons.org/licenses/by/4.0/'


css = '''
@font-face{font-family:Film;src:url(fonts/DejaVuSans.ttf);font-weight:400}
@font-face{font-family:Film;src:url(fonts/DejaVuSans-Bold.ttf);font-weight:700}
*{box-sizing:border-box;margin:0;padding:0}
.clip{position:absolute;inset:0;width:1920px;height:1080px}
.scene{background:#f5f3ea}
.eyebrow{position:absolute;left:92px;top:51px;font-size:28px;letter-spacing:3px;color:#585b50}
.date{position:absolute;right:92px;top:51px;font-size:28px;color:#585b50}
h1{position:absolute;top:120px;left:92px;right:92px;font-size:64px;line-height:1.16;letter-spacing:-2px;font-weight:700}
.content{position:absolute;left:100px;right:100px;top:285px;height:500px}
.source{position:absolute;left:100px;right:100px;top:815px;height:64px;font-size:28px;line-height:1.23;color:#51564c}
svg{display:block;width:100%;height:100%;overflow:visible;font-family:Film,sans-serif}
.word-stack{height:100%;display:flex;flex-direction:column;justify-content:center;gap:35px}
.reveal{font-size:78px;line-height:1.13;font-weight:700;letter-spacing:-1.4px}
.reveal.smaller{font-size:55px;line-height:1.22}
.reveal:nth-child(2){color:#a64d10}
.photo-text{height:100%;display:grid;grid-template-columns:650px 1fr;gap:70px;align-items:center}
.photo-copy .eyeline{font-size:29px;color:#a64d10;letter-spacing:3px;margin-bottom:35px}
.photo-note{font-size:58px;line-height:1.25;font-weight:700;letter-spacing:-1px}
.photo{width:100%;height:500px;object-fit:contain;background:#e8e6dc}
.map-panel{position:absolute;left:0;top:-70px;width:1720px;height:605px}
.map-panel svg{overflow:hidden}
.credits{height:100%;display:flex;flex-direction:column;justify-content:center;gap:28px}
.credits p{font-size:32px;line-height:1.35}
.caption{position:absolute;inset:auto 150px 65px;width:auto;height:auto;min-height:82px;display:flex;align-items:center;justify-content:center;padding:13px 34px;background:#242a26;color:#fff;font-size:36px;line-height:1.28;text-align:center;z-index:90}
.scene.s01 h1{max-width:1690px;font-size:71px}
.scene.s33 h1{font-size:76px}
'''

sections=[]
animations=[]
captions=[]
for i,shot in enumerate(shots):
    n=i+1
    start,end=starts[i],ends[i]
    length=end-start
    body,credit=scene(n)
    chapter = 'ENERGY / AI' if n<34 else 'SOURCES / CREDITS'
    hold = ' data-hold' if n in [4,7,8,16,27,28,31,32,34,35,36] else ''
    sections.append(f'''<section id="s{n:02}" class="clip scene s{n:02}" data-start="{start:.3f}" data-duration="{length:.3f}" data-track-index="1"{hold}>
      <div class="eyebrow">{chapter}</div><div class="date">7 NOV 2026</div>
      <h1>{esc(titles[i])}</h1><div class="content">{body}</div><p class="source">{esc(credit)}</p>
    </section>''')
    if n not in [1,6,34,35,36]:
        animations.append(f'tl.fromTo("#s{n:02} .content",{{opacity:0}},{{opacity:1,duration:0.35,ease:"power2.out"}},{start+0.02:.3f});')
    if 'rotor' in body:
        animations.append(f'tl.fromTo("#s{n:02} .rotor",{{attr:{{transform:"rotate(0 0 0)"}}}},{{attr:{{transform:"rotate({length*19:.2f} 0 0)"}},duration:{length:.3f},ease:"none"}},{start:.3f});')
    if 'electron' in body:
        animations.append(f'tl.fromTo("#s{n:02} .electron",{{x:0}},{{x:1100,duration:{max(1,length-0.4):.3f},ease:"none"}},{start+0.2:.3f});')
    if 'wind-curve' in body:
        animations.append(f'tl.fromTo("#s{n:02} .wind-curve",{{strokeDasharray:2500,strokeDashoffset:2500}},{{strokeDashoffset:0,duration:{max(1,length-1):.3f},ease:"none"}},{start+0.3:.3f});')
    if 'battery-level' in body:
        charge=max(0.6,(length-0.8)*0.4)
        discharge=max(0.6,(length-0.8)*0.6)
        animations.append(f'tl.fromTo("#s{n:02} .battery-level",{{scaleY:0.3,transformOrigin:"center bottom"}},{{scaleY:0.95,duration:{charge:.3f},ease:"power1.inOut"}},{start+0.3:.3f});')
        animations.append(f'tl.fromTo("#s{n:02} .battery-level",{{scaleY:0.95,transformOrigin:"center bottom"}},{{scaleY:0.2,duration:{discharge:.3f},ease:"power1.inOut",immediateRender:false}},{start+0.3+charge:.3f});')
    if n in [9,11]:
        animations.append(f'tl.fromTo("#s{n:02} .capacity-fill",{{scaleX:0,transformOrigin:"left center"}},{{scaleX:1,duration:1.2,ease:"power3.out"}},{start+0.4:.3f});')
    if n in [1]:
        animations.append(f'tl.fromTo("#s{n:02} .photo",{{scale:1}},{{scale:1.035,duration:{length:.3f},ease:"none"}},{start:.3f});')
    if shot['narration']:
        captions.append(f'<p id="caption-{n:02}" class="clip caption" data-start="{start:.3f}" data-duration="{length:.3f}" data-track-index="1" data-layout-allow-caption-zone>{esc(shot["narration"])}</p>')

audio = ''
if (FILM/'audio/narration.wav').exists():
    audio_duration=times['audio_duration_seconds'] if times else 198
    audio=f'<audio id="narration" class="clip" src="audio/narration.wav" data-start="0" data-duration="{audio_duration:.3f}" data-track-index="2" data-volume="1"></audio>'
if (FILM/'audio/music.wav').exists():
    audio+=f'<audio id="music" class="clip" src="audio/music.wav" data-start="0" data-duration="{duration:.3f}" data-track-index="3" data-volume="0.16"></audio>'

(FILM/'compositions').mkdir(exist_ok=True)
(FILM/'assets/film.css').write_text(css)
chapters=[('opening',1,3),('builder',4,8),('capacity',9,13),('engineering',14,20),('energy',21,27),('questions',28,32),('ending',33,36)]
hosts=[]
for name,first,last in chapters:
    base=starts[first-1]
    length=ends[last-1]-base
    local=[]
    local_tweens=[]
    for n in range(first,last+1):
        section=sections[n-1]
        section=re.sub(r'data-start="[\d.]+"',f'data-start="{starts[n-1]-base:.3f}"',section,count=1)
        local.append(section)
        for tween in animations:
            if f'#s{n:02} ' in tween:
                local_tweens.append(re.sub(r',([\d.]+)\);$',lambda m:f',{float(m[1])-base:.3f});',tween))
    scene_doc=f'''<template><link rel="stylesheet" href="assets/film.css"><style>#{name}{{position:absolute;inset:0;font-family:Film,sans-serif;color:#242a26}}</style>
<div id="{name}" data-composition-id="{name}" data-width="1920" data-height="1080">{''.join(local)}</div>
<script>const tl=gsap.timeline({{paused:true}});{''.join(local_tweens)}tl.set({{}},{{}},{length:.3f});window.__timelines=window.__timelines||{{}};window.__timelines['{name}']=tl;</script></template>'''
    (FILM/f'compositions/{name}.html').write_text(scene_doc)
    hosts.append(f'<div id="{name}" class="clip" data-composition-id="{name}" data-composition-src="compositions/{name}.html" data-start="{base:.3f}" data-duration="{length:.3f}" data-width="1920" data-height="1080" data-track-index="1" data-track-kind="graphics"></div>')
caption_duration=starts[33]
if times:
    captions=[f'<p id="caption-{i+1:03}" class="clip caption" data-start="{c["start"]:.3f}" data-duration="{c["end"]-c["start"]:.3f}" data-track-index="1" data-layout-allow-caption-zone>{esc(c["text"])}</p>' for i,c in enumerate(times['captions'])]
(FILM/'compositions/captions.html').write_text(f'''<template><link rel="stylesheet" href="assets/film.css"><style>#captions{{position:absolute;inset:0;font-family:Film,sans-serif;pointer-events:none}}</style><div id="captions" data-composition-id="captions" data-width="1920" data-height="1080">{''.join(captions)}</div><script>const tl=gsap.timeline({{paused:true}});tl.set({{}},{{}},{caption_duration:.3f});window.__timelines=window.__timelines||{{}};window.__timelines.captions=tl;</script></template>''')
hosts.append(f'<div id="captions" class="clip" data-composition-id="captions" data-composition-src="compositions/captions.html" data-start="0" data-duration="{caption_duration:.3f}" data-width="1920" data-height="1080" data-track-index="90" data-track-kind="captions" style="z-index:90"></div>')
document=f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1920, height=1080">
<title>{esc(STORY['title'])}</title><script src="assets/vendor/gsap.min.js"></script><style>@font-face{{font-family:Film;src:url(assets/fonts/DejaVuSans.ttf);font-weight:400}}@font-face{{font-family:Film;src:url(assets/fonts/DejaVuSans-Bold.ttf);font-weight:700}}html,body{{margin:0;width:1920px;height:1080px;overflow:hidden;background:#f5f3ea}}#root{{position:relative;width:1920px;height:1080px;overflow:hidden}}.clip{{position:absolute;inset:0}}</style></head>
<body><div id="root" data-composition-id="galaxy" data-start="0" data-duration="{duration:.3f}" data-width="1920" data-height="1080" data-fps="30">
{''.join(hosts)}{audio}</div>
<script>const tl=gsap.timeline({{paused:true}});
tl.set({{}},{{}}, {duration:.3f});window.__timelines=window.__timelines||{{}};window.__timelines.galaxy=tl;</script></body></html>'''
(FILM/'index.html').write_text(document)
assert all(ends[i]>starts[i] for i in range(len(starts)))
print(f'Built {len(shots)} shots, {duration:.3f} seconds, audio={bool(audio)}')
