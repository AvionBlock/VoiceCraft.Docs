# Client Installation

`VoiceCraft.Client` is the player-facing app. Every player who wants to speak or hear proximity voice needs it running on their own device.

Install the client after `VoiceCraft.Server` is reachable. During first launch you will add a server entry that points to the VoiceCraft UDP endpoint, usually `host:9050`.

## Before you start

You need:

- the server address players should use
- the server UDP port from `VoiceCraftConfig.Port`
- a microphone and playback device available to the operating system
- matching `Positioning Type` between client and server

For local testing, the endpoint is usually:

```text
127.0.0.1:9050
```

For remote servers, use the public or LAN address of the machine running `VoiceCraft.Server`.

## Windows

1. Download `VoiceCraft.Client.Windows.<Architecture>.zip`.
2. Extract the archive.
3. Run `VoiceCraft.Client.Windows.exe`.
4. If Windows SmartScreen appears, verify that the file came from the official release page before continuing.

## Linux

1. Download `VoiceCraft.Client.Linux.<Architecture>.zip`.
2. Extract the archive.
3. Grant permissions and run:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

If the app cannot see audio devices, check PulseAudio/PipeWire permissions and whether the app is running inside a restricted sandbox.

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

Only remove quarantine for builds you intentionally downloaded and trust.

## Android

1. Download `VoiceCraft.Client.Android.<Architecture>.zip`.
2. Extract the archive.
3. Open the `.apk` from the archive and install.
4. Allow microphone permission when Android asks.

## iOS (AltStore / sideload)

1. Download `VoiceCraft.Client.iOS.arm64.ipa`.
2. Install IPA via AltStore or another sideload tool.
3. If needed, allow the profile in iOS settings.
4. Allow microphone permission on first launch.

## Note About .NET Runtime

For older releases (before `v1.4.0`), installed .NET 9 runtime may be required.
For current self-contained builds, it is usually not required.

## First launch checklist

1. Open the client.
2. Select input and output devices.
3. Use microphone test to confirm input level.
4. Add a server entry:
   - host: VoiceCraft server address
   - port: `VoiceCraftConfig.Port`
5. Confirm `Positioning Type` matches the server.
6. Connect before starting the Minecraft bind flow.

The client connecting successfully only proves the voice endpoint is reachable. Minecraft proximity still depends on the addon or plugin connecting to the matching transport.

## Common first-launch issues

- No microphone input:
  check OS microphone permission and selected input device.
- Client connects but no proximity:
  check Minecraft transport, bind flow, and `Positioning Type`.
- Remote server does not connect:
  confirm the UDP port is open between the player and `VoiceCraft.Server`.
- Player hears everyone at the wrong distance:
  check entity position updates and world IDs.

## Screenshots

![General Settings](/images/voicecraft/settings-general.png)
![Voice Settings](/images/voicecraft/settings-voice.png)
