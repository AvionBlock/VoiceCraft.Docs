# Upgrade Runbook

Use this when upgrading VoiceCraft or a related bridge such as `GeyserVoice`.

## Upgrade order

Recommended order:

1. back up config
2. stage new binaries separately
3. stage matching addon or plugin packages
4. read transport and topology assumptions
5. stop the old service
6. move config into the new install
7. update the addon/plugin on the Minecraft side
8. start and validate

For VoiceCraft `v1.6.1`, do not leave the old Bedrock addon in place. Update the addon together with the client/server release before validating bind flow and in-game indicators.

## Why separate directories help

A separate extracted directory makes rollback easier because:

- old binaries are still intact
- config migration is explicit
- you can compare release layouts

## Validate after upgrade

At minimum:

1. VoiceCraft starts
2. transport ports bind
3. client connects
4. addon or plugin authenticates
5. bind flow works
6. in-game voice icons or addon events appear when expected
7. proximity audio works

## If upgrading GeyserVoice

Also validate:

- runtime auto-start behavior
- proxy ownership model
- backend snapshot forwarding

## Rollback trigger examples

Consider rollback when:

- auth suddenly fails on a previously working token
- transports no longer bind as expected
- plugin-managed runtime never becomes ready
- cross-server proxy voice state becomes inconsistent
