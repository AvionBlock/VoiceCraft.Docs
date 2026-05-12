# 插件 API

`VoiceCraft.Addon` exposes a script-driven McApi layer that is much wider than just `vcbind`.

此頁面針對插件和世界開發者。

## 進階 API 介面

插件端 API 公開：

- 連結生命週期
- 資料包發送/接收
- 實體的創建和銷毀
- 世界 ID、位置、旋轉、靜音、失聰和位元遮罩更新
- 效果更新
- 音訊接收事件

## 高階活動

從目前的API層來看：

- `OnConnected`
- `OnDisconnected`
- `OnPlayerBind`
- `OnPlayerUnbind`
- `OnPacket`

VoiceCraft `v1.6.1` expands this event-driven path with broadcasted events used by the addon packages, so world scripts can react to connection, binding, and packet activity without custom polling.

系統使用的腳本事件包括：

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

## 封包級覆蓋

目前暴露的資料包事件包括以下類別：

- 登入/登出/ping
- 接受/拒絕/重置回應
- 實體建立/銷毀
- 標題/描述/名稱更新
- 靜音/失聰/伺服器靜音/伺服器失聰
- 說話/聽/效果位掩碼
- 位置/旋轉/世界ID
- 洞穴係數/消音係數
- 效果更新
- 收到音訊

這使得插件 API 不僅對普通世界有用，而且對自訂遊戲模式也有用。

## 常見的客製化思路

- 按團隊、角色或標籤自動綁定
- 自訂綁定UI
- 每個生物群落或區域的自訂效果預設
- 基於區域的世界 ID 重新映射
- 透過伺服器 UI 表單的員工審核工具
- 腳本化的 NPC 或假實體語音邏輯

## 基本整合模型

典型的插件邏輯：

1. 連接到 VoiceCraft 傳輸
2. 驗證
3. 建立或發現實體
4.綁定玩家
5. 在刻度或事件上更新世界 ID/位置/旋轉
6. 對資料包級更新做出反應

## 重要的實作說明

- `McWss` mode depends on command tunnel throughput
- 效果切換透過位元遮罩進行編碼
- 資料包級自動化應在真實的基岩版本上仔細測試
- 當依賴廣播事件或遊戲內語音圖示時，保持插件包與 VoiceCraft 版本保持一致

## 推薦做法

- start from `Basic` if you need a working reference
- switch to `Core.McHttp` or `Core.McWss` when building a custom experience
- 首先保持你的世界自動化精簡，然後逐漸擴展資料包掛鉤
