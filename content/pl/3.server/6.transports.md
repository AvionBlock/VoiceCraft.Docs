# Tryby transportu

VoiceCraft ma wiele warstw transportowych skierowanych do Minecrafta. Wybór odpowiedniego jest ważny dla stabilności i prostoty wdrażania.

## Szybkie porównanie

| Transport | Typowe zastosowanie | Domyślny kształt | Najlepsze dla |
|-----------|-------------|---------------|----------|
| `McHttp` | Bedrock Dedicated Server | HTTP endpoint | stable Bedrock server integration |
| `McWss` | local worlds / singleplayer | websocket + command tunnel | testing, local worlds, lightweight setups |
| `McTcp` | Java-side bridge | raw TCP bridge | `GeyserVoice`, proxy or Paper bridge scenarios |

## McHttp

### Najlepsze przypadki użycia

- Serwer dedykowany Bedrock
- stabilne skryptowane światy Bedrock
- środowiska, w których serwer gry może wywołać punkt końcowy HTTP

### Mocne strony

- najłatwiejszy transport produkcyjny dla BDS
- prosty model punktu końcowego
- dobre dopasowanie do paneli, odwrotnych układów sieciowych i dedykowanych hostów

### Kompromisy

- wymaga dostępności sieci od serwera Bedrock do VoiceCraft
- może być blokowany u niektórych dostawców usług hostingowych

## McWss

### Najlepsze przypadki użycia

- lokalne światy Bedrock
- testy dla jednego gracza
- setups using `/connect` and command tunneling

### Mocne strony

- działa bez samodzielnego przepływu pracy BDS HTTP
- praktyczne dla rozwoju i lokalnych demonstracji

### Kompromisy

- mniej stabilny pod dużym naciskiem ładunku
- sensitive to `CommandsPerTick` and payload chunking limits
- zwykle nie jest pierwszym wyborem w publicznych środowiskach produkcyjnych

## McTcp

### Najlepsze przypadki użycia

- `GeyserVoice`
- Serwer Java lub mosty proxy
- bezpośrednia integracja środowiska wykonawczego Paper

### Mocne strony

- bezpośredni transport mostowy dla wtyczek po stronie Java
- pozwala uniknąć semantyki punktu końcowego HTTP, gdy lepszy jest natywny most TCP
- aligns with current `GeyserVoice` architecture

### Kompromisy

- kolejny port do zarządzania
- najbardziej przydatne, gdy faktycznie uruchamiasz most po stronie Java

## Który wybrać?

### Serwer dedykowany Bedrock

Use `McHttp`.

### Bedrock singleplayer / lokalny świat

Use `McWss`.

### Java + Geyser/Floodgate

Use `McTcp` through `GeyserVoice`.

### Sieć mieszana

Możesz uruchomić więcej niż jeden transport, ale eksponuj tylko to, czego naprawdę potrzebujesz.

## Porady dotyczące bezpieczeństwa

- wymień wszystkie tokeny logowania
- bind to `127.0.0.1` when the consumer is local
- bind to `0.0.0.0` only when remote access is required
- Utrzymuj ścisłe reguły zapory sieciowej dla każdego transportu
