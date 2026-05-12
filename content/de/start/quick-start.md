# Schnellstart

Diese Anleitung ist der schnellste Weg, um einen funktionierenden VoiceCraft-Stack zu erhalten.

## Wählen Sie zuerst Ihre Topologie

VoiceCraft kann auf verschiedene Arten bereitgestellt werden:

- Bedrock Dedicated Server: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Local Bedrock world / singleplayer: `VoiceCraft.Server` or local runtime + `Core.McWss`
- Java server with Geyser/Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- Direct Paper server: `GeyserVoice` can also download and run the VoiceCraft runtime under the hood

Wenn Sie sich nicht sicher sind, beginnen Sie mit einem dieser Schritte:

- Dedizierter Bedrock-Server: lesen Sie [McHttp für BDS](/minecraft/mchttp-bds)
- Java + Geyser-Server: [GeyserVoice](/ecosystem/geyservoice) lesen

## 1. Laden Sie den Server herunter

1. Öffnen Sie die [Download-Seite](/download).
2. Laden Sie das Serverarchiv für Ihre Plattform herunter:
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

Wenn Sie aus dem Quellcode erstellen, lesen Sie [VoiceCraft-Repository und Build](/ecosystem/voicecraft-repository).

## 2. Führen Sie den Server einmal aus

### Windows

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

After first launch, VoiceCraft generates `config/ServerProperties.json`.

## 3. Sichern Sie die generierte Konfiguration

Bevor Sie Minecraft oder Spieler verbinden, ändern Sie jedes generierte gemeinsame Token:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Normalerweise möchten Sie unterschiedliche Werte pro Umgebung.

## 4. Wählen Sie den Minecraft-Transporter

VoiceCraft verfügt derzeit über drei Minecraft-orientierte Transportmittel:

- `McHttp`:
  Am besten geeignet für dedizierte Bedrock-Server und die stabilste Bedrock-Automatisierung.
- `McWss`:
  Am besten für lokale Welten, Tests und Befehlstunnelszenarien geeignet.
- `McTcp`:
  Best for Java-side bridges such as `GeyserVoice`.

Den vollständigen Vergleich finden Sie unter [Transportmodi](/server/transports).

## 5. Laden Sie den Client herunter

Laden Sie von der [Download-Seite](/download) das Paket für Ihre Player herunter:

- Windows: `VoiceCraft.Client.Windows.<arch>.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.dmg` or `.pkg`
- Android: `VoiceCraft.Client.Android.arm64.zip` (APK inside)
- iOS: `VoiceCraft.Client.iOS.arm64.ipa`

## 6. Fügen Sie den Server im Client hinzu

1. Öffnen Sie den Client.
2. Fügen Sie einen Servereintrag in der Benutzeroberfläche hinzu.
3. Use the VoiceCraft UDP endpoint from `VoiceCraftConfig.Port`.

Typisches lokales Setup:

- host: `127.0.0.1`
- port: `9050`

## 7. Verbinden Sie die Minecraft-Seite

- Für Bedrock Dedicated Server verwenden Sie [McHttp für BDS](/minecraft/mchttp-bds).
- Für eine lokale Bedrock-Welt verwenden Sie [McWss für Einzelspieler-Welten](/minecraft/mcwss-singleplayer).
- Für Java + Geyser/Floodgate verwenden Sie [GeyserVoice](/ecosystem/geyservoice).

Wenn Sie auf Bedrock bereitstellen, bewahren Sie diese beiden Seiten in der Nähe auf:

- [Download-Seite](/download) für Rohversionsdateien für Client/Server/Add-On
- [Addon-Konfigurator](/addon-configurator) für ein sofort entpackbares Weltarchiv

## 8. Überprüfen Sie den Stapel

Wenn alles richtig konfiguriert ist:

- Der VoiceCraft-Server startet ohne Konfigurations- oder Portfehler
- Client verbindet sich ohne Transportfehler
– Die Minecraft-Integration authentifiziert sich mit dem erwarteten Token
- Entitätserstellung und Bindungsflussarbeit
- Spieler hören eine Annäherungsstimme, wenn sie sich in Reichweite befinden

## Empfohlene nächste Lektüre

- [Serverinstallation](/server/installation)
- [Erster Serverlauf](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Laufzeitüberschreibungen](/server/runtime-overrides)
- [Transportmodi](/server/transports)
- [Download-Seite](/download)
- [Addon-Konfigurator](/addon-configurator)
