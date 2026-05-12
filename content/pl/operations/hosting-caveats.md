# Zastrzeżenia dotyczące hostingu

Różni dostawcy i style wdrażania wpływają na to, która topologia VoiceCraft jest realistyczna.

## Gospodarze Bedrock

`McHttp` is usually the best Bedrock transport, but only if the BDS node can reach the VoiceCraft endpoint.

Typowe blokery:

- ograniczenia ruchu wychodzącego HTTP
- brak uprawnień modułu
- światy, w których obsługa skryptów jest ograniczona

## Dostawcy hostingu współdzielonego

Niektórzy dostawcy nie pozwalają na:

- niestandardowi słuchacze
- wychodzący HTTP z serwera gry
- dodatkowe procesy poboczne

W tych środowiskach topologia obsługiwana technicznie może nadal być blokowana operacyjnie.

## Ograniczenia podobne do Aternos

W mocno ograniczonym hostingu komunikacja w stylu HTTP może być blokowana lub niepraktyczna.

Kiedy to się stanie:

- Bedrock BDS + `McHttp` may not be viable
- jedyną ścieżką mogą być alternatywy w świecie lokalnym lub po stronie klienta

## Ostrzeżenia dotyczące dokerów i kontenerów

Kontenery pomagają w izolacji, ale nadal potrzebujesz:

- wydawnictwo portowe
- stabilne mocowania głośności dla konfiguracji
- prawidłowe tworzenie sieci międzykontenerowych

## Odwróć proxy

Nie wszystkie transporty VoiceCraft mają kształt odwrotnego proxy:

- `McHttp` can fit HTTP tooling more naturally
- `McTcp` is raw TCP
- `McWss` behaves differently from plain HTTP

Nie zakładaj, że jedna strategia ingresu działa dla wszystkich.

## Zastrzeżenia dotyczące sieci Java

For `GeyserVoice` proxy deployments:

- proxy musi niezawodnie dotrzeć do VoiceCraft
- backend Węzły Paper muszą niezawodnie docierać do ścieżki wiadomości proxy
- model własności musi pozostać jasny

Jeśli serwer proxy nie może być czystym właścicielem mostu, topologia staje się niestabilna.
