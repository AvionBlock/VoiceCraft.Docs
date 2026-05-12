# 安全強化

本頁是關於降低實際部署中的操作風險的。

## 1. 輪換每個產生的令牌

切勿保留下列項目的預設生成值：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

將它們視為共享秘密。

## 2. 僅公開所需的傳輸

不要僅僅因為每種傳輸方式存在就將其發布。

範例：

- 僅基岩主機：
  usually only `McHttp`
- Java橋接主機：
  usually only `McTcp`
- 本機測試主機：
  often only loopback `McWss`

## 3. 盡可能使用環回

更喜歡：

- `127.0.0.1`
- `localhost`

當消費者在同一台機器上時。

Use `0.0.0.0` only when remote access is actually required.

## 4.嚴格的防火牆策略

僅允許您需要的內容：

- VoiceCraft UDP 端口
- 特定的 HTTP 或 TCP 傳輸連接埠
- 可選的網路套接字端口

如果整合節點已知且固定，則不要廣泛開啟傳輸連接埠。

## 5. 獨立的環境

使用不同：

- 代幣
- 設定檔
- 目錄
- 連接埠

用於生產、登台和本地測試。

## 6. 小心外掛程式管理的運行時

If `GeyserVoice` manages the VoiceCraft runtime:

- 控制安裝目錄
- 了解誰擁有重啟行為
- 確認日誌收集在可預測的地方

## 7. Avoid casual use of `DisabledPacketTypes`

這不是正常的強化功能。

它主要用於：

- 偵錯
- 暫時緩解
- 協議實驗

盲目禁用資料包類型可能會破壞身份驗證、同步或音訊。

## 8.限制操作命令

For `GeyserVoice`, keep these staff-only:

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

## 9. 保護備份內容

備份可能包含：

- 傳輸 token
- 主機和連接埠拓撲
- 服務佈局細節

將配置備份視為敏感作業資料。
