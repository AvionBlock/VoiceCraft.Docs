# Clientinstallatie

## Windows

1. Download `VoiceCraft.Client.Windows.<Architecture>.zip`.
2. Pak het archief uit.
3. Run `VoiceCraft.Client.Windows.exe`.

## Linux

1. Download `VoiceCraft.Client.Linux.<Architecture>.zip`.
2. Pak het archief uit.
3. Verleen machtigingen en voer het volgende uit:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

Kies één pakket:

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` for Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` for Intel

### DMG

1. Open `.dmg`.
2. Drag `VoiceCraft.app` to `Applications`.
3. Start de app.

### PKG

1. Open `.pkg`.
2. Voltooi het installatieprogramma.
3. Launch `VoiceCraft` from `Applications`.

Als macOS het opstarten blokkeert:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## Android

1. Download `VoiceCraft.Client.Android.<Architecture>.zip`.
2. Pak het archief uit.
3. Open the `.apk` from the archive and install.

## iOS (AltStore / sideload)

1. Download `VoiceCraft.Client.iOS.arm64.ipa`.
2. Installeer IPA via AltStore of een andere sideload-tool.
3. Sta het profiel indien nodig toe in de iOS-instellingen.

## Opmerking over .NET Runtime

For older releases (before `v1.4.0`), installed .NET 9 runtime may be required.
Voor huidige, op zichzelf staande builds is dit meestal niet vereist.

## UI-screenshots (plaatsaanduidingen)

![Algemene instellingen](/images/voicecraft/settings-general.png)
![Steminstellingen](/images/voicecraft/settings-voice.png)
