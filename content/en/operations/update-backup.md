# Update and Backup

## What to Back Up Before Updating

- `config/ServerProperties.json`
- custom scripts/systemd or service manager wrapper
- log history if needed

## Safe Server Update

1. Stop the server (`stop` or via service manager).
2. Back up `config/`.
3. Extract new release into a separate directory.
4. Move your `ServerProperties.json`.
5. Start and validate startup logs.

## VoiceCraft 1.6.1 note

VoiceCraft `v1.6.1` requires updating the Bedrock addon packages at the same time as the client/server binaries. The release fixes McHttp/McWss disconnect handling and ships addon-side changes for in-game voice icons, auto connection quality-of-life, and broadcasted events.

## Safe Client Update

Client settings (`Settings.json`) are stored in `ApplicationData/voicecraft`, so they usually survive binary updates.

## Compatibility

- Client and server `Major/Minor` versions should match.
- Patch versions may differ.

If problems appear after an update, start with [Troubleshooting](/operations/troubleshooting).
