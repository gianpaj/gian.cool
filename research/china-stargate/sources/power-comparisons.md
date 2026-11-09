# Power comparisons

Accessed 8 November 2026. Inputs, formulas, units and rounding are in
[power-comparisons.json](../data/power-comparisons.json).

The video compares the reported **800 MW planned IT capacity** with familiar
electrical demands. None of these calculations measures Galaxy’s actual load.
The reported 120 MW delivered phase remains distinct from that plan.

| ID | Primary source | Input and boundary |
| --- | --- | --- |
| PC1 | [US EIA: electricity use in an American home](https://www.eia.gov/tools/faqs/faq.php?id=97&t=3) | 2022 average: 10,791 kWh purchased per residential electric-utility customer per year. Page updated 8 January 2024. Grid purchases can exclude electricity generated on the property. |
| PC2 | [Allianz Arena: General information, Electrical Data](https://allianz-arena.com/en/arena/facts/general-information) | 12 MW available from two substations. This is available power, not measured match-day demand or annual consumption. Page gives no date for this figure. |
| PC3 | [IEA: Energy and AI, 2025](https://www.iea.org/reports/energy-and-ai/understanding-the-energy-ai-nexus) | AI-focused hyperscale centres can reach 100 MW or more. The IEA example does not specify an IT-only boundary. The video explicitly chooses 100 MW of computing load per illustrative centre. |

At a continuous 800 MW for 8,760 hours, annual electricity is 7.008 TWh.
Dividing by the EIA household figure gives about **650,000 homes**. The same
method at 120 MW gives about **100,000 homes**. These are annual grid-purchase
equivalents under a continuous-load assumption.

800 ÷ 12 gives about **67 Allianz Arena electrical connections** at their full
available capacity. Eight centres using 100 MW for computing each add to
800 MW of IT load. Cooling and other facility loads require additional power.
AI centres vary widely in size; eight is an illustrative calculation.

The 5 MW pilot is about **4%** of the reported 120 MW phase, a subset rather
than additional capacity. Galaxy’s installed hardware, utilisation and measured
electricity consumption remain unverified.
