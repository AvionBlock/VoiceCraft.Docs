# VoiceCraft 生态

VoiceCraft 由 client、server 和 Minecraft integrations 组成。

玩家运行 `VoiceCraft.Client`，后端运行 `VoiceCraft.Server`，Minecraft integration 将 game state 发送到服务器。

## Repositories

| Repository | 作用 |
|------------|------|
| `VoiceCraft` | client、server、protocol、transports |
| `VoiceCraft.Java` / Java bridge | Paper、Geyser/Floodgate、proxy |
| `VoiceCraft.Addon` | Bedrock addons 和 McApi |

GitLab 是主要开发仓库。GitHub 是 public mirror 和 release 位置。

## 1.7 新内容

- 新 event/property model
- audio effect processors
- NAT port mapping
- iOS privacy manifest
- 移除 browser/web client

## 常见组合

- BDS：`VoiceCraft.Server` + `Core.McHttp`
- 本地 Bedrock：`Core.McWss`
- Java/Geyser：Java bridge + `McTcp`

## 继续阅读

- [VoiceCraft repository](/ecosystem/voicecraft-repository)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Transport modes](/server/transports)
