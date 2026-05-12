# 整合方案

這些是最常見 VoiceCraft 場景的實用部署模式。

## 場景 A：基岩專用伺服器

堆疊：

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft 用戶端

推薦配置：

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` unless also needed

流程：

1. deploy `VoiceCraft.Server`
2. secure `McHttpConfig.LoginToken`
3. ensure BDS can reach `McHttpConfig.Hostname`
4. install `Core.McHttp`
5. run `voicecraft:vcconnect <hostname> <token>`
6. validate `voicecraft:vcbind <key>`

## 場景 B：本地/單人基岩世界

堆疊：

- 本地 VoiceCraft 堆疊
- `VoiceCraft.Addon.Core.McWss`

流程：

1. enable `McWss`
2. keep `DataTunnelCommand = voicecraft:data_tunnel`
3. install `Core.McWss`
4. use `/connect`
5. run `voicecraft:vcconnect <token>`

## 場景 C：使用 GeyserVoice 託管執行時期的 Direct Paper

堆疊：

- Paper / Folia
- `GeyserVoice`
- 外掛程式管理的 VoiceCraft 執行時

流程：

1. install `GeyserVoice`
2. set `config.proxy.enabled = false`
3. configure `config.voicecraft.login-token`
4. enable `config.voicecraft.auto-start`
5. 重新載入並驗證綁定流程

當您希望外掛程式在背景執行 VoiceCraft 時，這是最簡單的 Java 端設定。

## 場景 D：使用外部 VoiceCraft 直接 Paper

堆疊：

- Paper / Folia
- `GeyserVoice`
- externally managed `VoiceCraft.Server`

流程：

1. enable `McTcp` on VoiceCraft
2. set `host`, `port`, `login-token` in GeyserVoice
3. 如果不需要，停用外掛程式運行時管理
4. 重新載入並驗證連接

## 場景 E：Velocity 或 Bungee 網絡

堆疊：

- `GeyserVoice` on proxy
- `GeyserVoice` on backend Paper servers
- `VoiceCraft.Server` with `McTcp`

流程：

1. 將代理程式配置為 VoiceCraft 擁有者
2.配置後端Paper節點為代理模式
3.在所有節點上重新載入插件
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
    "Port": 9050,
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

## 故障排除順序

1. 驗證token匹配
2. 驗證主機/連接埠可達性
3. 驗證所選傳輸是否已啟用
4. 驗證插件或插件拓撲與配置匹配
5. 然後才調查資料包層級的問題
