# Client-Installation

## Windows

1. Download `VoiceCraft.Client.Windows.<Architecture>.zip`.
2. Extrahieren Sie das Archiv.
3. Run `VoiceCraft.Client.Windows.exe`.

## Linux

1. Download `VoiceCraft.Client.Linux.<Architecture>.zip`.
2. Extrahieren Sie das Archiv.
3. Erteilen Sie Berechtigungen und führen Sie Folgendes aus:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

Wählen Sie ein Paket:

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` for Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` for Intel

### DMG

1. Open `.dmg`.
2. Drag `VoiceCraft.app` to `Applications`.
3. Starten Sie die App.

### PKG

1. Open `.pkg`.
2. Schließen Sie das Installationsprogramm ab.
3. Launch `VoiceCraft` from `Applications`.

Wenn macOS den Start blockiert:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## Android

1. Download `VoiceCraft.Client.Android.<Architecture>.zip`.
2. Extrahieren Sie das Archiv.
3. Open the `.apk` from the archive and install.

## iOS (AltStore / Seitenladen)

1. Download `VoiceCraft.Client.iOS.arm64.ipa`.
2. Installieren Sie IPA über AltStore oder ein anderes Sideload-Tool.
3. Erlauben Sie das Profil bei Bedarf in den iOS-Einstellungen.

## Hinweis zur .NET Runtime

For older releases (before `v1.4.0`), installed .NET 9 runtime may be required.
Für aktuelle eigenständige Builds ist dies normalerweise nicht erforderlich.

## UI-Screenshots (Platzhalter)

![Allgemeine Einstellungen](/images/voicecraft/settings-general.png)
![Spracheinstellungen](/images/voicecraft/settings-voice.png)
