# Hooks and visual pairings

Raw material for the script, not a script. Each hook is a surprising, sourced fact with the assets that show it. Paths are relative to `research/fax-history/`.

## Hooks

1. **Fax is older than the telephone.** Caselli's Paris–Lyon service ran in 1865; Bell's telephone came in 1876. → `images/01-origins-1840-1900/1862-pantelegram-paris-lyon.jpg`, `images/01-origins-1840-1900/pantelegraph-replica-milan.jpg`
2. **The first fax was invented by a clockmaker**, because the hard part was keeping two machines in step. → `images/01-origins-1840-1900/1843-1850-bain-improved-facsimile-patent.png`, `images/01-origins-1840-1900/caselli-pantelegraph-full-drawing.png` (the 2 m pendulum)
3. **A composer's signature was one of the first long-distance faxes.** Rossini's, Paris–Amiens, 1860; he wrote a piano piece about it. → pantelegraph samples
4. **The first fax customers were banks**, verifying signatures. → `images/01-origins-1840-1900/1861-caselli-pantelegraph-sample.jpg`
5. **Digital came first, and failed.** Gray's 1888 telautograph sent pen movements as pulses; the machinery couldn't keep up and analog won for 80 years. → `images/01-origins-1840-1900/1888-gray-telautograph-patent.png`, `images/01-origins-1840-1900/1893-telautograph-sample-output.jpg`
6. **Police were early adopters.** Korn's phototelegraph helped catch a thief who fled from Stuttgart to London (1907). → `images/02-photo-telegraphy-1900-1940/1902-arthur-korn-at-his-apparatus.gif`, `images/people/arthur-korn.jpg`
7. **Digital photos crossed the Atlantic in 1920**, as 5 grey levels punched into telegraph tape (Bartlane). → `images/02-photo-telegraphy-1900-1940/1926-how-photos-are-cabled-bartlane.png`
8. **Fax research helped found information theory.** Nyquist fixed photo distortion at AT&T and wrote the 1924/1928 papers Shannon built on. → `images/05-digital-signals/nyquist-sampling-animation.gif`
9. **1930s families got a newspaper printed by their radio overnight**, and mostly ignored it. → `images/03-radio-fax-1920-1970/1938-wor-radio-newspaper-children.jpg`, `images/03-radio-fax-1920-1970/1938-wor-radio-newspaper-receiver.jpg`, `images/03-radio-fax-1920-1970/1945-wghf-finch-facsimile-ad.jpg`
10. **The Iwo Jima photo reached US papers within a day** by radio fax from Guam. (No free image downloaded yet; the photo itself is US government / public domain.)
11. **The first close-up photos from the Moon's surface were decoded with a newspaper fax machine** (Luna 9, 1966).
12. **Fax only took off after the phone company lost control of what you could plug in** (Carterfone, 1968). → `images/04-office-fax-1960-2000/1959-carterfone.png`, `images/04-office-fax-1960-2000/acoustic-coupler.jpg`
13. **A blank line of a faxed page compresses about 60 to 1**: 1,728 white pixels become 29 bits including the end-of-line code. (Then the machine pads it back out so the printer can keep up.) → animate from `technology/03-compression.md`
14. **The fax screech is a conversation**: "I'm a fax", "me too", "here's what I can do", "let's test the line", then the page as hiss. → `audio/fax-answering-tones.ogg` + `images/05-digital-signals/modem-handshake-spectrogram-annotated.png`
15. **Today's faxes often travel as digital-pretending-to-be-analog-pretending-to-be-digital** (T.38). → `images/05-digital-signals/t38-fax-over-ip-gateway.png`, `images/06-21st-century/voip-adapter-with-fax.jpg`
16. **Ships still receive weather maps by radio fax**, the same way as in the 1950s. → `images/03-radio-fax-1920-1970/2024-radiofax-weather-chart-northwood.png`, `audio/radiofax-signal.ogg`
17. **COVID numbers were lost in fax machines** in Japan, Germany and the US (2020). → `images/06-21st-century/japan-convenience-store-fax-copier-2012.jpg`

18. **For a century, a fax cost about 100 times more than a letter** (Coopersmith). The first *profitable* fax business came in 1935, 92 years after Bain's patent. → `notes/05-office-fax-1960-2000.md`
19. **Gone with the Wind in two minutes** (RCA Ultrafax, 1948), a demo that never became a service. → `notes/04-radio-fax-1920-1970.md`
20. **The first transatlantic radio photo was of President Coolidge** (1924). → `images/web/1924-ranger-photoradiogram-coolidge.jpg`, `images/web/1925-radio-news-photoradiogram-system-page.jpg`
21. **Japan faxed maps because its street addresses aren't in order**, which, with kanji and hanko seals, helped make it the world's fax nation. 59% of homes still had a fax in 2012. → `images/04-office-fax-1960-2000/ntt-minifax-mf1.jpg`, `images/06-21st-century/japan-convenience-store-fax-copier-2012.jpg`
22. **Japan gave away its compression patents** at the 1980 standards meeting so everyone would adopt them, and it won the market. → `images/web/1979-dacom-us4135214-facsimile-data-compression.png` for the run-length idea
23. **Fax beat the censors**: students faxed news into China after Tiananmen (1989), and the first word of the 1991 Soviet coup reached Washington by fax ("It is Military Coup. Tanks are everywhere."). → `notes/05-office-fax-1960-2000.md`
24. **Japan tried to abolish fax in government in 2021 and lost**: more than 400 objections from ministries. → `notes/06-internet-and-today.md`

## Audio cues

| Moment | File |
|---|---|
| Fax handshake | `audio/fax-answering-tones.ogg` (decoded second by second in `audio/CREDITS.md`), `audio/fax-laser-fax-machine-sounds.ogg`, `audio/2016-ansam-2100hz-answer-tone.wav` |
| Dial-up comparison | `audio/2005-v34-dialup-modem-21600-handshake.wav` (CC BY-SA; `audio/dial-up-modem-handshake.ogg` has unclear provenance) |
| Radio fax / weatherfax | `audio/radiofax-signal.ogg` |
| Hellschreiber | `audio/hellschreiber-signal.ogg` |
| Slow-scan TV | `audio/sstv-sunset.ogg` |

## Animation ideas that need no archive footage

- A drum scanner: page on a cylinder, light spot, photocell, rising and falling tone (analog), then the same page as a grid of 0s and 1s (digital).
- Run-length + Huffman: one scan line turning into runs, then into the bit codes from `technology/03-compression.md`.
- Noise test: the same noise added to an analog tone (picture gets streaky) and to a digital signal (decoded perfectly until the threshold).
- Sync failure: two drums drifting apart and the received image shearing, as Bain's and Bakewell's would have.
