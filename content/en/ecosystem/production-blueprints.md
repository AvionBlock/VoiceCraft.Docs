# Production Blueprints

This page summarizes sane production approaches instead of raw feature lists.

## Blueprint 1: Bedrock-only server

Use:

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

Why:

- cleanest stable Bedrock deployment
- easiest to monitor
- easiest to explain to server staff

## Blueprint 2: Local community / SMP with Geyser

Use:

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` direct Paper mode

Optional:

- let GeyserVoice manage the VoiceCraft runtime if you prefer a single Java-side install flow

## Blueprint 3: Large Java network

Use:

- external `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` on proxy
- `GeyserVoice` on backend nodes

Why:

- central control
- cleaner scaling
- easier restarts without touching every backend

## Blueprint 4: Builder / test environment

Use:

- `McWss`
- `Core.McWss`
- a local VoiceCraft instance

Why:

- fast local loop
- good for testing addon automation

## Operational recommendations

- store VoiceCraft logs separately from game logs when possible
- rotate or archive configs before large upgrades
- keep transport tokens secret
- test bind flow after every topology change
