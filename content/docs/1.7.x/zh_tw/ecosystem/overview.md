# VoiceCraft 生態

VoiceCraft 由 client、server 和 Minecraft integrations 組成。

玩家執行 `VoiceCraft.Client`，後端執行 `VoiceCraft.Server`，Minecraft integration 將 game state 傳送到伺服器。

## Repositories

| Repository | 作用 |
|------------|------|
| `VoiceCraft` | client、server、protocol、transports |
| `GeyserVoice` / Java bridge | Paper、Geyser/Floodgate、proxy |
| `VoiceCraft.Addon` | Bedrock addons 和 McApi |

GitLab 是主要開發倉庫。GitHub 是 public mirror 和 release 位置。

## 1.7 新內容

- 新 event/property model
- audio effect processors
- NAT port mapping
- iOS privacy manifest
- 移除 browser/web client

## 常見組合

- BDS：`VoiceCraft.Server` + `Core.McHttp`
- 本地 Bedrock：`Core.McWss`
- Java/Geyser：Java bridge + `McTcp`

## 繼續閱讀

- [VoiceCraft repository](/ecosystem/voicecraft-repository)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Transport modes](/server/transports)
