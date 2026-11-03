# Era 5: the internet, decline and stubborn survival (1995–today)

Email and the web replaced fax for most people within about a decade. Fax never vanished: it survives where signatures, regulation, habit or incompatible systems keep it alive. Its protocol, built for analog phone lines, now rides inside digital networks it was never designed for.

## Fax over a network that isn't a phone line

- **Email-to-fax and fax-to-email** (mid-1990s on): a gateway answers the phone call, turns the page into TIFF or PDF, and emails it, or the reverse. Early services included "The Phone Company" and "Digital Chicken"; open-source PBXs (Asterisk, ICTFax) later made it trivial.
- **T.37** (store-and-forward): a fax image sent as an email attachment (TIFF-F).
- **T.38** (1998), real-time fax over IP. Squeezing fax through VoIP fails because voice codecs compress for human ears and VoIP networks drop and delay packets. Modem tones don't survive either. T.38 gateways demodulate the fax back into bits, send those as packets with redundant copies to survive loss, and "spoof" timing so each fax machine thinks it's talking to the other directly.
- The irony in numbers: the phone network samples a fax call 8,000 times a second at 8 bits (64 kbit/s each way) to carry a modem signal that holds at most 33.6 kbit/s. T.38 sends just those bits and cuts bandwidth by about 10×.
- A modern "fax" is often digital page → analog modem tones → digital PCM samples → IP packets → PCM → tones → digital page. That's analog emulated on top of digital, carrying digital data.

## Decline

- Fax servers replaced desktop machines in big offices: fewer phone lines, no junk-fax paper, faxes arriving as email.
- US stand-alone fax sales peaked at 3.6 million in 1997 and fell to about 1.5 million by 2004. Japan's peaked in 2000. PCs worldwide grew from 130 million (1991) to 775 million (2004). By 2000 email had made fax "obsolescent, though not obsolete" (Coopersmith). "Email just changed everything."
- PC fax/modems faded by about 2000 as broadband and email took over; phones now "fax" through camera-scan apps and online services.
- Coopersmith's explanation for the long tail: fax is a network technology, "the more people who use it, the more valuable it becomes", so it keeps value as long as the other side still has one.

## Where fax hangs on

- **UK healthcare.** The NHS was called the world's biggest buyer of fax machines in 2017. Counts in 2018 range from 8,946 (Royal College of Surgeons FOI, 86 of 124 trusts) to 11,620 (Labour). On 9 Dec 2018 the Health Secretary banned new purchases from January 2019 and set 31 March 2020 for removal: "Email is much more secure and miles more effective than fax machines." Progress was uneven: the heaviest users cut only 42% in a year, though Epsom & St Helier went from 212 to 3. By 2025–26 most trust FOI replies report zero.
- **US healthcare.** In 2018 the head of CMS challenged developers to make doctors' offices "fax free" by 2020. Federal data: 71% of hospitals used fax in 2018 and **67% in 2023**; "often" users fell from 40% to 30%. Fear of breaching HIPAA by email is one reason. In 2018 two-thirds of Canadian doctors mainly used fax.
- **Law and signatures.** In some countries a faxed signature is legally accepted where an electronic one isn't.
- **Japan.** 59% of households had a fax in 2012 (Cabinet Office), against about 3% of US homes at their early-1990s peak. In April 2021 reform minister Taro Kono ordered ministries to drop fax by June, calling it a "hindrance" to telework. More than 400 objections came back (courts and police cited confidential uses) and the plan was dropped. Kono declared victory over floppy disks in 2024, but not over fax. Over 81% of convenience stores offer fax, and COVID-19 case reports sent by fax caused errors and delays.
- **Germany, 2020.** Some Berlin districts reported zero COVID cases for seven straight days because their health office only had fax.
- **Ships at sea.** Radiofax weather charts are still broadcast daily (see Era 3).

## Junk fax, round two

- Large "fax broadcasters" in the late 1990s claimed millions of fax ads a day. In 2004 the FCC fined Fax.com $5,379,000 (489 violations at $11,000 each), its first action against a fax broadcaster.
- The US Junk Fax Prevention Act (2005) allowed fax ads to existing business contacts with an opt-out notice. The FCC rules took effect in August 2006. Recipients can sue for $500 per fax, tripled if the violation is wilful.

## Images (`../images/06-21st-century/`)

`voip-adapter-with-fax.jpg`, `japan-convenience-store-fax-copier-2012.jpg`, `sharp-ux-d63cl-home-fax.jpg`, `2006-congressional-fax-message.jpg` (a real fax printout, public domain), `2009-receiving-a-fax.jpg`, `1997-guy-bleus-fax-art.jpg`. Diagram: `../images/05-digital-signals/t38-fax-over-ip-gateway.png`.

## Sources

`../sources/wikipedia/`: `fax.md`, `t-38.md`, `internet-fax.md`, `fax-server.md`, `junk-fax.md`, `junk-fax-prevention-act-of-2005.md`, `dial-up-internet-access.md`. Web (`../sources/web-research.md` §1, §5): gov.uk press release (9 Dec 2018); RCS and trust FOIs; ONC data via TechTarget (2025); FCC Fax.com order (2004); Japanese press via Malaysia Now and Equisys (2021); Coopersmith (ETHW, PopSci, TAMU); Washington Post via Marginal Revolution (2012).
