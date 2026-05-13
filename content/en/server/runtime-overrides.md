# Runtime Overrides

VoiceCraft server supports runtime overrides through root CLI options.

Runtime overrides change the running process without permanently rewriting `config/ServerProperties.json`. They are useful when a panel, container, systemd unit, or plugin launches the server and needs to inject environment-specific values.

These options are ideal when:

- you want environment-specific values without editing JSON
- a process manager injects values at startup
- `GeyserVoice` launches the VoiceCraft runtime automatically
- you test several transport topologies from the same install folder

If you are doing a simple manual install, edit `ServerProperties.json` first and use overrides only when they make deployment clearer.

## Supported options

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## Override precedence

At startup, VoiceCraft loads `ServerProperties.json`, then applies runtime overrides for the current process.

That means:

- the JSON file remains the persistent default
- the CLI value wins for that run
- restarting without the same CLI flag returns to the JSON value
- backups should still include the JSON config, even if your production process uses overrides

## What each option changes

### `--language`

Overrides `VoiceCraftConfig.Language` for the current process.

Example:

```bash
./VoiceCraft.Server --language ru-RU
```

Use this for logs and diagnostics. It does not change client UI language.

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

This is the safest way to run a single-purpose process. For example, a BDS-only host can start with `--transport-mode http` even if the JSON config still contains defaults for other transports.

### `--transport-host`

Overrides the Minecraft transport host:

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

Example:

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

For `McHttp` and `McWss`, VoiceCraft applies the host to the URI-style hostname. For `McTcp`, it applies the plain host field.

### `--transport-port`

Overrides the Minecraft transport port:

- URI port in `McHttpConfig.Hostname`
- URI port in `McWssConfig.Hostname`
- `McTcpConfig.Port`

Example:

```bash
./VoiceCraft.Server --transport-port 9055
```

Be careful when several transports share the same port in defaults. If you enable multiple transports with one override, make sure the resulting bindings are valid for your platform and topology.

### `--server-key`

Overrides the shared login token used by:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Example:

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

Use this when secrets are supplied by a process manager or plugin. Do not put production tokens directly into public service files, screenshots, or shared support logs.

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

## systemd example

```ini
[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
Restart=always
```

Use an environment file or secret manager for `--server-key` if the token should not live directly in the unit file.

## Container example

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050 --server-key "$VOICECRAFT_TOKEN"
```

This keeps the image reusable while letting each environment provide its own token and binding.

## Important behavior

- runtime overrides are process-local
- they do not permanently rewrite `ServerProperties.json`
- they are excellent for testing and automation
- they reduce the need for multiple config copies
- if a process manager restarts the server, it must pass the same overrides every time
- if a value looks wrong in logs, check both JSON config and startup arguments

## When not to use overrides

Avoid overrides when:

- you are still learning the config shape
- you expect another admin to inspect only `ServerProperties.json`
- you do not have a reliable place to store secrets outside the config file
- the override makes it unclear which transport is actually enabled
