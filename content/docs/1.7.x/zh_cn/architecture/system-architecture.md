# 系统架构

VoiceCraft 是 proximity voice stack：client、server 和 Minecraft integration 分层协作。

## Layers

| Layer | 作用 |
|-------|------|
| `VoiceCraft.Client` | 麦克风、voice packets、playback、本地 settings |
| `VoiceCraft.Server` | sessions、entities、moderation、effects、transports |
| Minecraft integration | 来自 Minecraft 的 positions 和 lifecycle |

## Client

Client 通过 UDP 连接 VoiceCraft server。`1.7.0` 支持原生 desktop/mobile clients；web client 已移除。

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

Effects 为每个 entity 创建 `IAudioEffectProcessor`，缓存 values，并可读取 entity properties。Properties 取代旧 cave/muffle factor packets。

## 首先配置

1. Server 和 config。
2. 正确 transport。
3. `AutoOpenPort`。
4. Client 连接 `VoiceCraftConfig.Port`。
5. Transport token。
6. Bind 和 position updates。
