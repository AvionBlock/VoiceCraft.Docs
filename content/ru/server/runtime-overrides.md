# Runtime overrides

Сервер VoiceCraft поддерживает runtime overrides через CLI.

Они особенно полезны, когда:

- нужны разные значения без правки JSON
- значения подставляет systemd / контейнер / панель
- `GeyserVoice` сам запускает VoiceCraft runtime

## Поддерживаемые опции

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## Что меняет каждая опция

### `--language`

Переопределяет `VoiceCraftConfig.Language` для текущего запуска.

### `--transport-mode`

Включает только выбранные Minecraft transports.

Поддерживаемые значения:

- `http`
- `tcp`
- `wss`
- а также алиасы вроде `ws`, `websocket`, `websockets`

### `--transport-host`

Переопределяет host для:

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

### `--transport-port`

Переопределяет port для:

- URI port в `McHttpConfig.Hostname`
- URI port в `McWssConfig.Hostname`
- `McTcpConfig.Port`

### `--server-key`

Переопределяет общий login token для:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

## Примеры

### Только `McTcp`

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Только `McHttp`

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Переопределить token

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

## Важное поведение

- overrides действуют только для текущего процесса
- они не переписывают `ServerProperties.json`
- это очень удобно для тестов и автоматизации
