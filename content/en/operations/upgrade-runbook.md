# Upgrade Runbook

Use this when upgrading VoiceCraft or a related bridge such as `GeyserVoice`.

This runbook is for upgrades that can affect compatibility between server, client, Bedrock addon, and Java-side plugin pieces. The goal is to keep a rollback path while proving the whole stack still works.

## Upgrade order

Recommended order:

1. Back up config and plugin/addon files.
2. Stage new binaries in a separate directory.
3. Stage matching addon or plugin packages.
4. Read release notes for transport and topology assumptions.
5. Stop the old service.
6. Move or copy config into the new install.
7. Update the addon/plugin on the Minecraft side.
8. Start and validate one path at a time.

For VoiceCraft `v1.6.1`, do not leave the old Bedrock addon in place. Update the addon together with the client/server release before validating bind flow and in-game indicators.

## Why separate directories help

A separate extracted directory makes rollback easier because:

- old binaries are still intact
- config migration is explicit
- you can compare release layouts

## Validate after upgrade

At minimum:

1. VoiceCraft starts.
2. Transport ports bind.
3. Client connects.
4. Addon or plugin authenticates.
5. Bind flow works.
6. In-game voice icons or addon events appear when expected.
7. Proximity audio works.
8. Server commands such as `list --clientsOnly` show expected clients.

## If upgrading GeyserVoice

Also validate:

- runtime auto-start behavior
- proxy ownership model
- backend snapshot forwarding
- `config.voicecraft.transport.*` values
- `McTcpConfig.LoginToken` match

For proxy networks, validate one backend first, then server switching.

## If upgrading Bedrock addon packages

Also validate:

- behavior and resource packs are both updated
- BDS permissions still include required modules
- `voicecraft:vcconnect` uses the correct transport token
- `voicecraft:vcbind <key>` works for a real player
- in-game indicators/events match the expected release behavior

## Rollback trigger examples

Consider rollback when:

- auth suddenly fails on a previously working token
- transports no longer bind as expected
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
