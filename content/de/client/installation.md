# Client-Installation

`VoiceCraft.Client` ist die spielerorientierte App. Jeder Spieler, der sprechen oder Annäherungsstimmen hören möchte, muss diese auf seinem eigenen Gerät ausführen.

Installieren Sie den Client, nachdem `VoiceCraft.Server` erreichbar ist. Beim ersten Start fügen Sie einen Servereintrag hinzu, der auf den VoiceCraft UDP-Endpunkt verweist, normalerweise `host:9050`.

## Bevor Sie beginnen

Sie benötigen:

- Die Serveradresse, die Spieler verwenden sollten
- der Server-UDP-Port von `VoiceCraftConfig.Port`
- ein Mikrofon und ein Wiedergabegerät, das dem Betriebssystem zur Verfügung steht
- Übereinstimmung von `Positioning Type` zwischen Client und Server

Für lokale Tests ist der Endpunkt normalerweise:

```text
127.0.0.1:9050
```

Verwenden Sie für Remote-Server die öffentliche oder LAN-Adresse des Computers, auf dem `VoiceCraft.Server` ausgeführt wird.

## Windows

1. Laden Sie `VoiceCraft.Client.Windows.<Architecture>.zip` herunter.
2. Extrahieren Sie das Archiv.
3. Führen Sie `VoiceCraft.Client.Windows.exe` aus.
4. Wenn Windows SmartScreen angezeigt wird, überprüfen Sie, ob die Datei von der offiziellen Veröffentlichungsseite stammt, bevor Sie fortfahren.

## Linux

1. Laden Sie `VoiceCraft.Client.Linux.<Architecture>.zip` herunter.
2. Extrahieren Sie das Archiv.
3. Erteilen Sie Berechtigungen und führen Sie Folgendes aus:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

Wenn die App keine Audiogeräte sehen kann, überprüfen Sie die PulseAudio/PipeWire-Berechtigungen und ob die App in einer eingeschränkten Sandbox ausgeführt wird.

## macOS

Wählen Sie ein Paket:

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` für Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` für Intel

### DMG

1. Öffnen Sie `.dmg`.
2. Ziehen Sie `VoiceCraft.app` auf `Applications`.
3. Starten Sie die App.

### PKG

1. Öffnen Sie `.pkg`.
2. Schließen Sie das Installationsprogramm ab.
3. Starten Sie `VoiceCraft` von `Applications`.

Wenn macOS den Start blockiert:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

Entfernen Sie die Quarantäne nur für Builds, die Sie absichtlich heruntergeladen haben und denen Sie vertrauen.

## Android

1. Laden Sie `VoiceCraft.Client.Android.<Architecture>.zip` herunter.
2. Extrahieren Sie das Archiv.
3. Öffnen Sie `.apk` aus dem Archiv und installieren Sie es.
4. Erlauben Sie die Mikrofonberechtigung, wenn Android Sie dazu auffordert.

## iOS (AltStore / Sideload)

1. Laden Sie `VoiceCraft.Client.iOS.arm64.ipa` herunter.
2. Installieren Sie IPA über AltStore oder ein anderes Sideload-Tool.
3. Erlauben Sie das Profil bei Bedarf in den iOS-Einstellungen.
4. Erlauben Sie beim ersten Start die Mikrofonberechtigung.

## Hinweis zur .NET-Runtime

Für ältere Versionen (vor `v1.4.0`) ist möglicherweise eine installierte .NET 9-Laufzeitumgebung erforderlich.
Für aktuelle eigenständige Builds ist dies normalerweise nicht erforderlich.

## Checkliste für den ersten Start

1. Öffnen Sie den Client.
2. Wählen Sie Eingabe- und Ausgabegeräte aus.
3. Verwenden Sie den Mikrofontest, um den Eingangspegel zu bestätigen.
4. Fügen Sie einen Servereintrag hinzu:
   - host: VoiceCraft-Serveradresse
   - Port: `VoiceCraftConfig.Port`
5. Bestätigen Sie, dass `Positioning Type` mit dem Server übereinstimmt.
6. Stellen Sie eine Verbindung her, bevor Sie den Minecraft-Bindungsfluss starten.

Die erfolgreiche Verbindung des Clients beweist lediglich, dass der Sprachendpunkt erreichbar ist. Die Nähe zu Minecraft hängt immer noch davon ab, dass das Add-on oder Plugin eine Verbindung zum entsprechenden Transportmittel herstellt.

## Häufige Probleme beim ersten Start

- Kein Mikrofoneingang:
  Überprüfen Sie die Mikrofonberechtigung des Betriebssystems und das ausgewählte Eingabegerät.
- Der Client stellt eine Verbindung her, aber keine Nähe:
  Überprüfen Sie den Minecraft-Transport, den Bindungsfluss und `Positioning Type`.
- Remote-Server stellt keine Verbindung her:
  Vergewissern Sie sich, dass der UDP-Port zwischen dem Player und `VoiceCraft.Server` geöffnet ist.
- Der Spieler hört alle aus der falschen Entfernung:
  Überprüfen Sie Aktualisierungen der Entitätsposition und Welt-IDs.

## Screenshots

![General Settings](/images/voicecraft/settings-general.png)
![Voice Settings](/images/voicecraft/settings-voice.png)
