# ServerProperties.json

Main server config file: `config/ServerProperties.json`.

This file is created after the first server start and becomes the persistent source of truth for the server. Stop the server before editing it unless your process manager is designed to reload configuration safely.

Use this page when you need to understand what a field controls and which fields must match the client, addon, or plugin.

## Edit workflow

1. Stop `VoiceCraft.Server`.
2. Back up `config/ServerProperties.json`.
3. Edit the relevant section.
4. Validate JSON syntax.
5. Start the server again.
6. Watch logs for config parsing, listener, or auth errors.
7. Reconnect the client and Minecraft transport.

The most important first edits are the transport login tokens and host bindings.

## Full example

```json
{
  "TelemetryEnabled": true,
  "TelemetryToken": "replace-with-stable-random-token",
  "VoiceCraftConfig": {
    "Language": "en-US",
    "Port": 9050,
    "MaxClients": 100,
    "Motd": "VoiceCraft Proximity Chat!",
    "PositioningType": 0,
    "EnableVisibilityDisplay": true
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "http://127.0.0.1:9050/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "McTcpConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "127.0.0.1",
    "Port": 9050,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "DefaultAudioEffectsConfig": {
    "1": { "EffectType": 1 },
    "2": { "WetDry": 1, "MinRange": 0, "MaxRange": 30, "EffectType": 2 },
    "4": { "WetDry": 1, "Delay": 0.5, "Range": 30, "EffectType": 4 },
    "8": { "WetDry": 1, "EffectType": 6 }
  }
}
```

## Telemetry

- `TelemetryEnabled`:
  enables anonymous startup, heartbeat, and crash diagnostics from `VoiceCraft.Server`.
- `TelemetryToken`:
  stable pseudonymous fingerprint used to group telemetry events from one server installation.

Telemetry helps maintainers understand runtime health and version adoption. It should not be used as your own monitoring replacement; keep local logs and process monitoring for production servers.

If you do not want telemetry, set:

```json
{
  "TelemetryEnabled": false
}
```

## VoiceCraftConfig

- `Language`:
  server log language.
- `Port`:
  UDP port for the core VoiceCraft server.
- `MaxClients`:
  maximum VoiceCraft client connections.
- `Motd`:
  text returned by ping / info responses.
- `PositioningType`:
  positioning mode:
  - `0 = Server`
  - `1 = Client`
- `EnableVisibilityDisplay`:
  whether visibility indicators are sent to clients.

`Port` is the endpoint that player clients add in the VoiceCraft client UI. It is not automatically the same thing as every Minecraft transport endpoint, even if defaults reuse `9050`.

`PositioningType` must match the client setting. In most BDS and GeyserVoice setups, start with `0 = Server`.

## McWssConfig

Used for websocket / command-tunnel Bedrock flows.

- `Enabled`:
  enable or disable McWss.
- `LoginToken`:
  shared auth token, typically used with `/voicecraft:vcconnect <token>`.
- `Hostname`:
  websocket host such as `ws://0.0.0.0:9051/`.
- `MaxClients`:
  maximum McWss clients.
- `MaxTimeoutMs`:
  inactivity timeout.
- `DataTunnelCommand`:
  command name used for the data tunnel, usually `voicecraft:data_tunnel`.
- `CommandsPerTick`:
  how many command packets are forwarded per tick.
- `MaxByteLengthPerCommand`:
  payload budget (bytes) per command invocation.
- `DisabledPacketTypes`:
  packet types blocked on this transport.

Use `McWss` for local worlds and testing. The command tunnel depends on `DataTunnelCommand`; changing it on only one side breaks the transport.

## McHttpConfig

Used for Bedrock Dedicated Server and HTTP-based integrations.

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

Typical BDS binding:

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "MaxClients": 10,
  "MaxTimeoutMs": 10000,
  "DisabledPacketTypes": []
}
```

Use `McHttp` when BDS can reach the VoiceCraft HTTP endpoint. If BDS and VoiceCraft run on different machines, `127.0.0.1` will point to the wrong host from BDS's perspective.

## McTcpConfig

Used by Java-side bridges, especially `GeyserVoice`.

- `Enabled`:
  enable or disable McTcp.
- `LoginToken`:
  shared auth token for the TCP bridge.
- `Hostname`:
  bind hostname, for example `127.0.0.1` or `0.0.0.0`.
- `Port`:
  TCP listen port.
- `MaxClients`:
  maximum transport clients.
- `MaxTimeoutMs`:
  inactivity timeout.
- `DisabledPacketTypes`:
  packet types blocked on this transport.

Important differences compared to `McHttp` / `McWss`:

- `Hostname` is a plain host, not a URI
- `Port` is a separate field
- this is the transport most relevant to `GeyserVoice`

Use `McTcp` when a Java-side plugin or proxy owns the Minecraft state path. The `GeyserVoice` `config.voicecraft.transport.host`, `config.voicecraft.transport.port`, and `config.voicecraft.transport.login-token` values must match this section.

## DefaultAudioEffectsConfig

Dictionary key is a `ushort` bitmask, value is an effect JSON object.

Default matrix:

- `1`:
  `Visibility`
- `2`:
  `Proximity`
- `4`:
  `ProximityEcho`
- `8`:
  `ProximityMuffle`

You can override or extend the dictionary to change default effect behavior for new entities.

Change these only when you understand the effect pipeline. For most deployments, verify basic bind and proximity behavior before changing default effects.

## DisabledPacketTypes

Each transport supports `DisabledPacketTypes`.

Use this carefully:

- it is intended for debugging, compatibility experiments, or emergency mitigation
- disabling core packets can break login, entity sync, or audio delivery
- do not change this in production unless you understand the packet flow

If a transport works only after disabling packet types, treat that as a compatibility workaround and document why it is needed.

## Practical production patterns

### Bedrock Dedicated Server

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` unless you also run Java-side bridges

### Local world / singleplayer

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` or optional

### GeyserVoice / Java bridge

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` or optional
- `McWssConfig.Enabled = false` unless also needed elsewhere

## Minimal topology examples

### BDS only

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/"
  },
  "McWssConfig": {
    "Enabled": false
  },
  "McTcpConfig": {
    "Enabled": false
  }
}
```

### Java bridge only

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  },
  "McHttpConfig": {
    "Enabled": false
  },
  "McWssConfig": {
    "Enabled": false
  }
}
```

## Important notes

- always replace generated `LoginToken` values
- with `Hostname: http://0.0.0.0:9050/`, the HTTP listener binds to a wildcard address
- with `McTcpConfig.Hostname = 0.0.0.0`, the TCP bridge becomes remotely reachable
- keep `PositioningType` aligned with the client configuration
- keep a copy of the last known-good config before upgrades
- use runtime overrides only when your process manager will pass them consistently

See also:

- [Runtime Overrides](/server/runtime-overrides)
- [Transport Modes](/server/transports)
