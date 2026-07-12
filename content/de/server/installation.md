# Serverinstallation

`VoiceCraft.Server` ist das eigenständige Backend, das Client-Sprachverkehr akzeptiert und Minecraft-bezogene Transporte verfügbar macht.

Verwenden Sie diese Seite als Server-Setup-Pfad. Am Ende sollten Sie einen laufenden Server, eine generierte Konfiguration, einen ausgewählten Minecraft-Transport und eine übersichtliche nächste Seite für Ihre Minecraft-Integration haben.

## Was der Server tatsächlich beinhaltet

Der VoiceCraft-Server stellt mehrere Ebenen gleichzeitig zur Verfügung:

- VoiceCraft UDP-Sprachserver
- `McHttp` Transport für Bedrock-Integrationen
- `McWss`-Transport für Websocket-/Befehlstunnel-Bedrock-Flows
- `McTcp`-Transport für Java-seitige Brücken wie `VoiceCraft.Java`

Sie können alle aktiviert lassen oder Transporte zur Laufzeit auswählen.

## Einrichtungsablauf

1. Laden Sie den Server für Ihre Plattform herunter und extrahieren Sie ihn.
2. Führen Sie es einmal aus dem Ordner aus, in dem Sie die Konfiguration behalten möchten.
3. Stoppen Sie den Prozess, nachdem `config/ServerProperties.json` generiert wurde.
4. Ersetzen Sie die generierten Anmeldetokens.
5. Aktivieren Sie den Minecraft-Transport, der Ihrer Topologie entspricht.
6. Legen Sie Hostbindungen und Firewallregeln fest.
7. Starten Sie den Server erneut.
8. Fügen Sie den VoiceCraft UDP-Endpunkt im Client hinzu.
9. Verbinden Sie die Minecraft-Seite mit der passenden Addon- oder Plugin-Anleitung.

## Vorgefertigte Binärversionen

Die Veröffentlichungsseite enthält normalerweise Folgendes:

- Windows:
  `VoiceCraft.Server.Windows.x64.v1.7.0.zip`, `x86`, `arm64`
- Linux:
  `VoiceCraft.Server.Linux.x64.v1.7.0.zip`, `arm`, `arm64`

Herunterladen: [Download-Seite](/download)

## Windows

1. Laden Sie `VoiceCraft.Server.Windows.<arch>.v1.7.0.zip` herunter.
2. Extrahieren Sie das Archiv in einen speziellen Ordner.
3. Starten Sie den Server aus diesem Ordner:

```powershell
./VoiceCraft.Server.exe
```

Der erste Lauf erstellt `config/ServerProperties.json`. Bewahren Sie diese Datei im Serverordner auf und löschen Sie sie nicht zwischen Neustarts.

## Linux

1. Laden Sie `VoiceCraft.Server.Linux.<arch>.v1.7.0.zip` herunter.
2. Extrahieren Sie das Archiv in einen speziellen Ordner.
3. Starten Sie den Server aus diesem Ordner:

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

Der erste Lauf erstellt `config/ServerProperties.json`. Bewahren Sie diese Datei im Serverordner auf und stellen Sie sicher, dass sie in den Backups enthalten ist.

## Nach dem ersten Start

Stoppen Sie den Server und öffnen Sie `config/ServerProperties.json`, bevor Sie Minecraft oder Spieler verbinden.

Führen Sie zuerst diese Änderungen durch:

1. Ersetzen Sie jedes generierte gemeinsame Token:
   - `McHttpConfig.LoginToken`
   - `McWssConfig.LoginToken`
   - `McTcpConfig.LoginToken`
2. Wählen Sie einen primären Minecraft-Transport aus:
   - Dedizierter Bedrock-Server: `McHttpConfig` aktivieren
   - lokale Bedrock-Welt: `McWssConfig` aktivieren
   - Java + Geyser/Floodgate: `McTcpConfig` aktivieren
3. Legen Sie den Transporthost fest:
   - Verwenden Sie `127.0.0.1`, wenn Minecraft auf demselben Computer ausgeführt wird
   - Verwenden Sie `0.0.0.0` oder eine LAN-/öffentliche Adresse nur, wenn eine andere Maschine eine Verbindung herstellen muss
4. Halten Sie `VoiceCraftConfig.Port` für Spieler-Clients verfügbar.
5. Starten Sie `VoiceCraft.Server` neu, nachdem Sie die Konfiguration gespeichert haben.

Fahren Sie für alle Konfigurationsfelder mit [Erster Serverlauf](/server/first-run) und [ServerProperties.json](/server/server-properties) fort.

## Verbinden Sie den Rest des Stapels

Sobald der Server sauber neu startet:

1. Installieren Sie den VoiceCraft-Client für jeden Spieler von der [Download-Seite](/download).
2. Fügen Sie im Client einen Servereintrag hinzu:
   - Host: Ihre VoiceCraft-Serveradresse
   - Port: `VoiceCraftConfig.Port`, normalerweise `9050`
3. Befolgen Sie die Minecraft-Anleitung für den ausgewählten Transport:
   - [McHttp for BDS](/minecraft/mchttp-bds)
   - [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
   - [VoiceCraft.Java](/ecosystem/voicecraft-java)

Der Server gilt erst dann als vollständig eingerichtet, wenn der Client eine Verbindung herstellt und sich die Minecraft-Seite mit demselben Transporttoken authentifiziert.

## macOS

Möglicherweise gibt es nicht immer ein vorgefertigtes dediziertes Artefakt, aber der Server kann aus dem Quellcode erstellt werden:

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

Ersetzen Sie für Intel macOS `osx-arm64` durch `osx-x64`.

## Docker / Container

Auf Container-Images wird in der README-Datei des Haupt-Repositorys verwiesen:

- [VoiceCraft Docker Hub](https://hub.docker.com/r/sinevector241/voicecraft/tags)

Die Containerbereitstellung ist nützlich, wenn:

- Sie möchten eine dedizierte Servicegrenze
- Sie führen bereits BDS-/Java-Knoten in Containern aus
- Sie möchten einfachere Neustartrichtlinien und Protokolle

Behalten Sie nach dem Start des Containers den generierten `config/ServerProperties.json` bei und bearbeiten Sie ihn auf die gleiche Weise wie bei einer normalen Binärinstallation.

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
- bestehen bleiben `config/`
- sichern `ServerProperties.json`
- Mischen Sie nicht mehrere Umgebungen im selben Ordner

## Fertige Checkliste

Bevor Sie das Setup für Spieler öffnen, bestätigen Sie Folgendes:

- `VoiceCraft.Server` startet ohne Konfigurations- oder Portfehler
- Alle generierten `LoginToken`-Werte wurden ersetzt
- Nur der Transport, den Sie benötigen, wird angezeigt
- Client-Host und Port stimmen überein: `VoiceCraftConfig.Port`
- Das Minecraft-Add-on oder -Plugin verwendet das passende Transport-Token
- Bindungsablauf funktioniert im Spiel

## Als systemd-Dienst ausführen (Linux)

Beispiel `/etc/systemd/system/voicecraft.service`:

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

SDK- und Projektdetails finden Sie unter [VoiceCraft-Repository und Build](/ecosystem/voicecraft-repository).

Minimaler Durchfluss:

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## Was Sie als nächstes lesen sollten

- [Erster Serverlauf](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Transportmodi](/server/transports)
- [Clientinstallation](/client/installation)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [VoiceCraft.Java](/ecosystem/voicecraft-java)
