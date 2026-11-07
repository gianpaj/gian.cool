# Evidence and open questions

Research cut-off 2026-11-07. Source IDs link to `../sources/README.md`. "Reported" means attributed evidence, not a verified meter reading. MW is power; MWh is energy. IT power feeds computing equipment. Facility power also covers electrical losses and cooling. Neither is a count of installed GPUs.

| Claim or quantity | Classification and date | Supported wording and caution |
|---|---|---|
| Galaxy is in Ulanqab, Inner Mongolia, developed by Envision | S1 field report and S2/S3 company statements, 2026 | Strong support for identity and location. "China's Stargate" is a journalistic analogy, not proof of affiliation with OpenAI. |
| 800 MW IT campus, four phases | S1 reported plan, November 2026 | Say "planned for up to 800 MW of IT capacity, according to SemiAnalysis." Not 800 MW operating today. |
| First 120 MW delivered within a year; August 2026 delivery | S1 report; S2 confirms August commissioning but not this MW figure | Delivery/customer acceptance and fully fitted, loaded operation are different milestones. Site visit was in September. |
| 118 MW current IT power | S4 estimate as of 2026-11-01 | Close to 120 MW, but inferred from imagery and assumptions, not independently metered. Model expects operation after three months of fit-out. |
| 470 MW by Q4 2027 | S4 forecast | Do not substitute for the 800 MW end-2027 plan in S1. Different delivery assumptions. |
| Above 2 GW / 3 GW | S2 August / S3 November company ambitions | Conflict with S1 campus scope remains unresolved. Values are not confirmed installed or operating IT power. |
| One million accelerators | S3 full-build design ambition | No evidence of one million chips on site. No confirmed accelerator count or hardware bill of materials in accessed S1 text. |
| 5 MW SST-native 800 V DC pilot | S1 firsthand report, September visit | A subset of the campus. S3 separately supports live SST deployment but supplies no 5 MW rating. Do not extend pilot architecture to all 120 MW. |
| 10 kV AC converted to 800 V DC | S1/S3 reported architecture | Power electronics combine functions from several stages; racks still require DC/DC conversion to chip voltages. No claim that 800 V reaches silicon. |
| First phase at one fifth of US costs | S1 claim | Comparison scope, US baseline, date, exclusions and hardware costs cannot be checked in paid detail. Omit from narration unless qualified; do not compare with S4 all-in capital estimates. |
| 420 MW wind nameplate against 240 MW first-two-phase load | S1 reported configuration | Wind nameplate is not steady generation; 240 MW is the load used for that design comparison, not proof two phases are operating. |
| Above 60% own-wind share for first two phases | S1 operator aim | Annual target, not continuous self-sufficiency. S3's above 80% direct renewables target may cover different phases/resources. Actual interval data absent. |
| Four-hour battery | S1 reported duration | No battery MW/MWh rating verified. Do not multiply by campus MW and invent a storage size. Separate multi-hour shifting from S3's fast buffering/short backup functions. |
| No central chiller; shared water loop for air/liquid cooling | S1 report | Paid detail unavailable. S4 classifies roof equipment as air-cooled chillers. Images cannot settle whether equipment is a chiller, dry cooler or hybrid unit. Attribute S1 and preserve conflict. Chiller-free does not mean water-free or cooling-free. |
| 25 GW announced regional projects | S1 proprietary model aggregate | Announced pipeline; neither delivered IT capacity nor demand. Keep out of headline and scale chart. |
| Chip constraints | S9 policy context; S4 hardware estimate | Power availability cannot establish advanced-chip availability, utilization or model capability. H100-equivalent compute in S4 is a normalized estimate, not an NVIDIA chip inventory. No evidence of export violations at Galaxy. |
| Abilene 1.2 GW total versus Galaxy 800 MW IT | S10 company plan and S1 | Different denominators. S1 estimates Abilene core IT at about 820 MW; we have not independently reproduced that conversion. Do not draw a direct 1.2-to-0.8 bar comparison. |

## What the mechanism explains

An AI data centre houses accelerators, CPUs, memory, storage and switches in racks. Training repeatedly adjusts model parameters; inference runs a trained model to produce outputs. Large workloads split work across accelerators, making memory bandwidth, network links and software important alongside chips. S7 supports the equipment overview; this paragraph is an original general explanation.

Grid power arrives at a higher AC voltage. A conventional chain uses transformers, backup systems and rectifiers before the low-voltage DC electronics inside servers. Galaxy's reported pilot combines conversion into a 10 kV AC to 800 V DC SST path with storage on the DC side. Higher voltage reduces current for a given DC power, and conductor heating follows current squared times resistance. This explains the attraction; it does not measure Galaxy's actual efficiency. S5 supports the electrical principle and proposed architecture.

Heat still has to leave the chips and the building. Cold plates can transfer chip heat to liquid; air-cooled equipment can pass heat through coils into a water loop. Outdoor heat exchangers reject it. Cold ambient conditions can reduce mechanical refrigeration, but operating temperatures, peak weather, water use and redundancy determine what equipment is needed. Treat this as general background, not a reconstruction of the paywalled Galaxy cooling schematic.

## Questions before a final script

- Ask Envision which boundary and power definition explain the 800 MW, above-2 GW and 3 GW announcements.
- Obtain measured IT load, installed accelerator inventory, utilization and phase acceptance dates.
- Obtain annual and hourly renewable shares, grid import data and battery power/energy ratings.
- Resolve the chiller classification with equipment specifications and a permitted technical diagram. Obtain measured PUE and water use; neither was verified here.
- Request permission for facility photos and the SemiAnalysis figure, with a high-resolution original where needed. No open-license Galaxy photo was located in this collection.
- Access the paid report legitimately if its cost or detailed engineering claims become central. Recheck chip policy when scripting.
