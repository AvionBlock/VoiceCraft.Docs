# Instalacja klienta

`VoiceCraft.Client` jest aplikacją gracza.

VoiceCraft `1.7.0` dostarcza natywne klienty desktop/mobile. Browser/web client został usunięty.

## Wymagania

- adres serwera
- UDP port z `VoiceCraftConfig.Port`
- mikrofon i urządzenie wyjściowe
- zgodny `Positioning Type`
- klient `1.7.x` dla serwera `1.7.x`

Lokalnie:

```text
127.0.0.1:9050
```

## Windows

Pobierz `VoiceCraft.Client.Windows.<Architecture>.zip`, rozpakuj i uruchom `.exe`.

## Linux

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

Apple Silicon używa arm64, Intel używa x64. Jeśli macOS blokuje start:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## Android

Zainstaluj APK z `VoiceCraft.Client.Android.<Architecture>.zip` i pozwól na mikrofon. `1.7.0` używa Android package version `17`.

## iOS

Zainstaluj `VoiceCraft.Client.iOS.arm64.ipa` przez AltStore, TestFlight albo wspieraną metodę. Pozwól na mikrofon i local network.

`1.7.0` zawiera fix iOS sample-rate. Bundle ID: `team.avion.voicecraft`.

## Pierwszy start

1. Wybierz input/output devices.
2. Sprawdź microphone test.
3. Dodaj server host i port.
4. Dopasuj `Positioning Type`.
5. Potem testuj Minecraft bind.
