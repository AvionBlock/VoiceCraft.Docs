# GeyserVoice 代理指南

當您使用一台或多台後端 Paper 伺服器執行 Velocity 或 BungeeCord 時，請使用此模式。

## 代理模式如何運作

- 後端 Paper 伺服器將玩家快照傳送到代理
- the proxy owns the VoiceCraft-side `McTcp` connection
- 世界 ID 和維度可以使用後端身分命名

這允許為多伺服器網路提供一個中央語音橋。

## 部署模式

安裝 GeyserVoice：

- 在代理上
- 在每個後端 Paper 伺服器上

## 核心規則

代理是 VoiceCraft 連結的真實來源。

後端 Paper 伺服器應被視為快照生產者，而不是主要的橋所有者。

## 後端 Paper 配置

在後端 Paper 伺服器上：

- 為Paper端節點啟用代理模式
- 不要將後端主機/連接埠/金鑰視為事實來源

## 代理配置

在代理上：

- set the real `host`
- set the real `port`
- set the real `login-token`

## 設定流程

1. 在代理程式和後端節點上安裝插件。
2. 啟動一次一切以產生配置。
3. 使用真實的 VoiceCraft 連線配置代理程式。
4. 設定後端節點的代理中繼行為。
5.重新載入插件。
6. 驗證跨伺服器移動和綁定流。

## 驗證清單

- 玩家加入後端
- 後端正確發送快照
- 代理保持連線到 VoiceCraft
- 切換後端伺服器保留預期的語音身份

## 失敗模式

- 後端嘗試擁有主連接
- proxy token differs from VoiceCraft `McTcpConfig.LoginToken`
- 代理可以到達 Paper，但不能到達 VoiceCraft
- 後端拓撲隱藏或重寫插件訊息
