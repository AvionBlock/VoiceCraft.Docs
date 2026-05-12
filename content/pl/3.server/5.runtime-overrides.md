# Zastąpienia środowiska wykonawczego

Serwer VoiceCraft obsługuje zastępowanie środowiska wykonawczego poprzez opcje root CLI.

Opcje te są idealne, gdy:

- chcesz wartości specyficznych dla środowiska bez edytowania JSON
- menedżer procesu wstrzykuje wartości przy uruchomieniu
- `GeyserVoice` launches the VoiceCraft runtime automatically
- testujesz kilka topologii transportu z tego samego folderu instalacyjnego

## Obsługiwane opcje

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## Co zmienia każda opcja

### `--language`

Overrides `VoiceCraftConfig.Language` for the current process.

Przykład:

```bash
./VoiceCraft.Server --language ru-RU
```

### `--transport-mode`

Włącza tylko wybrane transporty Minecrafta dla bieżącego przebiegu.

Akceptowane wartości:

- `http`
- `tcp`
- `wss`
- aliases such as `ws`, `websocket`, `websockets`
- aliases such as `local-socket`, `tcp-socket` normalize to `tcp`

Przykłady:

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

Po ustawieniu VoiceCraft najpierw wyłącza wszystkie transporty Minecrafta, a następnie ponownie włącza tylko wybrane.

### `--transport-host`

Zastępuje hosta transportu Minecraft:

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

Przykład:

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

### `--transport-port`

Zastępuje port transportowy Minecraft:

- URI port in `McHttpConfig.Hostname`
- URI port in `McWssConfig.Hostname`
- `McTcpConfig.Port`

Przykład:

```bash
./VoiceCraft.Server --transport-port 9055
```

### `--server-key`

Zastępuje udostępniony token logowania używany przez:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Przykład:

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

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

## Ważne zachowanie

- nadpisania środowiska wykonawczego są lokalne dla procesu
- they do not permanently rewrite `ServerProperties.json`
- doskonale nadają się do testowania i automatyzacji
- zmniejszają potrzebę wykonywania wielu kopii konfiguracji
