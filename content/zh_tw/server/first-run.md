# 第一個伺服器運行

此頁面在您下載並啟動 `VoiceCraft.Server` 一次後啟動。目標是將首次啟動轉變為客戶端和 Minecraft 可以實際使用的工作伺服器。

## 第一次啟動時會發生什麼

啟動時，VoiceCraft 會在目前目錄和子目錄中尋找 `ServerProperties.json`。

如果找不到該文件，伺服器會自動建立：

- `config/`
- `config/ServerProperties.json`

該文件成為伺服器行為的主要持久事實來源。

文件出現後，停止伺服器，編輯配置，然後再次啟動。第一次啟動僅建立基線；設定尚未完成。

## 預設連接埠和端點

預設情況下，產生的配置是這樣對齊的：

- VoiceCraft UDP：`9050`
- `McHttp`：`http://127.0.0.1:9050/`
- `McWss`：`ws://127.0.0.1:9051/`
- `McTcp`：`127.0.0.1:9050`

注意事項：

- UDP 語音流量和某些傳輸預設值共用 `9050`
- `McWss` 預設在 `9051` 上分隔
- `McTcp` 與 `GeyserVoice` 特別相關

## 線性首次運行路徑

### 1.停止並開啟產生的config

打開：

```text
config/ServerProperties.json
```

將此檔案儲存在同一安裝資料夾中並將其包含在備份中。

### 2.替換生成的token

在任何插件、插件或播放器用戶端連接之前，替換：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

使用您稍後實際連接的傳輸中的令牌。例如，BDS `vcconnect` 指令必須使用 `McHttpConfig.LoginToken`，而 GeyserVoice 必須使用 `McTcpConfig.LoginToken`。

### 3. 選擇一種主要的 Minecraft 交通工具

使用拓撲來決定應啟用什麼：

| 設定 | 啟用 | 繼續 |
|-------|--------|---------------|
| 基岩專用伺服器 | `McHttpConfig` | [McHttp for BDS](/minecraft/mchttp-bds) |
| 當地基岩世界 | `McWssConfig` | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) |
| Java + Geyser/水閘 | `McTcpConfig` | [GeyserVoice](/ecosystem/geyservoice) |

您可以運行多個傳輸，但當僅公開所需的傳輸時，第一個設定更容易調試。

### 4. 設定主機綁定

當一切都在一台機器上運行時使用本地綁定：

- `McHttpConfig.Hostname = http://127.0.0.1:9050/`
- `McWssConfig.Hostname = ws://127.0.0.1:9051/`
- `McTcpConfig.Hostname = 127.0.0.1`

僅當另一台電腦、容器或遊戲主機必須到達 VoiceCraft 時才使用 `0.0.0.0`。

### 5. 重啟伺服器

從同一資料夾再次啟動 `VoiceCraft.Server`。注意：

- 無效的 JSON 錯誤
- 連接埠已在使用錯誤
- 偵聽器失敗或綁定錯誤

在繼續之前修復這些問題。當伺服器報告啟動錯誤時，Minecraft 外掛程式或外掛程式無法可靠連線。

### 6. 連接 VoiceCraft 用戶端

從 [Download Page](/download) 安裝客戶端，然後新增伺服器項目：

- 主機：VoiceCraft 伺服器位址
- 連接埠：`VoiceCraftConfig.Port`，通常為 `9050`

對於本地測試，請使用：

```text
127.0.0.1:9050
```

確保客戶端 `Positioning Type` 與 `VoiceCraftConfig.PositioningType` 相符。

### 7. 連結我的世界

繼續閱讀與您啟用的傳輸相符的指南：

- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [GeyserVoice](/ecosystem/geyservoice)

當提示輸入令牌時，請使用 `ServerProperties.json` 中的符合傳輸令牌。

### 8. 驗證設定

第一次設定完成時：

- 伺服器日誌顯示沒有配置或偵聽器錯誤
- VoiceCraft 用戶端連接到 UDP 端點
- Minecraft 透過選定的傳輸方式進行身份驗證
- 遊戲內綁定流程有效
- VoiceCraft 收到玩家位置更新
- 接近語音在預期範圍內工作

## 啟動參數

VoiceCraft 伺服器支援這些根參數：

- `--exit-on-invalid-properties`
  如果無法解析 `ServerProperties.json` 則退出。
- `--language <culture>`
  覆蓋目前運行的伺服器日誌語言。
- `--transport-mode <mode>`
  為目前運行啟用 Minecraft 傳輸的子集。
- `--transport-host <host>`
  覆蓋配置的 Minecraft 傳輸主機。
- `--transport-port <port>`
  覆蓋配置的 Minecraft 傳輸連接埠。
- `--server-key <token>`
  覆蓋目前運行的共享 Minecraft 端登入令牌。

程式碼中也存在短別名：

- `-eip`
- `-l`
- `-tm`
- `-th`
- `-tp`
- `-sk`

## 範例

### 使用啟動語言覆蓋運行

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

運行時覆蓋不會永久重寫 `ServerProperties.json`。

它們僅適用於當前流程，並且在以下情況下很有用：

- 從一個映像運行多個環境
- 使用面板或 systemd 插件
- 測試直接與代理拓撲
- 讓另一個工具（例如 `GeyserVoice`）使用產生的值啟動運行時

## 首次運行檢查表

1. 運行伺服器一次以產生 `config/ServerProperties.json`。
2. 在編輯產生的配置之前停止伺服器。
3. 更改所有產生的登入令牌。
4. 確認您實際需要哪種交通工具：
   - BDS 的 `McHttp`
   - `McWss` 用於本地世界
   - `McTcp` 用於 `GeyserVoice`
5. 驗證主機綁定。
6. 僅開啟您需要的連接埠。
7. 從同一安裝資料夾重新啟動伺服器。
8. 與您的客戶確認 `PositioningType`。
9. 在連接 Minecraft 自動化之前測試客戶端連線。
10. 連接 Minecraft 插件或插件並驗證綁定流。

## 常見的首次運行錯誤

- 保持產生的令牌不變
- 將 `127.0.0.1` 端點暴露給遠端節點
- 忘記 Java 端橋可能需要 `McTcp`
- 無需實際需要即可實現生產中的每種傳輸
- 編輯 `ServerProperties.json` 而進程管理器立即重新啟動舊的損壞的配置
- 使用 Minecraft 指南期望傳輸端點的 UDP 用戶端端口

完整設定參考，請參閱 [ServerProperties.json](/server/server-properties)。
