# Overview

VoiceCraft is a proximity voice platform for Minecraft Bedrock Edition and related bridge scenarios.

It lets players run a separate voice client while Minecraft-side automation tells the voice server where each player is, which world they are in, and which effects or visibility rules should apply.

VoiceCraft is useful when you want proximity voice without depending on one exact Minecraft server shape. The same core runtime can be combined with Bedrock addons, Java/Geyser bridges, or proxy deployments.

## What you are setting up

Most deployments have three moving pieces:

1. `VoiceCraft.Client`
   desktop and mobile app installed by each player
2. `VoiceCraft.Server`
   standalone backend for voice traffic, state sync, moderation, and transport endpoints
3. Minecraft-facing transports
   `McHttp`, `McWss`, and `McTcp`

Ecosystem integrations connect Minecraft to those transports:

- `VoiceCraft.Addon` for Bedrock worlds and BDS
- `GeyserVoice` for Java / Geyser / proxy stacks

## How it works

1. The client connects to `VoiceCraft.Server` over UDP.
2. The server tracks voice sessions, entities, positions, world IDs, effect bitmasks, and moderation state.
3. A Minecraft-side integration updates the server with gameplay state:
   - `McHttp` for BDS
   - `McWss` for local Bedrock worlds
   - `McTcp` for `GeyserVoice`
4. The client renders proximity audio according to server state and selected local settings.

The voice connection and the Minecraft transport connection are separate. If only one side is connected, the setup may look partly healthy but proximity behavior will still be incomplete.

## Supported client platforms

- Windows (`x86`, `x64`, `arm64`)
- Linux (`x64`, `arm32`, `arm64`)
- macOS (`x64`, `arm64`)
- Android (`arm64`)
- iOS (`arm64`, `.zip`)

## What makes VoiceCraft flexible

- multiple Minecraft transports
- Bedrock addon API surface
- Java-side bridge via `GeyserVoice`
- configurable effects and entity metadata
- both server-side and client-side positioning modes

That flexibility also means the first decision matters: choose the topology first, then follow the guide for that transport.

## Common topology choices

| If you run... | Start with... | Why |
|---------------|---------------|-----|
| Bedrock Dedicated Server | [McHttp for BDS](/minecraft/mchttp-bds) | BDS can call a stable HTTP endpoint |
| Local Bedrock world | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) | Works through local websocket/command tunnel flow |
| Java server with Geyser/Floodgate | [GeyserVoice](/ecosystem/geyservoice) | Java-side plugin bridges into VoiceCraft through `McTcp` |
| Direct Paper server | [GeyserVoice Direct Paper](/ecosystem/geyservoice-direct-paper) | Plugin can either use an external server or manage the runtime |

## What to read next

- [Quick Start](/start/quick-start)
- [Download](/download)
- [Transport Modes](/server/transports)
- [System Architecture](/architecture/system-architecture)
- [Ecosystem Overview](/ecosystem/overview)
