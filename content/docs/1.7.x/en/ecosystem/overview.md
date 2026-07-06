# VoiceCraft Ecosystem

VoiceCraft is not just one binary. It is a small ecosystem of repositories and runtime layers that can be combined in different ways.

The main idea is simple: players run `VoiceCraft.Client`, one backend runs or manages `VoiceCraft.Server`, and a Minecraft-side integration sends game state into the server. Which integration you choose depends on whether your Minecraft runtime is Bedrock, local Bedrock, direct Paper, or a proxy network.

## Core repositories

| Repository | What it owns | Use it when |
|------------|--------------|-------------|
| `VoiceCraft` | client apps, standalone server, protocol, shared core code, Minecraft-facing transports | you need the core server/client runtime or want to build from source |
| `GeyserVoice` / Java bridge | Java-side bridge for Paper, Velocity, and BungeeCord | you run Java, Geyser/Floodgate, or a proxy network |
| `VoiceCraft.Addon` | Bedrock addon packages and scriptable McApi surface | you run Bedrock worlds or want custom addon behavior |

The primary source repository for core VoiceCraft development is the GitLab project. The GitHub repository is a public mirror and release distribution point.

## What 1.7 adds to the ecosystem

VoiceCraft `1.7.0` is mostly a core runtime and protocol release:

- event subscriptions and event packet wrapping were reworked
- entity custom properties became the extension point for effect overrides
- the audio effect stack was rebuilt around processors
- NAT port mapping became available for the server and transports
- iOS packaging gained a privacy manifest and local-network permission text
- the browser/web client target was removed

Integrations that use only stock packages mostly need matching releases. Custom integrations should review the 1.7 packet and property model.

## Deployment map

```mermaid
flowchart LR
  A["VoiceCraft Client"] --> B["VoiceCraft UDP Server"]
  C["Bedrock Addon (McHttp / McWss)"] --> D["Minecraft API Transport"]
  D --> B
  E["Java Bridge (Paper / Proxy)"] --> F["McTcp Bridge"]
  F --> B
```

The client and Minecraft integration do not connect through the same path. The client uses the VoiceCraft UDP endpoint. The Minecraft integration uses `McHttp`, `McWss`, or `McTcp`.

## Typical stacks

### Bedrock Dedicated Server

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft clients
- BDS script/module permissions needed by the addon

Use this for production Bedrock servers where BDS can reach an HTTP endpoint.

### Local Bedrock world

- local VoiceCraft stack
- `VoiceCraft.Addon.Core.McWss`
- local `/connect` websocket flow

Use this for singleplayer, demos, and addon testing.

### Java server with Geyser / Floodgate

- Java-side VoiceCraft bridge
- `VoiceCraft.Server`
- optionally a managed runtime started by the bridge itself
- `McTcp` as the VoiceCraft-facing bridge

Use this when Java-side server state is the source of player positions and bind flow.

### Java proxy network

- bridge plugin on proxy
- bridge plugin on backend Paper servers
- `VoiceCraft.Server` reached through `McTcp`
- backend nodes stream snapshots to the proxy

Use this when one proxy should own the central VoiceCraft connection for multiple backend servers.

## Choosing where to start

- New Bedrock Dedicated Server:
  start with [Quick Start](/start/quick-start), then [McHttp for BDS](/minecraft/mchttp-bds).
- Local Bedrock testing:
  start with [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).
- Java + Geyser/Floodgate:
  start with [GeyserVoice](/ecosystem/geyservoice).
- Custom Bedrock behavior:
  read [VoiceCraft.Addon](/ecosystem/voicecraft-addon), then [Addon API](/ecosystem/addon-api).

## Continue with

- [VoiceCraft repository and build](/ecosystem/voicecraft-repository)
- [GeyserVoice overview](/ecosystem/geyservoice)
- [VoiceCraft.Addon overview](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Integration recipes](/ecosystem/integration-recipes)
- [Production blueprints](/ecosystem/production-blueprints)
