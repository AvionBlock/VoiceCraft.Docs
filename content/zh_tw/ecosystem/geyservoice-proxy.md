# GeyserVoice 代理指南

當您使用一台或多台後端 Paper 伺服器執行 Velocity 或 BungeeCord 時，請使用此模式。

代理模式在代理上保留一個中央 VoiceCraft 連接，而後端 Paper 伺服器透過插件訊息傳遞串流播放玩家快照。

目標形狀：

```text
Backend Paper + GeyserVoice -> proxy relay -> Velocity/Bungee + GeyserVoice -> McTcp -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## 代理模式如何運作

- 後端 Paper 伺服器將玩家快照傳送到代理
- 代理擁有 VoiceCraft 端 `McTcp` 連接
- 世界 ID 和維度可以使用後端身分命名

這允許為多伺服器網路提供一個中央語音橋。

## 部署模式

安裝 GeyserVoice：

- 在代理商上
- 在每個後端 Paper 伺服器上

## 核心規則

代理是 VoiceCraft 連結的真實來源。

後端 Paper 伺服器應被視為快照生產者，而不是主要的橋所有者。

## 後端 Paper 配置

在後端 Paper 伺服器上：

- Paper端節點啟用代理模式
- 不要將後端主機/連接埠/金鑰視為唯一配置來源

Paper 後端範例：

```yml
config:
  proxy:
    enabled: true
```

後端仍然需要安裝 GeyserVoice，以便它可以觀察玩家並發送快照，但它不應該擁有主 VoiceCraft 連線。

## 代理配置

在代理上：

- 設定真實的 `config.voicecraft.transport.host`
- 設定真實的 `config.voicecraft.transport.port`
- 設定真實的 `config.voicecraft.transport.login-token`

速度/彈力範例：

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
```

此令牌必須與 `VoiceCraft.Server` 上的 `McTcpConfig.LoginToken` 相符。

## 設定流程

1. 在代理和後端節點上安裝插件。
2. 啟動一切一次以產生配置。
3. 使用真實的 VoiceCraft 連線配置代理程式。
4. 配置後端節點的代理中繼行為。
5. 重新載入插件。
6. 驗證跨伺服器移動和綁定流程。

首先從一台後端伺服器開始。綁定和位置更新在那裡工作後，添加更多後端節點。

## 驗證清單

- 玩家加入後台
- 後端正確發送快照
- 代理保持與 VoiceCraft 的連接
- 切換後端伺服器保留預期的語音身份
- VoiceCraft 伺服器日誌顯示單一代理程式擁有的 `McTcp` 使用者
- 伺服器切換後後端世界ID/維度保持穩定

## 失敗模式

- 後端嘗試擁有主連接
- 代理令牌與 VoiceCraft `McTcpConfig.LoginToken` 不同
- 代理可以到達 Paper，但不能到達 VoiceCraft
- 後端拓撲隱藏或重寫插件訊息
- 插件已安裝在代理程式上，但在一個後端中缺失
- 後端 `config.proxy.enabled` 在代理程式中繼部署中為 false

## 操作注意事項

- 盡可能讓 VoiceCraft 靠近代理，以減少橋接延遲。
- 更改代理中繼配置後重新啟動或重新載入後端節點。
- 將令牌保留在代理配置中，不要在每個後端隨意複製。
- 新增新的後端伺服器後再次驗證綁定流程。
