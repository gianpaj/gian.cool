# Era 2: photo-telegraphy and wirephoto (1900–1940)

The photocell changed the job. Machines now measured **how bright** each spot was instead of whether it conducted, so the signal became **continuously variable**: analog. That made photographs possible and made noise visible. Newspapers paid for it, and police found an early use.

## Arthur Korn and the Bildtelegraph (1902–1928)

- German physicist and mathematician. Used a **selenium cell** to read a photo on a rotating glass cylinder, lit by a Nernst lamp.
- 1904: a photo from Berlin to Nuremberg in 42 minutes. By 1907, newspapers in Germany, France and England printed photos his system sent in 12 minutes (Coopersmith, ETHW).
- 17 Oct 1906: sent a photo of Crown Prince Wilhelm 1,800 km.
- 1907–08: the system helped police (a thief from a Stuttgart bank caught in London in 1907; a wanted-person photo Paris→London in 1908). L'Illustration bought French rights until 1909.
- 1923: a radio picture of Pope Pius XI from Rome to Bar Harbor, Maine, printed the same day in the New York World, hailed as a "miracle of modern science". News photos normally crossed the Atlantic by ship.
- From 1928 German police used it for photos and fingerprints.
- Korn was of Jewish descent; dismissed in 1935, he emigrated to the US in 1939 and taught at Stevens Institute of Technology.

## Édouard Belin and the Bélinographe (1907–1950s)

- French photographer and engineer. The 1907 "télestéréographe" scanned point by point with an electric eye. At the receiver, a light of matching intensity exposed photographic paper on the same path.
- From 1913 it used a photocell over **ordinary telephone lines**; from 1914 it carried news photos (one test photo took about 4 minutes); by 1921 it worked by radio.
- "Belino" became the European word for a wired news photo. Belinographs were still built in the 1950s (BEP-2V, 1953).
- After WWII Frederick Milton sketched Paris runway shows and sent the sketches by Bélinographe so subscribers could copy the designs. In 1955 Lanvin, Dior, Patou and Jacques Fath sued him for piracy. An early fight over how fast copying should be allowed.

## The Bartlane system (1920): the first digital picture network

- Harry G. Bartholomew and Maynard D. McFarlane (Daily Mirror / Bartlane) sent newspaper photos over the **transatlantic telegraph cable** between London and New York.
- The photo was split into a grid and each cell was **quantised to one of 5 grey levels** (15 from 1929), punched as telegraph tape, sent as telegraph code, then printed at the far end with special typefaces.
- First transatlantic picture in 1921; under **3 hours** per picture instead of about a week by ship.
- Story angle: sampling plus quantisation plus a code alphabet. That is digital imaging in 1920, built from telegraph parts. Use `1926-how-photos-are-cabled-bartlane.png`.

## AT&T, Ives and Nyquist (1924–1930)

- 19 May 1924: AT&T sent 15 photos over telephone lines from Cleveland to New York, good enough for newspapers. Commercial service from 1925.
- Herbert E. Ives led the work. He also sent the **first color fax** in 1924: Rudolph Valentino in costume, sent as three red, green and blue separations.
- Harry Nyquist found that photos are far less forgiving than speech. A small change in line loss only sounds a bit quieter, but it shows up as bands of wrong shading. Delay that varies with frequency blurs edges. His fixes: nonlinear brightness-to-current mapping and phase equalisation.
- The same work fed Nyquist's 1924 and 1928 papers on how fast symbols can cross a channel (2B per second in bandwidth B). Claude Shannon built on them in 1948. **Fax engineering helped seed information theory.**

## Wirephoto goes mainstream (1921–1936)

- Western Union sent its first photo in 1921. Marvin Ferree's "Telepix" made the first coast-to-coast transmission on 1 Jan 1925. RCA Radiophoto started in 1926.
- 1929: Vladimir Zworykin's improved system sent a page in about a minute.
- 1935: **AP Wirephoto** launched on leased lines. Its first drawing was Noel Sickles's sketch of the USS Macon crash (12 Feb 1935); staff hesitated because "it was not a photo". The same day, the New York Times' Wide World service used a prototype to send survivor photos over regular phone lines.
- 1936: International News Photos fielded a portable unit that needed only a long-distance phone line.

## Crowded but unprofitable

- By 1928 at least 19 picture-telegraph systems were in development, 4 of them commercial; about 100 machines existed in 1933. Coopersmith dates the first *profitable* fax business to AP Wirephoto in 1935, nearly a century after Bain.

## Japan: Yasujiro Niwa's NE-type (1928)

- In the mid-1920s the Mainichi newspaper group looked at US and German systems; Nippon Electric (NEC) then built a domestic one. Coopersmith calls this "exemplif[ying] the Japanese approach to modernization".
- NEC engineer Yasujiro Niwa (with Kobayashi) built the NE-type phototelegraph, completed in May 1928. The Tokyo Nichi Nichi Shimbun tested foreign machines, including an imported Belin system that performed poorly, and chose NEC's. In November 1928 it carried photos of Emperor Hirohito's enthronement from Kyoto to Tokyo. A public Tokyo–Osaka photo service followed in 1930.
- The originals are in the National Museum of Nature and Science, Tokyo. The Institute of Electrical Engineers of Japan (IEEJ) honoured the system in 2012. **There is no IEEE milestone for it**; the IEEE fax milestone is for the 1980 Group 3 standard (Era 4).
- Niwa became the first president of Tokyo Denki University and was named one of Japan's "Ten Great Inventors" in 1985. Japan's early role foreshadows its dominance of the 1980s fax industry.

## Images (`../images/02-photo-telegraphy-1900-1940/`)

`1902-arthur-korn-at-his-apparatus.gif`, `1907-belin-with-telestereograph.jpg`, `1907-belin-apparatus-bnf.jpg`, `1914-belinograph-transmitted-photo.png`, `1926-how-photos-are-cabled-bartlane.png`, `1928-ne-type-phototelegraph-*.jpg`, `1930-belin-device-touring-club.jpg`, `1935-ap-wirephoto-uss-macon-sketch.png`, `1936-belinograph-brn-belgrade.jpg`, `1940-siemens-bildtelegraph-berlin.jpg`, `1953-belinograph-bep-2v.jpg`, `belinograph-cnam-paris.jpg`, `1910-bernocchi-wireless-iconograph.jpg` (atmosphere only).

From `../images/web/`: `1908-korn-us888098-automatic-phototelegraph.png` (Korn's US patent circuit sheet).

To fetch by hand (public domain, but the sites block scripts): Library of Congress 2014680157 "Belin telephoto apparatus"; LoC 93511142 "First radio photograph", Jenkins, c. 1922.

## Sources

`../sources/wikipedia/`: `arthur-korn.md`, `édouard-belin.md`, `wirephoto.md`, `bartlane-system.md`, `herbert-e-ives.md`, `harry-nyquist.md`, `yasujiro-niwa.md`. Web: Coopersmith (ETHW); IEEJ 2012 commemoration (Yamada); NEC corporate blog (2022). Primary: Bidwell, "Telegraphic Photography and Electric Vision", Nature, 4 June 1908. Public-domain book: Marcus J. Martin, *The Electrical Transmission of Photographs* (1921), on Internet Archive (`electricaltransm00martrich`).
