# 伺服器首次執行

此頁面從您已經下載並啟動過一次 `VoiceCraft.Server` 的位置開始。目標是把第一次啟動變成客戶端和 Minecraft 都能實際使用的伺服器。

## 第一次啟動時會發生什麼

啟動時，VoiceCraft 會在目前目錄和子目錄中尋找 `ServerProperties.json`。

如果找不到該文件，伺服器會自動建立：

- `config/`
- `config/ServerProperties.json`

該檔案會成為伺服器行為的主要持久配置來源。

檔案出現後，停止伺服器，編輯配置，然後再次啟動。第一次啟動只會建立基礎配置；設定尚未完成。

## 預設連接埠和端點

預設情況下，產生的配置如下：

- VoiceCraft UDP：`9050`
- `McHttp`：`http://127.0.0.1:9050/`
- `McWss`：`ws://127.0.0.1:9051/`
- `McTcp`：`127.0.0.1:9050`

注意事項：

- UDP 語音流量和某些傳輸預設值共用 `9050`
- `McWss` 預設在 `9051` 上分隔
- `McTcp` 與 `VoiceCraft.Java` 特別相關

## 線性的首次執行流程

### 1. 停止伺服器並開啟產生的配置

打開：

```text
config/ServerProperties.json
```

將此檔案儲存在同一安裝資料夾中並將其包含在備份中。

### 2. 替換產生的令牌

在任何附加包、外掛程式或玩家用戶端連接之前，替換：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

使用您稍後實際連接的傳輸中的令牌。例如，BDS `vcconnect` 指令必須使用 `McHttpConfig.LoginToken`，而 VoiceCraft.Java 必須使用 `McTcpConfig.LoginToken`。

### 3. 選擇一個主要的 Minecraft 傳輸

使用拓撲來決定應啟用什麼：

| 設定 | 啟用 | 繼續 |
|-------|--------|---------------|
| Bedrock 專用伺服器 | `McHttpConfig` | [McHttp for BDS](/minecraft/mchttp-bds) |
| 本地 Bedrock 世界 | `McWssConfig` | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) |
| Java + Geyser/Floodgate | `McTcpConfig` | [VoiceCraft.Java](/ecosystem/voicecraft-java) |

您可以執行多個傳輸，但首次設定只開放所需傳輸時更容易調試。

### 4. 設定主機綁定

當一切都在一台機器上執行時使用本地綁定：

- `McHttpConfig.Hostname = http://127.0.0.1:9050/`
- `McWssConfig.Hostname = ws://127.0.0.1:9051/`
- `McTcpConfig.Hostname = 127.0.0.1`

僅當另一台電腦、容器或遊戲主機必須到達 VoiceCraft 時才使用 `0.0.0.0`。

### 5. 重啟伺服器

從同一資料夾再次啟動 `VoiceCraft.Server`。注意：

- 無效的 JSON 錯誤
- 連接埠已在使用錯誤
- 偵聽器失敗或綁定錯誤

繼續之前先修復這些問題。只要伺服器仍在報告啟動錯誤，Minecraft 附加包或外掛程式就無法可靠連線。

### 6. 連接 VoiceCraft 用戶端

從 [下載頁面](/download) 安裝客戶端，然後新增伺服器項目：

- 主機：VoiceCraft 伺服器位址
- 連接埠：`VoiceCraftConfig.Port`，通常為 `9050`

對於本地測試，請使用：

```text
127.0.0.1:9050
```

確保客戶端 `Positioning Type` 與 `VoiceCraftConfig.PositioningType` 相符。

### 7. 連接 Minecraft

繼續閱讀與您啟用的傳輸相符的指南：

- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [VoiceCraft.Java](/ecosystem/voicecraft-java)

當提示輸入令牌時，請使用 `ServerProperties.json` 中的符合傳輸令牌。

### 8. 驗證設定

第一次設定完成時：

- 伺服器日誌顯示沒有配置或偵聽器錯誤
- VoiceCraft 用戶端連接到 UDP 端點
- Minecraft 透過選定的傳輸方式進行身份驗證
- 遊戲內綁定流程有效
- VoiceCraft 收到玩家位置更新
- 距離感語音在預期範圍內工作

## 啟動參數

VoiceCraft 伺服器支援這些根參數：

- `--exit-on-invalid-properties`
  如果無法解析 `ServerProperties.json` 則退出。
- `--language <culture>`
  覆蓋目前執行的伺服器日誌語言。
- `--transport-mode <mode>`
  為目前執行啟用 Minecraft 傳輸的子集。
- `--transport-host <host>`
  覆蓋配置的 Minecraft 傳輸主機。
- `--transport-port <port>`
  覆蓋配置的 Minecraft 傳輸連接埠。
- `--server-key <token>`
  覆蓋目前執行的共享 Minecraft 端登入令牌。

程式碼中也存在短別名：

- `-eip`
- `-l`
- `-tm`
- `-th`
- `-tp`
- `-sk`

## 範例

### 使用啟動語言覆蓋執行

```bash
./VoiceCraft.Server --language en-US
```

### 如果配置無效則退出

```bash
./VoiceCraft.Server --exit-on-invalid-properties
```

### 僅針對 Java 橋接器運行 `McTcp`

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### 僅執行 `McHttp`

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### 覆蓋令牌而不編輯 JSON

```bash
./VoiceCraft.Server --server-key "replace-with-secure-token"
```

## 傳輸覆蓋的行為方式

執行時間覆蓋不會永久重寫 `ServerProperties.json`。

它們僅適用於目前流程，並且在以下情況下很有用：

- 從同一個映像執行多個環境
- 使用面板或 systemd 插件
- 測試直接與代理拓撲
- 讓另一個工具（例如 `VoiceCraft.Java`）使用產生的值啟動運行時

## 首次運行檢查表

1. 運行伺服器一次以產生 `config/ServerProperties.json`。
2. 在編輯產生的配置之前停止伺服器。
3. 更改所有產生的登入令牌。
4. 確認您實際需要哪種傳輸：
   - BDS 的 `McHttp`
   - `McWss` 用於本地世界
   - `McTcp` 用於 `VoiceCraft.Java`
5. 驗證主機綁定。
6. 僅開啟您需要的連接埠。
7. 從同一安裝資料夾重新啟動伺服器。
8. 與客戶端確認 `PositioningType`。
9. 在連接 Minecraft 自動化之前測試客戶端連線。
10. 連接 Minecraft 附加包或外掛程式並驗證綁定流程。

## 常見的首次運行錯誤

- 保持產生的令牌不變
- 將 `127.0.0.1` 端點暴露給遠端節點
- 忘記 Java 端橋可能需要 `McTcp`
- 在生產環境中啟用每種傳輸，即使並不需要
- 編輯 `ServerProperties.json` 而進程管理器立即重新啟動舊的損壞的配置
- 使用 Minecraft 指南期望傳輸端點的 UDP 用戶端端口

完整設定參考，請參閱 [ServerProperties.json](/server/server-properties)。
