# Update and Backup

Use this page for routine updates where you expect the topology to stay the same. For larger version jumps or topology changes, use the [Upgrade Runbook](/operations/upgrade-runbook).

## What to Back Up Before Updating

- `config/ServerProperties.json`
- custom scripts/systemd or service manager wrapper
- log history if needed
- VoiceCraft.Java `config.yml` if Java-side integration is used
- Bedrock world pack configuration if the addon is used
- notes for public/LAN hostnames and open ports

Backups contain tokens and topology details. Store them as sensitive operational files.

## Safe Server Update

1. Stop the server (`stop` or via service manager).
2. Back up `config/`.
3. Extract new release into a separate directory.
4. Move your `ServerProperties.json`.
5. Start and validate startup logs.
6. Confirm the selected transport binds successfully.
7. Connect one client and one Minecraft-side integration before opening to all players.

## VoiceCraft 1.6.1 note

VoiceCraft `v1.6.1` requires updating the Bedrock addon packages at the same time as the client/server binaries. The release fixes McHttp/McWss disconnect handling and ships addon-side changes for in-game voice icons, auto connection quality-of-life, and broadcasted events.

## Safe Client Update

Client settings (`Settings.json`) are stored in `ApplicationData/voicecraft`, so they usually survive binary updates.

Still ask a small test group to verify:

- microphone selection
- output device
- saved server entry
- push-to-talk behavior
- `Positioning Type`

## Compatibility

- Client and server `Major/Minor` versions should match.
- Patch versions may differ.
- Bedrock addon packages should match the server/client release when the release notes mention addon-side behavior.
- VoiceCraft.Java should be updated with its matching configuration expectations when using Java-side bridges.

If problems appear after an update, start with [Troubleshooting](/operations/troubleshooting).

## Rollback preparation

Before replacing files, keep:

- previous server binary directory
- previous addon/plugin package
- previous config backup
- last known-good token and port notes

Rollback is much easier when the old directory still exists and the update did not overwrite it in place.
