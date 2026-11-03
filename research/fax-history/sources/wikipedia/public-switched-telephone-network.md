# Public switched telephone network

Source: https://en.wikipedia.org/wiki/Public_switched_telephone_network
Revision: 1382883733 (2026-10-30T20:36:28Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

The public switched telephone network (PSTN) is the aggregate of the world's telephone networks that are operated by national, regional, or local telephony operators. It provides infrastructure and services for public telephony. The PSTN consists of telephone lines, fiber-optic cables, microwave transmission links, cellular networks, communications satellites, and undersea telephone cables interconnected by switching centers, such as central offices, network tandems, and international gateways, which allow telephone users to communicate with each other.
Originally a network of fixed-line analog telephone systems, the PSTN is now predominantly digital in its core network and includes terrestrial cellular, satellite, and landline systems. These interconnected networks enable global communication, allowing calls to be made to and from nearly any telephone worldwide. Many of these networks are progressively transitioning to Internet Protocol to carry their telephony traffic.
The technical operation of the PSTN adheres to the standards internationally promulgated by the ITU-T. These standards have their origins in the development of local telephone networks, primarily in the Bell System in the United States and in the networks of European ITU members. The E.164 standard provides a single global address space in the form of telephone numbers. The combination of the interconnected networks and a global telephone numbering plan allows telephones around the world to connect with each other.


== History ==
Commercialization of the telephone began shortly after its invention, with instruments operated in pairs for private use between two locations. Users who wanted to communicate with persons at multiple locations had as many telephones as necessary for the purpose. Alerting another user of the desire to establish a telephone call was accomplished by whistling loudly into the transmitter until the other party heard the alert. Bells were soon added to stations for signaling.
Later telephone systems took advantage of the exchange principle already employed in telegraph networks. Each telephone was wired to a telephone exchange established for a town or area. For communication outside this exchange area, trunks were installed between exchanges. Networks were designed in a hierarchical manner until they spanned cities, states, and international distances.
Automation introduced pulse dialing between the telephone and the exchange so that each subscriber could directly dial another subscriber connected to the same exchange, but long-distance calling across multiple exchanges required manual switching by operators. Later, more sophisticated address signaling, including multi-frequency signaling methods, enabled direct-dialed long-distance calls by subscribers, culminating in the Signalling System 7 (SS7) network that controlled calls between most exchanges by the end of the 20th century.
The growth of the PSTN was enabled by teletraffic engineering techniques to deliver quality of service (QoS) in the network. The work of A. K. Erlang established the mathematical foundations of methods required to determine the capacity requirements and configuration of equipment and the number of personnel required to deliver a specific level of service.
In the 1970s, the telecommunications industry began implementing packet-switched network data services using the X.25 protocol transported over much of the end-to-end equipment as was already in use in the PSTN. These became known as public data networks, or public switched data networks.
In the 1980s, the industry began planning for digital services assuming they would follow much the same pattern as voice services and conceived end-to-end circuit-switched services, known as the Broadband Integrated Services Digital Network (B-ISDN). The B-ISDN vision was overtaken by the disruptive technology of the Internet.
At the turn of the 21st century, the oldest parts of the telephone network still used analog baseband technology to deliver audio-frequency connectivity over the last mile to the end-user. However, digital technologies such as DSL, ISDN, FTTx, and cable modems were progressively deployed in this portion of the network, primarily to provide high-speed Internet access. 
As of 2023, operators worldwide are in the process of retiring support for both last-mile analog telephony and ISDN, and transitioning voice service to Voice over IP via Internet access delivered either via DSL, cable modems or fiber-to-the-premises, eliminating the expense and complexity of running two separate technology infrastructures for PSTN and Internet access.
Several large private telephone networks are not linked to the PSTN, usually for military purposes. There are also private networks run by large companies that are linked to the PSTN only through limited gateways, such as a large private branch exchange (PBX).


== Operators ==
The task of building the networks and selling services to customers fell to the network operators. The first company to be incorporated to provide PSTN services was the Bell Telephone Company in the United States.
In some countries, however, the job of providing telephone networks fell to government as the investment required was very large and the provision of telephone service was increasingly becoming an essential public utility. For example, the General Post Office in the United Kingdom brought together a number of private companies to form a single nationalized company. In more recent decades, these state monopolies were broken up or sold off through privatization.


== Technology ==


=== Network topology ===

The architecture of the PSTN evolved over time to support an increasing number of subscribers, call volume, destinations, features, and technologies. The principles developed in North America and in Europe were adopted by other nations, with adaptations for local markets.
A key concept was that the telephone exchanges are arranged into hierarchies, so that if a call cannot be handled in a local cluster, it is passed to one higher up for onward routing. This reduced the number of connecting trunks required between operators over long distances, and also kept local traffic separate. Modern technologies have brought simplifications


=== Digital channels ===
Most automated telephone exchanges use digital switching rather than mechanical or analog switching. The trunks connecting the exchanges are also digital, called circuits or channels. However analog two-wire circuits are still used to connect the last mile from the exchange to the telephone in the home (also called the local loop). To carry a typical phone call from a calling party to a called party, the analog audio signal is digitized at an 8 kHz sample rate with 8-bit resolution using a special type of nonlinear pulse-code modulation known as G.711. The call is then transmitted from one end to another via telephone exchanges. The call is switched using a call set up protocol (usually ISUP) between the telephone exchanges under an overall routing strategy.
The call is carried over the PSTN using a 64 kbit/s channel, originally designed by Bell Labs. The name given to this channel is Digital Signal 0 (DS0). The DS0 circuit is the basic granularity of circuit switching in a telephone exchange. A DS0 is also known as a timeslot because DS0s are aggregated in time-division multiplexing (TDM) equipment to form higher capacity communication links.
A Digital Signal 1 (DS1) circuit carries 24 DS0s on a North American or Japanese T-carrier (T1) line, or 32 DS0s (30 for calls plus two for framing and signaling) on an E-carrier (E1) line used in most other countries. In modern networks, the multiplexing function is moved as close to the end user as possible, usually into cabinets at the roadside in residential areas, or into large business premises.
These aggregated circuits are conveyed from the initial multiplexer to the exchange over a set of equipment collectively known as the access network. The access network and inter-exchange transport use synchronous optical transmission, for example, SONET and Synchronous Digital Hierarchy (SDH) technologies, although some parts still use the older PDH technology.
The access network defines a number of reference points. Most of these are of interest mainly to ISDN but one, the V reference point, is of more general interest. This is the reference point between a primary multiplexer and an exchange. The protocols at this reference point were standardized in ETSI areas as the V5 interface.


=== Impact on IP standards ===
Voice quality in PSTN networks was used as a benchmark for the development of the Telecommunications Industry Association's TIA-TSB-116 standard on voice-quality recommendations for IP telephony, to determine acceptable levels of audio latency and echo.


== Regulation ==
In most countries, the government has a regulatory agency dedicated to provisioning of PSTN services. The agency regulate technical standards, legal requirements, and set service  tasks may be for example to ensure that end customers are not over-charged for services where monopolies may exist. These regulatory agencies may also regulate the prices charged between the operators to carry each other's traffic.


== Technology retirement ==
Several countries around the world are beginning work to phase out their public-switched telephony network. The reasons cited are often around the inability to service the components that make up the service, the technology being based on extremely old software and hardware requirements which are no longer supported in the modern world, and a very small number of engineers with the skills to be able to service it. As components break, replacements have become harder to source, made worse by recent worldwide disruptions from such things as the COVID-19 pandemic and the 2022 Russian invasion of Ukraine, alongside many of the companies involved in creating such hardware no longer existing to service them.
In the United Kingdom, the copper POTS and ISDN-based PSTN is being retired in favour of SIP telephony, with an initial target of completion in December 2025, but delayed to January 2027. By September 2026, Openreach – the national provider leading the closure of the PSTN in the UK – had converted around 90% of legacy lines in ten major cities and their surrounding areas to digital phone line services.
Several other European countries, including Estonia, Norway, Germany, Iceland, the Netherlands, Spain and Portugal, have also retired – or are planning to retire – their traditional networks.
Countries on other continents are also performing similar transitions.


== See also ==
List of telephone country codes
Managed facilities-based voice network
Phreaking
Plain old telephone service (POTS)
Via Net Loss


== References ==
