# Addon API

`VoiceCraft.Addon` exposes a script-driven McApi layer that is much wider than just `vcbind`.

This page is aimed at addon and world developers. It focuses on the `1.7.x` API model.

Use the API when the stock addon behavior is not enough: custom binding rules, custom effects, region-specific voice behavior, scripted fake entities, staff tools, or game-mode-specific visibility logic.

## What changed in 1.7

VoiceCraft `1.7.0` changes the low-level API surface in two important ways:

- packet events are wrapped in event request packets
- custom entity properties replace the old cave/muffle factor packet path

This means custom addon code written against `1.6.x` packet names may need migration before it can safely target `1.7.x`.

## High-level API surface

The addon-side API exposes:

- connection lifecycle
- packet send / receive
- entity creation and destruction
- world ID, position, rotation, mute, deafen, and bitmask updates
- custom entity properties
- effect updates
- audio-received and audio-data events

The API exists so the world can decide what voice should mean in its gameplay. VoiceCraft provides the transport and state model; your addon logic can decide how to map tags, roles, regions, dimensions, or scripted entities onto that model.

## High-level events

Common script events include:

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

Prefer these high-level lifecycle hooks for normal customization. Use packet-level hooks when you need precise control over entities, effects, or protocol behavior.

## 1.7 packet model

New event wrapper packets:

- `McApiEventRequestPacket`
- `VcEventRequestPacket`

New property packets:

- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`
- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`

Removed or superseded packet paths:

- `McApiSetEntityCaveFactorRequestPacket`
- `McApiOnEntityCaveFactorUpdatedPacket`
- `McApiSetEntityMuffleFactorRequestPacket`
- `McApiOnEntityMuffleFactorUpdatedPacket`
- `VcSetCaveFactorRequestPacket`
- `VcOnEntityCaveFactorUpdatedPacket`
- `VcSetMuffleFactorRequestPacket`
- `VcOnEntityMuffleFactorUpdatedPacket`

If you used cave or muffle factor packets to drive audio behavior, move that behavior to named properties consumed by the relevant effect.

## Entity properties

Entity properties are named, typed values attached to a VoiceCraft entity.

Supported value types:

- `null`
- `boolean`
- signed and unsigned integer widths from byte through long
- `float`
- `double`

Operational rules:

- property keys are limited by the same max string length used elsewhere in the protocol
- setting a property to `null` removes it
- updates produce `OnEntityPropertyUpdated`
- effect implementations clamp supported override values while evaluating them

Use properties for effect parameters, region flags, custom game-state values, and integration-owned metadata that should travel with the entity.

## Packet-level coverage

Current exposed packet events include categories such as:

- login / logout / ping
- accept / deny / reset responses
- entity create / destroy
- title / description / name updates
- mute / deafen / server mute / server deafen
- talk / listen / effect bitmask
- position / rotation / world ID
- custom property updates
- effect updates
- audio received / audio data received

Packet-level hooks are powerful, but they are also easy to overuse. Avoid unnecessary high-frequency custom loops.

## Audio effect customization

`1.7.0` rewrites the effect stack around per-entity processors. This lets effects cache state more predictably and read entity properties when processing audio.

Default effects still use bitmasks:

- `1`: visibility
- `2`: proximity
- `4`: proximity echo
- `8`: proximity muffle

Custom properties can override supported effect fields such as range or wet/dry behavior, depending on the effect implementation.

## Basic integration model

Typical addon logic:

1. connect to VoiceCraft transport
2. authenticate
3. create or discover entities
4. bind players
5. update world ID / position / rotation on tick or event
6. update properties when world state changes effect behavior
7. react to packet-level updates

For BDS, this usually means `Core.McHttp`. For local worlds, it usually means `Core.McWss`.

## Migration checklist from 1.6

- Replace cave/muffle factor packet usage with property packets.
- Handle `EventRequest` wrappers when reading low-level events.
- Subscribe to the event categories your addon needs.
- Retest custom effects with at least two players.
- Keep addon packages aligned with the VoiceCraft server/client release.

## Debugging custom logic

1. Confirm the stock addon can connect and bind.
2. Add one custom event or packet hook.
3. Check whether the VoiceCraft server still sees entity updates.
4. Test movement across worlds/dimensions if your logic changes world IDs.
5. Test property updates independently from audio effects.
6. Disable custom code before blaming transport or audio settings.
