# Backup and Restore Runbook

This page focuses on practical backup and restore steps.

Use it before risky changes: upgrades, token rotation, transport changes, host migration, or switching between Bedrock and Java-side topologies.

## What to back up

Minimum:

- `config/ServerProperties.json`
- service wrapper files
- deployment notes for ports and tokens

Recommended:

- previous release artifacts
- logs around the last good known state
- plugin configs such as `VoiceCraft.Java/config.yml`
- Bedrock world pack config files
- addon package versions currently installed in the world
- service manager files such as systemd units or panel startup commands
- runtime override notes if startup flags are used

## Before changing anything

Take a snapshot when you are about to:

- upgrade VoiceCraft
- change transports
- rotate tokens
- switch topology
- change host bindings or firewall rules
- move from plugin-managed runtime to external runtime

## Restore workflow

1. Stop the affected service.
2. Restore `ServerProperties.json`.
3. Restore related plugin or addon config if the topology changed.
4. Restore the matching addon/plugin package if version compatibility matters.
5. Restart VoiceCraft.
6. Restart or reload the Minecraft-side integration.
7. Validate transport auth and bind flow.

## What a restore does not fix automatically

- firewall mistakes
- DNS or host reachability issues
- mismatched client or plugin config
- topology mistakes after a network redesign
- a provider that blocks the required transport path
- players using a newer incompatible client package

## Validation after restore

Check:

1. server starts cleanly
2. chosen transport is enabled
3. token matches the integrating node
4. player bind and audio flow work again
5. server commands show expected clients/entities
6. logs no longer show the error that triggered the restore

## Backup naming

Use names that include:

- date
- VoiceCraft version
- topology
- reason

Example:

```text
2026-05-13-voicecraft-1.6.1-bds-before-token-rotation
```

Good names matter during incidents because they make it obvious which backup belongs to which topology.
