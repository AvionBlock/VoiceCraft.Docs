# 运行时覆盖

VoiceCraft 服务器通过根 CLI 选项支持运行时覆盖。

Runtime overrides change the running process without permanently rewriting `config/ServerProperties.json`. They are useful when a panel, container, systemd unit, or plugin launches the server and needs to inject environment-specific values.

这些选项在以下情况下非常理想：

- you want environment-specific values without editing JSON
- 流程管理器在启动时注入值
- `GeyserVoice` launches the VoiceCraft runtime automatically
- you test several transport topologies from the same install folder

If you are doing a simple manual install, edit `ServerProperties.json` first and use overrides only when they make deployment clearer.

## 支持的选项

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## 覆盖优先级

At startup, VoiceCraft loads `ServerProperties.json`, then applies runtime overrides for the current process.

这意味着：

- JSON 文件保持持久默认值
- CLI 值在该运行中获胜
- restarting without the same CLI flag returns to the JSON value
- backups should still include the JSON config, even if your production process uses overrides

## 每个选项的变化

### `--language`

Overrides `VoiceCraftConfig.Language` for the current process.

示例：

```bash
./VoiceCraft.Server --language ru-RU
```

将其用于日志和诊断。它不会更改客户端 UI 语言。

### `--transport-mode`

仅为当前运行启用选定的 Minecraft 传输。

接受的值：

- `http`
- `tcp`
- `wss`
- aliases such as `ws`, `websocket`, `websockets`
- aliases such as `local-socket`, `tcp-socket` normalize to `tcp`

示例：

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

设置后，VoiceCraft 首先禁用所有 Minecraft 传输，然后仅重新启用选定的传输。

This is the safest way to run a single-purpose process. For example, a BDS-only host can start with `--transport-mode http` even if the JSON config still contains defaults for other transports.

### `--transport-host`

覆盖 Minecraft 传输主机：

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

示例：

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

For `McHttp` and `McWss`, VoiceCraft applies the host to the URI-style hostname.对于 `McTcp`，它应用普通主机字段。

### `--transport-port`

覆盖 Minecraft 传输端口：

- `McHttpConfig.Hostname` 中的 URI 端口
- `McWssConfig.Hostname` 中的 URI 端口
- `McTcpConfig.Port`

示例：

```bash
./VoiceCraft.Server --transport-port 9055
```

当多个传输默认共享同一端口时要小心。如果您通过一次覆盖启用多种传输，请确保生成的绑定对于您的平台和拓扑有效。

### `--server-key`

覆盖以下使用的共享登录令牌：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

示例：

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

当流程管理器或插件提供机密时使用此选项。不要将生产令牌直接放入公共服务文件、屏幕截图或共享支持日志中。

## 良好的部署示例

### 专用BDS主机

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Java桥接主机

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### 本地单人游戏测试

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## 系统示例

```ini
[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
Restart=always
```

如果令牌不应直接存在于单元文件中，请使用 `--server-key` 的环境文件或机密管理器。

## 容器示例

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050 --server-key "$VOICECRAFT_TOKEN"
```

这可以保持图像的可重用性，同时让每个环境提供自己的令牌和绑定。

## 重要行为

- 运行时覆盖是进程本地的
- 他们不会永久重写 `ServerProperties.json`
- 它们非常适合测试和自动化
- 它们减少了对多个配置副本的需求
- 如果进程管理器重新启动服务器，则每次都必须传递相同的覆盖
- 如果日志中的值看起来错误，请检查 JSON 配置和启动参数

## 何时不使用覆盖

在以下情况下避免覆盖：

- 你还在学习配置形状
- 您希望另一个管理员仅检查 `ServerProperties.json`
- 您在配置文件之外没有可靠的地方来存储机密
- 覆盖使得不清楚实际启用了哪种传输
