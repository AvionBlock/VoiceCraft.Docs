# Architektura systemu

Na tej stronie opisano najważniejsze elementy VoiceCraft i ich wzajemne powiązania.

## Główne warstwy

### Warstwa klienta

`VoiceCraft.Client` handles:

- przechwytywanie wejścia
- obróbka wstępna
- Transport UDP do VoiceCraft
- odtwarzanie i lokalne preferencje użytkownika

### Warstwa serwera

`VoiceCraft.Server` handles:

- stan jednostki sieciowej
- sesje klienta głosowego
- flagi moderacji
- maski bitowe efektów i domyślne ustawienia efektów dźwiękowych
- Transporty skierowane do Minecrafta

### Warstwa integracji Minecrafta

To zależy od topologii:

- `VoiceCraft.Addon` for Bedrock
- `GeyserVoice` for Java / Geyser / proxy networks

## Podstawowe pojęcia dotyczące danych

VoiceCraft kręci się wokół bytów, a nie tylko surowych gniazd.

Podmioty niosą stan taki jak:

- imię
- tytuł
- opis
- pozycja
- obrót
- identyfikator świata
- stan wyciszenia/ogłuszenia
- maski bitowe efektów

## Dlaczego transporty są oddzielne

Ruch głosowy VoiceCraft i automatyzacja Minecrafta nie zawsze funkcjonują w tym samym środowisku.

Dlatego:

- klient rozmawia z głównym serwerem głosowym
- Integracja Bedrock lub Java odbywa się poprzez warstwę transportową

To oddzielenie zapewnia elastyczność platformy podstawowej.
