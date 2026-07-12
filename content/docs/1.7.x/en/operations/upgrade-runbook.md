# Upgrade Runbook

Use this when upgrading VoiceCraft or a related bridge such as `VoiceCraft.Java`.

This runbook is for upgrades that can affect compatibility between server, client, Bedrock addon, and Java-side plugin pieces. VoiceCraft `1.7.0` is one of those upgrades because it changes the event and entity-property model.

## Upgrade order

Recommended order:

1. Back up config and plugin/addon files.
2. Stage new binaries in a separate directory.
3. Stage matching addon or plugin packages.
4. Read release notes for packet, property, and transport assumptions.
5. Stop the old service.
6. Move or copy config into the new install.
7. Review `ServerProperties.json` for new port mapping fields.
8. Update the addon/plugin on the Minecraft side.
9. Start and validate one path at a time.

For VoiceCraft `1.7.0`, do not keep a `1.6.x` custom addon/bridge that depends on cave/muffle factor packets. Move custom logic to entity properties before production rollout.

## 1.7 validation focus

Validate these items specifically:

1. `VoiceCraft.Server` reports version `1.7.0`.
2. Core VoiceCraft UDP endpoint binds.
3. Enabled McHttp, McTcp, or McWss transports bind.
4. NAT port mapping either opens intentionally or remains disabled.
5. A `1.7.x` client connects.
6. The Minecraft integration authenticates.
7. Bind flow works for a real player.
8. Position, rotation, world ID, mute/deafen, and bitmasks update.
9. Entity custom properties update if your integration uses effect overrides.
10. Proximity, visibility, echo, and muffle effects sound correct.

## Event and property migration

`1.7.0` moves low-level event traffic behind event request packets:

- VoiceCraft protocol: `VcEventRequestPacket`
- McApi protocol: `McApiEventRequestPacket`

It also introduces typed entity property packets:

- VoiceCraft protocol: `VcSetPropertyRequestPacket`, `VcOnEntityPropertyUpdatedPacket`
- McApi protocol: `McApiSetEntityPropertyRequestPacket`, `McApiOnEntityPropertyUpdatedPacket`

Supported property values are:

- `null`
- `bool`
- signed and unsigned integer widths from byte through long
- `float`
- `double`

The old cave and muffle factor request/event packet path was removed. Use properties for effect-specific values and override behavior.

## Audio effect migration

The effect stack now uses `IAudioEffectProcessor` instances instead of effects processing directly against every call site. This improves state isolation and lets effect values be cached and updated more predictably.

Operationally, check:

- `DefaultAudioEffectsConfig` still contains the expected bitmask keys
- custom effect JSON uses supported effect fields
- per-entity property overrides are clamped by the effect implementation
- custom worlds do not send non-finite position or rotation values

## NAT port mapping

`AutoOpenPort` is available for the core VoiceCraft UDP endpoint and for Minecraft transports.

Use it only when:

- the server runs behind a home/LAN router that supports UPnP or NAT-PMP
- automatic mapping is allowed by the operator
- you understand which endpoint becomes reachable externally

Avoid it when:

- deploying on a VPS, Docker host, panel host, or managed network
- firewall and port forwarding are already managed outside VoiceCraft
- the transport is intentionally loopback-only

## If upgrading VoiceCraft.Java

Also validate:

- runtime auto-start behavior
- proxy ownership model
- backend snapshot forwarding
- `config.voicecraft.transport.*` values
- `McTcpConfig.LoginToken` match
- custom property packets if your bridge sends effect overrides

For proxy networks, validate one backend first, then server switching.

## If upgrading Bedrock addon packages

Also validate:

- behavior and resource packs are both updated
- BDS permissions still include required modules
- `voicecraft:vcconnect` uses the correct transport token
- `voicecraft:vcbind <key>` works for a real player
- addon-side scripts use property updates for 1.7 effect customization
- in-game indicators/events match the expected release behavior

## Rollback trigger examples

Consider rollback when:

- auth suddenly fails on a previously working token
- transports no longer bind as expected
- packet parsing errors appear after a custom integration connects
- custom effects stop responding to world state
- plugin-managed runtime never becomes ready
- cross-server proxy voice state becomes inconsistent
- a matching addon/plugin package is not available for the new server/client release

## Rollback workflow

1. Stop the new service.
2. Restore the previous binary directory.
3. Restore previous `ServerProperties.json` and plugin/addon configs.
4. Restore previous addon/plugin package on Minecraft side.
5. Start the old service.
6. Validate client, transport auth, bind, and proximity.
