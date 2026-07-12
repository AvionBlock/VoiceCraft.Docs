# Zastąpienia środowiska wykonawczego

Serwer VoiceCraft obsługuje zastępowanie środowiska wykonawczego poprzez opcje root CLI.

Zastąpienia środowiska wykonawczego zmieniają działający proces bez trwałego przepisywania `config/ServerProperties.json`. Są przydatne, gdy panel, kontener, jednostka systemowa lub wtyczka uruchamia serwer i musi wstrzyknąć wartości specyficzne dla środowiska.

Opcje te są idealne, gdy:

- chcesz wartości specyficznych dla środowiska bez edytowania JSON
- menedżer procesu wstrzykuje wartości przy uruchomieniu
- `VoiceCraft.Java` automatycznie uruchamia środowisko wykonawcze VoiceCraft
- testujesz kilka topologii transportu z tego samego folderu instalacyjnego

Jeśli wykonujesz prostą instalację ręczną, najpierw edytuj `ServerProperties.json` i używaj zastąpień tylko wtedy, gdy ułatwiają one wdrożenie.

## Obsługiwane opcje

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## Zastąp pierwszeństwo

Podczas uruchamiania VoiceCraft ładuje `ServerProperties.json`, a następnie stosuje nadpisania środowiska wykonawczego dla bieżącego procesu.

To oznacza:

- plik JSON pozostaje trwałym ustawieniem domyślnym
- wartość CLI wygrywa w tym przebiegu
- ponowne uruchomienie bez tej samej flagi CLI powoduje powrót do wartości JSON
- kopie zapasowe powinny nadal zawierać konfigurację JSON, nawet jeśli w procesie produkcyjnym stosowane są przesłonięcia

## Co zmienia każda opcja

### `--language`

Zastępuje `VoiceCraftConfig.Language` dla bieżącego procesu.

Przykład:

```bash
./VoiceCraft.Server --language ru-RU
```

Użyj tego do dzienników i diagnostyki. Nie powoduje zmiany języka interfejsu użytkownika klienta.

### `--transport-mode`

Włącza tylko wybrane transporty Minecrafta dla bieżącego przebiegu.

Akceptowane wartości:

- `http`
- `tcp`
- `wss`
- aliasy takie jak `ws`, `websocket`, `websockets`
- aliasy takie jak `local-socket`, `tcp-socket` normalizuj do `tcp`

Przykłady:

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

Po ustawieniu VoiceCraft najpierw wyłącza wszystkie transporty Minecrafta, a następnie ponownie włącza tylko wybrane.

Jest to najbezpieczniejszy sposób uruchomienia procesu mającego jeden cel. Na przykład host obsługujący tylko BDS może zaczynać się od `--transport-mode http`, nawet jeśli konfiguracja JSON nadal zawiera wartości domyślne dla innych transportów.

### `--transport-host`

Zastępuje hosta transportu Minecraft:

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

Przykład:

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

W przypadku `McHttp` i `McWss` VoiceCraft stosuje hosta do nazwy hosta w stylu URI. W przypadku `McTcp` stosuje się zwykłe pole hosta.

### `--transport-port`

Zastępuje port transportowy Minecraft:

- Port URI w `McHttpConfig.Hostname`
- Port URI w `McWssConfig.Hostname`
- `McTcpConfig.Port`

Przykład:

```bash
./VoiceCraft.Server --transport-port 9055
```

Zachowaj ostrożność, gdy kilka transportów korzysta domyślnie z tego samego portu. Jeśli włączysz wiele transportów za pomocą jednego zastąpienia, upewnij się, że powstałe powiązania są prawidłowe dla Twojej platformy i topologii.

### `--server-key`

Zastępuje udostępniony token logowania używany przez:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Przykład:

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

Użyj tej opcji, gdy klucze tajne są dostarczane przez menedżera procesów lub wtyczkę. Nie umieszczaj tokenów produkcyjnych bezpośrednio w plikach usług publicznych, zrzutach ekranu lub udostępnionych dziennikach pomocy technicznej.

## Dobre przykłady wdrożeń

### Dedykowany host BDS

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Host mostu Java

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Testy lokalnego trybu dla jednego gracza

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## przykład systemowy

```ini
[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
Restart=always
```

Użyj pliku środowiska lub menedżera wpisów tajnych dla `--server-key`, jeśli token nie powinien znajdować się bezpośrednio w pliku jednostkowym.

## Przykład kontenera

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050 --server-key "$VOICECRAFT_TOKEN"
```

Dzięki temu obraz nadaje się do ponownego użycia, a jednocześnie pozwala każdemu środowisku zapewnić własny token i powiązanie.

## Ważne zachowanie

- zastąpienia środowiska wykonawczego są lokalne dla procesu
- nie przepisują na stałe `ServerProperties.json`
- doskonale nadają się do testowania i automatyzacji
- zmniejszają potrzebę tworzenia wielu kopii konfiguracji
- jeśli menedżer procesów zrestartuje serwer, za każdym razem musi przejść te same zmiany
- jeśli wartość w dziennikach wygląda niepoprawnie, sprawdź zarówno konfigurację JSON, jak i argumenty startowe

## Kiedy nie stosować przesłonięć

Unikaj zastępowania, gdy:

- wciąż uczysz się kształtu konfiguracji
- oczekujesz, że inny administrator będzie sprawdzał tylko `ServerProperties.json`
- nie masz niezawodnego miejsca do przechowywania sekretów poza plikiem konfiguracyjnym
- zastąpienie powoduje, że nie jest jasne, który transport jest faktycznie włączony
