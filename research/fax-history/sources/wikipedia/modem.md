# Modem

Source: https://en.wikipedia.org/wiki/Modem
Revision: 1378923663 (2026-10-06T23:16:20Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

A modulator-demodulator, commonly referred to as a modem, is a computer hardware device that converts data from a digital format into a format suitable for an analog transmission medium such as telephone or radio. A modem transmits data by modulating one or more carrier wave signals to encode digital information, while the receiver demodulates the signal to recreate the original digital information. The goal is to produce a signal that can be transmitted easily and decoded reliably. Modems can be used with almost any means of transmitting analog signals, from LEDs to radio.
Early modems were devices that used audible sounds suitable for transmission over traditional telephone systems and leased lines. These generally provided Asynchronous communications at 110 or 300 bits per second (bit/s), and the connection between devices was normally manual, using an attached analogue telephone handset. By the 1970s, higher speeds of 1,200 and 2,400 bit/s for asynchronous dial connections, 4,800 bit/s for synchronous leased line connections and 35 kbit/s for synchronous conditioned leased lines were available. By the 1980s, less expensive 1,200 and 2,400 bit/s dialup modems were being released, and modems working on radio and other systems were available. As device sophistication grew rapidly in the late 1990s, telephone-based modems quickly exhausted the available bandwidth, reaching 56 kbit/s.
The rise of public use of the internet during the late 1990s led to demands for much higher performance, leading to the move away from audio-based systems to entirely new encodings on cable television lines and short-range signals in subcarriers on telephone lines. The move to cellular telephones, especially in the late 1990s and the emergence of smartphones in the 2000s led to the development of ever-faster radio-based systems. Today, modems are ubiquitous and largely invisible, included in almost every mobile computing device in one form or another, and generally capable of speeds on the order of tens or hundreds of megabytes per second.


== Speeds ==
Modems are frequently classified by the maximum amount of data they can send in a given unit of time, usually expressed in bits per second (symbol bit/s, sometimes abbreviated "bps") or rarely in bytes per second (symbol B/s). Modern broadband modem speeds are typically expressed in megabits per second (Mbit/s).
Historically, modems were often classified by their symbol rate, measured in baud. The baud unit denotes symbols per second, or the number of times per second the modem sends a new signal. For example, the ITU-T V.21 standard used audio frequency-shift keying with two possible frequencies, corresponding to two distinct symbols (or one bit per symbol), to carry 300 bits per second using 300 baud. By contrast, the original ITU-T V.22 standard, which could transmit and receive four distinct symbols (two bits per symbol), transmitted 1,200 bits by sending 600 symbols per second (600 baud) using phase-shift keying.
Many modems are variable-rate, permitting them to be used over a medium with less than ideal characteristics, such as a telephone line that is of poor quality or is too long. This capability is often adaptive so that a modem can discover the maximum practical transmission rate during the connect phase, or during operation.


== Overall history ==
Modems grew out of the need to connect teleprinters over ordinary phone lines instead of the more expensive leased lines which had previously been used for current loop–based teleprinters and automated telegraphs. The earliest devices which satisfy the definition of a modem may have been the multiplexers used by news wire services in the 1920s.
In 1941, the Allies developed a voice encryption system called SIGSALY which used a vocoder to digitize speech, then encrypted the speech with one-time pad and encoded the digital data as tones using frequency shift keying (FSK). This was also a digital modulation technique, making this an early modem.
Commercial modems largely did not become available until the late 1950s, when the rapid development of computer technology created demand for a method of connecting computers together over long distances, resulting in the AT&T Corporation and then other businesses producing an increasing number of computer modems for use over both switched and leased telephone lines.
Later developments would produce modems that operated over cable television lines, power lines, and various radio technologies, as well as modems that achieved much higher speeds over telephone lines.


== Dial-up ==
A dial-up modem transmits computer data over an ordinary switched telephone line that has not been designed for data use. It was once a widely known technology, mass-marketed globally dial-up internet access. In the 1990s, tens of millions of people in the United States alone used dial-up modems for internet access.
Dial-up service has since been largely superseded by broadband internet, such as DSL.


=== History ===


==== 1950s ====

Mass production of telephone line modems in the United States began as part of the SAGE air-defense system in 1958, connecting terminals at various airbases, radar sites, and command-and-control centers to the SAGE director centers scattered around the United States and Canada.
Shortly afterwards in 1959, the technology in the SAGE modems was made available commercially as the Bell 101, which provided 110 bit/s speeds. Bell called this and several other early modems "datasets".


==== 1960s ====
Some early modems were based on touch-tone frequencies, such as Bell 400-style touch-tone modems.
The Bell 103A standard was introduced by AT&T in 1962. It provided full-duplex service at 300 bit/s over normal phone lines. Frequency-shift keying was used, with the call originator transmitting at 1,070 and 1,270 Hz and the answering modem transmitting at 2,025 and 2,225 Hz.
The 103 modem would eventually become a de facto standard once third-party (non-AT&T) modems reached the market, and throughout the 1970s, independently made modems compatible with the Bell 103 de facto standard were commonplace. Example models included the Novation CAT and the Anderson-Jacobson. A lower-cost option was the Pennywhistle modem, designed to be built using readily available parts.
Teletype machines were granted access to remote networks such as the Teletypewriter Exchange using the Bell 103 modem. AT&T also produced reduced-cost units, the originate-only 113D and the answer-only 113B/C modems.


==== 1970s ====
The 201A Data-Phone was a synchronous modem using two-bit-per-symbol phase-shift keying (PSK) encoding, achieving 2,000 bit/s half-duplex over normal phone lines. In this system the two tones for any one side of the connection are sent at similar frequencies as in the 300 bit/s systems, but slightly out of phase.
In early 1973, Vadic introduced the VA3400 which performed full-duplex at 1,200 bit/s over a normal phone line.
In November 1976, AT&T introduced the 212A modem, similar in design, but using the lower frequency set for transmission. It was not compatible with the VA3400, but it would operate with 103A modem at 300 bit/s.
In 1977, Vadic responded with the VA3467 triple modem, an answer-only modem sold to computer center operators that supported Vadic's 1,200-bit/s mode, AT&T's 212A mode, and 103A operation.


==== 1980s ====
A significant advance in modems was the Hayes Smartmodem, introduced in 1981. The Smartmodem was an otherwise standard 103A 300 bit/s direct-connect modem, but it introduced a command language which allowed the computer to make control requests, such as commands to dial or answer calls, over the same RS-232 interface used for the data connection. The command set used by this device became a de facto standard, the Hayes command set, which was integrated into devices from many other manufacturers.
Automatic dialing was not a new capability—it had been available via separate automatic calling units, and via modems using the X.21 interface—but the Smartmodem made it available in a single device that could be used with even the most minimal implementations of the ubiquitous RS-232 interface, making this capability accessible from virtually any system or language.
The introduction of the Smartmodem made communications much simpler and more easily accessed. This provided a growing market for other vendors, who licensed the Hayes patents and competed on price or by adding features. This eventually led to legal action over use of the patented Hayes command language.
Dial modems generally remained at 300 and 1,200 bit/s (eventually becoming standards such as V.21 and V.22) into the mid-1980s.
The introduction of microcomputer systems with internal expansion slots made small internal modems practical. This led to a series of popular modems for the S-100 bus and Apple II computers that could directly dial out, answer incoming calls, and hang up entirely from software, the basic requirements of a bulletin board system (BBS). The seminal CBBS for instance was created on an S-100 machine with a Hayes internal modem, and a number of similar systems followed.
Commodore's 1982 VicModem for the VIC-20 was the first modem to be sold under $100 (equivalent to $334 in 2025), and the first modem to sell a million units.
In 1983, Prentice Communication introduced the Popcom X100, a Hayes-compatible modem built into an extremely compact case with an internal power supply, intended to be plugged into a wall indefinitely. It was one of the most popular modems for IBM PC compatibles until Prentice went bankrupt in the late 1980s.
In 1984, V.22bis was created, a 2,400-bit/s system similar in concept to the 1,200-bit/s Bell 212. This bit rate increase was achieved by defining four or sixteen distinct symbols, which allowed the encoding of two or four bits per symbol instead of only one. By the late 1980s, many modems could support improved standards like this, and 2,400-bit/s operation was becoming common.
Increasing modem speed greatly improved the responsiveness of online systems and made file transfer practical. This led to rapid growth of online services with large file libraries, which in turn gave more reason to own a modem. The rapid update of modems led to a similar rapid increase in BBS use.
Meanwhile, a number of Videotex services, especially France's Minitel arose. These used V.23, which was asymmetric full-duplex and allowed "pages" of information to be downloaded at 1,200-bit/s at the same time as accepting user input at 75-bit/s.
Echo cancellation became a feature of modems in this period, which allowed both modems to ignore their own reflected signals. This way both modems can simultaneously transmit and receive over the full spectrum of the phone line, improving the available bandwidth.
Additional improvements were introduced by quadrature amplitude modulation (QAM) encoding, which increased the number of bits per symbol to four through a combination of phase shift and amplitude.
Transmitting at 1,200 baud produced the 4,800 bit/s V.27ter standard, and at 2,400 baud the 9,600 bit/s V.32. The carrier frequency was 1,650 Hz in both systems.
The introduction of these higher-speed systems also led to the development of the digital fax machine during the 1980s. While early fax technology also used modulated signals on a phone line, digital fax used the now-standard digital encoding used by computer modems. This eventually allowed computers to send and receive fax images.


==== 1990s ====

In the early 1990s, V.32 modems operating at 9,600 bit/s were introduced, but were expensive and were only starting to enter the market when V.32bis was standardized, which operated at 14,400 bit/s.
Rockwell International's chip division developed a new driver chip set incorporating the V.32bis standard and aggressively priced it. Supra, Inc. arranged a short-term exclusivity arrangement with Rockwell, and developed the SupraFAXModem 14400 based on it. Introduced in January 1992 at $399 (equivalent to $1,331 in 2025), it was half the price of the slower V.32 modems already on the market. This led to a price war, and by the end of the year V.32 was dead, never having been really established, and V.32bis modems were widely available for $250 (equivalent to $834 in 2025).
V.32bis was so successful that the older high-speed standards had little advantages. USRobotics (USR) fought back with a 16,800 bit/s version of HST, while AT&T introduced a one-off 19,200 bit/s method they referred to as V.32ter, but neither non-standard modem sold well.

Consumer interest in these proprietary improvements waned during the lengthy introduction of the 28,800 bit/s V.34 standard. While waiting, several companies decided to release hardware and introduced modems they referred to as V.Fast.
In order to guarantee compatibility with V.34 modems once a standard was ratified (1994), manufacturers used more flexible components, generally a DSP and microcontroller, as opposed to purpose-designed ASIC modem chips. This would allow later firmware updates to conform with the standards once ratified.
The ITU standard V.34 represents the culmination of these joint efforts. It employed the most powerful coding techniques available at the time, including channel encoding and shape encoding. From the mere four bits per symbol (9.6 kbit/s), the new standards used the functional equivalent of 6 to 10 bits per symbol, plus increasing baud rates from 2,400 to 3,429, to create 14.4, 28.8, and 33.6 kbit/s modems. This rate is near the theoretical Shannon limit of a phone line.


==== 56 kbit/s technologies ====
While 56 kbit/s speeds had been available for leased-line modems for some time, they did not become available for dial up modems until the late 1990s.

In the late 1990s, technologies to achieve speeds above 33.6 kbit/s began to be introduced. Several approaches were used, but all of them began as solutions to a single fundamental problem with phone lines.
By the time technology companies began to investigate speeds above 33.6 kbit/s, telephone companies had switched almost entirely to all-digital networks. As soon as a phone line reached a local central office, a line card converted the analog signal from the subscriber to a digital one and conversely. While digitally encoded telephone lines notionally provide the same bandwidth as the analog systems they replaced, the digitization itself placed constraints on the types of waveforms that could be reliably encoded.
The first problem was that the process of analog-to-digital conversion is intrinsically lossy, but second, and more importantly, the digital signals used by the telcos were not "linear": they did not encode all frequencies the same way, instead utilizing a nonlinear encoding (μ-law and a-law) meant to favor the nonlinear response of the human ear to voice signals. This made it very difficult to find a 56 kbit/s encoding that could survive the digitizing process.
Modem manufacturers discovered that, while the analog to digital conversion could not preserve higher speeds, digital-to-analog conversions could. Because it was possible for an ISP to obtain a direct digital connection to a telco, a digital modem –  one that connects directly to a digital telephone network interface, such as T1 or PRI –  could send a signal that utilized every bit of bandwidth available in the system. While that signal still had to be converted back to analog at the subscriber end, that conversion would not distort the signal in the same way that the opposite direction did.


==== Early 56k dial-up products ====
The first 56k (56 kbit/s) dial-up option was a proprietary design from USRobotics, which they called "X2" because 56k was twice the speed (×2) of 28k modems.
At that time, USRobotics held a 40% share of the retail modem market, while Rockwell International held an 80% share of the modem chipset market. Concerned with being shut out, Rockwell began work on a rival 56k technology. They joined with Lucent and Motorola to develop what they called "K56Flex" or just "Flex".
Both technologies reached the market around February 1997; although problems with K56Flex modems were noted in product reviews through July, within six months the two technologies worked equally well, with variations dependent largely on local connection characteristics.
The retail price of these early 56k modems was about US$200 (equivalent to $667 in 2025), compared to $100 (equivalent to $334 in 2025) for standard 33k modems. Compatible equipment was also required at the Internet service providers (ISPs) end, with costs varying depending on whether their current equipment could be upgraded. About half of all ISPs offered 56k support by October 1997. Consumer sales were relatively low, which USRobotics and Rockwell attributed to conflicting standards.


==== Standardized 56k (V.90/V.92) ====
In February 1998, The International Telecommunication Union (ITU) announced the draft of a new 56 kbit/s standard V.90 with strong industry support. Incompatible with either existing standard, it was an amalgam of both, but was designed to allow both types of modem by a firmware upgrade. The V.90 standard was approved in September 1998 and widely adopted by ISPs and consumers.
The ITU-T V.92 standard was approved by ITU in November 2000 and utilized digital PCM technology to increase the upload speed to a maximum of 48 kbit/s.
The high upload speed was a tradeoff. Use of the 48 kbit/s upstream rate would reduce the downstream as low as 40 kbit/s due to echo effects on the line. To avoid this problem, V.92 modems offer the option to turn off the digital upstream and instead use a plain 33.6 kbit/s analog connection in order to maintain a high digital downstream of 50 kbit/s or higher.
V.92 also added two other features. The first is the ability for users who have call waiting to put their dial-up Internet connection on hold for extended periods of time while they answer a call. The second feature is the ability to quickly connect to one's ISP, achieved by remembering the analog and digital characteristics of the telephone line and using this saved information when reconnecting.


=== Evolution of dial-up speeds ===
These values are maximum values, and actual values may be slower under certain conditions (for example, noisy phone lines). For a complete list see the companion article list of device bandwidths. A baud is one symbol per second; each symbol may encode one or more data bits.


=== Compression ===
Many dial-up modems implement standards for data compression to achieve higher effective throughput for the same bitrate. V.44 is an example used in conjunction with V.92 to achieve speeds greater than 56k over ordinary phone lines.
As telephone-based 56k modems began losing popularity, some Internet service providers such as Netzero/Juno, Netscape, and others started using pre-compression to increase apparent throughput. This server-side compression can operate much more efficiently than the on-the-fly compression performed within modems, because the compression techniques are content-specific (JPEG, text, EXE, etc.).The drawback is a loss in quality, as they use lossy compression which causes images to become pixelated and smeared. ISPs employing this approach often advertised it as "accelerated dial-up".
These accelerated downloads are integrated into the Opera and Amazon Silk web browsers, using their own server-side text and image compression requiring all data to pass through their own servers before reaching the user.


=== Methods of attachment ===
Dial-up modems can attach in two different ways: with an acoustic coupler, or with a direct electrical connection.


==== Directly connected modems ====
The case Hush-A-Phone Corp. v. United States, which legalized acoustic couplers, applied only to mechanical connections to a telephone set, not electrical connections to the telephone line. The Carterfone decision of 1968, however, permitted customers to attach devices directly to a telephone line as long as they followed stringent Bell-defined standards for non-interference with the phone network. This opened the door to independent (non-AT&T) manufacture of direct-connect modems, that plugged directly into the phone line rather than via an acoustic coupler.
While Carterfone required AT&T to permit connection of devices, AT&T successfully argued that they should be allowed to require the use of a special device to protect their network, placed in between the third-party modem and the line, called a Data Access Arrangement (DAA). The use of DAAs was mandatory from 1969 to 1975 when the new FCC Part 68 rules allowed the use of devices without a Bell-provided DAA, subject to equivalent circuitry being included in the third-party device.
Virtually all modems produced after the 1980s are direct-connect.


==== Acoustic couplers ====

While Bell (AT&T) provided modems that attached via direct wire connection to the phone network as early as 1958, their regulations at the time did not permit the direct electrical connection of any non-Bell device to a telephone line. However, the Hush-a-Phone ruling allowed customers to attach any device to a telephone set as long as it did not interfere with its functionality. This allowed third-party (non-Bell) manufacturers to sell modems utilizing an acoustic coupler.
With an acoustic coupler, an ordinary telephone handset was placed in a cradle containing a speaker and microphone positioned to match up with those on the handset. The tones used by the modem were transmitted and received into the handset, which then relayed them to the phone line.
Because the modem was not electrically connected, it was incapable of picking up, hanging up or dialing, all of which required direct control of the line. Touch-tone dialing would have been possible, but touch-tone was not universally available at this time. Consequently, the dialing process was executed by the user lifting the handset, dialing, then placing the handset on the coupler. To accelerate this process, a user could purchase a dialer or automatic calling unit.


=== Automatic calling units ===
Early modems could not place or receive calls on their own, but required human intervention for these steps.
As early as 1964, Bell provided automatic calling units that connected separately to a second serial port on a host machine and could be commanded to open the line, dial a number, and even ensure the far end had successfully connected before transferring control to the modem. Later on, third-party models would become available, sometimes known simply as dialers, and features such as the ability to automatically sign in to time-sharing systems.
Eventually this capability would be built into modems and no longer require a separate device.


=== Controller-based modems vs. soft modems ===

Prior to the 1990s, modems contained all the electronics and intelligence to convert data in discrete form to an analog (modulated) signal and back again, and to handle the dialing process, as a mix of discrete logic and special-purpose chips. This type of modem is sometimes referred to as controller-based.
In 1993, Digicom introduced the Connection 96 Plus, a modem which replaced the discrete and custom components with a general purpose digital signal processor, which could be reprogrammed to upgrade to newer standards.
Subsequently, USRobotics released the Sportster Winmodem, a similarly upgradable DSP-based design.
As this design trend spread, both terms – soft modem and Winmodem – obtained a negative connotation in non-Windows-based computing circles because the drivers were either unavailable for non-Windows platforms, or were only available as unmaintainable closed-source binaries, a particular problem for Linux users.
Later in the 1990s, software-based modems became available. These are essentially sound cards, and in fact a common design uses the AC'97 audio codec, which provides multichannel audio to a PC and includes three audio channels for modem signals.
The audio sent and received on the line by a modem of this type is generated and processed entirely in software, often in a device driver. There is little functional difference from the user's perspective, but this design reduces the cost of a modem by moving most of the processing power into inexpensive software instead of expensive hardware DSPs or discrete components.
Soft modems of both types either are internal cards or connect over external buses such as USB. They never utilize RS-232 because they require high bandwidth channels to the host computers to carry the raw audio signals generated (sent) or analyzed (received) by software.
Since the interface is not RS-232, there is no standard for communication with the device directly. Instead, soft modems come with drivers which create an emulated RS-232 port, which standard modem software (such as an operating system dialer application) can communicate with.


=== Voice/fax modems ===
"Voice" and "fax" are terms added to describe any dial modem that is capable of recording/playing audio or transmitting/receiving faxes. Some modems are capable of all three functions.
Voice modems are used for computer telephony integration applications as simple as placing/receiving calls directly through a computer with a headset, and as complex as fully automated robocalling systems.
Fax modems can be used for computer-based faxing, in which faxes are sent and received without inbound or outbound faxes ever needing to ever be printed on paper. This differs from efax, in which faxing occurs over the internet, in some cases involving no phone lines whatsoever.


=== Modem Over IP (Modem Relay) ===
The ITU-T V.150.1 Recommendation defines procedures for the inter-operation of PSTN to IP gateways. In a classic example of this setup, each dial-up modem would connect to a modem relay gateway. The gateways are then connected to an IP network (such as the Internet). The analog connection from the modem is terminated at the gateway and the signal is demodulated. The demodulated control signals are transported over the IP network in an RTP packet type defined as State Signaling Events (SSEs). The data from the demodulated signal is sent over the IP network via a transport protocol (also defined as an RTP payload) called Simple Packet Relay Transport (SPRT). Both the SSE and SPRT packet formats are defined in the V.150.1 Recommendation (Annex C and Annex B respectively). The gateway at the remote end that receives the packets uses the information to re-modulate the signal for the modem connected at that end.
While the V.150.1 Recommendation is not widely deployed, a pared down version of the recommendation called "Minimum Essential Requirements (MER) for V.150.1 Gateways" (SCIP-216) is used in Secure Telephony applications.


=== Cloud-based Modems ===
While traditionally a hardware device, fully software-based modems with the ability to be deployed in a cloud environment (such as Microsoft Azure or AWS) do exist. Leveraging a Voice-over-IP (VoIP) connection through a SIP Trunk, the modulated audio samples are generated and sent over an IP network via RTP and an uncompressed audio codec (such as G.711 μ-law or a-law).


=== Popularity ===
A 1994 Software Publishers Association found that although 60% of computers in US households had a modem, only 7% of households went online. A CEA study in 2006 found that dial-up Internet access was declining in the US. In 2000, dial-up Internet connections accounted for 74% of all US residential Internet connections. The United States demographic pattern for dial-up modem users per capita has been more or less mirrored in Canada and Australia for the past 20 years.
Dial-up modem use in the US had dropped to 60% by 2003, and stood at 36% in 2006. Voiceband modems were once the most popular means of Internet access in the US, but with the advent of new ways of accessing the Internet, the traditional 56K modem was losing popularity. The dial-up modem is still widely used by customers in rural areas where DSL, cable, wireless broadband, satellite, or fiber optic service are either not available or they are unwilling to pay what the available broadband companies charge. In its 2012 annual report, AOL showed it still collected around $700 million in fees from about three million dial-up users.


=== TTY/TDD ===
TDD devices are a subset of the teleprinter intended for use by the deaf or hard of hearing, essentially a small teletype with a built-in dial-up modem and acoustic coupler. The first models produced in 1964 utilized FSK modulation much like early computer modems.


== Leased-line modems ==
A leased line modem also uses ordinary phone wiring, like dial-up and DSL, but does not use the same network topology. While dial-up uses a normal phone line and connects through the telephone switching system, and DSL uses a normal phone line but connects to equipment at the telco central office, leased lines do not terminate at the telco.
Leased lines are pairs of telephone wire that have been connected together at one or more telco central offices so that they form a continuous circuit between two subscriber locations, such as a business' headquarters and a satellite office. They provide no power or dialtone - they are simply a pair of wires connected at two distant locations.
A dialup modem will not function across this type of line, because it does not provide the power, dialtone and switching that those modems require. However, a modem with leased-line capability can operate over such a line, and in fact can have greater performance because the line is not passing through the telco switching equipment, the signal is not filtered, and therefore greater bandwidth is available.
Leased-line modems can operate in 2-wire or 4-wire mode. The former uses a single pair of wires and can only transmit in one direction at a time, while the latter uses two pairs of wires and can transmit in both directions simultaneously. When two pairs are available, bandwidth can be as high as 1.5 Mbit/s, a full data T1 circuit.
While the slower leased line modems used, e.g., RS-232, interfaces, the faster wideband modems used, e.g., V.35.


== Broadband ==

The term broadband was previously used to describe communications faster than what was available on voice grade channels.
The term broadband gained widespread adoption in the late 1990s to describe internet access technology exceeding the 56 kilobit/s maximum of dialup. There are many broadband technologies, such as various DSL (digital subscriber line) technologies and cable broadband.
DSL technologies such as ADSL, HDSL, and VDSL use telephone lines (wires that were installed by a telephone company and originally intended for use by a telephone subscriber) but do not utilize most of the rest of the telephone system. Their signals are not sent through ordinary phone exchanges, but are instead received by special equipment (a DSLAM) at the telephone company central office.
Because the signal does not pass through the telephone exchange, no "dialing" is required, and the bandwidth constraints of an ordinary voice call are not imposed. This allows much higher frequencies, and therefore much faster speeds. ADSL in particular is designed to permit voice calls and data usage over the same line simultaneously.
Similarly, cable modems use infrastructure originally intended to carry television signals, and like DSL, typically permit receiving television signals at the same time as broadband internet service.
Other broadband modems include FTTx modems, satellite modems, and power line modems.


=== Terminology ===
Different terms are used for broadband modems, because they frequently contain more than just a modulation/demodulation component.
Because high-speed connections are frequently used by multiple computers at once, many broadband modems do not have direct (e.g. USB) PC connections. Rather they connect over a network such as Ethernet or Wi-Fi. Early broadband modems offered Ethernet handoff allowing the use of one or more public IP addresses, but no other services such as NAT and DHCP that would allow multiple computers to share one connection. This led to many consumers purchasing separate "broadband routers", placed between the modem and their network, to perform these functions.
Eventually, ISPs began providing residential gateways which combined the modem and broadband router into a single package that provided routing, NAT, security features, and even Wi-Fi access in addition to modem functionality, so that subscribers could connect their entire household without purchasing any extra equipment. Even later, these devices were extended to provide "triple play" features such as telephony and television service. Nonetheless, these devices are still often referred to simply as "modems" by service providers and manufacturers.
Consequently, the terms "modem", "router", and "gateway" are now used interchangeably in casual speech, but in a technical context "modem" may carry a specific connotation of basic functionality with no routing or other features, while the others describe a device with features such as NAT.
Broadband modems may also handle authentication such as PPPoE. While it is often possible to authenticate a broadband connection from a users PC, as was the case with dial-up internet service, moving this task to the broadband modem allows it to establish and maintain the connection itself, which makes sharing access between PCs easier since each one does not have to authenticate separately. Broadband modems typically remain authenticated to the ISP as long as they are powered on.


== Radio ==

Any communication technology sending digital data wirelessly involves a modem. This includes direct broadcast satellite, WiFi, WiMax, mobile phones, GPS, Bluetooth and NFC.
Modern telecommunications and data networks also make extensive use of radio modems where long distance data links are required. Such systems are an important part of the PSTN, and are also in common use for high-speed computer network links to outlying areas where fiber optic is not economical.
Wireless modems come in a variety of types, bandwidths, and speeds. Wireless modems are often referred to as transparent or smart. They transmit information that is modulated onto a carrier frequency to allow many wireless communication links to work simultaneously on different frequencies.
Transparent modems operate in a manner similar to their phone line modem cousins. Typically, they were half duplex, meaning that they could not send and receive data at the same time. Typically, transparent modems are polled in a round robin manner to collect small amounts of data from scattered locations that do not have easy access to wired infrastructure. Transparent modems are most commonly used by utility companies for data collection.
Smart modems come with media access controllers inside, which prevents random data from colliding and resends data that is not correctly received. Smart modems typically require more bandwidth than transparent modems, and typically achieve higher data rates. The IEEE 802.11 standard defines a short range modulation scheme that is used on a large scale throughout the world.


=== Mobile broadband ===

Modems which use a mobile telephone system (GPRS, UMTS, HSPA, EVDO, WiMax, 5G etc.), are known as mobile broadband modems (sometimes also called wireless modems). Wireless modems can be embedded inside a laptop, mobile phone or other device, or be connected externally. External wireless modems include connect cards, USB modems, and cellular routers.
Most GSM wireless modems come with an integrated SIM cardholder (i.e. Huawei E220, Sierra 881.) Some models are also provided with a microSD memory slot and/or jack for additional external antenna, (Huawei E1762, Sierra Compass 885.)
The CDMA (EVDO) versions do not typically use R-UIM cards, but use Electronic Serial Number (ESN) instead.
Until the end of April 2011, worldwide shipments of USB modems surpassed embedded 3G and 4G modules by 3:1 because USB modems can be easily discarded. Embedded modems may overtake separate modems as tablet sales grow and the incremental cost of the modems shrinks, so by 2016, the ratio may change to 1:1.
Like mobile phones, mobile broadband modems can be SIM locked to a particular network provider. Unlocking a modem is achieved the same way as unlocking a phone, by using an 'unlock code'.


== Optical modem ==

A device that connects to a fiber optic network is known as an optical network terminal (ONT) or optical network unit (ONU). These are commonly used in fiber to the home installations, installed inside or outside a house to convert the optical medium to a copper Ethernet interface, after which a router or gateway is often installed to perform authentication, routing, NAT, and other typical consumer internet functions, in addition to "triple play" features such as telephony and television service. They are not a modem, although they perform a similar function and are sometimes referred to as a modem.
Fiber optic systems can use quadrature amplitude modulation to maximize throughput. 16QAM uses a 16-point constellation to send four bits per symbol, with speeds on the order of 200 or 400 gigabits per second. 64QAM uses a 64-point constellation to send six bits per symbol, with speeds up to 65 terabits per second. Although this technology has been announced, it may not yet be commonly used.


== Home networking ==

Although the name modem is seldom used, some high-speed home networking applications do use modems, such as powerline ethernet. The G.hn standard for instance, developed by ITU-T, provides a high-speed (up to 1 Gbit/s) local area network using existing home wiring (power lines, phone lines, and coaxial cables). G.hn devices use orthogonal frequency-division multiplexing (OFDM) to modulate a digital signal for transmission over the wire.
As described above, technologies like Wi-Fi and Bluetooth also use modems to communicate over radio at short distances.


== Null modem ==

A null modem cable is a specially wired cable connected between the serial ports of two devices, with the transmit and receive lines reversed. It is used to connect two devices directly without a modem. The same software or hardware typically used with modems (such as Procomm or Minicom) could be used with this type of connection.
A null modem adapter is a small device with plugs at both ends which is placed on the termination of a normal "straight-through" serial cable to convert it into a null-modem cable.


== Short-haul modem ==
A "short haul modem" is a device that bridges the gap between leased-line and dial-up modems. Like a leased-line modem, they transmit over "bare" lines with no power or telco switching equipment, but are not intended for the same distances that leased lines can achieve. Ranges up to several miles are possible, but significantly, short-haul modems can be used for medium distances, greater than the maximum length of a basic serial cable but still relatively short, such as within a single building or campus. This allows a serial connection to be extended for perhaps only several hundred to several thousand feet, a case where obtaining an entire telephone or leased line would be overkill.
While some short-haul modems do in fact use modulation, low-end devices (for reasons of cost or power consumption) are simple "line drivers" that increase the level of the digital signal but do not modulate it. These are not technically modems, but the same terminology is used for them.


== See also ==


== Further reading ==
"Modems: Market Overview" (PDF). Datapro Research. Datapro Reports on PC & LAN Communications. McGraw Hill. September 1990.


== Notes ==


== References ==


== External links ==

Hayes-compatible Modems and AT Commands from the Serial Data Communications Programming Wikibook
International Telecommunication Union ITU: Data communication over the telephone network
Basic handshakes & modulations – V.22, V.22bis, V.32 and V.34 handshakes
Getting connected: a history of modems – techradar
Difference between Modems and Routers – Bugswave
Telecommunications Transmission_Engineering Volume 2 Facilities - AT&T
