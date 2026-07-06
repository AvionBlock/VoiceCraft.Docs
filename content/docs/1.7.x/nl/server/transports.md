# Transportmodi

Een transport is het pad waarmee Minecraft-state naar `VoiceCraft.Server` gaat. Voice clients gebruiken apart de UDP voice endpoint.

## Vergelijking

| Transport | Consumer | Endpoint | Gebruik |
|-----------|----------|----------|---------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP | Bedrock Dedicated Server |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | WebSocket + command tunnel | lokale werelden |
| `McTcp` | Java bridge / `GeyserVoice` | TCP | Java, Geyser, proxy |

## 1.7 gedrag

- events via `EventRequest`
- entity properties vervangen cave/muffle factor packets
- `OnEntityPropertyUpdated` meldt property changes
- elk transport kan `AutoOpenPort` gebruiken

## Configvoorbeelden

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

## NAT port mapping

Velden: `AutoOpenPort`, `ExternalPort`, `PortMappingLifetimeMinutes`, `PortMappingTimeoutSeconds`.

Gebruik dit voor home/LAN hosting met automatische router mapping. Laat het uit voor VPS, Docker, panels, tunnels en loopback integrations.

## Beveiliging

- tokens vervangen
- lokaal binden aan `127.0.0.1`
- `0.0.0.0` alleen bewust gebruiken
- alleen benodigde transports inschakelen
