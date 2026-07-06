# 系統架構

VoiceCraft 是 proximity voice stack：client、server 和 Minecraft integration 分層協作。

## Layers

| Layer | 作用 |
|-------|------|
| `VoiceCraft.Client` | 麥克風、voice packets、playback、本地 settings |
| `VoiceCraft.Server` | sessions、entities、moderation、effects、transports |
| Minecraft integration | 來自 Minecraft 的 positions 和 lifecycle |

## Client

Client 透過 UDP 連接 VoiceCraft server。`1.7.0` 支援原生 desktop/mobile clients；web client 已移除。

## Server

Server 管理：

- client sessions
- entity state 和 bind state
- entity properties
- effect bitmasks
- `McHttp`、`McWss`、`McTcp`
- optional NAT port mapping

## Minecraft integration

- BDS 使用 `Core.McHttp`
- 本地 worlds 使用 `Core.McWss`
- Java bridges 使用 `McTcp`

## Audio effects 1.7

Effects 為每個 entity 建立 `IAudioEffectProcessor`，快取 values，並可讀取 entity properties。Properties 取代舊 cave/muffle factor packets。

## 首先設定

1. Server 和 config。
2. 正確 transport。
3. `AutoOpenPort`。
4. Client 連接 `VoiceCraftConfig.Port`。
5. Transport token。
6. Bind 和 position updates。
