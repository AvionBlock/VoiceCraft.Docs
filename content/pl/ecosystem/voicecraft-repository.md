# VoiceCraft (repozytorium i kompilacja)

Repozytorium: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

Repozytorium `VoiceCraft` zawiera podstawowe środowisko wykonawcze. To stamtąd pochodzą klient, serwer, wspólny protokół, model sieci i kompilacje wydań.

W przypadku normalnego wdrożenia nie trzeba kompilować ze źródła. Korzystaj z gotowych wersji, chyba że tworzysz sam VoiceCraft, debugujesz konkretną kompilację lub tworzysz niestandardowe środowisko wykonawcze.

## Struktura repozytorium

- `VoiceCraft.Client/*`
  klienci platformy dla systemów Windows, Linux, macOS, Android, iOS i celów związanych z przeglądarką
- `VoiceCraft.Server`
  samodzielny backend VoiceCraft
- `VoiceCraft.Core`
  współdzielone podstawowe narzędzia, pomocnicy audio, lokalizacja, stałe
- `VoiceCraft.Network`
  pakiety protokołów, transporty, byty, efekty, logika świata
- projekty testowe
  protokół, sieć i zasięg integracji

## Co zawiera repozytorium

Repozytorium jest szersze niż „klient + serwer”:

- model pełnych ustawień klienta
- osadzone lokalizacje
- Transporty skierowane do Minecrafta:
  `McHttp`, `McWss`, `McTcp`
- definicje pakietów dla warstw VoiceCraft i McApi
- efekty dźwiękowe i systemy widoczności

Ważne jest również, aby zrozumieć, czym to repozytorium nie jest: VoiceCraft nie jest pojedynczym modem ani wtyczką do gry Minecraft. Podstawowe środowisko uruchomieniowe współpracuje z klientami i integracjami po stronie Minecrafta, takimi jak `VoiceCraft.Addon` lub `GeyserVoice`.

## Wymagania dotyczące kompilacji

Z kodu źródłowego:

- Zestaw SDK platformy .NET `9.0.312`
- `rollForward: latestMinor`

Sprawdź lokalnie:

```bash
dotnet --info
```

## Zbuduj rozwiązanie

Użyj tego, jeśli chcesz sprawdzić pełne rozwiązanie lub utworzyć lokalne pliki binarne:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

Jeśli przywracanie nie powiedzie się, potwierdź, że zainstalowany zestaw SDK platformy .NET jest zgodny z oczekiwaniami repozytorium `global.json`.

## Uruchom serwer

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

Przydatne opcje roota:

- `--language <locale>`
- `--exit-on-invalid-properties`
- `--transport-mode <http|tcp|wss>`
- `--transport-host <host>`
- `--transport-port <port>`
- `--server-key <token>`

Dodatkowy `--` przekazuje argumenty do projektu serwera, a nie do samego `dotnet run`.

W przypadku wdrożenia preferuj opublikowany artefakt wydania lub dane wyjściowe `dotnet publish` zamiast uruchamiania bezpośrednio ze źródła.

## Klient buduje

Przykłady:

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

Cele mobilne zwykle wymagają własnych zestawów narzędzi SDK platformy.

Kompilacje komputerów stacjonarnych są prostsze, ponieważ wymagane zestawy SDK są częścią zestawu narzędzi .NET/Avalonia. Kompilacje mobilne mogą wymagać specyficznych dla platformy kroków podpisywania i pakowania poza wersją podstawową rozwiązania.

## Osadzone lokalizacje

Aktualne osadzone ustawienia regionalne obejmują:

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## Lista kontrolna produkcji

1. Uruchom `VoiceCraft.Server` raz, aby wygenerować konfigurację.
2. Zastąp wszystkie wygenerowane żetony transportu.
3. Zdecyduj, jakiego transportu faktycznie potrzebujesz:
   - `McHttp`
   - `McWss`
   - `McTcp`
4. Otwórz tylko wymagane porty.
5. Zachowaj kopie zapasowe `ServerProperties.json`.
6. Zainstaluj pasującą integrację po stronie Minecrafta.
7. Potwierdź, że klienci i integracja z Minecraftem łączą się za pośrednictwem oddzielnych punktów końcowych.

## Kiedy korzystać z tej strony

- chcesz zbudować lub debugować rdzeń VoiceCraft
- musisz zrozumieć, który projekt jest właścicielem zachowania klient/serwer
- sprawdzasz, czy dana funkcja należy do rdzenia, dodatku lub GeyserVoice
- przygotowujesz artefakty wersji niestandardowej

## Powiązane dokumenty

- [Server Installation](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
