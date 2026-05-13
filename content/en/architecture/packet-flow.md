# Packet and Event Flow

This page explains the conceptual flow rather than listing every packet type. It is useful when a setup is partly working: for example, the client connects but no proximity audio plays, or the addon connects but bind never completes.

VoiceCraft has two related planes:

- voice plane:
  player clients send and receive realtime voice data through `VoiceCraft.Server`
- Minecraft state plane:
  Bedrock addons or Java-side plugins send entity, position, world, bind, and effect updates through `McHttp`, `McWss`, or `McTcp`

Both planes must be healthy for proximity voice to feel correct.

## High-level flow

1. `VoiceCraft.Server` starts and loads `ServerProperties.json`.
2. A player opens `VoiceCraft.Client` and connects to the server UDP endpoint.
3. A Minecraft transport consumer authenticates with its configured token.
4. The Minecraft side creates, discovers, or updates entities.
5. Position, world ID, visibility, mute/deafen, and effect updates flow into the server world model.
6. The server sends state needed by connected clients.
7. Clients render the resulting voice behavior locally.

The order can vary slightly by topology, but the important point is that client login and Minecraft transport login are separate events. One can succeed while the other is still broken.

## Typical event categories

- login / logout
- ping / info
- entity create / destroy
- metadata updates
- moderation updates
- effect updates
- audio transfer events

## Bind flow

Bind flow links a Minecraft player or entity to a VoiceCraft-side client identity.

Typical Bedrock flow:

1. The addon connects to `McHttp` or `McWss`.
2. The player runs or receives the in-game bind command.
3. The addon sends bind-related data to VoiceCraft.
4. VoiceCraft associates the voice client with the in-game entity.
5. Position and world updates start affecting what the client hears.

Typical Java/Geyser flow:

1. `GeyserVoice` connects to `McTcp`.
2. The plugin tracks Java-side player lifecycle and position.
3. The player uses the configured voice bind command.
4. `GeyserVoice` sends the bind/update data to VoiceCraft.

If bind fails, first check token match and transport reachability, then check whether the player has an active VoiceCraft client session.

## Debug by layer

| Symptom | Layer to check first | Typical cause |
|---------|----------------------|---------------|
| Client cannot connect | Voice plane | Wrong server host, UDP port closed, server not running |
| Addon/plugin cannot connect | Minecraft state plane | Wrong transport token, wrong binding, blocked TCP/HTTP/WebSocket path |
| Client connects but hears no proximity | Entity/position state | Bind missing, `PositioningType` mismatch, no position updates |
| Audio exists but range/effects feel wrong | Effects/state sync | Wrong effect bitmask, stale entity metadata, mismatched client settings |

## Why this matters

When debugging, it helps to know whether your issue is:

- authentication
- transport reachability
- entity creation
- bind association
- metadata and position sync
- audio capture/playback

Most real failures happen because one of those layers is broken while the others still look healthy.
