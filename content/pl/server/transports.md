# Tryby transportu

VoiceCraft ma wiele warstw transportowych skierowanych do Minecrafta. Wybór odpowiedniego jest ważny dla stabilności i prostoty wdrażania.

Transport to ścieżka używana przez automatyzację Minecrafta do wysyłania stanu do `VoiceCraft.Server`. Jest on niezależny od punktu końcowego głosu UDP używanego przez klientów graczy.

Użyj tej strony przed edycją `McHttpConfig`, `McWssConfig` lub `McTcpConfig`.

## Szybkie porównanie

| Transportu | Typowy konsument | Kształt punktu końcowego | Najlepsze dla | Pole tokenu |
|-----------|------------------|----------------|----------|-------------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | Punkt końcowy HTTP | Serwer dedykowany Bedrock | `McHttpConfig.LoginToken` |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | websocket + tunel poleceń | lokalne światy Bedrock i testy | `McWssConfig.LoginToken` |
| `McTcp` | `GeyserVoice` | surowy most TCP | Scenariusze Java, Geyser, proxy lub most Paper | `McTcpConfig.LoginToken` |

Nie wybieraj transportu wyłącznie na podstawie numeru portu. Wybierz w zależności od tego, który komponent po stronie Minecrafta się połączy.

## McHttp

`McHttp` udostępnia punkt końcowy HTTP, który może wywołać dodatek do serwera dedykowanego Bedrock.

### Najlepsze przypadki użycia

- Serwer dedykowany Bedrock
- stabilne skryptowane światy Bedrock
- środowiskach, w których serwer gry może wywołać punkt końcowy HTTP

### Mocne strony

- najłatwiejszy transport produkcyjny dla BDS
- prosty model punktu końcowego
- dobre dopasowanie do paneli, odwrotnych układów sieciowych i dedykowanych hostów

### Kompromisy

- wymaga dostępności sieci od serwera Bedrock do VoiceCraft
- mogą być blokowane u niektórych dostawców usług hostingowych
- potrzebuje uprawnień do skryptu/modułu BDS wymaganych przez dodatek

### Typowa konfiguracja

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/"
  }
}
```

Używaj `http://127.0.0.1:9050/` tylko wtedy, gdy BDS i VoiceCraft działają na tym samym hoście.

## McWss

`McWss` udostępnia punkt końcowy protokołu websocket i korzysta z tunelu poleceń w świecie Bedrock.

### Najlepsze przypadki użycia

- lokalne światy Bedrock
- testy singleplayera
- konfiguracje przy użyciu `/connect` i tunelowania poleceń

### Mocne strony

- działa bez samodzielnego przepływu pracy BDS HTTP
- praktyczne dla rozwoju i lokalnych demonstracji

### Kompromisy

- mniej stabilny pod dużym ciśnieniem ładunku
- wrażliwy na `CommandsPerTick` i limity fragmentacji ładunku
- zwykle nie jest pierwszym wyborem w publicznych środowiskach produkcyjnych

### Typowa konfiguracja

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

Użyj tej opcji, jeśli potrzebujesz lokalnego przepływu `/connect`. W przypadku prawdziwego serwera produkcyjnego BDS wybierz `McHttp`.

## McTcp

`McTcp` udostępnia surowy most TCP używany przez infrastrukturę po stronie Java.

### Najlepsze przypadki użycia

- `GeyserVoice`
- Serwer Java lub mosty proxy
- bezpośrednia integracja środowiska wykonawczego Paper

### Mocne strony

- bezpośredni transport mostowy dla wtyczek po stronie Java
- pozwala uniknąć semantyki punktu końcowego HTTP, gdy lepszy jest natywny most TCP
- jest zgodny z obecną architekturą `GeyserVoice`

### Kompromisy

- kolejny port do zarządzania
- najbardziej przydatne, gdy faktycznie uruchamiasz most po stronie Java
- nieużywane przez pakiety dodatków Bedrock

### Typowa konfiguracja

```json
{
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  }
}
```

Jeśli `GeyserVoice` działa na tym samym komputerze co VoiceCraft, połącz się z `127.0.0.1`. Jeśli działa gdzie indziej, połącz się z adresem, do którego wtyczka może dotrzeć i ogranicz zaporę.

## Który wybrać?

### Serwer dedykowany Bedrock

Użyj `McHttp`.

Kontynuuj z [McHttp for BDS](/minecraft/mchttp-bds).

### Bedrock singleplayer / lokalny świat

Użyj `McWss`.

Kontynuuj z [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).

### Java + Geyser/Floodgate

Użyj `McTcp` do `GeyserVoice`.

Kontynuuj z [GeyserVoice](/ecosystem/geyservoice).

### Sieć mieszana

Możesz uruchomić więcej niż jeden transport, ale eksponuj tylko to, czego naprawdę potrzebujesz.

Typowe przypadki mieszane:

- Bedrock BDS plus most Java:
  włącz `McHttp` i `McTcp`
- testy lokalne, podczas gdy produkcja pozostaje na BDS:
  uruchom oddzielny folder serwera testowego zamiast ponownie używać tokenów produkcyjnych
- sieć proxy:
  zwykle udostępniaj właścicielowi proxy tylko `McTcp`

## Porady dotyczące bezpieczeństwa

- wymień wszystkie tokeny logowania
- powiąż z `127.0.0.1`, gdy konsument jest lokalny
- powiąż z `0.0.0.0` tylko wtedy, gdy wymagany jest dostęp zdalny
- utrzymuj ścisłe reguły zapory sieciowej dla każdego transportu
- nie ujawniaj nieaktywnych transportów tylko dlatego, że są dostępne

## Lista kontrolna walidacji

- wybrane pole transportu `Enabled` to `true`
- zainstalowany jest pasujący dodatek/wtyczka
- Host/port punktu końcowego jest dostępny ze środowiska wykonawczego po stronie Minecrafta
- token dodatku/wtyczki pasuje do prawidłowego `LoginToken`
- dzienniki serwera pokazują połączenie konsumenta transportu
- bind flow działa po zalogowaniu się do transportu
