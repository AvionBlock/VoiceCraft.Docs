# Übersicht

VoiceCraft ist eine Plattform für positionsabhängigen Sprachchat in Minecraft Bedrock Edition und verwandten Bridge-Szenarien.

Damit können Spieler einen separaten Sprachclient ausführen, während die Minecraft-seitige Automatisierung dem Sprachserver mitteilt, wo sich jeder Spieler befindet, in welcher Welt er sich befindet und welche Effekte oder Sichtbarkeitsregeln gelten sollen.

VoiceCraft ist nützlich, wenn Sie positionsabhängigen Sprachchat benötigen, ohne an eine bestimmte Minecraft-Server-Topologie gebunden zu sein. Dieselbe Kernlaufzeit kann mit Bedrock-Add-ons, Java/Geyser-Bridges oder Proxy-Bereitstellungen kombiniert werden.

## Was Sie einrichten

Die meisten Bereitstellungen bestehen aus drei Komponenten:

1. `VoiceCraft.Client`
   Desktop- und mobile App, die von jedem Spieler installiert wird
2. `VoiceCraft.Server`
   eigenständiges Backend für Sprachverkehr, Statussynchronisierung, Moderation und Transportendpunkte
3. Minecraft-seitige Transporte
   `McHttp`, `McWss` und `McTcp`

Ökosystemintegrationen verbinden Minecraft mit diesen Transporten:

- `VoiceCraft.Addon` für Bedrock Worlds und BDS
- `GeyserVoice` für Java/Geyser/Proxy-Stacks

## Wie es funktioniert

1. Der Client stellt über UDP eine Verbindung zu `VoiceCraft.Server` her.
2. Der Server verfolgt Sprachsitzungen, Entitäten, Positionen, Welt-IDs, Effektbitmasken und den Moderationsstatus.
3. Eine Minecraft-seitige Integration aktualisiert den Server mit dem Gameplay-Status:
   - `McHttp` für BDS
   - `McWss` für lokale Bedrock-Welten
   - `McTcp` für `GeyserVoice`
4. Der Client spielt Proximity-Audio entsprechend dem Serverstatus und den ausgewählten lokalen Einstellungen ab.

Die Sprachverbindung und die Minecraft-Transportverbindung sind getrennt. Wenn nur eine Seite verbunden ist, kann das Setup teilweise funktionsfähig wirken, das Proximity-Verhalten bleibt jedoch unvollständig.

## Unterstützte Client-Plattformen

- Windows (`x86`, `x64`, `arm64`)
- Linux (`x64`, `arm32`, `arm64`)
- macOS (`x64`, `arm64`)
- Android (`arm64`)
- iOS (`arm64`, `.ipa`)

## Was VoiceCraft flexibel macht

- mehrere Minecraft-Transporte
- Bedrock-Add-on-API-Oberfläche
- Java-seitige Brücke über `GeyserVoice`
- konfigurierbare Effekte und Entitätsmetadaten
- sowohl serverseitige als auch clientseitige Positionierungsmodi

Diese Flexibilität bedeutet auch, dass die erste Entscheidung zählt: Wählen Sie zuerst die Topologie und befolgen Sie dann die Anleitung für diesen Transport.

## Gängige Topologieoptionen

| Wenn Sie ... betreiben | Beginnen Sie mit... | Warum |
|---------------|---------------|-----|
| Dedizierter Bedrock-Server | [McHttp for BDS](/minecraft/mchttp-bds) | BDS kann einen stabilen HTTP-Endpunkt aufrufen |
| Lokale Bedrock-Welt | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) | Funktioniert über den lokalen Websocket-/Befehlstunnelfluss |
| Java-Server mit Geyser/Floodgate | [GeyserVoice](/ecosystem/geyservoice) | Java-seitiges Plugin stellt über `McTcp` eine Brücke zu VoiceCraft |
| Direkter Paper-Server | [GeyserVoice Direct Paper](/ecosystem/geyservoice-direct-paper) | Das Plugin kann entweder einen externen Server nutzen oder die Laufzeit verwalten |

## Was Sie als nächstes lesen sollten

- [Schnellstart](/start/quick-start)
- [Downloads](/download)
- [Transportmodi](/server/transports)
- [Systemarchitektur](/architecture/system-architecture)
- [Ökosystem-Überblick](/ecosystem/overview)
