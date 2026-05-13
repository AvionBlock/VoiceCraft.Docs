# Transport Modes

VoiceCraft has multiple Minecraft-facing transport layers. Picking the right one is important for stability and deployment simplicity.

The transport is the path used by Minecraft automation to send state into `VoiceCraft.Server`. It is separate from the UDP voice endpoint used by player clients.

Use this page before editing `McHttpConfig`, `McWssConfig`, or `McTcpConfig`.

## Quick comparison

| Transport | Typical consumer | Endpoint shape | Best for | Token field |
|-----------|------------------|----------------|----------|-------------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP endpoint | Bedrock Dedicated Server | `McHttpConfig.LoginToken` |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | websocket + command tunnel | local Bedrock worlds and testing | `McWssConfig.LoginToken` |
| `McTcp` | `GeyserVoice` | raw TCP bridge | Java, Geyser, proxy, or Paper bridge scenarios | `McTcpConfig.LoginToken` |

Do not choose a transport based only on port number. Choose it based on which Minecraft-side component will connect.

## McHttp

`McHttp` exposes an HTTP endpoint that a Bedrock Dedicated Server addon can call.

### Best use cases

- Bedrock Dedicated Server
- stable scripted Bedrock worlds
- environments where the game server can call an HTTP endpoint

### Strengths

- easiest production transport for BDS
- simple endpoint model
- good fit for panels, reverse network layouts, and dedicated hosts

### Trade-offs

- requires network reachability from the Bedrock server to VoiceCraft
- may be blocked on some hosting providers
- needs the BDS script/module permissions required by the addon

### Typical config

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/"
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

### Strengths

- works without a standalone BDS HTTP workflow
- practical for development and local demos

### Trade-offs

- less stable under heavy payload pressure
- sensitive to `CommandsPerTick` and payload chunking limits
- usually not the first choice for public production environments

### Typical config

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
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

### Strengths

- direct bridge transport for Java-side plugins
- avoids HTTP endpoint semantics when a native TCP bridge is better
- aligns with current `GeyserVoice` architecture

### Trade-offs

- another port to manage
- most useful when you actually run a Java-side bridge
- not used by the Bedrock addon packages

### Typical config

```json
{
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  }
}
```

If `GeyserVoice` runs on the same machine as VoiceCraft, bind to `127.0.0.1`. If it runs elsewhere, bind to an address the plugin can reach and restrict the firewall.

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
- keep firewall rules tight per transport
- do not expose inactive transports just because they are available

## Validation checklist

- chosen transport `Enabled` field is `true`
- the matching addon/plugin is installed
- endpoint host/port is reachable from the Minecraft-side runtime
- the addon/plugin token matches the correct `LoginToken`
- server logs show the transport consumer connecting
- bind flow works after transport login
