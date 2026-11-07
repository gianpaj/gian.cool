# Five-minute narrative backbone

Working angle: follow electricity from a wind turbine to an AI accelerator. The news is an operating high-voltage DC pilot inside a fast-growing Chinese campus. The scale matters, but the engineering is the explanation.

This follows the fax reference's concrete object, short explanatory beats and worked example. It does not copy the fax film's visual treatment. About 615 spoken words at 135–145 words a minute leaves roughly 20–40 seconds for diagrams, pauses and credits within five minutes. Timing is provisional research guidance, not a production specification. Source IDs and caveats are in `evidence.md`.

## 0:00–0:40 · Start with what is actually there

An AI model needs electricity before it can answer a question. In Ulanqab, in China's Inner Mongolia, a wind turbine maker is building an AI campus around that fact.

SemiAnalysis visited Envision's Galaxy campus in September. Its report describes a first phase of 120 megawatts delivered in August, within a year. The campus plan reaches 800 megawatts of IT capacity. Those are different milestones. One describes a delivered phase; the other describes a future buildout.

Visual material: Galaxy exterior references only after permission; otherwise regional wind photo and an original phase diagram. [S1–S4]

## 0:40–1:20 · Explain the machine

Inside an AI data centre, racks hold accelerators, memory and networking equipment. Training adjusts a model using examples. Inference runs that model to generate an answer. Both require chips to move data and do calculations, often together across a network.

The electricity also becomes heat. Cooling equipment has to move that heat out of the building. That is why megawatts alone cannot tell us how much useful AI a campus produces. The chips, network, software and how fully the equipment is used all matter.

Visual material: generic server racks, H100 card explicitly labelled illustrative, cooling pipes. Never imply these photographs were taken inside Galaxy. [S7; original explanatory synthesis]

## 1:20–2:15 · Follow the voltage

The most interesting number in this report may be five megawatts. That is the size of a pilot hall where SemiAnalysis says it saw an 800-volt direct-current system operating.

Envision separately says its system converts 10,000-volt alternating current to an 800-volt DC bus using solid-state transformers. Batteries help the supply cope with rapid changes in demand. Rack electronics still have to reduce that voltage further before it reaches the chips.

Why raise the voltage? In a simple DC example, delivering 100 kilowatts at 400 volts requires 250 amps. At 800 volts, it takes 125 amps. Less current means less heating in the same conductor. This arithmetic explains the attraction. It does not measure the pilot's actual savings.

NVIDIA is pursuing 800-volt infrastructure too. Galaxy offers a reported commercial example of a change being debated across the industry.

Visual material: redraw the power path from `diagram-inputs.json`; reveal the two current values sequentially. Do not copy a vendor schematic. [S1, S3, S5]

## 2:15–3:05 · Wind is variable

Envision also makes the turbines and storage. SemiAnalysis reports 420 megawatts of wind capacity paired with a 240-megawatt data-centre load in its discussion of the first two phases.

A wind farm's rating describes its output at full power. The wind does not blow at full strength all year. A battery can shift energy from windy hours into calmer ones, but a four-hour system does not solve a wind drought lasting days.

The article says Envision aims to supply more than 60 percent of those phases' electricity with its own wind. That is a target, not proof that the campus runs continuously on renewable electricity. We do not have its hourly operating data.

Visual material: real regional turbines, then a conceptual wind/load diagram. Label all invented curves illustrative. [S1]

## 3:05–3:45 · Cooling is still work

The report also describes a shared water loop for liquid-cooled and air-cooled equipment, without a central chiller plant. Cold conditions can help reject heat without mechanical refrigeration.

But chiller-free does not mean cooling-free, or water-free. Pumps and outdoor heat exchangers still do work. There is an unresolved disagreement here: Epoch AI classifies the site's cooling equipment as air-cooled chillers. We need equipment details to settle that.

Visual material: generic cooling photograph followed by a simple heat-flow diagram, clearly labelled as an explanation. [S1, S4, S7]

## 3:45–5:00 · Establish the limits and payoff

Epoch AI estimates roughly 118 megawatts of current IT capacity, close to the reported first phase. Its estimate relies partly on satellite imagery and assumptions about equipment installation. It is not a meter reading.

The larger plans are harder to reconcile. Envision's November announcement calls Galaxy a planned three-gigawatt campus; SemiAnalysis assigns three gigawatts to Envision's wider regional plans. We should not turn either number into operating capacity.

Nor does a completed building prove which chips are inside. Advanced-chip supply faces changing export restrictions. We have no confirmed inventory for this campus, and no evidence here of an export violation.

What makes Galaxy worth watching is the connection between energy equipment and computing infrastructure. The next evidence to look for is delivered capacity, measured electricity use and useful computing output. That will show how much of the ambition becomes a working machine.

Visual material: phase-status chart, dated sources, then return to the turbine-to-rack diagram. Leave 10–15 seconds for readable credits. [S1–S5, S9]
