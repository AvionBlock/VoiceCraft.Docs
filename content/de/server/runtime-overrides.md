# Laufzeitüberschreibungen

Der VoiceCraft-Server unterstützt Laufzeitüberschreibungen über Root-CLI-Optionen.

Diese Optionen sind ideal, wenn:

– Sie möchten umgebungsspezifische Werte, ohne JSON zu bearbeiten
- Ein Prozessmanager fügt beim Start Werte ein
- `GeyserVoice` launches the VoiceCraft runtime automatically
- Sie testen mehrere Transporttopologien aus demselben Installationsordner

## Unterstützte Optionen

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## Was jede Option ändert

### `--language`

Overrides `VoiceCraftConfig.Language` for the current process.

Beispiel:

```bash
./VoiceCraft.Server --language ru-RU
```

### `--transport-mode`

Aktiviert nur ausgewählte Minecraft-Transporte für den aktuellen Lauf.

Akzeptierte Werte:

- `http`
- `tcp`
- `wss`
- aliases such as `ws`, `websocket`, `websockets`
- aliases such as `local-socket`, `tcp-socket` normalize to `tcp`

Beispiele:

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

Wenn diese Option festgelegt ist, deaktiviert VoiceCraft zunächst alle Minecraft-Transporte und aktiviert dann nur die ausgewählten wieder.

### `--transport-host`

Überschreibt den Minecraft-Transporthost:

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

Beispiel:

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

### `--transport-port`

Überschreibt den Minecraft-Transportport:

- URI port in `McHttpConfig.Hostname`
- URI port in `McWssConfig.Hostname`
- `McTcpConfig.Port`

Beispiel:

```bash
./VoiceCraft.Server --transport-port 9055
```

### `--server-key`

Überschreibt das gemeinsame Anmeldetoken, das verwendet wird von:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Beispiel:

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

## Gute Bereitstellungsbeispiele

### Dedizierter BDS-Host

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Java-Bridge-Host

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Lokale Einzelspieler-Tests

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## Wichtiges Verhalten

- Laufzeitüberschreibungen sind prozesslokal
- they do not permanently rewrite `ServerProperties.json`
- Sie eignen sich hervorragend für Tests und Automatisierung
- Sie reduzieren die Notwendigkeit mehrerer Konfigurationskopien
