# 執行時間覆蓋

VoiceCraft 伺服器透過根 CLI 選項支援執行時間覆蓋。

執行時間覆蓋會變更正在執行的進程，但不會永久重寫 `config/ServerProperties.json`。當面板、容器、systemd 單元或外掛程式啟動伺服器，並需要注入特定環境的值時，它們很有用。

這些選項在以下情況下非常理想：

- 您想要環境特定的值而不編輯 JSON
- 流程管理器在啟動時注入值
- `VoiceCraft.Java` 會自動啟動 VoiceCraft 執行時間
- 您從同一安裝資料夾測試多種傳輸拓撲

如果您正在進行簡單的手動安裝，請先編輯 `ServerProperties.json` 並僅在覆蓋使部署更清晰時才使用覆蓋。

## 支援的選項

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## 覆蓋優先權

啟動時，VoiceCraft 會載入 `ServerProperties.json`，然後對目前進程套用執行時間覆蓋。

這意味著：

- JSON 檔案保持持久預設值
- CLI 值在該次執行中優先
- 在沒有相同 CLI 標誌的情況下重新啟動會傳回 JSON 值
- 即使您的生產過程使用覆蓋，備份仍應包含 JSON 配置

## 每個選項的變化

### `--language`

覆蓋目前進程的 `VoiceCraftConfig.Language`。

範例：

```bash
./VoiceCraft.Server --language ru-RU
```

將其用於日誌和診斷。它不會更改客戶端 UI 語言。

### `--transport-mode`

僅為目前執行啟用選定的 Minecraft 傳輸。

接受的值：

- `http`
- `tcp`
- `wss`
- 別名，例如 `ws`、`websocket`、`websockets`
- `local-socket`、`tcp-socket` 等別名標準化為 `tcp`

範例：

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

設定後，VoiceCraft 首先停用所有 Minecraft 傳輸，然後僅重新啟用選定的傳輸。

這是執行單用途進程最安全的方式。例如，即使 JSON 設定中仍保留其他傳輸的預設值，僅用於 BDS 的主機也可以用 `--transport-mode http` 啟動。

### `--transport-host`

覆蓋 Minecraft 傳輸主機：

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

範例：

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

對於 `McHttp` 和 `McWss`，VoiceCraft 會把主機套用到 URI 形式的主機名稱。對於 `McTcp`，它會套用到普通主機欄位。

### `--transport-port`

覆蓋 Minecraft 傳輸連接埠：

- `McHttpConfig.Hostname` 中的 URI 端口
- `McWssConfig.Hostname` 中的 URI 端口
- `McTcpConfig.Port`

範例：

```bash
./VoiceCraft.Server --transport-port 9055
```

當多個傳輸預設共用相同連接埠時要小心。如果您透過一次覆蓋啟用多種傳輸，請確保產生的綁定對於您的平台和拓撲有效。

### `--server-key`

覆蓋以下使用的共享登入令牌：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

範例：

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

當流程管理器或外掛程式提供機密時使用此選項。請勿將生產令牌直接放入公共服務文件、螢幕截圖或共享支援日誌中。

## 良好的部署範例

### 專用BDS主機

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Java橋接主機

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### 本地單人遊戲測試

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## 系統範例

```ini
[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
Restart=always
```

如果令牌不應直接存在於單元檔案中，請使用 `--server-key` 的環境檔案或機密管理器。

## 容器範例

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050 --server-key "$VOICECRAFT_TOKEN"
```

這可以保持影像的可重複使用性，同時讓每個環境提供自己的令牌和綁定。

## 重要行為

- 執行時間覆蓋是進程本地的
- 它們不會永久重寫 `ServerProperties.json`
- 它們非常適合測試和自動化
- 它們減少了對多個配置副本的需求
- 如果進程管理器重新啟動伺服器，則每次都必須傳遞相同的覆蓋
- 如果日誌中的值看起來錯誤，請檢查 JSON 設定和啟動參數

## 何時不使用覆蓋

在以下情況下避免覆蓋：

- 您還在熟悉配置結構
- 您希望另一位管理員僅檢查 `ServerProperties.json`
- 您在設定檔之外沒有可靠的地方來儲存機密
- 覆蓋使得不清楚實際啟用了哪種傳輸
