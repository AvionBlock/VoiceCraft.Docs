# Erster Serverlauf

Diese Seite startet, nachdem Sie `VoiceCraft.Server` bereits einmal heruntergeladen und gestartet haben. Das Ziel besteht darin, diesen ersten Start in einen funktionierenden Server umzuwandeln, den Clients und Minecraft tatsächlich nutzen können.

## Was passiert beim ersten Start?

Beim Start sucht VoiceCraft im aktuellen Verzeichnis und in den Unterverzeichnissen nach `ServerProperties.json`.

Wenn die Datei nicht gefunden wird, erstellt der Server automatisch Folgendes:

- `config/`
- `config/ServerProperties.json`

Diese Datei wird zur wichtigsten dauerhaften Quelle für das Serververhalten.

Nachdem die Datei angezeigt wird, stoppen Sie den Server, bearbeiten Sie die Konfiguration und starten Sie ihn dann erneut. Beim ersten Start wird nur die Basis erstellt; die Einrichtung ist noch nicht abgeschlossen.

## Standardports und Endpunkte

Standardmäßig ist die generierte Konfiguration wie folgt ausgerichtet:

- VoiceCraft UDP: `9050`
- `McHttp`: `http://127.0.0.1:9050/`
- `McWss`: `ws://127.0.0.1:9051/`
- `McTcp`: `127.0.0.1:9050`

Hinweise:

- UDP-Sprachverkehr und einige Transportstandards teilen sich `9050`
- `McWss` wird standardmäßig durch `9051` getrennt.
- `McTcp` ist besonders relevant für `GeyserVoice`

## Linearer Ablauf für den ersten Start

### 1. Stoppen Sie und öffnen Sie die generierte Konfiguration

Öffnen Sie:

```text
config/ServerProperties.json
```

Bewahren Sie diese Datei im selben Installationsordner auf und schließen Sie sie in Backups ein.

### 2. Ersetzen Sie generierte Token

Bevor ein Add-on, Plugin oder Spieler-Client eine Verbindung herstellt, ersetzen Sie Folgendes:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Verwenden Sie den Token des Transports, den Sie später tatsächlich verbinden. Beispielsweise muss ein BDS-Befehl `vcconnect` `McHttpConfig.LoginToken` verwenden, während GeyserVoice `McTcpConfig.LoginToken` verwenden muss.

### 3. Wählen Sie einen primären Minecraft-Transport

Entscheiden Sie anhand der Topologie, was aktiviert werden soll:

| Einrichtung | Aktivieren | Weiter mit |
|-------|--------|---------------|
| Dedizierter Bedrock-Server | `McHttpConfig` | [McHttp for BDS](/minecraft/mchttp-bds) |
| Lokale Bedrock-Welt | `McWssConfig` | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) |
| Java + Geyser/Floodgate | `McTcpConfig` | [GeyserVoice](/ecosystem/geyservoice) |

Sie können mehrere Transporte ausführen, aber ein erstes Setup ist einfacher zu debuggen, wenn nur der erforderliche verfügbar gemacht wird.

### 4. Hostbindungen festlegen

Verwenden Sie lokale Bindungen, wenn alles auf einer Maschine läuft:

- `McHttpConfig.Hostname = http://127.0.0.1:9050/`
- `McWssConfig.Hostname = ws://127.0.0.1:9051/`
- `McTcpConfig.Hostname = 127.0.0.1`

Verwenden Sie `0.0.0.0` nur, wenn ein anderer Computer, Container oder Spielhost VoiceCraft erreichen muss.

### 5. Starten Sie den Server neu

Starten Sie `VoiceCraft.Server` erneut aus demselben Ordner. Achten Sie auf:

- ungültige JSON-Fehler
- Fehler wegen bereits belegtem Port
- fehlgeschlagener Listener oder Bindungsfehler

Beheben Sie diese, bevor Sie fortfahren. Ein Minecraft-Addon oder -Plugin kann keine zuverlässige Verbindung herstellen, während der Server Startfehler meldet.

### 6. Verbinden Sie einen VoiceCraft-Client

Installieren Sie den Client von der [Download-Seite](/download) und fügen Sie dann einen Servereintrag hinzu:

- Host: die VoiceCraft-Serveradresse
- Port: `VoiceCraftConfig.Port`, normalerweise `9050`

Für lokale Tests verwenden Sie:

```text
127.0.0.1:9050
```

Stellen Sie sicher, dass der Client `Positioning Type` mit `VoiceCraftConfig.PositioningType` übereinstimmt.

### 7. Minecraft verbinden

Fahren Sie mit der Anleitung fort, die dem von Ihnen aktivierten Transport entspricht:

- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [GeyserVoice](/ecosystem/geyservoice)

Wenn Sie zur Eingabe eines Tokens aufgefordert werden, verwenden Sie das passende Transporttoken aus `ServerProperties.json`.

### 8. Validieren Sie das Setup

Die erste Einrichtung ist abgeschlossen, wenn:

- Serverprotokolle zeigen keine Konfigurations- oder Listener-Fehler
- der VoiceCraft-Client stellt eine Verbindung zum UDP-Endpunkt her
- Minecraft authentifiziert sich über den ausgewählten Transport
- Der Bindungsfluss im Spiel funktioniert
- Aktualisierungen der Spielerpositionen erreichen VoiceCraft
- Proximity-Voice funktioniert im erwarteten Bereich

## Startargumente

Der VoiceCraft-Server unterstützt diese Stammargumente:

- `--exit-on-invalid-properties`
  Beenden, wenn `ServerProperties.json` nicht analysiert werden kann.
- `--language <culture>`
  Überschreiben Sie die Serverprotokollsprache für die aktuelle Ausführung.
- `--transport-mode <mode>`
  Aktivieren Sie eine Teilmenge der Minecraft-Transporte für den aktuellen Lauf.
- `--transport-host <host>`
  Überschreiben Sie den konfigurierten Minecraft-Transporthost.
- `--transport-port <port>`
  Überschreiben Sie den konfigurierten Minecraft-Transportport.
- `--server-key <token>`
  Überschreiben Sie das gemeinsam genutzte Minecraft-seitige Anmeldetoken für die aktuelle Ausführung.

Im Code gibt es auch kurze Aliase:

- `-eip`
- `-l`
- `-tm`
- `-th`
- `-tp`
- `-sk`

## Beispiele

### Mit einer Startsprachenüberschreibung ausführen

```bash
./VoiceCraft.Server --language en-US
```

### Beenden, wenn die Konfiguration ungültig ist

```bash
./VoiceCraft.Server --exit-on-invalid-properties
```

### Führen Sie nur `McTcp` für eine Java-Bridge aus

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Nur `McHttp` ausführen

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Überschreiben Sie das Token, ohne JSON zu bearbeiten

```bash
./VoiceCraft.Server --server-key "replace-with-secure-token"
```

## Wie sich Transportüberschreibungen verhalten

Laufzeitüberschreibungen schreiben `ServerProperties.json` nicht dauerhaft neu.

Sie gelten nur für den aktuellen Prozess und sind nützlich, wenn:

- Ausführen mehrerer Umgebungen von einem Image aus
- Verwenden von Panels oder Systemd-Drop-Ins
- Testen direkter vs. Proxy-Topologien
- Lassen Sie ein anderes Tool wie `GeyserVoice` die Laufzeit mit generierten Werten starten

## Checkliste für den ersten Durchgang

1. Führen Sie den Server einmal aus, um `config/ServerProperties.json` zu generieren.
2. Stoppen Sie den Server, bevor Sie die generierte Konfiguration bearbeiten.
3. Ändern Sie alle generierten Login-Tokens.
4. Bestätigen Sie, welchen Transport Sie tatsächlich benötigen:
   - `McHttp` für BDS
   - `McWss` für lokale Welten
   - `McTcp` für `GeyserVoice`
5. Überprüfen Sie die Hostbindungen.
6. Öffnen Sie nur die Ports, die Sie benötigen.
7. Starten Sie den Server aus demselben Installationsordner neu.
8. Bestätigen Sie `PositioningType` mit Ihren Clients.
9. Testen Sie die Client-Verbindung, bevor Sie die Minecraft-Automatisierung verbinden.
10. Verbinden Sie das Minecraft-Addon oder -Plugin und validieren Sie den Bindungsfluss.

## Häufige Fehler beim ersten Lauf

- Die generierten Token bleiben unverändert
- Offenlegung von `127.0.0.1`-Endpunkten für Remote-Knoten
- Vergessen Sie, dass `McTcp` möglicherweise für Java-seitige Bridges erforderlich ist
- Ermöglicht jeden Transport in der Produktion, ohne dass er tatsächlich benötigt wird
- Bearbeiten von `ServerProperties.json`, während ein Prozessmanager die alte defekte Konfiguration sofort neu startet
- Verwenden des UDP-Client-Ports, an dem der Minecraft-Leitfaden einen Transportendpunkt erwartet

Die vollständige Konfigurationsreferenz finden Sie unter [ServerProperties.json](/server/server-properties).
