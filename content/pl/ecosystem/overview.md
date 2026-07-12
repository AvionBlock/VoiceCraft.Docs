# Ekosystem VoiceCraft

VoiceCraft to nie tylko jeden plik binarny. Jest to mały ekosystem repozytoriów i warstw wykonawczych, które można łączyć na różne sposoby.

Główny pomysł jest prosty: gracze uruchamiają `VoiceCraft.Client`, jeden backend obsługuje lub zarządza `VoiceCraft.Server`, a integracja po stronie Minecrafta wysyła stan gry do serwera. Wybór integracji zależy od tego, czy środowisko wykonawcze Minecrafta to Bedrock, lokalny Bedrock, direct Paper czy sieć proxy.

## Podstawowe repozytoria

| Repozytorium | Co posiada | Użyj go, kiedy |
|------------|--------------|-------------|
| `VoiceCraft` | aplikacje klienckie, samodzielny serwer, protokół, współdzielony kod podstawowy, transporty obsługujące Minecraft | potrzebujesz podstawowego środowiska wykonawczego serwera/klienta lub chcesz zbudować ze źródła |
| `VoiceCraft.Java` | Mostek po stronie Java dla Paper, Velocity i BungeeCord | uruchamiasz Java, Geyser/Floodgate lub sieć proxy |
| `VoiceCraft.Addon` | Pakiety dodatków Bedrock i skryptowalna powierzchnia McApi | uruchamiasz światy Bedrock lub chcesz niestandardowego zachowania dodatków |

## Mapa rozmieszczenia

```mermaid
flowchart LR
  A["VoiceCraft Client"] --> B["VoiceCraft UDP Server"]
  C["Bedrock Addon (McHttp / McWss)"] --> D["Minecraft API Transport"]
  D --> B
  E["VoiceCraft.Java (Paper / Proxy)"] --> F["McTcp Bridge"]
  F --> B
```

Integracja klienta i Minecrafta nie łączy się tą samą ścieżką. Klient korzysta z punktu końcowego UDP VoiceCraft. Integracja z Minecraftem wykorzystuje `McHttp`, `McWss` lub `McTcp`.

## Typowe stosy

### Serwer dedykowany Bedrock

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- Klienci VoiceCraft
- Uprawnienia do skryptu/modułu BDS wymagane przez dodatek

Użyj tego w przypadku produkcyjnych serwerów Bedrock, gdzie BDS może połączyć się z punktem końcowym HTTP.

### Lokalny świat Bedrock

- lokalny stos VoiceCraft
- `VoiceCraft.Addon.Core.McWss`
- lokalny przepływ przez websocket `/connect`

Użyj tego do testowania pojedynczego gracza, wersji demonstracyjnych i dodatków.

### Serwer Java z Geyserem/Floodgate

- `VoiceCraft.Java`
- `VoiceCraft.Server`
- opcjonalnie zarządzane środowisko wykonawcze uruchomione przez samego `VoiceCraft.Java`
- `McTcp` jako mostek skierowany w stronę VoiceCraft

Użyj tej opcji, gdy stan serwera po stronie Java jest źródłem pozycji graczy i przepływu powiązań.

### Sieć proxy Java

- `VoiceCraft.Java` na serwerze proxy
- `VoiceCraft.Java` na serwerach Paper
- `VoiceCraft.Server` osiągnięto przez `McTcp`
- węzły zaplecza przesyłają strumieniowo migawki do serwera proxy

Użyj tej opcji, jeśli jeden serwer proxy powinien być właścicielem centralnego połączenia VoiceCraft dla wielu serwerów zaplecza.

## Dlaczego istnieje wiele repozytoriów

- `VoiceCraft` koncentruje się na podstawowej platformie głosowej
- `VoiceCraft.Java` tłumaczy środowiska Java lub proxy na stan zgodny z VoiceCraft
- `VoiceCraft.Addon` ujawnia automatyzację świata, powiązanie jednostek i kontrolę efektów na Bedrock

Ten podział umożliwia ewolucję każdego projektu wokół jego środowiska wykonawczego: kod klienta/serwera C# w `VoiceCraft`, kod wtyczki Java w `VoiceCraft.Java` i kod skryptu/dodatku Bedrock w `VoiceCraft.Addon`.

## Wybór od czego zacząć

- Nowy serwer dedykowany Bedrock:
  zacznij od [szybkiego startu](/start/quick-start), następnie [McHttp for BDS](/minecraft/mchttp-bds).
- Lokalne testy Bedrock:
  zacznij od [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).
- Java + Geyser/Floodgate:
  zacznij od [VoiceCraft.Java](/ecosystem/voicecraft-java).
- Niestandardowe zachowanie Bedrock:
  przeczytaj [VoiceCraft.Addon](/ecosystem/voicecraft-addon), a następnie [Addon API](/ecosystem/addon-api).

## Kontynuuj z

- [Repozytorium i budowanie VoiceCraft](/ecosystem/voicecraft-repository)
- [VoiceCraft.Java overview](/ecosystem/voicecraft-java)
- [VoiceCraft.Addon overview](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Integration recipes](/ecosystem/integration-recipes)
- [Production blueprints](/ecosystem/production-blueprints)
