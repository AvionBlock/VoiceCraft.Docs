# 生產藍圖

本頁總結了合理的生產方法，而不是原始功能清單。

## 藍圖 1：基岩專用伺服器

用途：

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

為什麼：

- 最乾淨穩定的基岩部署
- 最容易監控
- 最容易向服務生解釋

## 藍圖 2：當地社區/有 Geyser 的 SMP

用途：

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` direct Paper mode

可選：

- 如果您喜歡單一 Java 端安裝流程，請讓 GeyserVoice 管理 VoiceCraft 執行時

## 藍圖 3：大型 Java 網絡

用途：

- external `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` on proxy
- `GeyserVoice` on backend nodes

為什麼：

- 中央控制
- 更乾淨的縮放
- 更輕鬆地重新啟動，無需觸及每個後端

## 藍圖 4：建構器/測試環境

用途：

- `McWss`
- `Core.McWss`
- 本機 VoiceCraft 實例

為什麼：

- 快速本地循環
- 適合測試插件自動化

## 操作建議

- 盡可能將 VoiceCraft 日誌與遊戲日誌分開存儲
- 在大規模升級之前輪換或存檔配置
- 保持傳輸 token的秘密
- 每次拓撲變更後測試綁定流
