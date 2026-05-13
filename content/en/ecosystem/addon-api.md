# Addon API

`VoiceCraft.Addon` exposes a script-driven McApi layer that is much wider than just `vcbind`.

This page is aimed at addon and world developers.

Use the API when the stock addon behavior is not enough: custom binding rules, custom effects, region-specific voice behavior, scripted fake entities, staff tools, or game-mode-specific visibility logic.

Start with the stock `Basic` package first. Once transport, bind, and proximity work, add custom packet/event logic gradually.

## High-level API surface

The addon-side API exposes:

- connection lifecycle
- packet send / receive
- entity creation and destruction
- world ID, position, rotation, mute, deafen, and bitmask updates
- effect updates
- audio-received events

The API exists so the world can decide what voice should mean in its gameplay. VoiceCraft provides the transport and state model; your addon logic can decide how to map tags, roles, regions, dimensions, or scripted entities onto that model.

## High-level events

From the current API layer:

- `OnConnected`
- `OnDisconnected`
- `OnPlayerBind`
- `OnPlayerUnbind`
- `OnPacket`

VoiceCraft `v1.6.1` expands this event-driven path with broadcasted events used by the addon packages, so world scripts can react to connection, binding, and packet activity without custom polling.

Script events used by the system include:

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

## Packet-level coverage

Current exposed packet events include categories such as:

- login / logout / ping
- accept / deny / reset responses
- entity create / destroy
- title / description / name updates
- mute / deafen / server mute / server deafen
- talk / listen / effect bitmask
- position / rotation / world ID
- cave factor / muffle factor
- effect updates
- audio received

This makes the addon API useful not only for stock worlds, but also for custom game modes.

Packet-level hooks are powerful, but they are also easy to overuse. Prefer high-level lifecycle events for normal customization and packet hooks only when you need low-level control.

## Common customization ideas

- auto-binding by team, role, or tag
- custom bind UI
- custom effect presets per biome or area
- region-based world ID remapping
- staff moderation tools through server UI forms
- scripted NPC or fake-entity voice logic

## Basic integration model

Typical addon logic:

1. connect to VoiceCraft transport
2. authenticate
3. create or discover entities
4. bind players
5. update world ID / position / rotation on tick or event
6. react to packet-level updates

For BDS, this usually means `Core.McHttp`. For local worlds, it usually means `Core.McWss`.

## Important implementation notes

- `McWss` mode depends on command tunnel throughput
- effect toggles are encoded through bitmasks
- packet-level automation should be tested carefully on real Bedrock builds
- keep addon packages aligned with the VoiceCraft release when depending on broadcasted events or in-game voice icons
- avoid sending unnecessary high-frequency updates; position updates are useful, but noisy custom packet loops can cause instability
- treat transport login tokens as server credentials, not as player-facing values

## Recommended practice

- start from `Basic` if you need a working reference
- switch to `Core.McHttp` or `Core.McWss` when building a custom experience
- keep your world automation thin at first, then expand packet hooks gradually
- validate every custom feature with at least two players so proximity and bind behavior are exercised

## Debugging custom logic

1. Confirm the stock addon can connect and bind.
2. Add one custom event or packet hook.
3. Check whether the VoiceCraft server still sees entity updates.
4. Test movement across worlds/dimensions if your logic changes world IDs.
5. Disable custom code before blaming transport or audio settings.
