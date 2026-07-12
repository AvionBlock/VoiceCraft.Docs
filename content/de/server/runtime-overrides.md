# Laufzeitüberschreibungen

Der VoiceCraft-Server unterstützt Laufzeitüberschreibungen über Root-CLI-Optionen.

Laufzeitüberschreibungen ändern den laufenden Prozess, ohne `config/ServerProperties.json` dauerhaft neu zu schreiben. Sie sind nützlich, wenn ein Panel, ein Container, eine Systemd-Einheit oder ein Plugin den Server startet und umgebungsspezifische Werte einfügen muss.

Diese Optionen sind ideal, wenn:

- Sie möchten umgebungsspezifische Werte, ohne JSON zu bearbeiten
- Ein Prozessmanager fügt beim Start Werte ein
- `VoiceCraft.Java` startet die VoiceCraft-Laufzeit automatisch
- Sie testen mehrere Transporttopologien aus demselben Installationsordner

Wenn Sie eine einfache manuelle Installation durchführen, bearbeiten Sie zuerst `ServerProperties.json` und verwenden Sie Überschreibungen nur, wenn sie die Bereitstellung klarer machen.

## Unterstützte Optionen

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## Vorrang überschreiben

Beim Start lädt VoiceCraft `ServerProperties.json` und wendet dann Laufzeitüberschreibungen für den aktuellen Prozess an.

Das bedeutet:

- Die JSON-Datei bleibt der dauerhafte Standard
- Der CLI-Wert gewinnt für diesen Lauf
- Ein Neustart ohne dasselbe CLI-Flag führt zum JSON-Wert zurück
- Sicherungen sollten weiterhin die JSON-Konfiguration enthalten, auch wenn Ihr Produktionsprozess Überschreibungen verwendet

## Was jede Option ändert

### `--language`

Überschreibt `VoiceCraftConfig.Language` für den aktuellen Prozess.

Beispiel:

```bash
./VoiceCraft.Server --language ru-RU
```

Verwenden Sie dies für Protokolle und Diagnosen. Die Sprache der Client-Benutzeroberfläche wird dadurch nicht geändert.

### `--transport-mode`

Aktiviert nur ausgewählte Minecraft-Transporte für den aktuellen Lauf.

Akzeptierte Werte:

- `http`
- `tcp`
- `wss`
- Aliase wie `ws`, `websocket`, `websockets`
- Aliase wie `local-socket`, `tcp-socket` normalisieren sich zu `tcp`

Beispiele:

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

Wenn diese Option festgelegt ist, deaktiviert VoiceCraft zunächst alle Minecraft-Transporte und aktiviert dann nur die ausgewählten wieder.

Dies ist der sicherste Weg, einen Einzweckprozess auszuführen. Beispielsweise kann ein reiner BDS-Host mit `--transport-mode http` beginnen, auch wenn die JSON-Konfiguration noch Standardeinstellungen für andere Transporte enthält.

### `--transport-host`

Überschreibt den Minecraft-Transporthost:

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

Beispiel:

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

Für `McHttp` und `McWss` wendet VoiceCraft den Host auf den Hostnamen im URI-Stil an. Für `McTcp` wird das einfache Hostfeld angewendet.

### `--transport-port`

Überschreibt den Minecraft-Transportport:

- URI-Port in `McHttpConfig.Hostname`
- URI-Port in `McWssConfig.Hostname`
- `McTcpConfig.Port`

Beispiel:

```bash
./VoiceCraft.Server --transport-port 9055
```

Seien Sie vorsichtig, wenn mehrere Transporte standardmäßig denselben Port verwenden. Wenn Sie mehrere Transporte mit einer Überschreibung aktivieren, stellen Sie sicher, dass die resultierenden Bindungen für Ihre Plattform und Topologie gültig sind.

### `--server-key`

Überschreibt das gemeinsame Anmeldetoken, das verwendet wird von:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Beispiel:

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

Verwenden Sie dies, wenn Geheimnisse von einem Prozessmanager oder Plugin bereitgestellt werden. Platzieren Sie Produktionstokens nicht direkt in öffentlichen Dienstdateien, Screenshots oder freigegebenen Supportprotokollen.

## Gute Einsatzbeispiele

### Dedizierter BDS-Host

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Java-Bridge-Host

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Lokale Einzelspielertests

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## systemd-Beispiel

```ini
[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
Restart=always
```

Verwenden Sie eine Umgebungsdatei oder einen Secret Manager für `--server-key`, wenn das Token nicht direkt in der Unit-Datei gespeichert sein soll.

## Containerbeispiel

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050 --server-key "$VOICECRAFT_TOKEN"
```

Dadurch bleibt das Image wiederverwendbar, während jede Umgebung ihr eigenes Token und ihre eigene Bindung bereitstellen kann.

## Wichtiges Verhalten

- Laufzeitüberschreibungen sind prozesslokal
- Sie schreiben `ServerProperties.json` nicht dauerhaft um
- Sie eignen sich hervorragend für Tests und Automatisierung
- Sie reduzieren die Notwendigkeit mehrerer Konfigurationskopien
- Wenn ein Prozessmanager den Server neu startet, muss er jedes Mal dieselben Überschreibungen übergeben
- Wenn ein Wert in den Protokollen falsch aussieht, überprüfen Sie sowohl die JSON-Konfiguration als auch die Startargumente

## Wann keine Überschreibungen verwendet werden sollten

Vermeiden Sie Überschreibungen, wenn:

- Sie lernen immer noch die Konfigurationsform
- Sie erwarten, dass ein anderer Administrator nur `ServerProperties.json` überprüft.
- Sie haben keinen zuverlässigen Ort zum Speichern von Geheimnissen außerhalb der Konfigurationsdatei
- Durch die Überschreibung ist unklar, welcher Transport tatsächlich aktiviert ist
