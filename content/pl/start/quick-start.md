# Szybki start

Ten przewodnik to najszybszy sposób na uzyskanie działającego stosu VoiceCraft.

## Najpierw wybierz topologię

VoiceCraft można wdrożyć na kilka sposobów:

- Bedrock Dedicated Server: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Local Bedrock world / singleplayer: `VoiceCraft.Server` or local runtime + `Core.McWss`
- Java server with Geyser/Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- Direct Paper server: `GeyserVoice` can also download and run the VoiceCraft runtime under the hood

Jeśli nie jesteś pewien, zacznij od jednego z poniższych:

- Serwer dedykowany Bedrock: czytaj [McHttp for BDS](/minecraft/mchttp-bds)
- Serwer Java + Geyser: czytaj [GeyserVoice](/ecosystem/geyservoice)

## 1. Pobierz serwer

1. Otwórz [stronę pobierania](/download).
2. Pobierz archiwum serwera dla swojej platformy:
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

Jeśli budujesz ze źródła, zobacz [Repozytorium i kompilacja VoiceCraft](/ecosystem/voicecraft-repository).

## 2. Uruchom serwer raz

### Okna

```powershell
./VoiceCraft.Server.exe
```

### Linuksa

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

After first launch, VoiceCraft generates `config/ServerProperties.json`.

## 3. Zabezpiecz wygenerowaną konfigurację

Przed połączeniem Minecrafta lub graczy zmień każdy wygenerowany token współdzielony:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Zwykle potrzebujesz różnych wartości dla każdego środowiska.

## 4. Wybierz transport Minecraft

VoiceCraft ma obecnie 3 transporty skierowane do Minecrafta:

- `McHttp`:
  Najlepszy dla serwera dedykowanego Bedrock i najbardziej stabilna automatyzacja Bedrock.
- `McWss`:
  Najlepsze do scenariuszy lokalnych światów, testowania i tunelu poleceń.
- `McTcp`:
  Best for Java-side bridges such as `GeyserVoice`.

Pełne porównanie znajdziesz w [Tryby transportu](/server/transports).

## 5. Pobierz klienta

Ze [strony pobierania](/download) pobierz pakiet dla swoich graczy:

- Windows: `VoiceCraft.Client.Windows.<arch>.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.dmg` or `.pkg`
- Android: `VoiceCraft.Client.Android.arm64.zip` (APK inside)
- iOS: `VoiceCraft.Client.iOS.arm64.ipa`

## 6. Dodaj serwer w kliencie

1. Otwórz klienta.
2. Dodaj wpis serwera w interfejsie użytkownika.
3. Use the VoiceCraft UDP endpoint from `VoiceCraftConfig.Port`.

Typowa konfiguracja lokalna:

- host: `127.0.0.1`
- port: `9050`

## 7. Połącz stronę Minecrafta

- W przypadku serwera dedykowanego Bedrock użyj [McHttp for BDS](/minecraft/mchttp-bds).
- W przypadku lokalnego świata Bedrock użyj [McWss dla światów dla jednego gracza](/minecraft/mcwss-singleplayer).
- W przypadku Java + Geyser/Floodgate użyj [GeyserVoice](/ecosystem/geyservoice).

Jeśli wdrażasz na Bedrock, trzymaj te dwie strony w pobliżu:

- [Strona pobierania](/download) dla surowych plików wersji klienta/serwera/dodatków
- [Konfigurator dodatków](/addon-configurator) dla gotowego do rozpakowania archiwum świata

## 8. Sprawdź stos

Jeśli wszystko jest poprawnie skonfigurowane:

- Serwer VoiceCraft uruchamia się bez błędów konfiguracji i portu
- klient łączy się bez błędów transportowych
- Integracja z Minecraftem uwierzytelnia się za pomocą oczekiwanego tokena
- tworzenie encji i praca z przepływem powiązań
- gracze słyszą głos zbliżeniowy, gdy są w zasięgu

## Polecane kolejne lektury

- [Instalacja serwera](/server/installation)
- [Pierwsze uruchomienie serwera](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Zastąpienia środowiska wykonawczego](/server/runtime-overrides)
- [Tryby transportu](/server/transports)
- [Strona pobierania](/download)
- [Konfigurator dodatków](/addon-configurator)
