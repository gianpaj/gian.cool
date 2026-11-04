# Internet fax

Source: https://en.wikipedia.org/wiki/Internet_fax
Revision: 1362457652 (2026-07-04T01:43:02Z)
Retrieved: 2026-11-03
License: CC BY-SA 4.0 (Wikipedia text). Attribute Wikipedia contributors.

---

Internet fax, e-fax, or online fax is the use of the internet and internet protocols to send a fax (facsimile), rather than using a standard telephone connection and a fax machine. A distinguishing feature of Internet fax, compared to other Internet communications such as email, is the ability to exchange fax messages with traditional telephone-based fax machines.


== Purpose ==
Fax has no technical advantage over other means of sending information over the Internet with technologies such as email, scanner, and graphics file formats; however, it is extremely simple to use: put the documents to be faxed in a hopper, dial a phone number, and press a button. Fax continues to be used over the telephone network at locations without computer and Internet facilities; and sometimes a fax of a document with a person's handwritten signature is a requirement for legal reasons. Faxes can be sent from electronic devices, often referred to as online faxing which allows faxes to be sent and received without the need for a physical fax machine. Online faxing is still popular as it allows the user to send and receive documents using a secure line without the worry of being hacked, as online faxing services use end-to-end encryption to protect the documents from being hacked. Fax machines have increasingly been replaced by fax apps or websites offering fax server services, but the function is still very much a viable part of business transactions.


== Traditional fax ==
The traditional method for sending faxes over phone lines (PSTN)

Fax machine → Phone line → Fax machine
A fax machine is an electronic instrument composed of a scanner, a modem, and a printer. It transmits data in the form of pulses via a telephone line to a recipient, usually another fax machine, which then transforms these pulses into images, and prints them on paper.
The traditional method requires a phone line, and only one fax can be sent or received at a time. The phone connection must not be a packet-based system in which delays can occur—a VoIP connection will not work well without special precautions (T.38-compliant equipment at both ends).


=== Internet fax ===
Internet fax achieves a dramatic reduction in communication costs especially when long faxes are frequently exchanged with overseas or distant offices.
Since there is no telephone connection charge when sending a fax over the Internet, the cost of sending faxes is covered entirely by the fixed line Internet connection fee, unless one uses a fee-based faxing app. The recipient can either use a fax machine or an internet fax service to receive faxes sent via the internet fax method.
Hardcopy is converted to TIFF or PDF data and attached to an e-mail in MIME format. Then, taking advantage of a connection to the office LAN, data is sent via TCP/IP directly to any Internet Fax on the intranet or Internet. Because they make use of TCP/IP, Internet Faxes do not incur long-distance transmission costs and reception is verifiable.


=== IP fax and IP address relay ===
IP fax is frequently confused with Internet fax, though IP fax transmits data over an office intranet from a networked multi-functional device to the IP address of another. Taking advantage of an established LAN/WAN infrastructure, IP fax reduces or eliminates costly connection and transmission fees. T.38 is a commonly used and recommended transmission standard for IP fax.
Also, IP fax does not require a dedicated server or make use of the office mail server. IP Address Relay forwards to a multi-functional device for relaying to a local G3 fax machine.


== Computer-based faxing ==
As modems came into wider use with personal computers, the computer was used to send faxes directly. Instead of first printing a hard copy to be then sent via fax machine, a document could now be printed directly to the software fax, then sent via the computer's modem. Receiving faxes was accomplished similarly.

Computer → Phone line → Fax machine
Fax machine → Phone line → Computer
A disadvantage of receiving faxes through the computer is that the computer has to be turned on and running the fax software to receive any faxes. It also means that the document is no longer readable by computer applications, unless optical character recognition methods are used to read the fax image.
Note: This method is distinct from Internet faxing as the information is sent directly over the telephone network, not over the Internet.
This helps to communicate from remote places to the fax machine's location.


== Mobile-based faxing ==
In this method, smartphones are used to send and receive fax without the need to have any landline phone or any extra hardware. There are several fax applications (for both Android and iOS) that handle the mobile-based faxing.
Users must install an app on their smartphones or smartwatches and have an active subscription to an online fax service provider. The phone's camera is used as a scanner to scan documents or the user uploads documents to the service from the device which the service sends as a fax. Some providers also offer the option to get a dedicated fax number and receive faxes on this number.


== Internet fax servers and gateways ==
The Internet has enabled the development of several other methods of sending and receiving a fax. The more common method is an extension of computer-based faxing, and involves using a fax server/gateway to the Internet to convert documents between faxes and emails. The process is often referred to as "fax to mail" or "mail to fax".
This technology offers the advantage of dispensing with the machine as well as the additional telephone line, and because of this, has started to replace the traditional fax machine.
Reception:

Fax machine → Phone line → Fax gateway → email message (over Internet) → computer email account
A fax is sent via the Public Switched Telephone Network (PSTN) to the fax server, which receives the fax and converts it into PDF or TIFF format, according to the instructions of the user. The processed file is then transmitted to the Web server, which sends it as an email containing the fax as an attached file, and sometimes sends a message reporting delivery to a mobile phone.
Sending:

Computer → Internet → fax gateway → phone line → fax machine
The user connects to the supplier Web site, specifies the receiving fax number, and uploads the document to send. The document is usually converted to PDF or TIFF format and sent by the Web server to the fax server, which then transmits it to the receiving fax machine via the telephone network. The sender usually receives confirmation that transmission was successful, either in the web interface or by email.
An Internet fax service allows faxes to be sent from a computer via an Internet connection, thanks to a Web interface usually available on the supplier's Web site. This technology has many advantages:

No fax machine - no maintenance, no paper, toner expenditure, possible repairs, etc.
Mobility - All actions are done on the Web interface; the service is thus available from any computer connected to Internet, everywhere in the world.
Confidentiality - The faxes are sent to the recipient's email account, which may be more private than a fax machine used by several people.
No installation of software or hardware required - the Web interface is used.
No need for a telephone line for fax use.
Several faxes can be sent or received simultaneously, and faxes can be received while the computer is switched off.
Early email-to-fax services such as The Phone Company and Digital Chicken were developed in the mid-1990s. However after the development of open source IP PBX systems, it became common to set up fully software-based email to fax or Web to fax gateways. like Asterisk (PBX) and ICTFax.


== Fax using VoIP ==

Making phone calls over the Internet (Voice over Internet Protocol, or VoIP) has become increasingly popular. Compressing fax signals is different from compressing voice signals, so a new standard (T.38) has been created for this. Using a (sending) VoIP adapter and (receiving) gateway which are both T.38 compliant, most fax machines can be plugged into the VoIP adapter in the same way as to a regular phone line. Not all fax equipment claiming T.38 compliance works reliably. In particular communicating with older fax machines is problematic.

Fax machine → VoIP adapter → VoIP gateway → Phone line → Fax machine (or vice versa)
As with regular faxes, only one fax can be sent or received at a time.


== Fax using email ==

While the needs of computer-to-fax communications are well covered, the simplicity of quickly faxing a handwritten document combined with the advantages of email are not.
"iFax" (T.37) was designed for fax machines to directly communicate via email. Faxes are sent as email attachments in a TIFF-F  format.

iFax machine → email message (over Internet) → computer email account
iFax machine → email message (over Internet) → iFax machine (using email address)
A new fax machine (supporting iFax/T.37) is required, as well as a known email address for the sending and receiving machines. This has limited the standard's use, though a system for looking up a fax's email address based on its phone number is under development.
To work with existing fax machines, all iFax machines support standard faxing (requiring a regular phone line). Alternatively, an iFax can be used in conjunction with a fax gateway.

iFax machine → email message (over Internet) → Fax gateway → Phone line → traditional Fax machine (or vice versa)


== See also ==
Fax
Fax server
Registered fax


== References ==
