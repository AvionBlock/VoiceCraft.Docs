# Transportmodi

VoiceCraft verfügt über mehrere Minecraft-orientierte Transportebenen. Die Auswahl der richtigen Lösung ist wichtig für Stabilität und einfache Bereitstellung.

## Schneller Vergleich

| Transport | Typische Verwendung | Standardform | Am besten für |
|-----------|-------------|---------------|----------|
| `McHttp` | Bedrock Dedicated Server | HTTP endpoint | stable Bedrock server integration |
| `McWss` | local worlds / singleplayer | websocket + command tunnel | testing, local worlds, lightweight setups |
| `McTcp` | Java-side bridge | raw TCP bridge | `GeyserVoice`, proxy or Paper bridge scenarios |

## McHttp

### Beste Anwendungsfälle

- Dedizierter Bedrock-Server
- Stabile geskriptete Bedrock-Welten
– Umgebungen, in denen der Spieleserver einen HTTP-Endpunkt aufrufen kann

### Stärken

- Einfachster Produktionstransport für BDS
- einfaches Endpunktmodell
- Gut geeignet für Panels, umgekehrte Netzwerklayouts und dedizierte Hosts

### Kompromisse

- erfordert Netzwerkerreichbarkeit vom Bedrock-Server zu VoiceCraft
- kann bei einigen Hosting-Anbietern blockiert sein

## McWss

### Beste Anwendungsfälle

- lokale Grundgesteinswelten
- Einzelspieler-Tests
- setups using `/connect` and command tunneling

### Stärken

- Funktioniert ohne einen eigenständigen BDS-HTTP-Workflow
- praktisch für Entwicklung und lokale Demos

### Kompromisse

- weniger stabil bei starkem Nutzlastdruck
- sensitive to `CommandsPerTick` and payload chunking limits
- normalerweise nicht die erste Wahl für öffentliche Produktionsumgebungen

## McTcp

### Beste Anwendungsfälle

- `GeyserVoice`
- Java-Server oder Proxy-Bridges
- Direkte Paper-Laufzeitintegration

### Stärken

- Direkter Bridge-Transport für Java-seitige Plugins
– vermeidet HTTP-Endpunktsemantik, wenn eine native TCP-Brücke besser ist
- aligns with current `GeyserVoice` architecture

### Kompromisse

- ein weiterer zu verwaltender Port
– Am nützlichsten, wenn Sie tatsächlich eine Java-seitige Bridge betreiben

## Welches solltest du wählen?

### Dedizierter Bedrock-Server

Use `McHttp`.

### Bedrock-Einzelspieler / lokale Welt

Use `McWss`.

### Java + Geyser/Fluttor

Use `McTcp` through `GeyserVoice`.

### Gemischtes Netzwerk

Sie können mehr als einen Transport durchführen, aber nur das freigeben, was Sie wirklich benötigen.

## Sicherheitshinweis

- Ersetzen Sie alle Login-Tokens
- bind to `127.0.0.1` when the consumer is local
- bind to `0.0.0.0` only when remote access is required
- Halten Sie die Firewall-Regeln pro Transport streng ein
