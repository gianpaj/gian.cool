# Fax history research

Research for an educational video on the history of telecommunications, told through the fax machine and the shift from analog to digital signals. Text, images and audio, with sources and licences.

## The story in one minute

1. **1843–1870: copying telegraphs.** A Scottish clockmaker (Bain) patents a machine that scans a message with a pendulum. A priest-physicist (Caselli) runs a commercial fax service between Paris and Lyon from 1865, eleven years before the telephone. The hard problem is keeping two machines in step.
2. **1888: digital too early.** Gray's telautograph sends handwriting as pulses, but the machinery can't keep up, so it goes analog.
3. **1900–1940: photos by wire.** Photocells (Bidwell, Korn, Belin) turn brightness into a continuously varying current. Newspapers and police adopt it. Bartlane (1920) sends photos across the Atlantic digitally as 5 grey levels on telegraph tape. Nyquist's picture-transmission work at AT&T feeds the theory Shannon later builds on.
4. **1920–1970: fax by radio.** Transatlantic photo-radiograms, radio newspapers printed in living rooms (a flop), war photos, Hellschreiber, and weather maps for ships that are still broadcast today.
5. **1964–2000: the office boom.** For a century a fax cost about 100 times more than a letter. Then came Xerox, the Carterfone ruling (1968), Japan's demand (kanji, unnumbered streets, hanko seals) and its manufacturers, and the CCITT standards. Group 3 (1980) goes digital with Huffman compression, helped by Japan giving away its patents, and a page takes seconds instead of minutes. US machines grow from 25,000 (1970) to 5 million (1990). Fax carries news past censors in 1989 and 1991.
6. **1995–today: digital inside digital.** Email replaces fax for most people; US sales peak in 1997. Fax survives in hospitals (67% of US hospitals in 2023), law, Japan (a 2021 attempt to abolish it in government failed) and on ships, often carried as IP packets (T.38).

## Folders

| Folder | Contents |
|---|---|
| `notes/` | Era-by-era history: `01-timeline.md` (master timeline), `02`–`06` (one file per era), `07-people.md`. |
| `technology/` | Explainers for the digital-signals angle: how a fax works, analog vs digital, compression with worked examples, the handshake decoded. |
| `images/` | 123 images. 110 from Wikimedia Commons in era folders (`01-origins-1840-1900` … `06-21st-century`), `people/` and `05-digital-signals/` (diagrams). `web/` holds 13 public-domain finds from elsewhere: US patent drawings (Bain, Korn, Ranger, Finch, Western Union, Xerox, Dacom) and *Radio News* 1925 scans, with their own `CREDITS.md`. |
| `audio/` | 9 recordings: fax handshake (decoded second by second in `audio/CREDITS.md`), 2,100 Hz answer tone, laser-fax machine, radiofax, Hellschreiber, SSTV and three modem handshakes. |
| `sources/` | `sources.md` (index and bibliography), `wikipedia/` (51 articles saved as plain text with revision IDs), `web-research.md` (Coopersmith's *Faxed*, IEEE milestone and oral histories, museum objects, period engineering papers, 1989–91 press, ITU-T standards, sales figures). |
| `video/` | `hooks-and-visuals.md` (surprising facts paired with assets), `fact-check.md` (conflicting dates and unverified claims). |
| `scripts/` | The Python scripts and `manifest.tsv` that fetched the articles and media. Run with `python3 -I`; see each script's docstring. |
| `CREDITS.md`, `credits.json` | Author, date, licence and source link for every Commons/Wikipedia media file. Non-Commons media are credited in `images/web/CREDITS.md` and `audio/CREDITS.md`. |

## Numbers worth having

- Pantelegraph, 1860s: 25 handwritten words in 108 s. About 5,000 faxes in its first year.
- Group 1 (analog, 1968): 6 min/page. Group 2 (analog, 1976): 3 min. Group 3 (digital, 1980): about 1 min at first, about 20 s by the early 1980s, under 10 s later.
- A Group 3 page is 1,728 × ~1,145 one-bit pixels ≈ 2 million bits. Modified Huffman compresses a typical letter roughly 10–20× (sources differ). A blank line codes to 29 bits instead of 1,728.
- US fax machines: 25,000 (1970), 250,000 (1980), 5 million (1990). US stand-alone sales peaked at 3.6 million in 1997.
- A phone line tops out near 33.6 kbit/s for fax (V.34), close to Shannon's limit for a 3 kHz voice channel.

## Using the material

- **Licences.** Wikipedia text is CC BY-SA 4.0. Of the 116 Commons files, 66 are public domain or CC0 and 50 are CC BY or CC BY-SA, which need attribution in the video. All 13 files in `images/web/` are public domain. Recheck each source page before publishing. A few more public-domain photos (Library of Congress, NOAA, Smithsonian) must be downloaded by hand; see `images/web/CREDITS.md`.
- **Accuracy.** Sources disagree on several dates and firsts (Caselli's service start, the Coolidge photo's direction, the first digital fax). Check `video/fact-check.md` before scripting.
- This folder is untracked in the `gian.cool` repo and takes about 70 MB.
