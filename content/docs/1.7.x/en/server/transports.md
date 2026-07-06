# Transport Modes

VoiceCraft has multiple Minecraft-facing transport layers. Picking the right one is important for stability and deployment simplicity.

The transport is the path used by Minecraft automation to send state into `VoiceCraft.Server`. It is separate from the UDP voice endpoint used by player clients.

VoiceCraft `1.7.0` keeps the three transport families, but the event stream now uses event request packets and entity properties for effect customization.

## Quick comparison

| Transport | Typical consumer | Endpoint shape | Best for | Token field |
|-----------|------------------|----------------|----------|-------------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP endpoint | Bedrock Dedicated Server | `McHttpConfig.LoginToken` |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | websocket + command tunnel | local Bedrock worlds and testing | `McWssConfig.LoginToken` |
| `McTcp` | Java-side bridge such as `GeyserVoice` | raw TCP bridge | Java, Geyser, proxy, or Paper bridge scenarios | `McTcpConfig.LoginToken` |

Do not choose a transport based only on port number. Choose it based on which Minecraft-side component will connect.

## Shared 1.7 behavior

All transports share the 1.7 McApi model:

- low-level events are wrapped in `EventRequest`
- entity custom properties can be set and observed
- `OnEntityPropertyUpdated` is the event used by property-aware integrations
- cave and muffle factor packets are no longer the customization path
- each transport can optionally attempt NAT port mapping through `AutoOpenPort`

Custom consumers should be updated before connecting to a 1.7 server.

## McHttp

`McHttp` exposes an HTTP endpoint that a Bedrock Dedicated Server addon can call.

### Best use cases

- Bedrock Dedicated Server
- stable scripted Bedrock worlds
- environments where the game server can call an HTTP endpoint

### Typical config

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "AutoOpenPort": false
  }
}
```

Use `http://127.0.0.1:9050/` only when BDS and VoiceCraft run on the same host.

## McWss

`McWss` exposes a websocket endpoint and uses a command tunnel in the Bedrock world.

### Best use cases

- local Bedrock worlds
- singleplayer testing
- setups using `/connect` and command tunneling

### Typical config

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "AutoOpenPort": false
  }
}
```

Use this when you need the local `/connect` flow. For a real BDS production server, prefer `McHttp`.

## McTcp

`McTcp` exposes a raw TCP bridge used by Java-side infrastructure.

### Best use cases

- `GeyserVoice`
- Java server or proxy bridges
- direct Paper runtime integration

### Typical config

```json
{
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "0.0.0.0",
    "Port": 9050,
    "AutoOpenPort": false
  }
}
```

If `GeyserVoice` runs on the same machine as VoiceCraft, bind to `127.0.0.1`. If it runs elsewhere, bind to an address the plugin can reach and restrict the firewall.

## NAT port mapping

Every transport config includes:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

When enabled, VoiceCraft tries to open a router mapping for that transport. This is useful for home-hosted servers where the router allows automatic mappings.

It is usually not useful for:

- VPS deployments
- Docker or panel hosting
- reverse proxies or tunnels
- loopback-only local integrations
- networks where port forwarding is managed outside VoiceCraft

## Which one should you choose?

### Bedrock Dedicated Server

Use `McHttp`.

Continue with [McHttp for BDS](/minecraft/mchttp-bds).

### Bedrock singleplayer / local world

Use `McWss`.

Continue with [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).

### Java + Geyser/Floodgate

Use `McTcp` through `GeyserVoice`.

Continue with [GeyserVoice](/ecosystem/geyservoice).

### Mixed network

You can run more than one transport, but only expose what you really need.

Common mixed cases:

- Bedrock BDS plus Java bridge:
  enable `McHttp` and `McTcp`
- local testing while production remains on BDS:
  run a separate test server folder instead of reusing production tokens
- proxy network:
  usually expose only `McTcp` to the proxy owner

## Security advice

- replace all login tokens
- bind to `127.0.0.1` when the consumer is local
- bind to `0.0.0.0` only when remote access is required
- leave `AutoOpenPort` disabled unless automatic router mappings are intentional
- keep firewall rules tight per transport
- do not expose inactive transports just because they are available

## Validation checklist

- chosen transport `Enabled` field is `true`
- the matching addon/plugin is installed and supports 1.7 packets
- endpoint host/port is reachable from the Minecraft-side runtime
- the addon/plugin token matches the correct `LoginToken`
- server logs show the transport consumer connecting
- bind flow works after transport login
- custom property events arrive if your integration uses effect overrides
