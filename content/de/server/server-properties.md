# ServerProperties.json

Hauptserver-Konfigurationsdatei: `config/ServerProperties.json`.

Diese Datei wird nach dem ersten Serverstart erstellt und wird zur dauerhaften Quelle der Wahrheit für den Server. Stoppen Sie den Server, bevor Sie ihn bearbeiten, es sei denn, Ihr Prozessmanager ist darauf ausgelegt, die Konfiguration sicher neu zu laden.

Verwenden Sie diese Seite, wenn Sie verstehen möchten, was ein Feld steuert und welche Felder zum Client, Add-on oder Plugin passen müssen.

## Workflow bearbeiten

1. Stoppen Sie `VoiceCraft.Server`.
2. Sichern Sie `config/ServerProperties.json`.
3. Bearbeiten Sie den entsprechenden Abschnitt.
4. Validieren Sie die JSON-Syntax.
5. Starten Sie den Server erneut.
6. Überwachen Sie Protokolle auf Konfigurationsanalyse-, Listener- oder Authentifizierungsfehler.
7. Verbinden Sie den Client und den Minecraft-Transport erneut.

Die wichtigsten ersten Änderungen sind die Transport-Login-Tokens und Host-Bindungen.

## Vollständiges Beispiel

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

## Telemetrie

- `TelemetryEnabled`:
  ermöglicht anonyme Start-, Heartbeat- und Absturzdiagnosen von `VoiceCraft.Server`.
- `TelemetryToken`:
  Stabiler pseudonymer Fingerabdruck, der zur Gruppierung von Telemetrieereignissen von einer Serverinstallation verwendet wird.

Telemetrie hilft Betreuern, den Laufzeitzustand und die Versionsübernahme zu verstehen. Es sollte nicht als Ihr eigener Überwachungsersatz verwendet werden; Führen Sie lokale Protokolle und Prozessüberwachung für Produktionsserver.

Wenn Sie keine Telemetrie wünschen, stellen Sie Folgendes ein:

```json
{
  "TelemetryEnabled": false
}
```

## VoiceCraftConfig

- `Language`:
  Serverprotokollsprache.
- `Port`:
  UDP-Port für den VoiceCraft-Kernserver.
- `MaxClients`:
  maximale VoiceCraft-Client-Verbindungen.
- `Motd`:
  Von Ping-/Info-Antworten zurückgegebener Text.
- `PositioningType`:
  Positionierungsmodus:
  - `0 = Server`
  - `1 = Client`
- `EnableVisibilityDisplay`:
  ob Sichtbarkeitsindikatoren an Kunden gesendet werden.

`Port` ist der Endpunkt, den Spieler-Clients in der VoiceCraft-Client-Benutzeroberfläche hinzufügen. Es ist nicht automatisch dasselbe wie jeder Minecraft-Transportendpunkt, auch wenn standardmäßig `9050` wiederverwendet wird.

`PositioningType` muss mit der Client-Einstellung übereinstimmen. Beginnen Sie in den meisten BDS- und GeyserVoice-Setups mit `0 = Server`.

## McWssConfig

Wird für Websocket-/Befehlstunnel-Bedrock-Flows verwendet.

- `Enabled`:
  Aktivieren oder deaktivieren Sie McWss.
- `LoginToken`:
  Gemeinsames Authentifizierungstoken, normalerweise verwendet mit `/voicecraft:vcconnect <token>`.
- `Hostname`:
  Websocket-Host wie `ws://0.0.0.0:9051/`.
- `MaxClients`:
  maximale McWss-Kunden.
- `MaxTimeoutMs`:
  Inaktivitäts-Timeout.
- `DataTunnelCommand`:
  Befehlsname, der für den Datentunnel verwendet wird, normalerweise `voicecraft:data_tunnel`.
- `CommandsPerTick`:
  wie viele Befehlspakete pro Tick weitergeleitet werden.
- `MaxByteLengthPerCommand`:
  Nutzlastbudget (Bytes) pro Befehlsaufruf.
- `DisabledPacketTypes`:
  Pakettypen, die auf diesem Transport blockiert sind.

Verwenden Sie `McWss` für lokale Welten und Tests. Der Befehlstunnel hängt von `DataTunnelCommand` ab; Wenn man es nur auf einer Seite ändert, wird der Transport unterbrochen.

## McHttpConfig

Wird für Bedrock Dedicated Server und HTTP-basierte Integrationen verwendet.

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

Typische BDS-Bindung:

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

Verwenden Sie `McHttp`, wenn BDS den VoiceCraft-HTTP-Endpunkt erreichen kann. Wenn BDS und VoiceCraft auf unterschiedlichen Maschinen laufen, zeigt `127.0.0.1` aus Sicht von BDS auf den falschen Host.

## McTcpConfig

Wird von Java-seitigen Bridges verwendet, insbesondere `GeyserVoice`.

- `Enabled`:
  Aktivieren oder deaktivieren Sie McTcp.
- `LoginToken`:
  Gemeinsames Authentifizierungstoken für die TCP-Brücke.
- `Hostname`:
  Binden Sie den Hostnamen, zum Beispiel `127.0.0.1` oder `0.0.0.0`.
- `Port`:
  TCP-Abhörport.
- `MaxClients`:
  maximale Transportkunden.
- `MaxTimeoutMs`:
  Inaktivitäts-Timeout.
- `DisabledPacketTypes`:
  Pakettypen, die auf diesem Transport blockiert sind.

Wichtige Unterschiede zu `McHttp` / `McWss`:

- `Hostname` ist ein einfacher Host, kein URI
- `Port` ist ein separates Feld
- Dies ist der Transport, der für `GeyserVoice` am relevantesten ist.

Verwenden Sie `McTcp`, wenn ein Java-seitiges Plugin oder ein Proxy den Minecraft-Statuspfad besitzt. Die Werte `GeyserVoice`, `config.voicecraft.transport.host`, `config.voicecraft.transport.port` und `config.voicecraft.transport.login-token` müssen mit diesem Abschnitt übereinstimmen.

## DefaultAudioEffectsConfig

Der Wörterbuchschlüssel ist eine `ushort`-Bitmaske, der Wert ist ein Effekt-JSON-Objekt.

Standardmatrix:

- `1`:
  `Visibility`
- `2`:
  `Proximity`
- `4`:
  `ProximityEcho`
- `8`:
  `ProximityMuffle`

Sie können das Wörterbuch überschreiben oder erweitern, um das Standardeffektverhalten für neue Entitäten zu ändern.

Ändern Sie diese nur, wenn Sie die Effektpipeline verstehen. Überprüfen Sie bei den meisten Bereitstellungen den grundlegenden Bindungsablauf und das Proximity-Verhalten, bevor Sie Standardeffekte ändern.

## DisabledPacketTypes

Jeder Transport unterstützt `DisabledPacketTypes`.

Verwenden Sie dies sorgfältig:

- Es ist zum Debuggen, für Kompatibilitätsexperimente oder zur Schadensbegrenzung bei Notfällen gedacht
- Das Deaktivieren von Kernpaketen kann die Anmeldung, die Entitätssynchronisierung oder die Audioübertragung beeinträchtigen
- Ändern Sie dies in der Produktion nicht, es sei denn, Sie verstehen den Paketfluss

Wenn ein Transport erst nach dem Deaktivieren von Pakettypen funktioniert, betrachten Sie dies als Kompatibilitätsproblemumgehung und dokumentieren Sie, warum er benötigt wird.

## Praktische Produktionsmuster

### Dedizierter Bedrock-Server

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false`, es sei denn, Sie führen auch Java-seitige Bridges aus

### Lokale Welt / Einzelspieler

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` oder optional

### GeyserVoice / Java-Brücke

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` oder optional
- `McWssConfig.Enabled = false`, sofern nicht auch anderswo benötigt

## Beispiele für minimale Topologien

### Nur BDS

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

### Nur Java-Bridge

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

## Wichtige Hinweise

- Ersetzen Sie immer die generierten `LoginToken`-Werte
- Mit `Hostname: http://0.0.0.0:9050/` bindet der HTTP-Listener an eine Platzhalteradresse
- Mit `McTcpConfig.Hostname = 0.0.0.0` wird die TCP-Brücke remote erreichbar
- Halten Sie `PositioningType` an der Clientkonfiguration ausgerichtet
- Bewahren Sie vor Upgrades eine Kopie der letzten als funktionierend bekannten Konfiguration auf
- Verwenden Sie Laufzeitüberschreibungen nur dann, wenn Ihr Prozessmanager sie konsistent übergibt

Siehe auch:

- [Laufzeitüberschreibungen](/server/runtime-overrides)
- [Transportmodi](/server/transports)
