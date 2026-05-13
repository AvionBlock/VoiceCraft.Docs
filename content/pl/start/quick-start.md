# Szybki start

Ten przewodnik to najszybszy sposób na uzyskanie działającego stosu VoiceCraft.

Celowo przechodzi przez całą ścieżkę: serwer, wygenerowaną konfigurację, klienta, transport Minecraft i walidację. Nie zatrzymuj się po uruchomieniu pliku binarnego serwera; w tym momencie istnieje zaplecze głosowe, ale Minecraft nie jest jeszcze podłączony.

## Najpierw wybierz topologię

VoiceCraft można wdrożyć na kilka sposobów:

- Serwer dedykowany Bedrock: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Lokalny świat Bedrock / tryb dla jednego gracza: `VoiceCraft.Server` lub lokalne środowisko wykonawcze + `Core.McWss`
- Serwer Java z Geyser/Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- Serwer Direct Paper: `GeyserVoice` może także pobrać i uruchomić środowisko wykonawcze VoiceCraft

Jeśli nie jesteś pewien, zacznij od jednego z poniższych:

- Serwer dedykowany Bedrock: czytaj [McHttp for BDS](/minecraft/mchttp-bds)
- Serwer Java + Geyser: czytaj [GeyserVoice](/ecosystem/geyservoice)

W przypadku pierwszej konfiguracji wybierz jedną topologię i udostępnij tylko potrzebny jej transport. Możesz dodać konfiguracje mieszane później, gdy zadziała podstawowe wiązanie i przepływ dźwięku zależnego od odległości.

## 1. Pobierz serwer

1. Otwórz [stronę pobierania](/download).
2. Pobierz archiwum serwera dla swojej platformy:
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

Jeśli budujesz ze źródła, zobacz [repozytorium i budowanie VoiceCraft](/ecosystem/voicecraft-repository).

## 2. Uruchom serwer raz

Uruchom z folderu, w którym chcesz umieścić `config/ServerProperties.json`.

### Windows

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

Po pierwszym uruchomieniu VoiceCraft generuje `config/ServerProperties.json`.

Zatrzymaj serwer przed edycją tego pliku.

## 3. Zabezpiecz wygenerowaną konfigurację

Przed połączeniem Minecrafta lub graczy zmień każdy wygenerowany token współdzielony:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Zwykle potrzebujesz różnych wartości dla każdego środowiska.

Token, którego później użyjesz, musi pasować do transportu:

- Dodatek BDS `McHttp` używa `McHttpConfig.LoginToken`
- lokalny dodatek Bedrock `McWss` używa `McWssConfig.LoginToken`
- `GeyserVoice` używa `McTcpConfig.LoginToken`

## 4. Wybierz transport Minecraft

VoiceCraft ma obecnie 3 transporty po stronie Minecrafta:

- `McHttp`:
  Najlepszy dla serwera dedykowanego Bedrock i najbardziej stabilna automatyzacja Bedrock.
- `McWss`:
  Najlepsze do scenariuszy lokalnych światów, testowania i tunelu poleceń.
- `McTcp`:
  Najlepsze dla mostów po stronie Java, takich jak `GeyserVoice`.

Pełne porównanie można znaleźć w [trybach transportu](/server/transports).

Upewnij się, że wybrany transport jest włączony i powiązany z adresem, do którego może dotrzeć środowisko wykonawcze po stronie Minecrafta.

## 5. Pobierz klienta

Ze [strony pobierania](/download) pobierz pakiet dla swoich graczy:

- Windows: `VoiceCraft.Client.Windows.<arch>.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.dmg` lub `.pkg`
- Android: `VoiceCraft.Client.Android.arm64.zip` (APK w środku)
- iOS: `VoiceCraft.Client.iOS.arm64.ipa`

## 6. Dodaj serwer w kliencie

1. Otwórz klienta.
2. Wybierz mikrofon i urządzenia odtwarzające.
3. Dodaj wpis serwera w interfejsie użytkownika.
4. Użyj punktu końcowego UDP VoiceCraft z `VoiceCraftConfig.Port`.
5. Potwierdź, że klient `Positioning Type` pasuje do `VoiceCraftConfig.PositioningType`.

Typowa konfiguracja lokalna:

- host: `127.0.0.1`
- port: `9050`

## 7. Podłącz stronę Minecraft

- W przypadku serwera dedykowanego Bedrock użyj [McHttp for BDS](/minecraft/mchttp-bds).
- W przypadku lokalnego świata Bedrock użyj [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).
- W przypadku Java + Geyser/Floodgate użyj [GeyserVoice](/ecosystem/geyservoice).

Ten krok zapewnia VoiceCraftowi stan gry potrzebny do dźwięku zależnego od odległości: tożsamość gracza, dane powiązania, identyfikatory światów, aktualizacje pozycji i stan efektu.

Jeśli wdrażasz na Bedrock, trzymaj te dwie strony w pobliżu:

- [Strona pobierania](/download) dla plików wydań klienta, serwera i dodatku
- [Konfigurator dodatku](/addon-configurator) dla gotowego do rozpakowania archiwum świata

## 8. Sprawdź stos

Jeśli wszystko jest poprawnie skonfigurowane:

- Serwer VoiceCraft uruchamia się bez błędów konfiguracji i portu
- klient łączy się bez błędów transportu
- Integracja z Minecraftem uwierzytelnia się za pomocą oczekiwanego tokena
- tworzenie encji i przepływ powiązania działają
- gracze słyszą głos zależny od odległości, gdy znajdują się w zasięgu

Jeśli klient łączy się, ale dźwięk zależny od odległości nie działa, przed zmianą ustawień audio zdebuguj transport Minecraft i przepływ powiązań.

## Polecane kolejne lektury

- [Instalacja serwera](/server/installation)
- [Pierwsze uruchomienie serwera](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Nadpisania w czasie wykonywania](/server/runtime-overrides)
- [Tryby transportu](/server/transports)
- [Strona pobierania](/download)
- [Konfigurator dodatku](/addon-configurator)
