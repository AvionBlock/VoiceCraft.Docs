# Systemarchitektur

VoiceCraft ist ein Proximity-Voice-Stack, kein einzelner Minecraft-Mod. Der Client überträgt Mikrofon-Audio, der Server besitzt Sprachsitzungen und den gemeinsamen Status, und die Minecraft-Integrationsschicht teilt dem Server mit, wo sich Spieler befinden und wie sie dargestellt werden sollen.

Die Trennung ist beabsichtigt: Derselbe Sprachserver kann mit Bedrock Dedicated Server, lokalen Bedrock-Welten, direkten Paper-Servern und Proxy-Netzwerken zusammenarbeiten, solange der richtige Minecraft-zugewandte Transport verbunden ist.

## Hauptschichten

| Schicht | Hauptverantwortung | Typischer Installationsort |
|-------|---------------------|--------------------------|
| `VoiceCraft.Client` | Erfasst Mikrofoneingaben, sendet Sprachpakete, spielt Stimmen in der Nähe ab und speichert lokale Audioeinstellungen. | Spielergerät |
| `VoiceCraft.Server` | Akzeptiert Sprachclients, speichert den Entitätsstatus, wendet Moderationsflags und Audioeffektstandards an und macht Minecraft-Transporte verfügbar. | VPS, Spielehost, lokaler PC oder per Plugin verwaltete Laufzeit |
| Minecraft-Integration | Sendet Spieler-/Entitätspositions- und Lebenszyklusdaten von Minecraft an VoiceCraft. | Bedrock-Add-on, Paper-Plugin oder Proxy-Plugin |

### Client-Ebene

`VoiceCraft.Client` behandelt:

- Mikrofonerfassung und Vorverarbeitung
- Push-to-Talk, Stummschaltung, Stummschaltung, Auswahl des Eingabe-/Ausgabegeräts
- UDP-Verbindung zu `VoiceCraft.Server`
- Wiedergabe von Stimmen in der Nähe basierend auf dem Serverstatus
- lokale Lautstärke pro Benutzer und lokale Stummschaltungseinstellungen

Im normalen serverseitigen Modell erkennt der Client die Positionen der Minecraft-Spieler nicht selbst. Es hängt von der Server- und Minecraft-Integration ab, Entität und Weltstatus bereitzustellen.

### Serverschicht

`VoiceCraft.Server` behandelt:

- VoiceCraft UDP-Client-Sitzungen
- Netzwerkentitätsstatus und Bindungsstatus
- serverseitige Moderationsflags
- Effektbitmasken und Audioeffektstandards
- Minecraft-orientierte Transporte: `McHttp`, `McWss` und `McTcp`
- persistente Konfiguration in `config/ServerProperties.json`

Der Server ist die gemeinsame Laufzeit, auf die sich sowohl die Spieler-Clients als auch die Minecraft-seitige Integration einigen müssen. Wenn der Client eine Verbindung herstellt, Minecraft jedoch nicht, werden Spieler möglicherweise als Sprachsitzungen ohne nützliche Weltpositionsdaten angezeigt.

### Minecraft-Integrationsschicht

Dies hängt von der Topologie ab:

- `VoiceCraft.Addon.Core.McHttp` für Bedrock Dedicated Server
- `VoiceCraft.Addon.Core.McWss` für lokale Bedrock-Welten und Befehlstunnel-Setups
- `VoiceCraft.Java` für Java-, Geyser/Floodgate-, Paper-, Velocity- und BungeeCord-Topologien

Die Integrationsschicht ist für die Übersetzung von Spielereignissen in den VoiceCraft-Status verantwortlich: Spielerbeitritt, Spielerabgang, Positionsaktualisierungen, Weltkennungen, Bindungsanfragen, gefälschte Entitäten, Effektänderungen und Verbindungslebenszyklus.

## Kerndatenkonzepte

Bei VoiceCraft geht es um Entitäten und nicht nur um rohe Sockets.

Entitäten tragen Status wie:

- Namen
- Titel
- Beschreibung
- Position
- Rotation
- Welt-ID
- stumm / taub Zustand
- Effekt-Bitmasken

Netzwerk-Clients können als Entitäten dargestellt werden, und Minecraft-Integrationen können auch Entitäten erstellen oder aktualisieren. Mit diesem Modell kann VoiceCraft echte Spieler, gefälschte/Anzeige-Entitäten und benutzerdefinierte weltgesteuerte Sprachziele über dieselbe Statuspipeline beschreiben.

## Warum Transporte getrennt sind

VoiceCraft-Sprachverkehr und Minecraft-Automatisierung befinden sich nicht immer in derselben Umgebung.

Deshalb:

- Der Spieler-Client kommuniziert mit dem zentralen UDP-Sprachserver
- Bedrock- oder Java-Integration erfolgt über einen Minecraft-Transport
- Jeder Transport kann sein eigenes Token, seine eigene Hostbindung und sein eigenes maximales Client-Limit haben

Durch diese Trennung können Sie den Sprachserver stabil halten, während Sie die Minecraft-Integration ändern. Beispielsweise kann eine reine Bedrock-Bereitstellung `McHttp` verwenden, während ein Java/Geyser-Netzwerk denselben Kern-Sprachserver behalten, aber die Minecraft-Seite auf `McTcp` umstellen kann.

## Typische Verbindungsformen

### Dedizierter Bedrock-Server

```text
VoiceCraft.Client -> VoiceCraft UDP server
BDS + VoiceCraft.Addon.Core.McHttp -> McHttp endpoint
```

Verwenden Sie dies, wenn der Bedrock-Server einen durch `VoiceCraft.Server` bereitgestellten HTTP-Endpunkt erreichen kann.

### Lokale Bedrock-Welt

```text
VoiceCraft.Client -> VoiceCraft UDP server
Minecraft local world + Core.McWss -> McWss websocket endpoint
```

Verwenden Sie dies für lokale Tests oder Einzelspielerwelten, in denen ein Befehlstunnel akzeptabel ist.

### Java + Geyser/Floodgate

```text
VoiceCraft.Client -> VoiceCraft UDP server
VoiceCraft.Java -> McTcp endpoint
```

Verwenden Sie dies, wenn die Java-seitige Infrastruktur die Quelle der Spielerposition und des Lebenszyklusstatus ist.

## Was muss zuerst konfiguriert werden?

1. Konfigurieren Sie `VoiceCraft.Server` und bestätigen Sie, dass es sauber startet.
2. Wählen Sie den Minecraft-Transport, der der Topologie entspricht.
3. Stellen Sie sicher, dass der Client eine Verbindung zu `VoiceCraftConfig.Port` herstellt.
4. Stellen Sie sicher, dass sich die Minecraft-Integration mit dem passenden Transporttoken authentifiziert.
5. Überprüfen Sie den Bindungsfluss und die Positionsaktualisierungen, bevor Sie weiteres benutzerdefiniertes Verhalten hinzufügen.
