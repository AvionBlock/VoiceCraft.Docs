# 运行时覆盖

VoiceCraft 服务器通过根 CLI 选项支持运行时覆盖。

这些选项在以下情况下非常理想：

- 您想要环境特定的值而不编辑 JSON
- 流程管理器在启动时注入值
- `GeyserVoice` launches the VoiceCraft runtime automatically
- 您可以从同一安装文件夹测试多种传输拓扑

## 支持的选项

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## 每个选项的变化

### `--language`

Overrides `VoiceCraftConfig.Language` for the current process.

示例：

```bash
./VoiceCraft.Server --language ru-RU
```

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

### `--transport-host`

覆盖 Minecraft 传输主机：

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

示例：

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

### `--transport-port`

覆盖 Minecraft 传输端口：

- URI port in `McHttpConfig.Hostname`
- URI port in `McWssConfig.Hostname`
- `McTcpConfig.Port`

示例：

```bash
./VoiceCraft.Server --transport-port 9055
```

### `--server-key`

覆盖以下使用的共享登录令牌：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

示例：

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

## 良好的部署示例

### 专用BDS主机

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Java 桥接主机

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### 本地单人游戏测试

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## 重要行为

- 运行时覆盖是进程本地的
- they do not permanently rewrite `ServerProperties.json`
- 它们非常适合测试和自动化
- 它们减少了对多个配置副本的需求
