# Serverinstallation

`VoiceCraft.Server` is the standalone backend that accepts client voice traffic and exposes Minecraft-facing transports.

## Was der Server tatsächlich beinhaltet

Der VoiceCraft-Server stellt mehrere Ebenen gleichzeitig zur Verfügung:

- VoiceCraft UDP-Sprachserver
- `McHttp` transport for Bedrock integrations
- `McWss` transport for websocket / command-tunnel Bedrock flows
- `McTcp` transport for Java-side bridges such as `GeyserVoice`

Sie können alle aktiviert lassen oder Transporte zur Laufzeit auswählen.

## Vorgefertigte Binärversionen

Die Veröffentlichungsseite enthält normalerweise Folgendes:

- Windows:
  `VoiceCraft.Server.Windows.x64.zip`, `x86`, `arm64`
- Linux:
  `VoiceCraft.Server.Linux.x64.zip`, `arm`, `arm64`

Herunterladen: [Download-Seite](/download)

## Windows

1. Download `VoiceCraft.Server.Windows.<arch>.zip`.
2. Extrahieren Sie das Archiv in einen speziellen Ordner.
3. Start:

```powershell
./VoiceCraft.Server.exe
```

## Linux

1. Download `VoiceCraft.Server.Linux.<arch>.zip`.
2. Extrahieren Sie das Archiv.
3. Start:

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

## macOS

Möglicherweise gibt es nicht immer ein vorgefertigtes dediziertes Artefakt, aber der Server kann aus dem Quellcode erstellt werden:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

For Intel macOS, replace `osx-arm64` with `osx-x64`.

## Docker / Container

Auf Container-Images wird in der README-Datei des Haupt-Repositorys verwiesen:

- [VoiceCraft Docker Hub](https://hub.docker.com/r/sinevector241/voicecraft/tags)

Die Containerbereitstellung ist nützlich, wenn:

- Sie möchten eine dedizierte Servicegrenze
- Sie führen bereits BDS-/Java-Knoten in Containern aus
- Sie möchten einfachere Neustartrichtlinien und Protokolle

## Empfohlenes Installationslayout

Beispiel-Linux-Layout:

```text
/opt/voicecraft/
  VoiceCraft.Server
  config/
    ServerProperties.json
```

Empfohlene Praktiken:

- Behalten Sie VoiceCraft in einem eigenen Verzeichnis
- persist `config/`
- back up `ServerProperties.json`
- Mischen Sie nicht mehrere Umgebungen im selben Ordner

## Als systemd-Dienst ausführen (Linux)

Example `/etc/systemd/system/voicecraft.service`:

```ini
[Unit]
Description=VoiceCraft Server
After=network.target

[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server
Restart=always
RestartSec=3
User=voicecraft
Group=voicecraft

[Install]
WantedBy=multi-user.target
```

Wenden Sie es an:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now voicecraft
sudo systemctl status voicecraft
```

## Aus dem Quellcode erstellen

SDK- und Projektdetails finden Sie im [VoiceCraft-Repository und -Build](/ecosystem/voicecraft-repository).

Minimaler Durchfluss:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## Was Sie als nächstes lesen sollten

- [Erster Serverlauf](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Laufzeitüberschreibungen](/server/runtime-overrides)
- [Transportmodi](/server/transports)
