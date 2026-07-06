# Clientinstallatie

`VoiceCraft.Client` is de app voor spelers.

VoiceCraft `1.7.0` levert native desktop- en mobile clients. De browser/web client is verwijderd.

## Vereisten

- serveradres
- UDP-poort uit `VoiceCraftConfig.Port`
- microfoon en uitvoerapparaat
- passende `Positioning Type`
- `1.7.x` client voor `1.7.x` server

Lokaal:

```text
127.0.0.1:9050
```

## Windows

Download `VoiceCraft.Client.Windows.<Architecture>.zip`, pak uit en start `.exe`.

## Linux

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

Apple Silicon gebruikt arm64, Intel gebruikt x64.

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## Android

Installeer de APK uit `VoiceCraft.Client.Android.<Architecture>.zip` en geef microfoonrechten. `1.7.0` gebruikt Android package version `17`.

## iOS

Installeer `VoiceCraft.Client.iOS.arm64.ipa` via AltStore, TestFlight of een ondersteunde route. Geef microfoon- en local network-permissies.

`1.7.0` bevat een iOS sample-rate fix. Bundle ID: `team.avion.voicecraft`.

## Eerste start

1. Kies input/output devices.
2. Test de microfoon.
3. Voeg host en port toe.
4. Controleer `Positioning Type`.
5. Test daarna Minecraft bind.
