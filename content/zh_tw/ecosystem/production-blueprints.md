# 生產藍圖

本頁總結了合理的生產方法，而不是原始功能清單。

當您決定要標準化的拓撲時，請使用這些藍圖。他們故意固執己見：目標是減少移動部件，而不是一次暴露所有可能的傳輸。

## 藍圖 1：Bedrock 專用伺服器

用途：

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

為什麼：

- 最乾淨穩定的Bedrock部署
- 最容易監控
- 最容易向服務生解釋

推薦形狀：

```text
BDS addon -> McHttp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

保持 `McWss` 和 `McTcp` 處於停用狀態，除非您有特定原因要執行它們。

## 藍圖 2：本地社區/有 Geyser 的 SMP

用途：

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` Direct Paper 模式

可選：

- 如果您喜歡單一 Java 端安裝流程，請讓 GeyserVoice 管理 VoiceCraft 執行時

推薦形狀：

```text
Paper/Folia + GeyserVoice -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

當一個 Java 端伺服器是玩家位置的主要權威時，這是一個很好的選擇。

## 藍圖 3：大型 Java 網路

用途：

- 外部 `VoiceCraft.Server`
- `McTcp`
- 代理程式上的 `GeyserVoice`
- 後端節點上的 `GeyserVoice`

為什麼：

- 中央控制
- 更乾淨的結垢
- 更輕鬆地重新啟動，無需觸及每個後端

推薦形狀：

```text
backend Paper nodes -> proxy relay -> proxy GeyserVoice -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

將代理保留為唯一的 VoiceCraft 連線擁有者。後端節點應該會產生快照，而不是競爭主 `McTcp` 連線。

## 藍圖 4：建構器/測試環境

用途：

- `McWss`
- `Core.McWss`
- 本地 VoiceCraft 實例

為什麼：

- 快速本地循環
- 適合測試插件自動化

推薦形狀：

```text
local Bedrock world -> McWss -> local VoiceCraft.Server
local client -> local VoiceCraft UDP endpoint
```

不要將此視為公共Bedrock伺服器的預設生產設計。當世界變得長時間運作或共享時，移至 `McHttp`。

## 選擇藍圖

| 需要 | 選擇 |
|------|--------|
| 穩定的Bedrock產量 | 藍圖1 |
| 一台 Java/Geyser 伺服器 | 藍圖2 |
| 速度/高空彈跳網絡 | 藍圖3 |
| 本地測試或外掛程式開發 | 藍圖4 |

## 操作建議

- 盡可能將 VoiceCraft 日誌與遊戲日誌分開存儲
- 在大型升級之前輪換或存檔配置
- 保持傳輸令牌的秘密
- 每次拓撲更改後測試綁定流程
- 僅公開所選藍圖所需的傳輸
- 在更改連接埠或令牌之前保留 `ServerProperties.json` 的回溯副本
- 記錄您的環境中哪個服務擁有 VoiceCraft 進程
