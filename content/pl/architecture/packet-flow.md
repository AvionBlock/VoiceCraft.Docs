# Przepływ pakietów i zdarzeń

Ta strona wyjaśnia przepływ koncepcyjny, zamiast wymieniać każdy typ pakietu. Jest to przydatne, gdy konfiguracja częściowo działa: na przykład klient łączy się, ale nie odtwarza dźwięku zbliżeniowego, lub dodatek łączy się, ale wiązanie nigdy nie zostaje zakończone.

VoiceCraft ma dwie powiązane płaszczyzny:

- płaszczyzna ruchu głosowego:
  klienci graczy wysyłają i odbierają dane głosowe w czasie rzeczywistym za pośrednictwem `VoiceCraft.Server`
- płaszczyzna stanu Minecraft:
  Dodatki Bedrock lub wtyczki po stronie Java wysyłają aktualizacje jednostek, pozycji, świata, powiązań i efektów za pośrednictwem `McHttp`, `McWss` lub `McTcp`

Obie płaszczyzny muszą być sprawne, aby głos zbliżeniowy działał prawidłowo.

## Przepływ wysokiego poziomu

1. `VoiceCraft.Server` uruchamia i ładuje `ServerProperties.json`.
2. Gracz otwiera `VoiceCraft.Client` i łączy się z punktem końcowym UDP serwera.
3. Klient transportu Minecraft uwierzytelnia się za pomocą skonfigurowanego tokena.
4. Strona Minecraft tworzy, odkrywa i aktualizuje elementy.
5. Aktualizacje pozycji, identyfikatora świata, widoczności, wyciszenia/deafen i efektów trafiają do modelu świata serwera.
6. Serwer wysyła stan wymagany przez podłączonych klientów.
7. Klienci renderują lokalnie powstałe zachowanie głosowe.

Kolejność może się nieznacznie różnić w zależności od topologii. Ważne jest to, że logowanie klienta i logowanie transportu Minecraft to osobne zdarzenia. Jedna strona może działać, gdy druga nadal jest uszkodzona.

## Typowe kategorie wydarzeń

- zaloguj się / wyloguj
- ping/informacje
- tworzenie/usuwanie jednostek
- aktualizacje metadanych
- aktualizacje moderacji
- aktualizacje efektów
- zdarzenia przesyłania dźwięku

## Przepływ wiązania

Przepływ powiązania łączy gracza lub podmiot Minecraft z tożsamością klienta po stronie VoiceCraft.

Typowy przepływ Bedrock:

1. Dodatek łączy się z `McHttp` lub `McWss`.
2. Gracz uruchamia lub otrzymuje polecenie wiązania w grze.
3. Dodatek wysyła dane związane z powiązaniami do VoiceCraft.
4. VoiceCraft kojarzy klienta głosowego z jednostką w grze.
5. Aktualizacje pozycji i świata zaczynają wpływać na to, co słyszy klient.

Typowy przepływ Java/Geyser:

1. `GeyserVoice` łączy się z `McTcp`.
2. Wtyczka śledzi cykl życia i pozycję gracza po stronie Java.
3. Gracz używa skonfigurowanego polecenia wiązania głosowego.
4. `GeyserVoice` wysyła dane powiązania/aktualizacji do VoiceCraft.

Jeśli powiązanie się nie powiedzie, najpierw sprawdź dopasowanie tokena i dostępność transportu, a następnie sprawdź, czy gracz ma aktywną sesję klienta VoiceCraft.

## Debuguj według warstwy

| Objaw | Najpierw sprawdź warstwę | Typowa przyczyna |
|---------|----------------------|---------------|
| Klient nie może się połączyć | Płaszczyzna głosowa | Zły host serwera, port UDP zamknięty, serwer nie działa |
| Dodatek/wtyczka nie może się połączyć | Płaszczyzna stanu Minecraft | Zły token transportowy, nieprawidłowe powiązanie, zablokowana ścieżka TCP/HTTP/WebSocket |
| Klient łączy się, ale nie słyszy proximity audio | Stan jednostki/pozycji | Brak powiązania, niezgodność `PositioningType`, brak aktualizacji pozycji |
| Dźwięk istnieje, ale zakres/efekty wydają się nieprawidłowe | Synchronizacja efektów/stanu | Niewłaściwa maska ​​bitowa efektu, nieaktualne metadane jednostki, niedopasowane ustawienia klienta |

## Dlaczego to ma znaczenie

Podczas debugowania warto dowiedzieć się, czy Twoim problemem jest:

- uwierzytelnianie
- dostępność transportu
- tworzenie jednostek
- skojarzenie powiązania
- synchronizacja metadanych i pozycji
- przechwytywanie/odtwarzanie dźwięku

Większość realnych awarii pojawia się wtedy, gdy jedna z tych warstw jest uszkodzona, a pozostałe nadal wyglądają poprawnie.
