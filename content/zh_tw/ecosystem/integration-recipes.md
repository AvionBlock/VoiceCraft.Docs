# 整合食譜

這些是最常見 VoiceCraft 場景的實用部署模式。

在了解基本元件並需要具體的拓撲方案後，請使用此頁面。每個場景都列出了堆疊、選擇它的主要原因、最重要的配置以及證明其有效的驗證點。

## 場景 A：Bedrock 專用伺服器

堆疊：

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft 用戶端

在以下情況下選擇此選項：

- BDS是主要的遊戲伺服器
- BDS 可以到達 VoiceCraft HTTP 端點
- 您想要最穩定的Bedrock生產路徑

推薦配置：

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` 除非也要

流程：

1. 部署 `VoiceCraft.Server`
2. 安全性 `McHttpConfig.LoginToken`
3. 確保BDS可以達到`McHttpConfig.Hostname`
4. 安裝 `Core.McHttp`
5. 運行 `voicecraft:vcconnect <hostname> <token>`
6. 驗證 `voicecraft:vcbind <key>`
7. 連接客戶端並確認距離會隨著移動而變化

## 場景 B：本地/單人 Bedrock 世界

堆疊：

- 本地 VoiceCraft 堆疊
- `VoiceCraft.Addon.Core.McWss`

在以下情況下選擇此選項：

- 您正在本地測試
- 你沒有運行BDS
- `/connect` websocket 流可用

流程：

1. 啟用 `McWss`
2. 保留 `DataTunnelCommand = voicecraft:data_tunnel`
3. 安裝 `Core.McWss`
4. 使用 `/connect`
5. 運行 `voicecraft:vcconnect <token>`
6. 驗證綁定和移動

## 場景 C：使用 GeyserVoice 管理的運行時直接提交論文

堆疊：

- Paper/Folia
- `GeyserVoice`
- 外掛程式管理的 VoiceCraft 執行時

在以下情況下選擇此選項：

- 一台 Paper/Folia 伺服器應擁有語音集成
- 您需要更少的外部服務
- GeyserVoice 應該下載並啟動 VoiceCraft

流程：

1. 安裝 `GeyserVoice`
2. 設定 `config.proxy.enabled = false`
3. 配置 `config.voicecraft.transport.login-token`
4. 啟用 `config.voicecraft.auto-start`
5. 重新載入並驗證綁定流程

當您希望外掛程式在背景執行 VoiceCraft 時，這是最簡單的 Java 端設定。

## 場景 D：使用外部 VoiceCraft Direct Paper

堆疊：

- Paper/Folia
- `GeyserVoice`
- 外部管理 `VoiceCraft.Server`

在以下情況下選擇此選項：

- 您已經使用 systemd、Docker 或面板運行 VoiceCraft
- 多個組件可能需要相同的後端
- 您需要外部日誌和重新啟動策略

流程：

1. 在 VoiceCraft 上啟用 `McTcp`
2. 在 GeyserVoice 設定 `config.voicecraft.transport.host`、`config.voicecraft.transport.port` 和 `config.voicecraft.transport.login-token`
3. 如果不需要，請停用外掛程式運行時管理
4. 重新加載並驗證連接

## 場景 E：Velocity 或 Bungee 網絡

堆疊：

- 代理程式上的 `GeyserVoice`
- 後端 Paper 伺服器上的 `GeyserVoice`
- `VoiceCraft.Server` 與 `McTcp`

在以下情況下選擇此選項：

- Velocity 或 BungeeCord 在後端伺服器之間路由玩家
- 代理應該擁有 VoiceCraft 連接
- 後端伺服器應該只發送快照

流程：

1. 將代理配置為 VoiceCraft 擁有者
2. 配置後端Paper節點為代理模式
3. 在所有節點上重新載入插件
4. 驗證跨伺服器玩家移動

## 最小生產配置片段

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "MaxClients": 250,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9052,
    "MaxClients": 10
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "ws://0.0.0.0:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

此片段顯示了混合 HTTP + TCP 部署。請勿將 `McHttp` 和 `McTcp` 綁定到相同 TCP 連接埠。 VoiceCraft UDP 用戶端連接埠可以共用編號 `9050`，因為它是 UDP，但 HTTP 和原始 TCP 偵聽器需要不同的 TCP 綁定。

## 故障排除順序

1. 驗證令牌匹配
2. 驗證主機/連接埠的可及性
3. 驗證所選傳輸已啟用
4. 驗證插件或插件拓撲與配置匹配
5. 然後才調查資料包級問題

## 「工作」是什麼意思

只有當所有這些都成立時，食譜才是完整的：

- `VoiceCraft.Server` 啟動時沒有偵聽器錯誤
- 至少有一個 VoiceCraft 客戶端連接
- Minecraft 端傳輸進行身份驗證
- 綁定流程完成
- 遊戲中的移動會改變距離感行為
- 工作人員可以識別連接的客戶/實體以進行故障排除
