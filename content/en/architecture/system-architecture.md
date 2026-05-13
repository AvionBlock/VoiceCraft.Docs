# System Architecture

VoiceCraft is a proximity voice stack, not a single Minecraft mod. The client carries microphone audio, the server owns voice sessions and shared state, and the Minecraft integration layer tells the server where players are and how they should be represented.

The separation is intentional: the same voice server can work with Bedrock Dedicated Server, local Bedrock worlds, direct Paper servers, and proxy networks as long as the correct Minecraft-facing transport is connected.

## Main layers

| Layer | Main responsibility | Typical install location |
|-------|---------------------|--------------------------|
| `VoiceCraft.Client` | Captures microphone input, sends voice packets, plays nearby voices, stores local audio preferences. | Player device |
| `VoiceCraft.Server` | Accepts voice clients, stores entity state, applies moderation flags and audio effect defaults, exposes Minecraft transports. | VPS, game host, local PC, or plugin-managed runtime |
| Minecraft integration | Sends player/entity position and lifecycle data from Minecraft into VoiceCraft. | Bedrock addon, Paper plugin, or proxy plugin |

### Client layer

`VoiceCraft.Client` handles:

- microphone capture and preprocessing
- push-to-talk, mute, deafen, input/output device selection
- UDP connection to `VoiceCraft.Server`
- playback of nearby voices based on server state
- local per-user volume and local mute preferences

The client does not discover Minecraft player positions by itself in the normal server-side model. It depends on the server and Minecraft integration to provide entity and world state.

### Server layer

`VoiceCraft.Server` handles:

- VoiceCraft UDP client sessions
- network entity state and bind state
- server-side moderation flags
- effect bitmasks and audio effect defaults
- Minecraft-facing transports: `McHttp`, `McWss`, and `McTcp`
- persistent configuration in `config/ServerProperties.json`

The server is the shared runtime that both the player clients and the Minecraft-side integration must agree on. If the client connects but Minecraft does not, players may appear as voice sessions without useful world position data.

### Minecraft integration layer

This depends on topology:

- `VoiceCraft.Addon.Core.McHttp` for Bedrock Dedicated Server
- `VoiceCraft.Addon.Core.McWss` for local Bedrock worlds and command-tunnel setups
- `GeyserVoice` for Java, Geyser/Floodgate, Paper, Velocity, and BungeeCord topologies

The integration layer is responsible for translating game events into VoiceCraft state: player joins, player leaves, position updates, world identifiers, bind requests, fake entities, effect changes, and connection lifecycle.

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

Network clients can be represented as entities, and Minecraft integrations can also create or update entities. This model lets VoiceCraft describe real players, fake/display entities, and custom world-driven voice targets through the same state pipeline.

## Why transports are separate

VoiceCraft voice traffic and Minecraft automation do not always live in the same environment.

That is why:

- the player client talks to the core UDP voice server
- Bedrock or Java integration talks through a Minecraft transport
- each transport can have its own token, host binding, and max client limit

This separation lets you keep the voice server stable while changing the Minecraft integration. For example, a Bedrock-only deployment can use `McHttp`, while a Java/Geyser network can keep the same core voice server but switch the Minecraft side to `McTcp`.

## Typical connection shapes

### Bedrock Dedicated Server

```text
VoiceCraft.Client -> VoiceCraft UDP server
BDS + VoiceCraft.Addon.Core.McHttp -> McHttp endpoint
```

Use this when the Bedrock server can reach an HTTP endpoint exposed by `VoiceCraft.Server`.

### Local Bedrock world

```text
VoiceCraft.Client -> VoiceCraft UDP server
Minecraft local world + Core.McWss -> McWss websocket endpoint
```

Use this for local testing or singleplayer worlds where a command tunnel is acceptable.

### Java + Geyser/Floodgate

```text
VoiceCraft.Client -> VoiceCraft UDP server
GeyserVoice -> McTcp endpoint
```

Use this when Java-side infrastructure is the source of player position and lifecycle state.

## What to configure first

1. Configure `VoiceCraft.Server` and confirm it starts cleanly.
2. Choose the Minecraft transport that matches the topology.
3. Make sure the client connects to `VoiceCraftConfig.Port`.
4. Make sure the Minecraft integration authenticates with the matching transport token.
5. Validate bind flow and position updates before adding more custom behavior.
