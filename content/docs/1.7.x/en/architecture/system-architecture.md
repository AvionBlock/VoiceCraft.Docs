# System Architecture

VoiceCraft is a proximity voice stack, not a single Minecraft mod. The client carries microphone audio, the server owns voice sessions and shared state, and the Minecraft integration layer tells the server where players are and how they should be represented.

The separation is intentional: the same voice server can work with Bedrock Dedicated Server, local Bedrock worlds, direct Paper servers, and proxy networks as long as the correct Minecraft-facing transport is connected.

## Main layers

| Layer | Main responsibility | Typical install location |
|-------|---------------------|--------------------------|
| `VoiceCraft.Client` | Captures microphone input, sends voice packets, plays nearby voices, stores local audio preferences. | Player device |
| `VoiceCraft.Server` | Accepts voice clients, stores entity state, applies moderation flags and audio effect defaults, exposes Minecraft transports. | VPS, game host, local PC, hosted dashboard runtime, or plugin-managed runtime |
| Minecraft integration | Sends player/entity position and lifecycle data from Minecraft into VoiceCraft. | Bedrock addon, Paper plugin, or proxy plugin |

## Client layer

`VoiceCraft.Client` handles:

- microphone capture and preprocessing
- push-to-talk, mute, deafen, input/output device selection
- UDP connection to `VoiceCraft.Server`
- playback of nearby voices based on server state
- local per-user volume and local mute preferences

In `1.7.0`, native desktop and mobile clients remain the supported path. The browser/web client project was removed.

## Server layer

`VoiceCraft.Server` handles:

- VoiceCraft UDP client sessions
- network entity state and bind state
- server-side moderation flags
- entity properties
- effect bitmasks and audio effect defaults
- per-entity audio effect processors
- Minecraft-facing transports: `McHttp`, `McWss`, and `McTcp`
- optional NAT port mapping
- persistent configuration in `config/ServerProperties.json`

If the client connects but Minecraft does not, players may appear as voice sessions without useful world position data.

## Minecraft integration layer

This depends on topology:

- `VoiceCraft.Addon.Core.McHttp` for Bedrock Dedicated Server
- `VoiceCraft.Addon.Core.McWss` for local Bedrock worlds and command-tunnel setups
- Java-side bridge integrations for Paper, Geyser/Floodgate, Velocity, and BungeeCord topologies through `McTcp`

The integration layer is responsible for translating game events into VoiceCraft state: player joins, player leaves, position updates, world identifiers, bind requests, fake entities, effect changes, property changes, and connection lifecycle.

## Core data concepts

VoiceCraft revolves around entities rather than only raw sockets.

Entities carry state such as:

- name
- title
- description
- position
- rotation
- world ID
- mute / deafen state
- effect bitmasks
- custom properties

Network clients can be represented as entities, and Minecraft integrations can also create or update entities. This model lets VoiceCraft describe real players, fake/display entities, and custom world-driven voice targets through the same state pipeline.

## Audio effects in 1.7

The audio effect stack was rebuilt in `1.7.0`.

Effects now:

- keep their configured bitmask
- create `IAudioEffectProcessor` instances for entities
- cache values before processing audio
- can read supported entity property overrides

This is why cave/muffle factor packets were replaced by the property model. The server can carry custom world state on the entity and let the active effect decide how to interpret it.

## Why transports are separate

VoiceCraft voice traffic and Minecraft automation do not always live in the same environment.

That is why:

- the player client talks to the core UDP voice server
- Bedrock or Java integration talks through a Minecraft transport
- each transport can have its own token, host binding, max client limit, and optional port mapping behavior

This separation lets you keep the voice server stable while changing the Minecraft integration.

## Typical connection shapes

### Bedrock Dedicated Server

```text
VoiceCraft.Client -> VoiceCraft UDP server
BDS + VoiceCraft.Addon.Core.McHttp -> McHttp endpoint
```

### Local Bedrock world

```text
VoiceCraft.Client -> VoiceCraft UDP server
Minecraft local world + Core.McWss -> McWss websocket endpoint
```

### Java + Geyser/Floodgate

```text
VoiceCraft.Client -> VoiceCraft UDP server
Java-side bridge -> McTcp endpoint
```

## What to configure first

1. Configure `VoiceCraft.Server` and confirm it starts cleanly.
2. Choose the Minecraft transport that matches the topology.
3. Decide whether `AutoOpenPort` should remain disabled.
4. Make sure the client connects to `VoiceCraftConfig.Port`.
5. Make sure the Minecraft integration authenticates with the matching transport token.
6. Validate bind flow and position updates before adding custom properties or effect overrides.
