# Produktionspläne

Diese Seite fasst vernünftige Produktionsansätze statt roher Funktionslisten zusammen.

Verwenden Sie diese Blaupausen, wenn Sie entscheiden, auf welche Topologie Sie standardisieren möchten. Sie sind bewusst meinungsstark: Das Ziel besteht darin, Komponenten zu reduzieren und nicht alle möglichen Transporte auf einmal freizugeben.

## Blueprint 1: Nur-Bedrock-Server

Verwendung:

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

Warum:

- sauberste stabile Bedrock-Bereitstellung
- am einfachsten zu überwachen
- Dies ist dem Serverpersonal am einfachsten zu erklären

Empfohlene Form:

```text
BDS addon -> McHttp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Lassen Sie `McWss` und `McTcp` deaktiviert, es sei denn, Sie haben einen bestimmten Grund, sie auszuführen.

## Blaupause 2: Lokale Gemeinschaft / SMP mit Geyser

Verwendung:

- `VoiceCraft.Server`
- `McTcp`
- `VoiceCraft.Java` direkter Paper-Modus

Optional:

- Lassen Sie VoiceCraft.Java die VoiceCraft-Laufzeit verwalten, wenn Sie einen einzelnen Java-seitigen Installationsablauf bevorzugen

Empfohlene Form:

```text
Paper/Folia + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Dies ist gut geeignet, wenn ein Java-seitiger Server die Hauptautorität für die Spielerposition ist.

## Blueprint 3: Großes Java-Netzwerk

Verwendung:

- extern `VoiceCraft.Server`
- `McTcp`
- `VoiceCraft.Java` auf Proxy
- `VoiceCraft.Java` auf Backend-Knoten

Warum:

- zentrale Steuerung
- sauberere Skalierung
- einfachere Neustarts, ohne jedes Backend zu berühren

Empfohlene Form:

```text
backend Paper nodes -> proxy relay -> proxy VoiceCraft.Java -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Behalten Sie den Proxy als einzigen Eigentümer der VoiceCraft-Verbindung bei. Back-End-Knoten sollten Snapshots erstellen und nicht um die Hauptverbindung `McTcp` konkurrieren.

## Blueprint 4: Builder/Testumgebung

Verwendung:

- `McWss`
- `Core.McWss`
- eine lokale VoiceCraft-Instanz

Warum:

- schnelle lokale Schleife
- Gut zum Testen der Add-on-Automatisierung

Empfohlene Form:

```text
local Bedrock world -> McWss -> local VoiceCraft.Server
local client -> local VoiceCraft UDP endpoint
```

Betrachten Sie dies nicht als Standardproduktionsdesign für einen öffentlichen Bedrock-Server. Wechseln Sie zu `McHttp`, wenn die Welt länger läuft oder geteilt wird.

## Auswahl einer Blaupause

| Brauchen | Wählen Sie |
|------|--------|
| Stabile Bedrock-Produktion | Blaupause 1 |
| Ein Java/Geyser-Server | Blaupause 2 |
| Geschwindigkeits-/Bungee-Netzwerk | Blaupause 3 |
| Lokale Tests oder Add-on-Entwicklung | Blaupause 4 |

## Betriebsempfehlungen

- Speichern Sie VoiceCraft-Protokolle nach Möglichkeit getrennt von Spielprotokollen
- Rotieren oder archivieren Sie Konfigurationen vor großen Upgrades
- Transportmarken geheim halten
- Testen Sie den Bindungsfluss nach jeder Topologieänderung
- Legen Sie nur den Transport offen, der für den gewählten Bauplan erforderlich ist
- Behalten Sie eine Rollback-Kopie von `ServerProperties.json`, bevor Sie Ports oder Token ändern
- Dokumentieren Sie, welcher Dienst Eigentümer des VoiceCraft-Prozesses in Ihrer Umgebung ist
