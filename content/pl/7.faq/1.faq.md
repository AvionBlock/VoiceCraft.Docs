# Często zadawane pytania

Często zadawane pytania dotyczące VoiceCraft.

## Czy każdy gracz potrzebuje aplikacji klienckiej VoiceCraft?

Tak. Gracze potrzebują aplikacji klienckiej. Sam serwer nie korzysta z aplikacji klienckiej.

## Czy VoiceCraft działa na urządzeniach mobilnych?

Tak. Obsługiwane są Androidy i iOS.

## Czy VoiceCraft działa na konsoli?

Nie bezpośrednio na sprzęcie konsolowym jako natywny klient VoiceCraft.

Gracze konsolowi mogą nadal uczestniczyć w niektórych scenariuszach po stronie serwera, jeśli reszta stosu jest poprawnie skonfigurowana, ale bezpośrednia natywna obsługa klienta nie jest taka sama, jak w przypadku komputerów stacjonarnych lub mobilnych.

## Czy VoiceCraft działa na Realms?

Może działać w ograniczonych scenariuszach, szczególnie gdy używane jest pozycjonowanie po stronie klienta, ale Realms jest środowiskiem bardziej ograniczonym niż serwer dedykowany.

## Z jakiego transportu powinienem skorzystać?

- Serwer dedykowany Bedrock:
  `McHttp`
- lokalny świat Bedrock:
  `McWss`
- Java + gejzer / śluza:
  `McTcp` through `GeyserVoice`

## Czy GeyserVoice wymaga oddzielnie zarządzanego serwera VoiceCraft?

Nie zawsze.

W bezpośrednim trybie Paper GeyserVoice może załadować i uruchomić środowisko wykonawcze VoiceCraft w tle, używając:

- `config.voicecraft.auto-start`
- `shutdown-on-disable`
- `ready-timeout-ms`
- `install-directory`

Jeśli wolisz, może również wskazywać na już działający zewnętrzny serwer VoiceCraft.

## Czy mogę używać VoiceCraft u dostawców hostingu, takich jak Apex, Aternos lub podobnych?

Zależy to od tego, czy Twój dostawca umożliwia wymaganą ścieżkę sieciową pomiędzy serwerem gry a serwerem VoiceCraft.

Przykłady:

- BDS with `McHttp` needs outbound reachability to the VoiceCraft HTTP endpoint
- Java + GeyserVoice needs reachability to the VoiceCraft `McTcp` endpoint

Niektórzy dostawcy blokują dokładnie takie zachowanie sieci, jakiego potrzebujesz.

## Czy mogę hostować VoiceCraft na tym samym komputerze co serwer gry?

Tak. Jest to typowe dla:

- testy lokalne
- małe społeczności
- bezpośrednie konfiguracje Paper + GeyserVoice

## Czy mogę uruchomić tylko jeden transport?

Tak. Możesz ograniczyć transporty w czasie wykonywania za pomocą:

- config toggles in `ServerProperties.json`
- runtime overrides such as `--transport-mode`

## Dlaczego nikogo nie słyszę, mimo że klient się łączy?

Sprawdź je w kolejności:

1. popraw adres IP i port serwera VoiceCraft w kliencie
2. matching `PositioningType`
3. popraw token transportu Minecraft
4. pomyślny przepływ wiązania
5. podmioty otrzymujące aktualizacje pozycji i świata

## Is `McWss` good for production?

Zwykle nie jest to pierwszy wybór w przypadku większych środowisk publicznych.

It is best for local worlds, testing, and lightweight setups. `McHttp` is usually a better Bedrock production transport.

## Jaka jest różnica między wyciszeniem serwera a wyciszeniem lokalnym?

- wyciszenie serwera:
  egzekwowane przez backend dla docelowej jednostki lub klienta
- wyciszenie lokalne:
  stored in a player's `Settings.json` as a personal preference

## Gdzie przechowywana jest głośność poszczególnych użytkowników i lokalne wyciszenie?

In `Settings.json` under `UserSettings.Users`.

## Używam Javy z Geyserem. Czy potrzebuję także dodatku Bedrock?

No. In Java + Geyser topologies, the bridge is typically `GeyserVoice`, not the Bedrock addon.
