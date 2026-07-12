# Transport-Modi

VoiceCraft nutzt mehrere Minecraft-seitige Transports. Der Transport ist der Pfad, über den Minecraft-State in `VoiceCraft.Server` gelangt. Spieler-Clients nutzen separat den UDP-Voice-Endpunkt.

## Vergleich

| Transport | Consumer | Endpoint | Einsatz |
|-----------|----------|----------|---------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP | Bedrock Dedicated Server |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | WebSocket + Command-Tunnel | lokale Bedrock-Welten |
| `McTcp` | Java-Bridge / `GeyserVoice` | TCP | Java, Geyser, Proxy |

## Gemeinsames Verhalten in 1.7

- Events werden über `EventRequest` übertragen.
- Entity-Properties ersetzen Cave/Muffle-Factor-Pakete.
- `OnEntityPropertyUpdated` meldet Property-Änderungen.
- Jeder Transport kann optional `AutoOpenPort` nutzen.

## McHttp

Für BDS:

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

Für lokale Welten:

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

Für Java-Bridges:

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

## NAT-Port-Mapping

Felder:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

Nutzen Sie es für Home/LAN-Server mit automatischer Routerfreigabe. Für VPS, Docker, Panels, Tunnel und lokale Loopback-Integrationen bleibt es aus.

## Sicherheit

- Tokens ersetzen.
- Lokal nach Möglichkeit an `127.0.0.1` binden.
- `0.0.0.0` nur bewusst verwenden.
- Nur benötigte Transports aktivieren.
- Firewall-Regeln eng halten.
