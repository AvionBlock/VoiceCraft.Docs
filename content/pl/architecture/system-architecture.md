# Architektura systemu

VoiceCraft to stos głosu zależnego od odległości, a nie pojedynczy mod Minecrafta. Klient przesyła dźwięk z mikrofonu, serwer zarządza sesjami głosowymi i współdzielonym stanem, a warstwa integracji Minecrafta informuje serwer, gdzie są gracze i jak powinien wyglądać ich stan.

Separacja jest zamierzona: ten sam serwer głosowy może współpracować z serwerem dedykowanym Bedrock, lokalnymi światami Bedrock, bezpośrednimi serwerami Paper i sieciami proxy, o ile podłączony jest właściwy transport obsługujący Minecraft.

## Główne warstwy

| Warstwa | Główna odpowiedzialność | Typowe miejsce instalacji |
|-------|---------------------|--------------------------|
| `VoiceCraft.Client` | Przechwytuje sygnał wejściowy mikrofonu, wysyła pakiety głosowe, odtwarza głosy w pobliżu, przechowuje lokalne preferencje audio. | Urządzenie gracza |
| `VoiceCraft.Server` | Akceptuje klientów głosowych, przechowuje stan jednostki, stosuje flagi moderacji i domyślne ustawienia efektów dźwiękowych, ujawnia transporty Minecrafta. | VPS, host gry, komputer lokalny lub środowisko wykonawcze zarządzane przez wtyczki |
| Integracja z Minecraftem | Wysyła dane dotyczące pozycji gracza/bytu i cyklu życia z gry Minecraft do VoiceCraft. | Dodatek Bedrock, wtyczka Paper lub wtyczka proxy |

### Warstwa klienta

`VoiceCraft.Client` obsługuje:

- przechwytywanie i wstępne przetwarzanie mikrofonu
- push-to-talk, wyciszenie, wygłuszenie, wybór urządzenia wejścia/wyjścia
- Połączenie UDP z `VoiceCraft.Server`
- odtwarzanie głosów w pobliżu na podstawie stanu serwera
- lokalna głośność na użytkownika i lokalne preferencje wyciszenia

Klient nie wykrywa sam pozycji graczy Minecraft w normalnym modelu po stronie serwera. To zależy od integracji serwera i Minecrafta w celu zapewnienia jednostki i stanu świata.

### Warstwa serwerowa

`VoiceCraft.Server` obsługuje:

- Sesje klienta UDP VoiceCraft
- stan jednostki sieciowej i stan powiązania
- flagi moderacji po stronie serwera
- maski bitowe efektów i domyślne ustawienia efektów dźwiękowych
- Transporty skierowane do Minecrafta: `McHttp`, `McWss` i `McTcp`
- trwała konfiguracja w `config/ServerProperties.json`

Serwer to współdzielone środowisko wykonawcze, na które muszą zgodzić się zarówno klienci graczy, jak i integracja po stronie Minecrafta. Jeśli klient się połączy, ale Minecraft nie, gracze mogą pojawić się w sesjach głosowych bez przydatnych danych o pozycji na świecie.

### Warstwa integracji Minecrafta

To zależy od topologii:

- `VoiceCraft.Addon.Core.McHttp` dla serwera dedykowanego Bedrock
- `VoiceCraft.Addon.Core.McWss` dla lokalnych światów Bedrock i konfiguracji tunelu dowodzenia
- `GeyserVoice` dla topologii Java, Geyser/Floodgate, Paper, Velocity i BungeeCord

Warstwa integracji odpowiada za tłumaczenie zdarzeń gry na stan VoiceCraft: dołączenie gracza, opuszczenie gracza, aktualizacja pozycji, identyfikatory świata, żądania powiązania, fałszywe byty, zmiany efektów i cykl życia połączenia.

## Podstawowe pojęcia dotyczące danych

VoiceCraft kręci się wokół bytów, a nie tylko surowych gniazd.

Podmioty niosą stan taki jak:

- imię
- tytuł
- opis
- pozycja
- obrót
- światowy identyfikator
- stan wyciszenia/ogłuszenia
- efektowe maski bitowe

Klienci sieciowi mogą być reprezentowani jako jednostki, a integracje z Minecraftem mogą również tworzyć lub aktualizować jednostki. Model ten pozwala VoiceCraftowi opisywać prawdziwych graczy, fałszywe/wyświetlane podmioty i niestandardowe cele głosowe kierowane na świat za pośrednictwem tego samego potoku stanu.

## Dlaczego transporty są oddzielne

Ruch głosowy VoiceCraft i automatyzacja Minecrafta nie zawsze funkcjonują w tym samym środowisku.

Dlatego:

- klient gracza rozmawia z głównym serwerem głosowym UDP
- Integracja Bedrock lub Java odbywa się za pośrednictwem transportu Minecraft
- każdy transport może mieć swój własny token, powiązanie hosta i maksymalny limit klientów

Ta separacja pozwala zachować stabilność serwera głosowego podczas zmiany integracji z Minecraftem. Na przykład wdrożenie wyłącznie Bedrock może używać `McHttp`, podczas gdy sieć Java/Geyser może zachować ten sam podstawowy serwer głosowy, ale przełączyć stronę Minecraft na `McTcp`.

## Typowe kształty połączeń

### Serwer dedykowany Bedrock

```text
VoiceCraft.Client -> VoiceCraft UDP server
BDS + VoiceCraft.Addon.Core.McHttp -> McHttp endpoint
```

Użyj tej opcji, gdy serwer Bedrock może połączyć się z punktem końcowym HTTP ujawnionym przez `VoiceCraft.Server`.

### Lokalny świat Bedrock

```text
VoiceCraft.Client -> VoiceCraft UDP server
Minecraft local world + Core.McWss -> McWss websocket endpoint
```

Użyj tego do lokalnych testów lub na światach dla jednego gracza, gdzie akceptowalny jest tunel poleceń.

### Java + Geyser/Floodgate

```text
VoiceCraft.Client -> VoiceCraft UDP server
GeyserVoice -> McTcp endpoint
```

Użyj tej opcji, jeśli infrastruktura po stronie Java jest źródłem pozycji gracza i stanu cyklu życia.

## Co najpierw skonfigurować

1. Skonfiguruj `VoiceCraft.Server` i potwierdź, że uruchamia się czysto.
2. Wybierz transport Minecraft pasujący do topologii.
3. Upewnij się, że klient łączy się z `VoiceCraftConfig.Port`.
4. Upewnij się, że integracja z Minecraftem uwierzytelnia się za pomocą pasującego tokena transportowego.
5. Przed dodaniem kolejnych niestandardowych zachowań zweryfikuj aktualizacje przepływu wiązania i pozycji.
