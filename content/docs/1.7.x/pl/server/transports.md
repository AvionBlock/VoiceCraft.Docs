# Tryby transportu

Transport to ścieżka, którą Minecraft-side automation wysyła state do `VoiceCraft.Server`. Klient głosowy używa osobnego UDP endpoint.

## Porównanie

| Transport | Consumer | Endpoint | Zastosowanie |
|-----------|----------|----------|--------------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP | Bedrock Dedicated Server |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | WebSocket + command tunnel | lokalne światy |
| `McTcp` | Java bridge / `VoiceCraft.Java` | TCP | Java, Geyser, proxy |

## Wspólne zmiany 1.7

- events idą przez `EventRequest`
- entity properties zastępują cave/muffle factor packets
- `OnEntityPropertyUpdated` zgłasza zmiany properties
- każdy transport może używać `AutoOpenPort`

## McHttp

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

## McWss

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

## McTcp

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

Pola: `AutoOpenPort`, `ExternalPort`, `PortMappingLifetimeMinutes`, `PortMappingTimeoutSeconds`.

Używaj w home/LAN hosting z automatycznym mappingiem routera. Nie używaj dla VPS, Docker, paneli, tuneli ani loopback integrations.

## Security

- zmień tokens
- lokalnie binduj do `127.0.0.1`
- `0.0.0.0` tylko świadomie
- włączaj tylko potrzebne transporty
