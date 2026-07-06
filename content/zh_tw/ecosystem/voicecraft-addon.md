# VoiceCraft.Addon（Bedrock外掛程式）

儲存庫：[AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

該儲存庫包含實用的 Bedrock 插件包和用於自訂世界邏輯的腳本端 McApi 介面。

當 Minecraft Bedrock 是玩家/實體狀態的來源時使用它。該插件透過 `McHttp` 或 `McWss` 將 Bedrock 世界連接到 VoiceCraft 伺服器，然後公開世界腳本的綁定流程、UI、事件和資料包幫助程式。

快速連結：

- [下載頁面](/download)
- [附加包設定器](/addon-configurator)
- [Addon Releases](https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest)

## 套餐

| 套餐 | 目的 | 使用時 |
|---------|---------|----------|
| `Basic` | 即用型綁定流程、設定 UI、遊戲內語音指示器、常見腳本事件 | 您需要工作參考或預設 Bedrock 行為 |
| `Core.McHttp` | HTTP傳輸包 | 您運行Bedrock 專用伺服器 |
| `Core.McWss` | websocket / 指令隧道傳輸包 | 您運行本地 Bedrock 世界或測試設置 |

大多數真實的Bedrock設定將傳輸包與世界所需的行為/UI 部分結合。

## 版本對齊

VoiceCraft `v1.6.1` 需要更新插件包以及用戶端/伺服器版本。此版本包括遊戲內語音圖標、自動連接生活品質、廣播事件以及依賴匹配插件端包的 McHttp/McWss 斷開連接修復。

不要升級伺服器/客戶端並留下舊的插件包。不匹配的包可以連接，但稍後會在綁定、事件或圖標行為期間失敗。

## 命名空間

跨包：

- `VoiceCraft.Namespace = "voicecraft"`

## 命令

### 基本

- `voicecraft:vcbind <binding_key>`
  權限：`Any`
- `voicecraft:vcsettings`
  權限：`GameDirectors`

### 核心.McHttp

- `voicecraft:vcconnect <hostname> <token>`
  權限：`GameDirectors`
- `voicecraft:vcconnect_raw <ip> <port> <token>`
  權限：`GameDirectors`

### 核心.McWss

- `voicecraft:vcconnect <token>`
  權限：`Host`
- `voicecraft:vcconnect_raw <ip> <port> <token>`
  權限：`GameDirectors`
- `voicecraft:data_tunnel [max_string_length] [data]`
  權限：`Host`

## `vcconnect_raw`

`voicecraft:vcconnect_raw` 是插件自動連線流程使用的底層連線指令。它不接收完整的 hostname 字串，而是分別接收位址、連接埠和令牌。

```text
/voicecraft:vcconnect_raw "<IP_OR_HOST>" <PORT> "<LOGIN_TOKEN>"
```

此指令會檢查 `PORT` 是否在 `1` 到 `65535` 之間，並且只在目前傳輸已斷線時啟動新連線。

對於 `Core.McHttp`，指令會在內部組出 `http://<ip>:<port>`，再使用傳入的令牌連線。對於 `Core.McWss`，它會將 `ip`、`port` 和令牌直接傳給 websocket 傳輸。

預設 `Basic` 包會從 auto-connect 設定呼叫它：

```text
vcconnect_raw "<autoConnect:ip>" <autoConnect:port> "<autoConnect:loginKey>"
```

手動設定時通常使用上面的普通指令。只有在編寫自動連線腳本，或把 host 與 port 分開存入世界 dynamic properties 時，才使用 `vcconnect_raw`。

## 基本套餐為您提供什麼

- 綁定/解除綁定流程
- 玩家設定介面
- 效果切換
- 用於自動化的腳本事件
- 支援版本使用的遊戲內指標

如果您想在編寫自訂插件邏輯之前了解預期的玩家體驗，請從 `Basic` 開始。

## 綁定流程詳細信息

從目前的實施來看：

1. 新的網路實體收到隨機的 5 個字元的綁定密鑰
2. 實體描述隨按鍵提示更新
3. 玩家運行 `voicecraft:vcbind <key>`
4. 實體綁定到玩家
5. 休假時，會發生解除綁定並產生新密鑰

腳本事件：

- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`

VoiceCraft `v1.6.1` 也廣播更多插件端生命週期和資料包事件，因此自訂世界可以做出反應，而無需直接輪詢傳輸層。

綁定鍵故意很短，因為它是在遊戲中輸入的。將其視為臨時連結令牌，而不是長期秘密。

## 效果介面

`voicecraft:vcsettings` 目前公開：

- 可見性
- 距離感
- 定向
- 距離感回聲
- 迴音
- 距離感悶音
- 悶音

效果透過 `McApiSetEffectRequestPacket` 發送。

## 您可以客製化什麼

- 綁定/解除綁定策略
- 基於角色或標籤的限制
- 世界ID規則
- 位置/旋轉更新行為
- 員工表格透過 `@minecraft/server-ui`
- McApi 表面周圍的資料包處理程序

僅在基本預設設定生效後進行自訂。這為您提供了傳輸、綁定和位置行為的已知良好基準。

## 目前的限制

- `Core.McWss` 穩定性取決於指令和有效負載限制
- 主機/供應商限制可能會阻止 `Core.McHttp` 所需的網路路徑
- 自訂資料包處理程序需要在目標 Bedrock 版本上進行測試

## 建議設定：BDS

1. 啟用 `McHttpConfig.Enabled = true`
2. 確保BDS可以達到`McHttpConfig.Hostname`
3. 複製 `Core.McHttp` 包
4. 運行 `voicecraft:vcconnect <hostname> <token>`
5. 使用 `voicecraft:vcbind <key>` 驗證綁定

## 推薦設定：本地世界

1. 啟用 `McWss`
2. 安裝 `Core.McWss`
3. 運行 `/connect`
4. 運行 `voicecraft:vcconnect <token>`
5. 保持 `voicecraft:data_tunnel` 與伺服器配置保持一致

## 驗證清單

- 安裝了正確的傳輸包
- 行為包和資源包均處於活動狀態
- `vcconnect` 使用符合伺服器設定部分中的令牌
- 玩家可以與 `voicecraft:vcbind <key>` 綁定
- 玩家移動會改變 VoiceCraft 中的位置數據
- 效果 UI 向授權使用者開放

## 閱讀下一篇

- [Addon API](/ecosystem/addon-api)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
