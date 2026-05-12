# Instalacja klienta

## Okna

1. Download `VoiceCraft.Client.Windows.<Architecture>.zip`.
2. Wypakuj archiwum.
3. Run `VoiceCraft.Client.Windows.exe`.

## Linux

1. Download `VoiceCraft.Client.Linux.<Architecture>.zip`.
2. Wypakuj archiwum.
3. Przyznaj uprawnienia i uruchom:

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

## macOS

Wybierz jeden pakiet:

- `VoiceCraft.Client.MacOS.arm64.dmg` / `.pkg` for Apple Silicon
- `VoiceCraft.Client.MacOS.x64.dmg` / `.pkg` for Intel

###DMG

1. Open `.dmg`.
2. Drag `VoiceCraft.app` to `Applications`.
3. Uruchom aplikację.

### PKG

1. Open `.pkg`.
2. Zakończ instalację.
3. Launch `VoiceCraft` from `Applications`.

Jeśli macOS blokuje uruchamianie:

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

## Androida

1. Download `VoiceCraft.Client.Android.<Architecture>.zip`.
2. Wypakuj archiwum.
3. Open the `.apk` from the archive and install.

## iOS (AltStore / ładowanie boczne)

1. Download `VoiceCraft.Client.iOS.arm64.ipa`.
2. Zainstaluj IPA poprzez AltStore lub inne narzędzie sideload.
3. W razie potrzeby zezwól na profil w ustawieniach iOS.

## Uwaga dotycząca środowiska wykonawczego platformy .NET

For older releases (before `v1.4.0`), installed .NET 9 runtime may be required.
W przypadku obecnych samodzielnych kompilacji zwykle nie jest to wymagane.

## Zrzuty ekranu interfejsu użytkownika (elementy zastępcze)

![Ustawienia ogólne](/images/voicecraft/settings-general.png)
![Ustawienia głosu](/images/voicecraft/settings-voice.png)
