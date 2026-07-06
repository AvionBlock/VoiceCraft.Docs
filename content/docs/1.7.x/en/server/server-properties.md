# ServerProperties.json

Main server config file: `config/ServerProperties.json`.

This file is created after the first server start and becomes the persistent source of truth for the server. Stop the server before editing it unless your process manager is designed to reload configuration safely.

VoiceCraft `1.7.0` keeps the familiar transport sections, but adds NAT port mapping fields and changes how effect customization is represented internally.

## Edit workflow

1. Stop `VoiceCraft.Server`.
2. Back up `config/ServerProperties.json`.
3. Edit the relevant section.
4. Validate JSON syntax.
5. Start the server again.
6. Watch logs for config parsing, listener, NAT mapping, or auth errors.
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
    "ExternalPort": 0,
    "PortMappingLifetimeMinutes": 60,
    "PortMappingTimeoutSeconds": 5,
    "MaxClients": 100,
    "Motd": "VoiceCraft Proximity Chat!",
    "PositioningType": 0,
    "EnableVisibilityDisplay": true,
    "AutoOpenPort": false
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "ws://127.0.0.1:9051/",
    "ExternalPort": 0,
    "PortMappingLifetimeMinutes": 60,
    "PortMappingTimeoutSeconds": 5,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": [],
    "AutoOpenPort": false
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "http://127.0.0.1:9050/",
    "ExternalPort": 0,
    "PortMappingLifetimeMinutes": 60,
    "PortMappingTimeoutSeconds": 5,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": [],
    "AutoOpenPort": false
  },
  "McTcpConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "127.0.0.1",
    "Port": 9050,
    "ExternalPort": 0,
    "PortMappingLifetimeMinutes": 60,
    "PortMappingTimeoutSeconds": 5,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": [],
    "AutoOpenPort": false
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

Telemetry helps maintainers understand runtime health and version adoption. It should not be used as your own monitoring replacement.

## VoiceCraftConfig

- `Language`:
  server log language.
- `Port`:
  UDP port for the core VoiceCraft server.
- `ExternalPort`:
  external UDP port requested when automatic port mapping is enabled. `0` means use `Port`.
- `PortMappingLifetimeMinutes`:
  requested NAT mapping lifetime.
- `PortMappingTimeoutSeconds`:
  timeout for the port mapping attempt.
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
- `AutoOpenPort`:
  whether VoiceCraft should try to open the UDP voice port through NAT mapping.

`Port` is the endpoint that player clients add in the VoiceCraft client UI. It is not automatically the same thing as every Minecraft transport endpoint, even if defaults reuse `9050`.

## NAT port mapping fields

`1.7.0` adds these fields to `VoiceCraftConfig`, `McHttpConfig`, `McTcpConfig`, and `McWssConfig`:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

When `AutoOpenPort` is `true`, VoiceCraft attempts to create a temporary router mapping with `OpenPort.Net`.

Use it only for networks where automatic router mapping is expected. Leave it off for VPS, Docker, game panels, reverse proxies, tunnels, and manually managed firewalls.

For URI-based transports (`McHttp` and `McWss`), VoiceCraft derives the internal port from `Hostname`. It skips loopback-bound transports because `127.0.0.1` and `localhost` are not intended to be public.

## McWssConfig

Used for websocket / command-tunnel Bedrock flows.

- `Enabled`
- `LoginToken`
- `Hostname`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`
- `MaxClients`
- `MaxTimeoutMs`
- `DataTunnelCommand`
- `CommandsPerTick`
- `MaxByteLengthPerCommand`
- `DisabledPacketTypes`
- `AutoOpenPort`

Use `McWss` for local worlds and testing. The command tunnel depends on `DataTunnelCommand`; changing it on only one side breaks the transport.

## McHttpConfig

Used for Bedrock Dedicated Server and HTTP-based integrations.

- `Enabled`
- `LoginToken`
- `Hostname`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`
- `AutoOpenPort`

Typical BDS binding:

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "AutoOpenPort": false
}
```

Use `McHttp` when BDS can reach the VoiceCraft HTTP endpoint. If BDS and VoiceCraft run on different machines, `127.0.0.1` will point to the wrong host from BDS's perspective.

## McTcpConfig

Used by Java-side bridges, especially `GeyserVoice`.

- `Enabled`
- `LoginToken`
- `Hostname`
- `Port`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`
- `AutoOpenPort`

Important differences compared to `McHttp` / `McWss`:

- `Hostname` is a plain host, not a URI
- `Port` is a separate field
- this is the transport most relevant to `GeyserVoice`

## DefaultAudioEffectsConfig

Dictionary key is a `ushort` bitmask, value is an effect JSON object.

Default matrix:

- `1`: `Visibility`
- `2`: `Proximity`
- `4`: `ProximityEcho`
- `8`: `ProximityMuffle`

In `1.7.0`, loaded default effects keep their bitmask internally. Effects now create per-entity processors, and custom entity properties can override supported effect fields. This is the replacement path for older cave/muffle factor customization.

Change these only when you understand the effect pipeline. For most deployments, verify basic bind and proximity behavior before changing default effects.

## DisabledPacketTypes

Each transport supports `DisabledPacketTypes`.

Use this carefully:

- it is intended for debugging, compatibility experiments, or emergency mitigation
- disabling core packets can break login, event delivery, entity sync, or audio delivery
- do not change this in production unless you understand the packet flow

If a transport works only after disabling packet types, treat that as a compatibility workaround and document why it is needed.

## Practical production patterns

### Bedrock Dedicated Server

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` unless you also run Java-side bridges
- `AutoOpenPort = false` unless this is a LAN/home-router deployment

### Local world / singleplayer

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` or optional
- keep `McWssConfig.Hostname` loopback-bound unless remote access is intentional

### GeyserVoice / Java bridge

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` or optional
- `McWssConfig.Enabled = false` unless also needed elsewhere

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
