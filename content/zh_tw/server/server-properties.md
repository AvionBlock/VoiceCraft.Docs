# 伺服器屬性.json

主伺服器設定檔：`config/ServerProperties.json`。

該文件是在第一個伺服器啟動後創建的，並成為伺服器的持久事實來源。在編輯伺服器之前停止伺服器，除非您的進程管理器設計為安全地重新載入配置。

當您需要了解欄位控制什麼以及哪些欄位必須與用戶端、外掛程式或外掛程式相符時，請使用此頁面。

## 編輯工作流程

1. 停止 `VoiceCraft.Server`。
2. 備份 `config/ServerProperties.json`。
3. 編輯相關部分。
4. 驗證 JSON 語法。
5. 再次啟動伺服器。
6. 觀察日誌中的設定解析、偵聽器或驗證錯誤。
7. 重新連接客戶端和 Minecraft 傳輸。

最重要的首次編輯是傳輸登入令牌和主機綁定。

## 完整範例

```json
{
  "TelemetryEnabled": true,
  "TelemetryToken": "replace-with-stable-random-token",
  "VoiceCraftConfig": {
    "Language": "en-US",
    "Port": 9050,
    "MaxClients": 100,
    "Motd": "VoiceCraft Proximity Chat!",
    "PositioningType": 0,
    "EnableVisibilityDisplay": true
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "http://127.0.0.1:9050/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "McTcpConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "127.0.0.1",
    "Port": 9050,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "DefaultAudioEffectsConfig": {
    "1": { "EffectType": 1 },
    "2": { "WetDry": 1, "MinRange": 0, "MaxRange": 30, "EffectType": 2 },
    "4": { "WetDry": 1, "Delay": 0.5, "Range": 30, "EffectType": 4 },
    "8": { "WetDry": 1, "EffectType": 6 }
  }
}
```

## 遙測

- `TelemetryEnabled`：
  啟用來自 `VoiceCraft.Server` 的匿名啟動、心跳和崩潰診斷。
- `TelemetryToken`：
  用於對來自一台伺服器安裝的遙測事件進行分組的穩定假名指紋。

遙測幫助維護人員了解運行時健康狀況和版本採用。它不應該被用作您自己的監控替代品；為生產伺服器保留本地日誌和進程監控。

如果您不需要遙測，請設定：

```json
{
  "TelemetryEnabled": false
}
```

## VoiceCraft配置

- `Language`：
  伺服器日誌語言。
- `Port`：
  VoiceCraft 核心伺服器的 UDP 連接埠。
- `MaxClients`：
  VoiceCraft 用戶端最大連線數。
- `Motd`：
  ping / info 回應傳回的文字。
- `PositioningType`：
  定位方式：
  - `0 = Server`
  - `1 = Client`
- `EnableVisibilityDisplay`：
  是否將可見性指標傳送給客戶端。

`Port` 是玩家客戶端在 VoiceCraft 用戶端 UI 中新增的端點。即使預設重複使用 `9050`，它也不會自動與每個 Minecraft 傳輸端點相同。

`PositioningType` 必須與客戶端設定相符。在大多數 BDS 和 GeyserVoice 設定中，以 `0 = Server` 開頭。

## 麥克WSS配置

用於 websocket / 指令隧道基岩流。

- `Enabled`：
  啟用或停用 McWss。
- `LoginToken`：
  共用身分驗證令牌，通常與 `/voicecraft:vcconnect <token>` 一起使用。
- `Hostname`：
  websocket 主機，例如 `ws://0.0.0.0:9051/`。
- `MaxClients`：
  最大 McWss 客戶端數。
- `MaxTimeoutMs`：
  不活動超時。
- `DataTunnelCommand`：
  用於資料隧道的指令名稱，通常為 `voicecraft:data_tunnel`。
- `CommandsPerTick`：
  每個時脈週期轉送多少個命令資料包。
- `MaxByteLengthPerCommand`：
  每個命令調用的有效負載預算（位元組）。
- `DisabledPacketTypes`：
  此傳輸上封鎖的資料包類型。

使用 `McWss` 進行本地世界和測試。命令隧道依賴`DataTunnelCommand`；僅在一側更改它會破壞傳輸。

## 麥克HTTP配置

用於基岩專用伺服器和基於 HTTP 的整合。

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

典型的BDS綁定：

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "MaxClients": 10,
  "MaxTimeoutMs": 10000,
  "DisabledPacketTypes": []
}
```

當 BDS 可以到達 VoiceCraft HTTP 端點時，請使用 `McHttp`。如果 BDS 和 VoiceCraft 在不同的電腦上執行，從 BDS 的角度來看 `127.0.0.1` 將指向錯誤的主機。

## McTcp配置

由 Java 端橋使用，尤其是 `GeyserVoice`。

- `Enabled`：
  啟用或停用 McTcp。
- `LoginToken`：
  TCP 橋的共用身分驗證令牌。
- `Hostname`：
  綁定主機名，例如 `127.0.0.1` 或 `0.0.0.0`。
- `Port`：
  TCP 監聽連接埠。
- `MaxClients`：
  最大的運輸客戶。
- `MaxTimeoutMs`：
  不活動超時。
- `DisabledPacketTypes`：
  此傳輸上封鎖的資料包類型。

與 `McHttp` / `McWss` 比較的重要差異：

- `Hostname` 是一個普通主機，而不是 URI
- `Port` 是一個單獨的字段
- 這是與 `GeyserVoice` 最相關的傳輸

當 Java 端外掛程式或代理程式擁有 Minecraft 狀態路徑時，請使用 `McTcp`。 `GeyserVoice` `config.voicecraft.transport.host`、`config.voicecraft.transport.port` 和 `config.voicecraft.transport.login-token` 值必須與此部分相符。

## 預設音訊效果配置

字典鍵是 `ushort` 位元掩碼，值是效果 JSON 物件。

預設矩陣：

- `1`：
  `Visibility`
- `2`：
  `Proximity`
- `4`：
  `ProximityEcho`
- `8`：
  `ProximityMuffle`

您可以覆寫或擴充字典以變更新實體的預設效果行為。

僅當您了解效果管道時才更改這些。對於大多數部署，請在變更預設效果之前驗證基本綁定和接近行為。

## 停用資料包類型

每個傳輸都支援 `DisabledPacketTypes`。

小心使用這個：

- 它用於調試、相容性實驗或緊急緩解
- 停用核心資料包可能會破壞登入、實體同步或音訊傳輸
- 除非您了解資料包流，否則不要在生產中更改此設置

如果傳輸僅在停用資料包類型後才起作用，請將其視為相容性解決方法並記錄為什麼需要它。

## 實際生產模式

### 基岩專用伺服器

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` 除非您也執行 Java 端橋

### 本地世界/單人遊戲

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` 或可選

### GeyserVoice / Java 橋

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` 或可選
- `McWssConfig.Enabled = false` 除非其他地方也需要

## 最小拓撲範例

### 僅北斗系統

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/"
  },
  "McWssConfig": {
    "Enabled": false
  },
  "McTcpConfig": {
    "Enabled": false
  }
}
```

### 僅 Java 橋

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  },
  "McHttpConfig": {
    "Enabled": false
  },
  "McWssConfig": {
    "Enabled": false
  }
}
```

## 重要提示

- 始終替換產生的 `LoginToken` 值
- 使用 `Hostname: http://0.0.0.0:9050/`，HTTP 偵聽器綁定到通配符位址
- 使用 `McTcpConfig.Hostname = 0.0.0.0`，TCP 橋變得可遠端存取
- 使 `PositioningType` 與客戶端配置保持一致
- 升級前保留最後一次已知良好配置的副本
- 僅當您的流程管理器一致地傳遞它們時才使用運行時覆蓋

另請參閱：

- [Runtime Overrides](/server/runtime-overrides)
- [Transport Modes](/server/transports)
