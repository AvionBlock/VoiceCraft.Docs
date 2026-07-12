# Packet and Event Flow

This page explains the conceptual flow rather than listing every packet type. It is useful when a setup is partly working: for example, the client connects but no proximity audio plays, or the addon connects but bind never completes.

VoiceCraft has two related planes:

- voice plane:
  player clients send and receive realtime voice data through `VoiceCraft.Server`
- Minecraft state plane:
  Bedrock addons or Java-side plugins send entity, position, world, bind, property, and effect updates through `McHttp`, `McWss`, or `McTcp`

Both planes must be healthy for proximity voice to feel correct.

## High-level flow

1. `VoiceCraft.Server` starts and loads `ServerProperties.json`.
2. Optional NAT port mappings are opened for endpoints with `AutoOpenPort = true`.
3. A player opens `VoiceCraft.Client` and connects to the server UDP endpoint.
4. A Minecraft transport consumer authenticates with its configured token.
5. The Minecraft side creates, discovers, or updates entities.
6. Position, world ID, visibility, mute/deafen, bitmask, and property updates flow into the server world model.
7. Event subscriptions decide which event categories are forwarded.
8. The server sends state needed by connected clients.
9. Clients render the resulting voice behavior locally.

Client login and Minecraft transport login are separate events. One can succeed while the other is still broken.

## 1.7 event model

VoiceCraft `1.7.0` wraps low-level events through event request packets:

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

The wrapped event carries an `EventType`, such as:

- `OnEntityCreated`
- `OnEntityDestroyed`
- `OnEntityPositionUpdated`
- `OnEntityRotationUpdated`
- `OnEntityPropertyUpdated`
- `OnEntityAudioReceived`
- `OnEntityAudioDataReceived`

This keeps event delivery separate from ordinary request/response packets and allows integrations to subscribe to the events they need.

## Entity properties

Entity properties are named values attached to an entity. They are used for custom metadata and effect overrides.

Property packets include:

- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`

Supported value types are `null`, booleans, integer widths, `float`, and `double`.

The older cave/muffle factor packet path was removed. Debug new custom effect behavior by checking property updates first, then effect processing.

## Bind flow

Bind flow links a Minecraft player or entity to a VoiceCraft-side client identity.

Typical Bedrock flow:

1. The addon connects to `McHttp` or `McWss`.
2. The player runs or receives the in-game bind command.
3. The addon sends bind-related data to VoiceCraft.
4. VoiceCraft associates the voice client with the in-game entity.
5. Position, world, bitmask, and property updates start affecting what the client hears.

Typical Java/Geyser flow:

1. The Java-side bridge connects to `McTcp`.
2. The plugin tracks Java-side player lifecycle and position.
3. The player uses the configured voice bind command.
4. The bridge sends bind/update data to VoiceCraft.

If bind fails, first check token match and transport reachability, then check whether the player has an active VoiceCraft client session.

## Debug by layer

| Symptom | Layer to check first | Typical cause |
|---------|----------------------|---------------|
| Client cannot connect | Voice plane | Wrong server host, UDP port closed, server not running |
| Addon/plugin cannot connect | Minecraft state plane | Wrong transport token, wrong binding, blocked TCP/HTTP/WebSocket path |
| Client connects but hears no proximity | Entity/position state | Bind missing, `PositioningType` mismatch, no position updates |
| Effect overrides do nothing | Property/event state | Integration still sends old cave/muffle packets, missing event subscription, wrong property key/type |
| Audio exists but range/effects feel wrong | Effects/state sync | Wrong effect bitmask, stale entity metadata, mismatched client settings |

## Why this matters

When debugging, it helps to know whether your issue is:

- authentication
- transport reachability
- entity creation
- bind association
- metadata, properties, and position sync
- audio capture/playback

Most real failures happen because one layer is broken while the others still look healthy.
