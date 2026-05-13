# 运行时覆盖

VoiceCraft 服务器通过根 CLI 选项支持运行时覆盖。

运行时覆盖会改变当前运行的进程，但不会永久重写 `config/ServerProperties.json`。当面板、容器、systemd 单元或插件启动服务器，并需要注入特定环境的值时，它们很有用。

这些选项在以下情况下非常理想：

- 您希望使用特定环境的值，但不想编辑 JSON
- 流程管理器在启动时注入值
- `GeyserVoice` 会自动启动 VoiceCraft 运行时
- 您从同一个安装文件夹测试多种传输拓扑

如果只是简单的手动安装，请先编辑 `ServerProperties.json`，只在覆盖能让部署更清晰时再使用覆盖。

## 支持的选项

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## 覆盖优先级

启动时，VoiceCraft 会加载 `ServerProperties.json`，然后为当前进程应用运行时覆盖。

这意味着：

- JSON 文件保持持久默认值
- CLI 值在该运行中获胜
- 如果重启时没有传入相同的 CLI 标志，就会回到 JSON 中的值
- 即使生产进程使用覆盖，备份中仍应包含 JSON 配置

## 每个选项的变化

### `--language`

覆盖当前进程的 `VoiceCraftConfig.Language`。

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
- `ws`、`websocket`、`websockets` 等别名
- `local-socket`、`tcp-socket` 等别名会规范化为 `tcp`

示例：

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

设置后，VoiceCraft 首先禁用所有 Minecraft 传输，然后仅重新启用选定的传输。

这是运行单用途进程最安全的方式。例如，即使 JSON 配置中仍保留其他传输的默认值，仅用于 BDS 的主机也可以用 `--transport-mode http` 启动。

### `--transport-host`

覆盖 Minecraft 传输主机：

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

示例：

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

对于 `McHttp` 和 `McWss`，VoiceCraft 会把主机应用到 URI 形式的主机名。对于 `McTcp`，它会应用到普通主机字段。

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
