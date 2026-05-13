# Pierwsze uruchomienie serwera

Ta strona uruchamia się po jednokrotnym pobraniu i uruchomieniu `VoiceCraft.Server`. Celem jest przekształcenie tego pierwszego uruchomienia w działający serwer, z którego będą mogli faktycznie korzystać klienci i Minecraft.

## Co się dzieje przy pierwszym uruchomieniu

Podczas uruchamiania VoiceCraft szuka `ServerProperties.json` w bieżącym katalogu i podkatalogach.

Jeśli plik nie zostanie znaleziony, serwer automatycznie utworzy:

- `config/`
- `config/ServerProperties.json`

Plik ten staje się głównym, trwałym źródłem prawdy o zachowaniu serwera.

Po pojawieniu się pliku zatrzymaj serwer, edytuj konfigurację, a następnie uruchom go ponownie. Pierwsze uruchomienie tworzy jedynie linię bazową; konfiguracja nie została jeszcze ukończona.

## Domyślne porty i punkty końcowe

Domyślnie wygenerowana konfiguracja jest wyrównana w następujący sposób:

- VoiceCraft UDP: `9050`
- `McHttp`: `http://127.0.0.1:9050/`
- `McWss`: `ws://127.0.0.1:9051/`
- `McTcp`: `127.0.0.1:9050`

Uwagi:

- Ruch głosowy UDP i niektóre domyślne ustawienia transportu są wspólne `9050`
- `McWss` jest domyślnie oddzielony w `9051`
- `McTcp` jest szczególnie istotny dla `GeyserVoice`

## Liniowa ścieżka pierwszego uruchomienia

### 1. Zatrzymaj się i otwórz wygenerowaną konfigurację

Otwórz:

```text
config/ServerProperties.json
```

Zachowaj ten plik w tym samym folderze instalacyjnym i dołącz go do kopii zapasowych.

### 2. Wymień wygenerowane tokeny

Zanim połączy się jakikolwiek dodatek, wtyczka lub klient gracza, zamień:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Użyj żetonu z transportu, z którym faktycznie łączysz się później. Na przykład polecenie BDS `vcconnect` musi używać `McHttpConfig.LoginToken`, podczas gdy GeyserVoice musi używać `McTcpConfig.LoginToken`.

### 3. Wybierz jeden podstawowy transport Minecraft

Użyj topologii, aby zdecydować, co powinno być włączone:

| Konfiguracja | Włącz | Kontynuuj z |
|-------|--------|---------------|
| Serwer dedykowany Bedrock | `McHttpConfig` | [McHttp for BDS](/minecraft/mchttp-bds) |
| Lokalny świat Bedrock | `McWssConfig` | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) |
| Java + Geyser/Floodgate | `McTcpConfig` | [GeyserVoice](/ecosystem/geyservoice) |

Możesz uruchomić wiele transportów, ale pierwsza konfiguracja jest łatwiejsza do debugowania, gdy ujawniona jest tylko wymagana.

### 4. Ustaw powiązania hosta

Użyj lokalnych powiązań, gdy wszystko działa na jednym komputerze:

- `McHttpConfig.Hostname = http://127.0.0.1:9050/`
- `McWssConfig.Hostname = ws://127.0.0.1:9051/`
- `McTcpConfig.Hostname = 127.0.0.1`

Używaj `0.0.0.0` tylko wtedy, gdy inna maszyna, kontener lub host gry musi dotrzeć do VoiceCraft.

### 5. Uruchom ponownie serwer

Uruchom ponownie `VoiceCraft.Server` z tego samego folderu. Uważaj na:

- nieprawidłowe błędy JSON
- port już używany, błędy
- nieudany odbiornik lub błędy wiązania

Napraw je, zanim przejdziesz dalej. Dodatek lub wtyczka Minecraft nie może niezawodnie łączyć się, gdy serwer zgłasza błędy uruchamiania.

### 6. Podłącz klienta VoiceCraft

Zainstaluj klienta z [Download Page](/download), a następnie dodaj wpis serwera:

- host: adres serwera VoiceCraft
- port: `VoiceCraftConfig.Port`, zwykle `9050`

Do testów lokalnych użyj:

```text
127.0.0.1:9050
```

Upewnij się, że klient `Positioning Type` pasuje do `VoiceCraftConfig.PositioningType`.

### 7. Połącz się z Minecraftem

Kontynuuj korzystanie z przewodnika odpowiadającego włączonemu transportowi:

- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [GeyserVoice](/ecosystem/geyservoice)

Po wyświetleniu monitu o token użyj pasującego tokenu transportowego z `ServerProperties.json`.

### 8. Zatwierdź konfigurację

Pierwsza konfiguracja jest zakończona, gdy:

- dzienniki serwera nie wykazują żadnych błędów konfiguracji ani odbiornika
- klient VoiceCraft łączy się z punktem końcowym UDP
- Minecraft uwierzytelnia się poprzez wybrany transport
- działa przepływ wiązania w grze
- aktualizacje pozycji gracza docierają do VoiceCraft
- głos zbliżeniowy działa w oczekiwanym zasięgu

## Argumenty startowe

Serwer VoiceCraft obsługuje następujące argumenty główne:

- `--exit-on-invalid-properties`
  Zakończ, jeśli nie można przeanalizować `ServerProperties.json`.
- `--language <culture>`
  Zastąp język dziennika serwera dla bieżącego przebiegu.
- `--transport-mode <mode>`
  Włącz podzbiór transportów Minecraft dla bieżącego przebiegu.
- `--transport-host <host>`
  Zastąp skonfigurowany host transportu Minecraft.
- `--transport-port <port>`
  Zastąp skonfigurowany port transportowy Minecraft.
- `--server-key <token>`
  Zastąp udostępniony token logowania po stronie Minecraft dla bieżącego przebiegu.

W kodzie istnieją również krótkie aliasy:

- `-eip`
- `-l`
- `-tm`
- `-th`
- `-tp`
- `-sk`

## Przykłady

### Uruchom z nadpisaniem języka startowego

```bash
./VoiceCraft.Server --language en-US
```

### Wyjdź, jeśli konfiguracja jest nieprawidłowa

```bash
./VoiceCraft.Server --exit-on-invalid-properties
```

### Uruchom tylko `McTcp` dla mostu Java

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Uruchom tylko `McHttp`

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Zastąp token bez edytowania JSON

```bash
./VoiceCraft.Server --server-key "replace-with-secure-token"
```

## Jak zachowują się nadpisania transportu

Zastąpienia w czasie wykonywania nie powodują trwałego przepisania `ServerProperties.json`.

Dotyczą tylko bieżącego procesu i są przydatne, gdy:

- uruchamianie wielu środowisk z jednego obrazu
- za pomocą paneli lub drop-inów systemowych
- testowanie topologii bezpośrednich i proxy
- zezwolenie innemu narzędziu, takiemu jak `GeyserVoice` na uruchomienie środowiska wykonawczego z wygenerowanymi wartościami

## Lista kontrolna pierwszego uruchomienia

1. Uruchom serwer raz, aby wygenerować `config/ServerProperties.json`.
2. Zatrzymaj serwer przed edycją wygenerowanej konfiguracji.
3. Zmień wszystkie wygenerowane tokeny logowania.
4. Potwierdź, jakiego transportu faktycznie potrzebujesz:
   - `McHttp` dla BDS
   - `McWss` dla światów lokalnych
   - `McTcp` dla `GeyserVoice`
5. Sprawdź powiązania hosta.
6. Otwórz tylko te porty, których potrzebujesz.
7. Uruchom ponownie serwer z tego samego folderu instalacyjnego.
8. Potwierdź `PositioningType` ze swoimi klientami.
9. Przetestuj połączenie klienta przed podłączeniem automatyzacji Minecrafta.
10. Podłącz dodatek lub wtyczkę Minecraft i sprawdź przepływ powiązania.

## Typowe błędy pierwszego uruchomienia

- pozostawienie wygenerowanych tokenów bez zmian
- udostępnianie punktów końcowych `127.0.0.1` zdalnym węzłom
- zapominając, że mosty po stronie Java mogą wymagać `McTcp`
- umożliwienie każdego transportu w produkcji bez ich faktycznej potrzeby
- edytowanie `ServerProperties.json`, podczas gdy menedżer procesów natychmiast uruchamia ponownie starą, uszkodzoną konfigurację
- przy użyciu portu klienta UDP, gdzie przewodnik Minecraft oczekuje punktu końcowego transportu

Pełne informacje dotyczące konfiguracji można znaleźć w artykule [ServerProperties.json](/server/server-properties).
