# Update and Backup

Use this page for routine updates where the topology stays mostly the same. For larger jumps, protocol changes, or topology changes, use the [Upgrade Runbook](/operations/upgrade-runbook).

VoiceCraft `1.7.0` is a minor-version update. Treat it as a coordinated update across server, clients, addon packages, and Java-side bridges rather than a drop-in patch over `1.6.x`.

## What changed in 1.7.0

The `1.7.0` release includes:

- a rewritten audio effect pipeline with per-entity effect processors
- custom entity properties used to override effect behavior
- event request wrapping and event subscription changes for VoiceCraft and McApi packets
- `SetProperty` / `OnEntityPropertyUpdated` packets replacing the old cave and muffle factor packet path
- NAT port mapping support through `OpenPort.Net`
- iOS sample-rate handling fixes and Apple privacy manifest updates
- dependency updates, Android version `17`, and release pipeline changes
- removal of the browser/web client target

Because the wire model changed, keep client and server `Major.Minor` aligned: `1.7.x` clients should be used with `1.7.x` servers.

## What to back up

- `config/ServerProperties.json`
- custom scripts, systemd units, container env, or panel startup settings
- log history if needed
- GeyserVoice or Java bridge configuration
- Bedrock world pack configuration if the addon is used
- notes for public/LAN hostnames, ports, firewall rules, and any port forwarding

Backups contain tokens and topology details. Store them as sensitive operational files.

## Safe server update

1. Stop `VoiceCraft.Server`.
2. Back up the whole `config/` folder.
3. Extract the `1.7.0` release into a new directory.
4. Copy `ServerProperties.json` into the new install.
5. Review transport sections for new NAT port mapping fields.
6. Start the server and validate startup logs.
7. Confirm each enabled transport binds successfully.
8. Connect one client and one Minecraft-side integration before opening to all players.

Do not overwrite the old binary directory in place unless rollback does not matter for that environment.

## ServerProperties.json migration notes

`1.7.0` adds port mapping fields to the core VoiceCraft endpoint and to McHttp, McTcp, and McWss:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` defaults to `false`. Leave it disabled if you already manage port forwarding, run behind a reverse proxy/tunnel, or deploy in a hosted/container environment where UPnP/NAT-PMP is not available.

If you enable it, still keep firewall rules and public exposure intentional. VoiceCraft will skip loopback-bound Minecraft transports, because ports bound to `127.0.0.1` are not meant to be opened to the outside network.

## Addon and bridge updates

Update matching addon or bridge packages together with the server when they depend on 1.7 packet behavior.

Important protocol changes:

- cave and muffle factor packets are no longer the primary customization path
- entity-level custom properties now carry values such as effect overrides
- low-level events are wrapped through event request packets
- subscriptions are event-based rather than tied to the older direct packet flow

Custom addon or bridge code that listened for the removed cave/muffle packet types should move to `SetProperty` and `OnEntityPropertyUpdated`.

## Safe client update

Client settings are stored in `ApplicationData/voicecraft`, so they usually survive binary updates.

Still ask a small test group to verify:

- microphone selection
- output device
- saved server entry
- push-to-talk behavior
- `Positioning Type`
- iOS capture behavior if iOS users previously had sample-rate or distorted-input issues

The browser/web client target is removed in `1.7.0`. Use the native desktop or mobile clients.

## Compatibility

- Client and server `Major.Minor` versions should match.
- Patch versions may differ.
- Bedrock addon packages should match the server/client release when release notes mention addon-side behavior.
- GeyserVoice or other Java-side bridges should be updated with matching packet and property expectations.
- Custom packet integrations must be retested against the 1.7 event/property model.

## Rollback preparation

Before replacing files, keep:

- previous server binary directory
- previous addon/plugin package
- previous config backup
- last known-good token and port notes

Rollback is much easier when the old directory still exists and the update did not overwrite it in place.
