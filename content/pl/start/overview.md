# Przegląd

VoiceCraft to zbliżeniowa platforma głosowa dla Minecraft Bedrock Edition i powiązanych scenariuszy mostowych.

Pozwala graczom uruchomić oddzielnego klienta głosowego, podczas gdy automatyzacja po stronie Minecrafta informuje serwer głosowy, gdzie znajduje się każdy gracz, w jakim świecie się znajduje oraz jakie efekty lub zasady widoczności powinny mieć zastosowanie.

VoiceCraft jest przydatny, gdy chcesz, aby głos był zbliżony, bez uzależnienia od jednego dokładnego kształtu serwera Minecraft. To samo podstawowe środowisko wykonawcze można połączyć z dodatkami Bedrock, mostami Java/Geyser lub wdrożeniami proxy.

## Co konfigurujesz

Większość wdrożeń składa się z trzech ruchomych elementów:

1. `VoiceCraft.Client`
   aplikacja komputerowa i mobilna instalowana przez każdego gracza
2. `VoiceCraft.Server`
   samodzielny backend dla ruchu głosowego, synchronizacji stanu, moderacji i transportowych punktów końcowych
3. Transporty skierowane do Minecrafta
   `McHttp`, `McWss` i `McTcp`

Integracje ekosystemów łączą Minecraft z tymi transportami:

- `VoiceCraft.Addon` dla światów Bedrock i BDS
- `GeyserVoice` dla stosów Java/Geyser/proxy

## Jak to działa

1. Klient łączy się z `VoiceCraft.Server` przez UDP.
2. Serwer śledzi sesje głosowe, byty, pozycje, identyfikatory światów, maski bitowe efektów i stan moderacji.
3. Integracja po stronie Minecrafta aktualizuje serwer o stan rozgrywki:
   - `McHttp` dla BDS
   - `McWss` dla lokalnych światów Bedrock
   - `McTcp` dla `GeyserVoice`
4. Klient renderuje dźwięk zbliżeniowy zgodnie ze stanem serwera i wybranymi ustawieniami lokalnymi.

Połączenie głosowe i połączenie transportowe Minecraft są oddzielne. Jeśli podłączona jest tylko jedna strona, konfiguracja może wyglądać na częściowo sprawną, ale zachowanie bliskości będzie nadal niekompletne.

## Obsługiwane platformy klienckie

- Windows (`x86`, `x64`, `arm64`)
- Linux (`x64`, `arm32`, `arm64`)
- macOS (`x64`, `arm64`)
- Android (`arm64`)
- iOS (`arm64`, `.ipa`)

## Co sprawia, że VoiceCraft jest elastyczny

- wiele transportów Minecraft
- Powierzchnia API dodatku Bedrock
- Most po stronie Java przez `GeyserVoice`
- konfigurowalne efekty i metadane encji
- tryby pozycjonowania zarówno po stronie serwera, jak i po stronie klienta

Ta elastyczność oznacza również, że liczy się pierwsza decyzja: najpierw wybierz topologię, a następnie postępuj zgodnie ze wskazówkami dotyczącymi tego transportu.

## Typowe wybory topologii

| Jeśli pobiegniesz... | Zacznij od... | Dlaczego |
|---------------|---------------|-----|
| Serwer dedykowany Bedrock | [McHttp for BDS](/minecraft/mchttp-bds) | BDS może wywołać stabilny punkt końcowy HTTP |
| Lokalny świat Bedrock | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) | Działa poprzez lokalny przepływ przez gniazdo internetowe/tunel poleceń |
| Serwer Java z Geyser/Floodgate | [GeyserVoice](/ecosystem/geyservoice) | Wtyczka Java łączy się z VoiceCraft poprzez `McTcp` |
| Bezpośredni serwer Paper | [GeyserVoice Direct Paper](/ecosystem/geyservoice-direct-paper) | Wtyczka może korzystać z zewnętrznego serwera lub zarządzać czasem działania |

## Co czytać dalej

- [Quick Start](/start/quick-start)
- [Download](/download)
- [Transport Modes](/server/transports)
- [System Architecture](/architecture/system-architecture)
- [Ecosystem Overview](/ecosystem/overview)
