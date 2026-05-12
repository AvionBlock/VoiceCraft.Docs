# Polecenia serwera

While `VoiceCraft.Server` is running, console commands are available for moderation and entity management.

## Podstawowe

- `list [--clientsOnly] [--limit N]`
  wyświetla listę jednostek aktualnie znanych serwerowi
- `stop`
  zatrzymaj serwer
- `shutdown`
  alias of `stop`
- `kick <id>`
  odłączyć klienta sieciowego

## Zarządzanie stanem klienta

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

Ważne zachowanie:

- w przypadku zwykłych jednostek przełączają one stan wyciszenia/ogłuszenia jednostki
- on connected network clients, the server uses the dedicated server-side flags (`ServerMuted`, `ServerDeafened`)

## Zarządzanie danymi jednostek

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

Uwagi:

- `settitle` and `setdescription` target network entities
- `setname`, `setposition`, and `setworldid` work on general entities
- puste wartości tytułu/opisu są normalizowane do pustego ciągu znaków

## `list` options

- `--clientsOnly`
  wyświetla listę tylko podłączonych klientów sieciowych
- `--limit <N>`
  ogranicz liczbę wyświetlanych wierszy

Przykład:

```text
list --clientsOnly --limit 25
```

## Praktyczny przepływ pracy

```text
list --clientsOnly
setworldid 12 spawn_world
setposition 12 100 64 100
mute 15
kick 18
```

## Przypadki awarii

Serwer zwraca błąd, gdy:

- identyfikator podmiotu nie istnieje
- polecenie oczekuje klienta sieciowego, ale odbiera podmiot niesieciowy
- `list --limit` is negative

## Kiedy te polecenia są przydatne

- testowanie integracji dodatków lub wtyczek
- poprawianie błędnych metadanych podmiotu
- moderacja personelu
- sprawdzanie aktualizacji identyfikatora świata i pozycji podczas konfiguracji
