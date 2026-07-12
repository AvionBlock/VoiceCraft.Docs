# Troubleshooting

Start by identifying which part of the stack is failing. VoiceCraft has separate client, server, and Minecraft transport paths, so one part can work while another is still broken.

Recommended order:

1. Confirm `VoiceCraft.Server` starts cleanly.
2. Confirm a VoiceCraft client can connect to the UDP endpoint.
3. Confirm the Minecraft-side transport authenticates.
4. Confirm bind flow completes.
5. Confirm position/world updates change proximity behavior.
6. Only then tune microphone, volume, effects, or custom addon logic.

## Server does not start

Check:

1. `config/ServerProperties.json` is valid JSON.
2. No other process is already using the configured ports.
3. `McHttpConfig.Hostname` uses `http://.../`.
4. `McWssConfig.Hostname` uses `ws://.../`.
5. `McTcpConfig.Hostname` is a plain host, not a URI.
6. runtime overrides are not replacing the expected config values.

If the server is managed by systemd, Docker, a panel, or VoiceCraft.Java auto-start, check the startup arguments as well as the JSON file.

## Client cannot connect

Check:

- the server address in the client points to `VoiceCraftConfig.Port`
- the server process is running
- UDP traffic is allowed through firewall/NAT
- the public address is correct from the player network
- `MaxClients` is not exhausted

`PositioningType` does not usually block raw connection, but a mismatch can make proximity behavior look broken after the client connects.

## Minecraft transport cannot connect

Check:

- the transport you are using is enabled
- the addon/plugin uses the matching token
- the endpoint is reachable from the Minecraft runtime
- the host binding is correct for local vs remote deployment
- the transport type matches the integration

Examples:

- BDS addon uses `McHttpConfig.LoginToken`
- local Bedrock world uses `McWssConfig.LoginToken`
- VoiceCraft.Java uses `McTcpConfig.LoginToken`

## McHttp not working

- Check `McHttpConfig.Enabled = true`.
- Check `McHttpConfig.Hostname`.
- Check the token used in `/voicecraft:vcconnect`.
- Ensure addon behavior/resource packs are attached to the world.
- Ensure BDS module permissions allow the required script/network functionality.
- If BDS is remote, do not use `127.0.0.1` unless VoiceCraft is on the same host.

## McWss not working

- Check `McWssConfig.Enabled = true`.
- Run `/connect <host:port>` before `/voicecraft:vcconnect`.
- Use `McWssConfig.LoginToken`.
- Confirm `DataTunnelCommand` matches the addon package.
- Reduce `CommandsPerTick` if the command tunnel is unstable.

## VoiceCraft.Java not working

- Check `McTcpConfig.Enabled = true`.
- Check `config.voicecraft.transport.host`.
- Check `config.voicecraft.transport.port`.
- Check `config.voicecraft.transport.login-token`.
- Confirm direct Paper vs proxy mode is intentional.
- If `auto-start` is enabled, confirm the managed runtime becomes ready before timeout.

## No audio

Check local client state first:

- selected input device
- selected output device
- mute/deafen state
- push-to-talk state
- input/output volume
- microphone sensitivity
- microphone test and output test

Then check server/Minecraft state:

- client appears in `list --clientsOnly`
- bind flow completed
- entity has a world ID and changing position
- `PositioningType` matches client and server
- server did not mute/deafen the entity

## Useful diagnostics

- On server, run `list --clientsOnly` to verify connected clients.
- Run `list` before and after moving in game to see whether entity position changes.
- Temporarily disable custom addon packet hooks.
- Reconnect the Minecraft transport after token or host changes.
- Compare current config against the last known-good backup.

For symptom-based checks, see [Troubleshooting Matrix](/operations/troubleshooting-matrix).
