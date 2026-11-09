"""Fill the custom explanatory scenes with measured narration anchors."""
import json


def build_sequence(name, film, starts, ends, local_sections, local_tweens):
    files = {'capacity': 'capacity', 'engineering': 'power', 'energy': 'energy'}
    if name not in files:
        return None
    first, last = {'capacity': (9, 13), 'engineering': (14, 20), 'energy': (21, 27)}[name]
    base = starts[first - 1]
    duration = ends[last - 1] - base
    document = (film / 'sequences' / (files[name] + '.html')).read_text()
    replacements = {
        '__MARKS__': json.dumps([round(starts[n - 1] - base, 3) for n in range(first, last + 1)]),
        '__DURATION__': f'{duration:.3f}',
    }
    if name == 'engineering':
        replacements.update({
            '__INTRO__': ''.join(local_sections[:3]),
            '__INTRO_TWEENS__': ''.join(t for t in local_tweens if any(f'#s{n:02} ' in t for n in [14, 15, 16])),
            '__POWER_START__': f'{starts[16] - base:.3f}',
            '__POWER_DURATION__': f'{ends[19] - starts[16]:.3f}',
        })
    if name == 'energy':
        replacements.update({
            '__BALANCE_END__': f'{starts[26] - base:.3f}',
            '__ENDING__': local_sections[-1],
            '__ENDING_TWEENS__': ''.join(t for t in local_tweens if '#s27 ' in t),
        })
    if name == 'capacity':
        homes = []
        for index in range(12):
            x = 890 + (index % 6) * 110
            y = 15 + (index // 6) * 100
            homes.append(f'<path class="scale-home" d="M{x} {y+40} l35 -30 l35 30 m-60 -8 v55 h50 v-55 m-32 55 v-30 h15 v30" fill="none" stroke="#242a26" stroke-width="5"/>')
        stadiums = []
        for index in range(67):
            x = 880 + (index % 10) * 68
            y = 25 + (index // 10) * 31
            stadiums.append(f'<ellipse class="stadium-dot" cx="{x}" cy="{y}" rx="24" ry="10" fill="none" stroke="#242a26" stroke-width="4"/>')
        centres = []
        for index in range(8):
            x = 920 + (index % 4) * 150
            y = 10 + (index // 4) * 125
            centres.append(f'<g class="ai-centre"><rect class="device" x="{x}" y="{y}" width="110" height="70"/><path d="M{x+18} {y+25} h74 m-74 20 h74 m-74 20 h74" stroke="#242a26" stroke-width="5"/><text x="{x+55}" y="{y+96}" text-anchor="middle" font-size="28">100 MW</text></g>')
        replacements.update({'__HOMES__': ''.join(homes), '__STADIUMS__': ''.join(stadiums), '__CENTRES__': ''.join(centres)})
    for placeholder, value in replacements.items():
        document = document.replace(placeholder, value)
    return document
