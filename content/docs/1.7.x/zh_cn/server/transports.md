# Transport 模式

Transport 是 Minecraft state 进入 `VoiceCraft.Server` 的路径。语音客户端使用独立的 UDP voice endpoint。

## 对比

| Transport | Consumer | Endpoint | 用途 |
|-----------|----------|----------|------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP | Bedrock Dedicated Server |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | WebSocket + command tunnel | 本地世界 |
| `McTcp` | Java bridge / `GeyserVoice` | TCP | Java、Geyser、proxy |

## 1.7 通用行为

- events 通过 `EventRequest`
- entity properties 替代 cave/muffle factor packets
- `OnEntityPropertyUpdated` 表示 property changes
- 每个 transport 可使用 `AutoOpenPort`

## 配置示例

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

字段：`AutoOpenPort`、`ExternalPort`、`PortMappingLifetimeMinutes`、`PortMappingTimeoutSeconds`。

仅在 home/LAN hosting 且需要自动 router mapping 时使用。VPS、Docker、panel、tunnel、loopback integrations 通常应关闭。

## 安全建议

- 替换 tokens
- 本地 consumer 使用 `127.0.0.1`
- 谨慎使用 `0.0.0.0`
- 只启用需要的 transports
