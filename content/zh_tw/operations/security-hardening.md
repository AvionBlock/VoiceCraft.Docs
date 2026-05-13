# 安全加固

本頁是關於降低實際部署中的操作風險的。

VoiceCraft 安全性主要是限制誰可以到達傳輸端點、保護共享令牌以及讓普通玩家遠離僅限員工的操作控制。

## 1.輪換每個生成的token

切勿保留下列項目的預設生成值：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

將它們視為共享秘密。

僅將令牌與匹配的整合一起使用：

- BDS 的 `McHttpConfig.LoginToken` `McHttp`
- `McWssConfig.LoginToken` 適用於當地基岩 `McWss`
- `McTcpConfig.LoginToken` 用於 GeyserVoice / Java 橋

## 2.僅公開所需的傳輸

不要僅僅因為每種傳輸方式存在就將其發布。

範例：

- 僅基岩主機：
  通常只有 `McHttp`
- Java橋接主機：
  通常只有 `McTcp`
- 本機測試主機：
  通常只環回 `McWss`

## 3. 盡可能使用環回

更喜歡：

- `127.0.0.1`
- `localhost`

當消費者在同一台機器上時。

僅在實際需要遠端存取時才使用 `0.0.0.0`。

## 4.嚴格的防火牆政策

僅允許您需要的內容：

- VoiceCraft UDP 端口
- 特定 HTTP 或 TCP 傳輸連接埠
- 可選的 websocket 端口

如果整合節點已知且固定，則不要廣泛開啟傳輸連接埠。

請記住，客戶端 UDP 端點和 Minecraft 傳輸端點服務於不同的使用者。玩家需要語音 UDP 端點。插件/插件需要選定的 Minecraft 傳輸端點。

## 5. 獨立的環境

使用不同：

- 代幣
- 設定檔
- 目錄
- 連接埠

用於生產、登台和本地測試。

## 6. 小心插件管理的運行時

若 `GeyserVoice` 管理 VoiceCraft 執行時間：

- 控制安裝目錄
- 了解誰擁有重啟行為
- 確認日誌收集在可預測的地方
- 確保產生的運行時檔案不可被不受信任的使用者寫入
- 了解重新啟動過程中是否需要 `shutdown-on-disable`

## 7.避免隨意使用`DisabledPacketTypes`

這不是正常的強化功能。

它主要用於：

- 偵錯
- 暫時緩解
- 協議實驗

盲目禁用資料包類型可能會破壞身份驗證、同步或音訊。

## 8. 限制操作命令

對於 `GeyserVoice`，僅保留這些人員：

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

對於 VoiceCraft 伺服器控制台，僅將存取權限限制為受信任的操作員。 `kick`、`mute`、`deafen` 等指令和元資料編輯可能會影響即時播放器。

## 9. 保護備份內容

備份可能包含：

- 運輸代幣
- 主機和連接埠拓撲
- 服務佈局細節

將配置備份視為敏感作業資料。

## 10.審查公共支援工件

在公開發布螢幕截圖、日誌或配置之前，請刪除：

- 傳輸登入令牌
- 公有 IP（如果不應公開）
- 服務包裝秘密
- 產生的綁定鍵（如果它們仍然處於活動狀態）
- 如果隱私很重要，則玩家識別符

## 強化檢查表

- 產生的令牌被替換
- 僅啟用所需的傳輸
- 用於同主機消費者的環回
- 防火牆規則盡可能限於已知來源
- GeyserVoice 操作指令受限
- 安全儲存備份
- 發行版和插件/插件版本保持一致
