# McWss dla światów dla jednego gracza

`McWss` to port sieciowy/tunnel poleceń używany głównie w światach lokalnych i lekkich konfiguracjach Bedrock.

Skorzystaj z tego przewodnika, jeśli nie korzystasz z pełnego serwera dedykowanego Bedrock i potrzebujesz lokalnego świata Bedrock, aby komunikować się z VoiceCraft za pośrednictwem protokołu websocket `/connect`.

Docelowy kształt:

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
Local Bedrock world + VoiceCraft.Addon.Core.McWss -> McWss websocket endpoint
```

## Kiedy go używać

Użyj `McWss`, gdy:

- grasz w lokalnym świecie Bedrock
- chcesz szybkiej konfiguracji dla jednego gracza
- testujesz logikę dodatków bez dedykowanego hosta BDS

Jeśli używasz prawdziwego serwera dedykowanego Bedrock, użyj zamiast tego [McHttp for BDS](/minecraft/mchttp-bds).

## Ważne ograniczenia

- zwykle mniej stabilny niż `McHttp`
- Przepustowość poleceń i rozmiar ładunku mają ogromne znaczenie
- nie jest to domyślna rekomendacja dla dużych publicznych środowisk produkcyjnych
- zależy od tego, czy gniazdo internetowe Bedrock i zachowanie poleceń są dostępne w Twoim środowisku

## Wymagania

1. `VoiceCraft.Server` z `McWssConfig.Enabled = true`
2. `VoiceCraft.Addon.Core.McWss.zip`
3. Kompilacja Bedrock obsługująca wymaganą funkcjonalność websocket/skryptu
4. Zainstalowano i skonfigurowano klienta VoiceCraft
5. pasujący `McWssConfig.LoginToken` do uwierzytelnienia dodatku

Pomocne linki:

- [Strona pobierania](/download) dla pakietu wydania `Core.McWss`
- [Konfigurator dodatku](/addon-configurator) dla gotowego do rozpakowania archiwum świata

## Konfiguracja serwera VoiceCraft

Typowa konfiguracja:

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  }
}
```

Zachowaj wyrównanie `DataTunnelCommand` z pakietem dodatków. Jeśli zmienisz to w konfiguracji serwera, dodatek musi używać tej samej nazwy polecenia.

Do testowania lokalnego trybu dla pojedynczego gracza pozostaw hosta websocket na `127.0.0.1`. Używaj szerszego wiązania tylko wtedy, gdy świat Bedrock łączy się z innej maszyny.

## Instalacja

### Opcja 1: importuj jako `.mcaddon`

1. Zmień nazwę archiwum na `VoiceCraft.Addon.Core.McWss.mcaddon`.
2. Otwórz go, aby Minecraft zaimportował dodatek.
3. Włącz pakiet zachowań i pakiet zasobów na świecie.

### Opcja 2: kopia ręczna

1. Wypakuj archiwum.
2. Skopiuj `RP` i `BP` do katalogów Bedrock.
3. Włącz oba pakiety w świecie docelowym.

Pakiet zasobów zapewnia widoczne zasoby. Pakiet zachowań zawiera polecenia, skrypty i logikę mostu.

## Przepływ połączenia

### Krok 1: podłącz światowy websocket

```text
/connect <VOICECRAFT_HOST>:<MCWSS_PORT>
```

Przykład:

```text
/connect 127.0.0.1:9051
```

Łączy to świat Bedrock z transportem protokołu internetowego VoiceCraft. Nie uwierzytelnia jeszcze dodatku.

### Krok 2: uwierzytelnij dodatek

```text
/voicecraft:vcconnect <LOGIN_TOKEN>
```

Użyj `McWssConfig.LoginToken`.

Po uwierzytelnieniu dodatek może wysyłać dane encji i wiązać dane poprzez tunel poleceń.

## Tunel danych

Dodatek używa:

- `voicecraft:data_tunnel`

Musi to być zgodne z `McWssConfig.DataTunnelCommand`.

Jeśli zmienisz nazwę jednej strony, a nie drugiej, most się zepsuje.

Polecenie obecnie wykonuje:

- opcjonalny argument dotyczący maksymalnej długości łańcucha
- argument danych spakowanego ładunku

Tunel jest wrażliwy na przepustowość poleceń. Duże serie aktualizacji obiektów lub efektów mogą powodować opóźnienia lub niestabilne dostarczanie, szczególnie na komputerach z niższej półki.

## Strojenie

Jeśli widzisz opóźnienia lub niestabilność pakietów:

- dolny `CommandsPerTick`
- recenzja `MaxByteLengthPerCommand`
- unikaj dużych aktualizacji seryjnych
- przetestuj z mniejszą liczbą aktywnych jednostek
- podczas dostrajania zachowaj konfigurację lokalną
- przejdź na `McHttp`, jeśli świat stanie się długo działającym serwerem współdzielonym

## Kiedy przejść na inny transport

Przejdź do `McHttp`, gdy:

- prowadzisz prawdziwy dedykowany serwer Bedrock
- chcesz czystszego wdrożenia produkcyjnego
- niestabilność tunelu poleceń staje się problemem

W takim przypadku kontynuuj [McHttp for BDS](/minecraft/mchttp-bds).

## Lista kontrolna walidacji

- `McWssConfig.Enabled = true`
- świat może działać `/connect <host>:<port>`
- `/voicecraft:vcconnect <LOGIN_TOKEN>` powiodło się
- Klient VoiceCraft łączy się z punktem końcowym UDP
- `PositioningType` pasuje między klientem a serwerem
- bind flow działa w grze
- poruszanie się gracza zmienia zachowanie w pobliżu

## Typowe problemy

- `/connect` kończy się niepowodzeniem:
  sprawdź host/port i czy Bedrock pozwala na połączenia websocket w twoim środowisku.
- `vcconnect` kończy się niepowodzeniem:
  potwierdź, że użyłeś `McWssConfig.LoginToken`.
- błędy tunelu danych:
  potwierdź, że `DataTunnelCommand` pasuje do pakietu dodatków.
- Dźwięk łączy się, ale bliskość jest nieprawidłowa:
  sprawdź przepływ wiązania, tryb pozycjonowania i czy przychodzą aktualizacje pozycji.
