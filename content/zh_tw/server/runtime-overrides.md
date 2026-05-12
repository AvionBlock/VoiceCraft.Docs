# 運行時覆蓋

VoiceCraft 伺服器透過根 CLI 選項支援執行時間覆蓋。

這些選項在以下情況下非常理想：

- 您想要環境特定的值而不編輯 JSON
- 流程管理器在啟動時注入值
- `GeyserVoice` launches the VoiceCraft runtime automatically
- 您可以從同一安裝資料夾測試多種傳輸拓撲

## 支援的選項

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## 每個選項的變化

### `--language`

Overrides `VoiceCraftConfig.Language` for the current process.

範例：

```bash
./VoiceCraft.Server --language ru-RU
```

### `--transport-mode`

僅為目前運行啟用選定的 Minecraft 傳輸。

接受的值：

- `http`
- `tcp`
- `wss`
- aliases such as `ws`, `websocket`, `websockets`
- aliases such as `local-socket`, `tcp-socket` normalize to `tcp`

範例：

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

設定後，VoiceCraft 首先停用所有 Minecraft 傳輸，然後僅重新啟用選定的傳輸。

### `--transport-host`

覆蓋 Minecraft 傳輸主機：

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

範例：

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

### `--transport-port`

覆蓋 Minecraft 傳輸連接埠：

- URI port in `McHttpConfig.Hostname`
- URI port in `McWssConfig.Hostname`
- `McTcpConfig.Port`

範例：

```bash
./VoiceCraft.Server --transport-port 9055
```

### `--server-key`

覆蓋以下使用的共享登入令牌：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

範例：

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

## 良好的部署範例

### 專用BDS主機

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Java 橋接主機

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### 本地單人遊戲測試

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## 重要行為

- 運行時覆蓋是進程本地的
- they do not permanently rewrite `ServerProperties.json`
- 它們非常適合測試和自動化
- 它們減少了對多個配置副本的需求
