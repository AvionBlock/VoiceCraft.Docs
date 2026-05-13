# Polecenia serwera

Gdy `VoiceCraft.Server` jest uruchomiony, dostępne są polecenia konsoli umożliwiające moderację i zarządzanie jednostkami.

Polecenia działają na identyfikatorach jednostek po stronie serwera. Najpierw użyj `list`, znajdź jednostkę lub podłączonego klienta, na który chcesz wpłynąć, a następnie uruchom określone polecenie moderacji lub metadanych.

Polecenia te są najbardziej przydatne podczas konfiguracji, debugowania i moderacji personelu. Nie zastępują one prawidłowej konfiguracji dodatku lub wtyczki Minecraft.

## Przebieg poleceń

1. Uruchom `list` lub `list --clientsOnly`.
2. Znajdź identyfikator docelowej jednostki lub klienta sieciowego.
3. Zastosuj polecenie.
4. Uruchom ponownie `list`, aby sprawdzić, czy stan się zmienił.

## Podstawowe

- `list [--clientsOnly] [--limit N]`
  wyświetla listę jednostek aktualnie znanych serwerowi
- `stop`
  zatrzymaj serwer
- `shutdown`
  pseudonim `stop`
- `kick <id>`
  odłączyć klienta sieciowego

Użyj `kick`, gdy sesja klienta jest zablokowana, zduplikowana lub wymaga ponownego połączenia po zmianach konfiguracji. Nie blokuje to możliwości ponownego połączenia się gracza.

## Zarządzanie stanem klienta

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

Ważne zachowanie:

- w przypadku zwykłych jednostek przełączają one stan wyciszenia/ogłuszenia jednostki
- na podłączonych klientach sieciowych serwer używa dedykowanych flag po stronie serwera (`ServerMuted`, `ServerDeafened`)

Wyciszenie/głuszenie serwera jest miarodajne dla wszystkich słuchaczy. Lokalne wyciszenie w kliencie wpływa tylko na użytkownika lokalnego.

## Zarządzanie danymi podmiotów

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

Uwagi:

- `settitle` i `setdescription` docelowe jednostki sieciowe
- `setname`, `setposition` i `setworldid` działają na encjach ogólnych
- puste wartości tytułu/opisu są normalizowane do pustego ciągu znaków

Ręczne polecenia jednostek służą głównie do diagnostyki. W zdrowej konfiguracji produkcyjnej integracja z Minecraftem powinna stale aktualizować nazwy, stanowiska i identyfikatory światów.

## `list` opcje

- `--clientsOnly`
  wyświetla listę tylko podłączonych klientów sieciowych
- `--limit <N>`
  ogranicz liczbę wyświetlanych wierszy

Przykład:

```text
list --clientsOnly --limit 25
```

## Praktyczny przebieg pracy

```text
list --clientsOnly
setworldid 12 spawn_world
setposition 12 100 64 100
mute 15
kick 18
```

## Przypadki awarii

Serwer zwraca błąd, gdy:

- identyfikator jednostki nie istnieje
- polecenie oczekuje klienta sieciowego, ale odbiera jednostkę niesieciową
- `list --limit` jest ujemny

## Kiedy te polecenia są przydatne

- testowanie integracji dodatków lub wtyczek
- poprawianie nieprawidłowych metadanych jednostki
- moderacja personelu
- sprawdzanie aktualizacji identyfikatora świata i pozycji podczas konfiguracji

## Przykładowe kontrole konfiguracji

### Potwierdź, że klienci są połączeni

```text
list --clientsOnly --limit 20
```

Jeśli brakuje oczekiwanego gracza, sprawdź adres serwera klienta, port UDP i reguły zapory przed debugowaniem integracji z Minecraftem.

### Potwierdź, że aktualizacje pozycji się przesuwają

```text
list --limit 20
```

Przesuń gracza w grze, a następnie ponownie uruchom `list`. Jeśli pozycja się nie zmieni, problem prawdopodobnie leży w ścieżce transportu dodatku/wtyczki, a nie w kliencie audio.

### Popraw tymczasowe metadane testowe

```text
setname 12 TestPlayer
setworldid 12 overworld
setposition 12 100 64 100
```

Używaj tego tylko do izolowania zachowania. Jeśli integracja wyśle ​​później nową aktualizację, może to spowodować nadpisanie wprowadzonych ręcznie wartości.

## Uwagi dotyczące bezpieczeństwa

- Nie udostępniaj dostępu do konsoli serwera zwykłym graczom.
- Unikaj ręcznej edycji metadanych w ramach konfiguracji długoterminowej.
- Przechowuj dzienniki poleceń podczas debugowania incydentów produkcyjnych.
- Preferuję naprawienie integracji źródła, gdy wartości wielokrotnie się odwracają lub dryfują.
