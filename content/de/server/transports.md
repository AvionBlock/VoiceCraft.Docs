# Transportmodi

VoiceCraft verfügt über mehrere Minecraft-orientierte Transportebenen. Die Auswahl der richtigen Lösung ist wichtig für Stabilität und einfache Bereitstellung.

Der Transport ist der Pfad, den die Minecraft-Automatisierung verwendet, um den Status an `VoiceCraft.Server` zu senden. Er ist vom UDP-Sprachendpunkt getrennt, der von Player-Clients verwendet wird.

Verwenden Sie diese Seite, bevor Sie `McHttpConfig`, `McWssConfig` oder `McTcpConfig` bearbeiten.

## Schneller Vergleich

| Transport | Typischer Verbraucher | Endpunktform | Am besten für | Token-Feld |
|-----------|------------------|----------------|----------|-------------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP-Endpunkt | Dedizierter Bedrock-Server | `McHttpConfig.LoginToken` |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | Websocket + Befehlstunnel | lokale Bedrock-Welten und Tests | `McWssConfig.LoginToken` |
| `McTcp` | `GeyserVoice` | rohe TCP-Brücke | Java-, Geyser-, Proxy- oder Paper-Bridge-Szenarien | `McTcpConfig.LoginToken` |

Wählen Sie einen Transport nicht nur basierend auf der Portnummer. Wählen Sie es basierend darauf aus, welche Minecraft-seitige Komponente verbunden werden soll.

## McHttp

`McHttp` stellt einen HTTP-Endpunkt bereit, den ein Bedrock Dedicated Server-Add-on aufrufen kann.

### Beste Anwendungsfälle

- Dedizierter Bedrock-Server
- stabile geskriptete Bedrock-Welten
- Umgebungen, in denen der Spieleserver einen HTTP-Endpunkt aufrufen kann

### Stärken

- Einfachster Produktionstransport für BDS
- einfaches Endpunktmodell
- Gut geeignet für Panels, umgekehrte Netzwerklayouts und dedizierte Hosts

### Kompromisse

- erfordert Netzwerkerreichbarkeit vom Bedrock-Server bis zu VoiceCraft
- kann bei einigen Hosting-Anbietern blockiert sein
- benötigt die für das Add-on erforderlichen BDS-Skript-/Modulberechtigungen

### Typische Konfiguration

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/"
  }
}
```

Verwenden Sie `http://127.0.0.1:9050/` nur, wenn BDS und VoiceCraft auf demselben Host ausgeführt werden.

## McWss

`McWss` stellt einen Websocket-Endpunkt bereit und verwendet einen Befehlstunnel in der Bedrock-Welt.

### Beste Anwendungsfälle

- lokale Grundgesteinswelten
- Einzelspieler-Tests
- Setups mit `/connect` und Befehlstunneling

### Stärken

- funktioniert ohne einen eigenständigen BDS-HTTP-Workflow
- Praktisch für Entwicklung und lokale Demos

### Kompromisse

- weniger stabil bei starkem Nutzlastdruck
- empfindlich gegenüber `CommandsPerTick` und Nutzlast-Chunking-Grenzwerten
- normalerweise nicht die erste Wahl für öffentliche Produktionsumgebungen

### Typische Konfiguration

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

Verwenden Sie dies, wenn Sie den lokalen `/connect`-Flow benötigen. Für einen echten BDS-Produktionsserver bevorzugen Sie `McHttp`.

## McTcp

`McTcp` stellt eine unformatierte TCP-Brücke bereit, die von der Java-seitigen Infrastruktur verwendet wird.

### Beste Anwendungsfälle

- `GeyserVoice`
- Java-Server oder Proxy-Bridges
- direkte Paper-Laufzeitintegration

### Stärken

- Direkter Bridge-Transport für Java-seitige Plugins
- vermeidet HTTP-Endpunktsemantik, wenn eine native TCP-Brücke besser ist
- Entspricht der aktuellen `GeyserVoice`-Architektur

### Kompromisse

- ein weiterer zu verwaltender Port
- Dies ist am nützlichsten, wenn Sie tatsächlich eine Java-seitige Bridge betreiben
- Wird von den Bedrock-Add-on-Paketen nicht verwendet

### Typische Konfiguration

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

Wenn `GeyserVoice` auf demselben Computer wie VoiceCraft ausgeführt wird, binden Sie es an `127.0.0.1`. Wenn es anderswo ausgeführt wird, binden Sie es an eine Adresse, die das Plugin erreichen kann, und schränken Sie die Firewall ein.

## Welches sollten Sie wählen?

### Dedizierter Bedrock-Server

Verwenden Sie `McHttp`.

Fahren Sie mit [McHttp for BDS](/minecraft/mchttp-bds) fort.

### Bedrock-Einzelspieler / lokale Welt

Verwenden Sie `McWss`.

Fahren Sie mit [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) fort.

### Java + Geyser/Floodgate

Verwenden Sie `McTcp` bis `GeyserVoice`.

Fahren Sie mit [GeyserVoice](/ecosystem/geyservoice) fort.

### Gemischtes Netzwerk

Sie können mehr als einen Transport durchführen, aber nur das freigeben, was Sie wirklich benötigen.

Häufige Mischfälle:

- Bedrock BDS plus Java-Brücke:
  Aktivieren Sie `McHttp` und `McTcp`
- Lokale Tests, während die Produktion auf BDS bleibt:
  Führen Sie einen separaten Testserverordner aus, anstatt Produktionstokens wiederzuverwenden
- Proxy-Netzwerk:
  stellt dem Proxy-Eigentümer normalerweise nur `McTcp` zur Verfügung

## Sicherheitshinweis

- Ersetzen Sie alle Anmeldetokens
- Binden Sie an `127.0.0.1`, wenn der Verbraucher lokal ist
- Nur dann an `0.0.0.0` binden, wenn Remotezugriff erforderlich ist
- Halten Sie die Firewall-Regeln pro Transport streng ein
- Machen Sie inaktive Transporte nicht verfügbar, nur weil sie verfügbar sind

## Checkliste für die Validierung

- Ausgewähltes Transportfeld `Enabled` ist `true`
- das passende Addon/Plugin ist installiert
- Der Endpunkthost/-port ist von der Minecraft-seitigen Laufzeit aus erreichbar
- Das Add-on/Plugin-Token stimmt mit dem richtigen `LoginToken` überein.
- Serverprotokolle zeigen, dass der Transportkonsument eine Verbindung herstellt
- Der Bindungsfluss funktioniert nach der Transportanmeldung
