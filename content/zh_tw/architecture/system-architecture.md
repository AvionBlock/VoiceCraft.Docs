# 系統架構

VoiceCraft 是近距離語音堆疊，而不是單一 Minecraft 模組。客戶端攜帶麥克風音頻，伺服器擁有語音會話和共享狀態，Minecraft 整合層告訴伺服器玩家在哪裡以及他們應該如何表示。

這種分離是有意為之的：只要連接了正確的面向 Minecraft 的傳輸，同一語音伺服器就可以與基岩專用伺服器、本地基岩世界、直接 Paper 伺服器和代理網路一起使用。

## 主要層

| 圖層 | 主要職責 | 典型安裝位置 |
|-------|---------------------|--------------------------|
| `VoiceCraft.Client` | 擷取麥克風輸入、傳送語音資料包、播放附近的聲音、儲存本機音訊首選項。 | 播放器設備 |
| `VoiceCraft.Server` | 接受語音用戶端、儲存實體狀態、應用審核標誌和音訊效果預設值、公開 Minecraft 傳輸。 | VPS、遊戲主機、本機 PC 或外掛程式管理的執行時間 |
| 我的世界集成 | 將玩家/實體位置和生命週期資料從 Minecraft 發送到 VoiceCraft。 | Bedrock 插件、Paper 插件或代理插件 |

### 客戶端層

`VoiceCraft.Client` 處理：

- 麥克風捕獲和預處理
- 一鍵通、靜音、聾、輸入/輸出裝置選擇
- 與 `VoiceCraft.Server` 的 UDP 連接
- 根據伺服器狀態播放附近的語音
- 本機每用戶音量和本機靜音首選項

在正常的伺服器端模型中，客戶端不會自行發現 Minecraft 玩家的位置。它依賴伺服器和 Minecraft 整合來提供實體和世界狀態。

### 伺服器層

`VoiceCraft.Server` 處理：

- VoiceCraft UDP 用戶端會話
- 網路實體狀態和綁定狀態
- 伺服器端審核標誌
- 效果位遮罩和音訊效果預設值
- 面向 Minecraft 的傳輸：`McHttp`、`McWss` 和 `McTcp`
- `config/ServerProperties.json` 中的持久性配置

伺服器是玩家客戶端和 Minecraft 端整合必須達成協議的共享運行時。如果用戶端已連接但 Minecraft 未連接，則玩家可能會顯示為沒有有用的世界位置資料的語音會話。

### Minecraft 整合層

這取決於拓撲：

- `VoiceCraft.Addon.Core.McHttp` 用於基岩專用伺服器
- `VoiceCraft.Addon.Core.McWss` 用於本地基岩世界和指令隧道設置
- `GeyserVoice` 適用於 Java、Geyser/Floodgate、Paper、Velocity 和 BungeeCord 拓樸

整合層負責將遊戲事件轉換為 VoiceCraft 狀態：玩家加入、玩家離開、位置更新、世界識別碼、綁定請求、虛假實體、效果變更和連線生命週期。

## 核心資料概念

VoiceCraft 圍繞實體而不僅僅是原始套接字。

實體攜帶狀態，例如：

- 姓名
- 標題
- 描述
- 位置
- 旋轉
- 世界ID
- 靜音/聾狀態
- 效果位掩碼

網路用戶端可以表示為實體，且 Minecraft 整合也可以建立或更新實體。此模型讓 VoiceCraft 透過相同的狀態管道描述真實玩家、虛假/顯示實體和自訂世界驅動的語音目標。

## 為什麼運輸是分開的

VoiceCraft 語音流量和 Minecraft 自動化並不總是存在於同一環境中。

這就是為什麼：

- 玩家客戶端與核心UDP語音伺服器對話
- Bedrock 或 Java 整合透過 Minecraft 傳輸進行對話
- 每個傳輸可以有自己的令牌、主機綁定和最大客戶端限制

這種分離可以讓您在更改 Minecraft 整合的同時保持語音伺服器的穩定。例如，僅基岩部署可以使用 `McHttp`，而 Java/Geyser 網路可以保留相同的核心語音伺服器，但將 Minecraft 端切換到 `McTcp`。

## 典型連接形狀

### 基岩專用伺服器

```text
VoiceCraft.Client -> VoiceCraft UDP server
BDS + VoiceCraft.Addon.Core.McHttp -> McHttp endpoint
```

當 Bedrock 伺服器可以到達 `VoiceCraft.Server` 公開的 HTTP 端點時使用此選項。

### 當地基岩世界

```text
VoiceCraft.Client -> VoiceCraft UDP server
Minecraft local world + Core.McWss -> McWss websocket endpoint
```

將此用於本地測試或可以接受命令隧道的單人遊戲世界。

### Java + Geyser/水閘

```text
VoiceCraft.Client -> VoiceCraft UDP server
GeyserVoice -> McTcp endpoint
```

當 Java 端基礎架構是玩家位置和生命週期狀態的來源時，請使用此選項。

## 首先要配置什麼

1. 配置 `VoiceCraft.Server` 並確認其正常啟動。
2. 選擇與拓撲相符的 Minecraft 傳輸。
3. 確保客戶端連接到 `VoiceCraftConfig.Port`。
4. 確保 Minecraft 整合使用匹配的傳輸令牌進行身份驗證。
5. 在新增更多自訂行為之前驗證綁定流和位置更新。
