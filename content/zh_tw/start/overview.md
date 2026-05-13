# 概述

VoiceCraft 是適用於 Minecraft 基岩版和相關橋樑場景的近距離語音平台。

它允許玩家運行單獨的語音用戶端，而 Minecraft 端自動化告訴語音伺服器每個玩家在哪裡、他們位於哪個世界以及應應用哪些效果或可見性規則。

當您想要近距離語音而不依賴於一種確切的 Minecraft 伺服器形狀時，VoiceCraft 非常有用。相同的核心執行時間可以與 Bedrock 插件、Java/Geyser 橋接器或代理部署結合。

## 您正在設定什麼

大多數部署都有三個移動部分：

1. `VoiceCraft.Client`
   每個玩家安裝的桌面和行動應用程式
2. `VoiceCraft.Server`
   用於語音流量、狀態同步、審核和傳輸端點的獨立後端
3. 面向 Minecraft 的運輸
   `McHttp`、`McWss` 與 `McTcp`

生態系統整合將 Minecraft 連接到這些傳輸：

- `VoiceCraft.Addon` 適用於基岩世界和 BDS
- `GeyserVoice` 用於 Java / Geyser / 代理堆疊

## 它是如何運作的

1. 客戶端透過 UDP 連接到 `VoiceCraft.Server`。
2. 伺服器追蹤語音會話、實體、位置、世界 ID、效果位元遮罩和審核狀態。
3. Minecraft 端整合會更新伺服器的遊戲狀態：
   - BDS 的 `McHttp`
   - `McWss` 適用於本地基岩世界
   - `McTcp` 用於 `GeyserVoice`
4. 客戶端根據伺服器狀態和選定的本機設定呈現鄰近音訊。

語音連接和 Minecraft 傳輸連接是分開的。如果僅連接一側，設定可能看起來部分正常，但接近行為仍然不完整。

## 支援的客戶端平台

- Windows（`x86`、`x64`、`arm64`）
- Linux（`x64`、`arm32`、`arm64`）
- macOS（`x64`、`arm64`）
- Android (`arm64`)
- iOS（`arm64`、`.ipa`）

## 是什麼讓 VoiceCraft 變得靈活

- 多種 Minecraft 運輸工具
- 基岩插件 API 表面
- 透過 `GeyserVoice` 的 Java 端橋
- 可配置的效果和實體元數據
- 伺服器端和客戶端兩種定位模式

這種靈活性也意味著第一個決定很重要：首先選擇拓撲，然後遵循該傳輸的指南。

## 常見的拓樸選擇

| 如果你跑... | 從...開始 | 為什麼 |
|---------------|---------------|-----|
| 基岩專用伺服器 | [McHttp for BDS](/minecraft/mchttp-bds) | BDS可以呼叫穩定的HTTP端點 |
| 當地基岩世界 | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) | 透過本地 websocket/命令隧道流工作 |
| 帶有 Geyser/Floodgate 的 Java 伺服器 | [GeyserVoice](/ecosystem/geyservoice) | Java 端插件透過 `McTcp` 橋接至 VoiceCraft |
| Direct Paper伺服器 | [GeyserVoice Direct Paper](/ecosystem/geyservoice-direct-paper) | 插件可以使用外部伺服器或管理運行時 |

## 接下來讀什麼

- [Quick Start](/start/quick-start)
- [Download](/download)
- [Transport Modes](/server/transports)
- [System Architecture](/architecture/system-architecture)
- [Ecosystem Overview](/ecosystem/overview)
