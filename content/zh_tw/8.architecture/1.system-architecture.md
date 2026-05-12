# 系統架構

本頁解釋了 VoiceCraft 的主要部分以及它們之間的關係。

## 主要層

### 客戶端層

`VoiceCraft.Client` handles:

- 輸入捕獲
- 預處理
- UDP 傳輸到 VoiceCraft
- 播放和本地每用戶偏好

### 伺服器層

`VoiceCraft.Server` handles:

- 網路實體狀態
- 語音客戶端會話
- 適度標誌
- 效果位遮罩和音訊效果預設值
- 面向 Minecraft 的傳輸

### Minecraft 整合層

這取決於拓撲：

- `VoiceCraft.Addon` for Bedrock
- `GeyserVoice` for Java / Geyser / proxy networks

## 核心資料概念

VoiceCraft 圍繞實體而不僅僅是原始套接字。

實體攜帶狀態，例如：

- 姓名
- 標題
- 描述
- 位置
- 旋轉
- 世界ID
- 靜音/失聰狀態
- 效果位元遮罩

## 為什麼傳輸是分開的

VoiceCraft 語音流量和 Minecraft 自動化並不總是存在於同一環境中。

這就是為什麼：

- 客戶端與核心語音伺服器對話
- Bedrock 或 Java 整合透過傳輸層進行對話

這種分離保持了核心平台的靈活性。
