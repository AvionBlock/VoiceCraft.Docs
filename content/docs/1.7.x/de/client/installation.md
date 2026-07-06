# Client-Installation

`VoiceCraft.Client` ist die App für Spieler. Jeder Spieler, der sprechen oder Proximity-Voice hören möchte, benötigt sie.

VoiceCraft `1.7.0` unterstützt native Desktop- und Mobile-Clients. Der Browser/Web-Client wurde entfernt.

## Voraussetzungen

- Serveradresse
- UDP-Port aus `VoiceCraftConfig.Port`
- Mikrofon und Wiedergabegerät
- passender `Positioning Type`
- `1.7.x` Client für `1.7.x` Server

Lokaler Test:

```text
127.0.0.1:9050
```

## Windows

1. `VoiceCraft.Client.Windows.<Architecture>.zip` herunterladen.
2. Entpacken.
3. `VoiceCraft.Client.Windows.exe` starten.

## Linux

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

Bei fehlenden Audiogeräten PulseAudio/PipeWire und Sandbox-Rechte prüfen.

## macOS

Apple Silicon nutzt arm64, Intel Macs nutzen x64. Wenn macOS den Start blockiert:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

Nur für vertrauenswürdige Builds verwenden.

## Android

APK aus `VoiceCraft.Client.Android.<Architecture>.zip` installieren und Mikrofonrechte erlauben. `1.7.0` nutzt Android Package Version `17`.

## iOS

`VoiceCraft.Client.iOS.arm64.ipa` über AltStore, TestFlight oder einen unterstützten Weg installieren. Mikrofon- und lokale Netzwerkrechte erlauben.

`1.7.0` enthält einen Fix für iOS Sample-Rate-Konvertierung. Die Bundle ID lautet `team.avion.voicecraft`.

## Erster Start

1. Eingabe- und Ausgabegeräte wählen.
2. Mikrofontest prüfen.
3. Server mit Host und `VoiceCraftConfig.Port` hinzufügen.
4. `Positioning Type` abgleichen.
5. Erst danach Minecraft-Bind testen.
