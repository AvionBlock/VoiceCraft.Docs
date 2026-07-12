# ServerProperties.json

主設定檔：`config/ServerProperties.json`。

VoiceCraft `1.7.0` 保留原有 transport sections，但加入 NAT port mapping，並使用 entity properties 進行效果自訂。

## 編輯流程

1. 停止伺服器。
2. 備份 `ServerProperties.json`。
3. 編輯並驗證 JSON。
4. 啟動伺服器。
5. 檢查 config/listener/NAT/auth 日誌。

## 新欄位

`VoiceCraftConfig`、`McHttpConfig`、`McTcpConfig`、`McWssConfig` 中新增：

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` 會透過 `OpenPort.Net` 嘗試建立暫時 router mapping。

## VoiceCraftConfig

- `Port`：用戶端使用的 UDP port。
- `ExternalPort`：外部映射連接埠，`0` 使用 `Port`。
- `PositioningType`：`0 = Server`，`1 = Client`。
- `EnableVisibilityDisplay`：是否向用戶端傳送 visibility indicators。
- `AutoOpenPort`：自動開啟 UDP port。

## McHttpConfig

BDS 常用設定：

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "AutoOpenPort": false
}
```

僅當 BDS 和 VoiceCraft 在同一主機時使用 `127.0.0.1`。

## McTcpConfig

用於 `VoiceCraft.Java` 等 Java bridges。`Hostname` 是 host，不是 URI；`Port` 是獨立欄位。

## McWssConfig

用於本地 Bedrock world 和 command tunnel。重點檢查 `DataTunnelCommand`、`CommandsPerTick`、`MaxByteLengthPerCommand`。

## DefaultAudioEffectsConfig

- `1`：`Visibility`
- `2`：`Proximity`
- `4`：`ProximityEcho`
- `8`：`ProximityMuffle`

在 `1.7.0` 中，effect 會為每個 entity 建立 processor，並可讀取受支援的 entity properties 覆蓋參數。

## 注意

- 始終替換 `LoginToken`
- `0.0.0.0` 會暴露 listener
- `PositioningType` 必須與用戶端匹配
- 升級前保留可用設定
