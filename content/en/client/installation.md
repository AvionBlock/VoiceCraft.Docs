# Client Installation

## Windows

1. Download `VoiceCraft.Client.Windows.<Architecture>.zip`.
2. Extract the archive.
3. Run `VoiceCraft.Client.Windows.exe`.

## Linux

1. Download `VoiceCraft.Client.Linux.<Architecture>.zip`.
2. Extract the archive.
3. Grant permissions and run:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

Choose one package:

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` for Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` for Intel

### DMG

1. Open `.dmg`.
2. Drag `VoiceCraft.app` to `Applications`.
3. Launch the app.

### PKG

1. Open `.pkg`.
2. Complete the installer.
3. Launch `VoiceCraft` from `Applications`.

If macOS blocks startup:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## Android

1. Download `VoiceCraft.Client.Android.<Architecture>.zip`.
2. Extract the archive.
3. Open the `.apk` from the archive and install.

## iOS (AltStore / sideload)

1. Download `VoiceCraft.Client.iOS.arm64.ipa`.
2. Install IPA via AltStore or another sideload tool.
3. If needed, allow the profile in iOS settings.

## Note About .NET Runtime

For older releases (before `v1.4.0`), installed .NET 9 runtime may be required.
For current self-contained builds, it is usually not required.

## UI Screenshots (Placeholders)

![General Settings](/images/voicecraft/settings-general.png)
![Voice Settings](/images/voicecraft/settings-voice.png)
