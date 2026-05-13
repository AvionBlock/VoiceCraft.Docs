# Schnellstart

Diese Anleitung ist der schnellste Weg, um einen funktionierenden VoiceCraft-Stack zu erhalten.

Es durchläuft absichtlich den gesamten Pfad: Server, generierte Konfiguration, Client, Minecraft-Transport und Validierung. Stoppen Sie nicht, nachdem die Server-Binärdatei gestartet wurde. Zu diesem Zeitpunkt existiert das Sprach-Backend, aber Minecraft hat noch keine Verbindung hergestellt.

## Wählen Sie zunächst Ihre Topologie

VoiceCraft kann auf verschiedene Arten bereitgestellt werden:

- Dedizierter Bedrock-Server: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Lokale Bedrock-Welt / Einzelspieler: `VoiceCraft.Server` oder lokale Laufzeit + `Core.McWss`
- Java-Server mit Geyser/Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- Direct Paper-Server: `GeyserVoice` kann auch die VoiceCraft-Laufzeitumgebung herunterladen und ausführen

Wenn Sie sich nicht sicher sind, beginnen Sie mit einem dieser Schritte:

- Dedizierter Bedrock-Server: lesen Sie [McHttp for BDS](/minecraft/mchttp-bds)
- Java + Geyser-Server: [GeyserVoice](/ecosystem/geyservoice) lesen

Wählen Sie für eine erste Einrichtung eine Topologie aus und stellen Sie nur den Transport bereit, den sie benötigt. Sie können später gemischte Setups hinzufügen, nachdem der grundlegende Bindungs- und Proximity-Flow funktioniert.

## 1. Laden Sie den Server herunter

1. Öffnen Sie [download page](/download).
2. Laden Sie das Serverarchiv für Ihre Plattform herunter:
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

Wenn Sie aus dem Quellcode erstellen, lesen Sie [VoiceCraft repository and build](/ecosystem/voicecraft-repository).

## 2. Führen Sie den Server einmal aus

Führen Sie den Vorgang aus dem Ordner aus, in dem `config/ServerProperties.json` gespeichert werden soll.

### Windows

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

Nach dem ersten Start generiert VoiceCraft `config/ServerProperties.json`.

Stoppen Sie den Server, bevor Sie diese Datei bearbeiten.

## 3. Sichern Sie die generierte Konfiguration

Bevor Sie Minecraft oder Spieler verbinden, ändern Sie jedes generierte gemeinsame Token:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Normalerweise möchten Sie unterschiedliche Werte pro Umgebung.

Der Token, den Sie später verwenden, muss mit dem Transport übereinstimmen:

- BDS `McHttp` Add-on verwendet `McHttpConfig.LoginToken`
- Das lokale Bedrock `McWss`-Add-on verwendet `McWssConfig.LoginToken`
- `GeyserVoice` verwendet `McTcpConfig.LoginToken`

## 4. Wählen Sie den Minecraft-Transporter

VoiceCraft verfügt derzeit über drei Minecraft-orientierte Transportmittel:

- `McHttp`:
  Am besten geeignet für dedizierte Bedrock-Server und die stabilste Bedrock-Automatisierung.
- `McWss`:
  Am besten für lokale Welten, Tests und Befehlstunnelszenarien geeignet.
- `McTcp`:
  Am besten für Java-seitige Bridges wie `GeyserVoice` geeignet.

Den vollständigen Vergleich finden Sie unter [Transport Modes](/server/transports).

Stellen Sie sicher, dass der ausgewählte Transport aktiviert und an eine Adresse gebunden ist, die die Minecraft-seitige Laufzeit erreichen kann.

## 5. Laden Sie den Client herunter

Laden Sie von [download page](/download) das Paket für Ihre Spieler herunter:

- Windows: `VoiceCraft.Client.Windows.<arch>.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.dmg` oder `.pkg`
- Android: `VoiceCraft.Client.Android.arm64.zip` (APK enthalten)
- iOS: `VoiceCraft.Client.iOS.arm64.ipa`

## 6. Fügen Sie den Server im Client hinzu

1. Öffnen Sie den Client.
2. Wählen Sie Mikrofon und Wiedergabegeräte aus.
3. Fügen Sie einen Servereintrag in der Benutzeroberfläche hinzu.
4. Verwenden Sie den VoiceCraft UDP-Endpunkt von `VoiceCraftConfig.Port`.
5. Bestätigen Sie, dass Client `Positioning Type` mit `VoiceCraftConfig.PositioningType` übereinstimmt.

Typisches lokales Setup:

- Gastgeber: `127.0.0.1`
- Port: `9050`

## 7. Verbinden Sie die Minecraft-Seite

- Verwenden Sie für Bedrock Dedicated Server [McHttp for BDS](/minecraft/mchttp-bds).
- Für eine lokale Bedrock-Welt verwenden Sie [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).
- Verwenden Sie für Java + Geyser/Floodgate [GeyserVoice](/ecosystem/geyservoice).

Durch diesen Schritt erhält VoiceCraft den In-Game-Status, der für Proximity-Audio erforderlich ist: Spieleridentität, Bindungsdaten, Welt-IDs, Positionsaktualisierungen und Effektstatus.

Wenn Sie auf Bedrock bereitstellen, bewahren Sie diese beiden Seiten in der Nähe auf:

- [Download Page](/download) für Rohversionsdateien für Client/Server/Add-On
- [Addon Configurator](/addon-configurator) für ein sofort entpackbares Weltarchiv

## 8. Überprüfen Sie den Stapel

Wenn alles richtig konfiguriert ist:

- Der VoiceCraft-Server startet ohne Konfigurations- oder Portfehler
- Der Client stellt eine Verbindung ohne Transportfehler her
- Die Minecraft-Integration authentifiziert sich mit dem erwarteten Token
- Entitätserstellung und Bindungsflussarbeit
- Spieler hören eine Annäherungsstimme, wenn sie sich in Reichweite befinden

Wenn der Client eine Verbindung herstellt, die Nähe jedoch nicht funktioniert, debuggen Sie den Minecraft-Transport- und Bindungsfluss, bevor Sie die Audioeinstellungen ändern.

## Empfohlene nächste Lektüre

- [Server Installation](/server/installation)
- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Runtime Overrides](/server/runtime-overrides)
- [Transport Modes](/server/transports)
- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
