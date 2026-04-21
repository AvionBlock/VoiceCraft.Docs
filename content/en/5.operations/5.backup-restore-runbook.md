# Backup and Restore Runbook

This page focuses on practical backup and restore steps.

## What to back up

Minimum:

- `config/ServerProperties.json`
- service wrapper files
- deployment notes for ports and tokens

Recommended:

- previous release artifacts
- logs around the last good known state
- plugin configs such as `GeyserVoice/config.yml`

## Before changing anything

Take a snapshot when you are about to:

- upgrade VoiceCraft
- change transports
- rotate tokens
- switch topology

## Restore workflow

1. Stop the affected service.
2. Restore `ServerProperties.json`.
3. Restore related plugin or addon config if the topology changed.
4. Restart VoiceCraft.
5. Validate transport auth and bind flow.

## What a restore does not fix automatically

- firewall mistakes
- DNS or host reachability issues
- mismatched client or plugin config
- topology mistakes after a network redesign

## Validation after restore

Check:

1. server starts cleanly
2. chosen transport is enabled
3. token matches the integrating node
4. player bind and audio flow work again
