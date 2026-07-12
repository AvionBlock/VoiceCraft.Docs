# Transport 模式

Transport 是 Minecraft state 進入 `VoiceCraft.Server` 的路徑。語音用戶端使用獨立的 UDP voice endpoint。

## 對比

| Transport | Consumer | Endpoint | 用途 |
|-----------|----------|----------|------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP | Bedrock Dedicated Server |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | WebSocket + command tunnel | 本地世界 |
| `McTcp` | Java bridge / `VoiceCraft.Java` | TCP | Java、Geyser、proxy |

## 1.7 通用行為

- events 透過 `EventRequest`
- entity properties 替代 cave/muffle factor packets
- `OnEntityPropertyUpdated` 表示 property changes
- 每個 transport 可使用 `AutoOpenPort`

## 設定範例

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "AutoOpenPort": false
  }
}
```

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "AutoOpenPort": false
  }
}
```

```json
{
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "0.0.0.0",
    "Port": 9050,
    "AutoOpenPort": false
  }
}
```

## NAT port mapping

欄位：`AutoOpenPort`、`ExternalPort`、`PortMappingLifetimeMinutes`、`PortMappingTimeoutSeconds`。

僅在 home/LAN hosting 且需要自動 router mapping 時使用。VPS、Docker、panel、tunnel、loopback integrations 通常應關閉。

## 安全建議

- 替換 tokens
- 本地 consumer 使用 `127.0.0.1`
- 謹慎使用 `0.0.0.0`
- 只啟用需要的 transports
