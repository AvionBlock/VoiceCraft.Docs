# Ostrzeżenia dotyczące hostingu

Różni dostawcy i style wdrażania wpływają na to, która topologia VoiceCraft jest realistyczna.

Przed wybraniem topologii potwierdź dwie ścieżki sieciowe:

1. gracze mogą dotrzeć do punktu końcowego UDP VoiceCraft
2. środowisko wykonawcze po stronie Minecrafta może dotrzeć do wybranego punktu końcowego transportu

Wiele problemów z hostingiem wynika z zablokowania jednej z tych ścieżek, podczas gdy druga nadal działa.

## Gospodarze skały macierzystej

`McHttp` jest zwykle najlepszym transportem Bedrock, ale tylko wtedy, gdy węzeł BDS może dotrzeć do punktu końcowego VoiceCraft.

Typowe blokery:

- ograniczenia wychodzącego protokołu HTTP
- brak uprawnień modułu
- światy, w których obsługa skryptów jest ograniczona

Jeśli dostawca blokuje wychodzący protokół HTTP lub wymagane moduły skryptów, `McHttp` może być technicznie poprawny, ale operacyjnie niedostępny.

## Dostawcy hostingu współdzielonego

Niektórzy dostawcy nie pozwalają na:

- niestandardowi słuchacze
- wychodzący HTTP z serwera gry
- dodatkowe procesy poboczne

W tych środowiskach topologia obsługiwana technicznie może nadal być blokowana operacyjnie.

Zapytaj dostawcę konkretnie o wychodzący protokół HTTP/TCP z serwera gry i dodatkowe procesy poboczne. Ogólna odpowiedź „dozwolone wtyczki” nie wystarczy.

## Ograniczenia podobne do Aternos

W mocno ograniczonym hostingu komunikacja w stylu HTTP może być blokowana lub niepraktyczna.

Kiedy to się stanie:

- Bedrock BDS + `McHttp` może nie działać
- jedyną ścieżką mogą być alternatywy w świecie lokalnym lub po stronie klienta

Nie zakładaj, że darmowy/ograniczony host może działać w tej samej topologii co VPS lub maszyna dedykowana.

## Ostrzeżenia dotyczące dokerów i kontenerów

Kontenery pomagają w izolacji, ale nadal potrzebujesz:

- wydawnictwo portowe
- stabilne mocowania głośności dla konfiguracji
- prawidłowe sieci międzykontenerowe
- jawne publikowanie UDP dla punktu końcowego klienta VoiceCraft
- pamięć trwała dla zarządzanych katalogów wykonawczych

## Odwrotne proxy

Nie wszystkie transporty VoiceCraft mają kształt odwrotnego proxy:

- `McHttp` może bardziej naturalnie pasować do narzędzi HTTP
- `McTcp` to surowy protokół TCP
- `McWss` zachowuje się inaczej niż zwykły protokół HTTP

Nie zakładaj, że jedna strategia ingresu działa dla wszystkich.

Narzędzia HTTP mogą pomóc w przypadku `McHttp`, ale nie rozwiązują automatycznie surowego ruchu `McTcp` lub klienta UDP.

## Zastrzeżenia dotyczące sieci Java

W przypadku wdrożeń proxy `GeyserVoice`:

- proxy musi niezawodnie dotrzeć do VoiceCraft
- backend Węzły Paper muszą niezawodnie docierać do ścieżki wiadomości proxy
- model własności musi pozostać jasny

Jeśli serwer proxy nie może być czystym właścicielem mostu, topologia staje się niestabilna.

## Praktyczna lista kontrolna dostawców

Zapytaj lub zweryfikuj:

- Czy gracze mogą uzyskać dostęp do niestandardowego portu UDP?
- Czy serwer gry może wysyłać wychodzące żądania HTTP?
- Czy serwer gry może otwierać surowe porty TCP lub łączyć się z nimi?
- Czy mogę uruchomić proces poboczny dla `VoiceCraft.Server`?
- Czy mogę utrzymać `config/ServerProperties.json`?
- Czy mogę zainstalować lub zaktualizować pakiety zachowań/zasobów Bedrock?
- Czy w sieciach Java wiadomości wtyczek mogą być niezawodnie przesyłane między backendem a serwerem proxy?

Jeśli jakakolwiek odpowiedź brzmi „nie”, wybierz topologię, która pozwala uniknąć tego wymagania lub przenieś VoiceCraft do infrastruktury, którą kontrolujesz.
