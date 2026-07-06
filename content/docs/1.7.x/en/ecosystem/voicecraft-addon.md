# VoiceCraft.Addon (Bedrock Addon)

Repository: [AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

This repository contains practical Bedrock addon packages and the script-side McApi surface for custom world logic.

Use it when Minecraft Bedrock is the source of player/entity state. The addon connects Bedrock worlds to the VoiceCraft server through either `McHttp` or `McWss`, then exposes bind flow, UI, events, and packet helpers for world scripts.

Quick links:

- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
- [Addon Releases](https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest)

## Packages

| Package | Purpose | Use when |
|---------|---------|----------|
| `Basic` | ready-to-use bind flow, settings UI, in-game voice indicators, common script events | you want a working reference or default Bedrock behavior |
| `Core.McHttp` | HTTP transport package | you run Bedrock Dedicated Server |
| `Core.McWss` | websocket / command-tunnel transport package | you run a local Bedrock world or test setup |

Most real Bedrock setups combine a transport package with the behavior/UI pieces needed by the world.

## Version alignment

VoiceCraft `1.7.0` requires addon packages that understand the 1.7 event and property model if your world uses low-level packet customization.

Do not upgrade the server/client and leave an old custom addon package in the world. Mismatched packages can connect but fail later during bind, event forwarding, property updates, or effect customization.

## What changed for addon developers in 1.7

- low-level events are delivered through `EventRequest` wrappers
- entity properties are the supported path for custom effect values
- cave and muffle factor packets were removed from the core protocol path
- `OnEntityPropertyUpdated` is the event to watch for property changes
- audio effects can read supported property overrides during processing

Stock packages should be updated as a set. Custom packages should be tested against the 1.7 server before production rollout.

## Namespace

Across packages:

- `VoiceCraft.Namespace = "voicecraft"`

## Commands

### Basic

- `voicecraft:vcbind <binding_key>`
  permission: `Any`
- `voicecraft:vcsettings`
  permission: `GameDirectors`

### Core.McHttp

- `voicecraft:vcconnect <hostname> <token>`
  permission: `GameDirectors`

### Core.McWss

- `voicecraft:vcconnect <token>`
  permission: `Host`
- `voicecraft:data_tunnel [max_string_length] [data]`
  permission: `Host`

## What the Basic package gives you

- bind / unbind flow
- player settings UI
- effect toggles
- script events for automation
- in-game indicators used by supported releases

Start from `Basic` if you want to understand the expected player experience before writing custom addon logic.

## Bind flow details

Typical flow:

1. a new network entity receives a short binding key
2. entity description is updated with the key prompt
3. player runs `voicecraft:vcbind <key>`
4. entity binds to the player
5. on leave, unbind happens and a new key is generated

Script events:

- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`

The binding key is intentionally short because it is typed in game. Treat it as a temporary link token, not as a long-term secret.

## Effects UI

`voicecraft:vcsettings` exposes:

- Visibility
- Proximity
- Directional
- Proximity Echo
- Echo
- Proximity Muffle
- Muffle

Effects are toggled through effect packets and bitmasks. In `1.7.x`, deeper effect customization should use entity properties.

## What you can customize

- bind / unbind policy
- role or tag based restrictions
- world ID rules
- position / rotation update behavior
- entity property updates for effect overrides
- staff forms through `@minecraft/server-ui`
- packet handlers around the McApi surface

Customize only after a basic stock setup works. That gives you a known-good baseline for transport, bind, and position behavior.

## Current limitations

- `Core.McWss` stability depends on command and payload limits
- host/provider restrictions can block the network path required by `Core.McHttp`
- custom packet handlers need testing on the target Bedrock version
- custom 1.6 cave/muffle packet code must be migrated to properties

## Recommended setup: BDS

1. enable `McHttpConfig.Enabled = true`
2. ensure BDS can reach `McHttpConfig.Hostname`
3. copy the `Core.McHttp` package
4. run `voicecraft:vcconnect <hostname> <token>`
5. validate bind with `voicecraft:vcbind <key>`

## Recommended setup: local world

1. enable `McWss`
2. install `Core.McWss`
3. run `/connect`
4. run `voicecraft:vcconnect <token>`
5. keep `voicecraft:data_tunnel` aligned with server config

## Validation checklist

- correct transport package is installed
- both behavior and resource packs are active
- `vcconnect` uses the token from the matching server config section
- player can bind with `voicecraft:vcbind <key>`
- player movement changes position data in VoiceCraft
- effects UI opens for authorized users
- property updates work if the world uses 1.7 effect overrides

## Read next

- [Addon API](/ecosystem/addon-api)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
