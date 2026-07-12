# ServerProperties.json

Hauptkonfiguration des Servers: `config/ServerProperties.json`.

VoiceCraft `1.7.0` behält die bekannten Transportbereiche bei, ergänzt aber NAT-Port-Mapping und nutzt Entity-Properties für Effektanpassungen.

## Wichtiger Ablauf

1. Server stoppen.
2. `ServerProperties.json` sichern.
3. JSON bearbeiten und validieren.
4. Server starten.
5. Logs für Config-, Listener-, NAT- und Auth-Fehler prüfen.

## Neue Felder in 1.7

Diese Felder gibt es in `VoiceCraftConfig`, `McHttpConfig`, `McTcpConfig` und `McWssConfig`:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` versucht über `OpenPort.Net`, temporär eine Router-Portfreigabe anzulegen. Lassen Sie es deaktiviert, wenn Portfreigaben extern verwaltet werden.

## VoiceCraftConfig

- `Port`: UDP-Port für VoiceCraft-Clients.
- `ExternalPort`: externer Port für automatisches Mapping, `0` nutzt `Port`.
- `PositioningType`: `0 = Server`, `1 = Client`.
- `EnableVisibilityDisplay`: Sichtbarkeitsindikatoren an Clients senden.
- `AutoOpenPort`: VoiceCraft UDP-Port automatisch öffnen.

## McHttpConfig

Für Bedrock Dedicated Server und HTTP-Integrationen.

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "AutoOpenPort": false
}
```

Nutzen Sie `127.0.0.1` nur, wenn BDS und VoiceCraft auf demselben Host laufen.

## McTcpConfig

Für Java-Bridges wie `GeyserVoice`.

- `Hostname` ist ein Host, keine URI.
- `Port` ist ein separates Feld.
- Für lokale Bridges `127.0.0.1` nutzen.

## McWssConfig

Für lokale Bedrock-Welten und Command-Tunnel.

Wichtige Felder:

- `DataTunnelCommand`
- `CommandsPerTick`
- `MaxByteLengthPerCommand`

Für Produktions-BDS ist meist `McHttp` stabiler.

## DefaultAudioEffectsConfig

Bitmask-Defaults:

- `1`: `Visibility`
- `2`: `Proximity`
- `4`: `ProximityEcho`
- `8`: `ProximityMuffle`

In `1.7.0` erzeugen Effekte Prozessoren pro Entity. Unterstützte Entity-Properties können Effektfelder überschreiben. Das ersetzt ältere Cave/Muffle-Factor-Anpassungen.

## Hinweise

- `LoginToken` immer ersetzen.
- `0.0.0.0` macht den Listener erreichbar.
- `PositioningType` muss zum Client passen.
- Vor Upgrades eine funktionierende Config sichern.
