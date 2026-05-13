# Często zadawane pytania

Często zadawane pytania dotyczące VoiceCraft.

## Czy każdy gracz potrzebuje aplikacji klienckiej VoiceCraft?

Tak. Gracze potrzebują aplikacji klienckiej. Sam serwer nie korzysta z aplikacji klienckiej.

Klient jest tym, co przechwytuje sygnał wejściowy z mikrofonu i odtwarza dźwięk głosu w pobliżu. Dodatek lub wtyczka Minecraft dostarcza jedynie stan gry, taki jak pozycja gracza i dane powiązania.

## Czy VoiceCraft działa na urządzeniach mobilnych?

Tak. Obsługiwane są Androidy i iOS.

Użytkownicy mobilni nadal potrzebują osiągalnego punktu końcowego serwera VoiceCraft i uprawnień do mikrofonu.

## Czy VoiceCraft działa na konsoli?

Nie bezpośrednio na sprzęcie konsolowym jako natywny klient VoiceCraft.

Gracze konsolowi mogą nadal uczestniczyć w niektórych scenariuszach po stronie serwera, jeśli reszta stosu jest poprawnie skonfigurowana, ale bezpośrednia natywna obsługa klienta nie jest taka sama, jak w przypadku komputerów stacjonarnych lub mobilnych.

## Czy VoiceCraft działa na Realms?

Może działać w ograniczonych scenariuszach, szczególnie gdy używane jest pozycjonowanie po stronie klienta, ale Realms jest środowiskiem bardziej ograniczonym niż serwer dedykowany.

Jeśli chcesz przewidywalnej konfiguracji produkcyjnej, użyj BDS z `McHttp` lub topologii Java/Geyser z `GeyserVoice`.

## Z jakiego transportu powinienem skorzystać?

- Serwer dedykowany Bedrock:
  `McHttp`
- lokalny świat Bedrock:
  `McWss`
- Java + Geyser/Floodgate:
  `McTcp` do `GeyserVoice`

Transport dotyczy stanu po stronie Minecrafta. Klienci gracza nadal łączą się z punktem końcowym UDP VoiceCraft.

## Czy GeyserVoice wymaga oddzielnie zarządzanego serwera VoiceCraft?

Nie zawsze.

W trybie Direct Paper GeyserVoice może załadować i uruchomić środowisko wykonawcze VoiceCraft pod maską, używając:

- `config.voicecraft.auto-start`
- `config.voicecraft.shutdown-on-disable`
- `config.voicecraft.ready-timeout-ms`
- `config.voicecraft.install-directory`

Jeśli wolisz, może również wskazywać na już działający zewnętrzny serwer VoiceCraft.

W bieżących konfiguracjach wartości połączenia zewnętrznego znajdują się pod `config.voicecraft.transport.*`.

## Czy mogę używać VoiceCraft u dostawców hostingu, takich jak Apex, Aternos lub podobnych?

Zależy to od tego, czy Twój dostawca umożliwia wymaganą ścieżkę sieciową pomiędzy serwerem gry a serwerem VoiceCraft.

Przykłady:

- BDS z `McHttp` wymaga osiągalności ruchu wychodzącego do punktu końcowego HTTP VoiceCraft
- Java + GeyserVoice wymaga dostępności do punktu końcowego VoiceCraft `McTcp`

Niektórzy dostawcy blokują dokładnie takie zachowanie sieci, jakiego potrzebujesz.

Przed zakupem hostingu zapytaj, czy dozwolone są niestandardowe porty UDP, wychodzący protokół HTTP/TCP, procesy poboczne i wymagane moduły skryptów Bedrock.

## Czy mogę hostować VoiceCraft na tym samym komputerze co serwer gry?

Tak. Jest to typowe dla:

- testy lokalne
- małe społeczności
- bezpośrednie konfiguracje Paper + GeyserVoice

Adresów pętli zwrotnej, takich jak `127.0.0.1`, używaj tylko wtedy, gdy klient naprawdę działa na tej samej maszynie.

## Czy mogę uruchomić tylko jeden transport?

Tak. Możesz ograniczyć transporty w czasie wykonywania za pomocą:

- konfiguracja przełącza w `ServerProperties.json`
- zastąpienia środowiska wykonawczego, takie jak `--transport-mode`

Jest to zalecane do produkcji. Ujawnij tylko transport, z którego korzysta Twoja topologia.

## Dlaczego nikogo nie słyszę, mimo że klient się łączy?

Sprawdź je w kolejności:

1. popraw adres IP i port serwera VoiceCraft w kliencie
2. pasujące `PositioningType`
3. poprawny token transportu Minecraft
4. pomyślny przepływ wiązania
5. jednostki otrzymujące aktualizacje pozycji i świata

Jeśli `list --clientsOnly` pokazuje gracz, ale `list` nie pokazuje zmieniającej się pozycji elementu, debuguj integrację z Minecraftem, a nie ustawienia mikrofonu.

## Czy `McWss` nadaje się do produkcji?

Zwykle nie jest to pierwszy wybór w przypadku większych środowisk publicznych.

Najlepiej sprawdza się w przypadku światów lokalnych, testów i lekkich konfiguracji. `McHttp` jest zwykle lepszym transportem do produkcji Bedrock.

## Jaka jest różnica między wyciszeniem serwera a wyciszeniem lokalnym?

- wyciszenie serwera:
  egzekwowane przez backend dla docelowej jednostki lub klienta
- lokalne wyciszenie:
  przechowywane w `Settings.json` gracza jako osobiste preferencje

## Gdzie przechowywana jest głośność poszczególnych użytkowników i lokalne wyciszenie?

W `Settings.json` pod `UserSettings.Users`.

## Używam Java z Geyser. Czy potrzebuję także dodatku Bedrock?

Nie. W topologiach Java + Geyser mostem jest zazwyczaj `GeyserVoice`, a nie dodatek Bedrock.

Użyj dodatku Bedrock dla światów Bedrock/BDS. Użyj GeyserVoice, gdy infrastruktura po stronie Java jest źródłem stanu gracza.

## Czy VoiceCraft jest usługą głosową hostowaną przez stronę trzecią?

Nie. VoiceCraft nie wymaga usługi hostowanej przez stronę trzecią. Sam uruchamiasz serwer/środowisko wykonawcze lub pozwalasz GeyserVoice zarządzać środowiskiem wykonawczym w trybie Direct Paper.

## Czy VoiceCraft to tylko mod do Minecrafta?

Nie. VoiceCraft to zbiór aplikacji klienckich, środowisko wykonawcze serwera, pakiety dodatków Bedrock i narzędzia mostkowe po stronie Java. Działająca konfiguracja wymaga odpowiedniej kombinacji dla Twojej topologii.
