# Runtime Overrides

VoiceCraft server supports runtime overrides through root CLI options.

These options are ideal when:

- you want environment-specific values without editing JSON
- a process manager injects values at startup
- `GeyserVoice` launches the VoiceCraft runtime automatically
- you test several transport topologies from the same install folder

## Supported options

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## What each option changes

### `--language`

Overrides `VoiceCraftConfig.Language` for the current process.

Example:

```bash
./VoiceCraft.Server --language ru-RU
```

### `--transport-mode`

Enables only selected Minecraft transports for the current run.

Accepted values:

- `http`
- `tcp`
- `wss`
- aliases such as `ws`, `websocket`, `websockets`
- aliases such as `local-socket`, `tcp-socket` normalize to `tcp`

Examples:

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

When set, VoiceCraft disables all Minecraft transports first, then re-enables only the selected ones.

### `--transport-host`

Overrides the Minecraft transport host:

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

Example:

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

### `--transport-port`

Overrides the Minecraft transport port:

- URI port in `McHttpConfig.Hostname`
- URI port in `McWssConfig.Hostname`
- `McTcpConfig.Port`

Example:

```bash
./VoiceCraft.Server --transport-port 9055
```

### `--server-key`

Overrides the shared login token used by:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Example:

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

## Good deployment examples

### Dedicated BDS host

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Java bridge host

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Local singleplayer testing

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## Important behavior

- runtime overrides are process-local
- they do not permanently rewrite `ServerProperties.json`
- they are excellent for testing and automation
- they reduce the need for multiple config copies
